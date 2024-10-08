import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js';

export interface GlobalPool {
    lotteryNftCount: anchor.BN,    // 12
    fixedNftCount: anchor.BN,  // 12
}

export interface StakedNFT {
    nftAddr: PublicKey,         // 32
    stakeTime: anchor.BN,   // 8
    rate: anchor.BN,         // 8
}

export interface UserPool {
    owner: PublicKey,            // 32
    itemCount: anchor.BN,      // 8
    items: StakedNFT[],   // 48 * 50
    rewardTime: anchor.BN,                         // 8
    pendingReward: anchor.BN,                       // 8
}
export interface UserToken {
    owner: PublicKey,            // 32
    itemCount: anchor.BN,      // 8
    items: StakedNFT[],   // 48 * 50
    rewardTime: anchor.BN,                         // 8
    pendingReward: anchor.BN,                       // 8
}
