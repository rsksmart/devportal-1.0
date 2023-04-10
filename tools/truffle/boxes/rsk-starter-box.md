---
menu_order: 200
menu_title: RSK starter box
layout: rsk
title: RSK starter box
tags: truffle, ganache, quick-start, dapps, rsk-starter-box, truffle-boxes, open zeppelin, testing, networks, deployment, npm, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, guides, tutorial
---

# RSK Truffle Starter Box

This box comes with everything you need to start using Truffle on [RSK Blockchain](https://developers.rsk.co/rsk/).
It includes network configurations for Mainnet, Testnet and the SimpleStorage contract as an example to deploy.

[RSK](https://www.rsk.co/) is an open source platform for Ethereum compatible smart contracts based on the Bitcoin network.

## Requirements

1. [NPM (Node Package Manager)](https://nodejs.org/en/)
Node.js and NPM are needed, though both are usually installed at once.

Go to [Node.js](https://nodejs.org/en/) if you need to install it.

2. Truffle

Install Truffle globally

```shell
npm install -g truffle
```

## Installation

1. Create a new folder.
For example, create the folder `rsk-starter`.
Navigate to the folder in the terminal.

```shell
mkdir rsk-starter
cd rsk-starter
```

2. Run the unbox command. This will install all necessary dependencies.

```shell
truffle unbox rsksmart/rsk-starter-box
```

## Development console

Truffle has an interactive console that also spawns a development blockchain. This is very useful for compiling, deploying and testing locally.

3. Run the development console.

```shell
truffle develop
```

4. Take a look at the smart contract `SimpleStorage.sol`. You can check it out in folder `contracts`.

This smart contract has:

* A variable `storedData` to store a number
* A function `get()` to return the number stored at variable `storedData`
* A function `set()` to change the number stored at variable `storedData`


5. Compile and migrate the smart contract. Note inside the development console we don't preface commands with truffle.

```javascript
compile
migrate
```

6. Running contract tests.

Our box also comes with the file `TestSimpleStorage.js` for testing the smart contract. You can check it out in the `test` folder.

```javascript
test
```

**NOTE**: This box is the starting point for the RSK tutorial [Using rsk-starter-box](https://developers.rsk.co/tutorials/truffle-boxes/rsk-starter-box/).

## Using RSK networks

Truffle makes developing on RSK easier because we can configure custom networks for RSK. The networks are already configured in the `truffle-config.js` file.

### Setup an account & get RBTC

- Get an address using [these instructions](https://developers.rsk.co/rsk/architecture/account-based/ "Account Based RSK Addresses - RSK Developers Portal").
- For the RSK Testnet, get tRBTC from [our faucet](https://faucet.testnet.rsk.co/).
- For the RSK Mainnet, get RBTC from [an exchange](https://www.rsk.co/#exchanges-rsk).

### Setup the gas price

**Gas** is the internal pricing for running a transaction or contract. When you send tokens, interact with a contract, send RBTC, or do anything else on the blockchain, you must pay for that computation. That payment is calculated as gas. In RSK, this is paid in **RBTC**.
The **minimumGasPrice** is written in the block header by miners and establishes the minimum gas price that a transaction should have in order to be included in that block.

To get the **minimumGasPrice** do the following steps:
1. Run this query using cURL:

    **Mainnet**

    ```shell
    curl https://public-node.rsk.co/ \
        -X POST -H "Content-Type: application/json" \
        --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}'
    ```

    **Testnet**

    ```shell
    curl https://public-node.testnet.rsk.co/ \
        -X POST -H "Content-Type: application/json" \
        --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}'
    ```

2. Find in the result the field **_minimumGasPrice_**

For more information about the **Gas** and **minimumGasPrice** please go [here](https://developers.rsk.co/rsk/rbtc/gas/ "Gas - RSK Developers Portal").

### Connect to RSK

1. Copy your mnemonic to `truffle-config.js`

    ```
    // truffle-config.json

    const HDWalletProvider = require('@truffle/hdwallet-provider');

    //Put your mnemonic here, be careful not to deploy your mnemonic into production!
    const mnemonic = 'A_MNEMONIC';
    ```
    Please be aware that we are using `HDWalletProvider` with RSK Networks derivations path:
    - RSK Mainnet dpath: `m/44’/137’/0’/0`
    - RSK Testnet dpath: `m/44’/37310’/0’/0`

    For more information check [RSKIP57](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP57.md).

2. Check the gas price of the network, and update `truffle-config.js` if necessary.

3. Run the truffle console for any RSK network.

    ```shell
    # Console for Mainnet
    truffle console --network mainnet

    # Console forn Testnet
    truffle console --network testnet
    ```

4. Compile and migrate the smart contracts. Note that inside the development console, we don't preface commands with truffle.

    ```javascript
    compile
    migrate
    ```

5. Another option is to run the below commands directly in the terminal, out of the truffle console.

    ```shell
    truffle compile
    truffle migrate
    ```

## Next steps

- **Go to tutorial**

Go to the tutorial [Using rsk-starter-box](https://developers.rsk.co/tutorials/truffle-boxes/rsk-starter-box/) to learn how to interact with `SimpleStorage.sol`. Also, we covered all the steps with more details, explanations, and images.

- **Find more documentation**

Check out the [RSK developers portal](https://developers.rsk.co/).

- **Do you have questions?**

Ask in [the RSK community Slack](/slack/).
