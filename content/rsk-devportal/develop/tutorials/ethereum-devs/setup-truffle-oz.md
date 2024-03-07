---
menu_title: Setup a project with Hardhat and OpenZeppelin
layout: rsk
title: How to create a new project using Hardhat and OpenZeppelin connected to RSK network
tags: tutorial, rsk, openzeppelin, hardhat
description: "How to create a new blockchain project, using Hardhat framework and Open Zeppelin library connected to a RSK local node and RSK testnet"
render_features: "custom-terminals"
---

In this tutorial, I will show you step-by-step how to create a new blockchain project, using Hardhat framework and Open Zeppelin smart contracts library, connected to a RSK local node or RSK testnet.

It does not matter whether you are an experienced developer, or just learning to code, you do not need to be a blockchain expert to follow along.

# Overview

Here is a summary of the steps to be taken to build our project:

1. Installation requirements;
2. Run a RSK local node;
3. Initialize a project using Hardhat;
4. Install Open Zeppelin smart contracts in our project;
5. Install HD wallet provider;
6. Create a wallet mnemonic;
7. Configure Hardhat to connect to RSK networks;
8. Use Hardhat console;
9. Get some testnet RBTCs from the RSK faucet;

## Translations

This article is also available in
[Português](https://rsk.solange.dev/#/pt/setup-truffle-open-zeppelin/readme "Como criar um projeto utilizando Hardhat e OpenZeppelin conectado à rede RSK").

# Requirements

* POSIX compliant shell
* Curl
* Java
* Node.js and NPM (Node Package Manager)
* Code editor: Visual Studio Code (VSCode) or any other editor of your choice
* Hardhat

## POSIX compliant shell

The **Portable Operating System Interface (POSIX)** is a family of standards specified by the IEEE Computer Society for maintaining compatibility between operating systems. POSIX defines the application programming interface (API), along with command line shells and utility interfaces, for software compatibility with variants of Unix and other operating systems.
Source: [Wikepidia](https://en.wikipedia.org/wiki/POSIX)

* Mac OSX and Linux distributions: Use the standard terminal
* Windows: If you use the standard cmd terminal, or PowerShell, the commands here may not work.
  Consider installing [Git for Windows](https://gitforwindows.org/), which comes with Git Bash bundled.
  Here is a [tutorial on installing and using Git Bash](https://www.atlassian.com/git/tutorials/git-bash).

## cURL

This is a system command that is likely already installed on your system,
which allows you to make network requests, such as HTTP requests,
from your command line.

If `curl --version` displays an error,
[download curl](https://curl.haxx.se/download.html).

## Java

You will need Java 8 in order to run RSKj.

Check if you already have Java installed:

```shell
java -version
```

```windows-command-prompt
C:\>java version
java version "1.8.0_241"
Java(TM) SE Runtime Environment (build 1.8.0_241-b07)
Java HotSpot(TM) Client VM (build 25.241-b07, mixed mode)

C:\>
```

If `java -version` displays an error,
or displays a version other than 1.8,
you will need to install it.

### Install Java on Windows

Go to the official [Java download](https://www.java.com/en/download/) page,
download, and run the installer from there.

![Java Download](/assets/img/tutorials/setup-truffle-oz/image-02.png)

### Install Java on Mac OSX and Linux

There are a variety of ways to do this, and SDKman is one which allows you to install and switch between multiple versions as needed:

```shell
curl -s "https://get.sdkman.io/" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
# to get a filtered list of available java versions
sdk list java  | grep "8\." # copy a selection for use below

# install the version of java copied above
# (replace accordingly)
sdk install java 8.0.242.j9-adpt

# show installed versions, and switch to the selected one
# (replace accordingly)
sdk list java | grep installed
sdk use java 8.0.242.j9-adpt
java -version
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
v21.6.2

C:\>npm --version
10.2.4

C:\>
```

If there's no output like that in the image above, go to [Node.js](https://nodejs.org/en/) install.

Note that NPM is usually installed together with Node.js, so after installing Node.js, there's no need to install it separately.

If you want to have more than one version installed,
the most fuss-free way to install and manage multiple versions of `node` on your computer is [nvm](https://github.com/nvm-sh/nvm).

## Code editor

We need some software that is able to edit text files.
Preferably one that has support for syntax highlighting for both Solidity and Javascript.

[VS Code](https://code.visualstudio.com/) is a good choice if you don't already have one.

### Visual Studio Code (VS Code)

In this tutorial, we will use VS Code to create our project.

To use VS Code [download it here](https://code.visualstudio.com/download).

Verify if your VS Code installation was successful by typing the following command into the terminal:

```shell
code -v
```

![vscode version](/assets/img/tutorials/setup-truffle-oz/image-04.png)

## Hardhat

Hardhat is a cutting-edge development environment designed for Ethereum application development. It aims to bring developers a robust framework for building, testing, and deploying smart contracts with ease. Key features of Hardhat include advanced Ethereum Virtual Machine (EVM) manipulation and debugging, comprehensive testing libraries, and seamless network management.

Hardhat enhances the developer experience by allowing for the creation of local Ethereum networks, simulating how contracts interact in a real-world environment, and pinpointing errors with stack traces. This environment is particularly beneficial for intricate development workflows and offers detailed insights during the contract creation phase.

For more detailed information and documentation, visit:

[https://hardhat.org/](https://github.com/nvm-sh/nvm)

# RSK regtest (Local node)

When we develop a project using Hardhat Framework, we need a blockchain node running locally. This is better for development, and running tests. We'll connect to the RSK network via this local node.

There are several ways to set up a RSK local node. Here, we will download a JAR file and run it using the Java SDK that has been installed.

### Download

Go to the [releases page](https://github.com/rsksmart/rskj/releases) and click on the most recent to download it.

You need to click on the JAR file, in the end of the post about the lastest release.
It's name should be `rskj-core-*.jar`:

![Download last RSK release](/assets/img/tutorials/setup-truffle-oz/image-07.png)

### Verify authenticity

When installing and running the RSKj node,
it is always a good idea to verify that your copy is legitimate.

In the folder where you download the JAR file, go to a POSIX terminal and run this command:

```shell
sha256sum rskj-core-3.1.0-IRIS-all.jar
```

For this version, it looked like this:

```shell
43149abce0a737341a0b063f2016a1e73dae19b8af8f2e54657326ac8eedc8a0 *rskj-core-3.1.0-IRIS-all.jar
```

![Verify authenticity](/assets/img/tutorials/setup-truffle-oz/image-08.png)

> Note that if you are using Windows, you will need a POSIX compliant shell for this.
> See instructions [about using Git Bash](#posix-compliant-shell) above.

For more information about verifying that your copy is legitimate,
including signature verification, check out the
[full instructions](/rsk/node/security-chain/ "Verify authenticity of RskJ source code and its binary dependencies")
on how to do this.

### Run

To run the node:

```shell
java -cp <PATH-TO-THE-RSKJ-JAR> -Drpc.providers.web.cors=* co.rsk.Start --regtest
```

(Replace <PATH-TO-THE-RSKJ-JAR> with your path to the JAR file).

I am using a Windows OS and I saved the file at `C:\RSK\node`,
so for me the full path is `C:\RSK\node\rskj-core-3.1.0-IRIS-all.jar`.

The commands required to run the RSK node are:

#### On Windows terminal

```shell
java -cp C:\RSK\node\rskj-core-3.1.0-IRIS-all.jar -Drpc.providers.web.cors=* co.rsk.Start --regtest
```

#### Using Git Bash

```shell
java -cp C:/RSK/node/rskj-core-3.1.0-IRIS-all.jar -Drpc.providers.web.cors=* co.rsk.Start --regtest
```

#### On Linux and Mac

```shell
java -cp ~/RSK/node/rskj-core-3.1.0-IRIS-all.jar -Drpc.providers.web.cors=* co.rsk.Start --regtest
```

If you see no output - that is a good thing:
Its output is directed to a log file.

> Note the flag provided above: `-Drpc.providers.web.cors=*`
> This disables cross origin resource sharing protection,
> effectively allowing any web page to access it.
> As we want to make JSON-RPC requests from a browser,
> such as a DApp, we need this flag.

This is the result in the terminal in Windows OS:

![Run local node](/assets/img/tutorials/setup-truffle-oz/image-09.png)

**Important:**

> Do not close this terminal/console window,
> if closed the local node will stop running.

### Check if the node is running using cURL

Open a new terminal window.

Issue a JSON-RPC request to the RSK node's HTTP server.

This is an example using cURL:

```shell
curl localhost:4444/1.1.0/ -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

![local node eth_blockNumber](/assets/img/tutorials/setup-truffle-oz/image-10.png)

The response should look similar to this:

```json
{"jsonrpc":"2.0","id":1,"result":"0x2991b"}
```

The `result` property is the number of the latest block that has been synced. Note that this value (`0x2991b`) is the block number in hexadecimal (base 16), so the output above indicates that the current block number is `170267` in decimal (base 10).

* To get more information about this process:
  Check out [set up RSKj with Java](/rsk/node/install/java/).
* If you encounter any problems, check if your system meets the
  [minimum requirements](/rsk/node/install/requirements/).
* There are other ways to install an RSK node, in other supported platforms:
  Check out [installing RSKj](/rsk/node/install/).

# RSK Testnet - verify the connection

In addition to using the local node, we want to publish smart contracts to the testnet. Before it, let's check if the connection is working.

This is an example using cURL. Enter the following command into your terminal.

```shell
curl https://public-node.testnet.rsk.co/ -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

This is a very simple query that simply asks what the latest block number is.

You should receive a response similar to the following:

```json
{"jsonrpc":"2.0","id":1,"result":"0xc3f9b"}
```

![testnet eth_blockNumber](/assets/img/tutorials/setup-truffle-oz/image-11.png)

The result field is presented in hexadecimal. `0xc3f9b` is the block number, and it's decimal equivalent is: `802715`.
You can consult [testnet explorer](https://explorer.testnet.rsk.co/) and verify that it is the same result for block number.

![explorer testnet block number](/assets/img/tutorials/setup-truffle-oz/image-12.png)

# Initialize a Hardhat project

Create a new directory for your project. As an example, we'll name it `myproject`. Navigate to your desired location, such as `C:\RSK\` on Windows, and create the directory:

```shell
mkdir C:\RSK\myproject
cd C:\RSK\myproject
```

Your project will be located in `C:\RSK\myproject`.

## Initialize an npm Project

It's also recommended to initialize an npm project within your `myproject` folder to manage dependencies:

```shell
npm init -y
```

This creates a `package.json` file in your project directory.

## Starting with Hardhat

To get started with Hardhat, run the following command in your project's root directory:

```shell
npm install --save-dev hardhat
```

This command sets up your Hardhat project and prepares it for development. You'll be prompted to create a sample project, including configuration and sample scripts, to kick-start your development process.

Check the version of Hardhat installed with:

```shell
npx hardhat --version
```

![myproject folder](/assets/img/tutorials/setup-truffle-oz/image-13.png)

To initiate a Hardhat project in your `myproject` directory, enter the following command in the terminal:

```shell
npx hardhat init
```

Upon initialization, Hardhat will prompt you to create a sample project or start from scratch. Choose to create a sample project to automatically generate a basic project structure and configuration files.

## Explore the Project Structure

After initializing your Hardhat project, you can open the folder in an IDE like VS Code to see the file structure, which should include:

- `contracts/`: Directory for Solidity smart contracts.
- `scripts/`: Contains scripts for deployment and interaction with your contracts.
- `test/`: Directory for test files to test your contracts and scripts.
- `hardhat.config.js`: Hardhat's configuration file.

### Install OpenZeppelin Contracts

OpenZeppelin Contracts is a library of secure and community-reviewed smart contracts for Ethereum and other EVM and eWASM blockchains. To install OpenZeppelin Contracts in your project, use the following command:

```shell
npm install @openzeppelin/contracts
```

### Verify `package.json`

After installing your dependencies, open your `package.json` file to verify the installations. You should see `@openzeppelin/contracts` and the Hardhat-related packages listed under `dependencies` or `devDependencies`.

### Create a Wallet for Testnet Usage

For interacting with testnets, you'll need a wallet with testnet ETH. You can generate a new mnemonic (a 12-word seed phrase) for your wallet using online tools like iancoleman.io/bip39 for educational purposes or by using a secure wallet application like MetaMask.

### Store Your Mnemonic Securely

Create a file named .secret in your project directory and paste your mnemonic there. This file should be excluded from version control by adding it to your .gitignore file to keep your mnemonic safe.

With these steps, your Hardhat project setup is complete, and you're ready to start developing smart contracts and interacting with Ethereum networks.

## Configure Hardhat to Connect to RSK Regtest (local node)

In Hardhat, network configurations are managed within the `hardhat.config.js` file. To connect to the RSK regtest (local node), you will modify this configuration file accordingly.

If you haven't installed @nomiclabs/hardhat-ethers, do so by running:

```shell
npm install --save-dev @nomiclabs/hardhat-ethers ethers
```

Open your `hardhat.config.js` file and include the RSK regtest network configuration within the networks section. If you're starting from a default Hardhat setup, you might need to add the networks key to the module exports object.

Here's how to add the RSK regtest configuration:

```javascript
    require("@nomiclabs/hardhat-ethers");

    module.exports = {
      solidity: "0.8.4",
      networks: {
        rskRegtest: {
          url: "http://127.0.0.1:4444/",
          chainId: 33, // RSK regtest chainId
        }
      }
    };
```

This configuration specifies that the RSK regtest network is accessible through HTTP at 127.0.0.1 on port 4444, which is the default configuration for a local RSK node. The chainId for RSK regtest is 33. Make sure that your local RSK node is running and accessible at these settings.

After adding the configuration, your `hardhat.config.js` file should look similar to the example provided, albeit with possible differences in Solidity version or additional configurations depending on your project's requirements.

## Verify Network Configuration

To ensure that your configuration is correct and that Hardhat can connect to the RSK regtest network, you can run the following command:

```shell
npx hardhat networks
```

This command lists all configured networks in your Hardhat project. Verify that rskRegtest appears in the list with the correct settings.

## Interacting with the RSK Regtest Network

With the network configured, you can now deploy contracts, run scripts, and perform transactions on the RSK regtest network by specifying `--network rskRegtest` in your Hardhat commands. For example, to deploy a contract:

```shell
npx hardhat run scripts/deploy.js --network rskRegtest
```

This setup allows for a seamless development and testing workflow on the RSK regtest network, facilitating Ethereum-compatible smart contract development with Hardhat on the RSK blockchain.

![network development](/assets/img/tutorials/setup-truffle-oz/image-24.png)

## Get the current gas price of testnet

First, ensure you have fs (File System module in Node.js) required at the top of your hardhat.config.js file to read from the filesystem:

```javascript
const fs = require('fs');
```

Next, insert the code snippet for reading the gas price from `.gas-price-testnet.json` into your hardhat.config.js. You'll adjust the code to fit into the Hardhat's module exports structure. Here’s how you can integrate it:

```javascript
require("@nomiclabs/hardhat-ethers");

const fs = require('fs');

let gasPriceTestnet = 0;

try {
  const gasPriceTestnetRaw = fs.readFileSync(".gas-price-testnet.json").toString().trim();
  gasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result, 16);
  if (isNaN(gasPriceTestnet)) {
    throw new Error('The gas price is not a number.');
  }
  console.log("Gas price Testnet: " + gasPriceTestnet);
} catch (error) {
  console.error(`Failed to read gas price from .gas-price-testnet.json: ${error}`);
}

module.exports = {
  solidity: "0.8.4",
  networks: {
    // Your network configurations
  }
};
```

This code tries to read and parse the gas price from `.gas-price-testnet.json`. If successful, it prints the gas price to the console. If there's any error (e.g., file not found, content not as expected), it catches the error and prints an error message.

## Configure Hardhat to connect to RSK testnet

After successfully reading the gas price, you can use it in your network configurations. Modify the networks section in `hardhat.config.js` to include the gas price for the relevant network configuration.

First, make sure you are securely managing your mnemonic. One common approach is to use a .env file and dotenv package. If you choose this method, first install dotenv:

```shell
npm install --save-dev dotenv
```

Then, create a .env file at the root of your project (this file should be added to your .gitignore to keep your mnemonic secure) and add your mnemonic:

```makefile
MNEMONIC=your_mnemonic_here
```

Next, modify your hardhat.config.js to use the .env file and configure the RSK testnet connection:

```javascript
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const { MNEMONIC } = process.env;

module.exports = {
  solidity: "0.8.4",
  networks: {
    testnet: {
      url: 'https://public-node.testnet.rsk.co/',
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 31,
      gasPrice: Math.floor(gasPriceTestnet * 1.1),
      timeout: 2000000 // Increase network check timeout if needed
    }
  }
};
```

This configuration uses the mnemonic from your .env file to generate accounts for transactions on the RSK testnet. The gasPrice is set dynamically based on your previously defined gasPriceTestnet variable, increasing it by 10% as suggested. The timeout parameter has been adjusted to 2000000 to accommodate the networkCheckTimeout equivalent in Hardhat, which might be necessary in some network conditions.

## Hardhat config with local and testnet RSK networks

This is the final `hardhat.config.js` file with configurations for both networks:

```javascript
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const fs = require('fs');

const { MNEMONIC } = process.env;

let gasPriceTestnet = 0;

try {
  const gasPriceTestnetRaw = fs.readFileSync(".gas-price-testnet.json").toString().trim();
  gasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result, 16);
  if (isNaN(gasPriceTestnet)) {
    throw new Error('The gas price is not a number.');
  }
  console.log("Gas price Testnet: " + gasPriceTestnet);
} catch (error) {
  console.error(`Failed to read gas price from .gas-price-testnet.json: ${error}`);
}

module.exports = {
  solidity: "0.8.4",
  networks: {
    development: {
      url: "http://127.0.0.1:4444/",
      chainId: 33, // Use appropriate chainId for RSK local
    },
    testnet: {
      url: 'https://public-node.testnet.rsk.co/',
      accounts: { mnemonic: MNEMONIC },
      chainId: 31,
      gasPrice: Math.floor(gasPriceTestnet * 1.1),
      timeout: 2000000 // Increase network check timeout if needed
    }
  }
}
```

Check out the VS Code image too:

![truffle-config](/assets/img/tutorials/setup-truffle-oz/image-27.png)

# Hardhat console connected to RSK network

Hardhat has its own console to run commands, and can be connected on any network previously configured in `hardhat.config.js` file.

## Connect to RSK regtest (local node)

Let's open a Hardhat console to connect to our local node. To start the Hardhat console connected to the RSK network (or any other configured network), you can use the --network flag followed by the name of the network you've configured in your hardhat.config.js file. For example, to connect to the RSK Testnet, you would run:

```shell
npx hardhat console --network testnet
```

![Truffle console development](/assets/img/tutorials/setup-truffle-oz/image-28.png)

This command starts an interactive session where you can execute commands and interact with your smart contracts deployed on the RSK Testnet. Here are a few examples of what you can do within the Hardhat console:

```javascript
const Greeter = await ethers.getContractFactory("Greeter");
const greeter = await Greeter.deploy("Hello, Hardhat!");
await greeter.deployed();
console.log("Greeter deployed to:", greeter.address);
```

Interact with a deployed contract:

```javascript
const greeter = await ethers.getContractAt("Greeter", "YOUR_DEPLOYED_CONTRACT_ADDRESS");
const greeting = await greeter.greet();
console.log(greeting);
```

Send transactions and query balances:

```javascript
const [owner] = await ethers.getSigners();
const balance = await owner.getBalance();
console.log("Balance:", balance.toString());
```

## Connect to RSK testnet

Thus far we have only connected to a blockchain that runs using just 1 node, that runs on your own computer.

Let's now switch to interacting with a "real" blockchain, which is running on multiple nodes distributed across multiple computers!

To connect Hardhat console in another network, you need to specify the network:

Open up a new terminal.

In the new terminal, inside the `myproject` folder, run this command:

```shell
npx hardhat console --network testnet
```

It takes a little longer to establish this connection when compared to the local node.
This will open a new console:

![truffle console network testnet](/assets/img/tutorials/setup-truffle-oz/image-29.png)

## Test the connection to RSK network

On any of the networks, run this commands in the Hardhat console:

### Block number

Shows the last block number.

```javascript
(await ethers.provider.getBlockNumber()).toString()
```

![getBlockNumber](/assets/img/tutorials/setup-truffle-oz/image-30.png)

### Network ID

To get the network ID, run this command:

```javascript
(await ethers.provider.getNetwork()).chainId.toString()
```

For the local node, the network ID is `33`.

![getId local](/assets/img/tutorials/setup-truffle-oz/image-31.png)

And for testnet, it is `31`.

![getId testnet](/assets/img/tutorials/setup-truffle-oz/image-32.png)

## Exit Hardhat console

In the Hardhat console, enter this command to exit the terminal:

```shell
.exit
```

```shell
Ctrl+C
```

![exit Truffle console](/assets/img/tutorials/setup-truffle-oz/image-33.png)

# Get addresses

We will use a special instruction in Hardhat console to get the first 10 addresses in our hierarchical deterministic wallet for the RSK Testnet network, that are generated from our mnemonic.

In the terminal, inside the `myproject` folder, go to the Hardhat console connected to testnet:

```shell
npx hardhat console --network testnet
```

And run this command to save the addresses at variable `accounts`:

```javascript
// Import ethers from the Hardhat environment
const ethers = hre.ethers;

// Define the mnemonic. For security, use environment variables or another secure method in production.
const mnemonic = "test test test test test test test test test test test junk";

// Define the number of addresses to generate
const numberOfAccounts = 10;

// Generate addresses
const accounts = Array.from({ length: numberOfAccounts }, (_, i) =>
  ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i}`).address
);

// List the generated addresses
console.log(accounts);
```

![list accounts](/assets/img/tutorials/setup-truffle-oz/image-34.png)

## Check balance

To check the balance of an account, for example, the first account of our list (`account[0]`), run this command in Hardhat console:

```javascript
const balance = await ethers.provider.getBalance(accounts[0])
console.log(ethers.utils.formatEther(balance))
```

![getBalance accounts 0](/assets/img/tutorials/setup-truffle-oz/image-37.png)

The balance is 0 and we need some tRBTC to pay gas fees,
which will be used to publish smart contracts and interact with them.
We shall obtain some in the next step.

# TestNet Faucet

You can get some tRBTC from the [RSK Testnet faucet](https://faucet.testnet.rsk.co/).

Copy the first address from `.accounts` file. In my case, it is

```
0xe16f6abdd5815f3d24b4e5c29138f863933b000a
```

Enter your wallet address and pass the CAPTCHA.

![faucet.testnet.rsk.co](/assets/img/tutorials/setup-truffle-oz/image-38.png)

Wait a few seconds…

![Wait a few seconds](/assets/img/tutorials/setup-truffle-oz/image-39.png)

![Received some RBTCs](/assets/img/tutorials/setup-truffle-oz/image-40.png)

You can see the transaction hash:

[0x4a2bf1f65c525219020c3a1215a29453c20f4ced90575d9a7d13f8fe666d05b4](https://explorer.testnet.rsk.co/tx/0x4a2bf1f65c525219020c3a1215a29453c20f4ced90575d9a7d13f8fe666d05b4)

Now I have 0.05 RBTC!

## Recheck balance

To check balance again, run this command in the Hardhat console:

```javascript
const balance = await ethers.provider.getBalance(accounts[0])
console.log(ethers.utils.formatEther(balance))
```

![getBalance accounts 0 again](/assets/img/tutorials/setup-truffle-oz/image-41.png)

Great! Now I have 50000000000000000, which means that I have 0.05 tRBTC with 18 decimal places of precision.

# Where to go from here

At this point, we have installed all requirements and created a project using Hardhat framework and Open Zeppelin smart contracts library,
connected to both an RSK local node (Regtest) and the RSK Testnet.

We have not developed anything yet,
but you are now ready to move on to the next tutorials,
where we will develop some very cool projects!

Choose any of these to tutorials to begin:

- [Create your first Token](https://developers.rsk.co/tutorials/tokens/create-a-token/)
- [Petshop](https://developers.rsk.co/tutorials/truffle-boxes/pet-shop-box/)
- [Create your own collectable token](https://developers.rsk.co/tutorials/tokens/create-a-collectable-token/)
