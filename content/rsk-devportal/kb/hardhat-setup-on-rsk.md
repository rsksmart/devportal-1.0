---
menu_title: Set up Hardhat project for Rootstock Testnet
title: "How to set up a Hardhat project for Rootstock Testnet | Rootstock (RSK)"
description: "Learn about Hardhat, creating and configuring a new project, and connect to the Rootstock Blockchain"
tags: hardhat, tutorial, overview, guides, tokens, web3, bitcoin, rsk, peer-to-peer, blockchain
render_features: 'custom-terminals'
layout: rsk
---

Welcome to the tutorial on how to set up a Hardhat project for Rootstock Testnet. In this tutorial, we'll do the following steps:

- What is Hardhat?
- Setting up your environment 
- Creating and configuring a new Hardhat project
- Writing and compiling smart contracts

## Prerequisites

To follow this tutorial, you should have knowledge in:

* [JavaScript](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics)
* Command Line
* Git
* Smart contracts basics

If you are not familiar with the above, it will be advisable to learn the basics by clicking the links above, before proceeding with this tutorial on how to set up a hardhat project.


## What is Hardhat?

Hardhat is a development environment that enables a developer to compile, deploy, test, and debug your Rootstock software. It helps to manage and automate the recurring tasks that are inherent to the process of building blockchain applications. 

## 1. Setting up your node.js environment 

Most Hardhat libraries and tools are written in JavaScript, and so is Ethereum libraries and tools. Node.js is a JavaScript runtime environment built on Chrome's V8 JavaScript engine. It's the most popular solution to run JavaScript outside of a web browser and Hardhat is built on top of it. 

### 1.1. Installing Node.js

You can skip this section if you already have a working Node.js >= 12.0 installation. If not, here's how to install it on Ubuntu, MacOS and Windows.

[](#top "multiple-terminals")
- Linux
  ```shell
  sudo apt update
  sudo apt install curl git
  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
  sudo apt install nodejs
  ```
- Windows
  ```windows-command-prompt
  [Git's installer for Windows](https://git-scm.com/download/win)
  node-v12.XX.XX-x64.msi [from](https://nodejs.org/dist/latest-v12.x/) here
  ```
- Mac OSX
  ```shell
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash
  nvm install 12
  nvm use 12
  nvm alias default 12
  npm install npm --global # Upgrade npm to the latest version
  ```

### 2. Creating and configuring a new Hardhat project

Lets install Hardhat using the npm CLI. The Node.js package manager is the world's largest Software Registry that contains over 800,000 JavaScript code packages. Go [here](https://www.w3schools.com/whatis/whatis_npm.asp) to learn more about npm


Open a new terminal and run the below command

```
mkdir hardhat-tutorial-guide
cd hardhat-tutorial-guide
npm init --yes
npm install --save-dev hardhat
```

In the same directory where you installed Hardhat run:

`npx hardhat`

Select **Create an empty hardhat.config.js** with your keyboard and hit enter, do the same for the remaining prompts


When Hardhat is run, it searches for the closest `hardhat.config.js` file starting from the current working directory. This file normally lives in the root of your project and an empty `hardhat.config.js` is enough for Hardhat to work. The entirety of your setup is contained in this file. Hardhat will create a `hardhat.config.js` like the following:

```
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.3",
};
```

### 2.1. Configure hardhat.config.js to connect to Rootstock Testnet

To set up your config, you have to export an object from hardhat.config.js. This object can have entries like `defaultNetwork`, `networks`, `solidity`, `paths` and `mocha`. 

### 2.2. Network configuration


The `networks` config field is an optional object where network names map to their configuration.

There are two kinds of networks in Hardhat: JSON-RPC based networks, which is what we will be using in this tutorial, and the built-in Hardhat Network.

You can customize which network is used by default when running Hardhat by setting the config's `defaultNetwork` field. If you omit this config, its default value is `"hardhat"`

### 2.3. Hardhat Network

Hardhat comes built-in with a special network called hardhat. When using this network, an instance of the [Hardhat Network](https://hardhat.org/hardhat-network/) will be automatically created when you run a task, script or test your smart contracts.

Hardhat Network has first-class support of Solidity. It always knows which smart contracts are being run and exactly what they do and why they fail. Learn more about it [here](https://hardhat.org/hardhat-network/).


### 2.4. JSON-RPC based networks

These are networks that connect to an external node. Nodes can run on your computer, like Ganache, or remotely, like Rootstock Testnet. We'll be configuring a network connection named `rsktestnet` for this tutorial.

Include the following code in your `hardhat.config.js` file

```
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.7.3',
  networks: {
    rsktestnet: {
      chainId: 31,
      url: 'https://public-node.testnet.rsk.co/',
      gasPrice: Math.floor(minimumGasPriceTestnet * TESTNET_GAS_MULT),
      gasMultiplier: TESTNET_GAS_MULT,
      accounts: {
        mnemonic: mnemonic,
        initialIndex: 0,
        path: "m/44'/60'/0'/0",
        count: 10,
      },
    },
  },
};
```

To set such networks, you’ll have to configure the object with the following fields: 

- `url`: This is the url of the node for custom networks.
- `chainId`: This number is used to validate the network Hardhat connects to.
- `gasPrice`: Its value should be auto or a number. Default value: auto
- `gasMultiplier`: Default value : 1
- `accounts`: This field controls the account that Hardhat uses. It can use node’s accounts or an HD Wallet. Default : “remote”.

### 2.5. HD Wallet Configuration

For using HD Wallet with Hardhat, you’ll have to set your network’s account with the below fields.

* `mnemonic`: A string that is your seed phrase of the wallet
* `path`: the HD parent of all derived keys. Default value : `m/44'/60'/0'/0`.
* `initialIndex`: Initial index to derive. Default value : 0
* `count`: Number of accounts to derive. Default value: 20

### 2.6. Solidity configuration

The solidity config is an optional field that can be one of the following:

* A solc version to use, e.g. ``"0.7.3"``.
* An object which describes the configuration for a single compiler. It contains the version, which is the solc version to use, and settings like optimizer with enabled and runs keys.

```
  solidity: {
    version: "0.7.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
```

### 2.7. Path configuration

You can customize the different paths that Hardhat uses by providing an object to the paths field with the following keys:

* `root`: The root of the Hardhat project. This path is resolved from `hardhat.config.js`'s directory. Default value: the directory containing the config file.
* `sources`: The directory where your contract are stored. This path is resolved from the project's root. Default value: `'./contracts'`.
* `tests`: The directory where your tests are located. This path is resolved from the project's root. Default value: `'./test'`.
* `cache`: The directory used by Hardhat to cache its internal stuff. This path is resolved from the project's root. Default value: `'./cache'`.
* `artifacts`: The directory where the compilation artifacts are stored. This path is resolved from the project's root. Default value: `'./artifacts'`

```
Paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
},
```

### 2.8. Mocha configuration: 

You can configure how tests are running using mocha entity, it would accept the same options as Mocha.


```
mocha: {
    timeout: 20000
}
```

Let's look at some other statements in the `hardhat.config.js` file.

```
const fs = require('fs');

require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');

const TESTNET_GAS_MULT = 1.1;
```

The first line `const fs = require('fs');` provides access to the NodeJs built-in File System, `fs` module.

The second line, `require('@nomiclabs/hardhat-ethers');` gives us access to the plugin that brings to Hardhat the Ethereum library ethers.js, which allows you to interact with the Ethereum blockchain in a simple way. This plugins adds an `ethers` object to the Hardhat Runtime Environment.

The third line, `require('@nomiclabs/hardhat-waffle');`
gives us access to the plugin for building smart contract tests using Waffle in Hardhat, this plugin adds a Hardhat-ready version of Waffle to the Hardhat Runtime Environment, and automatically initializes the Waffle Chai matchers. This object has all the Waffle functionality, already adapted to work with Hardhat.

The line `const TESTNET_GAS_MULT = 1.1;` declares a constant that stores the `gasMultiplier` value to be used in the network object. 

```
const mnemonic = fs.readFileSync('.testnet.seed-phrase').toString().trim();
if (!mnemonic || mnemonic.split(' ').length !== 12) {
  console.log('unable to retrieve mnemonic from .secret');
}
```

The line `const mnemonic = fs.readFileSync('.testnet.seed-phrase').toString().trim();`  enables the Hardhat configuration file to read the mnemonics from a `.testnet.seed-phrase` file present in the Hardhat project directory. This is done using the following lines already present in the `hardhat.config.js file`. 

The preceding script reads the `.testnet.seed-phrase` file from the filesystem and sets in the mnemonic variable. This variable can be used in the configuration to read the BIP39 mnemonic keyword.

If this file is not present, you should create this file under the Hardhat project and add your BIP39 mnemonic seed keywords in plain text.

```
const gasPriceTestnetRaw = fs
  .readFileSync('.minimum-gas-price-testnet.json')
  .toString()
  .trim();
const minimumGasPriceTestnet = parseInt(
  JSON.parse(gasPriceTestnetRaw).result.minimumGasPrice,
  16,
);
if (
  typeof minimumGasPriceTestnet !== 'number' ||
  Number.isNaN(minimumGasPriceTestnet)
) {
  throw new Error(
    'unable to retrieve network gas price from .gas-price-testnet.json',
  );
}
console.log(`Minimum gas price Testnet: ${minimumGasPriceTestnet}`);
```

The above script enables us to get the updated gas price from Rootstock Testnet, as  `minimumGasPriceTestnet`.


### The updated `hardhat.config.js` file:

Check out the full project source code on [GitHub](https://github.com/bguiz/workshop-hardhat-rsk)

```
const fs = require('fs');

require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');

const TESTNET_GAS_MULT = 1.1;

const mnemonic = fs.readFileSync('.testnet.seed-phrase').toString().trim();
if (!mnemonic || mnemonic.split(' ').length !== 12) {
  console.log('unable to retrieve mnemonic from .secret');
}

const gasPriceTestnetRaw = fs
  .readFileSync('.minimum-gas-price-testnet.json')
  .toString()
  .trim();
const minimumGasPriceTestnet = parseInt(
  JSON.parse(gasPriceTestnetRaw).result.minimumGasPrice,
  16,
);
if (
  typeof minimumGasPriceTestnet !== 'number' ||
  Number.isNaN(minimumGasPriceTestnet)
) {
  throw new Error(
    'unable to retrieve network gas price from .gas-price-testnet.json',
  );
}
console.log(`Minimum gas price Testnet: ${minimumGasPriceTestnet}`);

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.7.3',
  networks: {
    rsktestnet: {
      chainId: 31,
      url: 'https://public-node.testnet.rsk.co/',
      gasPrice: Math.floor(minimumGasPriceTestnet * TESTNET_GAS_MULT),
      gasMultiplier: TESTNET_GAS_MULT,
      accounts: {
        mnemonic: mnemonic,
        initialIndex: 0,
        path: "m/44'/60'/0'/0",
        count: 10,
      },
    },
  },
};
```

### 3. Let's take a look at the concepts of hardhat tasks and plugins.

Hardhat is designed around the concepts of tasks and plugins. The bulk of Hardhat's functionality comes from plugins, which as a developer you're free to choose the ones you want to use in your project.

### 3.1. Tasks 

Every time you run Hardhat from the CLI, you're running a task. e.g. `npx hardhat compile` is running the `compile` task.

### 3.2. Plugins

Hardhat does come with some built-in default plugins, all of which can be overriden. For this tutorial we are going to use the Ethers.js and Waffle plugins. They'll allow you to interact with Ethereum and to test your contracts. To install them in your project directory run:

`npm install --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai`


### 4. Writing and compiling smart contracts

We're going to create a simple smart contract that implements a token that can be transferred. Token contracts are most frequently used to exchange or store value. Find below some logic we implemented by the contract.

* There is a fixed total supply of tokens that can't be changed.
* The entire supply is assigned to the address that deploys the contract.
* Anyone can receive tokens.
* Anyone with at least one token can transfer tokens.
* Get Token balance of a given account


### 4.1 Creating the  smart contracts

Start by creating a new directory called `contracts` and create a file inside the directory called `Token.sol`.

```
mkdir contracts
touch contracts/Token.sol
code contracts/Token.sol
```

Copy the below initial set up code for the Token transfer contract into your integrated development environment. We’ll implement the functions in the smart contract as we go along.


### 4.2. Code walkthrough

```
pragma solidity ^0.7.0;

import "hardhat/console.sol";

// This is the main building block for smart contracts.
contract Token {
    
    // Some string type variables to identify the token.
    // The `public` modifier makes a variable readable from outside the contract.
    string public name = "My Hardhat Token";
    string public symbol = "MHT";

    // The fixed amount of tokens stored in an unsigned integer type variable.
    uint256 public totalSupply = 1000000;

    // An address type variable is used to store ethereum accounts.
    address public owner;

    // A mapping is a key/value map. Here we store each account balance.
    mapping(address => uint256) balances;

    constructor() {
    // TODO set default candidates
    }

    function transfer(address to, uint256 amount) external {
    // TODO Create a function to enable transfer of Tokens
    }

    function balanceOf(address account) external view returns (uint256) {
        // TODO Create a function to check the balance of an account
    }
}
```

The first line - `pragma` - declares the version of Solidity you wish to write your code in. The declaration of the smart contract starts with the `contract` keyword, then the name of the contract. Here, `Token` is the name of our smart contract.

Next, we declare a string variable called `name` to hold the name and identifier for the Token. The line `string public name = "My Hardhat Token";` declares a named variable that is public and of type `string`. This variable holds the identifier for the Token, which in our case is "My Hardhat Token"

Next, we declare a variable called "symbol" to hold the symbol for the token. The line `string public symbol = "MHT";` declares a symbol variable that is public and of type `string`. This variable stores the symbol by which the token should be known, in our case "MHT". 

Next, we declare a variable called `totalSupply` to hold the fixed amount of Token in circulation. The line `uint256 public totalSupply = 1000000;` declares a totalSupply variable that is public and of type `uint` (unsigned integer with 256 bits). This variable stores the fixed amount of tokens in supply, in our case is 1000000. 

Next, we declare a variable called `owner` to hold the address of the owner of the contract. The line `address public owner;` declares an owner variable that is public and of type address. 

### 4.3. Address data type

The address type comes in two flavours, which are largely identical:

* `address`: Holds a 20 byte value (size of an Rootstock address).
* `address payable`: Same as address, but with the additional members transfer and send.

The idea behind this distinction is that address payable is an address you can send RBTC to, while a plain address cannot be sent RBTC. Read more on [Variable Declaration in Solidity](https://docs.soliditylang.org/en/v0.7.1/style-guide.html?highlight=bool#mappings)

Next, we store each account balance in a key/value pair map. The line `mapping(address => uint256) balances;`maps an address field that stores the address of the account, and a uint256 field that stores the balance of Tokens in the mapped address. 

The constructor function gets called when the smart contract is deployed to the blockchain. The constructor would be initialised upon contract creation. Read about [Constructors in Solidity](https://solidity.readthedocs.io/en/v0.7.1/contracts.html#constructor).


### 4.5. Implementing the smart contract functions

### Implementing the constructor 

```
constructor() {
        // The totalSupply is assigned to transaction sender, which is the account
        // that is deploying the contract.
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }
```


The line `balances[msg.sender] = totalSupply;` assigns the address of the person deploying the contract to the balances address field, and then assigns the `totalSupply` to the `uint256` field of the balances variable. The line `owner = msg.sender;` assigns the address of the person deploying the contract to the owner variable, which is of type `address`. 

### 4.6. Transfer Function

```
function transfer(address to, uint256 amount) external {
        console.log("Sender balance is %s tokens", balances[msg.sender]);
        console.log("Trying to send %s tokens to %s", amount, to);
        // Check if the transaction sender has enough tokens.
        // If `require`'s first argument evaluates to `false` then the
        // transaction will revert.
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // Transfer the amount.
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
```

The function transfer takes two parameters, the first is the address to which Tokens should be transfered to, and the second parameter is the amount of Tokens to be sent. The external modifier makes this function only callable from outside the contract. The functions requires that balance of sender should be greater than amount to be sent, if this condition is false, then an error message is thrown, saying "not enough Tokens". If the balance amount is greater than amount to be sent, then the amount is deducted from the senders balance and then credited to the receivers account.


### 4.7. Implementing the balanceOf Function

```
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
```
The function `balanceOf` takes an address as a parameter and then returns the current balance of that address to the caller of the function. The view keyword in the declaration means that the function will not modify the state of the contract, while the returns keyword indicate that the function will return a `uint256` value.

### The updated Smart Contract

Check out the full project source code on [GitHub](https://github.com/bguiz/workshop-hardhat-rsk)

```
// SPDX-License-Identifier: GPL-3.0
// Solidity files have to start with this pragma.
// It will be used by the Solidity compiler to validate its version.
pragma solidity ^0.7.0;

import "hardhat/console.sol";

// This is the main building block for smart contracts.
contract Token {
    // Some string type variables to identify the token.
    // The `public` modifier makes a variable readable from outside the contract.
    string public name = "My Hardhat Token";
    string public symbol = "MHT";

    // The fixed amount of tokens stored in an unsigned integer type variable.
    uint256 public totalSupply = 1000000;

    // An address type variable is used to store ethereum accounts.
    address public owner;

    // A mapping is a key/value map. Here we store each account balance.
    mapping(address => uint256) balances;

    /**
     * Contract initialization.
     *
     * The `constructor` is executed only once when the contract is created.
     */
    constructor() {
        // The totalSupply is assigned to transaction sender, which is the account
        // that is deploying the contract.
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    /**
     * A function to transfer tokens.
     *
     * The `external` modifier makes a function *only* callable from outside
     * the contract.
     */
    function transfer(address to, uint256 amount) external {
        console.log("Sender balance is %s tokens", balances[msg.sender]);
        console.log("Trying to send %s tokens to %s", amount, to);
        // Check if the transaction sender has enough tokens.
        // If `require`'s first argument evaluates to `false` then the
        // transaction will revert.
        require(balances[msg.sender] >= amount, "Not enough tokens");

        // Transfer the amount.
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    /**
     * Read only function to retrieve the token balance of a given account.
     *
     * The `view` modifier indicates that it doesn't modify the contract's
     * state, which allows us to call it without executing a transaction.
     */
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
```


 


### 4.8. Compiling contracts

To compile the contract, run `npx hardhat compile` in your terminal. The `compile` task is one of the built-in tasks.

```
$ npx hardhat compile
Compiling 1 file with 0.7.3
Compilation finished successfully
```
The contract has been successfully compiled and it's ready to be used.

### Testing the smart contract

Writing automated tests when building smart contracts is of crucial importance. In our tests we're going to use ethers.js to interact with the Rootstock contract we built in the previous section, and Mocha as our test runner.

### 5. Writing tests

Create a new directory called test inside our project root directory and create a new file named `Token.js`

```
mkdir test
touch test/Token.js
code test/Token.js
```

The initial code for testing the smart contract is copied below. We’ll implement the specifications as we go along.


```
const { expect } = require("chai");

describe("Token contract", function () {
    // TODO specification code
  });
  
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      // TODO Specification code
    });

    it("Should assign the total supply of tokens to the owner", async function () {
     //TODO Specification code
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
    
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
       // TODO Specification code
      );
    });

    it("Should update balances after transfers", async function () {
     // TODO 
    });
  });
});
```

### 5.1. Lets set up our test environment



```
const { expect } = require("chai");

describe("Token contract", function () {
  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    hardhatToken = await Token.deploy();
  });
```

*The above code enables proper setting of our test environment*

The line `const { expect } = require("chai");` imports `Chai` which is an assertions library. These asserting functions are called "matchers", and the ones we're using here actually come from Waffle.

This is why we're using the `@nomiclabs/hardhat-waffle` plugin, which makes it easier to assert values from Ethereum.

The next line `describe` is a Mocha function that allows you to organize your tests. It's not actually needed, but having your tests organized makes debugging them easier. All Mocha functions are available in the global scope. `describe` receives the name of a section of your test suite, and a callback.
The callback must define the tests of that section. This callback can't be an async function. Mocha has four functions that let you hook into the test runner's lifecycle. These are: `before`, `beforeEach`, `after`, `afterEach`.

They're very useful to set up the environment for tests and to clean it up after they run. A common pattern is to declare some variables, and assign them in the `before` and `beforeEach` callbacks.`beforeEach` will run before each test, re-deploying the contract every time. It receives a callback, which can be async.

The lines `Token = await ethers.getContractFactory("Token");` and `[owner, addr1, addr2, ...addrs] = await ethers.getSigners();`,  gets the ContractFactory and Signers.

To deploy our contract, we just have to call Token.deploy() and await for it to be deployed(), which happens once its transaction has been mined. 



### 5.2. Testing to set the right owner

```
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });
```
*This test expects the owner variable stored in the contract to be equal to our Signer's owner.*

`it` is another Mocha function. This is the one you use to define your tests, it receives the test name, and a callback function. You might have noticed the use of `async` in it's callback function. Interacting with the Ethereum network and smart contracts are asynchronous operations, hence most APIs and libraries use JavaScript's Promise for returning values. This use of async will allow us to `await` the calls to our contract and the Hardhat Network node.


The next line `expect` receives a value, and wraps it in an assertion object. These objects have a lot of utility methods to assert values.

### 5.3. Testing totalSupply of Token is equal to owner's balance 

```
it("Should assign the total supply of tokens to the owner", async function () {
  const ownerBalance = await hardhatToken.balanceOf(owner.address);
  expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
});
```

The above test assigns the total number of Tokens to the owner and makes sure the total number of tokens is equal to the owner's balance.

### 5.4. Testing transfer of Tokens from one account to another

```
it("Should transfer tokens between accounts", async function () {
      await hardhatToken.transfer(addr1.address, 50);
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await hardhatToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
```

The line `await hardhatToken.transfer(addr1.address, 50);` calls the contract's transfer function, and transfers 50 tokens to `addr1`

The line `const addr1Balance = await hardhatToken.balanceOf(addr1.address);` calls the contract's balanceOf function on addr1, and assigns the value to the variable `addr1Balance`. It then expect the `addr1Balance` to be equal to 50. 

The next line `await hardhatToken.connect(addr1).transfer(addr2.address, 50);` uses the `.connect()` function to send a transaction from another account to a second account. The next line then checks the balance of `addr2`, and expects the balance to be equal to 50. 


### 5.5. Testing to make sure sender has enough Tokens

```
 it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
      await expect( hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");
      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
```

The line `const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);`, checks and returns the initial balance of the owner's address. The line `await expect( hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");`, tries to send 1 token from addr1 (0 tokens) to owner's address (1000000 tokens). 
      
The line `expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);`, test that Owner's balance is equal to initialOwnersBalance, and shouldn't have changed.

### 5.6. Testing to update balance after transfer

```
it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      // Transfer 100 tokens from owner to addr1.
      await hardhatToken.transfer(addr1.address, 100);

      // Transfer another 50 tokens from owner to addr2.
      await hardhatToken.transfer(addr2.address, 50);

      // Check balances.
      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
```
### The updated test code

```
const { expect } = require("chai");

describe("Token contract", function () {

  let Token;
  let hardhatToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    hardhatToken = await Token.deploy();
  });

  describe("Deployment", function () {
  
    it("Should set the right owner", async function () {
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await hardhatToken.balanceOf(owner.address);
      expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await hardhatToken.transfer(addr1.address, 50);
      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await hardhatToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await expect(
        hardhatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      expect(await hardhatToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);

      await hardhatToken.transfer(addr1.address, 100);

      await hardhatToken.transfer(addr2.address, 50);

      const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

      const addr1Balance = await hardhatToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await hardhatToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
```

### Running the test

Open a new terminal in the project directory.

Enter the command below into the terminal:

```
npx hardhat test
```
 

### 6. Create smart contract deployment script and dry-run the deployment

Create a new directory called scripts inside our project root directory and create a new file called deploy.js

```
mkdir scripts
touch scripts/deploy.js
code scripts/deploy.js
```

Paste the below code into your deploy.js file

```
async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
  
    console.log("Token address:", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
```

Run the command below to deploy your application

```
npx hardhat run scripts/deploy.js
```

### 7. Perform an actual deployment to Rootstock Testnet using the below command


```
npx hardhat run scripts/deploy.js --network rsktestnet
```

Congratulations! In this article, we learnt what hardhat is, successfully setup our environment, created and configured a new hardhat project, compiled and tested the smart contract. 