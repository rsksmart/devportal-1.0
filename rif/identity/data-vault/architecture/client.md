---
layout: rsk
tags: rlogin, rif, rif-identity, data-vault, architecture, libraries, DID, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

## Data vault - Centralized pinner client

A Web Client to simplify the way the services provided by the IPFS Centralized Data Vault Service are consumed.

### Features

- Manage authentication according to the [DID Auth protocol](/rif/rlogin/libraries/express-did-auth)
- CRUD operations over the RIF Data Vault
- Stores the authentication credentials in the given storage
- Encrypts/decrypts data prior to save/return using the user wallet provider

### Usage

#### Instantiate

The package expose a `DataVaultWebClient` class that receives a `Config` object when it is instantiated.

The `Config` object has the following fields:

- `serviceUrl: string`: the IPFS Centralized Data Vault Service url
- `authManager?: AuthManager`: the authentication manager. Please find instructions on how to instantiate it below.
- `encryptionManager: EncryptionManager`: the encryption manager. Please find instructions on how to instantiate it below.

```typescript
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'

const serviceUrl = 'http://your-ipfs-cpinner-service.com'

// the following fields are required just to perform write operations
const serviceDid = 'did:ethr:rsk:0x123456789....abc'
const address = '0xabcdef....123' // user's address
const did = `did:ethr:rsk:${address}`

// these are examples with Metamask
const personalSign = (data: string) => window.ethereum.request({ method: 'personal_sign', params: [address, data] })
const decrypt = (hexCypher: string) => window.ethereum.request({ method: 'eth_decrypt', params: [hexCypher, address] })
const getEncryptionPublicKey = () => window.ethereum.request.request({ method: 'eth_getEncryptionPublicKey', params: [address] })

const client = new DataVaultWebClient({
  serviceUrl,
  authManager: new AuthManager({ did, serviceUrl, personalSign }),
  encryptionManager: new EncryptionManager({ getEncryptionPublicKey, decrypt  })
})
```

##### Auth Manager

It manages authentication according to the [DID Auth protocol](/rif/rlogin/libraries/express-did-auth). It is in charge of emitting the necessary events to be signed by the user and store the generated tokens. It will associate the generated tokens to the current DID so it allows multiple sessions with different DIDs.

It is instantiated with a `DIDAuthConfig` object, which contains the following fields:
- `serviceUrl: string`: the IPFS Centralized Data Vault Service URL, which enables the user to be logged in.
- `did?: string`: the client did. It is required if performing authenticated requests
- `personalSign?: (data: string) => Promise<string>`: the personalSign function associated to the client did. It is used to sign the challenge in the login process. Metamask example: `(data: string) => window.ethereum.request({ method: 'personal_sign', params: [address, data] })`
- `store?: KeyValueStore`: object that MUST implement the `KeyValueStore` interface. It is used to save the `accessToken` and `refreshToken`. It uses [window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) if not store object provided.

Example:

```typescript
const serviceUrl = 'http://your-ipfs-cpinner-service.com'
const address = '0xabcdef....123' // user's address
const did = `did:ethr:rsk:${address}`

// Metamask example
const personalSign = (data: string) => window.ethereum.request({ method: 'personal_sign', params: [address, data] })

const authManager = new AuthManager({ did, serviceUrl, personalSign })
```

##### Encryption Manager

It is in charge of managing the encryption of the saved information and the decryption of the received information.
It also decides whether or not to decrypt the content based on the current status, it also checks if it's encrypted before trying to decrypt it.

It receives an `EncryptionManagerConfig` with the following fields:
- `getEncryptionPublicKey?: () => Promise<string>`: the method used to get the user encryption public key. That public key will be used to encrypt the content before sending it to the service to be stored. [Metamask](https://docs.metamask.io/guide/rpc-api.html#eth-getencryptionpublickey) example: `() => window.ethereum.request.request({ method: 'eth_getEncryptionPublicKey', params: [address] })`. If it is not provided, the content will not be encrypted prior to saving it in IPFS.
- `decrypt: (hexCypher: string) => Promise<string>`: the method used to decrypt data stored in the service. If using [Metamask](https://docs.metamask.io/guide/rpc-api.html#eth-decrypt) example: `(hexCypher: string) => window.ethereum.request({ method: 'eth_decrypt', params: [hexCypher, address] })`, then this method will prompt the user to decrypt content in the wallet. If there's no Metamask wallet present, we strongly recommend creating a function that alerts the user that the content will not be decrypted because the wallet does not include that feature.

Example:

```typescript
// Metamask example
const decrypt = (hexCypher: string) => window.ethereum.request({ method: 'eth_decrypt', params: [hexCypher, address] })
const getEncryptionPublicKey = () => window.ethereum.request.request({ method: 'eth_getEncryptionPublicKey', params: [address] })

const encryptionManager = new EncryptionManager({ getEncryptionPublicKey, decrypt  })
```

#### Get

It returns all the `content` (with its `id`) associated to a given `key` and the logged `did` in a form of `{ id: string, content: string }[]`

```typescript
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'

const client = new DataVaultWebClient({ serviceUrl, decrypt, did, rpcPersonalSign })

const key = 'EmailCredential'

const credentials = await client.get({ did, key })
```

### Get keys

It returns an array of string with all the `keys` associated to the logged in `did`.
If there are not `keys`, it returns an empty array.

If the client is not logged in yet, it will log it in prior to get the `keys`, so it may prompt the user to sign the login message. Please refer to the [DID Auth protocol](../../../specs/did-auth) for more information.

```typescript
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'

const client = new DataVaultWebClient({ serviceUrl, did, rpcPersonalSign, serviceDid })

const keys = await client.getKeys()
```

### Get storage information

```typescript
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'

const client = new DataVaultWebClient({ serviceUrl, did, rpcPersonalSign, serviceDid })

const storage = await client.getStorageInformation()

console.log(`Used: ${storage.used}`)
console.log(`Available: ${storage.available}`)
```

### Get backup information

```typescript
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'

const client = new DataVaultWebClient({ serviceUrl, did, rpcPersonalSign, serviceDid })

const backup = await client.getBackup()

console.log('This is the keys and cids you have stored in the DV')
console.log(backup)
```

#### Create

It saves new `content` associated to the given `key` into the service and returns the associated `id`.
Receives an object containing the `key` and the `content`

If the `key` already exists, it will add `content` associated to that `key`. Old `content` will still be there.
If not, a new `key` will be created and associated to the logged in `did`.

If the client is not logged in yet, it will log it in prior to saving the new `content`, so it may prompt the user to sign the login message. Please refer to the [DID Auth protocol](../../../specs/did-auth) for more information.


```typescript
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'

const client = new DataVaultWebClient({ serviceUrl, did, signer, serviceDid })

const key = 'MyKey'
const content = 'this is my content'

const id = await client.create({ key, content })
```

#### Swap

It replaces `content` and returns the `id` of the just created `content`.
It receives an object with `key` and `content` as mandatory fields. It also allows to add the `id` of the desired `content` to be replaced.
If `id` is not provided, it will replace ALL the `content` associated to the `key` with the new `content`.
If `id` is provided, it just replace the `content` with the given `id` and `key`

If the `key` does not exist, will create it.

If the client is not logged in yet, it will log it in prior to replacing the new `content`, so it may prompt the user to sign the login message


##### Without `id`

```typescript
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'

const client = new DataVaultWebClient({ serviceUrl, did, signer, serviceDid })

const key = 'MyKey'
const content = 'this is my content'

const id = await client.swap({ key, content })
```

##### With `id`

```typescript
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'

const client = new DataVaultWebClient({ serviceUrl, did, signer, serviceDid })

const key = 'MyKey'
const original1 = 'this is my content number 1'
const original2 = 'this is my content number 2'

const id1 = await client.create({ key, content: original1 })
const id2 = await client.create({ key, content: original2 })

const newContent = 'this is the new content'

const newId = await client.swap({ key, content, id: id1 })

const MyKeys = await client.get(key) // it will return an array containing [original2, newContent]
```

#### Delete

It deletes the `content` associated to the given `key` (and `id` if provided).
It receives an object with `key` as the mandatory field. It also allows to add the `id` of the desired `content` to be deleted.
If `id` is not provided, it will delete ALL the `content` associated to the `key`.
If `id` is provided, it just deletes the `content` that matches the given `id` and `key`

If the `key` does not exist, will create it.

If the client is not logged in yet, it will log it in prior to deleting, so it may prompt the user to sign the login message


##### Without `id`

```typescript
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'

const client = new DataVaultWebClient({ serviceUrl, did, signer, serviceDid })

const key = 'MyKey'

await client.delete({ key })
```

##### With `id`

```typescript
import DataVaultWebClient from '@rsksmart/ipfs-cpinner-client'

const client = new DataVaultWebClient({ serviceUrl, did, signer, serviceDid })

const key = 'MyKey'
const content = 'this is my content'

const id = await client.create({ key, content: original1 })

await client.delete({ key, id })
```

### Run for development

Check out [`ipfs-cpinner-client` in the `rif-data-vault` repo](https://github.com/rsksmart/rif-data-vault/tree/master/modules/ipfs-cpinner-client).
