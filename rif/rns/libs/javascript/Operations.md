---
layout: rsk
title: RNS JS Library - Operations
tags: rns, javascript
---

## Available operations

  - [`addr`](#addr)
  - [`setAddr`](#setaddr)
  - [`contenthash`](#contenthash)
  - [`setContenthash`](#setcontenthash)
  - [`reverse`](#reverse)
  - [`setReverse`](#setreverse)
  - [`setResolver`](#setresolver)
  - [`available`](#available) (for domains)
  - [`subdomains.available`](#available-for-subdomains)
  - [`subdomains.setOwner`](#setowner)
  - [`subdomains.create`](#create)
  - [`utils`](/rif/rns/libs/javascript/Utils)

### `addr`

Get the address of a given domain and chain. If `chainId` is not provided, it resolves current blockchain address.

**Signature**

```javascript
async addr(domain: string, chainId?: ChainId): Promise<string>
```

**Parameters**

- `domain`: Domain to be resolved.
- `chainId`: Chain identifier listed in [SLIP44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)

**Returns**

- `string`: the address resolution

**Throws**

- [`KB001`](/rif/rns/libs/javascript/Errors#kb001)
- [`KB002`](/rif/rns/libs/javascript/Errors#kb002)
- [`KB003`](/rif/rns/libs/javascript/Errors#kb003)
- [`KB006`](/rif/rns/libs/javascript/Errors#kb006)
- [`KB007`](/rif/rns/libs/javascript/Errors#kb007)

**Examples**

Get an address:

```javascript
rns.addr('testing.rsk').then(console.log)
```

Get Bitcoin address:

```javascript
rns.addr('testing.rsk', ChainId.BITCOIN).then(console.log)
```

### `setAddr`

Set the address of a given domain and chain. If `chainId` is not provided, it sets the address resolution for the current blockchain.

**Signature**

```javascript
async setAddr(domain: string, addr: string, chainId?: ChainId, options?: Options): Promise<string>
```

**Parameters**

- `domain`: Domain to set resolution.
- `addr`: Address to be set as the resolution of the given domain
- `chainId`: Chain identifier listed in [SLIP44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)
- `options`: Optional. See [options](#options) for details.

**Returns**

- `string`: hash of the submitted transaction.

**Throws**

- [`KB002`](/rif/rns/libs/javascript/Errors#kb002)
- [`KB003`](/rif/rns/libs/javascript/Errors#kb003)
- [`KB015`](/rif/rns/libs/javascript/Errors#kb015)
- [`KB017`](/rif/rns/libs/javascript/Errors#kb017)
- [`KB018`](/rif/rns/libs/javascript/Errors#kb018)
- [`KB019`](/rif/rns/libs/javascript/Errors#kb019)
- [`KB024`](/rif/rns/libs/javascript/Errors#kb024)

**Examples**

Set an address:

```javascript
rns.setAddr('testing.rsk', '0x0000000000000000000000000000000123456789').then(() => console.log('Done!'))
```

Set an address for Bitcoin:

```javascript
rns.setAddr('testing.rsk', '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', ChainId.BITCOIN).then(() => console.log('Done!'))
```
### `contenthash`

Get decoded contenthash and protocol type associated of a given domain

**Signature**

```javascript
async contenthash(domain: string): Promise<DecodedContenthash>
```

**Parameters**

- `domain`: Domain to be resolved.

**Returns**

- `DecodedContenthash`: object with the following fields.
  - `decoded`: the decoded contenthash
  - `protocolType`: could be `ipfs`, `bzz`, `onion` or `onion3`.

**Throws**

- [`KB003`](/rif/rns/libs/javascript/Errors#kb003)
- [`KB025`](/rif/rns/libs/javascript/Errors#kb025)
- [`KB026`](/rif/rns/libs/javascript/Errors#kb026)
- [`KB027`](/rif/rns/libs/javascript/Errors#kb027)

**Examples**

```javascript
rns.contenthash('testing.rsk').then(({ decoded, protocolType })) => console.log(`${protocolType}://${decoded})`)
```

### `setContenthash`

Set contenthash of a given domain

**Signature**

```javascript
async contenthash(domain: string): Promise<DecodedContenthash>
```

**Parameters**

- `domain`: Domain to associate the given contenthash.
- `contenthash`: Contenthash to be associated to the given domain. Must be decoded, the library will encode and save it.
- `options`: Optional. See [options](#options) for details.

**Returns**

- `string`: Hash of the executed transaction

**Throws**

- [`KB003`](/rif/rns/libs/javascript/Errors#kb003)
- [`KB015`](/rif/rns/libs/javascript/Errors#kb015)
- [`KB027`](/rif/rns/libs/javascript/Errors#kb027)

**Examples**

```javascript
rns.setContenthash('testing.rsk', 'ipfs://QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4').then(console.log)
```

### `reverse`

Reverse lookup: Get the name of a given address.

**Signature**

```javascript
async reverse(address: string): Promise<string>
```

**Parameters**

- `address`: address to be resolved.

**Returns**

- `string`: Domain or subdomain associated to the given address.

**Throws**

- [`KB013`](/rif/rns/libs/javascript/Errors#kb013)
- [`KB014`](/rif/rns/libs/javascript/Errors#kb014)

**Example**

```javascript
rns.reverse('0x0000000000000000000000000000000123456789').then(console.log)
```

### `setReverse`

Set reverse resolution with the given name for the current address using [setName](/rif/rns/architecture/ReverseRegistrar#setname) interface

**Signature**

```javascript
async setName(name: string, options?: Options): Promise<string>
```

**Parameters**

- `name`: Name to be set as the reverse resolution of the current address
- `options`: Optional. See [options](#options) for details.

**Returns**

- `string`: hash of the submitted transaction.

**Throws**

- [`KB010`](/rif/rns/libs/javascript/Errors#kb010)
- [`KB015`](/rif/rns/libs/javascript/Errors#kb015)
- [`KB022`](/rif/rns/libs/javascript/Errors#kb022)
- [`KB023`](/rif/rns/libs/javascript/Errors#kb023)

**Example**

Set name resolution of the current address as `testing.rsk`

```javascript
rns.setReverse('testing.rsk').then(() => console.log('Done!'))
```

Once this transaction is confirmed, `rns.reverse(YOUR_CURRENT_ADDRESS)` will return `testing.rsk`

### `setResolver`

Set [resolver](/rif/rns/architecture/registry#setresolver) of a given domain.

**Signature**

```javascript
async setResolver(domain: string, resolver: string, options?: Options): Promise<string>
```

**Parameters**

- `domain`: Domain to set resolver.
- `resolver`: Address to be set as the resolver of the given domain
- `options`: Optional. See [options](#options) for details.

**Returns**

- `string`: hash of the submitted transaction.

**Throws**

- [`KB012`](/rif/rns/libs/javascript/Errors#kb012)
- [`KB015`](/rif/rns/libs/javascript/Errors#kb015)
- [`KB017`](/rif/rns/libs/javascript/Errors#kb017)
- [`KB019`](/rif/rns/libs/javascript/Errors#kb019)

### `available`

Check if given domain is available or if there is any availability for the given label.

**Signature**

```javascript
async available(domain: string): Promise<boolean | string[]>
```

**Parameters**

- `domain`: Domain or label to check availability.

**Returns**

- `true` if the domain is available, `false` if not, or an array of available domains under possible TLDs if the parameter is a label

**Throws**

- [`KB009`](/rif/rns/libs/javascript/Errors#kb009)
- [`KB010`](/rif/rns/libs/javascript/Errors#kb010)
- [`KB011`](/rif/rns/libs/javascript/Errors#kb011)
- [`KB020`](/rif/rns/libs/javascript/Errors#kb020)
- [`KB021`](/rif/rns/libs/javascript/Errors#kb021)

**Examples**

```javascript
rns.available('testing.rsk').then(console.log) // will print true or false
```

```javascript
rns.available('testing').then(console.log) // will print [ 'testing.rsk' ] if is available or [ ] if not.
```

### subdomains

#### `available` (for subdomains)

Checks if the given label subdomain is available under the given domain tree.

**Signature**

```javascript
async available(domain: string, label: string): Promise<boolean>
```

**Parameters**

- `domain`: Parent `.rsk` domain. For example, `wallet.rsk`
- `label`: Subdomain whose availability should be checked. For example, `alice`

**Returns**

- `boolean`: true if available, false if not

**Throws**

- [`KB009`](/rif/rns/libs/javascript/Errors#kb009)
- [`KB010`](/rif/rns/libs/javascript/Errors#kb010)
- [`KB011`](/rif/rns/libs/javascript/Errors#kb011)
- [`KB012`](/rif/rns/libs/javascript/Errors#kb012)

**Example**

Check if `example.testing.rsk` subdomain is available:

```javascript
rns.subdomains.available('testing.rsk', 'example').then(console.log)
```

#### `setOwner`

Sets a subdomain owner, it does not check for subdomain availability.
It submits a [`setSubnodeOwner`](/rif/rns/architecture/registry#set-a-subdomain) transaction, so if the subdomain exists, it will overwrite the existing owner and will set the resolver of the parent domain.  If the subdomain does not exists, will create it.

> Precondition: the sender should be the owner of the parent domain.

**Signature**

```javascript
async setOwner(domain: string, label: string, owner: string, options?: Options): Promise<string>
```

**Parameters**

- `domain`: Parent `.rsk` domain. For example, `wallet.rsk`
- `label`: Subdomain to register. For example, `alice`
- `owner`: The new owner's address
- `options`: Optional. See [options](#options) for details.

**Returns**

- `string`: hash of the submitted transaction.

**Throws**

- [`KB009`](/rif/rns/libs/javascript/Errors#kb009)
- [`KB010`](/rif/rns/libs/javascript/Errors#kb010)
- [`KB011`](/rif/rns/libs/javascript/Errors#kb011)
- [`KB012`](/rif/rns/libs/javascript/Errors#kb012)
- [`KB015`](/rif/rns/libs/javascript/Errors#kb015)
- [`KB017`](/rif/rns/libs/javascript/Errors#kb017)
- [`KB019`](/rif/rns/libs/javascript/Errors#kb019)

**Example**

Register `example.testing.rsk` and give ownership to `0x0000000000000000000000000000000000000001`:

```javascript
const newOwnerAddress = '0x0000000000000000000000000000000000000001';
await rns.subdomains.setOwner('testing.rsk', 'example', newOwnerAddress);
```

#### `create`

Creates a new subdomain under the given domain tree if it is available, and sets its resolution if `addr` is provided.
It may send one, two, or three transactions, based on the value of the sent parameters.

> Precondition: the sender should be the owner of the parent domain.

**Signature**

```javascript
async create(domain: string, label: string, owner: string, addr: string, options?: Options): Promise<string>
```

**Parameters**

- `domain`: Parent `.rsk` domain. For example, `wallet.rsk`
- `label`: Subdomain to register. For example, `alice`
- `owner`: The owner of the new subdomain. If not provided, the address who executes the tx will be the owner
- `addr`: The address to be set as resolution of the new subdomain
- `options`: Optional. See [options](#options) for details.

> If `addr` is not provided, no resolution will be set, and will send only one [`setSubnodeOwner`](/rif/rns/architecture/registry#set-a-subdomain) transaction.
>
> If `owner` is not provided, the sender will be set as the new owner, and will send one [`setSubnodeOwner`](/rif/rns/architecture/registry#set-a-subdomain) transaction.
>
> If `owner` and `addr` are provided and `owner` is equals to the sender, will send two transactions: [`setSubnodeOwner`](/rif/rns/architecture/registry#set-a-subdomain), and [`addr`](/rif/rns/architecture/Resolver#addr).
>
> If `owner` and `addr` are provided, but `owner` is different from the sender, will send three transactions: [`setSubnodeOwner`](/rif/rns/architecture/registry#set-a-subdomain), [`addr`](/rif/rns/architecture/Resolver#addr), and [`setSubnodeOwner`](/rif/rns/architecture/registry#set-a-subdomain) again.

**Returns**

- `string`: hash of the last transaction.

**Throws**

- [`KB002`](/rif/rns/libs/javascript/Errors#kb002)
- [`KB009`](/rif/rns/libs/javascript/Errors#kb009)
- [`KB010`](/rif/rns/libs/javascript/Errors#kb010)
- [`KB011`](/rif/rns/libs/javascript/Errors#kb011)
- [`KB012`](/rif/rns/libs/javascript/Errors#kb012)
- [`KB015`](/rif/rns/libs/javascript/Errors#kb015)
- [`KB016`](/rif/rns/libs/javascript/Errors#kb016)
- [`KB017`](/rif/rns/libs/javascript/Errors#kb017)
- [`KB019`](/rif/rns/libs/javascript/Errors#kb019)

**Example**

Register `example.testing.rsk`, give ownership to `0x0000000000000000000000000000000000000001` and set resolution to `0x0000000000000000000000000000000000000002`:

```javascript
const newOwnerAddress = '0x0000000000000000000000000000000000000001';
const resolution = '0x0000000000000000000000000000000000000002';
await rns.subdomains.create('testing.rsk', 'example', newOwnerAddress, resolution);
```

## Options

`options` is an optional parameter in every method that submits one or more transactions. 

This object contains the following fields:

- `from` - String (optional): The address the transaction should be sent from. If not provided, it will use the first account associated with the current provider.
- `gasPrice` - String (optional): The gas price, denominated in wei, to use for this transaction.
- `gas` - Number (optional): The maximum gas provided for this transaction (gas limit).

## Advanced operations

Use Web3 `Contract`s directly, find instructions [here](/rif/rns/libs/javascript/Advanced-usage).
