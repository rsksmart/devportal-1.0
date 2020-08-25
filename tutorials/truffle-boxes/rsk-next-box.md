---
layout: rsk
title: Using Truffle box rsk-next-box
tags: tutorial, rsk, truffle, truffle-box, next
description: "How to install and use a Truffle box that comes with Next JS, and works with the RSK network."
render_features: "custom-terminals"
---

In this tutorial, I will show you step-by-step how to use the Truffle box 
[rsk-next-box](https://github.com/rsksmart/rsk-next-box), 
which comes with Next JS and everything you need to start using Truffle on RSK networks. 
It includes network configurations for Mainnet, Testnet and the SimpleStorage contract as an example to deploy.

Check out [RSK Blockchain](https://developers.rsk.co/rsk/) to learn more.

> This tutorial is helpful to review the steps with more explanatory details and images.

# Overview 

What we will do in this tutorial:

1. [Pre-requisites](#setup-prerequisites)
2. [Install RSK Truffle box](#install-rsk-truffle-box);
3. [Truffle development console](#truffle-development-console);
4. [Compile a smart contract](#compile-a-smart-contract);
5. [Deploy a smart contract](#deploy-a-smart-contract);
6. [Test a smart contract](#test-a-smart-contract);
7. [Interact with a smart contract in development console](#interact-with-a-smart-contract-in-development-console);
8. [Client side application](#client-side-application);
9. [Using RSK networks](#using-rsk-networks);
10. [Deploy the smart contract on RSK network](#deploy-the-smart-contract-on-rsk-network);
11. [Client side application on RSK network](#client-side-application-on-rsk-network);

# Setup prerequisites

Check out this tutorial to be shure that you have all [prerequisites](/tutorials/truffle-boxes/truffle-boxes-prerequisites/) configured.

# Install RSK Truffle Box

The truffle unbox command sets up a project based on a known template. 
In this tutorial, we will be using the “RSK next box” Truffle box, 
which includes RSK network configurations and the SimpleStorage contract as an example to deploy. 

## Create a new folder 
For example, create the folder `rsk-next`.
Navigate to the folder in the terminal.

```shell
mkdir rsk-next
cd rsk-next
```

```windows-command-prompt
C:\>cd C:\RSK

C:\RSK>mkdir rsk-next

C:\RSK>cd rsk-next

C:\RSK\rsk-next>
```

## Run the unbox command

The truffle unbox command will install all necessary dependencies in the project, so it can take some time.

```shell
truffle unbox rsksmart/rsk-next-box
```

```windows-command-prompt
C:\RSK\rsk-next>truffle unbox rsksmart/rsk-next-box

Starting unbox...
=================

√ Preparing to download box
√ Downloading
√ cleaning up temporary files
√ Setting up box

Unbox successful, sweet!

Commands:

  Compile contracts: truffle compile
  Migrate contracts: truffle migrate
  Test contracts:    truffle test
  Run dev server:       cd app && npm run dev
  Build for production: cd app && yarn build

C:\RSK\rsk-next>
```

A Create-React-Next-App is generated in the `app` directory.

## SimpleStorage.sol

Take a look at the smart contract `SimpleStorage.sol`. You can check it out in folder `contracts`.

```javascript
pragma solidity >=0.4.0 <0.7.0;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
```

This smart contract has:

* A variable `storedData` to store a number
* A function `get()` to return the number stored at variable `storedData`
* A function `set()` to change the number stored at variable `storedData`

# Truffle development console

Truffle has an interactive console that also spawns a development blockchain. 
This is very useful for compiling, deploying and testing locally.

Run the development console by typing the following command below into the terminal:

```shell
truffle develop
```

```windows-command-prompt
C:\RSK\rsk-next>truffle develop
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

> Inside the development console we don't preface commands with `truffle`.

# Compile a smart contract

In the Truffle console, run this command:

```javascript
compile
```

```windows-command-prompt
truffle(develop)> compile

Compiling your contracts...
===========================
> Compiling .\contracts\Migrations.sol
> Compiling .\contracts\SimpleStorage.sol
> Artifacts written to C:\RSK\rsk-next\app\contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

truffle(develop)>
```

## About contracts_build_directory in Truffle config

Did you notice above that the `artifacts` was written in a different locale?

In `truffle-config.js` file, located in the project folder, we change the localization where files for contracts artifacts are saved, like abi and deployed addresses. 

Take a look at the changes:
- Line 1: library `path` was added.
- Line 37: we add a new parameter `contracts_build_directory` that defines the locale for the contracts artifacts.

It is located in a different folder: `app/contracts`.

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

Compiling your contracts...
===========================
> Compiling .\contracts\Migrations.sol
> Compiling .\contracts\SimpleStorage.sol
> Artifacts written to C:\RSK\rsk-next\app\contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

Starting migrations...
======================
> Network name:    'develop'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)

1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xa86c77634130160b626c4730fd523bae38e353ef9ed27e2dbe109da895533ad0
   > Blocks: 0            Seconds: 0
   > contract address:    0xf5c8B230b5281A8813b5153B4bCd815626d098cb
   > block number:        1
   > block timestamp:     1596217936
   > account:             0x1056F747cf4bC7710E178B2aeED4Eb8c8506c728
   > balance:             99.99549526
   > gas used:            225237 (0x36fd5)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00450474 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00450474 ETH

2_deploy_contracts.js
=====================

   Deploying 'SimpleStorage'
   -------------------------
   > transaction hash:    0x5a3d98220c20f6a845ec48eacb7db3ff0f7ca5f1826a9dec07232b5c84bd6831
   > Blocks: 0            Seconds: 0
   > contract address:    0x73f2aa5D251DbdEd6C950257124eA93bb00c0Ec0
   > block number:        3
   > block timestamp:     1596217936
   > account:             0x1056F747cf4bC7710E178B2aeED4Eb8c8506c728
   > balance:             99.99272422
   > gas used:            96189 (0x177bd)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00192378 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00192378 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.00642852 ETH

truffle(develop)>
```

# Test a smart contract

Truffle has an automated testing framework to facilitate the testing of contracts.
All test files should be located in the `test` directory.
To learn more, go to the Truffle documentation, in the section [testing your contracts](https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts).

Our box also comes with the file `TestSimpleStorage.js` for testing the smart contract. 
You can check it out in the `test` folder.

```javascript
test
```

This `test output` should be similar to:

![truffle test](/assets/img/tutorials/rsk-next-box/image-04.png)

Note the command varies slightly if you're in or outside of the development console.

```javascript
// inside the development console.
test

// outside the development console.
truffle test
```

# Interact with a smart contract in development console

> Make sure you deploy the smart contract before executing this part.

The next commands will run inside the development console.

## Connect with our published contract

```javascript
const simpleStorage = await SimpleStorage.deployed()
```

Now simpleStorage variable contains an instance of the previously deployed contract.

```windows-command-prompt
truffle(develop)> const simpleStorage = await SimpleStorage.deployed()
undefined
truffle(develop)>  
```

Remember that the published contract information is stored in the `app/contracts` folder. 
You will find a JSON file with the same name of our smart contract.

The section `networks` has the networks in which the smart contract was published, including its address and hash of the transaction.

![simpleStorage.json networks](/assets/img/tutorials/rsk-next-box/image-05.png)

The `ABI - Application Binary Interface` is also very important because to connect with one smart contract, we must know the ABI and the address of the smart contract.

![simpleStorage.json abi](/assets/img/tutorials/rsk-next-box/image-06.png)

## Get value

Get the value stored in the contract.

```javascript
simpleStorage.get().then(bn => bn.toNumber())
```

We do not have any value stored, because we do not define anything at the moment when we deployed.

```windows-command-prompt
truffle(develop)> simpleStorage.get().then(bn => bn.toNumber())
0
truffle(develop)>  
```

## Set value

Store some value in the contract.

```javascript
simpleStorage.set(10)
```

![simpleStorage set](/assets/img/tutorials/rsk-next-box/image-07.png)

Have a look at the response. The transaction receipt, generated by the blockchain nodes, is the response to the transaction request.

## Get value (again)

Verify if the value stored in the smart contract was changed.

```javascript
simpleStorage.get().then(bn => bn.toNumber())
```

The value now should be `10`!

```windows-command-prompt
truffle(develop)> simpleStorage.get().then(bn => bn.toNumber())
10
truffle(develop)> 
```

# Client side application

Our box has done a front end to interact with the smart contract, built using React app and Next JS.

In another terminal (i.e. not in the truffle develop prompt), go to the `app` directory and run the React app.

> Do not close the other terminal, which is running the Truffle development console, because it is our Blockchain simulator.
> 
> If you close it and then open it again, you need to deploy / migrate the smart contract again too!

```shell
cd app
npm run dev
```

![npm run dev](/assets/img/tutorials/rsk-next-box/image-08.png)

Then go to your browser at [http://localhost:3000/](http://localhost:3000/)

![localhost port 3000](/assets/img/tutorials/rsk-next-box/image-09.png)

> Smart contract changes must be manually recompiled and migrated!

# Using RSK networks

This Truffle box is already configured to connect to both RSK networks: testnet and mainnet. We need only to update few items:

- RSK network gas price
- Your wallet mnemonic
- Choose the network in the app

## Setup the gas price

**Gas** is the internal pricing for running a transaction or contract. When you send tokens, interact with a contract, send R-BTC, or do anything else on the blockchain, you must pay for that computation. That payment is calculated as gas. In RSK, this is paid in **R-BTC**.
The **minimumGasPrice** is written in the block header by miners and establishes the minimum gas price that a transaction should have in order to be included in that block.

To update the **minimumGasPrice**, in our project folder, run this query using cURL:

**Testnet**

```shell
curl https://public-node.testnet.rsk.co/ \
    -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}' \
    > .minimum-gas-price-testnet.json
```

**Mainnet**

```shell
curl https://public-node.rsk.co/ \
    -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}' \
    > .minimum-gas-price-mainnet.json
```

This query saved the details of latest block to 
file .minimum-gas-price-testnet.json 
or .minimum-gas-price-mainnet.json, respectively.

This is the result of Testnet query in the terminal in Windows OS:

![minimum gas price testnet](/assets/img/tutorials/rsk-next-box/image-10.png)

In the `truffle-config.js`, we are reading the parameter `minimumGasPrice` in each json file.

For more information about the **Gas** and **minimumGasPrice** please go to [gas page](https://developers.rsk.co/rsk/rbtc/gas/ "Gas - RSK Developers Portal").

## Create a wallet mnemonic

If you don't have a wallet mnemonic, check it out in in the tutorial [prerequisites](/tutorials/truffle-boxes/truffle-boxes-prerequisites/).

## Update mnemonic in Truffle config

In `truffle-config.js`, locate this line: 

```javascript
const mnemonic = 'A_MNEMONIC';
```

![A_MNEMONIC](/assets/img/tutorials/rsk-next-box/image-11.png)

Substitute `A_MNEMONIC` with the mnemonic of your wallet.

Im my example, it will be:

```javascript
const mnemonic = 'virtual valve razor retreat either turn possible student grief engage attract fiber';
```

## HD wallet provider

To connect to the RSK network, we are going to use a provider that allows us to connect to any network by unlocking an account locally. 
We are using `@truffle/hdwallet-provider`. It was installed with the box.

Please be aware that we are using `HDWalletProvider` with RSK Networks derivations path:
- RSK Mainnet dpath: `m/44’/137’/0’/0`
- RSK Testnet dpath: `m/44’/37310’/0’/0`

For more information, check the [account based RSK addresses](/rsk/architecture/account-based/ "Account based RSK addresses - RSK developers portal").

## Using Truffle Console to connect to the RSK network

 Run the development console for any RSK network.

**Testnet**

```shell
truffle console --network testnet
```

 **Mainnet**

```shell
truffle console --network mainnet
```

This action instructs Truffle to connect to an RSK public node and grants it permission to control the accounts created with your mnemonic through the `HD wallet provider`.

I will connect to the Testnet network:

```windows-command-prompt
C:\RSK\rsk-next>truffle console --network testnet
truffle(testnet)>  
```

## Get your addresses / accounts

We will use a special instruction in Truffle console to get the first 10 addresses in our hierarchical deterministic wallet for the RSK network, that are generated from our mnemonic.

Inside the Truffle console, run this command to save the addresses at variable `accounts`:

```javascript
const accounts = await web3.eth.getAccounts()
```

```windows-command-prompt
truffle(testnet)>  const accounts = await web3.eth.getAccounts()
undefined
truffle(testnet)>
```

Don't worry about the `undefined` return, it is ok. 
See the addresses after it by entering the command below:

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

![accounts](/assets/img/tutorials/rsk-next-box/image-12.png)

In my example, the account[0] is `0x4417CdC73f53573999F3A0397eE9df560a2f0507`.

## Check balance

To check the balance of account[0], for example, run this command in Truffle console:

```javascript
(await web3.eth.getBalance(accounts[0])).toString()
```

```windows-command-prompt
truffle(testnet)> (await web3.eth.getBalance(accounts[0])).toString()
'0'
truffle(testnet)>  
```

The balance is 0 and we need some tR-BTC to pay gas fees,
which will be used to publish smart contracts and interact with them.
We shall obtain some tR-BTC in the next step.

## Exit Truffle console

In the Truffle console, enter this command to exit the terminal:

```shell
.exit
```

```windows-command-prompt
truffle(testnet)> .exit

C:\RSK\rsk-starter>
```

## Get R-BTC

The Smart Bitcoin (R-BTC) is the token used to pay for the execution of transactions in RSK.

**Mainnet**

For the RSK Mainnet, get R-BTC from [an exchange](https://www.rsk.co/#exchanges-rsk).

**Testnet**

For the RSK Testnet, get tR-BTC from [our faucet](https://faucet.testnet.rsk.co/).

![faucet.testnet.rsk.co](/assets/img/tutorials/rsk-next-box/image-13.png)

Enter your wallet address and pass the CAPTCHA.

Wait a few seconds…

![wait faucet](/assets/img/tutorials/rsk-next-box/image-14.png)

This is an example of a transaction hash received from faucet:

[`0x0661f313cb387b6f09549a7f81ca7c0e7cc476cfe6069a9c755b1ceb8b531874`](https://explorer.testnet.rsk.co/tx/0x0661f313cb387b6f09549a7f81ca7c0e7cc476cfe6069a9c755b1ceb8b531874)

![faucet Received some R-BTCs](/assets/img/tutorials/rsk-next-box/image-15.png)

# Deploy the smart contract on RSK network

Migrate the smart contracts. 
We will do it by running the below commands directly in the terminal, 
without using the truffle console now to show to you this alternative. 
Run the migrate command for the RSK network of your choice.

**Testnet**

```shell
truffle migrate --network testnet
```

**Mainnet**

```shell
truffle migrate --network mainnet
```

I will do it on RSK testnet.

```windows-command-prompt
C:\RSK\rsk-next>truffle migrate --network testnet
Minimum gas price Testnet: 59240000
Minimum gas price Mainnet: 59240000

Compiling your contracts...
===========================
> Compiling .\contracts\Migrations.sol
> Compiling .\contracts\SimpleStorage.sol
> Artifacts written to C:\RSK\rsk-next\app\contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

Starting migrations...
======================
> Network name:    'testnet'
> Network id:      31
> Block gas limit: 6800000 (0x67c280)

1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x2c6630be4498f8c216778b1022b3f1b08395c6a6aad8f79d87e1dd8209da9352
   > Blocks: 1            Seconds: 21
   > contract address:    0x2B848073864c240AaD5367F712Bb3CFB65427BA1
   > block number:        1060334
   > block timestamp:     1596426576
   > account:             0x4417CdC73f53573999F3A0397eE9df560a2f0507
   > balance:             0.0998824704526748
   > gas used:            263741 (0x4063d)
   > gas price:           0.065164 gwei
   > value sent:          0 ETH
   > total cost:          0.000017186418524 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000017186418524 ETH


2_deploy_contracts.js
=====================

   Deploying 'SimpleStorage'
   -------------------------
   > transaction hash:    0x4133014a98336c86866163656295d7c5e815be0d4a2bad493c961fc427ffbd3d
   > Blocks: 1            Seconds: 29
   > contract address:    0x9aFA45B0d0020C15EeA608A20BC25889DE53DaA3
   > block number:        1060338
   > block timestamp:     1596426636
   > account:             0x4417CdC73f53573999F3A0397eE9df560a2f0507
   > balance:             0.0998727354723868
   > gas used:            107369 (0x1a369)
   > gas price:           0.065164 gwei
   > value sent:          0 ETH
   > total cost:          0.000006996593516 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000006996593516 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.00002418301204 ETH

C:\RSK\rsk-next>
```

Congratulations!

`Simple storage` is now published on the RSK network.

> Make sure you have enough R-BTC to deploy it.

# Client side application on RSK network

To connect the client side application to an RSK network, we just have to update a line in the Express JS component.

### Update connection

Open the file `app/utils/web3-util.js`. 

Choose which network you would like to connect the server to RSK Network and update line 15:

**Testnet**
```js
const provider = new Web3.providers.HttpProvider("https://public-node.testnet.rsk.co");
```

**Mainnet**
```js
const provider = new Web3.providers.HttpProvider("https://public-node.rsk.co");
```

The component located in the file `web3-util.js` uses the [web3.js](https://web3js.readthedocs.io/) library to interact with the blockchain - writing code that reads and writes data from the blockchain with smart contracts.

### Running the app

In a terminal, go to the `app` directory and run the Next JS app.

```shell
cd app
npm run dev
```

Go to your browser at [http://localhost:3000/](http://localhost:3000/)

> Note that when you are connected to an RSK network, you do not need to leave open the Truffle console, because the app is connected via a public node, directly to the network.

# Final considerations

In this tutorial you learned how to use the Truffle box [rsk-next-box](https://github.com/rsksmart/rsk-next-box), 
which comes with everything you need to start using Truffle on RSK networks. 

Check out [RSK Blockchain](https://developers.rsk.co/rsk/) for more details about us.

I hope this tutorial has been helpful and I'd appreciate your feedback. 
Share it if you like it :)

**Do you have questions?**

Ask in [RSK chat](https://gitter.im/rsksmart/getting-started)
