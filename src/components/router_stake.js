import { TOKEN_PROGRAM_ID} from "@solana/spl-token";
import { 
  PublicKey,
  TransactionInstruction,
} from "@solana/web3.js";
import { connection } from './connection'
import { sendTxUsingExternalSignature } from './externalwallet'
import { getOrCreateAssociatedAccount } from "./getOrCreateAssociatedAccount";

import { farmprogramID,farm_state, user_state_data_id_acc, lp_mint, routerProgramId  } from "./ids";
const BN = require("bn.js");


export const router_stake = async(user, amount) => {

  console.log(user , "   lister publickey")

    
  //   const farmprogramID = new PublicKey("6i9RUZAny38fh4Lthfge7shEYeXoGU5cEi9JEvMFDYsa")
  //   const  routerProgramId = new PublicKey("HgktVTMCv7pp8xXiinHFsHa6zeGsY7YWjkn31uVSrZpg")

  //   const user_state_data = new PublicKey("9Sh5dAHZsTvhr3x3nQ93bsNyGBbmHqhaU9BDGL65vk1q");
  //  const farm_state = new PublicKey("tYxNvLa5LD9B6W2vT38LNntghLUfu7sZAZsEkaYaoUt");
  //   const lp_mint = new PublicKey("9XEsTPdWwXqPFd8195s1ndBfCNruZ6c5tWHu6ehm5LVL");


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
      
      const user_tokenAccount = await getOrCreateAssociatedAccount(user, lp_mint, user);

//init escrow account


const initStakeIx = new TransactionInstruction({
  programId: routerProgramId,
  keys: [
    { pubkey: user, isSigner: true, isWritable: true },
    { pubkey: user_state_data_id_acc, isSigner: false, isWritable: true },
    { pubkey: farm_state, isSigner: false, isWritable: true },

    { pubkey: user_tokenAccount, isSigner: false, isWritable: true },
    { pubkey: PDA[0], isSigner: false, isWritable: false },
    { pubkey: PDA_tokenAccount, isSigner: false, isWritable: true },

    { pubkey: lp_mint, isSigner: false, isWritable: false },

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
