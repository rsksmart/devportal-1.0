---
layout: rns-artifacts
title: rns-artifacts - Price Subdomain Registrar
---
This contract is owner of an RNS node and allows anyone who is whitelisted to create subnodes under the given
RNS node, and sends a token price to the new owner.

### Usage

```js
const rootNode = namehash('rsk');
const rootLabel = web3.utils.sha3('rsk');

const whitelist = await Whitelist.new();
const registrar = await PriceSubdomainRegistrar.new(rns.address, whitelist.address, token.address, rootNode);

await whitelist.addManager(registrar.address);
await whitelist.addManager(whitelister);

const adminAddress = await registrar.admin();
await token.transfer(adminAddress, 1e19);

await rns.setSubnodeOwner(0, rootLabel, registrar.address);

const label = web3.utils.sha3('rns');
await whitelist.addWhitelisted(otherAccount, { from: whitelister });
await registrar.register(label, { from: otherAccount });
```
