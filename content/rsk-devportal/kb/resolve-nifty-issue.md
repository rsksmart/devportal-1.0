---
layout: rsk
menu_title: Resolve Nifty Issue
title: Resolve Nifty Wallet Issue
description: "Resolution for breaking change in derivation path for Nifty Wallet 5"
tags: tutorial, nifty, chainId, address, derivation, bip44, slip44
---

> Note: The Nifty browser wallet has been discontinued. See the [Nifty Wallet)](https://developers.rsk.co/wallet/use/nifty) page for more information.

## Nifty wallet version 5

Recently, Nifty Wallet has fixed this issue:
[Incorrect addresses derived from mnemonic for custom networks (RSK/ETC)](https://github.com/poanetwork/nifty-wallet/issues/331).
Before it was fixed, Nifty incorrectly used Ethereum derivation paths,
instead of the RSK derivation paths:

- RSK Mainnet derivation path: `m/44’/137’/0’/0`
- RSK Testnet derivation path: `m/44’/37310’/0’/0`

This was a **breaking change**.
Check out Nifty's release notes for more information:
[Nifty Wallet Release 5.0.0](https://forum.poa.network/t/nifty-wallet-release-5-0-0/3335)
and [Nifty Wallet Release 5.1.0](https://forum.poa.network/t/nifty-wallet-release-5-1-0/3440).

Also check out RSK's documentation on our
[derivation paths](/rsk/architecture/account-based/ "Account Based RSK Addresses").

## If you created your wallet after this release

Continue using Nifty Wallet.
No further action is necessary.

## If you created your wallet before this release

If you created your wallet (and therefore accounts)
prior to this release, you will see this label:

> The account is derived from
> ETH derivation path despite you connected to another chain.
> If you are ready to switch to correct derivation path, just
> restore from the same seed phrase.

In other words, this means that your seed phrase was used to
generate your account as if it were an Ethereum account
and not an RSK account.
You will see your account as usual until you restore your seed.
Once you do that, you won't find your former account and,
therefore, your balance.
If that happens, and you didn't move your funds, not to worry,
you will be able to derive the **original set** of addresses by
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