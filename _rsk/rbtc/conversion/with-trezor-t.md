---
layout: rsk
title: Accessing and using funds that are not in accounts derived with RSK dpath in Trezor T
tags: rsk, rbtc, conversion, peg, 2-way, peg-in, peg-out, federation, trezor, dpath
description: 'How to configure a Trezor T hardware wallet to derive with a custom dpath'
collection_order: 3160
---

This section is meant to explain how to solve the problem of moving your funds when they are in a account that needs to
be derived with a different derivation path using Trezor T.

## General context

If you made a [BTC to R-BTC conversion](#btc-to-r-btc-conversion) using Trezor T, you need to access your account by using a custom dpath (`44'/0'/0'/0/0` for Mainnet). With the last firmware versions, Trezor T is checking that the derivation path matches with the expected one as a safety feature and this is a blocker when you need to consciously use a different dpath.
You may also want to access your account with a different dpath if you made a mistake like receiving RBTC in an Ethereum address.

You probably tried to do it in MyCrypto or MyEtherWallet and you got this message: `"Forbidden key path"`.


## Solution

To allow custom derivation paths, you will need to turn off safety checks (see [Pavol Rusnak message](https://github.com/trezor/trezor-firmware/issues/1255#issuecomment-691463540)).

To do this, you need first to install [python-trezor](https://github.com/trezor/python-trezor):

```shell
pip3 install --upgrade setuptools
pip3 install trezor
```

Once you are ready, run this command:

```shell
trezorctl set safety-checks prompt
```
(you need to have your Trezor T unlocked and accept the configuration in the device)

After moving your funds, you can turn them on again:

```shell
trezorctl set safety-checks strict
```

