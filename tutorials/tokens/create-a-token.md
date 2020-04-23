---
layout: rsk
title: Create your first token
tags: tutorial, rsk, token, openzeppelin, erc20, truffle 
description: "How to create a token with less than 10 lines of code, using Truffle and Open Zeppelin smart contracts at RSK testnet"
---

In this tutorial I will show you step-by-step how to create a token with less than 10 lines of code, using Truffle plus Open Zeppelin smart contracts, and deploy it to the RSK testnet.

# Overview

Here is a summary of the steps to be taken to build our front end:

1. Initialize a project using Truffle;
2. Install Open Zeppelin smart contracts at project;
3. Create a wallet mnemonic;
4. Configure Truffle to connect to RSK testnet;
5. Get some tR-BTC from a faucet;
6. Create smart contract of token;
7. Create deploy file at Truffle;
8. Deploy a smart contract on RSK Testnet using Truffle;
9. Interact with the smart contract at Truffle console.

# Requirements

* Node.js and NPM (Node Package Manager)
* Visual Studio Code (VSCode) or any other editor of your choice
* Truffle

## Node.js and NPM

Node.js and NPM are needed, though both are usually installed at once.

NB: To check if Node.js and NPM is already installed, input the following commands in the terminal:

```shell
node --version
npm --version
```

![node and npm version](/assets/img/tutorials/create-a-token/image-01.png)

Go to [Node.js](https://nodejs.org/en/) if you need to install it.

## Visual Studio Code (VSCode)

In this tutorial, we will use VSCode to create and deploy our project.
Feel free to use any other code editor of your choice.

To use VSCode [download it here](https://code.visualstudio.com/download).

Verify if your VS code installation was successful by typing the following command into the terminal:

```shell
code -v
```

![visual code version](/assets/img/tutorials/create-a-token/image-02.png)

## Truffle

Truffle is a popular development framework for smart contract developers with a mission to make your work a whole lot easier. 
Among its features, it has smart contract lifecycle management, scriptable deployment & migrations, automated contract testing and simple network management. 

It can make the RSK life easier too because we can configure a RSK network in Truffle.

To install Truffle, input the command below into the terminal and press `enter`, in the directory of your project:

```shell
npm install truffle -g
```

![truffle install](/assets/img/tutorials/create-a-token/image-03.png)

When the installation is finished, close the terminal,open it again and check the Truffle version:

```shell
truffle version
```

![truffle version](/assets/img/tutorials/create-a-token/image-04.png)

More info: 

[trufflesuite.com/truffle](https://www.trufflesuite.com/truffle)

# Verify that you can connect to RSK Testnet

Enter the following command into your terminal. If you are using a Windows OS, I suggest to use the Git Bash terminal.

```shell
curl https://public-node.testnet.rsk.co/1.3.0/ \
  -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

This is a very simple query that simply asks what the latest block number is.

You should receive a response similar to the following:

```json
{"jsonrpc":"2.0","id":1,"result":"0xc1266"}
```

If you have Windows OS and you do not have Git installed, download the installer for Windows from the [Git official site](https://git-scm.com/).

# Initialize a Truffle project

Create a new folder, in a folder named `token`.

Start an Truffle project in the token folder by typing the following commands below into the terminal:

```shell
mkdir token
cd token
truffle init
```

![truffle init](/assets/img/tutorials/create-a-token/image-05.png)

Open the folder in VSCode. 
Then you can see the file structure like this:

![truffle file structure](/assets/img/tutorials/create-a-token/image-06.png)

* `./contracts`: All our smart contracts will be stored in this folder.
* `./migrations`: Deployment scripts will be stored in this folder.
* `./test`: Test scripts will be stored in this folder.
* `./truffle-config.js`: This is Truffle’s configuration file. We’ll be able to configure networks, including RSK networks.

Note that the following files were also created:

* `Migrations.sol`: Keeps track of which migrations were done on the current network.
* `1_initial_migration.js`: Deployment for `Migrations.sol`.

## Initialize an npm project

Start an npm project in the token folder by typing the following commands below into the terminal:

```shell
npm init -y
```

![npm init](/assets/img/tutorials/create-a-token/image-07.png)

## Install Open Zeppelin

OpenZeppelin Contracts is a set of smart contract libraries for Ethereum. They work well with other compatible blockchains, including **RSK**. 
These libraries will install not only the main libraries of our token but also libraries for ownership, safe math, and many other utilities. 
It’s worth mentioning that these libraries have been both peer reviewed and audited to accomplish high standards of security so contracts that depend on them are less susceptible to hacking when used correctly.

In the terminal, inside the folder token, install OpenZeppelin libraries with this command:

```shell
npm install --E @openzeppelin/contracts@2.5.0
```

The option `--E` is to save dependencies with an exact version rather than using npm's default.

![openzeppelin install](/assets/img/tutorials/create-a-token/image-08.png)

More info: 

[openzeppelin.com/contracts](https://openzeppelin.com/contracts/)

## Install HD wallet provider

To connect to the RSK network, we are going to use a provider that allows us to connect to any network unlocking an account locally. 
We are going to use `@truffle/hdwallet-provider`. 
It can be used to sign transactions for addresses derived from a 12 or 24 word mnemonic.

> You need to have installed Node >= 7.6.

In the terminal, inside the folder token, install it with this command:

```shell
npm install --E @truffle/hdwallet-provider@1.0.34
```

![hd wallet provider install](/assets/img/tutorials/create-a-token/image-09.png)

This is a large package with many utilities. After a while you will see the message of successful installation.

![hd wallet provider successful installation](/assets/img/tutorials/create-a-token/image-10.png)

## Check package.json

`package.json` is a file created by npm with some configurations, including the packages which we installed before using the command `npm init -y`.

After the installation, I will open the project folder named `Token` in VSCode and verify the `package.json` file. Let's take a look at the dependencies in the file:

![package.json](/assets/img/tutorials/create-a-token/image-11.png)

# Create a mnemonic

Let's create a mnemonic to generate addresses with it.

We are going to use this web app: 

[iancoleman.io/bip39](https://iancoleman.io/bip39/)

> It is not recommended to be used for any 'real' wallet because it's not a secure way to generate a private key, however we will use this here for learning purposes, and since we're using the Testnet anyway.

In the `Generate a random mnemonic` field, select 12 words and click on the `generate` button.

![Generate a random mnemonic](/assets/img/tutorials/create-a-token/image-12.png)

The result appears in the `BIP39 Mnemonic` field. They should be 12 random words like the words in the image:

![BIP39 Mnemonic](/assets/img/tutorials/create-a-token/image-13.png)

My mnemonic is: 

```
access card stove drama pizza elite argue tuition plate kiwi junior sponsor
```

I will copy these 12 words to use it later.

## File .secret

In the terminal terminal, inside the folder token, create a file named `.secret`.

Paste your mnemonic in this file and save it.

![dot secret](/assets/img/tutorials/create-a-token/image-14.png)

# Configure Truffle to connect to RSK testnet

Open `truffle-config.js` file in your Truffle project and overwrite it with the following code:

```javascript
const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://public-node.testnet.rsk.co/1.3.0/'),
      network_id: 31,
      gasPrice: 0x387EE40,
      networkCheckTimeout: 1000000000
    }
  },  
  compilers: {
    solc: {
      version: "0.5.2",
    }
  }
}
```

# Truffle Console connect to RSK local network

Truffle has your own console to run commands.

## Verify the connection

Let’s open a Truffle console to check our connection.

At terminal, inside the folder token, run this command:

```shell
truffle console --network testnet
```

And you go to a new console:

![truffle console](/assets/img/tutorials/create-a-token/image-15.png)

What we are doing here is telling truffle to connect to an RSK public testnet node, and giving it control over your recently created account.

## To get our address

Let’s type this in truffle console to know what address was unlocked with our mnemonic:

```javascript
var account = Object.keys(web3.currentProvider.wallets)[0]

account
```

The result is your account address. 

In my example, it is `0x9682725a85f85f097ab368555a286618dc982c99`. Copy this.

![account address](/assets/img/tutorials/create-a-token/image-16.png)

## Check balance

Now, let’s check our balance in the console. Run this command in our truffle console:

```javascript
web3.eth.getBalance(account, (err, res) => console.log(res))
```

The balance is 0 and we need tR-BTC. Let's get it in the next step.

# TestNet Faucet

You can get some tR-BTC from 

[faucet.testnet.rsk.co](https://faucet.testnet.rsk.co/)

![faucet.testnet.rsk.co](/assets/img/tutorials/create-a-token/image-17.png)

Enter your wallet address that you copied in the last step, and complete the CAPTCHA.

![Wait a few seconds](/assets/img/tutorials/create-a-token/image-18.png)

Wait a few seconds...

![Received some R-BTCs](/assets/img/tutorials/create-a-token/image-19.png)

You can see the transaction hash:

[0x16bedc1339a8fe59e270b0c6d5175851010bb93d0cf6c4974f1705b9ead7ee6e](https://explorer.testnet.rsk.co/tx/0x16bedc1339a8fe59e270b0c6d5175851010bb93d0cf6c4974f1705b9ead7ee6e)

Now I have 0.05 tR-BTC!

## Check balance (again)

Now, let’s check our balance in the console. Run this command in our truffle console:

```javascript
web3.eth.getBalance(account, (err, res) => console.log(res))
```

![getBalance](/assets/img/tutorials/create-a-token/image-20.png)

# Create the smart contract

In the `contracts` folder, create a new file named `Token.sol`.

![create Token.sol](/assets/img/tutorials/create-a-token/image-21.png)

# Token.sol with only 7 lines!

This smart contract is a mintable ERC20 token.

Copy and paste the following code.

```javascript
pragma solidity 0.5.2;
import '@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol';
contract Token is ERC20Mintable {
       string public name = "My RSK token";
       string public symbol = "MRT";
       uint8 public decimals = 2;
}
```

Let's review the above code.

To create our ERC20 Token, we will import `ERC20Mintable` from Open Zeppelin. 
This library itself imports several other libraries such as `SafeMath.sol`, the standards for this kind of token, and the capability to mint tokens.

Inside the token, we define some basic information about the token: `name`, `symbol`, and number of `decimals` for the precision.

To inherit the library's attributes and functions, we simply define our contract as a `ERC20Mintable` using the `is` keyword in this way.

![Token.sol](/assets/img/tutorials/create-a-token/image-22.png)

# Compile a smart contract

In the truffle console, run this command:

```
compile
```

![truffle compile](/assets/img/tutorials/create-a-token/image-23.png)

# Deploy a smart contract

First of all, we need to create a a new migrations file where truffle will find it, containing instructions to deploy the smart contract.

## Create file 2_deploy_contracts.js

The migrations  folder has JavaScript files that help you deploy contracts to the network. 
These files are responsible for staging your deployment tasks, and they're written under the assumption that your deployment needs will change over time. 
A history of previously run migrations is recorded on-chain through a special Migrations contract, detailed below. (source: [truffle: running-migrations](https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations))

In the migrations folder, create the file `2_deploy_contracts.js`

![create 2_deploy_contracts.js](/assets/img/tutorials/create-a-token/image-24.png)

Copy and paste this code.

```javascript
var Token = artifacts.require("Token");

module.exports = function(deployer) {
  deployer.deploy(Token);
};
```

![2_deploy_contracts.js](/assets/img/tutorials/create-a-token/image-25.png)

## Migrate

In the truffle console, run this command:

```
migrate
```

Wait a few minutes while the transactions for the smart contract deployments are sent to the blockchain…

The migrate command will compile the smart contract again if necessary.

![truffle migrate](/assets/img/tutorials/create-a-token/image-26.png)

First, it deploys the smart contract `Migrations.sol`, file generated by Truffle:

![deploy Migrations.sol](/assets/img/tutorials/create-a-token/image-27.png)

This is the transaction:

[0xd29d03fc2b904545005ab6ed205f970575aef184ebecf14c9f0f6b6f45ec1bb3](https://explorer.testnet.rsk.co/tx/0xd29d03fc2b904545005ab6ed205f970575aef184ebecf14c9f0f6b6f45ec1bb3)

And then it deploys our smart contract `Token.sol`:

![deploy Token.sol](/assets/img/tutorials/create-a-token/image-28.png)

This is the transaction:

[0xbfff7cf431bb4af9e1b059dbd6eea935d7d20e52a770c467f38b97b479ba414a](https://explorer.testnet.rsk.co/tx/0xbfff7cf431bb4af9e1b059dbd6eea935d7d20e52a770c467f38b97b479ba414a)

Congratulations!

`My RSK Token` is now published on the RSK Testnet.

Save the contract address of token, it will be used later: 

![token address](/assets/img/tutorials/create-a-token/image-29.png)

```javascript
tokenAddress = "0x095156af46597754926874dA15DB40e10113fb4d" 
```

# Interact with the smart contract 

First of all, let us interact with our token using the truffle console.

## Get your accounts

In the truffle console

```javascript
const accounts = await web3.eth.getAccounts()
```

To check it:

```javascript
accounts[0]
accounts[1]
```

![accounts](/assets/img/tutorials/create-a-token/image-30.png)

## Connect with your token

```javascript
const token = await Token.deployed()
```

![token instance](/assets/img/tutorials/create-a-token/image-31.png)

Check if our instance is OK.

Put the instance’s name:  `token`, hit ., then hit TAB twice to trigger autocomplete. 
This will display the published address, transaction hash of deploy, among other things, including all methods available.

```javascript
token. [TAB] [TAB]
```

![token tab tab](/assets/img/tutorials/create-a-token/image-32.png)

## Check the total supply

Call the function totalSupply to check if we have tokens already minted:

```javascript
token.totalSupply((err, res) => console.log(res))
```

![totalSupply 0](/assets/img/tutorials/create-a-token/image-33.png)

The returned value is 0, which is expected, since we did not perform any initial mint when we deployed the token.

## Check the token balance

Call the function balanceOf to check the balance of the account 1:

```javascript
token.balanceOf(accounts[1], (err, res) => console.log(res))
```

![balanceOf 0](/assets/img/tutorials/create-a-token/image-34.png)

The returned value is also 0, which is expected, since we did not make any initial mint when we deployed the token, and by definition no accounts can have any tokens yet.

## Mint tokens

Run this command:

```javascript
token.mint(accounts[0], 10000)
```

It sent a transaction to mint 100 tokens for account 0. 

It is possible to verify the transaction at explorer:

[0xb1ff5196d916943e38df6d089cedcb8aee8306e88150a4ad061067fd5370fb5c](https://explorer.testnet.rsk.co/tx/0xb1ff5196d916943e38df6d089cedcb8aee8306e88150a4ad061067fd5370fb5c)

You can mint for other accounts, per example, account 1:

```javascript
token.mint(accounts[1], 10000)
```

For each account, the result will be the following:

![token.mint account](/assets/img/tutorials/create-a-token/image-35.png)

I can also mint to a specific address, `0xa52515946DAABe072f446Cc014a4eaA93fb9Fd79`:

```javascript
token.mint("0xa52515946DAABe072f446Cc014a4eaA93fb9Fd79", 10000)
```

![token.mint address](/assets/img/tutorials/create-a-token/image-36.png)

The transaction:

[0x9da701cb2daf548cda8c7a99c243ccce63d05fedee4088708a8bf68ba6bb0bb7](https://explorer.testnet.rsk.co/tx/0x9da701cb2daf548cda8c7a99c243ccce63d05fedee4088708a8bf68ba6bb0bb7)

## Check the token balance (again)

Check the balance of account 1 again:

```javascript
token.balanceOf(accounts[1], (err, res) => console.log(res))
```

![balanceOf account 100](/assets/img/tutorials/create-a-token/image-37.png)

The returned value is 10000, which is 100 with 2 decimal places of precision. This is exactly what we expected, as we issued 100 tokens

Also you can get the balance of a specific address, for example,  `0xa52515946DAABe072f446Cc014a4eaA93fb9Fd79`:

```javascript
token.balanceOf("0xa52515946DAABe072f446Cc014a4eaA93fb9Fd79", (err, res) => console.log(res))
```

![balanceOf address 100](/assets/img/tutorials/create-a-token/image-38.png)

## Check the total supply (again)

Check the total supply again:

```javascript
token.totalSupply((err, res) => console.log(res))
```

![totalSupply 300](/assets/img/tutorials/create-a-token/image-39.png)

The returned value is 30000, which is 300 with 2 decimal places of precision. 
After minting 100 tokens for 3 accounts, this is perfect!

## Transfer tokens

I would like to transfer 50 tokens from account 0 to account 3

```javascript
token.transfer(accounts[3], 5000, {from: accounts[0]})
```

![token.transfer](/assets/img/tutorials/create-a-token/image-40.png)

Account 3 did not have any tokens before the transfer, and now it should have 50. Let’s check the balance of account 3:

```javascript
token.balanceOf(accounts[3], (err, res) => console.log(res))
```

![balanceOf account 3](/assets/img/tutorials/create-a-token/image-41.png)

Great! The balance of account 3 is correct.

# Final considerations

Did you think that it would be so easy to use the Truffle framework connected to the RSK network, and that it would be possible to create a token with less than 10 lines of code?

I showed you how to connect Truffle to the RSK network and deploy your own token with only 7 lines of code! 
Also I hope that you saw how simple it is to use the Open Zeppelin libraries, and that they work on the RSK network.

Our goal is to join forces and give options to people who believe in smart contracts based on Ethereum, and also believe in the power of Bitcoin, through RSK.

I hope this tutorial has been helpful and I’d appreciate your feedback. 
Share it if you like it :)
