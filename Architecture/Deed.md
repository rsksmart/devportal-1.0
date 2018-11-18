---
layout: rns
title: Deed
---

The Deed contract has two main features:
- Store RIF tokens locked on a bid
- Handle the annual rent payment.

Deed contract holds RIF tokens in exchange for a domain ownership. The Deed contract is controlled by the Registrar and is the only one capable to sends tokens back to the owner.

- **ABI**: [DeedABI.json](/Architecture/DeedABI.json)

Submitting a bid creates a Deed contract which holds the funds and stores information related to the owner and the domain expiration. Have a look at the Registrar bid submission:

```js
// Creates a new hash contract with the owner
TokenDeed createdBid = new TokenDeed(_from, _tokenQuantity, tokenContract);
require(tokenContract.transfer(createdBid, _tokenQuantity));
sealedBids[_from][_sealedBid] = createdBid;
```

Once bidded, you can query for a particular bid's Deed:

```js
var deedAddress = registrar.sealedBids(address, sealedBid);
var deedInstante = web3.contract(deedAbi)
var deed = deedInstance.at(deedAddress)
```

If we'd like to know info about `nakamoto.rsk`'s deed:

```js
var deedAddress = registrar.entries(web3.sha3('nakamoto'))[1]
var deedInstante = web3.contract(deedAbi)
var deed = deedInstance.at(deedAddress)
```

## Methods

There are only 3 methods that can be accessed directly. Everything else are accessible only by the Registrar.

#### canPayRent

Returns whether the current date falls within the Deed's rent payment period.

**Signature**
```js
function canPayRent() public view returns(bool)
```

#### expired

Returns whether the Deed is expired or not.

**Signature**
```js
function expired() public view returns(bool)
```

#### closeExpiredDeed

Close an expired Deed. No funds are returned.

**Signature**
```js
function closeExpiredDeed() public onlyActive
```
