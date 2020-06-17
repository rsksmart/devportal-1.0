---
layout: rsk
title: RNS JS Library - Error knowledge base
tags: rns, javascript, error
---

## Handle errors with RNS library

RNS Library extends the [`Error` class](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Error) with two extra properties:

- `id` - The knowledge base ID
- `ref` - A link to the specific error within this page

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

**Description**: The given address checksum is invalid for the current networkId. Check out [EIP-1191](https://eips.ethereum.org/EIPS/eip-1191) for information about how checksum validation is performed.

## `KB020`

**Message**: The given TLD does not exist

**Description**: The domain provided is under a top level domain that does not exist in RNS.

## `KB021`

**Message**: The owner of the TLD does not implement the available method

**Description**: The top level domain owner should be a contract that implements the [available](/rif/rns/architecture/rsk-registrar/rskowner#available) method.

## `KB022`

**Message**: No reverse registrar

**Description**: The owner of `addr.reverse` node has not been set. More information about reverse operations in [Reverse Registar](/rif/rns/architecture/ReverseRegistrar).

## `KB023`

**Message**: The reverse registrar does not implement setName method

**Description**: The owner of `addr.reverse` (Reverse Registrar) should implement [`setName`](/rif/rns/architecture/ReverseRegistrar#setname) method.

## `KB024`

**Message**: The resolver does not implement setChainAddr method

**Description**: Domain resolver should implement [`setChainAddr`](/rif/rns/architecture/MultiCryptoResolver#setchainaddr) interface.

## `KB025`

**Message**: The contenthash protocol is not supported

**Description**: The contentsh associated to the given domain could not be decoded because it has an invalid protocol. The `protocolType` must be `ipfs`, `bzz`, `onion` or `onion3`.

## `KB026`

**Message**: No contenthash resolution set

**Description**: The given domain has a supported resolver, but the contenthash for the given domain has not been set

## `KB027`

**Message**: No contenthash interface

**Description**: The resolver does not implement the contentash interface

