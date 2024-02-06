---
menu_order: 400
menu_title: Deploy Smart Contract
layout: rsk
title: 'Deploy Smart Contract'
description: ''
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, blockchain
---

### Create the Scripts Directory

If your project doesn't have a script directory yet, create one. Run mkdir scripts in the terminal or command prompt in your project's root directory. This is where you will store all your script files.

```shell
mkdir scripts
```

### Create a New Deploy File

Create a new deployment script in the scripts directory, e.g., **deploy.js**.
Write the script to deploy your token:

```js
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const MyToken = await ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(1000);

  console.log("Token address:", myToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Running the Hardhat Network Locally

#### Start the Hardhat Network

Hardhat comes with a built-in Ethereum network for development. Run the following command in your project's root directory to start it.

```shell
npx hardhat node
```

This command will start a local blockchain network and display a list of available accounts and private keys:

![Rootstock Node Running](/assets/img/guides/quickstart/hardhat/run-node.png)

#### Deploying the Contract to the Local Network
Deploy your contract to the local Hardhat network using the command below in another terminal or command prompt:

```shell
npx hardhat run --network hardhat scripts/deploy.js.
```

#### This should give a result similar to the following:

![Deploy Successful](/assets/img/guides/quickstart/hardhat/deploy-success.png)

#### Deploy to Rootstock Testnet and Mainnet

Use Hardhat's run command to deploy your contract, depending on the desired network. You can choose to deploy to either Rootstock's Testnet or Mainnet.
To deploy to the Rootstock Testnet, use:

```shell
npx hardhat run --network rskTestnet scripts/deploy.js
```

To deploy to the Rootstock Mainnet, use:

```shell
npx hardhat run --network rskMainnet scripts/deploy.js
```

**Note:_ Remember to have sufficient RBTC in your deploying account for gas fees._**

### Setting Up MetaMask for Rootstock Testnet

#### Configure MetaMask

1. If you haven't already, install the MetaMask browser extension. https://metamask.io/

2. Open MetaMask and set up a new connection for the Rootstock Testnet. You can do this by clicking on the network selection dropdown at the top and choosing "Custom RPC."

3. Enter the following details:

    - Network Name: Rootstock Testnet

    - New RPC URL: ‘https://public-node.testnet.rsk.co’

    - Chain ID: ‘31’

    - Currency Symbol (optional): ‘tRBTC’

4. Click "Save" to add the network
