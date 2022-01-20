import { TOKEN_PROGRAM_ID} from "@solana/spl-token";
import { 
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
} from "@solana/web3.js";
import { connection } from './connection'
import { sendTxUsingExternalSignature } from './externalwallet'
import { getOrCreateAssociatedAccount } from "./getOrCreateAssociatedAccount";
const BN = require("bn.js");


export const vault_spl_init = async(user) => {

  console.log(user , "   lister publickey")

    
    const vault_metadata = new PublicKey("8a45cZRPDXwm9WGK7VY3G8nozgKqMeHroeB2eovrqXQ9")
    const vaultProgramID = new PublicKey("7QNruF6HwETBUxLSUBDVM8Ji7jUfgTnkFGQybR2kmmCd")
    const farmprogramID = new PublicKey("")
    const vault_token_ref = new PublicKey("")
    const vault_token_mint = new PublicKey("")
    const token_a_mint = new PublicKey("")
    const token_b_mint = new PublicKey("")
    const lp_mint = new PublicKey("")
    const token_a_reward_mint = new PublicKey("")
    const token_b_reward_mint = new PublicKey("")





  //   const  routerProgramId = new PublicKey("HgktVTMCv7pp8xXiinHFsHa6zeGsY7YWjkn31uVSrZpg")

  //   const user_state_data = new PublicKey("Em5VqM1MtiCbKd3uu53strmpHL3TadUqLmpVsva9Pm8S");
  //  const farm_state = new PublicKey("tYxNvLa5LD9B6W2vT38LNntghLUfu7sZAZsEkaYaoUt");
  //   const programFarmData = new PublicKey("GUK9D72L1TvKkeCxWne9P3EppbrhWqrb9RvrQFdQBJSa")



    // const reward_mint = new PublicKey("G6HhsjydS5odr1hpMVfUnSDVTKmzEhZAfCwueBKpow9P");

    const lptoken_custody = await PublicKey.findProgramAddress(
        [
          Buffer.from("lp_token_custody"),
          Buffer.from("VALTOKEN")
        ],
        farmprogramID,
    );

      console.log("PDA", lptoken_custody[0].toString());


    const token_a_custody = await PublicKey.findProgramAddress(
        [
          Buffer.from("token_a_custody"),
          Buffer.from("VALTOKEN")
        ],
        farmprogramID,
    );

      console.log("PDA", token_a_custody[0].toString());
      const token_b_custody = await PublicKey.findProgramAddress(
          [
            Buffer.from("token_b_custody"),
            Buffer.from("VALTOKEN")
          ],
          farmprogramID,
      );
  
        console.log("PDA", lptoken_custody[0].toString());
        const token_a_reward = await PublicKey.findProgramAddress(
            [
              Buffer.from("token_a_reward_custody"),
              Buffer.from("VALTOKEN")
            ],
            farmprogramID,
        );
    
          console.log("PDA", token_a_reward[0].toString());


        const token_b_reward = await PublicKey.findProgramAddress(
            [
              Buffer.from("token_b_reward_custody"),
              Buffer.from("VALTOKEN")
            ],
            farmprogramID,
        );
    
          console.log("PDA", token_b_reward[0].toString());

/////////////// vault info ///////////////////


const vault_info = await PublicKey.findProgramAddress(
  [
    Buffer.from("info_account"),
    Buffer.from("VALTOKEN")
  ],
  farmprogramID,
);

console.log("PDA", vault_info[0].toString());



const vault_authority = await PublicKey.findProgramAddress(
  [
    Buffer.from("vault_authority"),
    Buffer.from("VALTOKEN")
  ],
  farmprogramID,
);

console.log("PDA", vault_authority[0].toString());



const vault_stake_info = await PublicKey.findProgramAddress(
  [
    Buffer.from("vault_stake_info"),
    Buffer.from("VALTOKEN")
  ],
  farmprogramID,
);

console.log("PDA", vault_stake_info[0].toString());

const vault_stake_info_v4 = await PublicKey.findProgramAddress(
  [
    Buffer.from("vault_stake_info_v4"),
    Buffer.from("VALTOKEN")
  ],
  farmprogramID,
);

console.log("PDA", vault_stake_info_v4[0].toString());



const fees_account_a = await PublicKey.findProgramAddress(
  [
    Buffer.from("fees_account_a"),
    Buffer.from("VALTOKEN")
  ],
  farmprogramID,
);

console.log("PDA", fees_account_a[0].toString());



const fees_account_b = await PublicKey.findProgramAddress(
  [
    Buffer.from("fees_account_b"),
    Buffer.from("VALTOKEN")
  ],
  farmprogramID,
);

console.log("PDA", fees_account_b[0].toString());






//init escrow account


const initHarvestIx = new TransactionInstruction({
  programId: vaultProgramID,
  keys: [
    { pubkey: user, isSigner: true, isWritable: true },
    { pubkey: vault_metadata, isSigner: false, isWritable: true },
    { pubkey: vault_info, isSigner: false, isWritable: true },
    { pubkey: vault_authority, isSigner: false, isWritable: true },
    { pubkey: vaultProgramID, isSigner: false, isWritable: true },
    { pubkey: SystemProgram.programId, isSigner: false, isWritable: true },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: true },
    { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: true },
    { pubkey: farmprogramID, isSigner: false, isWritable: true },
    { pubkey: vault_token_mint, isSigner: false, isWritable: true },
    { pubkey: vault_token_ref, isSigner: false, isWritable: true },
    { pubkey: vault_stake_info, isSigner: false, isWritable: true },
    { pubkey: vault_stake_info_v4, isSigner: false, isWritable: true },
    { pubkey: fees_account_a, isSigner: false, isWritable: true },
    { pubkey: fees_account_b, isSigner: false, isWritable: true },
    { pubkey: token_a_custody, isSigner: false, isWritable: true },
    { pubkey: token_b_custody, isSigner: false, isWritable: true },
    { pubkey: lptoken_custody, isSigner: false, isWritable: true },
    { pubkey: token_a_mint, isSigner: false, isWritable: true },
    { pubkey: token_b_mint, isSigner: false, isWritable: true },
    { pubkey: lp_mint, isSigner: false, isWritable: true },
    { pubkey: token_a_reward, isSigner: false, isWritable: true },
    { pubkey: token_b_reward, isSigner: false, isWritable: true },
    { pubkey: token_a_reward_mint, isSigner: false, isWritable: true },
    { pubkey: token_b_reward_mint, isSigner: false, isWritable: true },

  ],
  data: Buffer.from(
    Uint8Array.of(13)
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


  console.log(
    `FARM successfully initialized \n`
  );

  console.log("");

};