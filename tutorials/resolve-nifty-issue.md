---
layout: rsk
title: Resolve Nifty Wallet Issue
---

Recently Nifty Wallet fixed the issue [Incorrect addresses derived from mnemonic for custom networks (RSK/ETC)](https://github.com/poanetwork/nifty-wallet/issues/331). Before it was fixed Nifty used ETH dpath instead of RSK:
- RSK Mainnet dpath: m/44’/137’/0’/0
- RSK Testnet dpath: m/44’/37310’/0’/0

If you had an account created using Nifty Wallet and you want to your recover funds, please go to [Nifty Wallet Release 5.0.0](https://forum.poa.network/t/nifty-wallet-release-5-0-0/3335). Also if you want to move your funds to Metamask, follow these steps:
- Open Nifty Wallet
- Export your seed (12 words) and write it down.
- Disable Nifty Wallet from Chrome extensions. (On your computer, open Chrome. -> At the top right, click More -> More tools and then Extensions. Check [Install and manage extensions](https://support.google.com/chrome_webstore/answer/2664769?hl=en))
- Install Or Enable Metamask Wallet.
- Import your seed. Check [Restoring MetaMask from seed phrase](https://metamask.zendesk.com/hc/en-us/articles/360015289612-Restoring-MetaMask-from-seed-phrase)
- Finally check step 2 (configuration) from [Send tokens through Metamask](/tutorials/send-tokens-through-metamask/)