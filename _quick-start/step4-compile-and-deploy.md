---
layout: rsk
title: Quick Start - Step 4
tags: quick-start, compile, deploy, regtest, truffle
description: 'quick start - compile smart contracts, deploy smart contracts to regtest'
collection_order: 40
---

# Step 4 : Compile and Deploy Contracts


## View Contracts and Transactions in Ganache

If you link this Truffle project to Ganache, you will be able to see the contract creation transaction, and contract events in the Ganache GUI app. To link this Truffle project, do the following:

1. Enter Ganache workspace creation screen by clicking the **New Workspace**/**Ethereum** button
2. Click the **Add Project** and pick the <tutorial-root>/truffle/truffle-config.js from the truffle-integration repository.
3. Eventually change the name of the project
4. Save by clicking the **Save Workspace** button: ganache load the project and start the blockchain.

![Enter Ganache](/dist/images/Enter-ganache.png)

![Load project config file](/dist/images/Load-project-ganache.png)

![Save Workspace](/dist/images/Save-project-ganache.png)

![Blockchain started](/dist/images/Blockchain-started-ganache.png)

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

Note that the `--network regtest` parameter tells Truffle to deploy this contract on our local RegNet node.

The migration process may take several minutes depending on the block generation speed. You may want to run it twice to avoid a known issue with Truffle ([#2224](https://github.com/trufflesuite/truffle/issues/2224)).
