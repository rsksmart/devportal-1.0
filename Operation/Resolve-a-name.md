---
layout: rns
title: Resolve a name
---

The Resolver contract handles the resolution between the name domain and the resource. Each Registry entry references a Resolver.

## Libraries

[Resolution libraries](/Libs) are available for developers to integrate and resolve RNS domains and subdomains in their own applications, wallets, exchanges.

## Resolution process

The resolution can be described in three steps:

1. Check the state of a domain in the registrar:

    ```js
    var state = registrar.state(web3.sha3('adomain'))
    if (state != 2) console.log("This domain is not owned!")
    ```

2. Query the RNS to retrieve the domain's resolver:

    ```js
    var label = 'satoshi'
    var node = namehash(label + '.rsk')
    var resolverAddress = rns.resolver(node)

    if (resolverAddress == '0x0') console.log('No resolver configure for ' + label)
    else console.log('Resolver address configure for ' + label + ' is ' + resolverAddress)
    ```

    Yielded address may be 0x0 if the Resolver is not configured or the domain node is not yet present in the Registry.

3. Finally resolve the domain through the `addr` getter from the Resolver:

    ```js
    var resolver = ResolverInterface.at(resolverAddress)
    var address = resolver.addr(node)

    if (address == '0x0') console.log('The domain ' + label + ' does not resolve to any address!')
    else console.log("The domain 'adomain' resolves to " + address)
    ```

## Public Resolver

RNS provides a [Public Resolver](/Architecture/Resolver) that supports `addr` and `hash` storage for each node registered in the Registrar contract.
The `addr` is the typical resolution for and address node, and the `hash` is free to use. The resolution for a name that uses the Public Resolver looks like this:

```js
function resolve(domain) {
    var node = namehash(domain)
    var resolverAddress = rns.resolver(node)

    if (resolverAddress == '0x0') return null

    var resolver = ResolverInterface.at(resolverAddress)
    var address = resolver.addr(node)
    return address
}
```

### Example

![alice-rsk](/img/alice-rsk.png)

## Custom Resolver

The flexibility of the model allows users to create their own custom resolvers that fit their needs. Regardless of the resolver details, all of them should implement the following method:

```js
function supportsInterface(bytes4 interfaceID) constant returns (bool)
```

This method can be queried from outside the contract to verify whether it supports a particular kind of record, defined by the signature of its interface.

Defined or well-known record types are:

| Type | Method | ID |
| - | - | - |
| Address | `addr` | `0x3b3b57de` |
| Name | `name` | `0x691f3431` |
| ABI | `ABI` | `0x2203ab56` |
| Public Key | `pubkey` | `0xc8690233` |
| Text | `text` | `0x59d1d43c` |
| Multihash | `multihash` | `0xe89401a1` |
| Content | `content` | `0xd8389dc5` |

So, when the resolver is a custom on, we should:
```js
function resolve(domain) {
    var node = namehash(domain);
    var resolverAddress = rns.resolver(node);

    if (resolverAddress == '0x0') return null

    var resolver = ResolverInterface.at(resolverAddress)

    if(!resolver.supportsInterface('addr')) return null

    var address = resolver.addr(node)
    return address
}
```

### Org. example

![alice-inc-rsk](/img/alice-inc-rsk.png)

## Resolve onchain

In our contract we would want to implement a way to use domains instead of addresses. Here's a simple example:

```js
pragma solidity ^0.4.24;

contract AbstractPublicResolver {
    function PublicResolver(address rnsAddr) public;
    function supportsInterface(bytes4 interfaceID) public pure returns (bool);
    function addr(bytes32 node) public view returns (address ret);
    function setAddr(bytes32 node, address addrValue) public;
    function hash(bytes32 node) public view returns (bytes32 ret);
    function setHash(bytes32 node, bytes32 hashValue) public;
}

contract Operation {
    function operationWithAddr(address addr) public {
        opreation(addr)
    }

    function operationWithRNS(bytes32 node) public {
        AbstractPubliResolver resolver = rns.resolver(node);
        if(resolver == 0x00 || !resolver.supportsInterface('addr')) revert();
        var addr = resolver.addr(node);
        operation(addr)
    }

    function operation(address addr) internal {
        // Do something
    }
}
```

## Namehash

The namhash function is a recursive cryptographic function used to store nodes and subnodes.

The namehash function is defined:

```
namehash([]) = 0x0000000000000000000000000000000000000000000000000000000000000000
namehash([label, node]) = keccak256(namehash(node), keccak256(label))
```

In JavaScript:
Or:
```js
function namehash (string) {
    let node = '0000000000000000000000000000000000000000000000000000000000000000'

    if (string) {
        let labels = string.split('.')

        for (let i = labels.length - 1; i >= 0; i--) {
            let labelHash = web3.sha3(labels[i]).slice(2) // or your own sha3 function
            node = web3.sha3(node + labelHash, {encoding: 'hex'}).slice(2)
        }
    }

    return `0x${node}`
```

In Python:
```py
def namehash(name):
    if name == '':
        return '\0' * 32
    else:
        label, _, remainder = name.partition('.')
        return sha3(namehash(remainder) + sha3(label))
```

In the Registry contract we can find:
```js
bytes32 subnode = keccak256(abi.encodePacked(node, label));
```
