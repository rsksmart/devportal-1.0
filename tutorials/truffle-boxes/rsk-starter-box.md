---
layout: rsk
title: Truffle Box (rsk-starter-box)
---

## Description

This box comes with everything you need to start using Truffle on RSK Network. It includes network configs for Mainnet and Testnet.

## Installation

First ensure you are in a new and empty directory.

1. Install Truffle globally

    ```
    npm install -g truffle
    ```

2. Run the unbox command. This will install all necessary dependencies.

    ```
    truffle unbox rsksmart/rsk-starter-box
    ```

3. Run the development console.

    ```
    truffle develop
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with truffle.

    ```
    compile
    migrate
    ```

**NOTE**: This box is not a complete dapp.

## RSK

### Setup an account & Get RBTC

To get an address please go [here](https://developers.rsk.co/rsk/architecture/account-based/).
If you are in RSK Testnet you can get tRBTC from our [Faucet](https://faucet.testnet.rsk.co/). For RSK Mainnet go [here](https://www.rsk.co/#exchanges-rsk).

### Setup the gas price

**Gas** is the internal pricing for running a transaction or contract. When you send tokens, interact with a contract, send RBTC, or do anything else on the blockchain, you must pay for that computation. That payment is calculated as gas. In RSK this is paid in **RBTC**.
The **minimumGasPrice** is written in the block header by miners and establishes the minimum gas price a transaction should have in order to be included in that block.

To get the **minimumGasPrice** do the following steps:
1. Run this query using cURL:
    **Mainnet**
    ```
    curl https://public-node.rsk.co/ \
        -X POST -H "Content-Type: application/json" \
        --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}'
    ```
    **Testnet**
    ```
    curl https://public-node.testnet.rsk.co/ \
        -X POST -H "Content-Type: application/json" \
        --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}'
    ```
2. Find in the result the field **_minimumGasPrice_**

For more information about the **Gas** and **minimumGasPrice** please go [here](https://developers.rsk.co/rsk/rbtc/gas/). 

### Connect to RSK

1. Copy your mnemonic to `truffle-config.js`

    ```
    // truffle-config.json

    const HDWalletProvider = require('@truffle/hdwallet-provider');

    //Put your mnemonic here, take care of this and don't deploy your mnemonic into production!
    const mnemonic = 'A_MNEMONIC';
    ```

2. Check the gas price of the network and update it if it is necessary in `truffle-config.js`


3. Run the development console for any RSK network.

    ```
    # Console for Mainnet
    truffle console --network mainnet

    # Console forn Testnet
    truffle console --network testnet
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with truffle.

    ```
    compile
    migrate
    ```

## Repo

[github.com/rsksmart/rsk-starter-box](https://github.com/rsksmart/rsk-starter-box)
