---
layout: rns-artifacts
title: rns-artifacts
---

Welcome to the `rns-artifacts`!

`rns-artifacts` is a library for smart contract development.

It provides implementations of RNS Registry, Registrars, and Resolvers which you can deploy as-is or extend to suit your needs, as well as Solidity components to build custom contracts and more complex decentralized systems.

[Registrar](registrar): contract owner of a node. It can emit subnodes and set their owners. For example `rsk` owner can change `alice.rsk` owner.
- [Subdomain Registrar](registrar/Subdomain-Registrar)
- [Public Subdomain Registrar](registrar/Public-Subdomain-Registrar)
- [Price Subdomain Registrar](registrar/Price-Subdomain-Registrar)

[Resolver](resolver): contract responsible for performing resource lookups for a name - for instance, returning a contract address, a content hash, or IP address(es) as appropriate.
- [Multi-crypto Resolver](resolver/Multi-Chain-Resolver)


