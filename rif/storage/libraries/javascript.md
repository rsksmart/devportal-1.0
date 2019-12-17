---
layout: rsk
title: RIF Storage JS
---

## Install

### npm

```sh
> npm install rif-storage
```

### Use in Node.js

```js
var RifStorage = require('rif-storage')
```

### Use in a browser with browserify, webpack or any other bundler

```js
var RifStorage = require('rif-storage')
```

### Use in a browser Using a script tag

Loading this module through a script tag will make the `RifStorage` obj available in the global namespace.

```html
<script src="https://unpkg.com/rif-storage/dist/index.min.js"></script>
<!-- OR -->
<script src="https://unpkg.com/rif-storage/dist/index.js"></script>
```

## Usage

This is a client library, therefore you need to provide access to the provider's running node for specifics see [Providers](#providers).

```javascript
import RifStorage, { Provider } from 'rif-storage'

// Connects to locally running node
const storage = RifStorage(Provider.IPFS, { host: 'localhost', port: '5001', protocol: 'http' })

const fileHash = storage.put(Buffer.from('hello world!'))
const retrievedData = storage.get(fileHash) // Returns Buffer
console.log(retrievedData.toString()) // prints 'hello world!'

const directory = {
  'file': { data: Buffer.from('nice essay')},
  'other-file': { data: Buffer.from('nice essay')},
  'folder/with-file': { data: Buffer.from('nice essay')},
  'folder/with-other-folder/and-file': { data: Buffer.from('nice essay')}
}
const rootHash = storage.put(directory)
const retrievedDirectory = storage.get(rootHash)
```

## Providers

This library integrates several (decentralized) storage providers, currently supported is:

 - [IPFS](https://ipfs.io/) using [js-ipfs-http-client]
 - [Swarm](http://swarm-guide.readthedocs.io/) using [Erebos] library

### IPFS

 > in-browser node ✅

```javascript
RifStorage(Provider.IPFS, ipfsOptions)
```

`ipfsOptions` are directly passed to [js-ipfs-http-client], hence check that for syntax and options.

You can run a node directly in browser using [js-ipfs]. Just create instance and pass it instance instead of `ipfsOption`.

### Swarm

 > in-browser node ❌

```javascript
RifStorage(Provider.SWARM, swarmOptions)
```

`swarmOptions` are directly passed to [Erebos], hence check that for syntax and options.
