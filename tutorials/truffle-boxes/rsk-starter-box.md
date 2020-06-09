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
5. Configure Truffle to connect to RSK network;
6. Get R-BTC;
7. Deploy a smart contract on RSK network using Truffle;
8. Interact with the smart contract at Truffle console.

If you were redirected from the [Truffle-rsk-starter-box](https://github.com/rsksmart/rsk-starter-box) page 
and successfully executed all the instructions, you can go ahead and interact with the published smart contract:
- [In the Truffle development console](#interact-with-a-smart-contract-in-development-console).
- [On RSK network](#using-truffle-console-to-connect-to-the-rsk-network).

On the other hand, if you would like to review the steps with more explanatory details and images, you would find this tutorial helpful.

# Setup prerequisites

* POSIX compliant shell
* Curl
* Node.js and NPM (Node Package Manager)
* Code editor: Visual Studio Code (VSCode) or any other editor of your choice
* Truffle

## POSIX compliant shell

The **Portable Operating System Interface (POSIX)** is a family of standards specified by the IEEE Computer Society for maintaining compatibility between operating systems. POSIX defines the application programming interface (API), along with command line shells and utility interfaces, for software compatibility with variants of Unix and other operating systems.
Source: [Wikipedia](https://en.wikipedia.org/wiki/POSIX)

* Mac OSX and Linux distributions: Use the standard terminal
* Windows: If you use the standard `cmd` terminal, or PowerShell, the commands here may not work.
  Consider installing [Git for Windows](https://gitforwindows.org/), which comes with Git Bash bundled.
  Here is a [tutorial on installing and using Git Bash](https://www.atlassian.com/git/tutorials/git-bash).

## cURL

This is a system command that is likely already installed on your system,
which allows you to make network requests, such as HTTP requests,
from your command line.

If `curl --version` displays an error,
then [download curl](https://curl.haxx.se/download.html).

In Windows:

```windows-command-prompt
C:\>curl --version
curl 7.55.1 (Windows) libcurl/7.55.1 WinSSL
Release-Date: [unreleased]
Protocols: dict file ftp ftps http https imap imaps pop3 pop3s smtp smtps telnet tftp
Features: AsynchDNS IPv6 Largefile SSPI Kerberos SPNEGO NTLM SSL

C:\>
```

## Node.js and NPM

Another dependency is NPM, which comes bundled with Node.js.

To check if you have node already installed, enter this command into your terminal:

```shell
node --version
npm --version
```

```windows-command-prompt
C:\>node --version
v10.16.3

C:\>npm --version
v6.9.0

C:\>
```

If there's no output like the one above, go to [Node.js](https://nodejs.org/en/) install.

Note that NPM is usually installed together with Node.js, so after installing Node.js, there's no need to install it separately.

If you want to have more than one version installed,
the most fuss-free way to install and manage multiple versions of `node` on your computer is [nvm](https://github.com/nvm-sh/nvm).

## Code editor

We need some software that is able to edit text files.
Preferably one that has support for syntax highlighting for both Solidity and Javascript.

[VS Code](https://code.visualstudio.com/) is a good choice if you don't already have one.

### Visual Studio Code (VS Code)

In this tutorial, we will use VS Code to create our project.

Go to [VS Code download](https://code.visualstudio.com/download) if you would like to use it too.

Verify if your VS Code installation was successful by typing the following command into the terminal:

```shell
code -v
```

```windows-command-prompt
C:\>code -v
1.45.1
5763d909d5f12fe19f215cbfdd29a91c0fa9208a
x64

C:\>
```

## Truffle

Truffle is a popular development framework with a mission to make smart contract development easier for developers. Amongst its features, it has a smart contract lifecycle management, scriptable deployment & migrations, automated contract testing and simple network management.

It also makes developing on RSK easier, with the ability to configure custom networks for RSK.

To install Truffle, input the command below into the terminal and press `enter` at your project location:

```shell
npm install -g truffle
```

```windows-command-prompt
C:\>npm install -g truffle
C:\Program Files\nodejs\truffle -> C:\Program Files\nodejs\node_modules\truffle\build\cli.bundled.js

> truffle@5.1.28 postinstall C:\Program Files\nodejs\node_modules\truffle
> node ./scripts/postinstall.js

- Fetching solc version list from solc-bin. Attempt #1
+ truffle@5.1.28
updated 1 package in 11.679s

C:\>
```

When the installation is finished, close the terminal, open it again and check the Truffle version:

```shell
truffle version
```

```windows-command-prompt
C:\>truffle version
Truffle v5.1.28 (core: 5.1.28)
Solidity v0.5.16 (solc-js)
Node v10.16.3
Web3.js v1.2.1

C:\>
```

For more info: [trufflesuite.com/truffle](https://www.trufflesuite.com/truffle)

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

```windows-command-prompt
truffle(develop)> test
Using network 'develop'.

Compiling your contracts...
===========================
> Compiling .\contracts\Migrations.sol
> Compiling .\contracts\SimpleStorage.sol
> Artifacts written to C:\Users\Solange\AppData\Local\Temp\test-202055-3640-nxpnxb.3exj
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

  Contract: SimpleStorage
    √ should store a value (131ms)

  1 passing (164ms)

truffle(develop)>  
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

The published contract information is stored by default in the `build\contracts` folder. 
You will find a JSON file with the same name of our smart contract.
The section `networks` has the networks in which the smart contract was published, including its address and hash of the transaction.

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

# Create a wallet

The best way to create a wallet is from a mnemonic, using the pattern defined at [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).

There are a few ways to do this.

One is to create using a web wallet, 
such as [Metamask](https://metamask.io/) 
or [Nifty](https://www.poa.network/for-users/nifty-wallet) wallet.
These wallets generate the mnemonic for you.

## iancoleman.io/bip39

Another way is using this web app:

[iancoleman.io/bip39](https://iancoleman.io/bip39/)

> Note: In this tutorial, the method used to store the mnemonic is not recommended to be used for any 'real' wallet because it's not secure enough to generate a private key in a website, however we will use this here for learning purposes, and because we're using the Testnet, so no real amounts are at stake.

In the `Generate a random mnemonic` field, select `12 words` and click on the `generate` button.

![Generate a random mnemonic](/assets/img/tutorials/rsk-starter-box/image-05.png)

The result appears in the `BIP39 Mnemonic` field.
They should be 12 random words like the words in the image:

![BIP39 Mnemonic](/assets/img/tutorials/rsk-starter-box/image-06.png)

My mnemonic is:

```
energy knife ice mouse merge track cram brown decorate atom rule virus
```

Copy these 12 words, we'll use it later in this tutorial.

You can learn more about [account based RSK addresses](/rsk/architecture/account-based/ "Account Based RSK Addresses - RSK Developers Portal").

# Update Truffle config

Open up the config file used by Truffle in your code editor.
The file is named `truffle-config.js` and it is located in the root folder of your project.

## Update mnemonic

In `truffle-config.js`, locate this line: 

```javascript
const mnemonic = 'A_MNEMONIC';
```

![A_MNEMONIC](/assets/img/tutorials/rsk-starter-box/image-07.png)

Substitute `A_MNEMONIC` with the mnemonic of your wallet.

Im my example, it will be:

```javascript
const mnemonic = 'energy knife ice mouse merge track cram brown decorate atom rule virus';
```

## HD wallet provider

To connect to the RSK network, we are going to use a provider that allows us to connect to any network by unlocking an account locally. 
We are using `@truffle/hdwallet-provider`. It was installed with the box.

Please be aware that we are using `HDWalletProvider` with RSK Networks derivations path:
- RSK Mainnet dpath: `m/44’/137’/0’/0`
- RSK Testnet dpath: `m/44’/37310’/0’/0`

For more information, check [RSKIP57](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP57.md).

## Get the current gas price

**Gas** is the internal pricing for running a transaction or contract. 
When you send tokens, interact with a contract, send RBTC, or do anything else on the blockchain, you must pay for that computation. 
That payment is calculated as gas. 
In RSK, this is paid in **R-BTC**.
The **minimumGasPrice** is written in the block header by miners and establishes the minimum gas price that a transaction should have in order to be included in that block.

To get the **minimumGasPrice** do the following steps:

1. Run this query using cURL:

**Mainnet**

```shell
curl https://public-node.rsk.co/ \
    -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}'
```

**Testnet**

```shell
curl https://public-node.testnet.rsk.co/ \
    -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}'
```

![minimumGasPrice](/assets/img/tutorials/rsk-starter-box/image-08.png)

2. Find in the result the field **_minimumGasPrice_**

For more information about the **Gas** and **minimumGasPrice** please visit the [gas](/rsk/rbtc/gas/ "Gas - RSK Developers Portal") page.

3. In `truffle-config.js`, check the value of `gasPrice` configuration and update it with the value found in the previous step.

![gasPrice](/assets/img/tutorials/rsk-starter-box/image-09.png)

# Using Truffle Console to connect to the RSK network

 Run the development console for any RSK network.

 **Mainnet**

```shell
truffle console --network mainnet
```

**Testnet**

```shell
truffle console --network testnet
```

This action instructs Truffle to connect to an RSK public node and grants it permission to control the accounts created with your mnemonic through the `HD wallet provider`.

I will connect to the Testnet network:

```windows-command-prompt
C:\RSK\rsk-starter>truffle console --network testnet
truffle(testnet)>  
```

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

# Get R-BTC

The Smart Bitcoin (R-BTC) is the token used to pay for the execution of transactions in RSK.

**Mainnet**

For the RSK Mainnet, get R-BTC from [an exchange](https://www.rsk.co/#exchanges-rsk).

**Testnet**

For the RSK Testnet, get tR-BTC from [our faucet](https://faucet.testnet.rsk.co/).

![faucet.testnet.rsk.co](/assets/img/tutorials/rsk-starter-box/image-12.png)

Enter your wallet address and pass the CAPTCHA.

Wait a few seconds…

![Received some R-BTCs](/assets/img/tutorials/rsk-starter-box/image-13.png)

You can see the transaction hash:
[`0xe7a25985f019482d362a3be908f1c0b3dee612fcc78716b6a341d8ad6138ea95`](https://explorer.testnet.rsk.co/tx/0xe7a25985f019482d362a3be908f1c0b3dee612fcc78716b6a341d8ad6138ea95)

## Recheck balance

To check balance again, run this command in the Truffle console:

```javascript
(await web3.eth.getBalance(accounts[0])).toString()
```

For my example on RSK Testnet using account `0xCd70794c2F3C657310eF13b6FF3Ec2d112513B39`:

![getBalance](/assets/img/tutorials/rsk-starter-box/image-11.png)

Great! Now I have 50000000000000000, which means that I have 0.05 tR-BTC with 18 decimal places of precision.

# Deploy the smart contract on RSK network

Let's now switch to interacting with a "real" blockchain,
which is running on multiple nodes distributed across multiple computers!

In the terminal, run the migrate command for the RSK network of your choice.

 **Mainnet**

```shell
truffle migrate --network mainnet
```

**Testnet**

```shell
truffle migrate --network testnet
```

I will do it on RSK testnet.

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

Interact with the simple storage smart contract using Truffle console connected to an RSK network.

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

Check out [RSK Blockchain](https://developers.rsk.co/rsk/) for more details about us.

I hope this tutorial has been helpful and I'd appreciate your feedback. 
Share it if you like it :)

**Do you have questions?**

Ask in [RSK chat](https://gitter.im/rsksmart/getting-started)
