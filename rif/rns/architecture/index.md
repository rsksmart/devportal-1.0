---
layout: rsk
title: Architecture
---

The RIF Name Service architecture is based on 3 main components:
- The [RNS Registry](registry). A tree-structured registry that provides an owner, a resolver, and a TTL for each existing domain.
- The [resolver](MultiCryptoResolver) of a domain is a contract that provides is a contract that provide information from a name in response to client requests.
- The owner of a domain can be an account or a contract, and is the only one who can create subdomains. Contracts that own domains are called Registrars. RNS provides a [public registrar](rsk-registrar) for registring .rsk domains, currently the only active top level domain.

RNS also provides the necessary architecture to perform [reverse lookups](ReverseSuite), this means finding a related domain for a given address.

> Read the [specs](../specs) to know more about the motivation for this architecture design.
