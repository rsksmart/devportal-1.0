---
layout: rsk
title: Using RSK Public Nodes (Mainnet & Testnet) provided by IOVLabs
tags: rsk, networks, versions, rpc, mainnet, testnet, cUrl
description: "RSK Nodes: Public nodes (Mainnet, Testnet), Versioning, RPC Methods, and cUrl example"
collection_order: 2200
---

## Public Nodes

IOVLabs currently provides two public nodes that you can use
for testing purposes, and you will find that information below.

Alternatively, follow the [installation instructions](/rsk/node/install/),
to run your own RSK node.
This is highly recommended for production environments,
and in accordance with the bitcoiners' maxim: **Don't trust. Verify.**


### Testnet

```
https://public-node.testnet.rsk.co
```

### Mainnet

```
https://public-node.rsk.co
```

## Versioning

Current and previous versions are accessible through these routes:

* `/`: version `3.0.0` (current)


## Supported RPC methods

These nodes support the following JSON RPC methods:

| Method |
| ------ |
| `net_version` |
| `net_listening` |
| `net_peerCount` |
| `eth_protocolVersion` |
| `eth_hashrate` |
| `eth_mining` |
| `eth_call` |
| `eth_estimateGas`|
| `eth_gasPrice` |
| `eth_blockNumber`|
| `eth_getBalance` |
| `eth_getBlockByHash` |
| `eth_getBlockByNumber` |
| `eth_getBlockTransactionCountByHash` |
| `eth_getBlockTransactionCountByNumber` |
| `eth_getCode` |
| `eth_getStorageAt` |
| `eth_getTransactionByBlockHashAndIndex` |
| `eth_getTransactionByBlockNumberAndIndex` |
| `eth_getTransactionByHash` |
| `eth_getTransactionCount` |
| `eth_getTransactionReceipt` |
| `eth_getUncleByBlockHashAndIndex` |
| `eth_getUncleByBlockNumberAndIndex` |
| `eth_getUncleCountByBlockHash` |
| `eth_getUncleCountByBlockNumber` |
| `eth_sendRawTransaction` |

> **Note**: request headers must include `"Content-Type: application/json"`

## Example using `cURL`

Here's an example request using `cURL` to get the Mainnet block number:

```shell
curl https://public-node.rsk.co \
    -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```
