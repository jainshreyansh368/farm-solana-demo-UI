import { ASSOCIATED_TOKEN_PROGRAM_ID, } from "@solana/spl-token";
import { 
  Keypair,
  PublicKey,
  SystemProgram,
  //Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { connection } from './connection'
import { FARM_STATE_LAYOUT } from './utils'
import { sendTxUsingExternalSignature } from './externalwallet'
import { getOrCreateAssociatedAccount } from "./getOrCreateAssociatedAccount";
import { farmprogramID, programFarmData, lp_mint, amm_id } from "./ids";

const BN = require("bn.js");


export const farm_state = async(user, alloc_point) => {

  console.log(user , "   lister publickey")

    
//create farm account
    const newAcc = new Keypair();

    // const farmprogramID = new PublicKey("6i9RUZAny38fh4Lthfge7shEYeXoGU5cEi9JEvMFDYsa")
    const createFarmAccountIx = SystemProgram.createAccount({
        programId: farmprogramID,
        space: FARM_STATE_LAYOUT.span,
        lamports: await connection.getMinimumBalanceForRentExemption(
          FARM_STATE_LAYOUT.span
        ),
        fromPubkey: user,
        newAccountPubkey: newAcc.publicKey
      }); 

      // const programFarmData = new PublicKey("GUK9D72L1TvKkeCxWne9P3EppbrhWqrb9RvrQFdQBJSa")
      // const amm_id = new PublicKey("H8BtP7XZkvyvYWKD2bbZpX7MfskaAvNjtSQpLJwTFcR9")
      // const lp_mint = new PublicKey("9XEsTPdWwXqPFd8195s1ndBfCNruZ6c5tWHu6ehm5LVL")

      const PDA = await PublicKey.findProgramAddress(
        [
          Buffer.from("FarmStatePrefix"),
          lp_mint.toBuffer(),
        ],
        farmprogramID,
      );

      console.log("PDA", PDA[0].toString());

        // pda token account
      const PDA_tokenAccount = await getOrCreateAssociatedAccount(PDA[0], lp_mint, user);

//init farm account


const initFarmIx = new TransactionInstruction({
  programId: farmprogramID,
  keys: [
    { pubkey: user, isSigner: true, isWritable: false },

    { pubkey: programFarmData, isSigner: false, isWritable: true },
    { pubkey: newAcc.publicKey, isSigner: true, isWritable: true },

    { pubkey: amm_id, isSigner: false, isWritable: false },
    { pubkey: lp_mint, isSigner: false, isWritable: false },

    { pubkey: PDA_tokenAccount, isSigner: false, isWritable: true },

    { pubkey: PDA[0], isSigner: false, isWritable: true },
    { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },

  ],
  data: Buffer.from(
    Uint8Array.of(1, ...new BN(alloc_point).toArray("le", 8))
  ),
});

console.log([newAcc],"new acc keypir.........");

      await sendTxUsingExternalSignature(
        [
          createFarmAccountIx,
          initFarmIx,
        ],
        connection,
        null,
        [newAcc],
        new PublicKey(user)
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));

     console.log(newAcc.publicKey.toString(), "*******Farm state account account ...");
    //  //console.log(tempXTokenAccountKeypair.publicKey.toString(), "*******temp account ...");
    //  console.log("****amount =", amount);

  // sleep to allow time to update
  const farmAccount = await connection.getAccountInfo(
    newAcc.publicKey
  );
  console.log(farmAccount, "******farm state account......")

  console.log(
    `FARM State successfully initialized \n`
  );

  console.log(
    farmAccount,"*****farm account...."
  );
  console.log("");

};

//latest
//BAXhvmfRvMFjktrvq2cfvng6a5AJb4vrhMYBovyEYvps

//new farm tYxNvLa5LD9B6W2vT38LNntghLUfu7sZAZsEkaYaoUt