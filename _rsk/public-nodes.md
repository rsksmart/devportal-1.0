---
layout: rsk
title: Using RSK Public Nodes (Mainnet & Testnet) provided by IOVLabs
menu_title: Use
tags: rsk, networks, versions, rpc, mainnet, testnet, cUrl
description: "RSK Nodes: Public nodes (Mainnet, Testnet), Versioning, RPC Methods, and cUrl example"
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

## Supported RPC methods

List of more supported RPC methods for each module can be found in the [JSON-RPC documentation](/rsk/node/architecture/json-rpc/).

> **Note**: request headers must include `"Content-Type: application/json"`

## Example using `cURL`

Here's an example request using `cURL` to get the Mainnet block number:

```shell
curl https://public-node.rsk.co \
    -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```
