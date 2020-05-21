---
layout: rsk
title: Create your own collectable token on RSK network
tags: tutorial, rsk, token, openzeppelin, erc721, truffle, frontend, web3, react
description: "How to create your own collectable token on RSK network using Truffle framework, Open Zeppelin libraries and a react frontend."
---

In this tutorial, you will learn about blockchain programming from scratch by building a fully decentralized application (DApp), step by step.
You will also learn how to create your own collectable token on the RSK blockchain network using the Truffle framework, Open Zeppelin (OZ) libraries, and build a front end with React, using `create-react-app`.

We will create a dapp inspired by [Cryptokitties](https://www.cryptokitties.co/),
a popular blockchain game where you can collect and breed digital cats.
In this tutorial, instead of collecting felines in our app, we are going to collect exclusive color tokens.

### Fungible vs Non-Fungible Token

A fungible token represents an asset that can be exchanged for any other asset of equal value in its class.

A currency is an example of a fungible asset.
A $100 bill is equal to any other $100 bill,
you can freely exchange these bills with one another because they have the same value,
no matter the serial number on the specific $100 bill.
They are fungible bills.

On the other hand, a Non-Fungible Token (NFT) is a unique token. So collectible items are non-fungible assets, and can be represented by NFTs.

### ERC-721

ERC-721 was the first standard, and currently still the most popular standard,
for representing non-fungible digital assets.

The most important properties for this kind of asset is to have a way to check who owns what and a way to move things around.

It is easy to create new ERC721-compliant contracts by importing it from the OZ library and we will do so in this tutorial.

The interface for ERC-721 provides two methods:

* `ownerOf`: to query a token's owner
* `transferFrom`: to transfer ownership of a token

And this is enough to represent an NFT!

### Colors

In this tutorial, we are going to create an NFT to represent our collectible color tokens.

You will be able to create new color tokens and claim them so that they can be held in a digital blockchain wallet.

# Overview

Here is a summary of the steps to be taken to build our token:

1. Installation requirements;
2. Initialize a project using Truffle and OZ;
3. Configure Truffle to connect to RSK testnet;
4. Get a wallet with some testnet R-BTCs;
5. Initialize the client side application;
6. Add more configurations to Truffle;
7. Create smart contract of the token and compile it;
8. Create deploy instructions file in Truffle;
9. Deploy a smart contract on RSK Testnet using Truffle;
10. Create client side application;
11. Interact with the smart contract.

Steps 1 to 4 are explained in detail in the tutorial link below:

* [Setup a project with Truffle and OpenZeppelin](/tutorials/ethereum-devs/setup-truffle-oz/)

## Webinar

We have run a
[webinar](/webinars/#event-id-202005-001 "How to create your own collectible token on the RSK network").

The same webinar is also available in
[Português](https://www.youtube.com/watch?v=3gt-lmwZscE).

Check out our [other webinars](/webinars).

## Translations

This article is also available in
[Português](https://solange.dev/2020/2020-05-11-Rsk-CreateTokenNFT/ "Crie seu token colecionável na rede RSK").

# Requirements

1. Node.js and NPM (Node Package Manager)
2. Visual Studio Code (VSCode) or any other editor of your choice
3. Truffle
4. Metamask - google chrome extension

The requirements 1 to 3 are explained in detail in the tutorial links below:

* [Setup a project with Truffle and OpenZeppelin](/tutorials/ethereum-devs/setup-truffle-oz/)

For requirement 4, installing Metamask, connecting to RSK testnet, and getting some tR-BTCs, this is explained step-by-step in the tutorial link below:

* [Remix and Metamask with RSK testnet](/tutorials/ethereum-devs/remix-and-metamask-with-rsk-testnet/)

# Setup the project

Create a new folder named `colors`.

Inside the folder `colors`, do the steps below, following instructions from the tutorial
[Setup a project with Truffle and OpenZeppelin](/tutorials/ethereum-devs/setup-truffle-oz/)

1. Initialize an empty Truffle project;
2. Initialize an npm project;
3. Install OZ;
4. Install HD wallet provider;
5. Create a wallet mnemonic;
6. Create .secret file;
7. Get the current gas price at RSK testnet;
8. Configure Truffle to connect to RSK testnet;
9. Use Truffle console;
10. Test the connection to RSK network;
11. Get addresses;
12. Check balance;
13. Get some testnet R-BTCs at faucet;

# Initialize the client side application

We have 3 requirements to build the frontend:

1. Create React App
2. Web3.js
3. Bootstrap

## Create React App

This is the official template to create single-page React applications. It offers a build setup with no configuration.

To learn more: [create react app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)

In the project folder, at terminal, run:

```
npx create-react-app app --use-npm
```

![create-react-app](/assets/img/tutorials/create-a-collectable-token/image-01.png)

The option `--use-npm` is to select npm as package manager.

[npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner) comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f).

This is a large package and this might take a couple of minutes to show the message of successful installation:

![create-react-app successful installation](/assets/img/tutorials/create-a-collectable-token/image-02.png)

Now you have a new folder named `app` and we will customize our frontend later.

![create-react-app file structure](/assets/img/tutorials/create-a-collectable-token/image-03.png)

## Web3.js

Web3.js helps us to develop websites or clients that interact with the blockchain - writing code that reads and writes data from the blockchain with smart contracts.

The web3.js library is an Ethereum Javascript API which connects using the generic JSON-RPC spec. As RSK's virtual machine implementation is compatible with the Ethereum Virtual Machine (EVM), it is possible to use web3.js to interact with the front end and the RSK local node.

To install web3.js, input the command below into the terminal and press `enter` at folder `app`

```shell
cd app
npm install -E web3@1.2.7
```

The option `-E` is to save dependencies with an exact version rather than using npm's default.

![web3 install](/assets/img/tutorials/create-a-collectable-token/image-04.png)

![web3 successful installation](/assets/img/tutorials/create-a-collectable-token/image-05.png)

More info:
[web3.js](https://web3js.readthedocs.io/)

## Bootstrap

```shell
cd app
npm install -E bootstrap@4.4.1
```

![web3 install](/assets/img/tutorials/create-a-collectable-token/image-06.png)

As I said before, the option `-E` is to save dependencies with an exact version rather than using npm's default.

![web3 successful installation](/assets/img/tutorials/create-a-collectable-token/image-07.png)

# Configure Truffle

Come back to the project folder, open `truffle-config.js` file in VS Code and overwrite it with the following code:

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

const path = require("path");

module.exports = {
  networks: {
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://public-node.testnet.rsk.co/2.0.1/'),
      network_id: 31,
      gasPrice: Math.floor(gasPriceTestnet * 1.1),
      networkCheckTimeout: 1e9
    },
  },

  contracts_build_directory: path.join(__dirname, "app/src/contracts"),

  compilers: {
    solc: {
      version: "0.5.7",
    }
  }
}
```

It looked like this:

![truffle-config](/assets/img/tutorials/create-a-collectable-token/image-08.png)

## About contracts_build_directory

We add the library `path` to use with a new parameter `contracts_build_directory` that defines the locale where files for contracts artifacts, like abi and deployed addresses are saved.

It will be located in a different folder: `app/src/contracts`.

# Smart contract architecture

We will create a smart contract named `Color.sol` that will inherit the ERC721 definition from the OZ library.

## Create the smart contract Color.sol

In the Contracts folder, create a new file named `Color.sol`.

![Create Color.sol](/assets/img/tutorials/create-a-collectable-token/image-09.png)

## File Color.sol

Copy and paste the smart contract from the following gist, or inline below:

[Color.sol](https://raw.githubusercontent.com/solangegueiros/tokens-rsk/master/colors-create-react-app/contracts/Color.sol)

```javascript
pragma solidity 0.5.7;

import '@openzeppelin/contracts/token/ERC721/ERC721Full.sol';

contract Color is ERC721Full {

  bytes3[] public colors;
  mapping(bytes3 => bool) private _colorExists;

  constructor() ERC721Full("Color", "COLOR") public {
  }

  // E.G. color = "#FFFFFF"
  function mint(bytes3 _color) public {
    require(!_colorExists[_color], "color exists");
    uint _id = colors.push(_color);
    _mint(msg.sender, _id);
    _colorExists[_color] = true;
  }
}
```

It looked like this:

![Color.sol](/assets/img/tutorials/create-a-collectable-token/image-10.png)

## Understanding the smart contract

To create our ERC-721 Token, we will import `ERC721Full` from OZ.
This library itself imports several other libraries such as `SafeMath.sol`,
the standards for this kind of token and some extra features,
like enumeration and metadata.

With metadata we can customize our token by giving it a name and a symbol at constructor.

This function gets run only once; whenever the smart contract is created the first time, i.e., deployed to the blockchain.

We are calling the constructor function of the parent smart contract `ERC721Full` and passing in custom arguments like the name `Color` and the symbol `COLOR`.

The color management is performed with the variable `colors`, which is an array of colors and `_colorExists`, which is a fast "lookup" to know when a color is already minted.

Also we have a function to create new color tokens.
This is the basic structure of the function.
It will accept 1 argument of the `bytes3` type, which will be a hexadecimal code that corresponds to the token's color.

For example, if we want to create a green token,
we will pass "#00FF00" when we call this function.
Or if we want to create a red token, we'll use "#FF0000".

# Compile a smart contract

In the terminal, run this command:

```
truffle compile
```

![truffle compile](/assets/img/tutorials/create-a-collectable-token/image-11.png)

# Deploy a smart contract at testnet

First of all, we need to create a file in Truffle structure with instructions to deploy the smart contract.

## Create file 2_deploy_contracts.js

Folder `migrations` has JavaScript files that help you deploy contracts to the network.
These files are responsible for staging your deployment tasks, and they're written under the assumption that your deployment needs will change over time.
A history of previously run migrations is recorded on-chain through a special Migrations contract which is automatically created by Truffle.
(source: [running migrations](https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations))

In the `migrations` folder, create the file `2_deploy_contracts.js`

![create 2_deploy_contracts](/assets/img/tutorials/create-a-collectable-token/image-12.png)

Copy and paste this code:

```javascript
const Color = artifacts.require("Color");

module.exports = function(deployer) {
  deployer.deploy(Color);
};
```

It looked like this:

![2_deploy_contracts](/assets/img/tutorials/create-a-collectable-token/image-13.png)

## Migrate

In the terminal, run this command:

```
truffle migrate --network testnet
```

Wait a few minutes while the transactions for the smart contract deployments are sent to the blockchain.

The migrate command will compile the smart contract again if necessary.

![truffle migrate compile](/assets/img/tutorials/create-a-collectable-token/image-14.png)

First, it deploys the smart contract `Migrations.sol`, file generated by Truffle:

![truffle migrate Migrations.sol](/assets/img/tutorials/create-a-collectable-token/image-15.png)

This is the transaction at RSK testnet:

[0x3de61b8983dc3db2ca21a9d10106a19c445885fcb7040774bd6937daf94a4702](https://explorer.testnet.rsk.co/tx/0x3de61b8983dc3db2ca21a9d10106a19c445885fcb7040774bd6937daf94a4702)

And then it deploys our smart contract `Color.sol`:

![truffle migrate Color.sol](/assets/img/tutorials/create-a-collectable-token/image-16.png)

This is the transaction at RSK testnet:

[0x2c2d2932a7d637fbba100b5c482c1fa1899c4fe24bd1a458976a93cee6c5ba85](https://explorer.testnet.rsk.co/tx/0x2c2d2932a7d637fbba100b5c482c1fa1899c4fe24bd1a458976a93cee6c5ba85)

>A tip: if there is a communication problem with the testnet between the publication of Migrations.sol and Color.sol, just run the migrate command again, it will deploy only what is missing.

**Congratulations!**

Our NFT Color is published at RSK Testnet.

Save the contract address of token, it can be used later:

```javascript
tokenAddress = "0x5505a54a8F3e63D37095c37d9f8AcF0f4900B61F"
```

# Client side application

Now let's start building out the front end that will interact with the smart contract.
It will allow us to create new color tokens, and list out all of the existing tokens in your wallet.

In the `app` folder, we need to customize some files.

## index.html

In the `app\public` folder, open `index.html` file.

At `head` section, update the `title`:

```html
<title>NFT Colors</title>
```

## index.js

In the `app\src` folder, open `index.js` file and add a line to use bootstrap in out project

```javascript
import 'bootstrap/dist/css/bootstrap.css';
```

Also remove this line:

```javascript
import './index.css';
```

The final `index.js` is this. You can overwrite it with the code from following gist, or inline below:

[index.js](https://raw.githubusercontent.com/solangegueiros/tokens-rsk/master/colors-create-react-app/app/src/index.js)

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

At this point, your completed `index.js` file should looks like this:

![index.js](/assets/img/tutorials/create-a-collectable-token/image-17.png)

## App.css

Open `App.css` file and overwrite it with the code from the following gist, or copy and paste the code below:

[App.css](https://raw.githubusercontent.com/solangegueiros/tokens-rsk/master/colors-create-react-app/app/src/App.css)

```javascript
.token {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  display: inline-block;
}
```

This code customizes the appearance for tokens.

This is the result:

![App.css](/assets/img/tutorials/create-a-collectable-token/image-18.png)

## App.js

Open `App.js` file and overwrite it with the code from following gist, or copy and paste the code below:

[App.js](https://raw.githubusercontent.com/solangegueiros/tokens-rsk/master/colors-create-react-app/app/src/App.js)

```javascript
import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Color from './contracts/Color.json';

function colorHexToString(hexStr) {
  return '#' + hexStr.substring(2);
}

function colorStringToBytes(str) {
  if (str.length !== 7 || str.charAt(0) !== '#') {
    throw new Error('invalid color string');
  }
  const hexStr = '0x' + str.substring(1);
  return Web3.utils.hexToBytes(hexStr);
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      contract: null,
      totalSupply: 0,
      colors: [],
    };
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      // current web3 providers
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      // fallback for older web3 providers
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      // no web3 provider, user needs to install one in their browser
      window.alert(
        'No injected web3 provider detected');
    }
    console.log(window.web3.currentProvider);
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    console.log ('account: ', accounts[0]);
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Color.networks[networkId];

    if (!networkData) {
      window.alert('Smart contract not deployed to detected network.');
      return;
    }

    const abi = Color.abi;
    const address = networkData.address;
    const contract = new web3.eth.Contract(abi, address);
    this.setState({ contract });
    const totalSupply = await contract
      .methods.totalSupply().call();
    this.setState({ totalSupply });

    // Load Colors
    for (var i = 1; i <= totalSupply; i++) {
      const colorBytes = await contract
        .methods.colors(i - 1).call();
      const colorStr = colorHexToString(colorBytes);
      this.setState({
        colors: [...this.state.colors, colorStr],
      });
    }
  }

  mint = (colorStr) => {
    const colorBytes = colorStringToBytes(colorStr);
    this.state.contract.methods
      .mint(colorBytes)
      .send({ from: this.state.account })
      .once('receipt', (receipt) => {
        console.log ('transaction receipt: ', receipt)
        this.setState({
          colors: [...this.state.colors, colorStr],
        });
      });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <span className="navbar-brand col-sm-3 col-md-2 mr-0">
            Color Tokens
          </span>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.state.account}</span></small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Issue Token</h1>
                <form onSubmit={(event) => {
                  event.preventDefault();
                  const colorStr = this.color.value;
                  this.mint(colorStr);
                }}>
                  <input
                    type='text'
                    className='form-control mb-1'
                    placeholder='e.g. #FF00FF'
                    ref={(input) => { this.color = input }}
                  />
                  <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='MINT'
                  />
                </form>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            { this.state.colors.map((colorStr, key) => {
              return (
                <div key={key} className="col-md-3 mb-3">
                  <div className="token" style={ { backgroundColor: colorStr } }></div>
                  <div>{colorStr}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
```

## Understanding App.js

Import web3 here:

```javascript
import Web3 from 'web3'
```

This part is connected to the RSK Testnet using the injected web3 provider, in this case, MetaMask:

```javascript
  async loadWeb3() {
    if (window.ethereum) {
      // current web3 providers
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      // fallback for older web3 providers
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      // no web3 provider, user needs to install one in their browser
      window.alert(
        'No injected web3 provider detected');
    }
    console.log(window.web3.currentProvider);
  }
```

To load the instance of smart contract Color already published, we need to load the informations from Truffle deploy:

```javascript
import Color from './contracts/Color.json';
```

And after connecting successfully, the function `loadBlockchainData` loads accounts, network information and the smart contract Color.

```javascript
  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    console.log ('account: ', accounts[0]);
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Color.networks[networkId];

    if (!networkData) {
      window.alert('Smart contract not deployed to detected network.');
      return;
    }

    const abi = Color.abi;
    const address = networkData.address;
    const contract = new web3.eth.Contract(abi, address);
    this.setState({ contract });
    const totalSupply = await contract
      .methods.totalSupply().call();
    this.setState({ totalSupply });

    // Load Colors
    for (var i = 1; i <= totalSupply; i++) {
      const colorBytes = await contract
        .methods.colors(i - 1).call();
      const colorStr = colorHexToString(colorBytes);
      this.setState({
        colors: [...this.state.colors, colorStr],
      });
    }
  }
```

Also we have a mint function at App.js which sends a transaction to the network calling the mint function in the smart contract.

```javascript
  mint = (colorStr) => {
    const colorBytes = colorStringToBytes(colorStr);
    this.state.contract.methods
      .mint(colorBytes)
      .send({ from: this.state.account })
      .once('receipt', (receipt) => {
        console.log ('transaction receipt: ', receipt)
        this.setState({
          colors: [...this.state.colors, colorStr],
        });
      });
  }
```

Finally, the `render()` function is responsible for the HTML code for the application. It has 3 primary functions:

* Displays the current address on the Navbar
* Provides a form to mint new tokens
* Displays all the existing tokens on the page in a grid, showing the color and the code for each token

## Running

In the `app` folder, at terminal, run:

```
npm start
```

![npm start](/assets/img/tutorials/create-a-collectable-token/image-19.png)

It will automatically open the default browser at [http://localhost:3000/](http://localhost:3000/)

If it does not open, you can enter the local url manually in the browser.

![localhost:3000](/assets/img/tutorials/create-a-collectable-token/image-20.png)

Metamask automatically detects that our app would like to connect, authorize this action by clicking on the `Connect` button.

![authorize Metamask](/assets/img/tutorials/create-a-collectable-token/image-21.png)

And this is our frontend!

![frontend](/assets/img/tutorials/create-a-collectable-token/image-22.png)

# Interact with the smart contract

The colors are saved with hexadecimal representation for each.

To know more about color and hex color codes:

* [https://htmlcolorcodes.com/](https://htmlcolorcodes.com/)
* [https://www.color-hex.com/color-names.html](https://www.color-hex.com/color-names.html)
* [https://www.rapidtables.com/web/color/RGB_Color.html](https://www.rapidtables.com/web/color/RGB_Color.html)

Some color codes:

<table>
  <tr>
    <td>Red</td>
    <td>#FF0000</td>
  </tr>
  <tr>
    <td>Green</td>
    <td>#00FF00</td>
  </tr>
  <tr>
    <td>Blue</td>
    <td>#0000FF</td>
  </tr>
  <tr>
    <td>Yellow</td>
    <td>#FFFF00</td>
  </tr>
</table>

## Mint

Choose a color and enter your hexadecimal representation in the info text field, and click on the `MINT` button.

It will call the `mint()` function at the smart contract instance Color, with the color that you defined.

I will enter the color red, value `#FF0000`.

> Do not forget to use the symbol `#`

![#FF0000](/assets/img/tutorials/create-a-collectable-token/image-23.png)

![#FF0000 Metamask confirm](/assets/img/tutorials/create-a-collectable-token/image-24.png)

Click on the `confirm` button.

Great! Now I have my first color collectable token:

![Red minted](/assets/img/tutorials/create-a-collectable-token/image-25.png)

I would like to mint the blue color: `#0000FF`

![#0000FF](/assets/img/tutorials/create-a-collectable-token/image-26.png)

Wait for a few seconds for your transaction to be mined…

And now I have two colors in my collection!

![Blue minted](/assets/img/tutorials/create-a-collectable-token/image-27.png)

And my collection is growing!

![color collection](/assets/img/tutorials/create-a-collectable-token/image-28.png)

# Congratulations!

Hope it was easy for you to create a NFT!

I showed you how to connect Truffle to the RSK network and deploy your own NFT using the OZ libraries, and that they work on the RSK network.

This tutorial was inspired by Gregory McCubbin's tutorial, from dApp University. Check out the [original](https://www.dappuniversity.com/articles/blockchain-programming) article.

Our goal is to join forces and give options to people who believe in smart contracts based on Ethereum, and also believe in the power of Bitcoin, through RSK.

I hope this tutorial has been helpful and I’d appreciate your feedback. Happy with this tutorial? Share it if you like it :)
