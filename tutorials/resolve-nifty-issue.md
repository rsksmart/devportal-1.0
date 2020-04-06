---
layout: rsk
title: Resolve Nifty Wallet Issue
---

Recently Nifty Wallet fixed the issue [Incorrect addresses derived from mnemonic for custom networks (RSK/ETC)](https://github.com/poanetwork/nifty-wallet/issues/331). Before it was fixed, Nifty used ETH dpath instead of RSK:
- RSK Mainnet dpath: m/44’/137’/0’/0
- RSK Testnet dpath: m/44’/37310’/0’/0

This is a breaking change, if you want to read more about this, click here [Nifty Wallet Release 5.0.0](https://forum.poa.network/t/nifty-wallet-release-5-0-0/3335).

## What to do if you created your account before this release: Add RSK as custom node

With this last release, you won't see your account as usual and therefore your balance. To recover your account and your balance, you should add RSK Network as custom node.

These are the steps:
- Open Nifty Wallet
- Go to **Custom RPC**
![](/assets/img/tutorials/resolve-nifty-issue/1.png)
- Add "https://public-node.rsk.co" to the first field
![](/assets/img/tutorials/resolve-nifty-issue/2.png)
- Click "Save"
![](/assets/img/tutorials/resolve-nifty-issue/3.png)
- Go back to the main screen and select this network in the network list
![](/assets/img/tutorials/resolve-nifty-issue/4.png)

**For this moment on always operate with this configuration**.