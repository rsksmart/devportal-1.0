---
layout: rns
title: Resolver
---

The Resolver contract handles the resolution between the name domain and the resource. Each Registry entry references a Resolver. Learn how to [implement a custom Resolver](/Operation/Resolve-a-name/#custom-resolver), or use the [default resolver](#default-resolver).

## Default Resolver

Along the RNS registry and initial registrar there is a default resolver deployed as well (see the PublicResolver contract). This contract is available for anybody to use it, but the only restriction is that only owners of a domain can modify its record in this resolver. 

Additionally, it is used as the default resolver configured for new nodes created in the registry.

- **Adrress**: [`0x4efd25e3d348f8f25a14fb7655fba6f72edfe93a`](http://explorer.rsk.co/address/0x4efd25e3d348f8f25a14fb7655fba6f72edfe93a)
- **ABI**: [ResolverABI.json](/Architecture/ResolverABI.json)

## Structure

![resolver](/img/public-resolver.png)

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

#### supportsInterface

Returns true if the resolver implements the interface specified by the provided hash.

This Resolver supports 
- `0x3b3b57de = sha3(addr(bytes32))`
- `0xd8389dc5 = sha3(content(bytes32))`

**Signature**
```js
function supportsInterface(bytes4 interfaceID) public pure returns (bool)
```

**Parameters**
- `interfaceID`: the ID of the interface to check for.

**Returns**
- `bool`: true if the contract implements the requested interface.

#### addr

Returns the address associated with an RNS node.

**Signature**
```js
function addr(bytes32 node) public view returns (address)
```

**Parameters**
- `node`: the RNS node to query.

**Returns**
- `bool`: the associated address.

#### setAddr
Sets the address associated with an RNS node. May only be called by the owner of that node in the RNS registry.

**Signature**
```js
function setAddr(bytes32 node, address addrValue) public only_owner(node)
```

**Parameters**
- `node`: the node to update.
- `addrValue`: the address to set.

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
