import * as BufferLayout from "buffer-layout";

/**
     * Layout for a public key
     */
       const publicKey = (property = "publicKey") => {
        return BufferLayout.blob(32, property);
      }
/**
 * Layout for a 64bit unsigned value
 */
 const uint64 = (property = "uint64") => {
  return BufferLayout.blob(8, property);
};  

export const ESCROW_ACCOUNT_DATA_LAYOUT = BufferLayout.struct([

    BufferLayout.u8("isInitialized"),
    publicKey("sellerPubkey"),
    publicKey("tokenAccountPubkey"),
    publicKey("mintKey"),
    uint64("expectedAmount"),
  ]);
  
  export const VALHALLA_ACCOUNT_DATA_LAYOUT = BufferLayout.struct([

    BufferLayout.u8("isInitialized"),
    publicKey("valhallaTreasury"),
    publicKey("valhallaTeam"),
    uint64("treasuryShare"),
    uint64("teamShare"),
  ]);


  export const FARM_ACCOUNT_DATA_LAYOUT = BufferLayout.struct([

    BufferLayout.u8("isInitialized"),
    publicKey("owner"),
    publicKey("fee"),
    publicKey("rewardmint"),
    uint64("fee"),
    uint64("numerator"),
    uint64("deniominator"),
    uint64("totalallocpoint"),
    uint64("remainingalloc"),
    ]);

  export const FARM_STATE_LAYOUT = BufferLayout.struct([

    BufferLayout.u8("isInitialized"),
    publicKey("ammid"),
    publicKey("lpmint"),
    uint64("totalvalulocked"),
    uint64("allocpoint"),

  ]);

  export const FARM_USER_DATA_LAYOUT = BufferLayout.struct([

    BufferLayout.u8("isInitialized"),
    publicKey("user"),
    publicKey("farmstate"),
    uint64("stakedamount"),
    uint64("totalreward"),
    uint64("rewardbal"),
    uint64("starttime"),
    ]);