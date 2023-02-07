---
layout: rsk
title: RNS JS Library - Getting Started
tags: rif, rns, rif-name-service, javascript,  domains, address, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

## Installation

```
npm i web3 @rsksmart/rns
```

- Source code: [github.com/rnsdomains/rns-js](https://github.com/rnsdomains/rns-js)
- npm: [npmjs.com/package/@rsksmart/rns](https://www.npmjs.com/package/@rsksmart/rns)

Or just use it directly in your webpage:
```
<script src="https://unpkg.com/web3@1.2.6/dist/web3.min.js"></script>
<script src="https://unpkg.com/@rsksmart/rns@1.5.11/lib/rns.min.js"></script>
```
> Don't forget to specify the desired version of the package!

## Basic usage

```javascript
import Web3 from 'web3'
import RNS from '@rsksmart/rns'
import { ChainId } from '@rsksmart/rns/types'

const web3 = new Web3('https://public-node.rsk.co')
const rns = new RNS(web3)
```

> Remember that if you are running the code in a webpage, no `import` statements are needed, just instantiate the libs made available in the global scope.

> Find instructions in the [advanced usage](/rif/rns/libs/javascript/Advanced-usage/) section if running local or custom blockchains.


Get an address:
```javascript
rns.addr('testing.rsk').then(console.log)
```

Get Bitcoin address:
```javascript
rns.addr('testing.rsk', ChainId.BITCOIN).then(console.log)
```

Check if `example.testing.rsk` subdomain is available:
```javascript
rns.subdomains.available('testing.rsk', 'example').then(console.log)
```

Reverse lookup: Get the name of a given address:
```javascript
rns.reverse('0x0000000000000000000000000000000123456789').then(console.log)
```

Create a subdomain under my parent domain:

```javascript
const newOwnerAddress = '0x0000000000000000000000000000000000000001';
rns.subdomains.setOwner('mydomain.rsk', 'example', newOwnerAddress);
```

Check out the [operations](/rif/rns/libs/javascript/Operations)
specification for more details.

## Advanced usage

If you want to interact directly with the contracts, find instructions in the the [advanced usage](/rif/rns/libs/javascript/Advanced-usage) section.
