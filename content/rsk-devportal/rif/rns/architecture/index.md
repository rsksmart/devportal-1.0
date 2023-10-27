---
menu_order: 500
section_title: Architecture
menu_title: About Architecture
layout: rsk
title: Architecture
tags: rif, rns, rif-name-service, javascript,  domains, address, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

The RIF Name Service architecture is based on 3 main components:
- The [RNS Registry](./registry). A tree-structured registry that provides an owner, a resolver, and a TTL for each existing domain.
- The [resolver](./MultiCryptoResolver) of a domain is a contract that provides information from a name in response to client requests.
- The owner of a domain can be an account or a contract, and is the only one who can create subdomains. Contracts that own domains are called Registrars. RNS provides a [public registrar](./rsk-registrar) for registering `.rsk` domains, currently the only active top level domain.

RNS also provides the necessary architecture to perform [reverse lookups](./reverse-suite/), this means finding a related domain for a given address.

> Read the [specs](../specs/) to know more about the motivation for this architecture design.
