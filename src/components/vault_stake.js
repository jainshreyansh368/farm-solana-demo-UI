import { TOKEN_PROGRAM_ID} from "@solana/spl-token";
import { 
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { connection } from './connection'
import { sendTxUsingExternalSignature } from './externalwallet'
import { getOrCreateAssociatedAccount } from "./getOrCreateAssociatedAccount";

import { farmprogramID,farm_state, lp_mint, routerProgramId, programFarmData, reward_mint  } from "./ids";
const BN = require("bn.js");


export const vault_stake = async(user, amount) => {

  console.log(user , "   lister publickey")

  // user state account 
  const USER_SEED = [
    farm_state.toBuffer(),
  ]
  const user_state_pubkey = await PublicKey.createWithSeed(
    user,
    USER_SEED,
    farmprogramID,
  );
  console.log("user state account : **********  :",user_state_pubkey.toString());
    
    const farm_main_PDA = await PublicKey.findProgramAddress(
      [
        Buffer.from("ValFarmMain"),
        reward_mint.toBuffer(),
      ],
      farmprogramID,
    );


    const farm_PDA = await PublicKey.findProgramAddress(
        [
          Buffer.from("FarmStatePrefix"),
          lp_mint.toBuffer(),
        ],
        farmprogramID,
    );

      console.log("farm_PDA", farm_PDA[0].toString());

        // pda token account
      const PDA_tokenAccount = await getOrCreateAssociatedAccount(farm_PDA[0], lp_mint, user);
      
      const user_lp_tokenAccount = await getOrCreateAssociatedAccount(user, lp_mint, user);
      const user_reward_tokenAccount = await getOrCreateAssociatedAccount(user, reward_mint, user);

//init escrow account


const initStakeIx = new TransactionInstruction({
  programId: routerProgramId,
  keys: [
    { pubkey: user, isSigner: true, isWritable: true },
    { pubkey: user_state_pubkey, isSigner: false, isWritable: true },
    { pubkey: farm_state, isSigner: false, isWritable: true },
    { pubkey: programFarmData, isSigner: false, isWritable: true },

    { pubkey: user_lp_tokenAccount, isSigner: false, isWritable: true },
    { pubkey: user_reward_tokenAccount, isSigner: false, isWritable: true },
   
    { pubkey: farm_PDA[0], isSigner: false, isWritable: false },
    { pubkey: PDA_tokenAccount, isSigner: false, isWritable: true },
    { pubkey: farm_main_PDA[0], isSigner: false, isWritable: false },
  

    { pubkey: lp_mint, isSigner: false, isWritable: true },
    { pubkey: reward_mint, isSigner: false, isWritable: true },

    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: farmprogramID, isSigner: false, isWritable: false },

  ],
  data: Buffer.from(
    Uint8Array.of(3, ...new BN(amount).toArray("le", 8))
  ),
});


      await sendTxUsingExternalSignature(
        [
          initStakeIx
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
// pda : HCbKwrtSsUqGmJQXLjU54CyTs38adk8HujRRav1vAneE
