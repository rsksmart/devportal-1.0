---
layout: rsk
title: Subdomain Registrar
---

This contract is owner of an RNS node and allows anyone to create sub-nodes under this node.

### Usage

```js
const rootLabel = web3.utils.sha3('rsk');
const rootNode = namehash('rsk');

subdomainRegistrar = await SubdomainRegistrar.new(rns.address, rootNode);

await rns.setSubnodeOwner(0, rootLabel, subdomainRegistrar.address);

const label = web3.utils.sha3('rns');
await subdomainRegistrar.register(label, { from: otherAccount });
```
