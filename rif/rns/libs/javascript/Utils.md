---
layout: rsk
title: RNS JS Library - Utils
tags: rif, rns, rif-name-service, utils, javascript,  domains, address, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

## Available methods

  - [`isValidDomain`](#isvaliddomain)
  - [`isValidLabel`](#isvalidlabel)
  - [`isValidTld`](#isvalidtld)
  - [`hasMethod`](#hasmethod)
  - [`hasAccounts`](#hasaccounts)
  - [`namehash`](#namehash)
  - [`labelhash`](#labelhash)

### `isValidDomain`

Validates the given domain syntax. It allows dots and alphanumeric lowercase characters.

**Signature**

```javascript
isValidDomain(domain:string): boolean;
```

**Parameters**

- `domain`: Domain to be validated.

**Returns**

- `bool`: true if valid, false if not

**Examples**

Valid domain:

```javascript
rns.utils.isValidDomain('testing123.rsk').then(console.log)
```

Invalid domain:

```javascript
rns.utils.isValidDomain('nOtVali-d.rsk').then(console.log)
```

### `isValidLabel`

Validates the given label syntax. It allows alphanumeric lowercase characters.

**Signature**

```javascript
isValidLabel(label:string): boolean;
```

**Parameters**

- `label`: Label to be validated.

**Returns**

- `bool`: true if valid, false if not

**Examples**

Valid label:

```javascript
rns.utils.isValidLabel('testing123').then(console.log)
```

Invalid label:

```javascript
rns.utils.isValidLabel('no%tvAl1d').then(console.log)
```

### `isValidTld`

Validates the given top level domain. For now, the only valid TLD is `rsk`

**Signature**

```javascript
isValidTld(tld:string): boolean;
```

**Parameters**

- `tld`: TLD to be validated.

**Returns**

- `bool`: true if valid, false if not

**Examples**

Valid TLD:

```javascript
rns.utils.isValidTld('rsk').then(console.log)
```

Invalid TLD:

```javascript
rns.utils.isValidTld('notvalid').then(console.log)
```

### `namehash`

Returns the namehash representation of the given domain

**Signature**

```javascript
namehash(domain:string): boolean;
```

**Parameters**

- `domain`: Domain to be converted.

**Returns**

- `string`: Namehash representation of the given domain

**Examples**

```javascript
rns.utils.namehash('testing.rsk').then(console.log)
```

### `labelhash`

Returns `0x` + the keccak256 representation of the given label.

**Signature**

```javascript
labelhash(label:string): boolean;
```

**Parameters**

- `label`: Label to be converted.

**Returns**

- `string`: Labelhash representation of the given domain

**Examples**

```javascript
rns.utils.labelhash('testing').then(console.log)
```

### `hasAccounts`

Checks if the given web3 instance has accounts to sign transactions

**Signature**

```javascript
hasAccounts(web3:Web3): boolean;
```

**Parameters**

- `web3`: Web3 instance.

**Returns**

- `bool`: true if has accounts, false if not

**Examples**

```javascript
const web3 = new Web3('https://public-node.rsk.co');
rns.utils.hasAccounts(web3).then(console.log)
```

### `hasMethod`

Checks if the contract in the given address has the given method

**Signature**

```javascript
hasMethod(web3:Web3, contractAddress:string, methodId: string): boolean;
```

**Parameters**

- `web3`: Web3 instance.
- `contractAddress`: address of the contract to check.
- `methodId`: the first 4 bytes of the keccak256 hash of the ASCII form of the signature

> How to obtain the methodId? 
>
> Given the following Solidity function
>
>```solidity
function max(uint256 a, uint256 b) internal pure returns (uint256) {
    return a >= b ? a : b;
}
```
> The signature is `max(uint256,uint256)`.
>
> The methodId is calculated with this Javascript function:
>
>```javascript
function getMethodId(signature) {
  const hash = keccak256(signature);
  return `0x${hash.substring(0, 8)}`;
}
```

**Returns**

- `bool`: true if has method, false if not

**Examples**

```javascript
const web3 = new Web3('https://public-node.rsk.co');
const address = '0x0000000000000000000000000000000000000001';
const methodHash = '0x01ffc9a7';
rns.utils.hasMethod(web3, contractAddress, methodHash).then(console.log)
```
