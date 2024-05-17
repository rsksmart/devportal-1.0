---
menu_title: Tools
title: "Flyover Protocol Documentation | Tools"
description: "Welcome to the flyover documentation, learn about the flyover architecture, how to get started and integrate the flyover protocol into your project."
tags: flyover, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, guide, setup, integrate, use
render_features: 'tables-with-borders'
layout: rsk
---

Find a list of tools, scripts, and github repos to build dApps using the flyover protocol.

## Liquidity Provider Server (LPS)

This is a [server](https://github.com/rsksmart/liquidity-provider-server) that interacts with a Liquidity Bridge Contract (LBC) to provide liquidity for users as part of the Flyover protocol. The server runs a local Liquidity Provider (LP), and also allows connections from remote LPs. See the [Configuration File](https://github.com/rsksmart/liquidity-provider-server#configuration) for LPS.

The Testnet LP Server is hosted at:
[https://flyover-lps.testnet.rsk.co/](https://flyover-lps.testnet.rsk.co/)

**System requirements:**
- go 1.16.5 or above
- DB Browser for Sqlite (or equivalent) or sqlite3 cli tool

### How to Set up LP Server Locally

See the liquidity provider [repo](https://github.com/rsksmart/liquidity-provider-server) for instructions.

Alternatively, you may choose to use a Testnet instance of the Liquidity Provider Server: `https://flyover-lps.testnet.rsk.co/`

## Hardhat

In this [custom script](https://github.com/Vovchyk/lbc-utils/blob/3662afed437c30ec7cd2b259247e4ed91db1442b/hardhat.config.ts#L26-L35) you can find an example of the `hashQuote` call, this uses hardhat + ethers.js to trigger hashQuote. See an example of the execution below:

```shell
npx hardhat hash-quote --quote 
'{"fedBTCAddr":"2N6JWYUb6Li4Kux6UB2eihT7n3rm3YX97uv","lbcAddr":"0x95357AE436F74E87d54f9Da6CC5fB88d91044bc3","lpRSKAddr":"0xd053b9B695BEb7104deEa56773197F05AD03E4e0","btcRefundAddr":"mnYcQxCZBbmLzNfE9BhV7E8E2u7amdz5y6","rskRefundAddr":"0x20E75e7287763de60851Ed020089ABf17a1e9a4d","lpBTCAddr":"mnYcQxCZBbmLzNfE9BhV7E8E2u7amdz5y6","callFee":1985872901000,"penaltyFee":1000000,"contractAddr":"0xa7047857679889B59fe01f6EFD01D074ab2bc2BF","data":"0xeb159db5000000000000000000000000caa520afa3c8ec7ce85bfca5a62f36159c73faa5000000000000000000000000e66fc9900e017c837f2f54fe3958f98f36064c11","gasLimit":3000000,"nonce":8863518911232213897,"value":50000000000000000,"agreementTimestamp":1659431697,"timeForDeposit":3600,"callTime":7200,"confirmations":2,"callOnRegister":false}'

Quote hash:  0x4e8cfbdcd99d1ff57ce4773ebe21d5f2c8ff240b38e751353688d6c9daba1708
```

## Github Repos

- [Liquidity Bridge Contract](https://github.com/rsksmart/liquidity-bridge-contract)
- [Liquidity Provider](https://github.com/rsksmart/liquidity-provider)
- [Liquidity Provider Server](https://github.com/rsksmart/liquidity-provider-server)
- [RSKIP 176: Fast Bridge Alternative](https://github.com/rsksmart/RSKIPs/pull/176/files)