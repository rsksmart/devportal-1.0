---
layout: rns
title: Registrar
---

The Registrar is the contract that handles the domain issuing logic. In this section we'll explain the interaction with this contract.

As explained in the [RNS specification doc](https://docs.rsk.co/rsk-name-service-specification-en.pdf), the domain ownership is determinate by a Vickrey auction. A Vickrey auction is a type of sealed-bid auction. Bidders submit bids without knowing the bided amount of any other participant. The highest bidder is the winner and the price paid is the second-highest bid.

Is RNS, the auction lasts 5 days and is divided in two periods:
- **Auction phase**: the first 3 days to bid for a specific domain.
- **Reveal phase**: the next 2 days for revealing the bids.

> There is no "soft start" phase, meaning that all names are available on launch time.

- **Address**: [`0x5269f5bc51cdd8aa62755c97229b7eeddd8e69a6`](http://explorer.rsk.co/address/0x5269f5bc51cdd8aa62755c97229b7eeddd8e69a6)
- **ABI**: [RegistrarABI.json](/Architecture/RegistrarABI.json)

## Index

- [The process](#the-process)
- [Rent and domain expiration](#rent-and-domain-expiration)
- [Structure](#structure)
- [Methods](#methods)
    - [`startAuction`](#startauction)
    - [`startAuctions`](#startauctions)
    - [`newBid`](#newbid)
    - [`newBidWithToken`](#newbidwithtoken)
    - [`startAuctionsAndBid`](#startauctionsandbid)
    - [`unsealBid`](#unsealbid)
    - [`finalizeAuction`](#finalizeauction)
    - [`payRent`](#payrent)
    - [`payRentWithToken`](#payrentwithtoken)
    - [`transfer`](#transfer)
    - [`releaseDeed`](#releasedeed)
    - [`eraseNode`](#erasenode)
    - [`transfeRegistrar`](#transferregistrar)
    - [`acceptRegistrarTransfer`](#acceptregistrartransfer)
    - [`state`](#state)
    - [`entries`](#entries)
    - [`shaBid`](#shabid)
    - [`tokenFallback`](#tokenfallback)
- [Events](#events)
- [States](#states)
- [Refund Schedule](#refund-schedule)

## The process

1. Instance Registrar contract

    ```js
    var registrarInstance = web3.contract(registrarAbi)
    var registrar = registrarInstance.at(registrarAddress)
    ```

2. Hash your domain

    ```js
    var label = 'nakamoto'
    var sha3 = web3.sha3(label)
    ```

3. Verify domain status after starting an auction for the name

    ```js
    var status = registrar.status(sha3)
    ```

4. If the dmain name is in Open state, start an auction. The auctions are public, this means anyone can bid in it.

    ```js
    if (status === 0)
        registrar.startAuction(sha3)
    ```

5. Within the next 3 days, the name is in auction state. Bid!

    Bids are sent by sending a message to the Registrar contract with a hash and an amount. The hash contains information about the bid, including the hash of the domain bided, the bid amount, and a random salt. The value of the bid itself can be masqueraded by sending more than the value of your actual bid.

    Bids must be placed before the reveal period begins. Any bid created during or after this period won't be considered valid.

    Since this is an auction, it is expected that most public hashes, like known domains and common dictionary words, will have multiple bidders pushing the price up.

    ```js
    var owner, value, salt
    if (status === 1) {
        var shaBid = registrar.shaBid(sha3, owner, value, salt)
        registrar.newBid(shaBid)
    }
    ```

5. Within the next 2 days, the name is in Reveal state. Reveal your bid!

    Once the reveal phase of the auction starts, it's time to unseal your bid. You can do this by calling the method `unsealBid` with the same parameters used originally for `shaBid`.


    - If the bid doesn't meet the requirements (below min value or created during the reveal period) or doesn't beat the second-best bid, all of the tokens locked in the Deed are refunded.

    - If the bid doesn't best the highest value offered, but does beat the second highest, the final value of the auction is updated to equal the bid and all locked tokens are refunded.

    - If the bid turns out to be the biggest yet, the auction's highest value and second highest are updated. The former highest bid is refunded to its owner.

    ```js
    if (status === 4)
        registrar.unsealBid(sha3, value, salt)
    ```

6. Once the Auction phase finalized, if you are the winner you must register your domain name.  In order to concrete the auction and finalize apply the changes to the Registry, the auction winner must call the `finalizeAuction` method.

    This function can't be called by any other account but the new owner of the auctioned name.

    When calling this method, the Registrar contract refunds the difference between the highest and the second highest values and modifies the Registry adding (or modifying) the entry which links the full domain and the new owner.

    As well as modifying the registry, the registrar also signals the Deed to start its expiration period, which lasts one year, and pay the initial annual rent fee.

    ```js
    var entry = entries(sha3)
    if (entry[0] === 2) {
        var deedInstance = web3.contract(deedAbi)
        var deed = deedInstance.at(entry[1])
        if (deed.owner() === me)
            registrar.finalizeAuction(sha3)
    }
    ```

Now the name is registered in the [RNS Registry](/Architecture/Registry).


## Rent and domain expiration

Domain names have a validity of 1 year after the registration date. Said expiry date is reflected through the associated Deed contract. Owners have a period of 3 months before the expiry date to pay the rent and extend their ownership for 1 year. The rent value is 1 RIF token.

The domains whose annual rent is not paid, backs to Open state and becomes available to open an auction again. If a user wins an auction over it, she is able to override the existing name resolution.

## Structure

![registrar](/img/registrar.png)

**Context**
```js
RNS public rns;
bytes32 public rootNode;
RIFToken public tokenContract;
```

`rns` the Registry contract
`rootNode` the top-level domain. For RNS `web3.sha3('rsk')`. All new nodes are sub nodes of 'rsk'
`tokenContract` the RIF ERC-677 token contract

**Types**
```js
struct Entry {
    TokenDeed deed;
    uint registrationDate;
    uint value;
    uint highestBid;
}
```

- `Entry` the actual state of a hash

**Storage**
```js
mapping (bytes32 => Entry) _entries;
mapping (address => mapping (bytes32 => TokenDeed)) public sealedBids;
```

- `_entries` store all hash states. The state is not modified when someone bids, but it is when someone reveals a bid.

- `sealedBids` store, for each user, the Deed address for each sealed bid. Notices that the sealed bid is not recoverable without the salt value

**Constants**
```js
uint32 constant TOTAL_AUCTION_LENGTH = 5 days;
uint32 constant REVEAL_PERIOD = 48 hours;
uint32 constant LATE_UNSEAL_PERIOD = 15 days;
uint constant RELEASE_FEE_PER_MIL = 200;    // 200 of 1000 = 20%
uint constant MIN_TOKEN_QUANTITY = 1 * 10**18;  // 1 token
uint constant RENT_VALUE = 1 * 10**18;  // 1 token
```

## Methods

#### startAuction

Start an auction for an available hash

**Signature**
```js
function startAuction(bytes32 _hash) public registryOpen()
```

**Parameters**
- `_hash`: the hash to start an auction on

**Events**
- `AuctionStarted`

**Example**
```js
var name = 'nakamoto'
var hash = web3.sha3(name)
registrar.startAuction(hash)
```

#### startAuctions

Start multiple auctions for better anonymity.

A user can start an auction by sending an array of hashes that they want to bid for. This array is sent so that the user can open an auction for X dummy hashes when she is only interested in bidding for one. This will increase the cost for an attacker to simply bid blindly on all new auctions. Dummy auctions that are open but not bid on are closed after a week.

**Signature**
```js
function startAuctions(bytes32[] _hashes) public
```

**Parameters**
- `_hashes`: an array of hashes, at least one of which the user wants to bid on

**Events**
- `AuctionStarted`

**Example**
```js
var name = 'nakamoto'
var hash = web3.sha3(label)

var fake1 = web3.sha3('nakamoto1')
var fake2 = web3.sha3('nakamoto2')
registrar.startAuctions([fake1, hash, fake2])
```

#### newBid

Submit a new sealed bid on a desired hash in a blind auction

Bids are sent by sending a message to the main contract with a hash and an amount. The hash contains information about the bid, including the bided hash, the bid amount, and a random salt. Bids are not tied to any one auction until they are revealed. The value of the bid itself can be masqueraded by sending more than the value of your actual bid. For bids revealed after reveal period, a percentage (defined in the late unsealing [Refund schedule](#refund-schedule)) will be sent to a special RIF address.

This method requires the sender to approve the Registrar to use the specified `tokenQuantity` in the ERC677 (inherited form ERC20) contract.
Otherwise it can be done through the `tokenFallback` after a transfer with the corresponding parameters.

**Signature**
```js
function newBid(bytes32 _sealedBid, uint _tokenQuantity) public
```

**Parameters**
- `_sealedBid`: a sealed bid, created by the `shaBid` function
- `_tokenQuantity`: token quantity to bid

**Events**
- `NewBid`

**Example**
```js
var hash = web3.sha3('nakamoto')
var owner = accounts[0]
var amount = 8e18
var sentAmount = 10e18
var salt = random()
var shaBid = registrar.shaBid(hash, owner, amount, salt)

rif.approve(registrar.address, sentAmount, (err, res) => {
    if (!err) registrar.newBid(shaBid, sentAmount)
})
```

#### newBidWithToken

Method to be called through a dynamic invocation from an ERC677 token contract

**Signature**
```js
function newBidWithToken(address _from, uint _tokenQuantity, bytes32 _sealedBid)
```

**Hash** `0x1413151f`

- `_from`: address sending the tokens as well as submitting the bid
- `_tokenQuantity`: amount in tokens received through the transference
- `_sealedBid`: sealed bid, created through the `shaBid` function

**Events**
- `NewBid`

**Example**
```js
const deposit = 200e18
const sealedBid = registrar.shaBid(web3.sha3('nakamoto'), accounts[0], 150e18, 4512)

const data = '0x1413151f' + sealedBid.slice(2)
rif.transferAndCall(registrar.address, deposit, data)
```

#### startAuctionsAndBid

Start a set of auctions and bid on one of them. This method functions identically to calling `startAuctions` followed by `newBid`, but all in one transaction.

**Signature**
```js
function startAuctionsAndBid(bytes32[] _hashes, bytes32 _sealedBid, uint _tokenQuantity) public payable
```

**Parameters**
- `_hashes`: a list of hashes to start auctions on.
- `_sealedBid`: a sealed bid for one of the auctions.
- `_tokenQuantity`: amount of tokens to mask the bid with.

**Events**
- `AuctionStarted`
- `NewBid`

**Example**
```js
var hash = web3.sha3('nakamoto')
var hashes = [
    web3.sha3('fake1'),
    hash,
    web3.sha3('fake2')
]

var amountSent = 15e18

var shaBid = registrar.shaBid(hash, accounts[0], 10e8, 1000)
rif.approve(registrar.address, amountSent, (err, res) => {
    if (!err) registrar.startAuctionsAndBid(hashes, shaBid, amountSent)
})
```

#### unsealBid

Submit the properties of a bid to reveal them. The hash, value and salt must be the same set in the sealed bid, otherwise, no bid will be unsealed.

The [refund schedule](#refund-schedule) is defined in this method.

**Signature**
```js
function unsealBid(bytes32 _hash, uint _value, bytes32 _salt) public
```

**Parameters**
- `_hash`: the node in the sealedBid
- `_value`: the bid amount in the sealedBid
- `_salt`: the sale in the sealedBid

**Events**
- `BidRevealed`

**Example**
```js
registrar.unsealBid(myHash, myValueBade, mySalt)
```

#### finalizeAuction

Finalize an auction after the registration date has passed. Updates the Registry to reflect the new node owner. Starts the winning Deed's expiration period.

**Signature**
```js
function finalizeAuction(bytes32 _hash) public onlyOwner(_hash)
```

**Parameters**
- `_hash`: the hash of the name the auction is for

**Events**
- `HashRegistered`

**Example**
```js
var name = web3.sha3('nakamoto')
registrar.finalizeAuction(name)

// Now you might
registry.setResolver(namehash(name + '.rsk'), myResolverAddress)
```

#### payRent

Pay the annual rent for a name. The rent value is 1 RIF.

Domains have a validity of 1 year after the registration date. Said expiry date is reflected through the associated Deed contract. Owners have a period of 3 months before the expiryDate to pay the rent and extend their ownership for 1 year.

This method requires the sender to approve the Registrar to use the specified tokenQuantity in the ERC677 contract.
Otherwise it can be done through the `tokenFallback` after a transfer with the corresponding parameters.

**Signature**
```js
function payRent(bytes32 _hash) public
```

**Parameters**
- `_hash`: the hash of the name to pay the rent for

**Example**
```js
rif.approve(registrar.address, 1e18, (err, res) => {
    registrar.payRent(web3.sha3('nakamoto'), 1e18)
})
```

#### payRentWithToken

Method to be called through a dynamic invocation from an ERC223 token contract.

**Signature**
```js
function payRentWithToken(address _from, uint _tokenQuantity, bytes32 _hash) public
```

**Hash** `0xe1ac9915`

**Parameters**
`_from`: address sending the tokens as well as submitting the bid
`_tokenQuantity`: amount in tokens received through the transference
`_hash`: hash of the name to pay the rent for

**Example**
```js
const hash = web3.sha3('nakamoto')
const rent = 1e18;

const data = '0xe1ac9915' + hash.slice(2);
rif.transferAndCall(registrar.address, rent, data);
```

#### transfer

Change the owner of the domain. This impacts in the Registry and the token Deed. The owner of a domain may transfer it to someone else at any time.

**Signature**
```js
function transfer(bytes32 _hash, address _newOwner) public onlyOwner(_hash)
```

**Parameters**
- `_hash`: the node to transfer
- `_newOwner`: the address to transfer ownership to

**Example**
```js
var hash = web3.sha3('nakamoto')
var newOwnerAddress = '0x53ab...'
reigstrar.trasnfer(hash, newOwnerAddress)
```

#### releaseDeed

After some time, or if we're no longer the Registrar, the owner can release the name and get a part of their tokens back. The allowed release period is within the annual rent payment period, which starts 3 months before the expiration date.

**Signature**
```js
function releaseDeed(bytes32 _hash) public onlyOwner(_hash)
```

**Parameters**
- `_hash `: the node to release

**Example**
```js
var hash = web3.sha3('nakamoto')
registrar.releaseDeed(hash)
```

**Events**
- `HashReleased`

#### eraseNode

Allows anyone to delete the owner and resolver records for (subdomain of) a domain name that is not currently owned in the Registrar. If passing, ex: 'foo.bar.rsk', the owner and Resolver fields on 'foo.bar.rsk' and 'bar.rsk' will all be cleared.

**Signature**
```js
function eraseNode(bytes32[] _labels) public
```

**Parameters**
- `_labels`: a series of label hashes identifying the name to zero out, rooted at the registrar's root. Must contain at least one element. For instance, to zero 'foo.bar.rsk' on a registrar that owns '.rsk', pass an array containing `[web3.sha3('foo'), web3.sha3('bar')]`.

#### transferRegistrar

Transfers the Deed to the current Registrar, if different from this one. Used during the upgrade process to an enhanced Registrar.

**Signature**
```js
function transferRegistrars(bytes32 _hash) public onlyOwner(_hash)
```

**Parameters**
- `_hash` The name-hash to transfer.

#### acceptRegistrarTransfer

Accepts a transfer from a previous Registrar; stubbed out here since there is no previous registrar implementing this interface.

**Signature**
```js
function acceptRegistrarTransfer(bytes32 _hash, TokenDeed _deed, uint _registrationDate) public pure
```

**Parameters**
- `_hash`: the sha3 hash of the label to transfer.
- `_deed`: the TokenDeed object for the name being transferred in.
- `_registrationDate`: the date at which the name was originally registered.

#### state

Returns the [state](#states) of a hash auction.

**Signature**
```js
function state(bytes32 _hash) public view returns (Mode)
```

- `_hash`: hash of the name to query about

**Returns**
- `Mode`

**Example**
```js
const state = registrar.state(web3.sha3('nakamoto'))
if (state == 0) console.log('This name is available for auction!')
else if (state == 1) console.log('This name is already in auction!')
else if (state == 2) console.log('This name is already owned!')
else if (state == 4) console.log('This name is during reveal phase!')
```

#### entries

Returns information related to a certain name

```js
function entries(bytes32 _hash) public view returns (Mode, address, uint, uint, uint)
```

- `_hash`: hash of the name to query about

**Returns**
- `Mode` - state: the state of the auction for the label.
- `address` - deed: the address of the current winning Deed.
- `uint` - registration date: the auction's finish date. It is a number that represents the seconds remaining to the auction's finish date.
- `uint` - value: the second highest bid. It is a number that represents the tokens bade. It may be 0 if there is only one bid.
- `uint` - highest bid: the highest bid (and winning value) made for the auction. It is a number that represents the tokens bade.

**Example**
```js
var entry = registrar.entries(web3.sha3('nakamoto'))

var iAmWinning = entry[1] === myDeed
var endDate = new Date(entry[2] * 1000)
if(iAmWinning) {
    var iWillPay = entry[3]
    var iBade = entry[4]
}
```

#### shaBid

Hash the values required for a secret bid

**Signature**
```js
function shaBid(bytes32 _hash, address _owner, uint _value, bytes32 _salt) public pure returns (bytes32)
```

**Parameters**
- `_hash`: the node corresponding to the desired name-hash
- `_value`: the bid amount in tokens
- `_salt`: a random value to ensure secrecy of the bid

**Returns**
- `bytes32` The hash of the bid values

#### tokenFallback

Fallback function to be called when the contract receives a transference through an ERC677 contract.

Functions supported:
- `newBidWithToken` (signature `0x1413151f`) with a 32 byte parameter (sealedBid to submit)
- `payRentWithToken` (signature `0xe1ac9915`) with a 32 byte parameter (hash of the name to pay the rent for)

**Signature**
```js
function tokenFallback(address _from, uint _value, bytes _data) public
```

**Parameters**
- `_from`: address which sent the tokens
- `_value`: amount of tokens sent
- `_data`: byte array with information of which function to call and the parameters used for the invocation

## Events

```js
event AuctionStarted(bytes32 indexed hash, uint registrationDate);
event NewBid(bytes32 indexed hash, address indexed bidder, uint deposit);
event BidRevealed(bytes32 indexed hash, address indexed owner, uint value, uint8 status);
event HashRegistered(bytes32 indexed hash, address indexed owner, uint value, uint registrationDate);
event HashReleased(bytes32 indexed hash, uint value);
```

## States

![states](/img/auction-states.png)

The states are defined:

```js
enum Mode {
    Open,
    Auction,
    Owned,
    Forbidden,
    Reveal
}
```

| Number | State | |
| - | - | - |
| **0** | Open | Domain is available and the auction hasn’t started |
| **1** | Auction | Domain is available and the auction has been started |
| **2** | Owned | Domain is taken and currently owned by someone |
| **4** | Reveal | Domain is currently in the ‘reveal’ stage of the auction |


## Refund Schedule

- If the bid is revealed **during the reveal period**
    - Auction winner: Funds are locked in Deed. 80% are returned on Deed release
    - Auction loser: 100% refund over the losing bid

- If the bid is revealed **within the 2 weeks after auction finishes**
    - Bid that **would have won**: 20% taken as fee
    - Bid that **would have affected 2nd place**: Difference with the actual 2nd place taken as fee
    - **Otherwise**: 0.5% taken as fee

- Otherwise, if the bid is unsealed **past the 2 weeks after finished**
    - No refund
