---
layout: rsk
title: Using Truffle box rsk-token-box
tags: tutorial, rsk, truffle, truffle-box 
description: "How to use the rsk-token-box, a box to create your own ERC20 token using Open Zeppelin smart contracts library in Truffle framework, connected to an RSK network."
render_features: "custom-terminals"
---

Token contracts are most frequently used to exchange or store value.
In this tutorial, I will show you step-by-step how to use the Truffle box [rsk-token-box](https://github.com/rsksmart/rsk-token-box), 
which comes with everything you need to create an ERC20 standard token on RSK networks. 
It includes network configurations for Mainnet, Testnet and a mintable ERC20 token.

Check out [RSK Blockchain](/rsk/) to learn more.

# Overview

Here is a summary of the steps we will take in this tutorial:

1. [Setup prerequisites](#setup-prerequisites);
2. [Install RSK Truffle Token Box](#install-rsk-truffle-token-box);
3. [Understand the smart contract](#tokensol)
4. [Learn how to use the Truffle development console](#truffle-development-console);
5. [Compile token.sol](#compile-a-smart-contract);
6. [Deploy the smart contract](#deploy-a-smart-contract);
7. [Run tests](#test-a-smart-contract);
8. [Interact with a smart contract in development console](#interact-with-the-token-in-development-console);
9. [Learn how to use the RSK networks](#using-rsk-networks);
10. [Work on RSK testnet](#rsk-testnet);
11. [Connect to an RSK network](#connect-to-an-rsk-network);
12. [Test the connection to RSK network](#test-the-connection-to-rsk-network);
13. [Deploy a smart contract on RSK network using Truffle](#deploy-the-smart-contract-on-rsk-network);
14. [Interact with the token on RSK network](#interact-with-the-token-on-rsk-network);
15. [Using the token in a web wallet](#using-the-token-in-a-web-wallet);

If you were redirected from the [Truffle-rsk-token-box](https://github.com/rsksmart/rsk-token-box) page 
and successfully executed all the instructions, you can go ahead and interact with the published smart contract:

- [In the Truffle development console](#interact-with-the-token-in-development-console)
- [On RSK network](#interact-with-the-token-on-rsk-network)
- [Using the token in a web wallet](#using-the-token-in-a-web-wallet)

On the other hand, if you would like to review the steps with more explanatory details and images, you would find this tutorial helpful.

# Setup prerequisites

There are a few technical requirements before we start. 
To use `Truffle boxes`, you need to have installed in your computer:

- Git
- a POSIX compliant shell
- cURL
- Node.js and NPM
- a code editor
- Truffle framework

If you don't have any of them installed, go to the tutorial
[Truffle boxes prerequisites](/tutorials/truffle-boxes/truffle-boxes-prerequisites/) which have all the instructions to setup these requirements.

# Install RSK Truffle Token Box

The truffle unbox command sets up a project based on a known template. 
In this tutorial, we will be using the “RSK token box” Truffle box, 
which comes with everything you need to create an ERC20 token on RSK networks. 

## Create a new folder 
For example, create the folder `rsk-token`.
Navigate to the folder in the terminal.

```shell
mkdir rsk-token
cd rsk-token
```

```windows-command-prompt
C:\>cd C:\RSK

C:\RSK>mkdir rsk-token

C:\RSK>cd rsk-token

C:\RSK\rsk-token>
```

## Run the unbox command

The truffle unbox command will install all necessary dependencies in the project.

```shell
truffle unbox rsksmart/rsk-token-box
```

This is the result using Windows OS:

![truffle unbox](/assets/img/tutorials/rsk-token-box/image-01.png)

```windows-command-prompt
```

# Token.sol

Take a look at the smart contract `Token.sol`. You can check it out in folder `contracts`.

```javascript
pragma solidity 0.5.2;
import '@openzeppelin/contracts/token/ERC20/ERC20Mintable.sol';
contract Token is ERC20Mintable{
       string public name = "My RSK token";
       string public symbol = "MRT";
       uint8 public decimals = 2;
}
```

> Token.sol has only 7 code lines!

![Token.sol](/assets/img/tutorials/rsk-token-box/image-02.png)

This smart contract is a mintable [ERC20](https://eips.ethereum.org/EIPS/eip-20) token. This means that, in addition to the standard ERC20 specification, it has a function for issuing new tokens.

To create our ERC20 Token, we will import `ERC20Mintable` from Open Zeppelin. 
This library itself imports several other libraries such as `SafeMath.sol`, the standards for this kind of token, and the capability to mint tokens.

Inside the token, we define some basic information about the token: `name`, `symbol`, and number of `decimals` for the precision.

To inherit the library's attributes and functions, we simply define our contract as a `ERC20Mintable` using the `is` keyword in this way.

# Truffle development console

Truffle has an interactive console that also spawns a development blockchain. 
This is very useful for compiling, deploying and testing locally.

Run the development console by typing the following command below into the terminal:

```shell
truffle develop
```

This command is successful if you see a list of 10 accounts, a mnemonic and the command prompt is now `truffle(develop)>`

```windows-command-prompt
C:\RSK\rsk-token>truffle develop
Truffle Develop started at http://127.0.0.1:8545/

Accounts:
(0) 0x1056f747cf4bc7710e178b2aeed4eb8c8506c728
(1) 0x45a71c00382c2898b5d6fae69a6f7bfe6edab80c
(2) 0x1596384706dc9ac4cca7f50279a4abe591d6c3fe
(3) 0x9576d0a496b645baa64f22aceb2328e7468d4113
(4) 0xd431572eef7d77584d944c1809398a155e89f830
(5) 0x92c111839718fe0800fadccc67068b40b8524a0f
(6) 0x6da22b5a027146619bfe6704957f7f36ff029c48
(7) 0x2c3a82d8c3993f8c80dcaf91025437bd057df867
(8) 0xc43ae7a44f7deb759177b7093f06512a0a9ff5d7
(9) 0xe61bf00cd7dce248449cfe58f23a4ef7d542bc0b

Private Keys:
(0) f32f32839fe27ad906b63eafb326f26fed95c231e3c5e33c7cdd08f62db63167
(1) ebef990088f27f6ef13b5e52a77d5dcc5a76862a701908c586d01b6fe93562b3
(2) 598ccae5e4436fedeb0e798c0d254789c55a63401ebfc3ae8ddde29634ddfcde
(3) 09934b80f391e0024b8cb00cd73790fdf64c4d0509e144766414fee317cd3f4e
(4) ac745b84b6574b5738d364b43e0d471c9d5107504acc709c90f6f091b78c751b
(5) 449654cde095f2349113ef12a93e139b4302bc95adb3619d08adf53dde9b8847
(6) c217f12a89c352fc70b5f1bd5742314b4fb1bb1e35cb779fdb3c2390106355db
(7) 1d4c74dfa4e99e161130c18cc63938bb120a128cefbf1b9188efc678bf5722cb
(8) 0f44e0becf2e090db498a1b747d2a758fcc81fb0241f350d61117a9c6b1fa82e
(9) 85218c5eec657470dafeb09e6f7101f91d21bfe822fbeeecfc9275f798662a63

Mnemonic: virtual valve razor retreat either turn possible student grief engage attract fiber

⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
Ensure you do not use it on production blockchains, or else you risk losing funds.

truffle(develop)>  
```

You are now in the truffle develop console with seeded accounts and their associated private keys listed.

> Inside the development console we don't preface commands with `truffle`.

# Compile a smart contract

In the Truffle console, run this command:

```javascript
compile
```

```windows-command-prompt
truffle(develop)> compile
```

![truffle compile](/assets/img/tutorials/rsk-token-box/image-03.png)

# Deploy a smart contract

To deploy a smart contract using Truffle, we need a new migrations file where Truffle will find it. 
This file contains instructions to deploy the smart contract. 

The `migrations` folder has JavaScript files that help you deploy contracts to the network. 
These files are responsible for staging your deployment tasks, and they're written under the assumption that your deployment needs will change over time. 
A history of previously run migrations is recorded on-chain through a special Migrations contract. 
(source: [truffle: running-migrations](https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations))

Take a look in the file `2_deploy_contracts.js` located in the migrations folder. 

## Migrate

In the Truffle console, run this command:

```javascript
migrate
```

```windows-command-prompt
truffle(develop)> migrate
```

And the `migrate output` should be similar to:

![truffle migrate](/assets/img/tutorials/rsk-token-box/image-04.png)

# Test a smart contract

Truffle has an automated testing framework to facilitate the testing of contracts.
All test files should be located in the `test` directory.
To learn more, go to the Truffle documentation, in the section [testing your contracts](https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts).

Our box also comes with the file `TestToken.js` for testing the smart contract. 
You can check it out in the `test` folder.

```javascript
test
```

![test](/assets/img/tutorials/rsk-token-box/image-05.png)

Note the command varies slightly if you're in or outside of the development console.

```javascript
// inside the development console.
test

// outside the development console.
truffle test
```

# Interact with the token in development console

> Make sure you deploy the smart contract before executing this part.

The next commands will run inside the development console.

```shell
truffle develop
```

## Get your accounts 

Get your accounts in Truffle console.

In the Truffle console, enter:

```javascript
const accounts = await web3.eth.getAccounts()
```

Don’t worry about the `undefined` return, it is ok. See the addresses after it by entering the command below:

```javascript
accounts
```

And to view each account:

```javascript
accounts[0]
accounts[1]
```

Take a look in the results:

![accounts](/assets/img/tutorials/rsk-token-box/image-06.png)


## Connect with our published contract

First of all, connect with your token:

```javascript
const token = await Token.deployed()
```

Now `token` variable contains an instance of the previously deployed contract.

```windows-command-prompt
truffle(develop)> const token = await Token.deployed()
undefined
truffle(develop)>  
```

Don't worry about the `undefined` return, it is ok. 

## Confirm if our instance is OK.

Enter the instance's name:  `token`, then `.`, without space hit the TAB button twice to trigger auto-complete as seen below. 
This will display the published address of the smart contract, and the transaction hash for its deployment, among other things, including all public variables and methods available.

```javascript
token. [TAB] [TAB]
```

![token tab tab](/assets/img/tutorials/rsk-token-box/image-07.png)

## About Token.json

To interact with a published smart contract, you need to have 2 informations:
1. ABI - Application Binary Interface
2. Contract address

The published contract information is stored by default in the `build\contracts` folder. 
You will find a JSON file with the same name of our smart contract.

The section `networks` contains the networks in which the smart contract was published, including its address and hash of the transaction.

![json networks](/assets/img/tutorials/rsk-token-box/image-08.png)

The ABI is also saved in this json file.

![json abi](/assets/img/tutorials/rsk-token-box/image-09.png)


## Check the total supply

To check if we have tokens already minted, call the `totalSupply` function:

```javascript
(await token.totalSupply()).toString()
```

The returned value is 0, which is expected, since we did not perform any initial mint when we deployed the token.

## Check the token balance

To check the balance of an account, call the `balanceOf` function. For example, to check the balance of account 0:

```javascript
(await token.balanceOf(accounts[0])).toString()
```

Take a look in the results of total supply and balanceOf:

![total supply and balanceOf 0](/assets/img/tutorials/rsk-token-box/image-10.png)

The returned value is also 0, which is expected, since we did not make any initial mint when we deployed the token, and by definition no accounts can have any tokens yet.

## Mint tokens

Run this command:

```javascript
token.mint(accounts[0], 10000)
```

This command sent a transaction to mint 100 tokens for account 0. 

![token.mint account 0](/assets/img/tutorials/rsk-token-box/image-11.png)

You can also mint to a specific address, `0xa52515946DAABe072f446Cc014a4eaA93fb9Fd79`:

```javascript
token.mint("0xa52515946DAABe072f446Cc014a4eaA93fb9Fd79", 10000)
```

![token.mint address](/assets/img/tutorials/rsk-token-box/image-12.png)

## Reconfirm the token balance

Check the balance of account 0 again:

```javascript
(await token.balanceOf(accounts[0])).toString()
```

The returned value is 10000, which is 100 with 2 decimal places of precision. This is exactly what we expected, as we issued 100 tokens

Also, you can get the balance of a specific address, for example, `0xa52515946DAABe072f446Cc014a4eaA93fb9Fd79`:

```javascript
(await token.balanceOf("0xa52515946DAABe072f446Cc014a4eaA93fb9Fd79")).toString()
```

Take a look in the results:

![balanceOf account 0 and address with 10000](/assets/img/tutorials/rsk-token-box/image-13.png)

## Check the total supply (again)

Check the total supply again:

```javascript
(await token.totalSupply()).toString()
```

![totalSupply 20000](/assets/img/tutorials/rsk-token-box/image-14.png)

The returned value is 20000, which is 200 with 2 decimal places of precision. 
After minting 100 tokens for 2 accounts, this is perfect!

## Transfer tokens

To transfer 40 tokens from account 0 to account 2. 
This can be done by calling the `transfer` function.

```javascript
token.transfer(accounts[2], 4000, {from: accounts[0]})
```

![token.transfer](/assets/img/tutorials/rsk-token-box/image-15.png)

Account 2 had no tokens before the transfer, and now it should have 40. Account 1 must have 60 tokens. Also the total supply will be the same.

Let’s check the balance of each account and the total supply:

```javascript
(await token.balanceOf(accounts[2])).toString()
(await token.balanceOf(accounts[0])).toString()
(await token.totalSupply()).toString()
```

Take a look in the results:

![balances after transfer](/assets/img/tutorials/rsk-token-box/image-16.png)

Great! The balances of both accounts and the total supply are correct.

### Exit Truffle console

In the Truffle console, enter this command to exit the terminal:

```shell
.exit
```

```windows-command-prompt
truffle(develop)> .exit

C:\RSK\rsk-token>
```

# Using RSK networks

Truffle makes developing on RSK easier because we can configure custom networks for RSK. 
This Truffle box is already configured to connect to three RSK networks:

1. regtest (local node)
2. testnet
3. mainnet

These networks are already configured in the `truffle-config.js` file.

Testnet will be used in this tutorial. For other networks:

**RSK regtest (Local node)**

To use the Truffle box connected to a local node, go to the tutorial [how to use Truffle connected to a local node](/tutorials/ethereum-devs/truffle-regtest/)

**RSK mainnet**

Follow the same instructions, just replacing `testnet` to `mainnet`. Some differences will be explained too.

# RSK testnet

We need to do some tasks:

- Setup an account
- Update .secret
- Get tR-BTC
- Setup RSK network gas price
- Connect to an RSK network
- Deploy in the network of your choose

## Create a wallet

The easy way to setup an account is using a web3 wallet injected in the browser.
Some options are:
- [Metamask](https://metamask.io/)
- [Nifty](https://www.poa.network/for-users/nifty-wallet)

Select the RSK Network in the web wallet.
- Nifty: select in the dropdown list
- Metamask: go to [RSK Testnet](/wallet/use/metamask/) to configure it in `Custom RPC`

![wallets](/assets/img/tutorials/rsk-token-box/image-17.png)

You can learn more about [account based RSK addresses](/rsk/architecture/account-based/ "Account based RSK addresses - RSK Developers Portal").

Take a look `truffle-config.js` file to realize that we are using `HDWalletProvider` with RSK Networks derivations path:
- RSK Testnet dpath: `m/44’/37310’/0’/0`
- RSK Mainnet dpath: `m/44’/137’/0’/0`

For more information check [RSKIP57](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP57.md).

## Update .secret file

After create your wallet, update your mnemonic in the file `.secret`, located in the folder project, and save it.

Paste the wallet mnemonic in the file `.secret`, located in the folder project, and save it.

![update mnemonic](/assets/img/tutorials/rsk-token-box/image-18.png)

## Get R-BTC

The Smart Bitcoin (R-BTC) is used to pay for the execution of transactions in RSK.

**Mainnet**

For the RSK Mainnet, get R-BTC from [an exchange](https://www.rsk.co/#exchanges-rsk).

**Testnet**

For the RSK Testnet, get tR-BTC from [our faucet](https://faucet.testnet.rsk.co/).

You can get more explanations on how to do it in 
[prerequisites](/tutorials/truffle-boxes/truffle-boxes-prerequisites/) page.

## Setup the gas price

**Gas** is the internal pricing for running a transaction or contract. When you send tokens, interact with a contract, send R-BTC, or do anything else on the blockchain, you must pay for that computation. That payment is calculated as gas. In RSK, this is paid in **R-BTC**.
The **minimumGasPrice** is written in the block header by miners and establishes the minimum gas price that a transaction should have in order to be included in that block.

To update the **minimumGasPrice** in our project, run this query using cURL:

**Testnet**

```shell
curl https://public-node.testnet.rsk.co/ -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}' \
    > .minimum-gas-price-testnet.json
```

**Mainnet**

```shell
curl https://public-node.rsk.co/ -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}' \
    > .minimum-gas-price-mainnet.json
```

This query saved the details of latest block to 
file .minimum-gas-price-testnet.json 
or .minimum-gas-price-mainnet.json, respectively.

In the `truffle-config.js`, we are reading the parameter `minimumGasPrice` in each json file.

For more information about the **Gas** and **minimumGasPrice** please go to the [gas page](/rsk/rbtc/gas/ "Gas - RSK Developers Portal").

# Connect to an RSK network

Run the development console for any RSK network.

**RSK Testnet or Mainnet**

```shell
# Console for Testnet
truffle console --network testnet

# Console for Mainnet
truffle console --network mainnet
```

This action instructs Truffle to connect to an RSK public node and grants it permission to control the accounts created with your mnemonic through the `HD wallet provider`.

Let’s connect to the Testnet network:

```windows-command-prompt
C:\RSK\rsk-token>truffle console --network testnet
truffle(testnet)>  
```
# Test the connection to RSK network

On any of the networks, run this commands in the Truffle console:

## Block number

Shows the last block number.

```javascript
(await web3.eth.getBlockNumber()).toString()
```

## Network ID

To get the network ID, run this command:

```javascript
(await web3.eth.net.getId()).toString()
```

List of network IDs:
- mainnet: 30
- testnet: 31
- regtest (local node): 33

Check it out the last steps in this image:

![connect to rsk network](/assets/img/tutorials/rsk-token-box/image-19.png)

You can verify that I got the last block twice, and the block number inscreased, so we conclude that the connection is ok.

Exit the Truffle console:

```shell
.exit
```

```windows-command-prompt
truffle(develop)> .exit

C:\RSK\rsk-token>
```

# Deploy the smart contract on RSK network

Let's now switch to interacting with a "real" blockchain,
which is running on multiple nodes distributed around the world, across multiple computers!

We will do it running the below commands directly in the terminal, 
without using the Truffle console, to show you this alternative.

To use Testnet or Mainnet, you need to specify this using the parameter `-- network`. 
On any of the networks, run this commands in a terminal (not in Truffle console).

```shell
# Migrate in Testnet
truffle migrate --network testnet

# Migrate in Mainnet
truffle migrate --network mainnet
```

I will do it on testnet:

```shell
truffle migrate --network testnet
```

The migrate process in a real blockchain takes some time, because Truffle create some transactions which need to be mined in the blockchain.

![token migrate RSK testnet](/assets/img/tutorials/rsk-token-box/image-20.png)

Congratulations!

The token is now published on the RSK network.

> Make sure you have enough R-BTC to deploy it. 

Copy the token address. You will use it later.

For example, my token address is [0xDE39436919140C41711c38ba1141117E5B6f26Fe](https://explorer.testnet.rsk.co/address/0xDE39436919140C41711c38ba1141117E5B6f26Fe).

![contract address on RSK Testnet](/assets/img/tutorials/rsk-token-box/image-21.png)

# Interact with the token on RSK network

Interact with the smart contract using Truffle console connected to an RSK network. It's the same as we did for Truffle development console, but now it will be for a real blockchain!

> Make sure you had deployed the smart contract before executing this part.

Do the same steps which was done before:

- Open Truffle console connected to the network which you deploy the token
- Get your accounts
- Connect with your token
- Check the total supply
- Query the token balance
- Mint tokens
- Transfer tokens

## Truffle console on testnet

The next commands will run inside the Truffle console, 
connected to the network of your choice. 
In my case, it is testnet:

```shell
truffle console --network testnet
```

## Get your accounts 

```javascript
const accounts = await web3.eth.getAccounts()
```

```windows-command-prompt
truffle(testnet)>  const accounts = await web3.eth.getAccounts()
undefined
truffle(testnet)>
```

To list the accounts:

```javascript
accounts
```

```windows-command-prompt
truffle(testnet)> accounts
[ '0x4417CdC73f53573999F3A0397eE9df560a2f0507',
  '0x390BeD29A3F28772eDdcB02750c5A58FE7793647',
  '0x723dB256f61be581a6cA404d71D1d1951dD83F5e',
  '0x546A13cFe418BCd8E149C78C234a953Ba79FC427',
  '0xa88b72640758861f8ED4106241d743B948f7D55a',
  '0xC48141Ca379f27eEABcEaBc26e5E2c2f6130b2A1',
  '0xE7254aa2147549dbDA01559B449A61f993bA9b16',
  '0xa52DB3045a6A880149d87014FbCAeb33a2FDbE51',
  '0x7f3255db0514e0b78175e3f72DEC006B713AA166',
  '0x4eD69220224f9aC13e867961027C4599fFa74409' ]
truffle(testnet)>
```

To view each account:

```javascript
accounts[0]
accounts[1]
```

![accounts on testnet](/assets/img/tutorials/rsk-token-box/image-22.png)

In my example, the account[0] is `0x4417CdC73f53573999F3A0397eE9df560a2f0507`.

## Connect with the deployed contract

```javascript
const token = await Token.deployed()
```

## Confirm if the instance is OK.

```javascript
token. [TAB] [TAB]
```

![testnet - token tab tab](/assets/img/tutorials/rsk-token-box/image-23.png)

## Check the total supply

To check if we have tokens already minted, call the `totalSupply` function:

```javascript
(await token.totalSupply()).toString()
```

The returned value is 0, which is expected, since we did not perform any initial mint when we deployed the token.

## Check the token balance

To check the balance of an account, call the `balanceOf` function. For example, to check the balance of account 0:

```javascript
(await token.balanceOf(accounts[0])).toString()
```

```windows-command-prompt
truffle(testnet)> (await token.balanceOf(accounts[0])).toString()
'0'
truffle(testnet)>  
```

The returned value is also 0, which is expected, since we did not make any initial mint when we deployed the token, and by definition no accounts can have any tokens yet.

Take a look in the results of total supply and balanceOf:

![testnet - total supply and balanceOf 0](/assets/img/tutorials/rsk-token-box/image-24.png)

## Mint tokens

Run this command:

```javascript
token.mint(accounts[0], 10000)
```

This command sent a transaction to mint 100 tokens for account 0. 

![testnet - token.mint account 0](/assets/img/tutorials/rsk-token-box/image-25.png)

You can also mint to a specific address, `0xa52515946DAABe072f446Cc014a4eaA93fb9Fd79`:

```javascript
token.mint("0xa52515946DAABe072f446Cc014a4eaA93fb9Fd79", 10000)
```

## Reconfirm the token balance

Check the balance of account 0 again:

```javascript
(await token.balanceOf(accounts[0])).toString()
```

The returned value is 10000, which is 100 with 2 decimal places of precision. This is exactly what we expected, as we issued 100 tokens

Also, you can get the balance of a specific address, for example, `0xa52515946DAABe072f446Cc014a4eaA93fb9Fd79`:

```javascript
(await token.balanceOf("0xa52515946DAABe072f446Cc014a4eaA93fb9Fd79")).toString()
```

## Check the total supply (again)

Check the total supply again:

```javascript
(await token.totalSupply()).toString()
```
The returned value is 20000, which is 200 with 2 decimal places of precision. 
After minting 100 tokens for 2 accounts, this is perfect!

Take a look in the results:

![testnet - balanceOf 2 accounts with 10000 each and totalSupply 20000](/assets/img/tutorials/rsk-token-box/image-26.png)

## Transfer tokens

To transfer 40 tokens from account 0 to account 2. 
This can be done by calling the `transfer` function.

```javascript
token.transfer(accounts[2], 4000, {from: accounts[0]})
```

![testnet - token.transfer](/assets/img/tutorials/rsk-token-box/image-27.png)

Account 2 had no tokens before the transfer, and now it should have 40. Account 1 must have 60 tokens. Also the total supply will be the same.

Let’s check the balance of each account and the total supply:

```javascript
(await token.balanceOf(accounts[0])).toString()
(await token.balanceOf(accounts[2])).toString()
(await token.balanceOf("0xa52515946DAABe072f446Cc014a4eaA93fb9Fd79")).toString()
(await token.totalSupply()).toString()
```

Take a look in the results:

![testnet - balances after transfer](/assets/img/tutorials/rsk-token-box/image-28.png)

Great! The balances of both accounts and the total supply are correct.

### Exit Truffle console

In the Truffle console, enter this command to exit the terminal:

```shell
.exit
```

```windows-command-prompt
truffle(testnet)> .exit

C:\RSK\rsk-token>
```

# Using the token in a web wallet

You can check the balance or send tokens using the previously installed web3 wallet injected in the browser.

## Select the network

Select the same network which you deployed the token, in my case it is `testnet`: 

- Nifty: select in the dropdown list
- Metamask: configure [RSK Testnet](/wallet/use/metamask/)

## Add the token in the wallet

1. Open the tab `tokens`
2. Click the button `Add Token`
3. Go to tab `Custom Token`
4. Paste the token address
5. Click the button `Add`

![Nifty wallet - add custom token](/assets/img/tutorials/rsk-token-box/image-29.png)

Great! You can realize that you have 60 tokens, which was the last accounts[0]'s balance after transfer.

![Nifty wallet - token MRT added](/assets/img/tutorials/rsk-token-box/image-30.png)

## Create a new account in the web wallet

1. Click the person's icon
2. Choose `Create account`
3. Copy the address of account 2

![Nifty wallet - new account](/assets/img/tutorials/rsk-token-box/image-31.png)

It will be created the next account in the web wallet, which must be the same that was listed using Truffle console.

For example, for my mnemonic, account 2 is `0x390Bed29a3f28772eDDcb02750C5a58FE7793647`

```windows-command-prompt
truffle(testnet)> accounts[1]
'0x390BeD29A3F28772eDdcB02750c5A58FE7793647'
truffle(testnet)> 
```

> The account's array in Truffle console is zero base indexed, but the web wallet start in account 1. 
> So the account 2 in the web wallet is the accounts[1] in Truffle console.

Repeat the steps to add the token in account 2. 

## About checksum address

In some situations, when you try to send tokens to an address, you may receive a checksum error.

This can happen because RSK implements the [EIP-1191](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1191.md), which uses the chainID to verify accounts.

In most cases, you can pass it transforming the address in lower case. I use [convertcase.net/](http://convertcase.net/) to do it.

You can learn more about [account based RSK addresses](/rsk/architecture/account-based/ "Account based RSK addresses - RSK Developers Portal").

## Transfer tokens using the web wallet

Select the account 1 again.

Let's transfer 15 tokens from account 1 to account 2.

1. Click the three dots at right side of the token (not in the account 1).
2. Choose send

![Nifty wallet - send token button](/assets/img/tutorials/rsk-token-box/image-32.png)

3. Paste the address of account 2, which was copied previously
4. Fill the value: `15.00`
5. Click the button `Next`
6. Click the button `Submit`, to confirm the transaction

![Nifty wallet - send token](/assets/img/tutorials/rsk-token-box/image-33.png)

Wait some seconds, when the transaction was mined the balances will change!

![Nifty wallet - balances after transfer](/assets/img/tutorials/rsk-token-box/image-36.png)

How about now sending tokens to another account, using the full address? :)

# Final considerations

In this tutorial you learned how to use the Truffle box [rsk-token-box](https://github.com/rsksmart/rsk-token-box)
to create your own ERC20 token using Open Zeppelin smart contracts library in Truffle framework, connected to an RSK network.

- Go to [RSK Truffle boxes](/tools/truffle/boxes/) to experience other boxes.

I hope this tutorial has been helpful and I'd appreciate your feedback. 
Share it if you like it :)

**Do you have questions?**

Ask in [RSK chat](https://gitter.im/rsksmart/getting-started)
