---
layout: rsk
title: RSK FIFS Registrar
---

First-in first-served registrar. This contract can be used to register .rsk names in RNS.

RSK Mainnet: [0x779195c53cc7c1a33bd2eea5f63f2c1da8798d61](https://explorer.rsk.co/address/0x779195c53cc7c1a33bd2eea5f63f2c1da8798d61)
Github: [https://github.com/rnsdomains/rns-rskregistrar/blob/master/contracts/FIFSRegistrar.sol]

## The process

0. Caclulate [`makeCommitment`](#makecommitment) hash of the domain to be registered (off-chain)
1. Commit the calculated hash with [`commit`](#commit)
2. Wait minCommitmentAge. [`canReveal`](#canreveal) will return true when time passed.
3. Execute registration via:
  - ERC-20 with `approve()` + [`register()`](#register)
  - ERC-677 with transferAndCall()

The price of a domain is given by [name price contract](nameprice).

## Methods

- [`makeCommitment`](#makecommitment)
- [`commit`](#commit)
- [`canReveal`](#canreveal)
- [`register`](#register)
- [`tokenFallback`](#tokenfallback)
- [`price`](#price)


### `makeCommitment`

```
function makeCommitment (bytes32 label, address nameOwner, bytes32 secret) public pure returns (bytes32)
```

Create a commitment for register action.

> Don't use this method on-chain when commiting.

Parameters:
- `label` keccak256 of the name to be registered.
- `nameOwner` Owner of the name to be registered.
- `secret` Secret to protect the name to be registered.

Returns: The commitment hash.

### `commit`

```
function commit(bytes32 commitment) external
```

Commit before registring a name.

> A valid commitment can be calculated using makeCommitment off-chain.

Parameters
- `commitment` A valid commitment hash.

### `canReveal`

```
function canReveal(bytes32 commitment) public view returns (bool)
```

Ensure the commitment is ready to be revealed.

> This method can be polled to ensure registration.

Parameters:
- `commitment` Commitment to be queried.

Returns: Wether the commitment can be revealed or not.

### `register`

```
function register(string calldata name, address nameOwner, bytes32 secret, uint duration) external
```

Registers a .rsk name in RNS.

> This method must be called after commiting.
>
> This method must be called after ERC-20 `approve`

Parameters:
- `name` The name to register.
- `nameOwner` The owner of the name to regiter.
- `secret` The secret used to make the commitment.
- `duration` Time to register in years.

### `tokenFallback`

```
function tokenFallback(address from, uint value, bytes calldata data) external returns (bool)
```

ERC-677 token fallback function.

> Use this method via RIF `transferAndCall` method.
>
> Follow 'Register encoding' to execute a one-transaction regitration.

Parameters:

- `from` token sender.
- `value` amount of tokens sent.
- `data` data associated with transaction.

Returns: true if successfull.

#### Register encoding

| | size | offset |
| - | - | - |
| signature  |  4 bytes | 0 bytes |
| owner      | 20 bytes | 4 bytes |
| secret     | 32 bytes | 24 bytes |
| duration   | 32 bytes | 56 bytes |
| name       | variable size | 88 bytes |

### `price`

```
function price (string memory name, uint expires, uint duration) public view returns(uint)
```

Price of a name in RIF

Parameters:
- `duration` Time to register the name

Returns: cost in RIF
