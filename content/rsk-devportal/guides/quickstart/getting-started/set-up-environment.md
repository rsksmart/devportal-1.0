---
menu_order: 100
menu_title: Set Up Your Environment
layout: rsk
title: 'Set Up Your Environment'
description: ''
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, blockchain
---

### Creating a Hardhat Project

#### Creating a New Directory for Your Project

Before installing Hardhat, create a new directory for your project and navigate into the directory.

```shell
mkdir your_project_name
 cd your_project_name
```

#### Initializing a Node.js Project:

This command creates a `package.json file` with default values.

```shell
npm init -y
```

#### Installing Hardhat:

This command adds Hardhat as a development dependency in your project.

```shell
npm install --save-dev hardhat
```

#### Setting Up the Hardhat Project

After installing, run `npx hardhat` in your project directory. You'll be presented with a few options. Select “Create an empty hardhat.config.js” if you want to start from scratch, or choose one of the sample projects to have some boilerplate code to start with.

![Hardhat Installation Success](/assets/img/guides/quickstart/getting-started/install-success.png)

Once setup is complete, you can verify Hardhat is installed correctly by running npx hardhat again. This time, it should display a help message with available tasks, indicating that Hardhat is installed and ready to use.

#### Additional Plugins

Consider installing additional Hardhat plugins as per your project's needs. These plugins can be added via npm, similar to installing Hardhat. 
For example, hardhat-ethers is a popular plugin used in this guide for integrating the Ethers.js library.
Install hardhat-ethers using `npm install --save-dev @nomicfoundation/hardhat-ethers`

### Configuring Hardhat for Rootstock Mainnet and Testnet

#### Configure Network Settings in hardhat.config.js
Open or create the `hardhat.config.js` file in your project's root directory. Add configurations for Rootstock Mainnet and Testnet. Here's an example:

```js
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    rskMainnet: {
      url: "https://public-node.rsk.co",
      chainId: 30,
      gasPrice: 60000000,
    },
    rskTestnet: {
      url: "https://public-node.testnet.rsk.co",
      chainId: 31,
      gasPrice: 60000000,
    }
  }
};
```

#### Setting Up Accounts

To deploy contracts, you'll need Rootstock-compatible accounts. You can use existing accounts or create new ones.
Following these steps, you'll have a fully set up Hardhat environment ready for smart contract development and deployment on the Rootstock network.
> To set up a wallet and get a private key, see the section on [Using Rootstock in the Browser](https://dev.rootstock.io/guides/quickstart/browser/#private-keys-and-public-keys).

**Install `dotenv` to manage environment variables:**

```shell
npm install dotenv
```

**Create a .env file in your project root and add private keys (do not share this file):**

```
Rootstock_MAINNET_PRIVATE_KEY="your_mainnet_private_key"
Rootstock_TESTNET_PRIVATE_KEY="your_testnet_private_key"
```

**Update hardhat.config.js to use these keys:**

```js
require('dotenv').config();

const { Rootstock_MAINNET_PRIVATE_KEY, Rootstock_TESTNET_PRIVATE_KEY } = process.env;

// Add 'accounts' key in network configurations
networks: {
  hardhat: {},
  rskMainnet: {
    // ... other settings
    accounts: [`0x${Rootstock_MAINNET_PRIVATE_KEY}`]
  },
  rskTestnet: {
    // ... other settings
    accounts: [`0x${Rootstock_TESTNET_PRIVATE_KEY}`]
  }
}
```

**Funding Your Accounts:**

- For Mainnet, you'll need RBTC, which you can obtain from an exchange. See [Get RBTC using Exchanges](https://dev.rootstock.io/guides/get-crypto-on-rsk/rbtc-exchanges/).

- For Testnet, you can get test RBTC from a Rootstock Testnet faucet: [https://faucet.rsk.co/](https://faucet.rsk.co/)
