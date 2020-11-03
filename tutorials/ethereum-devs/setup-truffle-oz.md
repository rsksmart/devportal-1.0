---
layout: rsk
title: How to create a new project using Truffle and OpenZeppelin connected to RSK network
tags: tutorial, rsk, openzeppelin, truffle
description: "How to create a new blockchain project, using Truffle framework and Open Zeppelin library connected to a RSK local node and RSK testnet"
render_features: "custom-terminals"
---

In this tutorial, I will show you step-by-step how to create a new blockchain project, using Truffle framework and Open Zeppelin smart contracts library, connected to a RSK local node or RSK testnet.

It does not matter whether you are an experienced developer, or just learning to code, you do not need to be a blockchain expert to follow along.

# Overview

Here is a summary of the steps to be taken to build our project:

1. Installation requirements;
2. Run a RSK local node;
3. Initialize a project using Truffle;
4. Install Open Zeppelin smart contracts in our project;
5. Install HD wallet provider;
6. Create a wallet mnemonic;
7. Configure Truffle to connect to RSK networks;
8. Use Truffle console;
9. Get some testnet R-BTCs from the RSK faucet;

## Translations

This article is also available in
[Português](https://solange.dev/2020/2020-05-10-Rsk-SetupTruffleOZ/ "Como criar um projeto utilizando Truffle e OpenZeppelin conectado à rede RSK").

# Requirements

* POSIX compliant shell
* Curl
* Java
* Node.js and NPM (Node Package Manager)
* Code editor: Visual Studio Code (VSCode) or any other editor of your choice
* Truffle

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
v10.16.3

C:\>npm --version
v6.9.0

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

## Truffle

Truffle is a popular development framework with a mission to make smart contract development easier for developers. Amongst its features, it has a smart contract lifecycle management, scriptable deployment & migrations, automated contract testing and simple network management.

It also makes developing on RSK easier, with the ability to configure custom networks for RSK.

To install Truffle, input the command below into the terminal and press `enter` at your project location:

```shell
npm install -g truffle
```

![truffle install](/assets/img/tutorials/setup-truffle-oz/image-05.png)

When the installation is finished, close the terminal, open it again and check the Truffle version:

```shell
truffle version
```

![truffle version](/assets/img/tutorials/setup-truffle-oz/image-06.png)

For more info:

[trufflesuite.com/truffle](https://www.trufflesuite.com/truffle)

# RSK regtest (Local node)

When we develop a project using Truffle Framework, we need a blockchain node running locally. This is better for development, and running tests. We'll connect to the RSK network via this local node.

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
sha256sum rskj-core-2.0.1-PAPYRUS-all.jar
```

For this version, it looked like this:

```shell
43149abce0a737341a0b063f2016a1e73dae19b8af8f2e54657326ac8eedc8a0 *rskj-core-2.0.1-PAPYRUS-all.jar
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
so for me the full path is `C:\RSK\node\rskj-core-2.0.1-PAPYRUS-all.jar`.

The commands required to run the RSK node are:

#### On Windows terminal

```shell
java -cp C:\RSK\node\rskj-core-2.0.1-PAPYRUS-all.jar -Drpc.providers.web.cors=* co.rsk.Start --regtest
```

#### Using Git Bash

```shell
java -cp C:/RSK/node/rskj-core-2.0.1-PAPYRUS-all.jar -Drpc.providers.web.cors=* co.rsk.Start --regtest
```

#### On Linux and Mac

```shell
java -cp ~/RSK/node/rskj-core-2.0.1-PAPYRUS-all.jar -Drpc.providers.web.cors=* co.rsk.Start --regtest
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
curl https://public-node.testnet.rsk.co/2.0.1/ -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
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

# Initialize a Truffle project

We have two options for initializing a project:

1. An empty project
2. A project based in a Truffle Box

## 1 - Initialize an empty Truffle project

Create a new folder. For example, `myproject`, and navigate to the folder in the terminal.

```shell
mkdir myproject
cd myproject
```

For example, I will create a folder at this location - `C:\RSK\` (I'm using Windows).

My project can be located in the folder `C:\RSK\myproject`.

![myproject folder](/assets/img/tutorials/setup-truffle-oz/image-13.png)

In your project folder, start an Truffle project by typing the command below into the terminal:

```shell
truffle init
```

![truffle init](/assets/img/tutorials/setup-truffle-oz/image-14.png)

Open the folder in VS Code to view the file structure like this:

![truffle file structure](/assets/img/tutorials/setup-truffle-oz/image-15.png)

* `./contracts`: All our smart contracts will be stored in this folder.
* `./migrations`: Deployment scripts will be stored in this folder.
* `./test`: Test scripts will be stored in this folder.
* `./truffle-config.js`: This is Truffle's configuration file used to configure networks, including RSK networks.

Note that the following files were also created:

* `Migrations.sol`: Keeps track of which migrations were done on the current network.
* `1_initial_migration.js`: Deployment instructions for `Migrations.sol`.

### Initialize an npm project

When we initialize an empty Truffle project, we also need to initialize an npm project.

Start an npm project in the `myproject` folder by typing the following commands below into the terminal:

```shell
npm init -y
```

![npm init](/assets/img/tutorials/setup-truffle-oz/image-16.png)

## 2 - Initialize a project based in a Truffle Box

> Note: Only do this if you have not done option 1.

Truffle Boxes are templates.
In addition to Truffle,
Truffle Boxes can contain other helpful modules, such as Solidity smart contracts, libraries, front-end views, and more.

In option 1, when we use `truffle init`, we used a special kind of truffle box.

We have some of them already configured for RSK, [check the RSK truffle boxes](/tools/truffle/boxes/).

## Install Open Zeppelin

Open Zeppelin Contracts is a set of libraries of Solidity smart contracts for Ethereum and other blockchains.
These libraries will install not only the main libraries required for our token,
but also libraries for ownership, safe math, and many other utilities.
It's worth mentioning that these libraries have been reviewed and audited to accomplish high standards of security,
so contracts that depend on them are less susceptible to hacking when used correctly.

In the terminal, inside `myproject` folder, install Open Zeppelin libraries using this command:

```shell
npm install -E @openzeppelin/contracts@2.5.0
```

The option `-E` is to save dependencies with an exact version rather than the latest version published on npm.

![openzeppelin install](/assets/img/tutorials/setup-truffle-oz/image-17.png)

> Some contracts may change over time, so it is important to set the version. This tutorial was written using this specific version.

For more info:

[openzeppelin.com/contracts](https://openzeppelin.com/contracts/)

# Install HD wallet provider

To connect to the RSK network, we are going to use a provider that allows us to connect to any network by unlocking an account locally. We are going to use `@truffle/hdwallet-provider`.
This can be used to sign transactions for addresses derived from a 12 or 24 word mnemonic.

> You need to have Node >= 7.6 installed.

In the terminal, inside the `myproject` folder, install the HD wallet provider with this command:

```shell
npm install -E @truffle/hdwallet-provider@1.0.34
```

![hd wallet provider install](/assets/img/tutorials/setup-truffle-oz/image-18.png)

This `truffle package` comes with many dependencies,
and so can take a long time to complete.
A successful installation message is shown if everything works fine.

![hd wallet provider successful installation](/assets/img/tutorials/setup-truffle-oz/image-19.png)

# Check package.json

`package.json` is a file created by npm with some configurations,
including the packages which we installed before using the command `npm init -y`.

After the installations,
I will open the project folder named `myproject` in VS Code and verify the file `package.json`.
Let's take a look at the dependencies in the file:

![package.json](/assets/img/tutorials/setup-truffle-oz/image-20.png)

# Create a wallet

To use testnet, we need tR-BTC and an address to store them.
The best way is to create a wallet from a mnemonic, using the pattern defined at [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)

There are a few ways to do this.

One is to create using a web wallet, such as [Metamask](https://metamask.io/) or [Nifty](https://www.poa.network/for-users/nifty-wallet) wallet.
These wallets generate the mnemonic for you.
If you wanted to create using Metamask, you can get the instructions here:

- [using Remix and Metamask with RSK testnet](/tutorials/ethereum-devs/remix-and-metamask-with-rsk-testnet/)

## iancoleman.io/bip39

Another way is using this web app:

[iancoleman.io/bip39](https://iancoleman.io/bip39/)

> Note: In this tutorial, the method used to store the mnemonic is not recommended to be used for any 'real' wallet because it's not secure enough to generate a private key in a website, however we will use this here for learning purposes, and because we're using the Testnet, so no real amounts are at stake.

In the `Generate a random mnemonic` field, select `12 words` and click on the `generate` button.

![Generate a random mnemonic](/assets/img/tutorials/setup-truffle-oz/image-21.png)

The result appears in the `BIP39 Mnemonic` field.
They should be 12 random words like the words in the image:

![BIP39 Mnemonic](/assets/img/tutorials/setup-truffle-oz/image-22.png)

My mnemonic is:

```
energy knife ice mouse merge track cram brown decorate atom rule virus
```

Copy these 12 words, we'll use it later in this tutorial.

## mnemonics module

Another alternative is using package [mnemonics](https://github.com/itinance/mnemonics),
which is a simple utility that can be used to generate [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) mnemonics.

To install `mnemonics` globally, input the command below into the terminal and press `enter` at your project location:

```shell
npm install -g mnemonics@1.1.3
```

Use this to generate a 12-word BIP39 mnemonic, by entering this command:

```shell
mnemonics > .secret
```

This saves a new mnemonic in the file named `.secret`, which is the next step.

# Create .secret file

In the terminal, inside the `myproject` folder, create a file named `.secret`.

Do you remember your mnemonic?
Paste your mnemonic in this file and save it.

![dot secret](/assets/img/tutorials/setup-truffle-oz/image-23.png)

# Configure Truffle to connect to RSK networks

Open `truffle-config.js` file in your Truffle project and overwrite it with the following code:

```javascript
const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
if (!mnemonic || mnemonic.split(' ').length !== 12) {
  throw new Error('unable to retrieve mnemonic from .secret');
}

module.exports = {
  networks: {
  },
  compilers: {
    solc: {
    }
  }
}
```

The `hdwallet-provider` allows us to connect to any network by unlocking an account locally, including the RSK networks.

Also we are loading the mnemonic stored in file `.secret`, and saving it at variable mnemonic.

## Configure Truffle to connect to RSK regtest (local node)

In the `truffle-config.js` file, include this configuration at `network` section:

```javascript
    development: {
      host: "127.0.0.1",
      port: 4444,
      network_id: "*"
    },
```

This is the result:

![network development](/assets/img/tutorials/setup-truffle-oz/image-24.png)

## Get the current gas price of testnet

Get the current gas price of the testnet network, and save to `.gas-price-testnet.json`.

In your project folder, run this cURL command:

```shell
curl https://public-node.testnet.rsk.co/2.0.1/ -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' > .gas-price-testnet.json
```

![gas price result](/assets/img/tutorials/setup-truffle-oz/image-25.png)

You should receive a response similar to the following in the file:

```json
{"jsonrpc":"2.0","id":1,"result":"0x3938700"}
```

![gas-price-testnet.json](/assets/img/tutorials/setup-truffle-oz/image-26.png)

The result value is presented in hexadecimal.

Modify the `truffle-config` file again to use the updated gas price. After mnemonic part, include this:

```javascript
const gasPriceTestnetRaw = fs.readFileSync(".gas-price-testnet.json").toString().trim();
const gasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result, 16);
if (typeof gasPriceTestnet !== 'number' || isNaN(gasPriceTestnet)) {
  throw new Error('unable to retrieve network gas price from .gas-price-testnet.json');
}
console.log("Gas price Testnet: " + gasPriceTestnet);
```

## Configure Truffle to connect to RSK testnet

In the `truffle-config.js` file, include this configuration at `network` section:

```javascript
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://public-node.testnet.rsk.co/2.0.1/'),
      network_id: 31,
      gasPrice: Math.floor(gasPriceTestnet * 1.1),
      networkCheckTimeout: 1e9
    },
```

## Truffle config with local and testnet RSK networks

This is the final `truffle-config.js` file with configurations for both networks:

```javascript
const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
if (!mnemonic || mnemonic.split(' ').length !== 12) {
  throw new Error('unable to retrieve mnemonic from .secret');
}

const gasPriceTestnetRaw = fs.readFileSync(".gas-price-testnet.json").toString().trim();
const gasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result, 16);
if (typeof gasPriceTestnet !== 'number' || isNaN(gasPriceTestnet)) {
  throw new Error('unable to retrieve network gas price from .gas-price-testnet.json');
}
console.log("Gas price Testnet: " + gasPriceTestnet);

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 4444,
      network_id: "*"
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://public-node.testnet.rsk.co/2.0.1/'),
      network_id: 31,
      gasPrice: Math.floor(gasPriceTestnet * 1.1),
      networkCheckTimeout: 1e9
    },
  },
  compilers: {
    solc: {
    }
  }
}
```

Check out the VS Code image too:

![truffle-config](/assets/img/tutorials/setup-truffle-oz/image-27.png)

# Truffle Console connected to RSK network

Truffle has its own console to run commands, and can be connected on any network previously configured in `truffle-config.js` file.

## Connect to RSK regtest (local node)

Let's open a Truffle console to connect to our local node.

In the terminal, inside the `myproject` folder, run this command:

```shell
truffle console
```

![Truffle console development](/assets/img/tutorials/setup-truffle-oz/image-28.png)

> Any network defined with the name `development` is considered the default network.

## Connect to RSK testnet

Thus far we have only connected to a blockchain that runs using just 1 node, that runs on your own computer.
Let's now switch to interacting with a "real" blockchain, which is running on multiple nodes distributed across multiple computers!

To connect Truffle console in another network, you need to specify the network:

Open up a new terminal.

In the new terminal, inside the `myproject` folder, run this command:

```shell
truffle console --network testnet
```

It takes a little longer to establish this connection when compared to the local node.
This will open a new console:

![truffle console network testnet](/assets/img/tutorials/setup-truffle-oz/image-29.png)

## Test the connection to RSK network

On any of the networks, run this commands in the Truffle console:

### Block number

Shows the last block number.

```javascript
(await web3.eth.getBlockNumber()).toString()
```

![getBlockNumber](/assets/img/tutorials/setup-truffle-oz/image-30.png)

### Network ID

To get the network ID, run this command:

```javascript
(await web3.eth.net.getId()).toString()
```

For the local node, the network ID is `33`.

![getId local](/assets/img/tutorials/setup-truffle-oz/image-31.png)

And for testnet, it is `31`.

![getId testnet](/assets/img/tutorials/setup-truffle-oz/image-32.png)

## Exit Truffle console

In the Truffle console, enter this command to exit the terminal:

```shell
.exit
```

![exit Truffle console](/assets/img/tutorials/setup-truffle-oz/image-33.png)

# Get addresses

We will use a special instruction in Truffle console to get the first 10 addresses in our hierarchical deterministic wallet for the RSK Testnet network, that are generated from our mnemonic.

In the terminal, inside the `myproject` folder, go to the Truffle console connected to testnet:

```shell
truffle console --network testnet
```

And run this command to save the addresses at variable `accounts`:

```javascript
const accounts = Object.keys(web3.currentProvider.wallets)
```

See the addresses after it by entering the command below:

```javascript
accounts
```

![list accounts](/assets/img/tutorials/setup-truffle-oz/image-34.png)

Now we will write them to a file named `.accounts`

```javascript
await require('fs').promises.writeFile('.accounts', accounts.join('\n'))
```

![create file .accounts](/assets/img/tutorials/setup-truffle-oz/image-35.png)

And we can check the file:

![file .accounts](/assets/img/tutorials/setup-truffle-oz/image-36.png)

## Check balance

To check the balance of an account, for example, the first account of our list (`account[0]`), run this command in Truffle console:

```javascript
(await web3.eth.getBalance(accounts[0])).toString()
```

![getBalance accounts 0](/assets/img/tutorials/setup-truffle-oz/image-37.png)

The balance is 0 and we need some tR-BTC to pay gas fees,
which will be used to publish smart contracts and interact with them.
We shall obtain some in the next step.

# TestNet Faucet

You can get some tR-BTC from the [RSK Testnet faucet](https://faucet.testnet.rsk.co/).

Copy the first address from `.accounts` file. In my case, it is

```
0xe16f6abdd5815f3d24b4e5c29138f863933b000a
```

Enter your wallet address and pass the CAPTCHA.

![faucet.testnet.rsk.co](/assets/img/tutorials/setup-truffle-oz/image-38.png)

Wait a few seconds…

![Wait a few seconds](/assets/img/tutorials/setup-truffle-oz/image-39.png)

![Received some R-BTCs](/assets/img/tutorials/setup-truffle-oz/image-40.png)

You can see the transaction hash:

[0x4a2bf1f65c525219020c3a1215a29453c20f4ced90575d9a7d13f8fe666d05b4](https://explorer.testnet.rsk.co/tx/0x4a2bf1f65c525219020c3a1215a29453c20f4ced90575d9a7d13f8fe666d05b4)

Now I have 0.05 R-BTC!

## Recheck balance

To check balance again, run this command in the Truffle console:

```javascript
(await web3.eth.getBalance(accounts[0])).toString()
```

![getBalance accounts 0 again](/assets/img/tutorials/setup-truffle-oz/image-41.png)

Great! Now I have 50000000000000000, which means that I have 0.05 tR-BTC with 18 decimal places of precision.

# Where to go from here

At this point, we have installed all requirements and created an empty project using Truffle framework and Open Zeppelin smart contracts library,
connected to both an RSK local node (Regtest) and the RSK Testnet.

We have not developed anything yet,
but you are now ready to move on to the next tutorials,
where we will develop some very cool projects!

Choose any of these to tutorials to begin:

- [Create your first Token](/tutorials/tokens/create-a-token/)
- [Petshop](/tutorials/truffle-boxes/pet-shop-box/)
- [Create your own collectable token](/tutorials/tokens/create-a-collectable-token/)
