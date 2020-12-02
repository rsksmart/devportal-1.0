---
layout: rsk
---

## Data vault - Centralized pinner provider

A Centralized Data Vault provider compatible with RIF Data Vault standard interface. It stores content in an IPFS node associated to a given DID and key.

**It is strongly recommended to encrypt the content saved in IPFS using this package.**

### Features

- Stores, retrieve, deletes and swaps content from/in an IPFS node
- Associates did -> key -> cid in a SQLite local DB so it is not needed to remember the just created cid
- Pins and unpins cids in the given IPFS node

### Usage

The IPFS Centralized pinner provider was designed to use in [Centralized pinner service](/rif/identity/data-vault/cpinner/cpinner-service) but can be used as standalone

#### Basic instance

Plug and play configuration

```typescript=
import { ipfsPinnerProviderFactory, IpfsPinnedCid, IpfsMetadata } from '@rsksmart/ipfs-cpinner-provider'
import { createConnection } from 'typeorm'

const ipfsApi = 'http://localhost:5001'

const database = 'my-ipfs-pinner-provider.sqlite'
const Entities = [IpfsPinnedCid, IpfsMetadata]

const dbConnection = await createConnection({
  type: 'sqlite',
  database,
  entities: Entities,
  logging: false,
  dropSchema: true,
  synchronize: true
})

const ipfsPinnerProvider = await ipfsPinnerProviderFactory(dbConnection, ipfsApi)
// NOTE: ipfsApi is optional. Default value is: 'http://localhost:5001'
```

#### Advanced instance

This allows to configure the `ipfs-http-client` and set the DB connection with the desired configuration

```typescript=
import { createConnection } from 'typeorm'
import IpfsHttpClient from 'ipfs-http-client'
import IpfsPinnerProvider, { IpfsClient, IpfsPinner, MetadataManager, Entities, IpfsMetadata, IpfsPinnedCid } from '@rsksmart/ipfs-cpinner-provider'

// ipfs config
const ipfsConfig = { ...yourConfig, url: 'http://localhost:5001' } // refer to https://www.npmjs.com/package/ipfs-http-client
const ipfsHttpClient = IpfsHttpClient(ipfsConfig) 

// db config
const database = 'my-ipfs-pinner-database.sqlite'
const dbConnection = await createConnection({
  type: 'sqlite',
  database,
  entities: Entities,
  logging: false,
  dropSchema: true,
  synchronize: true
})

const pinnedCidsRepository = dbConnection.getRepository(IpfsPinnedCid)
const metadataRepository = dbConnection.getRepository(IpfsMetadata)

// set dependencies to inject
const ipfsClient = new IpfsClient(ipfsHttpClient)
const ipfsPinner = new IpfsPinner(ipfsHttpClient, pinnedCidsRepository)
const metadataManager = new MetadataManager(metadataRepository)

const IpfsPinnerProvider = new IpfsPinnerProvider(ipfsClient, metadataManager, ipfsPinner)
```

#### Usage

```typescript=
const did = 'did:ethr:rsk:12345678'
const key = 'the key'
const content = 'the content'

const cid: string = await ipfsPinnerProvider.create(did, key, content)

const content: { id: string, content: string }[] = await ipfsPinnerProvider.get(did, key)

const keys: string[] = await ipfsPinnerProvider.getKeys(did)

const newCid: string = await ipfsPinnerProvider.swap(did, key, 'the new content')

const anotherCid: string = await ipfsPinnerProvider.swap(did, key, 'the new content', newCid) // cid can be specified if there is more than one content associated to the given did and key

const deleted: boolean = await ipfsPinnerProvider.delete(did, key)

const deleted: boolean = await ipfsPinnerProvider.delete(did, key, cid) // cid can be specified if there is more than one content associated to the given did and key
```

### Run for development

Check out [`ipfs-cpinner-client` in the `rif-data-vault` repo](https://github.com/rsksmart/rif-data-vault/tree/master/modules/ipfs-cpinner-client).
