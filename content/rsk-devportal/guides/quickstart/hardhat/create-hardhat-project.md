---
menu_order: 100
menu_title: Create Hardhat Project
layout: rsk
title: 'Create Hardhat Project'
description: 'Learn how to set up your environment for development using Hardhat'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, rootstock, blockchain
render_features: 'collapsible'
---
## Create a Hardhat Project

To create a hardhat project:

[](#top "collapsible")
- Clone the repository for your project:
    - Open your terminal or command prompt.
    - Navigate to the directory where you want to clone the repository with `cd your-directory-path`.
    - Use the git clone command followed by the repository's URL:
    ```shell
   git clone https://github.com/zdaodu-iov/rootstock-quick-start-guide
   cd rootstock-quick-start-guide
    ```
- Initialize a Node.js project:
    - This command creates a `package.json file` with default values.
    ```shell
    npm init -y
    ```
- Install Hardhat:
    - This command adds Hardhat as a development dependency in your project.
    ```shell
    npm install --save-dev hardhat@2.19.4
    
    ```

### Set Up the Hardhat Project

After installing, run `npx hardhat` in your project directory. You'll be presented with a few options. Select **"Create an empty hardhat.config.js"** if you want to start from scratch, or choose one of the sample projects to have some boilerplate code to start with.

![Hardhat Installation Success](/assets/img/guides/quickstart/hardhat/install-success.png)

### Configure Network Settings in hardhat.config.js

Open or create the `hardhat.config.js` file in your project's root directory. Add configurations for Rootstock Mainnet and Testnet. Here's an example:

```js
// Hardhat configuration
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

Once setup is complete, you can verify Hardhat is installed correctly by running `npx hardhat` again. This time, it should display a help message with available tasks, indicating that Hardhat is installed and ready to use.

