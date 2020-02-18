---
layout: rsk
title: RNS JS Library - Instance
tags: rns, javascript
---

## Installation

```
npm i web3 @rsksmart/rns
```

- Source code: [github.com/rnsdomains/rns-js](https://github.com/rnsdomains/rns-js)
- npm: [npmjs.com/package/@rsksmart/rns](https://www.npmjs.com/package/@rsksmart/rns)

## Instance for queries to RSK Mainnet/Testnet

```javascript
import Web3 from 'web3'
import RNS from '@rsksmart/rns'

const web3 = new Web3('https://public-node.rsk.co') // or 'https://public-node.testnet.rsk.co'
const rns = new RNS(web3)
```

## Instance in Chrome with wallet extension (Metamask or Nifty) 

```javascript
import Web3 from 'web3'
import RNS from '@rsksmart/rns'

if (!window.web3) {
  throw new Error('No wallet installed')
}

const web3 = new Web3(window.web3.currentProvider)
const rns = new RNS(web3)
```

> Find instructions in the [advanced usage](/rif/rns/libs/javascript/advanced-usage) section if running local or custom blockchains.
