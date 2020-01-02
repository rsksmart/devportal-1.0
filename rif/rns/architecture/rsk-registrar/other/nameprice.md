---
layout: rsk
title: Name Price
---

- MainNet: [0xd09adf13e482928e47e96dd6f02aad1daf7a5a47](https://explorer.rsk.co/address/0x779195c53cc7c1a33bd2eea5f63f2c1da8798d61)
- TestNet: [0x794f99f1a9382ba88b453ddb4bfa00acae8d50e8](https://explorer.testnet.rsk.co/address/0x36ffda909f941950a552011f2c50569fda14a169)
- [Smart contract](https://github.com/rnsdomains/rns-rskregistrar/blob/master/contracts/NamePrice.sol)

Determines the price of a domain.

| Years | Price |
| - | - |
| 1 | 2 RIF |
| 2 | 4 RIF |
| 2+k | 4+k RIF |

## Public methods

- [`price`](#price)


### `price`

```solidity
function price (string calldata /*name*/, uint /*expires*/, uint duration) external view returns(uint);
```

Calculate name price in RIF token for a given duration

Is a pure function, but converted to view due the [AbstractNamePrice](https://github.com/rnsdomains/rns-rskregistrar/blob/master/contracts/AbstractNamePrice.sol) spec.

- `duration` of the name to register in years

Return price in RIF tokens.
