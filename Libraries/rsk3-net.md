---
layout: rsk
title: rsk3-net
---

rsk3.net
============

Functions to receive details about the current connected network.

-----

``` javascript
rsk3.net.getId([callback])
```

Gets the current network ID.

### Parameters

none

### Returns

`Promise` returns `Number`: The network ID.

### Example

``` javascript
rsk3.net.getId().then(console.log);
> 1
```

------------------------------------------------------------------------

isListening
-----------

``` javascript
rsk3.net.isListening([callback])
```

Checks if the node is listening for peers.

### Parameters

none

### Returns

`Promise` returns `Boolean`

### Example

``` javascript
rsk3.net.isListening().then(console.log);
> true
```

------------------------------------------------------------------------

getPeerCount
------------

``` javascript
rsk3.net.getPeerCount([callback])
```

Get the number of peers connected to.

### Parameters

none

### Returns

`Promise` returns `Number`

### Example

``` javascript
rsk3.net.getPeerCount().then(console.log);
> 25
```

------------------------------------------------------------------------

getNetworkType
--------------

``` javascript
rsk3.net.getNetworkType([callback])
```

Guesses the chain the node is connected by comparing the genesis hashes.

It\'s recommended to use the
`rsk3.getChainId`method
to detect the currently connected chain.

### Returns

`Promise` returns `String`:

:   -   `"main"` for main network
    -   `"morden"` for the morden test network
    -   `"rinkeby"` for the rinkeby test network
    -   `"ropsten"` for the ropsten test network
    -   `"kovan"` for the kovan test network
    -   `"private"` for undetectable networks.

### Example

``` javascript
rsk3.net.getNetworkType().then(console.log);
> "main"
```
