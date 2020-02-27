---
layout: rsk
title: RNS JS Library - Getting Started
tags: rns, javascript
---

## Installation

```
npm i web3 @rsksmart/rns
```

- Source code: [github.com/rnsdomains/rns-js](https://github.com/rnsdomains/rns-js)
- npm: [npmjs.com/package/@rsksmart/rns](https://www.npmjs.com/package/@rsksmart/rns)

## Basic usage

```javascript
import Web3 from 'web3'
import RNS from '@rsksmart/rns'

const web3 = new Web3('https://public-node.rsk.co')
const rns = new RNS(web3)
```

> Find instructions in the [advanced usage](/rif/rns/libs/javascript/Advanced-usage/) section if running local or custom blockchains.


Get an address:
```javascript
rns.addr('testing.rsk').then(console.log)
```

Get Bitcoin address:
```javascript
rns.addr('testing.rsk', '0x80000000').then(console.log)
```

Check if `example.testing.rsk` subdomain is available:
```javascript
rns.isSubdomainAvailable('testing.rsk', 'example').then(console.log)
```

Reverse lookup: Get the name of a given address:
```javascript
rns.reverse('0x0000000000000000000000000000000123456789').then(console.log)
```

Create a subdomain under my parent domain:
```javascript
const newOwnerAddress = '0x0000000000000000000000000000000000000001';
rns.createSubdomain('mydomain.rsk', 'example', newOwnerAddress);
```

Check out the [operations](/rif/rns/libs/javascript/Operations)
specification for more details.

## Advanced usage

If you want to interact directly with the contracts, find instructions in the the [advanced usage](/rif/rns/libs/javascript/Advanced-usage) section.
