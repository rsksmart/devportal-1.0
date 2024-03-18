---
section_title: For Ethereum developers
menu_order: 300
menu_title: Port Ethereum dApps
layout: rsk
title: Port Ethereum dApps
tags: tutorial, rsk, ethereum dapps, ethereum, solidity
description: "How to port an Ethereum dApp to RSK, using Hardhat framework connected to RSK testnet"
render_features: "custom-terminals"
---

<style>
  img.port-eth-app-img{
    margin:0 auto;
    width: 80%;
  }
</style>

Smart contracts for RSK are written using Solidity, a programming language similar to JavaScript, and are fully compatible with Ethereum Smart Contracts. This means you can migrate your existing Ethereum Smart Contracts to RSK without modifying the smart contract code. To develop and test your smart contracts on RSK, you can use Hardhat, a development environment that facilitates building, testing, and deploying smart contracts. Hardhat is designed to offer a flexible and powerful framework with advanced features such as console.log debugging, customizable build pipelines, and native TypeScript support.

### Translations

#### Portuguese - Português

Este artigo está disponível em Português: [Migrando dApps do Ethereum para RSK](https://rsk.solange.dev/#/pt/port-ethereum-dapps/readme "Migrando dApps do Ethereum para RSK").

E também fizemos um [webinar](/webinars/202007-006/ "Migrando dApps do Ethereum para RSK")  sobre o assunto, veja o [vídeo](https://youtu.be/-7Oi9_BDr5k)

### Solidity

New to Solidity? You can learn more using the [Solidity docs](https://solidity.readthedocs.io/).

## Requirements

* Code editor
* Node.js and NPM (Node Package Manager)
* Hardhat development environment

### Code editor

You can edit Solidity using any text editor but it is a good idea to use more advanced tools, the following is a list of some of them:

- [Visual Studio Code - VS Code](https://code.visualstudio.com/)
- [Atom](https://atom.io/)
- [Sublime Text](https://www.sublimetext.com/)

### Node.js and NPM

Another dependency is NPM, which comes bundled with Node.js. If you need it, go to [Node.js](https://nodejs.org/en/) install.

Note that NPM is usually installed together with Node.js, so after installing Node.js, there's no need to install it separately.

If you want to have more than one version installed,
the most fuss-free way to install and manage multiple versions of `node` on your computer is via [nvm](https://github.com/nvm-sh/nvm).

### Hardhat Framework

Hardhat is an advanced development environment for Ethereum, designed to help developers manage and automate the task of compiling, deploying, and testing smart contracts. It supports connecting to local and remote networks, making it easy to work with networks like RSK. For more information visit Hardhat's extensive [documentation](https://hardhat.org/docs).

In this tutorial, we'll utilize Hardhat for compiling, testing, and deploying our smart contracts.

To install Hardhat on your local machine, enter the following command in the terminal:

```shell
npm install --save-dev hardhat
```

## Step 1 : Import Existing Code

First, you need to create a project.

### Initialize an Empty Hardhat Project

Create a new folder for your project and initialize it as a Hardhat project with the following commands:

```shell
mkdir rsk-hardhat-example
cd rsk-hardhat-example
npm init -y
npm install --save-dev hardhat
npx hardhat
```

When you run `npx hardhat`, select "Create a basic sample project" by following the prompts. This command sets up a Hardhat project with a sample contract, a test file, and a script for deploying the contract.

### Install Ethereum Wallet Provider

To connect to the RSK network, we'll use @nomiclabs/hardhat-ethers and ethers.js libraries, which allow us to interact with Ethereum networks.

```shell
npm install --save-dev @nomiclabs/hardhat-ethers ethers
```

### Copy Ethereum Contract Code

In this tutorial, we are going to use the token contract code from [Consensys/Token] (https://github.com/ConsenSys/Tokens) as the example.

In the `contracts` folder, create two files named `EIP20.sol` and `EIP20Interface.sol`.

#### EIP20Interface.sol

```
pragma solidity ^0.4.21;

contract EIP20Interface {
    /* This is a slight change to the ERC20 base standard.
    function totalSupply() constant returns (uint256 supply);
    is replaced with:
    uint256 public totalSupply;
    This automatically creates a getter function for the totalSupply.
    This is moved to the base contract since public getter functions are not
    currently recognised as an implementation of the matching abstract
    function by the compiler.
    */
    /// total amount of tokens
    uint256 public totalSupply;

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) public view returns (uint256 balance);

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) public returns (bool success);

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);

    /// @notice `msg.sender` approves `_spender` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of tokens to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint256 _value) public returns (bool success);

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) public view returns (uint256 remaining);

    // solhint-disable-next-line no-simple-event-func-name
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}
```

#### EIP20.sol

```
pragma solidity ^0.4.21;

import "./EIP20Interface.sol";

contract EIP20 is EIP20Interface {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show.
    string public symbol;                 //An identifier: eg SBX

    function EIP20(
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol
    ) public {
        balances[msg.sender] = _initialAmount;               // Give the creator all initial tokens
        totalSupply = _initialAmount;                        // Update total supply
        name = _tokenName;                                   // Set the name for display purposes
        decimals = _decimalUnits;                            // Amount of decimals for display purposes
        symbol = _tokenSymbol;                               // Set the symbol for display purposes
        emit Transfer(msg.sender, msg.sender, 0);
        emit Approval(msg.sender, msg.sender, 0);
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}
```

We also need to create a migration script in the migrations folder: 
`migrations/2_deploy_tokens.js`

```
const EIP20 = artifacts.require('./EIP20.sol');

module.exports = (deployer) => {
  deployer.deploy(EIP20, 10000, 'Simon Bucks', 1, 'SBX');
};
```

## Step 2 : Deploy Solidity Code as RSK Smart Contract

We are going to deploy the example smart contract on to the RSK Testnet.

### Testnet and Faucet

First, we need to obtain an account on RSK Testnet and get some tRBTC from the Testnet faucet.

**Create new Account with MetaMask**

1. Open MetaMask Chrome extension
1. In the network options, choose `custom RPC`
1. Enter RSK Testnet as the Network Name
1. Enter https://public-node.testnet.rsk.co as the RPC URL
1. Enter RBTC as SymbolPut and Save
1. Copy the account address

<img alt="Configure MetaMask for RSK Testnet" class="port-eth-app-img" src="/assets/img/tutorials/port-ethereum-dapps/metamask-testnet.png">

**Get tRBTC**

Visit the [faucet](https://faucet.rootstock.io/) to gain some tRBTC to use in the Testnet.

Enter the account address from MetaMask and wait for several seconds for MetaMask to refresh the new balance.

<img class="port-eth-app-img" src="/assets/img/tutorials/port-ethereum-dapps/testnet-faucet.png">

### Testnet Explorer

You will be able to check the Testnet's transactions and blocks in real time at 
[explorer.testnet.rsk.co](https://explorer.testnet.rsk.co/)

### Fetch the Current Gas Price of Testnet

First, obtain the current gas price from the RSK Testnet network by running the following command in your project's root directory:

```shell
curl https://public-node.testnet.rsk.co/ -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' > .gas-price-testnet.json
```

### Update Hardhat Configuration

Next, you'll adjust your Hardhat setup to dynamically use the fetched gas price for transactions and configure the connection to the RSK testnet. Here's how to do it:

1. Modify hardhat.config.js to include the RSK testnet configuration and to automatically use the fetched gas price:

```javascript
require("@nomiclabs/hardhat-ethers");
const fs = require('fs');

// Load the gas price from the previously saved file
const gasPriceTestnetRaw = fs.readFileSync(".gas-price-testnet.json").toString().trim();
const gasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result, 16);
if (typeof gasPriceTestnet !== 'number' || isNaN(gasPriceTestnet)) {
  throw new Error('Unable to retrieve network gas price from .gas-price-testnet.json');
}
console.log("Gas price Testnet: " + gasPriceTestnet);

module.exports = {
  solidity: "0.4.24",
  networks: {
    rskTestnet: {
      url: "https://public-node.testnet.rsk.co/",
      accounts: {mnemonic: 'your mnemonic here'}, // replace with your mnemonic
      gasPrice: Math.floor(gasPriceTestnet * 1.1), // Adjusts the gas price
      chainId: 31
    }
  },
};
```

Replace 'your mnemonic here' with your actual mnemonic to ensure proper authorization on the network.

### Compile and Deploy Contracts

With Hardhat, you can compile and deploy your smart contracts using simple commands.

#### Compile Contracts

To compile your smart contracts, run:

```shell
npx hardhat compile
```

This will process all contracts within your `contracts` directory.

#### Deploy Contracts

Make sure you have a deployment script ready in the `scripts` directory (e.g., `deploy.js`). Execute the script to deploy your contracts to the RSK Testnet by running:

```shell
npx hardhat run scripts/deploy.js --network rskTestnet
```

This utilizes the network configuration specified in `hardhat.config.js` to deploy your contracts to the RSK Testnet.

#### Interact with Your Contracts
Hardhat provides a console for interacting with deployed contracts and the blockchain. To open the Hardhat console connected to the RSK Testnet, use:

```shell
npx hardhat console --network rskTestnet
```
Inside the console, you can run scripts, interact with contracts, or query the blockchain directly.

## Step 3 : Execute the Smart Contract

After your contract has been successfully deployed, you can interact with it directly using Hardhat's console or scripting capabilities. Here's how to perform the specified operations:

**Check Account Balance**

First, enter the Hardhat console connected to your desired network:

```shell
npx hardhat console --network rskTestnet
```

Once inside the console, you can use the following commands to interact with your deployed EIP20 contract. Assume you've deployed your contract and know its address. You'd interact with it as follows (note that you need to replace `contractAddress` with your contract's actual deployed address):

```javascript
const contract = await ethers.getContractAt("EIP20", "contractAddress")
const balance = await contract.balanceOf("0x7073F4af7bcBDd63aCC8Cb1D62877d3c7a96Ef52")
console.log(balance.toString())
```

To convert the balance to a number for easier reading (assuming it's safe to do so without losing precision):

```javascript
console.log(balance.toNumber())
```

**Transfer Tokens Directly Between Two Accounts**

To transfer tokens, you would typically need to ensure the account performing the transfer has enough tokens and is properly authorized (e.g., it's the account that deployed the contract or has been given approval to transfer tokens). Here's how you can initiate a transfer:

```javascript
const tx = await contract.transfer("0x7073F4af7bcBDd63aCC8Cb1D62877d3c7a96Ef52", 1)
await tx.wait()
```

This sends 1 token from the signer's account (default account in Hardhat's ethers plugin) to the specified account. Ensure you're connected to the correct network and using the right account that owns the tokens.

**Check the Account Balance Again**

After the transfer, to check the balance of the account again:

```javascript
const newBalance = await contract.balanceOf("0x7073F4af7bcBDd63aCC8Cb1D62877d3c7a96Ef52")
console.log(newBalance.toNumber())
```

## Step 4 : Deploy to Mainnet

Deploying Smart Contracts to RSK Mainnet can follow the same steps as the Testnet.

#### Mainnet Node

The [public node](/rsk/public-nodes) of RSK Main Net is https://public-node.rsk.co

#### Gas Price on Mainnet

To ensure your transactions are processed, obtain the current gas price on the RSK Mainnet and save it locally:

```shell
curl https://public-node.rsk.co/ -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' > .gas-price-mainnet.json
```

#### Update Hardhat Configuration

In your Hardhat project, update the `hardhat.config.js` file to include the RSK Mainnet configuration. You'll need to adjust the script for fetching the mainnet gas price and include the mainnet configuration in the networks section. Here's how to do it:

1. Add a segment for fetching the Mainnet gas price similar to how you did for Testnet. Ensure you've installed necessary dependencies:

```javascript
const fs = require('fs');

const gasPriceMainnetRaw = fs.readFileSync(".gas-price-mainnet.json").toString().trim();
const gasPriceMainnet = parseInt(JSON.parse(gasPriceMainnetRaw).result, 16);
if (typeof gasPriceMainnet !== 'number' || isNaN(gasPriceMainnet)) {
  throw new Error('Unable to retrieve network gas price from .gas-price-mainnet.json');
}
console.log("Gas price Mainnet: " + gasPriceMainnet);
```

2. Add the RSK Mainnet configuration in the networks section of your `hardhat.config.js`:

```javascript
require("@nomiclabs/hardhat-ethers");
// ... other requires and configurations

module.exports = {
  solidity: "0.4.24", // Adjust based on your contract's requirements
  networks: {
    // ... other network configurations
    rskMainnet: {
      url: "https://public-node.rsk.co",
      accounts: {mnemonic: 'your mnemonic here'}, // replace with your mnemonic
      chainId: 30,
      gasPrice: Math.floor(gasPriceMainnet * 1.01), // Use the fetched gas price
    },
  },
};
```

Make sure to replace 'your mnemonic here' with the mnemonic phrase of the wallet you wish to use for deployment.

#### Mainnet Explorer

After deploying your contracts to the Mainnet, you can monitor transactions and block confirmations in real-time using the RSK Mainnet explorer at [explorer.rsk.co/](https://explorer.rsk.co/).

#### Acquiring RBTC for Deployment

To deploy contracts on the RSK Mainnet, you need [RBTC](/rsk/rbtc/) to pay for transaction fees:

- RBTC can be obtained by converting BTC to RBTC using the [Powpeg](/rsk/architecture/powpeg/) mechanism. Visit [RSK's Powpeg documentation](/rsk/architecture/powpeg/) for more information.
- Alternatively, you can purchase RBTC directly from supported exchanges. A list of exchanges offering RBTC is available at [RSK's official RBTC page](/rsk/rbtc/#exchanges)
