//user 2 --> NFT owner
import { AccountLayout, Token , TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { connection } from "./connection";
import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  Keypair
} from "@solana/web3.js";

import {
  ESCROW_ACCOUNT_DATA_LAYOUT,
  VALHALLA_ACCOUNT_DATA_LAYOUT
} from "./utils";
import {getOrCreateAssociatedAccount} from './getOrCreateAssociatedAccount';
import { sendTxUsingExternalSignature } from './externalwallet';
import { fetchMetadata } from "./fetchmetdatafrommint";
import { decodeMetadata, getMetadataAccount } from "./helper";
const BN = require("bn.js");

export const user2 = async (user) => {
  console.log(user,"chceck user");

  const systemProgramId = new PublicKey("11111111111111111111111111111111")
  const bobPub = new PublicKey(user);

  const valhalla_treasury = new PublicKey("Gc9SPfQUXsRjiHx3Fd7YQqNTcwivgwzxLi5Hb8JyPTdV")
  const valhalla_team = new PublicKey("2Hakiq5okm8Rb2V7u8xQ5YWep5tJiprFEze6jAWibNCk")
  const METADATA_PROGRAM_ID =new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")

  // vallhala accounts data 
  const valUpdateAccountPubkey = new PublicKey("1UnMvq2byjLeFtKb9vZ3ip1LfFXBd6Rvzv5kvh7ubWX");
 

  const escrowStateAccountPubkey = new PublicKey("4dhmrU73vVifrJKX7jJoQAERHoYD8VVneAc4rSvn3zZf");
  const escrowProgramId = new PublicKey("6jergy9cCDj5rWgrphaxERUKLqMpXffrja6dyCSArcJE")
  //const amount = 1;


//fetch data
  const escrowAccount = await connection.getAccountInfo(
    escrowStateAccountPubkey
  );

  if (escrowAccount === null) {
    console.log("Could not find escrow at given address!");
    //process.exit(1);
  } 
  console.log(escrowAccount,"*****escrow Account ..");
  //console.log(escrowAccount.publicKey.toString(),".....****Escrow Account key ....")

  const encodedEscrowState =escrowAccount && escrowAccount.data;
  const decodedEscrowLayout = ESCROW_ACCOUNT_DATA_LAYOUT.decode(
    encodedEscrowState
  );
  const mint = new PublicKey(decodedEscrowLayout.mintKey);
  console.log(mint.toBase58(),"****Mint key****")
  
  // buyer's receving account
  const tokenAccount = await getOrCreateAssociatedAccount(user,mint,user)
  // //console.log("user 2 receiving token account  : ",tokenAccount);
   const bobXAccountPub = tokenAccount;


  const escrowState = {
    escrowAccountPubkey: escrowStateAccountPubkey,
    isInitialized: !!decodedEscrowLayout.isInitialized,
    initializerAccountPubkey: new PublicKey(
      decodedEscrowLayout.sellerPubkey
    ),
    XTokenTempAccountPubkey: new PublicKey(
      decodedEscrowLayout.tokenAccountPubkey
    ),
    TokenMintKey: new PublicKey(
      decodedEscrowLayout.mintKey
    ),
    expectedAmount: new BN(decodedEscrowLayout.expectedAmount, 10, "le"),
  };





  // val accounts data fetch

//fetch data
  const valAccount = await connection.getAccountInfo(
    valUpdateAccountPubkey
  );

if (valAccount === null) {
  console.log("Could not valhalla shaare accounts at given address!");
  //process.exit(1);
} 
console.log(valAccount,"*****share Account ..");
//console.log(valAccount.publicKey.toString(),".....****Escrow Account key ....")

const encodedValAccState =valAccount && valAccount.data;
const decodedValAccLayout = VALHALLA_ACCOUNT_DATA_LAYOUT.decode(
  encodedValAccState
);

const valAccState = {
  vallhalaUpdateAccountPubkey: valUpdateAccountPubkey,
  isInitialized: !!decodedValAccLayout.isInitialized,
  val_treasury: new PublicKey(
    decodedValAccLayout.valhallaTreasury
  ),
  val_team: new PublicKey(
    decodedValAccLayout.valhallaTeam
  ),
  treasury_share: new BN(decodedValAccLayout.treasuryShare, 10, "le"),
  team_share: new BN(decodedValAccLayout.teamShare, 10, "le"),
};
 

//metadata pda account
const metadataAccount = (
  await PublicKey.findProgramAddress(
    [
      Buffer.from('metadata'),
      METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    METADATA_PROGRAM_ID,
  )
)[0];


  const PDA = await PublicKey.findProgramAddress(
    [Buffer.from("escrow")],
    escrowProgramId
  );

  //fetch creators

  const nftMetadata = await fetchMetadata(mint);
  console.log(nftMetadata.length > 0 && nftMetadata[0]  &&  nftMetadata[0].data && nftMetadata[0].data.creators.length > 0 && nftMetadata[0].data.creators ,"nft metadata from mint ");
  const addressArray =  nftMetadata.length > 0 && nftMetadata[0]  &&  nftMetadata[0].data && nftMetadata[0].data.creators.length > 0 && nftMetadata[0].data.creators.map(e=> ({address: e.address}))
  console.log("addressArray",addressArray)


 const keystest=[
  { pubkey: bobPub, isSigner: true, isWritable: false },
  { pubkey: bobXAccountPub, isSigner: false, isWritable: true },
  {
    pubkey: escrowState.XTokenTempAccountPubkey,
    isSigner: false,
    isWritable: true,
  },
  {
    pubkey: escrowState.initializerAccountPubkey,
    isSigner: false,
    isWritable: true,
  },
  {
    pubkey: escrowState.TokenMintKey,
    isSigner: false,
    isWritable: true,
  },
  { pubkey: escrowStateAccountPubkey, isSigner: false, isWritable: true },
  { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
  { pubkey: systemProgramId, isSigner: false, isWritable: false },
  { pubkey: PDA[0], isSigner: false, isWritable: false },
  { pubkey: metadataAccount, isSigner: false, isWritable: false },

  { pubkey: valUpdateAccountPubkey, isSigner: false, isWritable: true },
  {
    pubkey: valAccState.val_treasury,
    isSigner: false,
    isWritable: true,
  },
  {
    pubkey: valAccState.val_team,
    isSigner: false,
    isWritable: true,
  },
 ]

const newArr = [
 ...keystest, ...addressArray.map(e=> ({pubkey: new PublicKey(e.address) ,isSigner:false, isWritable: true})
  )
];

console.log(newArr);


// sending transaction

  const exchangeInstruction = new TransactionInstruction({
    programId: escrowProgramId, 
    data: Buffer.from(
      Uint8Array.of(1, ...new BN(1).toArray("le", 8))
    ),
    keys: newArr,
  });


  console.log("Sending Bob's transaction...");
  await sendTxUsingExternalSignature(
    [exchangeInstruction], 
    connection,
    null,
    [],
    bobPub,
  );

    // sleep to allow time to update
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if ((await connection.getAccountInfo(escrowStateAccountPubkey)) !== null) {
      console.log("Escrow account has not been closed");
    } 
  
    if (
      (await connection.getAccountInfo(escrowState.XTokenTempAccountPubkey)) !==
      null
    ) {
      console.log("Temporary X token account has not been closed"); 
    }

    console.log(
      "✨Trade successfully executed. All temporary accounts closed✨\n"
    );
}
