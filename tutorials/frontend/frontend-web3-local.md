---
layout: rsk
title: Create a frontend for smart contracts using web3 connected to a local node
tags: tutorial, rsk, frontend, web3
description: "How to create a frontend for smart contracts using web3.js directly connected to a local node."
---

In this tutorial I will show you step by step how to create a front end to interact with a smart contract deployed at RSK local network, using only Javascript and HTML.

# Overview

Below is a summary of the steps we would take to achieve this:

1. Run a RSK local node;
2. Connect to an RSK local node using Geth;
3. Initialise a project;
4. Create a smart contract, compile, and generate a deploy script in Remix;
5. Deploy the smart contract in Geth;
6. Install web3.js;
7. Create a javascript file;
8. Create a html file;
9. Install and run a local server;
10. Interact with the smart contract.

Step 1 and 2 are explained in detail in the tutorial links below: 

* [using Geth attach to a RSK local lode](/tutorials/ethereum-devs/geth-attach-local-node/)

Step 4 and 5 are explained in detail in the tutorial links below: 

* [deploy a smart contract at RSK local node using Geth and Remix](/tutorials/ethereum-devs/geth-attach-deploy-smart-contract/)

# Requirements

* Java Runtime Environment
* RSK local node
* Geth
* Remix - web tool, online
* NodeJs and npm
* Visual code or other editor
* HTTP server: express
* web3.js

As mentioned above, the set up for Java JDK, RSK local node, and Geth are explained in detail in the tutorial below: 

* [using Geth attach to a RSK local lode](/tutorials/ethereum-devs/geth-attach-local-node/)

## Node.js and NPM (Node Package Manager)

We need to have Node.js and NPM, which come together.

NB: Check if Node and NPM are already installed by inputting the following commands in the terminal:

```shell
node --version
npm --version
```

![node and npm version](/assets/img/tutorials/frontend-web3-local/image-01.png)

Go to [NodeJS](https://nodejs.org/en/) if you need to install it.

## Visual Studio Code (VSCode)

I am using Visual Studio Code to create and edit my project. 

To use VSCode [download it here](https://code.visualstudio.com/download).

Verify if your VS code installation was successful by typing the following command into the terminal:

```shell
code -v
```

![visual code version](/assets/img/tutorials/frontend-web3-local/image-02.png)

# Create the Register project

Create a folder named Register, and start an npm project in the Register folder, by typing the following commands below into the terminal:

```shell
mkdir Register
cd Register
npm init -y
```

For example, I will create a  folder at this location - `C:\RSK\`

My project can be located in the folder `C:\RSK\Register`.

![Register project](/assets/img/tutorials/frontend-web3-local/image-03.png)

## Express

Express is Node.js web application framework that helps to develop web applications. It is a small HTTP server.

To install the small HTTP server Express, run this command at your project location:

```shell
npm install express --save
```

More info: 

- [http://expressjs.com/](http://expressjs.com/)

- [https://www.npmjs.com/package/express](https://www.npmjs.com/package/express)

## Web3.js

Web3.js helps us to develop websites or clients that interact with the blockchain - writing code that reads and writes data from the blockchain with smart contracts. 

The web3.js library is an Ethereum Javascript API which connects using the generic JSON-RPC spec. As RSK's virtual machine implementation is compatible with the Ethereum Virtual Machine (EVM), it is possible to use web3.js to do the communications between the front-end and the RSK local node.

To install web3.js, run this command at your project location:

```shell
npm install web3 --save
```

More info: 

- [https://web3js.readthedocs.io/](https://web3js.readthedocs.io/)

## Check package.json

`package.json` is a file created by npm with some configurations, including the packages which we installed before.

After the installations, I will open the project at VS Code and verify the file package.json, take a look at dependencies:

![package.json](/assets/img/tutorials/frontend-web3-local/image-04.png)

You will find the previously installed packages:

```json
 "dependencies": {
   "express": "^4.17.1",
   "web3": "^1.2.6"
 }
```

# Run RSK local node

In a window terminal, run the node:

```shell
java -cp <PATH-TO-THE-RSKJ-JAR> -Drpc.providers.web.cors=* co.rsk.Start --regtest
```

(Replace <PATH-TO-THE-RSKJ-JAR> with your path to the JAR file). 

I am using a Windows OS and I saved the file at `C:\RSK\node`, so for me the full path is `C:\RSK\node\rskj-core-2.0.1-PAPYRUS-all.jar`

The commands required to run the RSK node are:

### On Windows

```shell
java -cp C:\RSK\node\rskj-core-2.0.1-PAPYRUS-all.jar -Drpc.providers.web.cors=* co.rsk.Start --regtest
```

### On Linux and Mac

```shell
java -cp /RSK/node/rskj-core-2.0.1-PAPYRUS-all.jar -Drpc.providers.web.cors=* co.rsk.Start --regtest
```

Check the tutorial: [using Geth attach to a RSK local node](/tutorials/ethereum-devs/geth-attach-local-node/) for more details on how to do this.

**Important:**

> Add the parameter  `-Drpc.providers.web.cors=*` before `co.rsk.Start` to enable our RSK local node to accept connections from our front-end, by disabling Cross Origin Resource Sharing (CORS) restrictions.

This is the result on Windows OS:

![run RSK local node](/assets/img/tutorials/frontend-web3-local/image-05.png)

## Geth attach

Open a second terminal and go to the folder’s project, per example:

```shell
cd C:\RSK\Register
```

In this second window terminal, execute the geth attaching it to the node running in the first terminal:

```shell
geth attach [http://127.0.0.1:4444](http://127.0.0.1:4444)
```

![geth attach](/assets/img/tutorials/frontend-web3-local/image-06.png)

Check the tutorial: [Using Geth attach to a RSK local node](/tutorials/ethereum-devs/geth-attach-local-node/) for more details on how to do this.

# Deploy a smart contract

Now we must create the file `register.js`, which is a script to deploy a smart contract and it can be used in geth console to deploy it at RSK local node.

It is explained in detail in the tutorial: 

* [Deploy a smart contract at RSK local node using Geth and Remix](/tutorials/ethereum-devs/geth-attach-deploy-smart-contract/).

![register.js](/assets/img/tutorials/frontend-web3-local/image-07.png)

### Register.sol

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

This smart contract has:

* A variable `info` to store a string
* A function `getInfo()` to return the string stored at variable info
* A function `setInfo()` to change the string stored at variable info

### Deploy the smart contract at Geth console

After creating the file `register.js`, in the second terminal:

```javascript
loadScript("C:/RSK/Register/register.js");
```

![loadScript](/assets/img/tutorials/frontend-web3-local/image-08.png)


Copy the address of the smart contract. We will need it for use in the frontend.


In my example, the contract address is `0x73ec81da0c72dd112e06c09a6ec03b5544d26f05`.

![contract address](/assets/img/tutorials/frontend-web3-local/image-09.png)

**Important:**

> If you receive the return `false` when you try to loadScript, verify:
> - the file's path.
> - make sure you saved the register.js file

# Client-Side Application - The frontend

Now let's start building out the client-side application that will talk to our smart contract. 

We have only 2 files in the front end:

1. index.html
2. index.js

## Index.html

In Register folder, create a file named `index.html`.

Copy and paste a smart contract from the following gist, or inline below:

[https://raw.githubusercontent.com/solangegueiros/dapp-register-rsk/master/register-rsk-web3basic/index.html](https://raw.githubusercontent.com/solangegueiros/dapp-register-rsk/master/register-rsk-web3basic/index.html)

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

Copy and paste a smart contract from the following gist, or inline below:

[https://raw.githubusercontent.com/solangegueiros/dapp-register-rsk/master/register-rsk-web3basic/index.js](https://raw.githubusercontent.com/solangegueiros/dapp-register-rsk/master/register-rsk-web3basic/index.js)


```javascript
// Source code to interact with smart contract

//connection with node
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:4444/'));

// contractAddress and abi are setted after contract deploy
var contractAddress = '0x73ec81da0c72dd112e06c09a6ec03b5544d26f05';
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

This line connects to the RSK Local node:

```javascript
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:4444/'));
```

# Update index.js

Did you remember the address of the smart contract that you copied after deploying it?

It will be updated here:

```javascript
var contractAddress = '0x73ec81da0c72dd112e06c09a6ec03b5544d26f05';
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

## Running

The last step is to execute the express server.

```shell
node server.js
```

![node server.js](/assets/img/tutorials/frontend-web3-local/image-10.png)

In your browser, go to:

```shell
[http://localhost:3300](http://localhost:3300)
```

![register frontend](/assets/img/tutorials/frontend-web3-local/image-11.png)

# Interact with the smart contract

### Get

Click on the Get button.

It will call the function `getInfo()`at the smart contract instance register.

![getInfo](/assets/img/tutorials/frontend-web3-local/image-12.png)

We do not have any info stored, because we did not specify an initial value in the smart contract.

### Set

Enter any value in the info text field, and click on the Set button.

It will call the `setInfo()` function at the smart contract instance register, with the info that you defined.

I will enter the value "RSK".

![setInfo](/assets/img/tutorials/frontend-web3-local/image-13.png)

### getInfo (again)

Now we have the value "RSK" saved, and we can check it.

Click on the Get button again

![getInfo again](/assets/img/tutorials/frontend-web3-local/image-14.png)

And it returned the info "RSK".

Great! Now we have information registered in our smart contract, and we can retrieve it!

# Congratulations!

You have successfully built your first decentralized application (DApp) powered by RSK smart contracts! 

You can download the full source code to this tutorial here:

[https://github.com/solangegueiros/dapp-register-rsk/tree/master/register-rsk-web3basic](https://github.com/solangegueiros/dapp-register-rsk/tree/master/register-rsk-web3basic)

Happy with this tutorial? I’d appreciate your feedback and share it if you like it :)
