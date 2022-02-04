import { TOKEN_PROGRAM_ID} from "@solana/spl-token";
import { 
  PublicKey,
  //Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { connection } from './connection'
import { sendTxUsingExternalSignature } from './externalwallet'
import { getOrCreateAssociatedAccount } from "./getOrCreateAssociatedAccount";
import { farmprogramID, reward_mint , user_state_data_temp_acc, farm_state} from "./ids";

const BN = require("bn.js");


export const farm_harvest = async(user, amount) => {

  console.log(user , "   lister publickey")


    // const farmprogramID = new PublicKey("6i9RUZAny38fh4Lthfge7shEYeXoGU5cEi9JEvMFDYsa")
    // // const user_state_data = new PublicKey("E3FD7Ge7LuRhNy5sNjkd5SJkhfMeHY3R5agvpfwyXW9d");
    // // const farm_state = new PublicKey("CPpA6eiHHHabm7PT2fgWmQCQC2q6BxzoGZt8xkz77EvH");

    // const reward_mint = new PublicKey("G6HhsjydS5odr1hpMVfUnSDVTKmzEhZAfCwueBKpow9P")

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


const initDepositIx = new TransactionInstruction({
  programId: farmprogramID,
  keys: [
    { pubkey: user, isSigner: true, isWritable: true },
    { pubkey: user_state_data_temp_acc, isSigner: false, isWritable: true },
    { pubkey: farm_state, isSigner: false, isWritable: true },

    { pubkey: user_tokenAccount, isSigner: false, isWritable: true },
    { pubkey: PDA[0], isSigner: false, isWritable: false },
    { pubkey: reward_mint, isSigner: false, isWritable: true },

    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },


  ],
  data: Buffer.from(
    Uint8Array.of(5, ...new BN(amount).toArray("le", 8))
  ),
});


      await sendTxUsingExternalSignature(
        [
          initDepositIx
        ],
        connection,
        null,
        [],
        new PublicKey(user)
      );
      await new Promise((resolve) => setTimeout(resolve, 2000));

  // sleep to allow time to update

  console.log(
    `FARM successfully initialized \n`
  );

  console.log("");

};
// pda : HCbKwrtSsUqGmJQXLjU54CyTs38adk8HujRRav1vAneE

//new user state account with seed
// F7iFmTA31QUYQVoqJ8sWaaTPf67uEjTnYybUscNqvtLF