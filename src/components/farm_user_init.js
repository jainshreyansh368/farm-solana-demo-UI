
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
  
    console.log(user , "   lister publickey");
    // const farmprogramID = new PublicKey("33BfahUCKJhxberGzKc1fHk7aAQLbbrMsMNespwxgJ8L")
    
    // const farmstate = new PublicKey("tYxNvLa5LD9B6W2vT38LNntghLUfu7sZAZsEkaYaoUt");

    // const newAcc = new Keypair();
    // console.log(newAcc.publicKey.toString(), "*******Farm state account account ...");

    // const seed = 'farm_seed';
    // const init_pubkey = await PublicKey.createWithSeed(
    //   user,
    //   seed,
    //   farmprogramID,
    // );

    // console.log("publickey with seed: ", init_pubkey);


    // const PDA = await PublicKey.findProgramAddress(
    //     [
    //       Buffer.from("UserCheck"),
    //       user.toBuffer(),
    //     ],
    //     farmprogramID,
    //   );
    //   console.log("PDA", PDA[0].toString());


    // // keypair using seed
    // const seed = 'farm_seed';
    // const uint8data = Buffer.from(
    //     Uint8Array.of(
    //             user,
    //             seed,
    //             farmprogramID,
    //             ));

    // console.log(sizeOf(uint8data));


    // const newAcc = Keypair.fromSeed(
    //     Buffer.from("UserCheck")
    //     );

    //     console.log("new acc : ", newAcc.publicKey());


// //create user farming account
// const newAcc = new Keypair();

// const createUserAccountIx = SystemProgram.createAccount({
  //   programId: farmprogramID,
  //   space: FARM_USER_DATA_LAYOUT.span,
  //   lamports: await connection.getMinimumBalanceForRentExemption(
  //     FARM_USER_DATA_LAYOUT.span
  //   ),
  //   fromPubkey: user,
  //   newAccountPubkey: init_pubkey,
  // }); 

//   //console.log("new state acc : ", newAcc.publicKey.toString());














  const USER_SEED = 'farm_user_new_seed';
  const user_state_pubkey = await PublicKey.createWithSeed(
    user,
    USER_SEED,
    farmprogramID,
  );

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
  















  
    //   console.log(newAcc.publicKey.toString(), "*******Farm state account account ...");
      //  //console.log(tempXTokenAccountKeypair.publicKey.toString(), "*******temp account ...");
      //  console.log("****amount =", amount);
      
      console.log(user_state_pubkey.toString(), "*******Farm state account account ...");
  
    console.log(
      `FARM USER successfully initialized \n`
    );
  
}
}
  //user state acc :   Gz7p8tkHTp1zBNQEYZGQisMZrEBY8XnUf21qRmeGvAXu



  //latest Em5VqM1MtiCbKd3uu53strmpHL3TadUqLmpVsva9Pm8S

  // for Aib/// temp account  : 9Sh5dAHZsTvhr3x3nQ93bsNyGBbmHqhaU9BDGL65vk1q