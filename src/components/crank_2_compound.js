
import { TOKEN_PROGRAM_ID} from "@solana/spl-token";
import { 
  PublicKey,
  //Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { connection } from './connection'
import { sendTxUsingExternalSignature } from './externalwallet'
import { getOrCreateAssociatedAccount } from "./getOrCreateAssociatedAccount";
import { farmprogramID, routerProgramId, user_state_data_temp_acc, 
  farm_state, programFarmData, reward_mint, lp_mint, token_a_mint, token_b_mint,
   vault_state_account,
  token_swap_program_id, amm_id, pool_token_a_account, pool_token_b_account,
} from "./ids";

const BN = require("bn.js");


export const crank_2_compound = async(user) => {

  console.log(user , "   lister publickey")

  const pool_fee_acc = new PublicKey("2VZtfYeYZXdHAY8yLyLWCVxhvuoSSSiSYmLa6PvdFd7U")

  const reward_custody = new PublicKey("5BTB4zLiUkANUbpESTEsRpJHn1CuRgBTZ9riaTNb63PP");
  const lp_custody = new PublicKey("4AMgBGizQn1hiKJaL7sn15V2VaTCoWep9oRX1XT75ah3");
  const token_a_custody = new PublicKey("3h1AvK7C6wg9P3h319aSyBdewbEwqQ2V8MWk96soPJuq");
  const token_b_custody = new PublicKey("5BTB4zLiUkANUbpESTEsRpJHn1CuRgBTZ9riaTNb63PP");


    const vault_PDA = await PublicKey.findProgramAddress(
        [
          Buffer.from("Val_VaultPDA"),
          farm_state.toBuffer(),
        ],
        routerProgramId,
    );

      console.log("vault auth PDA", vault_PDA[0].toString());


      // ammm authority

    const amm_authority_pda = await PublicKey.findProgramAddress(
      [
        amm_id.toBuffer(),
      ],
      token_swap_program_id,
  );

    console.log("amm authority PDA", amm_authority_pda[0].toString());


    const harvest_PDA = await PublicKey.findProgramAddress(
      [
        Buffer.from("ValFarmMain"),
        reward_mint.toBuffer(),
      ],
      farmprogramID,
  );

    console.log("farm harvest PDA", harvest_PDA[0].toString());


// farm state pda 
    const farm_PDA = await PublicKey.findProgramAddress(
      [
        Buffer.from("FarmStatePrefix"),
        lp_mint.toBuffer(),
      ],
      farmprogramID,
  );

    console.log("farm state PDA", farm_PDA[0].toString());

    const farm_PDA_lpacc = await getOrCreateAssociatedAccount(farm_PDA[0], lp_mint, user);
    const user_reward_account = await getOrCreateAssociatedAccount(user, reward_mint, user);
      //   // pda token account
      
      // const user_tokenAccount = await getOrCreateAssociatedAccount(user, reward_mint, user);




const CompoundIx = new TransactionInstruction({
  programId: routerProgramId,
  keys: [
    { pubkey: user, isSigner: true, isWritable: true },
    { pubkey: user_reward_account, isSigner: false, isWritable: true },


    { pubkey: user_state_data_temp_acc, isSigner: false, isWritable: true },
    { pubkey: programFarmData, isSigner: false, isWritable: true },
    { pubkey: farm_state, isSigner: false, isWritable: true },

    { pubkey: vault_state_account, isSigner: false, isWritable: true },
    { pubkey: vault_PDA[0], isSigner: false, isWritable: true },

    { pubkey: token_swap_program_id, isSigner: false, isWritable: false },
    { pubkey: amm_id, isSigner: false, isWritable: false },
    { pubkey: amm_authority_pda[0], isSigner: false, isWritable: true },
    { pubkey: pool_token_a_account, isSigner: false, isWritable: true },
    { pubkey: pool_token_b_account, isSigner: false, isWritable: true },
    { pubkey: pool_fee_acc, isSigner: false, isWritable: true },

    { pubkey:  farm_PDA[0], isSigner: false, isWritable: true },
    { pubkey:  harvest_PDA[0], isSigner: false, isWritable: true },
    { pubkey:  farm_PDA_lpacc, isSigner: false, isWritable: true },


    { pubkey: reward_custody, isSigner: false, isWritable: true },
    { pubkey: lp_custody, isSigner: false, isWritable: true },
    { pubkey: token_a_custody, isSigner: false, isWritable: true },
    { pubkey: token_b_custody, isSigner: false, isWritable: true },


    { pubkey: reward_mint, isSigner: false, isWritable: true },
    { pubkey: lp_mint, isSigner: false, isWritable: true },
    { pubkey: token_a_mint, isSigner: false, isWritable: true },
    { pubkey: token_b_mint, isSigner: false, isWritable: true },


    { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    { pubkey: farmprogramID, isSigner: false, isWritable: false },
    { pubkey: routerProgramId, isSigner: false, isWritable: false },


  ],
  data: Buffer.from(
    Uint8Array.of(7, ...new BN(2).toArray("le", 8))
  ),

});

      await sendTxUsingExternalSignature(
        [
          CompoundIx
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

/*

Token Swap Account Data:  {
  tokenSwapPoolStateAccount: '5fwQskLecGtosNowPxmyN91xb1XGzWfBGWZvckpqCCfg',
  tokenPoolMint: 'DoRhKnWHoo5ns7WRBE9B5yvRxzdu3wS5845BBGnsh5mJ',
  feeAccount: '2VZtfYeYZXdHAY8yLyLWCVxhvuoSSSiSYmLa6PvdFd7U',
  tokenAccountA: '8uyQZjNtSMaUP2gPYg3atSafqeQoyYuo8u6CiFUhGTDK',
  tokenAccountB: '42jZR1mzsWqRz2hGsgMPFQdCa3TfxveTbcGHKiCiyfRp',
  mintA: 'FNnhUvcMoN5QNyNvcro9Bkwccegk5s4rJ11DAZMtmTrz',
  mintB: '5VrchzTuYdUtLdti5gNabJnhoBvngzeyfyKTebWTunWK',
  tokenProgramId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  */