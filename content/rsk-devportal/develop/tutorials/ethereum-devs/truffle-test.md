---
menu_title: Truffle test
layout: rsk
title: Testing smart contracts using Truffle
tags: tutorial, rsk, truffle, test
description: "How to create and run tests on your RSK smart contracts using Truffle."
render_features: "custom-terminals"
---

> Sunsetting Truffle: Truffle has been sunsetted, see [Consensys Announcement](https://consensys.io/blog/consensys-announces-the-sunset-of-truffle-and-ganache-and-new-hardhat). Rootstock will no longer support Truffle and encourage immediate migration to [Hardhat](/tools/hardhat/).

In this tutorial, I will show you step-by-step how to create and run tests in smart contracts using Truffle framework connected to an RSK local node.

# Overview

Here is a summary of the steps to be taken:

1. Installation requirements;
2. Run a RSK local node (regtest);
3. Create the Register project;
4. Configure Truffle framework;
5. Create a smart contract;
6. Compile;
7. Testing without deploy;
8. Deploy on RSK local node;
9. Testing a deployed smart contract; 

## Translations

This article is also available in
[Português](https://rsk.solange.dev/#/pt/truffle-tests/readme "Testando smart contracts utilizando Truffle na rede RSK").

# Requirements

1. POSIX compliant shell
2. Java
3. Editor: Visual Studio Code (VSCode) ou outro editor de sua escolha
4. Truffle

All requirements are explained in detail in the tutorial link below:

* [Setup a project with Truffle and OpenZeppelin](/tutorials/ethereum-devs/setup-truffle-oz/)

# RSK Local node - regtest

When we develop a project using Truffle Framework, we need a blockchain node running locally. This is better for development, and running tests. We'll run a local node, also known as regtest.

There are several ways to set up an RSK local node. To know how to download a JAR file and run it using the Java SDK, check out the tutorial: 

* [Setup a project with Truffle and OpenZeppelin](/tutorials/ethereum-devs/setup-truffle-oz/)

## Run

To run the node:

[](#top "multiple-terminals")
- Linux, Mac OSX
  ```shell
  $ java -cp <PATH-TO-THE-RSKJ-JAR> -Drpc.providers.web.cors=* co.rsk.Start --regtest
  ```
- Windows
  ```windows-command-prompt
  C:\> java -cp <PATH-TO-THE-RSKJ-JAR> -Drpc.providers.web.cors=* co.rsk.Start --regtest
  ```

Replace `<PATH-TO-THE-RSKJ-JAR>` with your path to the JAR file. As an example:

[](#top "multiple-terminals")
- Linux, Mac OSX
  ```shell
  $ java -cp C:/RskjCode/rskj-core-3.1.0-IRIS-all.jar -Drpc.providers.web.cors=* co.rsk.Start --regtest
  ```
- Windows
  ```windows-command-prompt
  C:\> java -cp C:\RSK\node\rskj-core-3.1.0-IRIS-all.jar -Drpc.providers.web.cors=* co.rsk.Start --regtest
  ```

If you see no output - that is a good thing:
Its output is directed to a log file.

**Important:**

> Do not close this terminal/console window,
> if closed the local node will stop running.

# Create the register project


1. Create a new folder named `Register`, and navigate to the folder in the terminal;
2. Initialize an empty Truffle project;
3. Initialize an npm project

```shell
mkdir Register
cd Register
truffle init
npm init -y
```

If you would like more details about this step, you can see the tutorial previously mentioned:

* [Setup a project with Truffle and OpenZeppelin](/tutorials/ethereum-devs/setup-truffle-oz/)

Open the project in VS Code.

```shell
code .
```

# Configure Truffle to connect to RSK local node

Open `truffle-config.js` file in your Truffle project and overwrite it with the following code:

```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 4444,
      network_id: "*"
    },
  },
  compilers: {
    solc: {
      version: "0.5.16",
    }
  }
}
```

Check out the VS Code image:

![truffle-config](/assets/img/tutorials/truffle-test/image-04.png)

# Smart contract

In your terminal, inside the project folder, run this command:

```shell
truffle create contract Register
```

This command creates a 'skeleton' smart contract. See the results in the `contracts` folder:

![truffle create contract Register](/assets/img/tutorials/truffle-test/image-05.png)

Overwrite it with the following code:

```javascript
pragma solidity 0.5.16;

contract Register {
    string private info;

    function setInfo(string memory _info) public {
        info = _info;
    }

    function getInfo() public view returns (string memory) {
        return info;
    }
}
```

Check out the VS Code image:

![VS Code Register.sol](/assets/img/tutorials/truffle-test/image-06.png)

## Register.sol

This smart contract has:

* A variable `info` to store a string
* A function `getInfo()` to return the string stored at variable info
* A function `setInfo()` to change the string stored at variable info

# Compile the smart contract

Run this command in the terminal:

```
truffle compile
```

```windows-command-prompt
C:\RSK\Register>truffle compile

Compiling your contracts...
===========================
> Compiling .\contracts\Migrations.sol
> Compiling .\contracts\Register.sol
> Artifacts written to C:\RSK\Register\build\contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang

C:\RSK\Register>
```

# Testing without deployment

It is possible to test a smart contract which is not published in any network yet.

In the `test` folder, create a file named `register_new.js`

Copy and paste this source code:

```javascript
const Register = artifacts.require('Register');
 
contract('Test new Register', (accounts) => {
  it('should store an information', async () => {
    const RegisterInstance = await Register.new();
    // Set information "RSK"
    await RegisterInstance.setInfo("RSK", { from: accounts[0] });
    // Get information value
    const storedData = await RegisterInstance.getInfo();
    assert.equal(storedData, "RSK", 'The information RSK was not stored.');
  });
});
```

Check out the VS Code image:

![VSCode register_new](/assets/img/tutorials/truffle-test/image-08.png)

> To do tests in a smart contract which is not published in any network, use `.new()`. It will create a new smart contract instance for run the tests.

## Running tests

In the terminal, run this command:

```
truffle test
```

Check out the result:

![truffle test](/assets/img/tutorials/truffle-test/image-09.png)

Our test passed :)

# Deploy on RSK local node

Firstly, we need to create a file in the Truffle structure with instructions to deploy the smart contract.

## Create file 2_deploy_contracts.js

The `migrations` folder has JavaScript files that help you deploy contracts to the network.
More about [running migrations](https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations)

In the `migrations` folder, create the file `2_deploy_contracts.js`

Copy and paste this source code:

```javascript
const Register = artifacts.require("Register");

module.exports = function(deployer) {
  deployer.deploy(Register);
};
```

Check out the VS Code image:

![2_deploy_contracts.js](/assets/img/tutorials/truffle-test/image-10.png)

## Migrate

In the terminal, run this command:

```
truffle migrate
```

Since the default configuration of `truffle-config.js` is for a local node, it only takes a few seconds for the transactions of the publication of the smart contract to be included in the Blockchain.

The migrate command will compile the smart contract again if necessary.

```windows-command-prompt
C:\RSK\Register>truffle migrate

Compiling your contracts...
===========================
> Compiling .\contracts\Migrations.sol
> Compiling .\contracts\Register.sol
> Artifacts written to C:\RSK\Register\build\contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

First, it deploys the smart contract `Migrations.sol`, file generated by Truffle:

```windows-command-prompt
Starting migrations...
======================
> Network name:    'development'
> Network id:      33
> Block gas limit: 6800000 (0x67c280)

1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xafb91cbad70f3c5fde615b01e4a288b63919c68a6e84c69275e0898f4f07f2bb
   > Blocks: 0            Seconds: 0
   > contract address:    0x32c9e33F4D8FD5C763B6e6ee2f958A7048b20AbE
   > block number:        179468
   > block timestamp:     1593741541
   > account:             0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826
   > balance:             999999999999.424664
   > gas used:            188419 (0x2e003)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00376838 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00376838 ETH
```

And then it deploys our smart contract `Register.sol`:

```windows-command-prompt
2_deploy_contracts.js
=====================

   Deploying 'Register'
   --------------------
   > transaction hash:    0xa25ba50d5831e49c4e3e2a42bc1b3a92158ca57e30a8a72e171b3a3bfa35e7e4
   > Blocks: 0            Seconds: 0
   > contract address:    0xD156852128F3625d816F2d4257c0e961B1a0a33a
   > block number:        179472
   > block timestamp:     1593741545
   > account:             0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826
   > balance:             999999999999.41858098
   > gas used:            262150 (0x40006)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.005243 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:            0.005243 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.00901138 ETH
```

# Testing a deployed smart contract

Let's create a new test file for the published smart contract.

In the terminal, inside the project folder, run this command:

```shell
truffle create test Register
```

This command creates a `test` file, related to the smart contract `Register`, in the `test` folder. This file has a test that checks whether the published smart contract can be instantiated.

Check out the VS Code image:

![truffle create test Register](/assets/img/tutorials/truffle-test/image-14.png)

Let's replace the file with the instructions to execute the same tests we did before, but now for the `deployed` smart contract: 

```javascript
const Register = artifacts.require('Register');
 
contract('Test deployed Register', (accounts) => {
  it('should store an information', async () => {
    const RegisterInstance = await Register.deployed();
    // Set information "RSK"
    await RegisterInstance.setInfo("RSK", { from: accounts[0] });
    // Get information value
    const storedData = await RegisterInstance.getInfo();
    assert.equal(storedData, "RSK", 'The information RSK was not stored.');
  });
});
```

![Test deployed Register](/assets/img/tutorials/truffle-test/image-15.png)

## Running the test

The `truffle test` command performs tests on all files found in the` test` directory.
Now we have 2 files with tests.
To run tests on only one file, specify the name in the `test` directory.

We will run the tests of the `register.js` file. In the terminal, execute this command:

```
truffle test test/register.js
```

Check out the result:

![truffle test register.js](/assets/img/tutorials/truffle-test/image-16.png)

Our test passed again :)

# Final considerations

In this tutorial I showed you how to use the Truffle framework to run tests on smart contracts, connected to a RSK local node.

Our goal is to join forces and give options to people who believe in the power of smart contracts, and also believe in the security of Bitcoin, through RSK.

I hope this tutorial has been helpful and I’d appreciate your feedback. 
Happy with this tutorial? 
Share it if you like it :)
