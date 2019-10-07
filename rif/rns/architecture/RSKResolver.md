---
layout: rsk
title: RSK Resolver
---

Along the RNS registry and initial registrar there is a public resolver deployed as well (see the RSKResolver contract). This contract is available for anybody to use it, but the only restriction is that only owners of a domain can modify its record in this resolver. This resolver implements all the methods described in the [Resolver specification](/rif/rns/architecture/Resolver)

Additionally, it is used as the default resolver configured for new nodes created in the registry.

<div class="alert alert-warning">
<p>There is an upgraded version of this resolver. See <a href="/rif/rns/architecture/MultiCryptoResolver">Multi-crypto resolver</a> page.</p>
<p>To migrate your resolver, execute the <a href="/rif/rns/architecture/Registry/#setresolver">setResolver</a> command on the registry.</p>
</div>


### Mainnet information

- **RSKResolver Adrress**: [`0x4efd25e3d348f8f25a14fb7655fba6f72edfe93a`](http://explorer.rsk.co/address/0x4efd25e3d348f8f25a14fb7655fba6f72edfe93a)
- **ABI**: [RSKResolverABI.json](/rif/rns/architecture/RSKResolverABI.json)

See [RNS Testnet section](/RNS-Testnet) for testing environment information.

## Index

- [Methods](#methods)
    - [`has`](#has)
    - [`content`](#content)
    - [`setContent`](#setcontent)

**Context**
```js
AbstractRNS rns;
```

- `rns`: the Registry contract

**Storage**
```js
mapping(bytes32=>address) addresses;
mapping(bytes32=>bytes32) hashes;
```

- `adresses`: for each `namehash` entry, stores an address
- `hashes`: for each `namehash` entry, stores a hash

## Methods

#### has

Returns true if the specified node has the specified record type.

**Signature**
```js
function has(bytes32 node, bytes32 kind) public view returns (bool)
```

**Parameters**
- `node`: the RNS node to query.
- `kind`: the record type name, as specified in EIP137.

**Returns**
`bool`: true if this resolver has a record of the provided type on the provided node.

#### content
Returns the content hash associated with an RNS node. Note that this resource type is not standardized, and will likely change in future to a resource type based on multihash.

**Signature**
```js
function content(bytes32 node) public view returns (bytes32)
```

**Parameters**
`node`: the RNS node to query.

**Returns**
- `bytes32`: the associated content hash.

#### setContent
Sets the content hash associated with an RNS node. May only be called by the owner of that node in the RNS registry. Note that this resource type is not standardized, and will likely change in future to a resource type based on multihash.

**Signature**
```js
function setContent(bytes32 node, bytes32 hash) public only_owner(node)
```

**Parameters**
- `node`: the node to update.
- `hash`: the content hash to set
