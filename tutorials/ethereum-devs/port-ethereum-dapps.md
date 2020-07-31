---
layout: rsk
title: Port Ethereum dApps
tags: tutorial, rsk, ethereum dapps, ethereum, solidity
description: "How to port an Ethereum dApp to RSK, using Truffle framework connected to RSK testnet"
render_features: "custom-terminals"
---

<style>
  img.port-eth-app-img{
    margin:0 auto;
    width: 80%;
  }
</style>

Smart contracts for RSK are written using Solidity (a Javascript like programming language) and are fully compatible with Ethereum Smart Contracts, so you can migrate your existing Ethereum Smart Contract to RSK without changing the smart contract.

### Translations

#### Portuguese - Português

Este artigo está disponível em Português: [Migrando dApps do Ethereum para RSK](https://solange.dev/2020/rsk-port-ethereum-dapps/ "Migrando dApps do Ethereum para RSK").

E também fizemos um [webinar](/webinars/202007-006/ "Migrando dApps do Ethereum para RSK")  sobre o assunto, veja o [vídeo](https://youtu.be/-7Oi9_BDr5k)

### Solidity

New to Solidity? You can learn more using the [Solidity docs](https://solidity.readthedocs.io/).

## Requirements

* Code editor
* Node.js and NPM (Node Package Manager)
* Truffle Framework

### Code editor

You can edit Solidity using any text editor but it is a good idea to use more advanced tools, the following is a list of some of them:

- [Visual Studio Code - VS Code](https://code.visualstudio.com/)
- [Atom](https://atom.io/)
- [Sublime Text](https://www.sublimetext.com/)

### Node.js and NPM

Another dependency is NPM, which comes bundled with Node.js. If you need it, go to [Node.js](https://nodejs.org/en/) install.

Note that NPM is usually installed together with Node.js, so after installing Node.js, there's no need to install it separately.

If you want to have more than one version installed,
the most fuss-free way to install and manage multiple versions of `node` on your computer is via [nvm](https://github.com/nvm-sh/nvm).

### Truffle Framework

Truffle is an open source framework that facilitates the testing and development of smart contracts. It allows you to connect to a local RSK node and call the compiler, run unit tests, and publish your smart contracts easily. Check out [this tutorial](https://github.com/rsksmart/truffle-integration) which demonstrates the usage of Truffle and Ganache with a local RSK node.

In this tutorial, we will use Truffle for compiling and publishing our smart contracts.

Enter the following command in the terminal to install truffle on your local machine:

```shell
npm install -g truffle
```

## Step 1 : Import Existing Code

First, you need to create a project.

### Initialize an empty Truffle project

Create a new folder and a Truffle project using the commands below:

```shell
mkdir rsk-truffle-example
cd rsk-truffle-example
truffle init
```

The init command will create 3 folders and a configuration file for this project. The solidity files are in the contracts folder.

### Install HD wallet provider

To connect to the RSK network, we are going to use a provider that allows us to connect to any network by unlocking an account locally. We are going to use `@truffle/hdwallet-provider`.
This can be used to sign transactions for addresses derived from a 12 or 24 word mnemonic.

> You need to have Node >= 7.6 installed.

In the terminal, inside the project folder, install the HD wallet provider with this command:

```shell
npm install -E @truffle/hdwallet-provider@1.0.34
```

This `truffle package` comes with many dependencies, and can take a long time to complete.
A successful installation message is shown if everything works fine.

### Copy Ethereum Contract Code

In this tutorial, we are going to use the token contract code from [Consensys/Token] (https://github.com/ConsenSys/Tokens) as the example.

In the `contracts` folder, create two files named `EIP20.sol` and `EIP20Interface.sol`.

#### EIP20Interface.sol

```
pragma solidity ^0.4.21;

contract EIP20Interface {
    /* This is a slight change to the ERC20 base standard.
    function totalSupply() constant returns (uint256 supply);
    is replaced with:
    uint256 public totalSupply;
    This automatically creates a getter function for the totalSupply.
    This is moved to the base contract since public getter functions are not
    currently recognised as an implementation of the matching abstract
    function by the compiler.
    */
    /// total amount of tokens
    uint256 public totalSupply;

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) public view returns (uint256 balance);

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) public returns (bool success);

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);

    /// @notice `msg.sender` approves `_spender` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of tokens to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint256 _value) public returns (bool success);

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) public view returns (uint256 remaining);

    // solhint-disable-next-line no-simple-event-func-name
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}
```

#### EIP20.sol

```
pragma solidity ^0.4.21;

import "./EIP20Interface.sol";

contract EIP20 is EIP20Interface {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show.
    string public symbol;                 //An identifier: eg SBX

    function EIP20(
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol
    ) public {
        balances[msg.sender] = _initialAmount;               // Give the creator all initial tokens
        totalSupply = _initialAmount;                        // Update total supply
        name = _tokenName;                                   // Set the name for display purposes
        decimals = _decimalUnits;                            // Amount of decimals for display purposes
        symbol = _tokenSymbol;                               // Set the symbol for display purposes
        emit Transfer(msg.sender, msg.sender, 0);
        emit Approval(msg.sender, msg.sender, 0);
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}
```

We also need to create a migration script in the migrations folder: 
`migrations/2_deploy_tokens.js`

```
const EIP20 = artifacts.require('./EIP20.sol');

module.exports = (deployer) => {
  deployer.deploy(EIP20, 10000, 'Simon Bucks', 1, 'SBX');
};
```

## Step 2 : Deploy Solidity Code as RSK Smart Contract

We are going to deploy the example smart contract on to the RSK Testnet.

### Testnet and Faucet

First, we need to obtain an account on RSK Testnet and get some tR-BTC from the Testnet faucet.

**Create new Account with MetaMask**

1. Open MetaMask Chrome extension
1. In the network options, choose `custom RPC`
1. Enter RSK Testnet as the Network Name
1. Enter https://public-node.testnet.rsk.co as the RPC URL
1. Enter R-BTC as SymbolPut and Save
1. Copy the account address

<img alt="Configure MetaMask for RSK Testnet" class="port-eth-app-img" src="/assets/img/tutorials/port-ethereum-dapps/metamask-testnet.png">

**Get tR-BTC**

Visit the [faucet](https://faucet.testnet.rsk.co/) to gain some tR-BTC to use in the Testnet.

Enter the account address from MetaMask and wait for several seconds for MetaMask to refresh the new balance.

<img class="port-eth-app-img" src="/assets/img/tutorials/port-ethereum-dapps/testnet-faucet.png">

### Testnet Explorer

You will be able to check the Testnet's transactions and blocks in real time at 
[explorer.testnet.rsk.co](https://explorer.testnet.rsk.co/)

### Get the current gas price of testnet

Get the current gas price of the testnet network, and save to `.gas-price-testnet.json`.

In your project folder, run this cURL command:

```shell
curl https://public-node.testnet.rsk.co/ -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' > .gas-price-testnet.json
```

You should receive a response similar to the following in the file:

```json
{"jsonrpc":"2.0","id":1,"result":"0x3938700"}
```

The result value is presented in hexadecimal.

### Truffle Configuration

Edit the `truffle-config.js` to be same as the code below. The `truffle-config.js` file directs Truffle to connect to the public Testnet node.

```javascript
var HDWalletProvider = require('@truffle/hdwallet-provider')

var mnemonic = 'thing tuition ranch ... YOUR MNEMONIC'
var publicTestnetNode = 'https://public-node.testnet.rsk.co/'

const fs = require('fs');
const gasPriceTestnetRaw = fs.readFileSync(".gas-price-testnet.json").toString().trim();
const gasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result, 16);
if (typeof gasPriceTestnet !== 'number' || isNaN(gasPriceTestnet)) {
  throw new Error('unable to retrieve network gas price from .gas-price-testnet.json');
}
console.log("Gas price Testnet: " + gasPriceTestnet);

module.exports = {
  networks: {
    rskTestnet: {
      provider: () => new HDWalletProvider(mnemonic, publicTestnetNode),
      network_id: 31,
      gasPrice: Math.floor(gasPriceTestnet * 1.1),
      networkCheckTimeout: 1e9
    }
  },
  compilers : {
     solc: {
      version: "0.4.24",
      evmVersion: "byzantium"
     }
  }
}
```

### Truffle Console connected to RSK network

Truffle has its own console to run commands, and can be connected on any network previously configured in `truffle-config.js` file. To connect Truffle console to a network, you need to specify the network.

In the terminal, inside the `rsk-truffle-example` folder, run this command to connect to RSK testnet:

```shell
truffle console --network rskTestnet
```

It may take a while to establish the connection.
This will open a new console, with this prompt:

```windows-command-prompt
truffle(rskTestnet)>  
```

### Compile and Deploy

Enter the following commands in the Truffle console to compile and deploy the contracts.

```shell
compile
migrate
```

## Step 3 : Execute the Smart Contract

Once the deployment is successful. We can call smart contract methods directly in the truffle console.

**Check Account Balance**

Enter the following command into the truffle console.

```javascript
EIP20.deployed().then((instance=>instance.balanceOf("0x7073F4af7bcBDd63aCC8Cb1D62877d3c7a96Ef52")))
```

EIP20 is the name of our contract. This command will print out the balance of account address `0x7073F4af7bcBDd63aCC8Cb1D62877d3c7a96Ef52` as a big number. To see it as an integer, change the command to

```javascript
EIP20.deployed().then((instance=>instance.balanceOf("0x7073F4af7bcBDd63aCC8Cb1D62877d3c7a96Ef52").then(b=>b.toNumber())))
```

The balance is 0.

**Transfer Token Directly Between Two Accounts**

Now use the following command to transfer 1 token from the minter's account to the previous account

```shell
EIP20.deployed().then((instance=>instance.transfer("0x7073F4af7bcBDd63aCC8Cb1D62877d3c7a96Ef52", 1)))
```

After its successful execution, check account `0x7073F4af7bcBDd63aCC8Cb1D62877d3c7a96Ef52` again to see the change in balance.

```javascript
EIP20.deployed().then((instance=>instance.balanceOf("0x7073F4af7bcBDd63aCC8Cb1D62877d3c7a96Ef52").then(b=>b.toNumber())))
```

## Step 4 : Deploy to Mainnet

Deploying Smart Contracts to RSK Mainnet can follow the same steps as the Testnet.

#### Mainnet Node

The [public node](/rsk/public-nodes) of RSK Main Net is https://public-node.rsk.co

#### Gasprice in Mainnet

Get the current gas price of the mainnet network, and save to `.gas-price-mainnet.json`.

In your project folder, run this cURL command:

```shell
curl https://public-node.rsk.co/ -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' > .gas-price-mainnet.json
```

#### Update truffle-config

In the `truffle-config.js` file, add the following code after the testnet part:

```javascript
var publicMainnetNode = 'https://public-node.rsk.co/'

const gasPriceMainnetRaw = fs.readFileSync(".gas-price-mainnet.json").toString().trim();
const gasPriceMainnet = parseInt(JSON.parse(gasPriceMainnetRaw).result, 16);
if (typeof gasPriceMainnet !== 'number' || isNaN(gasPriceMainnet)) {
  throw new Error('unable to retrieve network gas price from .gas-price-mainnet.json');
}
console.log("Gas price Mainnet: " + gasPriceMainnet);
```

Also include this configuration at `network` section:

```javascript
    rskMainnet: {
      provider: () => new HDWalletProvider(mnemonic, publicMainnetNode),
      network_id: 30,
      gasPrice: Math.floor(gasPriceMainnet * 1.01),
      networkCheckTimeout: 1e9
    },
```

#### Mainnet Explorer

You will be able to check the Mainnet's transactions and blocks in real time on
[explorer.rsk.co/](https://explorer.rsk.co/)

#### Get R-BTC through 2-way peg

To deploy onto Mainnet, we need to get some [R-BTC](/rsk/rbtc/).

- You can check the [2-way peg](/rsk/architecture/2-way-peg/) mechanism between BTC and R-BTC.
- Or you can buy in these [exchanges](/rsk/rbtc/#exchanges)
