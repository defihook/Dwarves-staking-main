export type StakingProgram = {
  "version": "0.1.0",
  "name": "staking_program",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initializeFixedPool",
      "accounts": [
        {
          "name": "userFixedPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "stakeNftToFixed",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userFixedPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destNftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "dwarf",
          "type": "string"
        },
        {
          "name": "occupation",
          "type": "string"
        },
        {
          "name": "season",
          "type": "string"
        },
        {
          "name": "gemstone",
          "type": "string"
        }
      ]
    },
    {
      "name": "withdrawNftFromFixed",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userFixedPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destNftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "claimReward",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userFixedPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userRewardAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "GlobalPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lotteryNftCount",
            "type": "u64"
          },
          {
            "name": "fixedNftCount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UserPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "itemCount",
            "type": "u64"
          },
          {
            "name": "items",
            "type": {
              "array": [
                {
                  "defined": "StakedNFT"
                },
                50
              ]
            }
          },
          {
            "name": "rewardTime",
            "type": "i64"
          },
          {
            "name": "pendingReward",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Item",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "nftAddr",
            "type": "publicKey"
          },
          {
            "name": "stakeTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "StakedNFT",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nftAddr",
            "type": "publicKey"
          },
          {
            "name": "stakeTime",
            "type": "i64"
          },
          {
            "name": "rate",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidUserPool",
      "msg": "Invalid User Pool"
    },
    {
      "code": 6001,
      "name": "InvalidPoolError",
      "msg": "Invalid pool number"
    },
    {
      "code": 6002,
      "name": "InvalidNFTAddress",
      "msg": "No Matching NFT to withdraw"
    },
    {
      "code": 6003,
      "name": "InvalidOwner",
      "msg": "NFT Owner key mismatch"
    },
    {
      "code": 6004,
      "name": "InvalidWithdrawTime",
      "msg": "Staking Locked Now"
    },
    {
      "code": 6005,
      "name": "IndexOverflow",
      "msg": "Withdraw NFT Index OverFlow"
    },
    {
      "code": 6006,
      "name": "LackLamports",
      "msg": "Insufficient Lamports"
    }
  ]
};

export const IDL: StakingProgram = {
  "version": "0.1.0",
  "name": "staking_program",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initializeFixedPool",
      "accounts": [
        {
          "name": "userFixedPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": []
    },
    {
      "name": "stakeNftToFixed",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userFixedPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destNftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        },
        {
          "name": "dwarf",
          "type": "string"
        },
        {
          "name": "occupation",
          "type": "string"
        },
        {
          "name": "season",
          "type": "string"
        },
        {
          "name": "gemstone",
          "type": "string"
        }
      ]
    },
    {
      "name": "withdrawNftFromFixed",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userFixedPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destNftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "claimReward",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userFixedPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "globalAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rewardVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userRewardAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "globalBump",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "GlobalPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "lotteryNftCount",
            "type": "u64"
          },
          {
            "name": "fixedNftCount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "UserPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "itemCount",
            "type": "u64"
          },
          {
            "name": "items",
            "type": {
              "array": [
                {
                  "defined": "StakedNFT"
                },
                50
              ]
            }
          },
          {
            "name": "rewardTime",
            "type": "i64"
          },
          {
            "name": "pendingReward",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Item",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "nftAddr",
            "type": "publicKey"
          },
          {
            "name": "stakeTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "StakedNFT",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nftAddr",
            "type": "publicKey"
          },
          {
            "name": "stakeTime",
            "type": "i64"
          },
          {
            "name": "rate",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidUserPool",
      "msg": "Invalid User Pool"
    },
    {
      "code": 6001,
      "name": "InvalidPoolError",
      "msg": "Invalid pool number"
    },
    {
      "code": 6002,
      "name": "InvalidNFTAddress",
      "msg": "No Matching NFT to withdraw"
    },
    {
      "code": 6003,
      "name": "InvalidOwner",
      "msg": "NFT Owner key mismatch"
    },
    {
      "code": 6004,
      "name": "InvalidWithdrawTime",
      "msg": "Staking Locked Now"
    },
    {
      "code": 6005,
      "name": "IndexOverflow",
      "msg": "Withdraw NFT Index OverFlow"
    },
    {
      "code": 6006,
      "name": "LackLamports",
      "msg": "Insufficient Lamports"
    }
  ]
};
