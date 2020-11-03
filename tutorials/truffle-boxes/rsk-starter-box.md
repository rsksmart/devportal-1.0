---
layout: rsk
title: Using Truffle box rsk-starter-box
tags: tutorial, rsk, truffle, truffle-box 
description: "How to use the Truffle box rsk-starter-box, which comes with everything you need to start using Truffle on RSK networks. It includes network configurations for Mainnet, Testnet and the SimpleStorage contract as an example to deploy."
render_features: "custom-terminals"
---

In this tutorial, I will show you step-by-step how to use the Truffle box [rsk-starter-box](https://github.com/rsksmart/rsk-starter-box), 
which comes with everything you need to start using Truffle on RSK networks. 
It includes network configurations for Mainnet, Testnet and the SimpleStorage contract as an example to deploy.

Check out [RSK Blockchain](https://developers.rsk.co/rsk/) to learn more.

# Overview

Here is a summary of the steps we will take in this tutorial:

1. Setup prerequisites;
2. Install RSK Truffle Starter Box;
3. Learn how to use the Truffle development console;
4. Create a wallet;
5. Get R-BTC;
6. Connect to an RSK network;
7. Deploy a smart contract on RSK network using Truffle;
8. Interact with the smart contract at Truffle console.

If you were redirected from the [Truffle-rsk-starter-box](https://github.com/rsksmart/rsk-starter-box) page 
and successfully executed all the instructions, you can go ahead and interact with the published smart contract:
- [In the Truffle development console](#interact-with-a-smart-contract-in-development-console).
- [On RSK network](#using-truffle-console-to-connect-to-the-rsk-network).

On the other hand, if you would like to review the steps with more explanatory details and images, you would find this tutorial helpful.

# Setup prerequisites

The requirements are explained in detail in this tutorial:
[prerequisites](/tutorials/truffle-boxes/truffle-boxes-prerequisites/).

# Install RSK Truffle Starter Box

The truffle unbox command sets up a project based on a known template. 
In this tutorial, we will be using the “RSK starter box” Truffle box, 
which includes RSK network configurations and the SimpleStorage contract as an example to deploy. 

## Create a new folder 
For example, create the folder `rsk-starter`.
Navigate to the folder in the terminal.

```shell
mkdir rsk-starter
cd rsk-starter
```

```windows-command-prompt
C:\>cd C:\RSK

C:\RSK>mkdir rsk-starter

C:\RSK>cd rsk-starter

C:\RSK\rsk-starter>
```

## Run the unbox command

The truffle unbox command will install all necessary dependencies in the project.

```shell
truffle unbox rsksmart/rsk-starter-box
```

```windows-command-prompt
C:\RSK\rsk-starter>truffle unbox rsksmart/rsk-starter-box

Starting unbox...
=================

√ Preparing to download box
√ Downloading
npm WARN rsk-starter-box@1.0.0 No description
npm WARN rsk-starter-box@1.0.0 No repository field.
npm WARN rsk-starter-box@1.0.0 license should be a valid SPDX license expression

√ cleaning up temporary files
√ Setting up box

Unbox successful, sweet!

Commands:

  Compile contracts: truffle compile
  Migrate contracts: truffle migrate
  Test contracts:    truffle test

C:\RSK\rsk-starter>
```

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
C:\RSK\rsk-starter>truffle develop
Truffle Develop started at http://127.0.0.1:9545/

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

Compiling your contracts...
===========================
> Compiling .\contracts\Migrations.sol
> Compiling .\contracts\SimpleStorage.sol
> Artifacts written to C:\RSK\rsk-starter\build\contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

truffle(develop)>
```

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
> Artifacts written to C:\RSK\rsk-starter\build\contracts
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
   > transaction hash:    0x45a1e0ccde5bee844beb5f44112d916627de2543206d6801437775f31f3f1030
   > Blocks: 0            Seconds: 0
   > contract address:    0xf5c8B230b5281A8813b5153B4bCd815626d098cb
   > block number:        1
   > block timestamp:     1591365569
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
   > transaction hash:    0x550a98af626b20d567422c1219ab6629aaaee742e4bfc81033386d9377700eb7
   > Blocks: 0            Seconds: 0
   > contract address:    0x73f2aa5D251DbdEd6C950257124eA93bb00c0Ec0
   > block number:        3
   > block timestamp:     1591365569
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

![test](/assets/img/tutorials/rsk-starter-box/image-01.png)

# Interact with a smart contract in development console

> Make sure you deploy the smart contract before executing this part.

The next commands will run inside the development console.

```shell
truffle develop
```

## Connect with our published contract

```javascript
const simpleStorage = await SimpleStorage.deployed()
```

Now `simpleStorage` variable contains an instance of the previously deployed contract.

```windows-command-prompt
truffle(develop)> const simpleStorage = await SimpleStorage.deployed()
undefined
truffle(develop)>  
```

Don't worry about the `undefined` return, it is ok. 

## About SimpleStorage.json

The published contract information is stored by default in the `build\contracts` folder. 
You will find a JSON file with the same name of our smart contract.

The section `networks` contains the networks in which the smart contract was published, including its address and hash of the transaction.

![simpleStorage.json networks](/assets/img/tutorials/rsk-starter-box/image-02.png)

The ABI - Application Binary Interface is also very important because to connect with one smart contract, we must know the ABI and the address of the smart contract.

![simpleStorage.json abi](/assets/img/tutorials/rsk-starter-box/image-03.png)

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

![simpleStorage set](/assets/img/tutorials/rsk-starter-box/image-04.png)

Have a look at the response.

```javascript
truffle(develop)> simpleStorage.set(10)
{ tx:
   '0x0cf3d1f80f12dbfca47fd69af7f4671194c578eb5c60e905334c8765178d9bdf',
  receipt:
   { transactionHash:
      '0x0cf3d1f80f12dbfca47fd69af7f4671194c578eb5c60e905334c8765178d9bdf',
     transactionIndex: 0,
     blockHash:
      '0x604ab07250c373d74cd6c3665efa1935333e0cc97c0fa0a7d5898fbdcd7de693',
     blockNumber: 10,
     from: '0x1056f747cf4bc7710e178b2aeed4eb8c8506c728',
     to: '0x73f2aa5d251dbded6c950257124ea93bb00c0ec0',
     gasUsed: 41424,
     cumulativeGasUsed: 41424,
     contractAddress: null,
     logs: [],
     status: true,
     logsBloom:
      '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
     rawLogs: [] },
  logs: [] }
truffle(develop)> 
```

This is a transaction receipt, generated by the blockchain nodes, in response to the transaction request.

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

# Using RSK networks

Truffle makes developing on RSK easier because we can configure custom networks for RSK. The networks are already configured in the `truffle-config.js` file.

## Create a wallet

If you don't create a wallet yet, check out the tutorial
[prerequisites](/tutorials/truffle-boxes/truffle-boxes-prerequisites/).

You can learn more about [account based RSK addresses](/rsk/architecture/account-based/ "Account Based RSK Addresses - RSK Developers Portal").

Copy the wallet mnemonic. 
For example, my mnemonic is:

```
energy knife ice mouse merge track cram brown decorate atom rule virus
```

## Update .secret

Paste the wallet mnemonic in the file `.secret`, located in the folder project, and save it.

## Setup the gas price

**Gas** is the internal pricing for running a transaction or contract. When you send tokens, interact with a contract, send R-BTC, or do anything else on the blockchain, you must pay for that computation. That payment is calculated as gas. In RSK, this is paid in **R-BTC**.
The **minimumGasPrice** is written in the block header by miners and establishes the minimum gas price that a transaction should have in order to be included in that block.

To update the **minimumGasPrice** in our project run this query using cURL:

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

This query saved the details of the latest block to 
file .minimum-gas-price-testnet.json or .minimum-gas-price-mainnet.json, respectively.

In the `truffle-config.js` file, we are reading the parameter `minimumGasPrice` in each json file.

For more information about the **Gas** and **minimumGasPrice** please go [here](https://developers.rsk.co/rsk/rbtc/gas/ "Gas - RSK Developers Portal").

# Using Truffle Console to connect to the RSK network

Run the Truffle console for any RSK network.

**Testnet**

```shell
truffle console --network testnet
```

**Mainnet**

```shell
truffle console --network mainnet
```

This action instructs Truffle to connect to an RSK public node and grants it permission to control the accounts created with your mnemonic through the `HD wallet provider`.

Let’s connect to the Testnet network:

```windows-command-prompt
C:\RSK\rsk-starter>truffle console --network testnet
truffle(testnet)>  
```

### Test the connection to RSK network

On any of the networks, run this commands in the Truffle console:

#### Block number
Shows the last block number.

```javascript
(await web3.eth.getBlockNumber()).toString()
```
#### Network ID

To get the network ID, run this command:

```javascript
(await web3.eth.net.getId()).toString()
```

List of network IDs:
- mainnet: 30
- testnet: 31
- regtest (local node): 33
 
## Get your accounts

In the Truffle console, enter:

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
[ '0xCd70794c2F3C657310eF13b6FF3Ec2d112513B39',
  '0x2325b62A11F07BB48fc7bD5B1F472Be7045d2f2d',
  '0x3fBF9136bDa714FD95c1e75DB5dd3b8d59fa1A58',
  '0xd7A88F54230e18159C528B682ba61273E4e1009e',
  '0xb7C8e2aD92fb57a0cB8fcF7bbA11e81E4e664C2E' ]
truffle(testnet)>
```

To view each account:

```javascript
accounts[0]
accounts[1]
```

![accounts](/assets/img/tutorials/rsk-starter-box/image-10.png)

In my example, the account[0] is `0xCd70794c2F3C657310eF13b6FF3Ec2d112513B39`. 

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

If the balance is 0, your need to get some tR-BTC to pay gas fees,
which will be used to publish smart contracts and interact with them.
We shall obtain some tR-BTC in the next step.

## Get R-BTC

The Smart Bitcoin (R-BTC) is the token used to pay for the execution of transactions in RSK.

**Mainnet**

For the RSK Mainnet, get R-BTC from [an exchange](https://www.rsk.co/#exchanges-rsk).

**Testnet**

For the RSK Testnet, get tR-BTC from [our faucet](https://faucet.testnet.rsk.co/).

You can get more explanations to do it in 
[prerequisites](/tutorials/truffle-boxes/truffle-boxes-prerequisites/).

## Recheck balance

To check balance again, run this command in the Truffle console:

```javascript
(await web3.eth.getBalance(accounts[0])).toString()
```

For my example on RSK Testnet using account `0xCd70794c2F3C657310eF13b6FF3Ec2d112513B39`:

![getBalance](/assets/img/tutorials/rsk-starter-box/image-11.png)

Great! Now I have 50000000000000000, which means that I have 0.05 tR-BTC with 18 decimal place of precision.

## Exit Truffle console

In the Truffle console, enter this command to exit the terminal:

```shell
.exit
```

```windows-command-prompt
truffle(testnet)> .exit

C:\RSK\rsk-starter>
```

# Deploy the smart contract on RSK network

Let's now switch to interacting with a "real" blockchain,
which is running on multiple nodes distributed across multiple computers!

We will do it running the below commands directly in the terminal, without using the truffle console, this is to show you an alternative.

On any of the networks, run this commands in a terminal (not in Truffle console):

### Testnet

```shell
truffle migrate --network testnet
```

### Mainnet

```shell
truffle migrate --network mainnet
```

We'll do it on RSK testnet.

```windows-command-prompt
C:\RSK\rsk-starter>truffle migrate --network testnet

Compiling your contracts...
===========================
> Compiling .\contracts\Migrations.sol
> Compiling .\contracts\SimpleStorage.sol
> Artifacts written to C:\RSK\rsk-starter\build\contracts
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
   > transaction hash:    0xa467f1b5a94369bd6ad9c34b992011a86c85644bf777da4c98bc68bda21c820f
   > Blocks: 1            Seconds: 49
   > contract address:    0xcf88bB3bB41CB03C9C8C893E3D3Ad557091425a2
   > block number:        907723
   > block timestamp:     1591378050
   > account:             0xCd70794c2F3C657310eF13b6FF3Ec2d112513B39
   > balance:             0.049979750700274944
   > gas used:            263741 (0x4063d)
   > gas price:           0.076777216 gwei
   > value sent:          0 ETH
   > total cost:          0.000020249299725056 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000020249299725056 ETH

2_deploy_contracts.js
=====================

   Deploying 'SimpleStorage'
   -------------------------
   > transaction hash:    0x6d29215af9e0b12814008bfb0965de27b81f25246523de7bc18ee18462f16629
   > Blocks: 2            Seconds: 77
   > contract address:    0xD0d125a883755A9B9AC55628BDd6b434e7865002
   > block number:        907727
   > block timestamp:     1591378215
   > account:             0xCd70794c2F3C657310eF13b6FF3Ec2d112513B39
   > balance:             0.049968280798422272
   > gas used:            107369 (0x1a369)
   > gas price:           0.076777216 gwei
   > value sent:          0 ETH
   > total cost:          0.000008243492904704 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000008243492904704 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.00002849279262976 ETH

C:\RSK\rsk-starter>
```

Congratulations!

`Simple storage` is now published on the RSK network.

> Make sure you have enough R-BTC to deploy it.
    
# Interact with a smart contract on RSK network

Interact with the simpleStorage smart contract using Truffle console connected to an RSK network.

It's the same as we did for Truffle development console, but now it will be for a real blockchain!

> Make sure you deploy the smart contract before executing this part.

The next commands will run inside the Truffle console.

## Connect with our published contract

```javascript
const simpleStorage = await SimpleStorage.deployed()
```

```windows-command-prompt
truffle(testnet)> const simpleStorage = await SimpleStorage.deployed()
undefined
truffle(testnet)> 
```

Now simpleStorage variable contains an instance of the previously deployed contract.

## Get value

Get the value stored in the contract.

```javascript
simpleStorage.get().then(bn => bn.toNumber())
```

This method does not modify the storage of the contract, so no funds are spent calling it.

```windows-command-prompt
truffle(testnet)> simpleStorage.get().then(bn => bn.toNumber())
0
truffle(testnet)>
```

We do not have any value stored, because we do not define anything at the moment when we deployed.

## Set value

Store some value in the contract.

```javascript
simpleStorage.set(10)
```

To modify a contract's storage we must pay with gas. This gas is discounted from the account balance.

Take a look at the response.

```javascript
truffle(testnet)> simpleStorage.set(10)
{ tx:
   '0xaea9d3d21e95045c56843925bf9ea84428ef623246ec6ff95276d2e4d0a5bd93',
  receipt:
   { transactionHash:
      '0xaea9d3d21e95045c56843925bf9ea84428ef623246ec6ff95276d2e4d0a5bd93',
     transactionIndex: 0,
     blockHash:
      '0x3df23ea25148a4522831b453a08ee254e6f39408918b524eb87df88c0a4e01b2',
     blockNumber: 907750,
     cumulativeGasUsed: 41684,
     gasUsed: 41684,
     contractAddress: null,
     logs: [],
     from: '0xcd70794c2f3c657310ef13b6ff3ec2d112513b39',
     to: '0xd0d125a883755a9b9ac55628bdd6b434e7865002',
     root: '0x01',
     status: true,
     logsBloom:
      '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
     rawLogs: [] },
  logs: [] }
truffle(testnet)>
```

This is a transaction receipt, generated by the blockchain nodes, in response to the transaction request.

## Get value (again)

To confirm that it was executed, we can call `get` function again and see that the storage has changed.

```javascript
simpleStorage.get().then(bn => bn.toNumber())
```

The value now should be `10`!

```windows-command-prompt
truffle(testnet)> simpleStorage.get().then(bn => bn.toNumber())
10
truffle(testnet)> 
```

# Final considerations

In this tutorial you learned how to use the Truffle box [rsk-starter-box](https://github.com/rsksmart/rsk-starter-box), 
which comes with everything you need to start using Truffle on RSK networks. 

- Go to [RSK Truffle boxes](/tools/truffle/boxes/) to experience other boxes.

I hope this tutorial has been helpful and I'd appreciate your feedback. 
Share it if you like it :)

**Do you have questions?**

Ask in [RSK chat](https://gitter.im/rsksmart/getting-started)
