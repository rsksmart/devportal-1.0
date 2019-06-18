---
layout: rns
title: Javacript Library
---

The Resolver SDK provides facilities to interact with a Resolver Contract from a NodeJS project.

## NPM Library

[https://www.npmjs.com/package/@rnsdomains/rns-sdk-js](https://www.npmjs.com/package/@rnsdomains/rns-sdk-js)
<br>
(Use [https://nodei.co](https://nodei.co))

## Usage

At first install the library

```bash
npm install @rnsdomains/rns-sdk-js
```

On the NodeJS project, import and instance the Resolver SDK

```js
// import RNS's Resolver SDK object.
var Resolver = require('@rnsdomains/rns-sdk-js');
```

```js
// instance RNS's Resolver SDK object.
resolver = new Resolver(currentProvider, resolverAddress, resolverABI);
```

Whose parameters are:
- `currentProvider`: a web3 provider to use to communicate with the blockchain. Defaults to the public RSK node. If the provider has account's credentials, so 'setAddr' and 'setContent' can be used because gas consumption.
- `resolverAddress`: the address of the RNS Resolver. Defaults to the public RNS Resolver.
- `resolverABI`: the RNS Resolver's abi . Defaults to the public RNS Resolver. A way to get the abi is:

	```js
	solc --abi {resolver-contract}
	```

With `{resolver-contract}` the contract file name.

## Methods

 Functions that require communicating with the node return promises, rather than using callbacks. A promise has a `then` function, which takes a callback and will call it when the promise is fulfilled; `then` returns another promise, so you can chain callbacks.

 Assume at first, the next sentence is executed:

```js
var Resolver = require('@rnsdomains/rns-sdk-js');
resolver = new Resolver(currentProvider, resolverAddress, resolverABI);
```

#### getNode

**Signature**
```js
getNode(nameDomain)
```

**Parameters**
- `nameDomain`: the string of a domain


#### setAddr

Sets the address associated with an RNS domain.

**Signature**
```js
setAddr(nameDomain, addr, fromAccount)
```

**Parameters**
- `nameDomain`: the string of a domain name.
- `addr`: the address that `nameDomain` will be associated.
- `fromAccount`: the owner's address of the domain.

**Example**
```js
var name = 'foo.rsk'
var address = '0x53ab..'
var addressOwner = '0x334d..'
resolver.setAddr(name, address, addressOwner)
```

#### addr

Returns the address associated with an RNS node or 0x00 if address is not set.

**Signature**
```js
addr(nameDomain)
```

**Parameters**
- `nameDomain`: the string of a domain name.

**Example**
```js
var addr = resolver.addr('foo.rsk') //It returns 0x53ab..
```

#### setContent

Sets the hash associated with an RNS domain.

**Signature**
```js
setContent(nameDomain, hash, fromAccount)
```

**Parameters**
- `nameDomain`: the string of a domain name.
- `hash`: the hash that `nameDomain` will be associated.
- `fromAccount`: the owner's address of the domain.

**Example**
```js
var name = 'foo.rsk'
var hash = '0x11..'
var addressOwner = '0x334d..'
resolver.setContent(name, address, addressOwner)
```

#### content

Returns the hash associated with an RNS node or 0x00 if address is not set.

**Signature**
```js
hash(nameDomain)
```

**Parameters**
- `nameDomain`: the string of a domain name.

**Example**
```js
var hash = resolver.hash('foo.rsk') //It returns 0x11....
```

#### has

Returns true if the specified node has the specified record type.

**Signature**
```js
has(nameDomain, kind)
```

**Parameters**
- `nameDomain`: the string of a domain name.
- `kind`: the record type name, as specified in [RNSIP01](https://github.com/rnsdomains/RNSIPs/blob/master/IPs/RNSIP01.md).

**Example**
```js
resolver.has('foo.rsk', 'addr') //has returns true.
resolver.has('foo.rsk', 'hash') //has returns true.
resolver.has('foo.rsk', 'coffee') //has returns false.
```

#### supportsInterface

Returns true if the resolver implements the interface specified by the provided interfaceID (hash). The following interfaces are defined:

| Interface name | Interface hash | Specification |
| --- | --- | --- |
| `addr` | 0x3b3b57de | Contract address |
| `hash` | 0xd8389dc5 | Hash |

For more information, see [RNSIP02](https://github.com/rnsdomains/RNSIPs/blob/master/IPs/RNSIP02.md)

**Signature**
```js
supportsInterface(interfaceID)
```

**Parameters**
- `interfaceID`: the ID (hash) of the interface to check for.

**Example**
```js
resolver.supportsInterface('0x3b3b57de') //supportsInterface returns true.
resolver.supportsInterface('0xd8389dc5') //supportsInterface returns true.
resolver.supportsInterface('0x11122233') //supportsInterface returns false.
```
