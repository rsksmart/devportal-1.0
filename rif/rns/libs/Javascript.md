---
layout: rsk
title: Javacript Library
---

```
npm i web3 @rsksmart/rns
```

Source code: https://github.com/rnsdomains/rns-js
npm: https://www.npmjs.com/package/@rsksmart/rns

## Basic usage

```javascript
import Web3 from 'web3'
import RNS from '@rsksmart/rns'

const web3 = new Web3('https://public-node.rsk.co')
const rns = new RNS(web3)
```

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

Reverse lookup: get name of a given address:
```javascript
rns.reverse('0x0000000000000000000000000000000123456789').then(console.log)
```

## Advanced usage

Use Web3 `Contract`s directly

```javascript
async function myCustomGetOwner(domain) {
  const web3 = new Web3('https://public-node.rsk.co')
  const rns = new RNS(web3)
  await rns.compose()

  const owner = await rns.contracts.registry.methods.owner(domain).call()
  return owner;
}
```
