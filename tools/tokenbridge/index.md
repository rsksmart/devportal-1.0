---
layout: rsk
title: RSK <-> ETH Token Bridge
---

Ethereum/RSK Bridge that allows to move ERC20 tokens between one chain and the other.

## Rationale

Cross chain events are very important in the future of cryptocurrencies. Exchanging tokens between networks allows the token holders to use them in their favorite chain without being restricted to the network choice of the contract owner. Moreover, this also allows layer 2 solutions to use the same tokens on different chains. The combination of token bridges and stable coins creates a great way of payment with low volatility across networks.

## Overview

We have a smart contract bridge on each network, the bridge on one chain will receive and lock the tokens, then it will emit an event that will be served to the bridge on the other chain. There is a Federation in charge of sending the event from one contract to the other.
See the [FAQ](/tools/tokenbridge/faq/) to learn more about how it works!

The bridge contracts are upgradeable as we wish to move to a decentralized bridge in the future. Here is the first
[POC of the trustless decentralized bridge](https://github.com/rsksmart/tokenbridge/releases/tag/decentralized-poc-v0.1)

## Usage

You can use the ['Token Bridge Dapp'](https://tokenbridge.rsk.co/) together with [Nifty Wallet](https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid) or [Metamask with custom network](https://github.com/rsksmart/rskj/wiki/Configure-Metamask-to-connect-with-RSK) to move tokens between networks. This is the [Dapp guide](/tools/tokenbridge/dappguide/) if you don't know how to use it.
Alternatively, you can use a wallet or web3js with the ABI of the contracts. See ['interaction guide using MyCrypto'](/tools/tokenbridge/usingmycrypto/) for more information on how to use the bridge.


## Developers

### Contracts

The smart contracts used by the bridge and the deploy instructions are in the ['bridge folder'](/tools/tokenbridge/bridge/).
The ABI to interact with the contracts are in the ['abis folder'](https://github.com/rsksmart/tokenbridge/tree/master/abis)
Here are the ['addresses'](/tools/tokenbridge/contractaddresses/) of the deployed contracts in the different networks.

### Federation

There is a federation in charge of notifying the events that have happened in the bridge between one chain and the other. The federation is composed of the creators of the token contracts who want to enable their token for crossing.
See the ['federator'](/tools/tokenbridge/federator/) for more information about the federator.

To run the federator using Docker, first go to the `/federator/config` folder and rename `config.sample.js` to `config.js`. In that file you will decide the networks the federation should listen to. For example, for the bridge in Testnet, a federator `config.js` will look like

```javascript
module.exports = {
    mainchain: require('./rsktestnet-kovan.json'),
    sidechain: require('./kovan.json'),
    runEvery: 1, // In minutes,
    confirmations: 10,// Number of blocks before processing it,
    privateKey: require('federator.key'),
    storagePath: './db'
}
```

&hellip; where the `mainchain` is `rsktestnet` and the `sidechain` is `kovan`, the JSON files are in the `/federator/config` folder, and includes the addresses of the contracts in that network and the block number in which they were deployed.
The order of `sidechain` and `mainchain` is not important, as federators are bi-directional.
The JSON files also reference the host for each network. For example, this is the `rsktestnet-kovan.json`

```json
{
    "bridge": "0x684a8a976635fb7ad74a0134ace990a6a0fcce84",
    "federation": "0x36c893a955399cf15a4a2fbef04c0e06d4d9b379",
    "testToken": "0x5d248f520b023acb815edecd5000b98ef84cbf1b",
    "multisig": "0x88f6b2bc66f4c31a3669b9b1359524abf79cfc4a",
    "allowTokens": "0x952b706a9ab5fd2d3b36205648ed7852676afbe7",
    "host": ""<YOUR NODE HOST AND RPC PORT>"",
    "fromBlock": 434075
}
```

You need to change `"<YOUR NODE HOST AND RPC PORT>"` to the URL of your node for that network and the JSON-RPC port. **Remember to do it for both networks**.
Also you need to create a `federetaros.key` file with the federator's private key in it.
Once you have changed the configuration, create the docker image using.
`docker build . -t fed-tokenbridge`

Then run `docker run --rm -v $PWD/federator/config:/app/federator/config --name=fed-tokenbridge fed-tokenbridge:latest` to start the image.
