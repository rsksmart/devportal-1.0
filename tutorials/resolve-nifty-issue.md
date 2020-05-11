---
layout: rsk
title: Resolve Nifty Wallet Issue
description: "Resolution for breaking change in derivation path for Nifty Wallet 5.0.0"
tags: tutorial, nifty, chainId, address, derivation, bip44, slip44
---

## Am I affected?

First, check your Nifty wallet version:
- Click the menu on the right (three horizontal lines)
- Click "Info/Help"
- If version is "5.0.0", then read the next section. If not, you are OK.
## Nifty wallet version 5.0.0

Recently, Nifty Wallet has fixed this issue:
[Incorrect addresses derived from mnemonic for custom networks (RSK/ETC)](https://github.com/poanetwork/nifty-wallet/issues/331).
Before it was fixed, Nifty incorrectly used Ethereum derivation paths,
instead of the RSK derivation paths:

- RSK Mainnet derivation path: `m/44’/137’/0’/0`
- RSK Testnet derivation path: `m/44’/37310’/0’/0`

This was a **breaking change**.
Check out Nifty's release notes for more information:
[Nifty Wallet Release 5.0.0](https://forum.poa.network/t/nifty-wallet-release-5-0-0/3335).

Also check out RSK's documentation on our
[derivation paths](/rsk/architecture/account-based/ "Account Based RSK Addresses").

## If you created your accounts after this release

Continue using Nifty Wallet.
No further action is necessary.

## If you created your accounts before this release

If you created your account prior to this release,
the same seed phrase will result in a the derivation of
a **different set** of addresses.
This means that Nifty Wallet will **not** display the same
set of addresses which you saw previously,
and therefore you will have zero balances.

Not to worry, you will be able to derive
the **original set** of addresses by
[adding RSK as a custom node](#add-rsk-as-custom-node).

## Add RSK as custom node

To continue to use the derivation paths that were used previously by Nifty Wallet,
perform the following steps to add RSK as a custom node.

- Open Nifty Wallet
- Go to **Custom RPC**

  ![Nifty Wallet - Network Selection - New Custom RPC](/assets/img/tutorials/resolve-nifty-issue/1.png)
- Add `https://public-node.rsk.co` to the first field ("New RPC URL")

  ![Nifty Wallet - Network Settings - New RPC URL](/assets/img/tutorials/resolve-nifty-issue/2.png)
- Click "Save"

  ![Nifty Wallet - Network Settings - Save](/assets/img/tutorials/resolve-nifty-issue/3.png)
- Go back to the main screen and select this network in the network list

  ![Nifty Wallet - Network Selection - Selected Custom RPC](/assets/img/tutorials/resolve-nifty-issue/4.png)

Going forward, continue to operate with this configuration.
