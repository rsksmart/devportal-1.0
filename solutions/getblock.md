---
title: 'GetBlock - Solutions on RSK'
description: 'Fast & Easy Connection to Major Blockchain Nodes.'
tags: GetBlock, rsk-solutions, rsk, bitcoin, defi, dApps, blockchain, node
render_features: 'custom-terminals'
layout: 'rsk'
---

![GetBlock - Banner](/assets/img/solutions/getblock/getblock_logo.png)

## Description

GetBlock is a provider of access to full nodes of the most popular cryptocurrencies:
- Instant connection to blockchain nodes of 45+ cryptocurrencies including  RSK, Bitcoin (BTC), Ethereum (ETH), among others
- Supports JSON-RPC, REST and WebSocket APIs
- Free plan — up to 40K requests/day

## How GetBlock integrates with RSK

![GetBlock - Integration](/assets/img/solutions/getblock/nodes.png)

> Users of GetBlock can connect the [RSK](https://getblock.io/nodes/rsk) node to their application using a fully compliant JSON-RPC API method. In addition, statistics and parameters for the RSK node are displayed in real time on GetBlock which guarantees direct and instant synchronization with the blockchain.

### About GetBlock

GetBlock is a service that provides a fast and easy connection to RSK nodes, and a continuously growing list of over 40 cryptocurrency nodes.
In order to build a blockchain-based application, an individual or a company usually has to deploy and run several blockchain nodes. There is no need to launch and support all the nodes anymore as the GetBlock service will get access to all the available currencies automatically.
In order to get started with GetBlock, clients of the platform have to [register an account](https://account.getblock.io) and receive an API key which will be displayed on the dashboard together with the related data.

### GetBlock's Goal

The goal of Getblock is to provide users with access to full nodes from RSK, and many other leading blockchain platforms, allowing them to request on-chain information from a node without the need to set up one manually.

GetBlock guarantees a fast and stable connection to the RSK nodes by providing a turnkey infrastructure solution, so that a developer can easily integrate the RSK technology to the project without worrying about troubleshooting, updates, and constant syncing.

### Features

Users of GetBlock will have a personal account with the following features included:

- All available blockchain nodes
- Unlimited number of API keys
- Rate limits of 10 requests/sec (auto-scaling is in the roadmap)
- High connection speed at 1GB/sec
- Trace+Archive
- Advanced analytics
- Automated updates
- Technical support

## General Description

GetBlock is a complete solution for developers who don’t need to wait hours and hours for the RSK node to be synced, as the platform provides a cost-effective infrastructure that guarantees a fast and reliable connection to a blockchain via full nodes.

### Components

GetBlock provides instant access to RSK nodes over HTTPS. It supports such APIs as REST, JSON-RPC, Websockets and IRI, which facilitates the whole process of building decentralized applications (dApps).

![GetBlock - ConnectionImage](/assets/img/solutions/getblock/components.png)


### Why choose GetBlock?

- End-to-end solution — easy setup and fast integration of the RSK node to your app, automated node updates, and maintenance
- Always evolving —  list of accessible nodes is always expanded, with new nodes added based on clients' requests
- Reliable connection  — most GetBlock servers are located in Germany, working 24/7 to provide reputable work and fast connection to the RSK node
- Helpful data — all the related information on statistics and parameters for the RSK node is displayed in real-time
- On-demand support — our team of experts guarantee fast consulting and personal support for both beginners and experienced developers
- Privacy — the service doesn’t keep or ask for any information about keys, wallets, or any other private data. It receives from the clients only the encrypted transactions

## Documentation

### Tutorials

- [Getting started with GetBlock: Authentication with API Key and API methods (JSON-RPC, REST, Websockets, etc.)](https://getblock.io/docs)

### Guides

- [About GetBlock](https://getblock.io/about)
- [What is a Blockchain Node and How Does it Work?](https://getblock.io/blog/what-is-a-blockchain-node-and-how-does-it-work)

#### How to make a JSON-RPC request over HTTP

To send JSON RPC over HTTP, it is required to send the request using POST to URL `rsk.getblock.io` with the headers `Content-Type:application/json` and `x-api-key:your-api-key`, and also, the request body.

The example of receiving the number of the last block:

```json
{"jsonrpc": "2.0","id": "healthcheck","method": "eth_getBlockByNumber","params": ["latest", false]}
```

#### How to make a JSON-RPC request over CURL

[](#top "multiple-terminals")
- Linux, Mac OSX
  ```shell
curl -X POST 'rsk.getblock.io' \
--header 'x-api-key: YOUR-API-KEY' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "id": "healthcheck",
    "method": "eth_getBlockByNumber",
    "params": ["latest", false]
}'
  ```
- Windows
  ```windows-command-prompt
curl -X POST 'rsk.getblock.io' \
--header 'x-api-key: YOUR-API-KEY' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "id": "healthcheck",
    "method": "eth_getBlockByNumber",
    "params": ["latest", false]
}'
  ```

#### How to make a JSON-RPC request using Postman

![GetBlock - PostmanRequest](/assets/img/solutions/getblock/postman.png)

#### Websockets

To send JSON RPC over Websocket, it is required to establish the connection:

[](#top "multiple-terminals")
- Linux, Mac OSX
  ```shell
wscat -c https://rsk.getblock.io/websocket -H "x-api-key:<YOUR-API-KEY>"
  ```
- Windows
  ```windows-command-prompt
wscat -c https://rsk.getblock.io/websocket -H "x-api-key:<YOUR-API-KEY>"
  ```

Then, send the request body:

```json
{"jsonrpc": "2.0","id": "healthcheck","method": "eth_getBlockByNumber","params": ["latest", false]}
```

**Result**

```
wscat -c https://rsk.getblock.io/websocket -H "x-api-key:<YOUR-API-KEY>"

Connected (press CTRL+C to quit)
> {"jsonrpc": "2.0","id": "healthcheck","method": "eth_getBlockByNumber","params": ["latest", false]}
< {"jsonrpc":"2.0","id":"healthcheck","result":{"number":"0x2f4d6d","hash":"0x7cec4e01768b4e009fa78d625024ec81dab7811dc2e497f6d831fb051f41c236","parentHash":"0xf0af3726672c218c33e81de33e5f69bb008555931bd63056d24bde6a2cbfca87"..........
```

## Get in touch


If you have any technical issues write at [support@getblock.io](mailto:support@getblock.io), for general inquiries and partnership offers write at [marketing@getblock.io](mailto:marketing@getblock.io).

- [Website](https://getblock.io)
- [Blog](https://getblock.io/blog)
- [Medium](https://getblock.medium.com/)

### Socials

- [Twitter](http://twitter.com/getblockio)
- [Facebook](http://facebook.com/getblockio)
- [Reddit](http://reddit.com/r/getblockio/)
- [Telegram](http://t.me/getblockio_eng)
- [Instagram](http://instagram.com/getblock.io)
- [LinkedIn](http://linkedin.com/company/getblock)
- [Discord](https://discord.gg/9GdSbf6)
