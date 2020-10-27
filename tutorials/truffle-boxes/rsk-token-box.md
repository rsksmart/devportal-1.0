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

If you were redirected from the [Truffle-rsk-token-box](https://github.com/rsksmart/rsk-token-box) page 
and successfully executed all the instructions, you can go ahead and interact with the published smart contract:
- [In the Truffle development console](#interact-with-a-smart-contract-in-development-console).
- [On RSK network](#using-truffle-console-to-connect-to-the-rsk-network).

On the other hand, if you would like to review the steps with more explanatory details and images, you would find this tutorial helpful.

# Setup prerequisites

Check out this tutorial to be shure that you have all 
[prerequisites](/tutorials/truffle-boxes/truffle-boxes-prerequisites/) configured.


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

```windows-command-prompt
```

## Token.sol

Take a look at the smart contract `Token.sol`. You can check it out in folder `contracts`.

```javascript

```

This smart contract has:


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

![test](/assets/img/tutorials/rsk-token-box/image-01.png)

# Interact with a smart contract in development console

> Make sure you deploy the smart contract before executing this part.

The next commands will run inside the development console.

```shell
truffle develop
```

## Connect with our published contract