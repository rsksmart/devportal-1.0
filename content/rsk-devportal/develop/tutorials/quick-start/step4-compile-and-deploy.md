---
# menu_order: 400
menu_title: Step 4 - Compile & Deploy
layout: rsk
title: Quick Start - Step 4
tags: quick-start, compile, deploy, regtest, truffle
description: 'quick start - compile smart contracts, deploy smart contracts to regtest'
collection_order: 40
---

> Sunsetting Truffle: Truffle has been sunsetted, see [Consensys Announcement](https://consensys.io/blog/consensys-announces-the-sunset-of-truffle-and-ganache-and-new-hardhat). Rootstock will no longer support and encourage immediate migration to [Hardhat](/tools/hardhat/).

# Step 4 : Compile and Deploy Contracts

Truffle provides a CLI (command line interface) which allows us to easily compile and deploy contracts, including a local blockchain like Ganache.

## View Contracts and Transactions in Ganache

If you link this Truffle project to Ganache, you will be able to see the contract creation transaction, and contract events in the Ganache GUI app. To link this Truffle project, do the following:

1. Enter Ganache setting screen by clicking the gear icon in the upper right corner
1. Click **Workspace** on the top navigation bar, and then click on **Add Project**
1. Pick the `truffle-config.js` file from `<tutorial-root>/truffle/truffle-config.js`
1. Save and Restart Ganache

![](/dist/images/add-ganache-1.png)

![](/dist/images/add-ganache-2.png)

![](/dist/images/add-ganache-3.png)

## Compiling Contracts

Change to the root of the truffle directory and then type the following command into a terminal

```shell
cd <tutorial-root>/truffle
npx truffle compile
```

Upon first run, all contracts will be compiled. Upon subsequent runs, Truffle will compile only the contracts that have been changed since the last compile.

Artifacts of the compilation will be placed in the `truffle/build/contracts` directory.

## Running Migrations

Migrations are JavaScript files that help you deploy contracts to the blockchain network. In this tutorial project, we have already created migration scripts in the migrations folder.

We have previously edited the migration script for the EIP20 token contract (`3_deploy_tokens.js`), which should now look like this:

```javascript
const EIP20 = artifacts.require('./EIP20.sol');

module.exports = (deployer) => {
  deployer.deploy(EIP20, 10000, 'Simon Bucks', 1, 'SBX');
};
```

To run the migrations, run the following command in a terminal

```shell
truffle migrate --reset --network regtest
```

Note that the `--network regtest` parameter tells Truffle to deploy this contract on our local Regtest node.

The migration process may take several minutes depending on the block generation speed. You may want to run it twice to avoid a known issue with Truffle ([#2224](https://github.com/trufflesuite/truffle/issues/2224)).
