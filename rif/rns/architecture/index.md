---
layout: rsk
title: Architecture
---

The RIF Name Service architecture is based on 4 components:
- [**Registry**](#registry): RNS domain registry.
- [**Resolver**](#resolver): the resolution between a domain and a resource.
- [**Reverse resolution**](#resolver): the resolution between an address and a name.

<img src="/assets/img/rns/structure.png" class="img-fluid" alt="architecture" />

## Registry

The [Registry contract](/rif/rns/architecture/Registry) stores and handles the resolution between a domain name, its owner and the resolver for the domain.

## Resolver

The Resolver contract handles the resolution between the name domain and the resource. Each Registry entry references a Resolver. A user can use [RNS Resolver](/rif/rns/architecture/Resolver) or [implement a custom Resolver](/rif/rns/operation/Resolve-a-name/).

## Reverse suite

A TLD, a [registrar](ReverseRegistrar), and a [resolver interface](AddrResolver) that allows for reverse resolution of RSK addresses using RNS. This permits associating a human-readable name with any RSK blockchain address. Resolvers can be certain that the reverse record was published by the owner of the RSK address in question.
