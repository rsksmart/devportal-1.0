---
layout: rsk
title: Using RSK Nodes
---

## Public Nodes

RSK is currently provides two public nodes for testing purposes:

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

* `/`: version `1.0.2` (deprecated)
* `/1.0.2`, `/1.0.2/`: version `1.0.2`
* `/1.1.0`, `/1.1.0/`: version `1.1.0` (current)

The use of `/` will be removed in future releases.

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
curl https://public-node.rsk.co/1.1.0/ \
    -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```