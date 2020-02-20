---
layout: rsk
title: Truffle Box (rsk-starter-box)
---

# RSK Truffle Starter Box

## Description

This box comes with everything you need to start using Truffle on RSK Network. It includes network configurations for Mainnet and Testnet.

## Installation

First ensure you are in a new and empty directory.

1. Install Truffle globally

    ```shell
    npm install -g truffle
    ```

2. Run the unbox command. This will install all necessary dependencies.

    ```shell
    truffle unbox rsksmart/rsk-starter-box
    ```

3. Run the development console.

    ```shell
    truffle develop
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with truffle.

    ```shell
    compile
    migrate
    ```

**NOTE**: This truffle box is not a complete dapp.

## RSK

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

3. Run the development console for any RSK network.

    ```shell
    # Console for Mainnet
    truffle console --network mainnet

    # Console forn Testnet
    truffle console --network testnet
    ```

4. Compile and migrate the smart contracts. Note that inside the development console, we don't preface commands with truffle.

    ```shell
    compile
    migrate
    ```
