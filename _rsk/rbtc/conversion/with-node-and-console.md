---
layout: rsk
title: Conversion with node and console
tags: rsk, rbtc, conversion, peg, 2-way, peg-in, peg-out, federation, node, cli
description: 'How to perform the Powpeg mechanism using node and console'
collection_order: 3150
---

This document explains how to try the Powpeg mechanism using
your RSK node and a command line.

- [General requirements](#general-requirements)
- [BTC to RBTC conversion](#btc-to-rbtc-conversion)
- [RBTC to BTC conversion](#rbtc-to-btc-conversion)

## General Requirements

- You need to be in full control of your BTC private key.
- You need a BTC Wallet properly configured using said private key.
- _[Only for release process]_ You need an RSK node up and running,
  with the RPC interface enabled, and the personal and eth modules enabled
  - See [how do I run an RSK Node?](/rsk/node/install/).

## BTC to RBTC conversion

How to perform a peg-in.

:exclamation: **Before starting:** Read
[lock requirements](/rsk/rbtc/conversion/networks/mainnet/#btc-to-rbtc-conversion)

1. With your Bitcoin address,
   send a BTC transaction to the RSK Federation Address.
2. Using your preferred BTC block explorer
   (e.g. [Blocktrail](https://www.blocktrail.com/BTC)),
   follow your transaction and wait the stipulated time.
3. Convert the private key to RSK format with this tool:
   [https://github.com/rsksmart/utils](https://github.com/rsksmart/utils)),
   and write down your RSK account information.
4. Then use the [RSK Testnet Explorer](https://explorer.testnet.rsk.co)
   or [RSK Mainnet Explorer](https://explorer.rsk.co)
   to see your RBTC balance.
   Remember that RSK addresses must start with `0x`.

## RBTC to BTC conversion

How to perform a peg-out.

:exclamation: **Before starting:** Read
[release requirements](/rsk/rbtc/conversion/networks/mainnet/#rbtc-to-btc-conversion)

1. Add your obtained RSK private key to your RSK node.
   Replace `RSKConvertedPrivateKey`, `RSKNode` and `RSKNodePort`
   and run this command:
   ```shell
   $ curl -X POST --data '{"method":"personal_importRawKey", "params":["<RSKConvertedPrivateKey>", "<passPhraseToEncryptPrivKey>"], "jsonrpc":"2.0", "id":1}' http://<RSKNode>:<RSKNodePort>
   ```
2. Unlock your account for transfers.
   Replace `RSKAddress`, `passPhraseJustUsedToEncryptPrivKey`, `RSKNode`
   and `RSKNodePort` and run:
   ```shell
   $ curl -X POST --data '{"method":"personal_unlockAccount", "params":["<RSKAddress>", "<passPhraseJustUsedToEncryptPrivKey>", ""], "jsonrpc":"2.0", "id":1}' http://<RSKNode>:<RSKNodePort>
   ```
3. Transfer your desired amount.
   Replace `RSKAddress`, `valueToReleaseInWeis`, `RSKNode` and `RSKNodePort`
   and run:
   ```shell
   $ curl -X POST --data '{"method":"eth_sendTransaction", "params":[{"from": "<RSKAddress>", "to": "0x0000000000000000000000000000000001000006", "gasPrice": 59240000, "gas": 44000, "value": <valueToReleaseInWeis>}], "jsonrpc":"2.0", "id":1}' http://<RSKNode>:<RSKNodePort>
   ```
4. Wait the stipulated time and check your BTC balance.
