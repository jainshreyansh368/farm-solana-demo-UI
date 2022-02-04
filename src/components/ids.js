import { PublicKey } from "@solana/web3.js";


///////////////////////////////////// Program ids ////////////////////////////
export const farmprogramID = new PublicKey(
    "EdJUmGDzpN8764WNDNJ5mb3BxQ6GaaivVVLiCmWMnRd8"
);

export const routerProgramId = new PublicKey(
    "6GBheUNats8dbucipnfiS2Xi6QZKJ9yKYgst8JJHdGfP"
);

export const new_routerProgramId = new PublicKey(
    "HgktVTMCv7pp8xXiinHFsHa6zeGsY7YWjkn31uVSrZpg"
);

export const  token_swap_program_id = new PublicKey(
    "8eU8zdcLU7tEFHbj9KbrxS8jcB9vCEnECSL85pCawZtm"
)

    
//old
// export const amm_id = new PublicKey(
//     "H8BtP7XZkvyvYWKD2bbZpX7MfskaAvNjtSQpLJwTFcR9"
// );

export const amm_id = new PublicKey(
    "CpngbH3etfADjSyyseg8SkEaPKwH5C8vvquXgvygAVre"
);

export const pool_token_a_account = new PublicKey(
    "GnrxoVH9WXLigk5GGYhpjoqRdUuhQaaWbfuCSR3FiChF"
)


export const pool_token_b_account = new PublicKey(
    "DSZWd4RMQ6d8a9muz9jiyS9dj3A5eMZJTKQiUaRe92fM"
)


//////////////////////// mints //////////////////
//old
// export const lp_mint = new PublicKey(
//     "9XEsTPdWwXqPFd8195s1ndBfCNruZ6c5tWHu6ehm5LVL"
// );

export const lp_mint = new PublicKey(
    "GGaHMX5fycueuG7Bnw95dkyV7WrCMMwzHqKT9usjR8mf"
);


export const reward_mint = new PublicKey(
    "A3Pgn5YsjR1jKYiAbHGyW7ts1w4U46rRRgukd4a2G39c"
);

export const token_a_mint = new PublicKey(
    "FNnhUvcMoN5QNyNvcro9Bkwccegk5s4rJ11DAZMtmTrz"
);

export const token_b_mint = new PublicKey(
    "5K6HxPHfsRBhuifnZWmURsSUBWY93Y26iVjhfNEBNfet"
);


////////////////////////////state account //////////

export const programFarmData = new PublicKey(
    "6zGkhsz6BLYmLRTrk8Vs9xGd83UFLE1PFyBxEAULs1eR"
);

export const farm_state = new PublicKey(
    "5gG7KXXcxZkFfqVZV6AtUfPGV7SyLPzxW7VdeA999Rer"
);

export const user_state_data_temp_acc = new PublicKey(
    "53C1E1kjgnzX8BU4f2DEagAxtcD65D3n1NWwLPMJ8AZJ"
);

export const user_state_data_id_acc = new PublicKey(
    "HYgAADeGuQDrLWih9kDpGKFn7jFjmGWafYhx5YBvHw2T"
);

// export const user_state_data_wallet1_acc = new PublicKey(
//     "DtTPo6LEDbM2FJgzM72ggtFVbj9rJAW2Mpy4kwXxeRC9"
// );

// export const user_state_data_game_acc = new PublicKey(
//     "86Zttto1DuvgZqLFTEn6L3UkrHg5NL8nsfvWDkxaGKj3"
// );

//old
// export const vault_state_account = new PublicKey(
//     "9H4CH1bBAUynwugJux4EkhiHs9ZDU5B6XWUf3GUBGnbS"
// );

export const vault_state_account = new PublicKey(
    "7HmoHexybA5mfQFzvZV3Q4PRiJZzJtAzysuyuVXj4DJi"
);



/*

  tokenSwapPoolStateAccount: 'CpngbH3etfADjSyyseg8SkEaPKwH5C8vvquXgvygAVre',
  tokenPoolMint: 'GGaHMX5fycueuG7Bnw95dkyV7WrCMMwzHqKT9usjR8mf',
  feeAccount: '5DPM1JBCkQJ1AnfuBQHDCZGxEVjnfB6fFxsVbTSYYWcN',
  tokenAccountA: 'GnrxoVH9WXLigk5GGYhpjoqRdUuhQaaWbfuCSR3FiChF',
  tokenAccountB: 'DSZWd4RMQ6d8a9muz9jiyS9dj3A5eMZJTKQiUaRe92fM',
  mintA: 'FNnhUvcMoN5QNyNvcro9Bkwccegk5s4rJ11DAZMtmTrz',
  mintB: '5K6HxPHfsRBhuifnZWmURsSUBWY93Y26iVjhfNEBNfet',
  tokenProgramId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  
*/