import { TOKEN_PROGRAM_ID} from "@solana/spl-token";
import { 
  PublicKey,
  //Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { connection } from './connection'
import { sendTxUsingExternalSignature } from './externalwallet'
import { getOrCreateAssociatedAccount } from "./getOrCreateAssociatedAccount";
import { farmprogramID, routerProgramId, user_state_data_temp_acc, farm_state, programFarmData, reward_mint } from "./ids";

const BN = require("bn.js");


export const crank_1_harvest = async(user) => {

  console.log(user , "   lister publickey")

    


    const PDA = await PublicKey.findProgramAddress(
        [
          Buffer.from("ValFarmMain"),
          reward_mint.toBuffer(),
        ],
        farmprogramID,
    );

      console.log("PDA", PDA[0].toString());

        // pda token account
      
      const user_tokenAccount = await getOrCreateAssociatedAccount(user, reward_mint, user);

//init escrow account


const initHarvestIx = new TransactionInstruction({
  programId: routerProgramId,
  keys: [
    { pubkey: user, isSigner: true, isWritable: true },
    { pubkey: user_state_data_temp_acc, isSigner: false, isWritable: true },
    { pubkey: programFarmData, isSigner: false, isWritable: true },
    { pubkey: farm_state, isSigner: false, isWritable: true },


    { pubkey: user_tokenAccount, isSigner: false, isWritable: true },
    { pubkey: PDA[0], isSigner: false, isWritable: false },

    { pubkey: reward_mint, isSigner: false, isWritable: true },

    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: farmprogramID, isSigner: false, isWritable: false },

  ],
  data: Buffer.from(
    Uint8Array.of(7, ...new BN(1).toArray("le", 8))
  ),
});

      await sendTxUsingExternalSignature(
        [
          initHarvestIx
        ],
        connection,
        null,
        [],
        new PublicKey(user)
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));


    // console.log(newAcc.publicKey.toString(), "*******Farm state account account ...");
    //  //console.log(tempXTokenAccountKeypair.publicKey.toString(), "*******temp account ...");
    //  console.log("****amount =", amount);


  // sleep to allow time to update

  console.log(
    `FARM successfully initialized \n`
  );

  console.log("");

};