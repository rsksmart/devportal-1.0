---
menu_order: 200
menu_title: Web3
layout: rsk
title: How to Use Web3 to Interact with Smart Contracts | Rootstock (RSK)
tags: rif, rns, rif-name-service, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

To use web3 and interact with the contracts, we must instance `web3` with a provider. To do so we can use [Rootstock (RSK) public nodes](https://nodes.rsk.co):

```js
var Web3 = require('web3')

var web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider(config.node))
```

## RNS Registry

Instance the RNS Registry contract:

```js
const rnsAbi = []
const rnsAddress = ''
var rnsInstance = web3.eth.contract(rnsAbi)
var rns = registryInstance.at(rnsAddress)
```

And include `namehash` library:

```js
var namehash = require('eth-ens-namehash').hash
```

> `domain` field does include _.rsk_ suffix

Further reading: [RNS Registry contract](/rif/rns/architecture/registry).

### Change the resolver

```js
function setResolver(domain, newResolver) {
    var hash = namehash(domain)
    rns.setResolver(hash, newResolver)
}
```

Further reading: [`setResolver`](/rif/rns/architecture/registry#setresolver).

### Change the node owner

```js
function setOwner(domain, owner) {
    var hash = namehash(domain)
    rns.setOwner(hash, owner)
}
```

Further reading: [`setOwner`](/rif/rns/architecture/registry#setowner).

### Change the TTL

```js
function setTTL(domain, ttl) {
    var hash = namehash(domain)
    rns.setTTL(hash, ttl)
}
```

Further reading: [`setTTL`](/rif/rns/architecture/registry#setttl).

### Create a subdomain

This is also used to change the subdomain owner.

The `name` field is the subdomain inherited from the domain.

```js
function subdomain(domain, name, owner) {
    var domainHash = namehash(domain)
    var hash = web3.sha3(name)
    rns.setSubnodeOwner(domainHash, hash, owner)
}
```

Further reading: [`setSubnodeOwner`](/rif/rns/architecture/registry#setsubnodeowner).

## Resolver

Have a look at the [Resolve a name](/rif/rns/operations/Resolve-a-name) and [Public Resolver Contract](/rif/rns/architecture/Resolver) section for further information.
