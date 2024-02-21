---
menu_order: 500
menu_title: Deploy Smart Contract
layout: rsk
title: 'Deploy Smart Contract'
description: 'Learn how to deploy your Rootstock smart contract on your local environment and the Rootstock network'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, rootstock, blockchain
render_features: 'collapsible'
---

In this section, we'll deploy your token contract to your local environment and also deploy and interact with the contract on the Rootstock network.

### Step 1: Configure Your Deployment File

To configure your deployment file:

1. Navigate to the `scripts` directory in the root directory of the quick start repo:
    ```shell
    cd scripts
    ```

2. In the scripts directory, open the `deploy.js` deployment file:

    - [`deploy.js` initial state](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/master/scripts/deploy.js)
    
    - To deploy your token, copy the deployment script below and paste it in your deployment file or see the [`deploy.js` file](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/feat/complete/scripts/deploy.js) on GitHub.
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

### Step 2: Run the Hardhat Network Locally

**Note: You need to have sufficient RBTC in your deploying account for gas fees.**

To run the Hardhat network locally:

[](#top "collapsible")
- Start the Hardhat network
   - Hardhat comes with a built-in Ethereum network for development. Run the following command in your project's root directory to start it.
      ```shell
      npx hardhat node
      ```
      This command will start a local blockchain network and display a list of available accounts and private keys:
      ![Rootstock Node Running](/assets/img/guides/quickstart/hardhat/run-node.png)
- Deploy your contract to the local network
   - Deploy your contract to the local Hardhat network using the command below in another terminal or command prompt:
      ```shell
      npx hardhat run --network hardhat scripts/deploy.js.
      ```
      This should give a result similar to the following:
      ![Deploy Successful](/assets/img/guides/quickstart/hardhat/deploy-success.png)
- Deploy to Rootstock Testnet and Mainnet
   - Use Hardhat's run command to deploy your contract, depending on the desired network. You can choose to deploy to either Rootstock's Testnet or Mainnet.
   - To deploy to the Rootstock Testnet, run:
      ```shell
      npx hardhat run --network rskTestnet scripts/deploy.js
      ```
   - To deploy to the Rootstock Mainnet, run:
      ```shell
      npx hardhat run --network rskMainnet scripts/deploy.js
      ```

### Step 3: Deploy Your Contract on Rootstock Network

Follow these steps to deploy your contract on Rootstock network:

#### Configure MetaMask

[](#top "collapsible")
1. Install Metamask
   - If you haven't already, install the MetaMask browser extension: https://metamask.io/
2. Open Metamask
   - Open MetaMask and set up a new connection for the Rootstock Testnet. You can do this by clicking on the network selection dropdown at the top and choosing **Custom RPC**.
3. Enter network details
   - Enter the following network details:
      - Network Name: RSK Testnet
      - New RPC URL: ‘https://public-node.testnet.rsk.co’
      - Chain ID: `31`
      - Currency Symbol (optional): `tRBTC`
4. Save configuration
   - Click **Save** to add the network.

#### Connect Remix to Rootstock Testnet

1. Open Remix IDE

   - Go to [Remix IDE](https://remix.ethereum.org/) in your browser.

2. Connect MetaMask to Remix:

   - In Remix, go to the **Deploy & run transactions** plugin.
   - In the **Environment** dropdown, select **Injected Web3**.
   - This will connect to MetaMask. Make sure MetaMask is on the RSK Testnet network that you configured earlier.

### Step 4: Interact with the Deployed Contract

To interact with your deployed contract on Rootstock network:

[](#top "collapsible")
- Load Your Deployed Contract
   - You can load your deployed contract in Remix by entering its address and the ABI.
   - The ABI can be found in your project's build artifacts, or you can compile the contract in Remix to generate it.
   - Paste the contract address and ABI in Remix's **Deployed Contracts** section.
- Test the Contract
   - Once the contract is loaded, you can interact with it through Remix.
   - Call its functions, send transactions, and observe the results.
   - Ensure you have enough testnet RBTC in your MetaMask wallet for transaction fees.
- Monitor Transactions
   - Use Remix and MetaMask to monitor transaction confirmations and results.
   - You can also use a [Rootstock Testnet explorer](https://explorer.testnet.rsk.co/) to view transaction details and contract interactions.

---
Next, we'll [integrate your smart contract with a front-end application](/guides/quickstart/hardhat/integrate-frontend/).
