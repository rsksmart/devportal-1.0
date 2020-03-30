---
layout: rsk
title: RNS JS Library - Operations
tags: rns, javascript
---

## Available operations

  - [`addr`](#addr)
  - [`reverse`](#reverse)
  - [`setAddr`](#setaddr)
  - [`setResolver`](#setresolver)
  - [`available`](#available)
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
rns.addr('testing.rsk', '0x80000000').then(console.log)
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

### `setAddr`

Set address resolution of a given domain using the [AbstractAddrResolver](/rif/rns/architecture/Resolver#setaddr) interface.

**Signature**

```javascript
async setAddr(domain: string, addr: string): Promise<void>
```

**Parameters**

- `domain`: Domain to set resolution.
- `addr`: Address to be set as the resolution of the given domain

**Returns**

- `TransactionReceipt`

**Throws**

- [`KB002`](/rif/rns/libs/javascript/Errors#kb002)
- [`KB003`](/rif/rns/libs/javascript/Errors#kb003)
- [`KB015`](/rif/rns/libs/javascript/Errors#kb015)
- [`KB017`](/rif/rns/libs/javascript/Errors#kb017)
- [`KB018`](/rif/rns/libs/javascript/Errors#kb018)
- [`KB019`](/rif/rns/libs/javascript/Errors#kb019)

**Examples**

Set an address:

```javascript
rns.setAddr('testing.rsk', '0x0000000000000000000000000000000123456789').then(() => console.log('Done!'))
```

### `setResolver`

Set [resolver](/rif/rns/architecture/registry#setresolver) of a given domain.

**Signature**

```javascript
async setResolver(domain: string, resolver: string): Promise<void>
```

**Parameters**

- `domain`: Domain to set resolver.
- `resolver`: Address to be set as the resolver of the given domain

**Returns**

- `TransactionReceipt`

**Throws**

- [`KB012`](/rif/rns/libs/javascript/Errors#kb012)
- [`KB015`](/rif/rns/libs/javascript/Errors#kb015)
- [`KB017`](/rif/rns/libs/javascript/Errors#kb017)
- [`KB019`](/rif/rns/libs/javascript/Errors#kb019)

### `available`

Check if given domain is available or if there are any availability for the given label.

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

Creates a new subdomain under the given domain tree if it is available.

> Precondition: the sender should be the owner of the parent domain.

**Signature**

```javascript
async setOwner(domain: string, label: string, owner: string): Promise<void>
```

**Parameters**

- `domain`: Parent `.rsk` domain. For example, `wallet.rsk`
- `label`: Subdomain to register. For example, `alice`
- `owner`: The new owner's address

**Returns**

- `TransactionReceipt`

**Throws**

- [`KB009`](/rif/rns/libs/javascript/Errors#kb009)
- [`KB010`](/rif/rns/libs/javascript/Errors#kb010)
- [`KB011`](/rif/rns/libs/javascript/Errors#kb011)
- [`KB012`](/rif/rns/libs/javascript/Errors#kb012)
- [`KB015`](/rif/rns/libs/javascript/Errors#kb015)

**Example**

Register `example.testing.rsk` and give ownership to `0x0000000000000000000000000000000000000001`:

```javascript
const newOwnerAddress = '0x0000000000000000000000000000000000000001';
await rns.subdomains.setOwner('testing.rsk', 'example', newOwnerAddress);
```

#### `create`

Creates a new subdomain under the given domain tree if it is available, and sets its resolution if addr is provided.

> Precondition: the sender should be the owner of the parent domain.

**Signature**

```javascript
async create(domain: string, label: string, owner: string, addr: string): Promise<void>
```

**Parameters**

- `domain`: Parent `.rsk` domain. For example, `wallet.rsk`
- `label`: Subdomain to register. For example, `alice`
- `owner`: The owner of the new subdomain. If not provided, the address who executes the tx will be the owner
- `addr`: The address to be set as resolution of the new subdomain

> If `addr` is not provided, no resolution will be set
>
> If `owner` is not provided, the sender will be set as the new owner
>
> If `owner` and `addr` are provided and `owner` is equals to the sender, two txs will be sent.
>
> If `owner` and `addr` are provided but `owner` is different from the sender, then three txs will be sent.

**Returns**

- `TransactionReceipt` of the latest transaction

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

## Advanced operations

Use Web3 `Contract`s directly, find instructions [here](/rif/rns/libs/javascript/Advanced-usage).
