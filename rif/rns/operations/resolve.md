---
layout: rsk
title: Resolve a domain address
---

The Resolver contract handles the resolution between the name domain and the resource. Each Registry entry references a Resolver.

To find a domain's resolution:
1. Go to [RNS Manager resolution page](https://manager.rns.rifos.org/resolve)
2. Type the domain you want to resolve
3. Resolve!

![resolve](/assets/img/rns/resolve.png)

<!--
## Libraries

[Resolution libraries](/rif/rns/libs) are available for developers to integrate and resolve RNS domains and subdomains in their own applications, wallets, exchanges.

## Resolution process

The resolution can be described in two steps:

1. Query the RNS to retrieve the domain's resolver:

    ```js
    const name = 'satoshi.rsk'
    const node = namehash()
    const resolverAddress = rns.resolver(node)

    if (resolverAddress == '0x00') console.error('No resolver configured for ' + name)
    else console.log('Resolver address configure for ' + name + ' is ' + resolverAddress)
    ```

    Yielded address may be `0x00` if the Resolver is not configured or the domain node is not yet present in the Registry.

2. Finally resolve the domain through the `addr` getter from the Resolver:

    ```js
    const resolver = ResolverInterface.at(resolverAddress)
    const address = resolver.addr(node)

    if (address == '0x00') console.error('The domain ' + name + ' does not resolve to any address!')
    else console.log("The domain " + name +" resolves to " + address)
    ```

## Public Resolver

RNS provides a [Public Resolver](/rif/rns/architecture/Resolver) that supports `addr` and `hash` storage for each node registered in the Registry contract.
The `addr` is the typical resolution for and address node, and the `hash` is free to use. The resolution for a name that uses the Public Resolver looks like this:

```js
function resolve(domain) {
    var node = namehash(domain)
    var resolverAddress = rns.resolver(node)

    if (resolverAddress == '0x00') return null

    var resolver = ResolverInterface.at(resolverAddress)
    var address = resolver.addr(node)
    return address
}
```

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
-->
