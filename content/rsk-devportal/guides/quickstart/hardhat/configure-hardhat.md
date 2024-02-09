---
menu_order: 200
menu_title: Configure Hardhat for Rootstock
layout: rsk
title: 'Configure Hardhat for Rootstock Mainnet and Testnet'
description: 'Learn how to configure your Hardhat project for development on Rootstock testnet and mainnet'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, rootstock, blockchain
render_features: 'collapsible'
---

### Setting Up Accounts

To deploy contracts, you'll need Rootstock-compatible accounts. You can use existing accounts or create new ones.

> First, set up a wallet and get a private key, see the section on [Using Rootstock in the Browser](https://dev.rootstock.io/guides/quickstart/browser/#private-keys-and-public-keys).

Follow these steps, to set up your Hardhat environment ready for smart contract development and deployment on the Rootstock network:

[](#top "collapsible")
- Install `dotenv` to manage environment variables:
    ```shell
    npm install dotenv
    ```
- Create a .env file in your project root and add private keys (do not share this file):**
    ```shell
    Rootstock_MAINNET_PRIVATE_KEY="your_mainnet_private_key"
    Rootstock_TESTNET_PRIVATE_KEY="your_testnet_private_key"
    ```
- Update hardhat.config.js to use these keys:**
    ```js
    require('dotenv').config();
    // Add 'accounts' key in network configurations
    networks: {
      hardhat: {},
      rskMainnet: {
        // ... other settings
        accounts: [process.env.Rootstock_MAINNET_PRIVATE_KEY]
      },
      rskTestnet: {
        // ... other settings
        accounts: [process.env.Rootstock_TESTNET_PRIVATE_KEY]
      }
    }
    ```
- Fund your accounts:
    - For Mainnet, you'll need RBTC, which you can obtain from an exchange. See [Get RBTC using Exchanges](https://dev.rootstock.io/guides/get-crypto-on-rsk/rbtc-exchanges/).
    - For Testnet, you can get test RBTC from a Rootstock Testnet faucet: [https://faucet.rsk.co/](https://faucet.rsk.co/)

