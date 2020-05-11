---
layout: rsk
title: How to create your first frontend for smart contracts
tags: tutorial, rsk, frontend, web3
description: "How to create your first frontend for smart contracts using an injected web3 provider."
---

In this tutorial I will show you step-by-step how to create your first front end to interact with a smart contract deployed at RSK local network, using only Javascript and HTML and connected to a wallet using a web3 provider.

# Overview

Below is a summary of the steps to be taken to build our front end:

1. Configure Metamask to connect to RSK testnet;
2. Get some testnet R-BTCs at faucet;
3. Connect Remix with RSK Testnet;
4. Create, compile and deploy a smart contract on RSK Testnet using Remix;
5. Initialise the project;
6. Install web3.js;
7. Create a javascript file;
8. Create a html file;
9. Install and run a local server;
10. Interact with the smart contract.

Steps 1 to 4 are explained in detail in the tutorial link below:

* [using Remix and Metamask with RSK testnet](/tutorials/ethereum-devs/remix-and-metamask-with-rsk-testnet/)

## Webinar


We have run a
[webinar](/webinars/#event-id-202004-027 "Create your first frontend for a Smart Contract on RSK")
in which we run through this tutorial:

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/CoO9k1LYO04?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

The same webinar is also available in
[Español](https://www.youtube.com/watch?v=CoO9k1LYO04)
and [Português](https://www.youtube.com/watch?v=bm1dJyxe1mc).

Check out our [other webinars](/webinars).

# Requirements

* Metamask
* Remix - web tool, online
* Node.js and NPM (Node Package Manager)
* Visual Studio Code (VSCode) or any other editor of your choice
* HTTP server: express
* web3.js

As earlier mentioned, to install Metamask and connect to RSK testnet and to connect Remix with RSK Testnet are explained in detail in the tutorial link below:

* [using Remix and Metamask with RSK testnet](/tutorials/ethereum-devs/remix-and-metamask-with-rsk-testnet/)

## Node.js and NPM

Node.js and NPM are needed, though both are usually installed at once.

NB: To check if Node.js and NPM is already installed, input the following commands in the terminal:

```shell
node --version
npm --version
```

![node and npm version](/assets/img/tutorials/first-frontend-web3-injected/image-01.png)

Go to [Node.js](https://nodejs.org/en/) if you need to install it.

## Visual Studio Code (VSCode)

In this tutorial, We would use VSCode to create and deploy our project.

To use VSCode [download it here](https://code.visualstudio.com/download).

Verify if your VS code installation was successful by typing the following command into the terminal:

```shell
code -v
```

![visual code version](/assets/img/tutorials/first-frontend-web3-injected/image-02.png)

# Create the Register project

Create a folder named Register, and start an npm project in the Register folder by typing the following commands below into the terminal:

```shell
mkdir Register
cd Register
npm init -y
```

For example, I will create a  folder at this location - `C:\RSK\`

My project can be located in the folder `C:\RSK\Register`.

![Register project](/assets/img/tutorials/first-frontend-web3-injected/image-03.png)

## Express

Express is a Node.js web application framework that helps to develop web applications. It is a minimalist HTTP server.

To install Express, input the command below into the terminal and press `enter` at your project location:

```shell
npm install express --save
```

More info:

- [http://expressjs.com/](http://expressjs.com/)

- [https://www.npmjs.com/package/express](https://www.npmjs.com/package/express)

## Web3.js

Web3.js helps us to develop websites or clients that interact with the blockchain - writing code that reads and writes data from the blockchain with smart contracts.

The web3.js library is an Ethereum Javascript API which connects using the generic JSON-RPC spec. As RSK's virtual machine implementation is compatible with the Ethereum Virtual Machine (EVM), it is possible to use web3.js to do the communications between the front-end and the RSK local node.

The web3.js library is an Ethereum Javascript API which connects using the generic JSON-RPC spec. As RSK's virtual machine implementation is compatible with the Ethereum Virtual Machine (EVM), it is possible to use web3.js to interact with the front end and the RSK local node.

To install web3.js, input the command below into the terminal and press `enter` at your project location:

```shell
npm install web3 --save
```

More info:

- [https://web3js.readthedocs.io/](https://web3js.readthedocs.io/)

## Check package.json

`package.json` is a file created by npm with some configurations, including the packages which we installed before using the command `npm init -y`.

After the installations, I will open the project folder named Register in VSCode and verify the file package.json. Let's take a look at the dependencies in the file:

![package.json](/assets/img/tutorials/first-frontend-web3-injected/image-04.png)

You will find the previously installed packages:

```json
 "dependencies": {
   "express": "^4.17.1",
   "web3": "^1.2.6"
 }
```

# Deploy a smart contract

This is explained in detail in the tutorial:

* [using Remix and Metamask with RSK testnet](/tutorials/ethereum-devs/remix-and-metamask-with-rsk-testnet/)

We'll do the relevant parts of that tutorial here.

### Remix

Go to [http://remix.ethereum.org/](http://remix.ethereum.org/)

![Remix Homepage](/assets/img/tutorials/first-frontend-web3-injected/image-15.png)

NB: Be sure to click the **Solidity** button under **Environment**, as seen in the image above.

We need this in order to compile our smart contract as our code is written in the Solidity language.

### Create a smart contract

Create a new file

File name: `Register.sol`

Copy and paste the smart contract from the following gist, or copy and paste the code below:

[https://raw.githubusercontent.com/solangegueiros/dapp-register-rsk/master/register-rsk-web3-injected/register.sol](https://raw.githubusercontent.com/solangegueiros/dapp-register-rsk/master/register-rsk-web3-injected/register.sol)

```
pragma solidity 0.5.4;

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

### Register.sol

This smart contract has:

* A variable `info` to store a string
* A function `getInfo()` to return the string stored at variable info
* A function `setInfo()` to change the string stored at variable info

### Compile a smart contract

In the 3rd button at the left side select Solidity compiler.

![Solidity Compiler](/assets/img/tutorials/first-frontend-web3-injected/image-14.png)

Click the button **Compile Register.sol**.

![Compile Register.sol](/assets/img/tutorials/first-frontend-web3-injected/image-16.png)

### Deploy a smart contract

In the left side panel, go to the button Deploy and run transactions.

Under `Environment`, make sure you have selected the `Injected Web3` option,
as this tells Remix to use the Web3 provider injected by a browser plugin such as [MetaMask](https://metamask.io/) or [Nifty](https://www.poa.network/for-users/nifty-wallet).

![Injected Web3](/assets/img/tutorials/first-frontend-web3-injected/image-13.png)

Then click the button `Deploy`.

![Deploy and run transactions](/assets/img/tutorials/first-frontend-web3-injected/image-05.png)

> Ensure that you have tR-BTC in your wallet, as this is needed to pay gas fees when deploying the smart contracts. To do so, please follow this guide: [Using Remix and Metamask with RSK testnet](/tutorials/ethereum-devs/remix-and-metamask-with-rsk-testnet/).

When a smart contract is deployed with Remix, we can see it in the left panel under deploy and run transactions.

Click on the copy button at the right side of the smart contract to copy the address of the smart contract. We will need it for use on the front end.

![Copy](/assets/img/tutorials/first-frontend-web3-injected/image-06.png)

![smart contract address](/assets/img/tutorials/first-frontend-web3-injected/image-07.png)

In my example, the contract address is `0xc864D0fef177A69aFa8E302A1b90e450910A4c3E`.

# Client-Side Application - The front end

Now let's start building out the front end that will interact with the smart contract.

We have only 2 files in the front end:

1. index.html
2. index.js

## Index.html

In Register folder, create a file named `index.html`.

Copy and paste the smart contract from the following gist, or copy and paste the code below:

[https://raw.githubusercontent.com/solangegueiros/dapp-register-rsk/master/register-rsk-web3-injected/index.html](https://raw.githubusercontent.com/solangegueiros/dapp-register-rsk/master/register-rsk-web3-injected/index.html)

```html
<!DOCTYPE html>
<html >
  <head>
    <title>Register information at Blockchain</title>

    <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet' type='text/css'>
    <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>
    <script src="./node_modules/web3/dist/web3.min.js"></script>
    <script src="./index.js"></script>
  </head>

  <body class="container">

    <h1 class="page-header">Register information at Blockchain - RSK network</h1>

    <div class="row">
      <div>
        <h3 class="sub-header">Set information</h3>
        <form class="form-inline" role="form">
          <div class="form-group">
            <table>
              <tr>
                <td><label for="newInfo">Info:</label> </td>
                <td>
                  <input class="form-control" id="newInfo">
                </td>
              </tr>
            </table>
          </div>
          <a href="#" onclick="registerSetInfo()" class="btn btn-primary">Set</a>
        </form>
      </div>
    </div>

    <div class="row">
      <div>
        <h3 class="sub-header">Get last information saved</h3>
        <form class="form-inline" role="form">
          <a href="#" onclick="registerGetInfo()" class="btn btn-primary">Get</a>
          <div class="form-group">
            <table>
              <tr>
                <td>Info:</td>
                <td>
                  <label id="lastInfo">
                </td>
              </tr>
            </table>
          </div>
        </form>
      </div>
    </div>

  </body>
</html>

```

## Index.js

In the `Register` folder, create the file `index.js`.

Copy and paste the smart contract from the following gist, or copy and paste the code below:

[https://raw.githubusercontent.com/solangegueiros/dapp-register-rsk/master/register-rsk-web3-injected/index.js](https://raw.githubusercontent.com/solangegueiros/dapp-register-rsk/master/register-rsk-web3-injected/index.js)


```javascript
// Source code to interact with smart contract

// web3 provider with fallback for old version
window.addEventListener('load', async () => {
  // New web3 provider
  if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
          // ask user for permission
          await ethereum.enable();
          // user approved permission
      } catch (error) {
          // user rejected permission
          console.log('user rejected permission');
      }
  }
  // Old web3 provider
  else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      // no need to ask for permission
  }
  // No web3 provider
  else {
      console.log('No web3 provider detected');
  }
});
console.log (window.web3.currentProvider)

// contractAddress and abi are setted after contract deploy
var contractAddress = '0xc864D0fef177A69aFa8E302A1b90e450910A4c3E';
var abi = JSON.parse( '[{"constant":true,"inputs":[],"name":"getInfo","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_info","type":"string"}],"name":"setInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]' );

//contract instance
contract = new web3.eth.Contract(abi, contractAddress);

// Accounts
var account;

web3.eth.getAccounts(function(err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

//Smart contract functions
function registerSetInfo() {
  info = $("#newInfo").val();
  contract.methods.setInfo (info).send( {from: account}).then( function(tx) {
    console.log("Transaction: ", tx);
  });
  $("#newInfo").val('');
}

function registerGetInfo() {
  contract.methods.getInfo().call().then( function( info ) {
    console.log("info: ", info);
    document.getElementById('lastInfo').innerHTML = info;
  });
}
```

This part connected to RSK Local node using the wallet injected, in our case, Metamask:

```javascript
// web3 provider with fallback for old version
window.addEventListener('load', async () => {
  // New web3 provider
  if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
          // ask user for permission
          await ethereum.enable();
          // user approved permission
      } catch (error) {
          // user rejected permission
          console.log('user rejected permission');
      }
  }
  // Old web3 provider
  else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      // no need to ask for permission
  }
  // No web3 provider
  else {
      console.log('No web3 provider detected');
  }
});
```

# Update index.js

Did you remember the address of the smart contract that you copied after deploying it?

It will be updated here:

```javascript
var contractAddress = '0xc864D0fef177A69aFa8E302A1b90e450910A4c3E';
```

# HTML server

In the `Register` folder, create a file named `server.js`.

```javascript
var express = require('express');
var app = express();
app.use(express.static(__dirname));
app.listen('3300');
console.log('Running at\nhttp://localhost:3300');
```

This file configures the express HTML server.

## Run Server

The last step is to execute the express server. Input the command below into the terminal.

```shell
node server.js
```

![node server.js](/assets/img/tutorials/first-frontend-web3-injected/image-08.png)

In your browser, go to:

```shell
http://localhost:3300
```
Click on the **Connect** button when the Metamask Wallet pops up

![register frontend](/assets/img/tutorials/first-frontend-web3-injected/image-17.png)

# Interact with the smart contract

### Get

Click on the **Get** button.

The web3 instance will call the `setInfo()` function on the `register` smart contract instance, with the info that you entered into the text field.

![getInfo](/assets/img/tutorials/first-frontend-web3-injected/image-10.png)

We do not have any information stored, because we did not specify an initial value in the smart contract.

### Set

Enter any value in the info text field, and click on the Set button.

The web3 instance would call the `setInfo()` function at the smart contract instance register, with the info that you defined.

I will enter the value "RSK".

![setInfo](/assets/img/tutorials/first-frontend-web3-injected/image-11.png)

Wait a few seconds for the transaction to be included in a block...

### getInfo (again)

Now we have the value "RSK" saved, and we can check it.

Click on the Get button again

![getInfo again](/assets/img/tutorials/first-frontend-web3-injected/image-12.png)

And it returned the info "RSK".

Great! Now we have an information stored in our smart contract, and we can retrieve it!

### Note

> We have a smart contract with a public function that has no restrictions about who is allowed to call it, but that's just for demonstration purposes.
>
> In a real world smart contract, such checks would be performed in any functions that alter the smart contract state.

# Congratulations!

You have successfully built and deployed your first decentralized application (DApp) powered by RSK smart contracts!

You can download the full source code to this tutorial here:

[https://github.com/solangegueiros/dapp-register-rsk/tree/master/register-rsk-web3-injected](https://github.com/solangegueiros/dapp-register-rsk/tree/master/register-rsk-web3-injected)

Satisfied with this tutorial? I’d appreciate your feedback and you can share it :)
