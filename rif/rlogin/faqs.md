---
layout: rsk
title: rLogin - FAQs
tags: rlogin, rif, rif-identity, web3, react, frontend, dapp, metamask, ledger, trezor, dcent, liquality, portis
description: rLogin - FAQs - frequent asked questions
---

Find all acknowledged bugs, future features, and improvements in [repo issues](http://github.com/rsksmart/rLogin/issues)

### Portis Support

[Portis](https://portis.io) is not [EIP1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md) compatible, however, rLogin creates a wrapper for it allowing `.request` methods to be called. Portis does not estimate the gasPrice correctly on Rootstock (RSK), so the wrapper will get the correct amount from the previous block. You can override this setting by passing `gasPrice` with your transaction. If your code uses the older `send` or `sendAsync` methods, you will also need to send the `gasPrice` attribute or the amount Portis adds will be too low.

The following methods are confirmed to work: `eth_chainId`, `eth_accounts`, `net_version`, `eth_getBlockByNumber`, `eth_sendTransaction`, `eth_sendRawTransaction`, `personal_sign`, `eth_signTypedData`.
