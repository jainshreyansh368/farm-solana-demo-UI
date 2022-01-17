import { TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  //Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { connection } from './connection'
import { FARM_ACCOUNT_DATA_LAYOUT } from './utils'
import { sendTxUsingExternalSignature } from './externalwallet'
import { getOrCreateAssociatedAccount } from "./getOrCreateAssociatedAccount";
import { farmprogramID,reward_mint } from "./ids";

const BN = require("bn.js");


export const farm_init = async(user) => {

  console.log(user , "   lister publickey")

    
//create escrow account
    const newAcc = new Keypair();

    // const farmprogramID = new PublicKey("6i9RUZAny38fh4Lthfge7shEYeXoGU5cEi9JEvMFDYsa")

    // const reward_mint = new PublicKey("G6HhsjydS5odr1hpMVfUnSDVTKmzEhZAfCwueBKpow9P")
   
    const PDA = await PublicKey.findProgramAddress(
      [
        Buffer.from("FarmStatePrefix"),
        reward_mint.toBuffer(),
      ],
      farmprogramID,
    );
    const PDA_tokenAccount = await getOrCreateAssociatedAccount(PDA[0], reward_mint, user);

    const owner_reward_token_account = await getOrCreateAssociatedAccount(user, reward_mint, user);

    const createEscrowAccountIx = SystemProgram.createAccount({
        programId: farmprogramID,
        space: FARM_ACCOUNT_DATA_LAYOUT.span,
        lamports: await connection.getMinimumBalanceForRentExemption(
          FARM_ACCOUNT_DATA_LAYOUT.span
        ),
        fromPubkey: user,
        newAccountPubkey: newAcc.publicKey
      }); 

//init escrow account


const initEscrowIx = new TransactionInstruction({
  programId: farmprogramID,
  keys: [
    { pubkey: newAcc.publicKey, isSigner: false, isWritable: true },

    { pubkey: user, isSigner: true, isWritable: false },
    { pubkey: owner_reward_token_account, isSigner: false, isWritable: true },
    { pubkey: reward_mint, isSigner: false, isWritable: true },
    { pubkey: PDA_tokenAccount, isSigner: false, isWritable: true },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },

  ],
  data: Buffer.from(
    Uint8Array.of(0))
});

console.log([newAcc],"new acc keypir.........");

      await sendTxUsingExternalSignature(
        [
          createEscrowAccountIx,
          initEscrowIx
        ],
        connection,
        null,
        [newAcc],
        new PublicKey(user)
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));


     console.log(newAcc.publicKey.toString(), "*******Farm prog data account account ...");
    //  //console.log(tempXTokenAccountKeypair.publicKey.toString(), "*******temp account ...");
    //  console.log("****amount =", amount);


  // sleep to allow time to update
  const escrowAccount = await connection.getAccountInfo(
    newAcc.publicKey
  );
  console.log(escrowAccount, "******Escrow account......")


  console.log(
    `FARM successfully initialized \n`
  );

  console.log(
    escrowAccount,"*****Escrow account...."
  );
  console.log("");


};