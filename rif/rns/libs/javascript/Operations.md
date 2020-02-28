---
layout: rsk
title: RNS JS Library - Operations
tags: rns, javascript
---

## Available operations

  - [`addr`](#addr)
  - [`reverse`](#reverse)
  - [`isSubdomainAvailable`](#issubdomainavailable)

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

### `isSubdomainAvailable`

Checks if the given label subdomain is available under the given domain tree.

**Signature**

```javascript
async isSubdomainAvailable(domain: string, label: string): Promise<boolean>
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
rns.isSubdomainAvailable('testing.rsk', 'example').then(console.log)
```

### `createSubdomain`

Creates a new subdomain under the given domain tree.

> Precondition: the sender should be the owner of the parent domain.

**Signature**

```javascript
async createSubdomain(domain: string, label: string, owner: string): Promise<void>
```

**Parameters**

- `domain`: Parent `.rsk` domain. For example, `wallet.rsk`
- `label`: Subdomain to register. For example, `alice`
- `owner`: The new owner's address

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
await rns.createSubdomain('testing.rsk', 'example', newOwnerAddress);
```

## Advanced operations

Use Web3 `Contract`s directly, find instructions [here](/rif/rns/libs/javascript/Advanced-usage).
