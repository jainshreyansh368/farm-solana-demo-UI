import { TOKEN_PROGRAM_ID} from "@solana/spl-token";
import { 
  PublicKey,
  //Transaction,
  SystemProgram,
  TransactionInstruction,
  SYSVAR_RENT_PUBKEY,
  Keypair,
} from "@solana/web3.js";
import { connection } from './connection'
import { sendTxUsingExternalSignature } from './externalwallet'
import { farmprogramID, routerProgramId, farm_state, lp_mint, reward_mint, token_a_mint, token_b_mint} from "./ids";

const BN = require("bn.js");


export const apna_vault = async(user) => {

  console.log(user , "   lister publickey")

    
//     const farmprogramID = new PublicKey("6i9RUZAny38fh4Lthfge7shEYeXoGU5cEi9JEvMFDYsa")
//     const  routerProgramId = new PublicKey("HgktVTMCv7pp8xXiinHFsHa6zeGsY7YWjkn31uVSrZpg")


//    const farm_state = new PublicKey("tYxNvLa5LD9B6W2vT38LNntghLUfu7sZAZsEkaYaoUt");



    // const reward_mint = new PublicKey("G6HhsjydS5odr1hpMVfUnSDVTKmzEhZAfCwueBKpow9P");


    const PDA = await PublicKey.findProgramAddress(
        [
          Buffer.from("Val_VaultPDA"),
          farm_state.toBuffer(),
        ],
        routerProgramId,
    );

      console.log("PDA", PDA[0].toString());

        // pda token account
      
      //const lpmint_token_account = await getOrCreateAssociatedAccount(user, lp_mint, user);
    const vault_state_account = new Keypair();
        console.log('state account : ',vault_state_account.publicKey.toString());

    const lpmint_token_account = new Keypair();
    const reward_token_account = new Keypair();
    const token_a_account = new Keypair();
    const token_b_account = new Keypair();

//init escrow account


const initHarvestIx = new TransactionInstruction({
  programId: routerProgramId,
  keys: [
    { pubkey: user, isSigner: true, isWritable: true },
    { pubkey: farm_state, isSigner: false, isWritable: true },
    { pubkey: PDA[0], isSigner: false, isWritable: true },
    { pubkey: vault_state_account.publicKey, isSigner: false, isWritable: true },

    { pubkey: reward_token_account.publicKey, isSigner: false, isWritable: true },
    { pubkey: lpmint_token_account.publicKey, isSigner: false, isWritable: true },
    { pubkey: token_a_account.publicKey, isSigner: false, isWritable: true },
    { pubkey: token_b_account.publicKey, isSigner: false, isWritable: true },

    { pubkey: reward_mint, isSigner: false, isWritable: true },
    { pubkey: lp_mint, isSigner: false, isWritable: true },
    { pubkey: token_a_mint, isSigner: false, isWritable: true },
    { pubkey: token_b_mint, isSigner: false, isWritable: true },


    { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: farmprogramID, isSigner: false, isWritable: false },
    { pubkey: routerProgramId, isSigner: false, isWritable: false },


  ],
  data: Buffer.from(
    Uint8Array.of(6)
  ),
});

      await sendTxUsingExternalSignature(
        [
          initHarvestIx
        ],
        connection,
        null,
        [
          vault_state_account,
          lpmint_token_account,
          reward_token_account,
          token_a_account,
          token_b_account,
        ],
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