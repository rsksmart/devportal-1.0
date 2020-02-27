---
layout: rsk
title: RNS JS Library - Error knowledge base
tags: rns, javascript
---

## `KB001`

**Message**: No addr resolution set

**Description**: The given domain has a resolver, but the resolution has not been set

## `KB002`

**Message**: No addr resolution

**Description**: The given domain has a resolver, but it does not support [addr](/rif/rns/architecture/Resolver/#addr) interface

## `KB003`

**Message**: No resolver

**Description**: The given domain doesn't have a resolver set

## `KB004`

**Message**: Library not composed

**Description**: Thrown when trying to accesses `rns.contracts` before executing `rns.compose()`

## `KB005`

**Message**: No contract addresses provided

**Description**: Thrown when constructing lib on a local/custom RNS environment and contract addresses are not provided

## `KB006`

**Message**: No chain address resolution

**Description**: The given domain has a resolver, but the resolution for the given chain has not been set

## `KB007`

**Message**: No chain address resolution set

**Description**: The given domain has a resolver, but it does not support [chainAddr](/rif/rns/architecture/MultiCryptoResolver) interface

## `KB008`

**Message**: Search only domains

**Description**: -

## `KB009`

**Message**: Search only `.rsk` domains

**Description**: -

## `KB010`

**Message**: Invalid domain, must be alphanumeric and lower case

**Description**: -

## `KB011`

**Message**: Invalid label, must be alphanumeric and lower case

**Description**: -

## `KB012`

**Message**: The given domain does not exist

**Description**: -

## `KB013`

**Message**: No name resolution

**Description**: The given address has a reverse resolver, but it does not support [name](/rif/rns/architecture/NameResolver#name) interface

## `KB014`

**Message**: No reverse resolution set

**Description**: The given address has not the reverse resolution set

## `KB015`

**Message**: There are no accounts to sign the transaction

**Description**: The web3 instance provided does not have a private key associated
