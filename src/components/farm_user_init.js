
import {
    PublicKey,
    SystemProgram,
    TransactionInstruction,
  } from "@solana/web3.js";
  import { connection } from './connection'
  import { FARM_USER_DATA_LAYOUT } from './utils'
  import { sendTxUsingExternalSignature } from './externalwallet'
  import { farmprogramID,farm_state } from "./ids";
  
  const BN = require("bn.js");
  
  
  export const farm_user_init = async(user) => {
  
    console.log(user.toString() , "   lister publickey");


  const USER_SEED = [
      farm_state.toBuffer(),
    ]
  const user_state_pubkey = await PublicKey.createWithSeed(
    user,
    USER_SEED,
    farmprogramID,
  );
  console.log("user state account : **********  :",user_state_pubkey.toString());

  // Check if the greeting account has already been created
  const userStateAccount = await connection.getAccountInfo(user_state_pubkey);
  if (userStateAccount === null) {
    console.log(
      'Creating account',
      user_state_pubkey.toBase58(),
      'to say hello to',
    );
    //const seed_buffer =  Buffer.from("hello");


    const createIx = SystemProgram.createAccountWithSeed({
      basePubkey: user,
      fromPubkey: user,
      lamports: await connection.getMinimumBalanceForRentExemption(
        FARM_USER_DATA_LAYOUT.span
      ),
      newAccountPubkey: user_state_pubkey,
      programId: farmprogramID,
      seed: USER_SEED,
      space: FARM_USER_DATA_LAYOUT.span,
    }); 


  
  const initUserIx = new TransactionInstruction({
    programId: farmprogramID,
    keys: [
      { pubkey: user, isSigner: true, isWritable: false },
      // { pubkey: newAcc.publicKey, isSigner: false, isWritable: true },

      { pubkey: user_state_pubkey, isSigner: false, isWritable: true },

      // { pubkey: PDA[0], isSigner: false, isWritable: true },
  
      { pubkey: farm_state, isSigner: false, isWritable: false },

    ],
    data: Buffer.from(
      Uint8Array.of(2))
  });
  
 //console.log(PDA[0].toString(),"new state account for user.........");
  
        await sendTxUsingExternalSignature(
          [createIx,
            initUserIx
          ],
          connection,
          null,
          [],
          (new PublicKey(user))
        );
        await new Promise((resolve) => setTimeout(resolve, 2000));
  
      console.log(user_state_pubkey.toString(), "*******Farm user account  ...");
  
    console.log(
      `FARM USER successfully initialized \n`
    );
  
}
}
  //user state acc :   Gz7p8tkHTp1zBNQEYZGQisMZrEBY8XnUf21qRmeGvAXu



  //latest Em5VqM1MtiCbKd3uu53strmpHL3TadUqLmpVsva9Pm8S

  // for Aib/// temp account  : 9Sh5dAHZsTvhr3x3nQ93bsNyGBbmHqhaU9BDGL65vk1q