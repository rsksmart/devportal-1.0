---
layout: rsk
title: rns-artifacts - Multi-crypto Resolver
---

Implementation of the Multi Chain Resolver described on [RNSIP-03](https://github.com/rnsdomains/RNSIPs/blob/master/IPs/RNSIP03.md).

## Usage

### Resolving multichain

```js
function async resolve (node, chain) {
  const chainAddr = await multiChainResolver.chainAddr(node, chain);
  return chainAddr;
}
```


### Setting multichain reslolution

```js
const node = namehash('rif.rsk');
const chain = '0x80000000'; // BTC
const addr = '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX';

await multiChainResolver.setChainAddr(node, chain, addr);
```
