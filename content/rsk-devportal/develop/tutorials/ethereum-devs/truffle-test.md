---
menu_title: Hardhat test
layout: rsk
title: Testing smart contracts using Hardhat
tags: tutorial, rsk, hardhat, test
description: "How to create and run tests on your RSK smart contracts using Hardhat."
render_features: "custom-terminals"
---

In this tutorial, I will show you step-by-step how to create and run tests on smart contracts using the Hardhat framework connected to an RSK local node.

# Overview

Here is a summary of the steps to be taken:

1. Installation requirements;
2. Run a RSK local node (regtest);
3. Create the Register project;
4. Configure Hardhat;
5. Create a smart contract;
6. Compile;
7. Testing without deploy;
8. Deploy on RSK local node;
9. Testing a deployed smart contract; 

# Requirements

1. POSIX compliant shell
2. Java
3. Node.js and npm
4. Editor: Visual Studio Code (VSCode) or another editor of your choice
5. Hardhat

All requirements are explained in detail in the tutorial link below:

* [Setup a project with Hardhat](/tutorials/ethereum-devs/setup-hardhat/)

# RSK Local node - regtest

When we develop a project using Hardhat, we need a blockchain node running locally. This is better for development and for running tests. We'll run a local node, also known as regtest.

There are several ways to set up an RSK local node. For instructions on downloading a JAR file and running it using the Java SDK, check out the tutorial:

* [Setup a project with Hardhat](/tutorials/ethereum-devs/setup-hardhat/)

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
2. Initialize an empty Hardhat  project;
3. Initialize an npm project

```shell
mkdir Register
cd Register
npx hardhat init
npm init -y
```

If you would like more details about this step, you can see the tutorial previously mentioned:

* [Setup a project with Hardhat and OpenZeppelin](/tutorials/ethereum-devs/setup-hardhat-oz/)

Open the project in VS Code.

```shell
code .
```

# Configure Hardhat to connect to RSK local node

Open `hardhat.config.js` file in your Hardhat project and overwrite it with the following code:

```javascript
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 33 // This is the RSK regtest chain ID
    },
    rskLocal: {
      url: "http://127.0.0.1:4444/",
      chainId: 33 // This is the RSK regtest chain ID
    }
  }
};
```

This configuration sets up Hardhat to connect to the RSK local node for deployment and testing purposes. It specifies the Solidity version to use for compiling your contracts and configures the `rskLocal` network with the URL of your running RSK local node and its chain ID.

Check out the VS Code image:

![truffle-config](/assets/img/tutorials/truffle-test/image-04.png)

# Smart contract Register.sol

In your terminal, inside the project folder, create a new file under the `contracts` directory named `Register.sol`. You can use the following command or create the file directly from your text editor:

```shell
touch contracts/Register.sol
```
Now, open the Register.sol file in your text editor and overwrite it with the following Solidity code:

```javascript
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

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

This smart contract includes:

- A private state variable `info` to store a string.
- A function `setInfo(string memory _info)` that allows writing a new string to the `info` variable.
- A function `getInfo()` that reads and returns the current value of the `info` variable.

This simple contract serves as a basic example of how to write and read to a state variable in Solidity.

![VS Code Register.sol](/assets/img/tutorials/truffle-test/image-06.png)

# Compile the smart contract

To compile your smart contract using Hardhat, run the following command in the terminal:

```shell
npx hardhat compile
```

You should see output similar to this, indicating that your contract has been compiled successfully:

```
Compiling 1 file with 0.8.4
Compilation finished successfully
```
This process compiles the `Register.sol` contract, and the output will be stored in the `artifacts` directory of your project. Hardhat automatically handles the compilation process, looking for Solidity files in the `contracts` folder, compiling them according to the Solidity version specified in `hardhat.config.js`, and saving the compiled artifacts.

# Testing without deployment

To test a smart contract that hasn't been deployed to any network using Hardhat, follow these steps:

1. In the `test` folder of your project, create a file named `register_new.js`.
2. Copy and paste the following test code into `register_new.js`:

```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Register contract", function () {
  it("Should store and retrieve information", async function () {
    const Register = await ethers.getContractFactory("Register");
    const register = await Register.deploy();
    await register.deployed();

    // Set information to "RSK"
    await register.setInfo("RSK");
    // Get stored information
    const storedInfo = await register.getInfo();

    expect(storedInfo).to.equal("RSK");
  });
});
```

This test script does the following:

- It uses Hardhat's `ethers` library to interact with Ethereum and its testing environment.
- The `describe` block groups together the "Register contract" tests.
- Inside the `describe` block, the `it` function defines a single test, "Should store and retrieve information".
- The test deploys a new instance of the `Register` contract, then calls the `setInfo` function to store the string "RSK".
- It retrieves the stored information using `getInfo` and asserts that the stored information is equal to "RSK".

1. To run the tests, use the following command in the terminal:

```shell
npx hardhat test
```

After running this command, you should see output indicating that the test has passed, demonstrating that the smart contract's `setInfo` and `getInfo` functions are working as expected, without having deployed the contract to any blockchain network.

# Deploy on RSK local node

To deploy your smart contract to the RSK local node using Hardhat, follow these steps:

## Create the deployment script

1. In the `scripts` folder of your Hardhat project, create a file named `deploy.js`.
2. Copy and paste the following deployment script into `deploy.js`:

```javascript
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Register = await ethers.getContractFactory("Register");
  const register = await Register.deploy();

  console.log("Register contract deployed to:", register.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

This script does the following:

- Retrieves the deployer's address from the Hardhat's runtime environment.
- Uses the `ethers` library, which is automatically available in the Hardhat environment, to get the `Register` contract factory.
- Deploys the `Register` contract and logs its address to the console.

## Deploy the contract

1. To deploy the contract to the RSK local node, run the deploy script using Hardhat:

```shell
npx hardhat run scripts/deploy.js --network rskLocal
```

This command specifies that you want to run the `deploy.js` script on the `rskLocal` network, which you should have defined in your `hardhat.config.js` file.

After running the command, you will see output similar to the following, indicating that your contract has been deployed:

```
Deploying contracts with the account: [Deployer's Address]
Register contract deployed to: [Register Contract Address]
```

This output confirms that the `Register` contract has been successfully deployed to your local RSK node.

# Testing a deployed smart contract

To test a deployed smart contract using Hardhat, follow these steps:

1. Inside your Hardhat project, ensure you have a test file for the `Register` contract. If not, create a new `test` file in the test folder. You can name it `register_deployed.js` for clarity.

2. Copy and paste the following test code into register_deployed.js:


```javascript
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Register contract", function () {
  let register;
  let deployer;

  before(async function () {
    // Deploy the contract before running tests
    const Register = await ethers.getContractFactory("Register");
    register = await Register.deploy();
    await register.deployed();

    [deployer] = await ethers.getSigners();
  });

  it("Should store and retrieve information", async function () {
    // Set information to "RSK"
    await register.setInfo("RSK");
    // Get stored information
    const storedInfo = await register.getInfo();

    expect(storedInfo).to.equal("RSK");
  });
});
```

This test script does the following:

- In the `before` hook, it deploys a new instance of the `Register` contract before the tests are run.

- The `it` function defines a single test, "Should store and retrieve information", which interacts with the deployed contract to test its functionality.

To run this specific test file, use the following command in the terminal:

```shell
npx hardhat test test/register_deployed.js
```

This command tells Hardhat to execute only the tests contained in the `register_deployed.js` file.

After running this command, you should see output indicating that the test has passed, which confirms that the deployed `Register` contract's `setInfo` and `getInfo` functions are working as expected.

# Final considerations

This tutorial guided you through using Hardhat to deploy and test smart contracts on an RSK local node. You can take advantage of Hardhat's built-in functionalities and plugins to enhance your smart contract development workflow.

RSK combines the benefits of smart contract functionality with the security and capabilities of the Bitcoin network. Exploring these possibilities can lead to innovative decentralized applications.

We hope this tutorial was useful and encourage you to share your feedback and results. If you found this guide helpful, feel free to share it with your community!
