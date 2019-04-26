---
layout: rns
title: RNS Testnet
---

To test application integrations, we've deployed two variants of RNS contracts in the [RSK Testnet](https://explorer.testnet.rsk.co), an [auction registrar](#auction-variant) (a clone of mainnet), and a [First Come First Served](#fcfs-variant) variant, both connected with the [tRIF token](#trif).


## Variant periods

| | Auction | FCFS |
| Bid period | 3 days | N/A |
| Unseal period | 2 days | N/A |
| Late unseal period | 15 days | N/A |
| Renew period | 3 months | 3 days |
| Domain validity | 1 year | 7 days |


## Auction variant

| [Registry](/Architecture/Registry) | [0x83355fcb41acbe3919e4ff73ecffc07a3147b7e8](http://explorer.testnet.rsk.co/address/0x83355fcb41acbe3919e4ff73ecffc07a3147b7e8) |
| [Registrar](/Architecture/Registrar) | [0xb0cf0517302acf52f967d0342827ff9c01d353f2](http://explorer.testnet.rsk.co/address/0xb0cf0517302acf52f967d0342827ff9c01d353f2) |
| [Public Resolver](/Architecture/Resolver) | [0xf1143e2797bef4f8bd6059605e8134686efaa355](http://explorer.testnet.rsk.co/address/0xf1143e2797bef4f8bd6059605e8134686efaa355) |

## FCFS variant

| [Registry](/Architecture/Registry) | [0xc1f9b554f9764a8b9db5d30d99c0a99ccf30b895](http://explorer.testnet.rsk.co/address/0xc1f9b554f9764a8b9db5d30d99c0a99ccf30b895) |
| Registrar | [0xb39103ddb46edb1d64a26e9958c7cf458dbc4023](http://explorer.testnet.rsk.co/address/0xb39103ddb46edb1d64a26e9958c7cf458dbc4023) <br/> **ABI**: [TestnetFCFSRegistrar.json](/Architecture/TestnetFCFSRegistrar.json) |
| [Public Resolver](/Architecture/Resolver) | [0x40669137f90206bb3533358ebbd0f1910c39238a](http://explorer.testnet.rsk.co/address/0x40669137f90206bb3533358ebbd0f1910c39238a) |


## tRIF

| Token Name | tRIF |
| Total Supply | 1,000,000,000 tRIF |
| Contract Testnet Address | [0xd8c5adcac8d465c5a2d0772b86788e014ddec516](https://explorer.testnet.rsk.co/address/0xd8c5adcac8d465c5a2d0772b86788e014ddec516) |
| Contract Type | ERC677 |

Get tRIF tokens to interact with RNS Testnet variants from the [tRIF faucet](https://faucet.rifos.org).