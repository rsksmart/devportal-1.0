---
menu_order: 200
menu_title: Configure Hardhat for Rootstock
layout: rsk
title: 'Configure Hardhat for Rootstock Mainnet and Testnet'
description: 'Learn how to configure your Hardhat project for development on Rootstock testnet and mainnet'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, rootstock, blockchain
render_features: 'collapsible'
---

To deploy contracts, you'll need Rootstock-compatible accounts. You can use existing accounts or create new ones.

First, you'll need to set up a wallet and get a private key. For more information on, see [Private Keys and Public Keys](https://dev.rootstock.io/guides/quickstart/browser/#private-keys-and-public-keys).

### Step 1: Set up Your Hardhat Environment

Follow these steps, to set up your Hardhat environment ready for smart contract development and deployment on the Rootstock network:

[](#top "collapsible")
- Install dotenv 
  - To manage environment variables, install `dotenv` using the following command:
    ```shell
    npm install dotenv
    ```
- Create a .env file
  - In your project root, create a `.env` file and add your Mainnet and Testnet private keys (do not share this file):
    ```shell
    Rootstock_MAINNET_PRIVATE_KEY="your_mainnet_private_key"
    Rootstock_TESTNET_PRIVATE_KEY="your_testnet_private_key"
    ```
    Replace `"your_mainnet_private_key"` and `"your_testnet_private_key"` with your private keys. For information on how to retrieve your private keys, see [How to export an account's private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key).

### Step 2: Configure Private Keys

To configure your `rskMainnet` and `rskTestnet` private keys, you'll need to update your `hardhat.config.js` file in your project's root directory with your private keys.

- To configure your private keys, copy the `accounts` key in network configurations in the code snipet below and paste it in your `hardhat.config.js` file.

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

- Your `hardhat.config.js` file should look like the [`hardhat.config.js` file](https://github.com/jesus-iov/rootstock-quick-start-guide/blob/feat/complete/hardhat.config.js) on GitHub.

### Step 3: Fund Your Accounts

- For Mainnet, you'll need RBTC, which you can obtain from an exchange. See [Get RBTC using Exchanges](https://dev.rootstock.io/guides/get-crypto-on-rsk/rbtc-exchanges/).

- For Testnet, you can get test RBTC from a Rootstock Testnet faucet: See [Rootstock Faucet](https://faucet.rootstock.io/).

---
Next, we'll [Create a Smart Contract](/guides/quickstart/hardhat/write-smart-contract/) on the Rootstock network.

