---
layout: rsk
title: Architecture
---

The RIF Name Service architecture is based on 4 components:
- [**Registry**](#registry): RNS domain registry.
- [**Registrar**](#registrar): the auction logic manager.
- [**Deeds**](#deed): handle locked tokens and rent payment commits.
- [**Resolver**](#resolver): the resolution between a domain and a resource.
- [**Reverse resolution**](#resolver): the resolution between an address and a name.

<img src="/assets/img/rns/structure.png" class="img-fluid" alt="architecture" />

## Registrar

To [register a domain](/rif/rns/operation/Register-a-name) in RNS is by auction that is performed by the [registrar contract](/rif/rns/architecture/Registrar). This contract manages the auction process, any user can start an auction for any available domain name, any user can bid in any auction in [Open state](/rif/rns/architecture/Registrar/#states), and only the highest bidder acquires that domain name.

The subdomains can be delegated using the [registry contract](/rif/rns/architecture/Registry) without an auction process only by the domain owner. For example: `nakamoto.rsk` can register `satoshi.nakamoto.rsk` subdomain directly, and delegate the ownership of the subdomain.

## Deed

The [Deed contract](/rif/rns/architecture/Deed) has two main functions:
- Register the bid payment: for each bid, the Registrar contract deploys a Deed contract and sends user's bade RIF tokens to it.

- Manage the annual rent: the owner must pay an annual rent for each domain acquired.

## Registry

The [Registry contract](/rif/rns/architecture/Registry) stores and handles the resolution between a domain name, its owner and the resolver for the domain.

## Resolver

The Resolver contract handles the resolution between the name domain and the resource. Each Registry entry references a Resolver. A user can use [RNS Resolver](/rif/rns/architecture/Resolver) or [implement a custom Resolver](/rif/rns/operation/Resolve-a-name/).

## Reverse suite

A TLD, a [registrar](ReverseRegistrar), and a [resolver interface](AddrResolver) that allows for reverse resolution of RSK addresses using RNS. This permits associating a human-readable name with any RSK blockchain address. Resolvers can be certain that the reverse record was published by the owner of the RSK address in question.
