---
layout: rsk
title: Renewer
tags: rif, renewer, rns, rif-name-service, javascript,  domains, address, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

- Rootstock (RSK) MainNet: [0x7a9872a7615c475b62a62b8f6e491077fb05f663](https://explorer.rsk.co/address/0x7a9872a7615c475b62a62b8f6e491077fb05f663)
- Rootstock (RSK) TestNet: [0xe48ad1d5fbf61394b5a7d81ab2f36736a046657b](https://explorer.testnet.rsk.co/address/0xe48ad1d5fbf61394b5a7d81ab2f36736a046657b)
Has renewer role in `RSK Owner`.
- [Smart contract](https://github.com/rnsdomains/rns-rskregistrar/blob/master/contracts/Renewer.sol)

- Accepts payments via
  - ERC-20 `approve()` + `register()`.<sup>3</sup>
  - ERC-721 `transferAndCall()`.<sup>4</sup>
- Calculates price using `NamePrice` contract.
- It has an owner that can<sup>2</sup> change name price contract.

## Public methods

- [`price`](#price)
- [`renew`](#renew)

### `price`

```solidity
function price (string memory name, uint expires, uint duration) public view returns(uint);
```

Returns the price of a name in RIF

- `name` not used. Pass `''`
- `expires` not used. Pass `0`
- `duration` to register the name for.

### `renew`

```
function renew(string calldata name, uint duration) external;
```

Renews a name in Node Owner.

This method should be called if the domain is owned by someone.

You must have previously executed [`approve()`](https://github.com/riflabs/RIF-Token/blob/master/contracts/third-party/openzeppelin/token/ERC20/StandardToken.sol#L53) for the amount of tokens to be transferred.

- `name` The name to register.
- `duration` Time to register in years.

## Register via ERC-677

Use RIF [`transferAndCall` method](https://github.com/riflabs/RIF-Token/blob/master/contracts/RIF/RIFToken.sol#L278) with the following encoding to perform a RIF token transfer and domain renewal in a single transaction.

Encoding:

| size       | size          | offset   |
| ---------- | ------------- | -------- |
| signature  |  4 bytes      |  0 bytes |
| duration   | 32 bytes      |  4 bytes |
| name       | variable size | 36 bytes |

Parameters are used in the same manner as [`register`](/rif/rns/architecture/rsk-registrar/registrars/fifs#register). Use `0xc2c414c8` as the signature.

---

1. https://eips.ethereum.org/EIPS/eip-20
2. https://github.com/ethereum/EIPs/issues/677
3. https://github.com/OpenZeppelin/openzeppelin-contracts implementation.
