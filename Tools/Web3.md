---
layout: rns
title: Web3
---

To use web3 and interact with the contracts, we must instance `web3` with a provider. To do so we can use [RSK public nodes](https://nodes.rsk.co):

```js
var Web3 = require('web3')

var web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider(config.node))
```

## Registrar

Instance the [Registrar contract](/Architecture/Registrar) and the [RIF Token contract](/RIF-Token/):

```js
var registrarAbi = []
var registrarAddress = ''
var registrarInstance =  web3.eth.contract(registrarAbi)
var registrar = registrar.at(registrarAddress)

var rifAbi = []
var rifAddress = ''
var rifInstance = web3.eth.contract(rifAbi)
var rif = rifInstace.at(rifAddress)
```

### Check the auction status

After making any operation, check the domain [state](/Architecture/Registrar#state):

> `name` field does not include _.rsk_ suffix

For further information have a look at [registrar contract](/Architecture/Registrar).

```js
function check(name) {
    var hash = web3.sha3(name)
    var status = registrar.state()
    return status
}

switch(check(myname)) {
    case 0:
        return 'Open'
    case 1:
        return 'Auction'
    case 2:
        return 'Owned'
    case 4:
        return 'Reveal'
}
```

Further reading: [`state`](/Architecture/Registrar#state).

### Start an auction

To open a single auction:

```js
function startAuction(name) {
    var hash = web3.sha3(name)
    registrar.startAuction(hash)
}
```

Further reading: [`startAuction`](/Architecture/Deed#startauction).

Or open many auctions at once for better anonymity:

```js
function startAuction(name, n_extras) {
    var hashes = []

    var hash = web3.sha3(name)
    hashes.push(hash)

    for (let i = 0; i < n_extras; i++)
        hashes.push(web3.sha3(hash + i.toString()))

    shuffle(hashses) // optional: shuffle them

    registrar.startAuctions(hashes)
}
```

Further reading: [`startAuctions`](/Architecture/Registrar#startauctions).

### Bid

To bid on an open auction:

```js
function bid(name, owner, bidTokens, amountSent) {
    let hash = web3.sha3(name)
    let tokens = web3.toWei(bidTokens, 'ether')
    let amount = web3.toWei(amountSent, 'ether')
    let salt = random()

    var bid = registrar.shaBid(hash, owner, tokens, salt)

    // Pay the bid with one of these options:

    // With approve
    rif.approve(registrar.address, amount, (err, res) => {
        if (!err) registrar.newBid(shaBid, amount)
    })

    // With transfer and call
    const data = '0x1413151f' + bid.slice(2)
    rif.transferAndCall(registrar.address, amount, data)
}
```

Further reading: [`bid`](/Architecture/Registrar#bid).

If you want to create an auction a bid in only one transaction:

```js
function createAndBid(name, owner, bidTokens, amountSent) {
    var hashes = []

    var hash = web3.sha3(name)
    hashes.push(hash)

    for (let i = 0; i < n_extras; i++)
        hashes.push(web3.sha3(hash + i.toString()))

    shuffle(hashses) // optional: shuffle them

    let tokens = web3.toWei(bidTokens, 'ether')
    let amount = web3.toWei(amountSent, 'ether')
    let salt = random()

    var bid = registrar.shaBid(hash, owner, tokens, salt)

    rif.approve(registrar.address, amount, (err, res) => {
        if (!err) registrar.startAuctionsAndBid(hashes, shaBid, amount)
    })
}
```

Further reading: [`startAuctionsAndBid`](/Architecture/Registrar#startauctionsandbid).

### Unseal bid

Remember the data you input to unseal the bid must be the same you used to seal it.

```js
function bid(name, owner, bid_tokens, displayed_tokens) {
    let hash = web3.sha3(name)
    let tokens = web3.toWei(bid_tokens, 'ether')
    let salt = random()

    registrar.unsealBid(hash, tokens, salt)
}
```

Further reading: [`unsealBid`](/Architecture/Registrar#unsealbid).

### Register won auction

To register the name recently won in the RND Registry contract:

```js
function finalizeAuction(name) {
    var hash = web3.sha3(name)
    registrar.finalizeAuction(hash)
}
```

Further reading: [`finalizeAuction`](/Architecture/Registrar#finalizeauction).

### Transfer domain ownership

With the domain ownership, the deed and the tokens are also transferred:

```js
function transfer(name, to) {
    var hash = web3.sha3(name)
    registrar.transfer(hash, to)
}
```

Further reading: [`transfer`](/Architecture/Registrar#transfer).

### Release a domain

A domain can be released within the rent payment period. [Check this](#check-rent-status) and then, to release de domain:

```js
function release(name) {
    var hash = web3.sha3(name)
    registrar.releaseDeed(hash)
}
```

Further reading: [`releaseDeed`](/Architecture/Registrar#releasedeed).

### Pay rent

The rent must also be payed within the rent payment period. Check `withinRentPaymentPeriod` above and then:

```js
function payRent(name) {
    var hash = web3.sha3(name)
    var amount =  1e18

    // Pay the rent with one of this options:

    // With approve
    rif.approve(registrar.address, amount, (err, res) => {
        registrar.payRent(hash, amount)
    })

    // With transfer and call
    const data = '0xe1ac9915' + hash.slice(2)
    rif.transferAndCall(registrar.address, amount, data)
}
```

Further reading: [`payRent`](/Architecture/Registrar#payrent).

### Check rent status

To know if the domain is within the rentment period:

```js
var deedAbi = []
var deedInstance = web3.contract(deedAbi)

function withinRentPaymentPeriod(name) {
    var hash = web3.sha3(name)
    registrar.entries(hash, (entries_error, entry) => {
        if (entries_error) return true
        var deed = deedInstance.at(res.deed)
        deed.canPayRent((err, res) => {
            return !err && res
        })
    })
}
```

Further reading: [`canPayRent`](/Architecture/Deed#canpayrent).

Or resolve it logically:

```js
function withinRentPaymentPeriod(name) {
    var hash = web3.sha3(name)
    registrar.entries(hash, (err, res) => {
        return !err && (res.expirationDate - 9 months) > 0
    })
}
```

Further reading: [`entries`](/Architecture/Registrar#entries).

## RNS Registry

Instance the RNS Registry contract:

```js
const rnsAbi = []
const rnsAddress = ''
var rnsInstance = web3.eth.contract(rnsAbi)
var rns = registryInstance.at(rnsAddress)
```

And include `namehash` library:

```js
var namehash = require('eth-ens-namehash').hash
```

> `domain` field does include _.rsk_ suffix

Further reading: [RNS Registry contract](/Architecture/Registry).

### Change the resolver

```js
function setResolver(domain, newResolver) {
    var hash = namehash(domain)
    rns.setResolver(hash, newResolver)
}
```

Further reading: [`setResolver`](/Architecture/Resolver#setresolver).

### Change the node owner

```js
function setOwner(domain, owner) {
    var hash = namehash(domain)
    rns.setOwner(hash, owner)
}
```

Further reading: [`setOwner`](/Architecture/Resolver#setowner).

### Change the TTL

```js
function setTTL(domain, ttl) {
    var hash = namehash(domain)
    rns.setTTL(hash, ttl)
}
```

Further reading: [`setTTL`](/Architecture/Deed#setttl).

### Create a subdomain

This is also used to change the subdomain owner.

The `name` field is the subdomain inherited from the domain.

```js
function subdomain(domain, name, owner) {
    var domainHash = namehash(domain)
    var hash = web3.sha3(name)
    rns.setSubnodeOwner(domainHash, hash, owner)
}
```

Further reading: [`setSubnodeOwner`](/Architecture/Deed#setsubnodeowner).

## Resolver

Have a look at the [Resolve a name](/Operation/Resolve-a-name) and [Public Resolver Contract](/Architecture/Resolver) section for further information.
