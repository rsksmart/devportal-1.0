---
layout: rsk
title: RNS JS Library - Error knowledge base
tags: rns, javascript, error
---

## Handle errors with RNS library

RNS Library extend [`Error` class](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Error) with two extra properties:

- `id` - The knowladge base id
- `ref` - A link to this page, scrolling to the error title.

## `KB000`

**Message**: Unknown error.

**Description**: Unknown error.

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

## `KB016`

**Message**: The subdomain is not available

**Description**: The subdomain is already owned

## `KB017`

**Message**: The given address is invalid

**Description**: The given address has an invalid syntax.

## `KB018`

**Message**: The resolver does not implements setAddr method

**Description**: Domain resolver should implement [setAddr](/rif/rns/architecture/Resolver#setaddr) interface.

## `KB019`

**Message**: The given address checksum is invalid

**Description**: The given address checksum is invalid for the current networkId. Check out [here](https://eips.ethereum.org/EIPS/eip-1191) how checksum validation is performed.
