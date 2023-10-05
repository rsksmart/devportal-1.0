---
menu_order: 300
menu_title: FIFS Addr Registrar
layout: rsk
title: First-in first-served + address setup .rsk registrar
tags: rif, rns, fifs, registrar, rif-name-service, javascript,  domains, address, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
description: "Register an RNS address using the FIFS registrar, with address resolution"
---

- RSK MainNet: [`0xd9c79ced86ecf49f5e4a973594634c83197c35ab`](https://explorer.rsk.co/address/0xd9c79ced86ecf49f5e4a973594634c83197c35ab)
- RSK TestNet: [`0x90734bd6bf96250a7b262e2bc34284b0d47c1e8d`](https://explorer.testnet.rsk.co/address/0x90734bd6bf96250a7b262e2bc34284b0d47c1e8d)
- [Smart contract](https://github.com/rnsdomains/rns-rskregistrar/blob/master/contracts/FIFSAddrRegistrar.sol)

Has registration role in `RSK Owner`.

- Adds an extra functionality to [FIFS Registrar](../fifs): Set address resolution in registration transaction.

The registration must be performed following [FIFS Registrar](../fifs) steps, adding address resolution in the last step.

> Find `transferAndCall()` encoder in `utils/index.js`, `getAddrRegisterData`

## `register` method

```
function register(string calldata name, address nameOwner, bytes32 secret, uint duration, address addr);
```

Registers a `.rsk` name in RNS.

This method must be called after committing.

You must have previously executed [`approve()`](https://github.com/riflabs/RIF-Token/blob/master/contracts/third-party/openzeppelin/token/ERC20/StandardToken.sol#L53) for the amount of tokens to be transferred.

- `name` The name to register.
- `nameOwner` The owner of the name to register.
- `secret` The secret used to make the commitment.
- `duration` Time to register in years.
- `addr` Address to set as addr resolution.

## Register via ERC-677

Use RIF [`transferAndCall` method](https://github.com/riflabs/RIF-Token/blob/master/contracts/RIF/RIFToken.sol#L278) with the following encoding to perform a RIF token transfer and domain registration in a single transaction

Encoding:

| parameter  | size          | offset    |
| ---------- | ------------- | --------- |
| signature  |  4 bytes      |   0 bytes |
| owner      | 20 bytes      |   4 bytes |
| secret     | 32 bytes      |  24 bytes |
| duration   | 32 bytes      |  56 bytes |
| addr       | 20 bytes      |  88 bytes |
| name       | variable size | 108 bytes |

Parameters are used in the same manner as [`register`](#register-method). Use `0x5f7b99d5` as the signature.
