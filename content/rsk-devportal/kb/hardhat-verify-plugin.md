---
menu_title: Set up Hardhat Verification Plugin for Rootstock
title: "How to Set up Hardhat Verification Plugin for Rootstock"
description: "Configuring Hardhat Verification plugin for Rootstock"
tags: hardhat, tutorial, overview, guides, tokens, web3, bitcoin, rsk, peer-to-peer, blockchain, nomicfoundation/hardhat-verify, rootstock
render_features: 'custom-terminals'
layout: rsk
---

Welcome to the tutorial on how to set up Hardhat Verification Plugin for Rootstock. In this tutorial, we'll do the following steps:

- Setting up your environment 
- Using the plugin

## Prerequisites

To follow this tutorial, you should have knowledge in:

* [How to set up a Hardhat project for Rootstock Testnet | Rootstock (RSK)](https://dev.rootstock.io/kb/hardhat-setup-on-rsk/)

## What is hardhat-verify?

[Hardhat](https://hardhat.org/) is a full-featured development environment for contract compilation, deployment and verification. 
The [hardhat-verify plugin](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify) supports contract verification on BlockScout.

It will be soon also avaible for [Rootstock Explorer](https://explorer.rootstock.io/)

### 1. Installation

```
npm install --save-dev @nomicfoundation/hardhat-verify
```

And add the following statement to your hardhat.config.js:

```
require("@nomicfoundation/hardhat-verify");
```

Or, if you are using TypeScript, add this to your hardhat.config.ts:

```
import "@nomicfoundation/hardhat-verify";
```


### 2. Usage

You need to add the following Etherscan configs to your `hardhat.config.js` file:

```
module.exports = {
  solidity: '0.7.3',
  networks: {
    rsktestnet: {
      chainId: 31,
      url: 'https://public-node.testnet.rsk.co/',      
      accounts: {
        mnemonic: mnemonic,
        initialIndex: 0,
        path: "m/44'/60'/0'/0",
        count: 10,
      },
    },
  },
  etherscan: {    
    apiKey: {
      // Is not required by blockscout. Can be any non-empty string
      rsktestnet: 'your API key',
      rskmainnet: 'your API key'
    },
    customChains: [
      {
        network: "rsktestnet",
        chainId: 31,
        urls: {
          apiURL: "https://rootstock-testnet.blockscout.com/api/",
          browserURL: "https://rootstock-testnet.blockscout.com/",
        }
      },
      {
        network: "rskmainnet",
        chainId: 30,
        urls: {
          apiURL: "https://rootstock.blockscout.com/api/",
          browserURL: "https://rootstock.blockscout.com/",
        }
      },

    ]
  }
};
```

Lastly, run the verify task, passing the address of the contract, the network where it's deployed, and the constructor arguments that were used to deploy it (if any):

```
npx hardhat verify --network rsktestnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
```

or 

```
npx hardhat verify --network rskmainnet DEPLOYED_CONTRACT_ADDRESS
```


## Resources

- Visit [hardhat-verify](https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify#hardhat-verify)
- Visit [blockscout](https://docs.blockscout.com/for-users/verifying-a-smart-contract/hardhat-verification-plugin)