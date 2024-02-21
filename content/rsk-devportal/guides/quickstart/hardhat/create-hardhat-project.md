---
menu_order: 100
menu_title: Create Hardhat Project
layout: rsk
title: 'Create Hardhat Project'
description: 'Learn how to set up your environment for development using Hardhat'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, rootstock, blockchain
render_features: 'collapsible'
---


### Clone the Project Repository

- To get started, clone the [rootstock-quick-start-guide](https://github.com/rsksmart/rootstock-quick-start-guide.git) repository:
    ```shell
    git clone https://github.com/rsksmart/rootstock-quick-start-guide.git
    ```

### Install Dependencies

[](#top "collapsible")
- Initialize a Node.js project
    - This command creates a `package.json` file with default values:
      ```shell
      npm init -y
      ```
- Install Hardhat
    - This command adds Hardhat as a development dependency in your project:
      ```shell
      npm install --save-dev hardhat@2.19.4
      ```

### Create Hardhat Project

In this section, we will verify the installation of hardhat in your project and configure network settings in the `hardhat.config.js` file.

[](#top "collapsible")
- Set Up the Hardhat Project
  - The quickstart repository comes with Hardhat pre-installed. To check if Hardhat is installed, execute `npx hardhat` in the `rootstock-quick-start-guide` directory.
  - `npx hardhat` not only verifies installation but also allows you to initiate a new Hardhat project if it doesn't exist. For a new project, you'll be prompted to choose from several options. To create a blank project, select **Create an empty hardhat.config.js**, or pick one of the other options to begin with a pre-set template.
    ![Hardhat Installation Success](/assets/img/guides/quickstart/hardhat/install-success.png)
- Configure Network Settings in hardhat.config.js
  - [`hardhat.config.js` initial state](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/master/hardhat.config.js)
  - To configure `rskMainnet` and `rskTestnet` nework settings, open the `hardhat.config.js` file in your project's root directory. Copy and paste the code snipet below in the file or see the code in the [`hardhat.config.js` file](https://github.com/rsksmart/rootstock-quick-start-guide/blob/feat/complete/hardhat.config.js) in the `feat/complete` branch on GitHub:
      > **Note that the `rskMainnet` and `rskTestnet` private keys have been configured in the `feat/complete` branch on GitHub, we'll get to that soon in this guide.**
      ```js
      // Hardhat configuration
      module.exports = {
        solidity: "0.8.20",
        networks: {
          rskMainnet: {
            url: "https://public-node.rsk.co",
            chainId: 30,
            gasPrice: 60000000,
            // TODO: configure rskMainnet private key
          },
          rskTestnet: {
            url: "https://public-node.testnet.rsk.co",
            chainId: 31,
            gasPrice: 60000000,
            // TODO: configure rskTestnet private key
          }
        }
      };
      ```
  - Once setup is complete, you can verify Hardhat is installed correctly by running `npx hardhat` again. It should display a help message with available tasks, indicating that Hardhat is installed and ready to use.

---
Next, we'll [Configure Hardhat for Rootstock](/guides/quickstart/hardhat/configure-hardhat/) where you'll set up your `rskMainnet` and `rskTestnet` private keys.

