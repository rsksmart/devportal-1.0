---
layout: rsk
menu_title: Rootstock API CLI
title: Rootstock API Library - Interact with Rootstock & Ethereum nodes | Roostock (RSK)
description: "A library and commands to interact with Rootstock and Ethereum nodes"
tags: tutorial, rsk, cli
---

In recent years I have carried out various experiments
with [RSK](https://www.rsk.co/) blockchains nodes (local, testnet, mainnet)
and also with local ganache, geth and parity nodes.
The way to connect from an external application to those
Ethereum nodes is using [JSON RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC).
Although there are several libraries (in JavaScript, Python and other languages) to send these messages, I preferred writing my own library to learn how the protocol works. As I try to pursue simplicity, I was not convinced to use libraries
(like [web3js](https://web3js.readthedocs.io/en/v1.2.6/)) that seem too huge to me.

So I wrote [RskAPI as a personal project](https://github.com/ajlopez/rskapi). It is a JavaScript library that allows connecting to a node,
using http or https as transport.

## Keep it simple, and learn

As usual in my personal projects in JavaScript
(and other languages) I add few dependencies.
At the end term, all the interaction that I want
is simply to send and receive JSON messages, nothing else.
So, for many months, this project was growing only with
other of my personal projects as dependencies (like [simplejsonrpc](https://github.com/ajlopez/simplejsonrpc)).

One of the concessions that I had to make to my inclination
to have few dependencies in this type of projects,
was the need to include two libraries that allow me
to sign and encode transactions, something very common
with these nodes, where in production it is recommended
not to have the private keys on the node itself, but
sign the transactions from the external application.
This is the main use case to have more dependencies
in a project like this.

## Using commands

You can use my library simply from plain JavaScript in node.js:

```js
const rskapi = require('rskapi');
// Connecting to a local node, maybe RSK regtest
const client = rskapi.client('http://localhost:4444');
/** operations with the node **/
const number = await client.number(); // best block number
const bestBlock = await client.block(number); // retrieve best block
```

But I found very useful to have sample commands:
Command-line programs that executes tasks, and save
results in a configuration file. See [samples/commands](https://github.com/ajlopez/RskApi/tree/master/samples/commands)
folder.

Let’s run an example. From this folder, execute:

```
node sethost https://public-node.testnet.rsk.co:443
```

This is the RSK public node for testnet (see RSK public nodes). In my library, you MUST specify the port (443) if you are using https transport.

You need an account. Create a random one and associate it with a logical name:

```
node genaccount root
```


The configuration file `config.json` have the data of the account. This approach is for experimental tasks, not for production. The generated public address is shown, then you could add funds using
[RSK testnet faucet](https://faucet.rsk.co/).

You can retrieve the balance (in weis) using

```
node getbalance root
```

You can create new accounts with:

```
node genaccount alice
node genaccount bob
node genaccount charlie
```

You can transfer weis from one account to another:

```
node transfer root alice 1000000000000
node transfer root bob 1000000000000
```

Retrieve all the balance:

```
node getbalances
```

The sample also includes some smart contracts in `contracts` folder and their compilation result (using truffle) already available in `build/contracts` folder. So, without truffle, you even can deploy the contract, e.g. Counter, to an instance, using the funds of an account to pay the deployment:


```
node deploy root counter1 Counter
```

The name `counter1` is the logical name of the new account just created with the deployed contract.

You can query the contract:

```
node call root counter1 counter()
```

and invoke it to change its status

```
node invoke root counter1 increment()
node invoke root counter1 increment()
node invoke root counter1 add(uint256) 40
node call root counter1 counter()
```

I’m using some older versions of these commands and library
 in others of my projects, like [RskUtils](https://github.com/ajlopez/RskUtils/tree/master/transfers),
 [EthMeta](https://github.com/ajlopez/EthMeta/tree/master/commands)
 and [DeFiProt](https://github.com/ajlopez/DeFiProt/tree/master/commands).

## Other available objects

There are other objects that can be use from the library. One is the host: A client is only a wrapper of a host, that it is in charge of some formatting and validations, not to be discussed here (I’m thinking of some internal refactors).

You can get an host in two ways:

```js
// from a client
const client = rskapi.client('http://localhost:4444');
const host = client.host();
// or directly
const host = rskapi.host('http://localhost:4444');
```

If you need to invoke a particular JSON RPC method not directly supported by a client or host, you can use the provider object:

```js
const provider = host.provider();
// I should add too client.provider()
```

that is an instance of [simplejsonrpc project](https://github.com/ajlopez/simplejsonrpc).

## Future work

I will add some additional functions to clients, like log retrieval and code retrieval. I plan to add the commands too. And I will add some programming examples, with more intensive tasks, like sending many transactions from differents accounts, deploying and invoking tokens, etc.

I’m having fun :-)