---
layout: rsk
title: First-in first-served .rsk registrar
tags: rif, rns, fifs, registrar, rif-name-service, javascript,  domains, address, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
description: "Register an RNS address using the FIFS registrar, without address resolution"
---

- Rootstock (RSK) MainNet: [`0x779195c53cc7c1a33bd2eea5f63f2c1da8798d61`](https://explorer.rsk.co/address/0x779195c53cc7c1a33bd2eea5f63f2c1da8798d61)
- Rootstock (RSK) TestNet: [`0x36ffda909f941950a552011f2c50569fda14a169`](https://explorer.testnet.rsk.co/address/0x36ffda909f941950a552011f2c50569fda14a169)
- [Smart contract](https://github.com/rnsdomains/rns-rskregistrar/blob/master/contracts/FIFSRegistrar.sol)

Has registration role in `RSK Owner`.

- Defines a commit-reveal process to avoid front-running.
- Accepts payments via
  - ERC-20 `approve()` + `register()`.<sup>1</sup>
  - ERC-677 `transferAndCall()`.<sup>2</sup>
- Calculates price using [`NamePrice` contract](../../other/nameprice).
- It has an owner that can<sup>3</sup>
  - Set minimum commitment age.
  - Set minimum registration name length available.
  - Change name price contract.

The registration must be performed as follows:

0. Calculate `makeCommitment` hash of the domain to be registered (off-chain).
1. Commit the calculated hash using `commit`.
2. Wait `minCommitmentAge` seconds.
3. Execute registration via ERC-20 (with approval) or ERC-677.

> Find `transferAndCall()` encoder in `utils/index.js`

## Methods

- [`price`](#price)
- [`makeCommitment`](#makecommitment)
- [`commit`](#commit)
- [`canReveal`](#canreveal)
- [`register`](#register)

### `price`

```solidity
function price (string memory name, uint expires, uint duration) public view returns(uint);
```

Calculates the price of a name, denominated in RIF.

- `name` not used. Pass `''`
- `expires` not used. Pass `0`
- `duration` to register the name for.

### `makeCommitment`

```
function makeCommitment (bytes32 label, address nameOwner, bytes32 secret) public pure returns (bytes32);
```

Create a commitment for register action.

:warning:  Don't use this method on-chain, as that will reveal your `secret`.
Instead run this method off-chain (note that it is `pure`), and save the return value.

- `label` keccak256 of the name to be registered.
- `nameOwner` Owner of the name to be registered.
- `secret` Secret to protect the name to be registered.

Returns the commitment hash.

### `commit`

```solidity
function commit(bytes32 commitment) external;
```

Commit before registering a name.

A valid commitment can be calculated using makeCommitment off-chain.

- `commitment` A valid commitment hash.

### `canReveal`

```solidity
function canReveal(bytes32 commitment) public view returns (bool);
```

Ensure the commitment is ready to be revealed.

This method can be polled to ensure registration.

- `commitment` Commitment to be queried.

Returns whether the commitment can be revealed or not.

### `register`

```
function register(string calldata name, address nameOwner, bytes32 secret, uint duration);
```

Registers a `.rsk` name in RNS.

This method must be called after committing.

You must have previously executed [`approve()`](https://github.com/riflabs/RIF-Token/blob/master/contracts/third-party/openzeppelin/token/ERC20/StandardToken.sol#L53) for the amount of tokens to be transferred.

- `name` The name to register.
- `nameOwner` The owner of the name to register.
- `secret` The secret used to make the commitment.
- `duration` Time to register in years.

## Register via ERC-677

Use RIF [`transferAndCall` method](https://github.com/riflabs/RIF-Token/blob/master/contracts/RIF/RIFToken.sol#L278) with the following encoding to perform a RIF token transfer and domain registration in a single transaction

Encoding:

| parameter  | size          | offset   |
| ---------- | ------------- | -------- |
| signature  |  4 bytes      |  0 bytes |
| owner      | 20 bytes      |  4 bytes |
| secret     | 32 bytes      | 24 bytes |
| duration   | 32 bytes      | 56 bytes |
| name       | variable size | 88 bytes |

Parameters are used int he same manner as [`register`](#register). Use `0xc2c414c8` as the signature.

---

1. https://eips.ethereum.org/EIPS/eip-20
2. https://github.com/ethereum/EIPs/issues/677
3. https://github.com/OpenZeppelin/openzeppelin-contracts implementation.
