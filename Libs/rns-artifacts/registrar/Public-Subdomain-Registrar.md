---
layout: rns-artifacts
title: rns-artifacts - Public Subdomain Registrar
---

This contract is owner of RNS nodes and allows anyone to create subnodes under any of them.

### Usage

```js
const rootNode = namehash('rsk');
const rootLabel = web3.utils.sha3('rsk');

await rns.setSubnodeOwner(0, rootLabel, publicSubdomainRegistrar.address);
await publicSubdomainRegistrar.delegate(rootNode);

const label = web3.utils.sha3('rns');
await publicSubdomainRegistrar.register(rootNode, label, { from: otherAccount });
```