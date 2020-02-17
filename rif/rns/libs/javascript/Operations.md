---
layout: rsk
title: Javacript Library
tags: rns, javascript
---

## Available operations

  - [`addr`](#addr)
  - [`reverse`](#reverse)
  - [`isSubdomainAvailable`](#isSubdomainAvailable)


### addr
Get address of a given domain and chain. If chainId is not provided, it resolves current blockchain address.

**Signature**
```javascript
async addr(domain: string, chainId?: ChainId): Promise<string>
```

**Parameters**
- `domain`: domain to be resolved.
- `chainId`: chain identifier listed in SLIP44 [https://github.com/satoshilabs/slips/blob/master/slip-0044.md](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)

**Returns**
- `string`: the address resolution

**Examples**
Get an address:

```javascript
rns.addr('testing.rsk').then(console.log)
```

Get Bitcoin address:

```javascript
rns.addr('testing.rsk', '0x80000000').then(console.log)
```

### reverse
Reverse lookup: get name of a given address.

**Signature**
```javascript
async reverse(address: string): Promise<string>
```

**Parameters**
- `address`: address to be resolved.

**Returns**
- `string`: Domain or subdomain associated to the given address.

**Example**

```javascript
rns.reverse('0x0000000000000000000000000000000123456789').then(console.log)
```

### isSubdomainAvailable
Checks if the given label subdomain is available under the given domain tree

**Signature**
```javascript
async isSubdomainAvailable(domain: string, label: string): Promise<boolean>
```

**Parameters**
- `domain`: parent .rsk domain. ie: wallet.rsk
- `label`: subdomain to check if is available. ie: alice

**Returns**
- `boolean`: true if available, false if not

**Example**

Check if `example.testing.rsk` subdomain is available:

```javascript
rns.isSubdomainAvailable('testing.rsk', 'example').then(console.log)
```

## Advanced operations

Use Web3 `Contract`s directly, find instructions [here](/rif/rns/libs/javascript/advanced-usage)
