---
layout: rsk
title: RIF Relay Operator Manual
tags: rif, relay, gas station network, gsn
permalink: /rif/relay/operator-manual/
---

RIF Relay operator manual can guide you to set up RIF Relay server, register the server, allow new tokens and execute transactions.

## Table of Contents
- [**Hardware Requerements**](#hardware-requirements)
- [**System Requerements**](#system-requerements)
- [**Download and install**](#download-and-install)
  - [**RSK Node**](#rsk-node)
  - [**Yarn**](#yarn)
  - [**Node & NPM**](#node--npm)
  - [**Npx and Truffle**](#npx--truffle)
- [**Deploy contracts locally**](#deploy-contracts-locally)
- [**Deploy contracts on Testnet**](#deploy-contracts-on-testnet)
- [**Run the Relay Server**](#run-the-relay-server)
- [**Register the Relay Server**](#register-the-relay-server)
  - [**On Regtest**](#on-regtest)
  - [**On Testnet**](#on-testnet)
- [**Allow Token Address to BlackList**](#allow-token-address-to-blacklist)
  - [**On Regtest**](#on-regtest-1)
  - [**On Testnet**](#on-testnet-1)

## Hardware requirements

These are the minimum requirements that must be met to run an RIF Relay Server:

- 2 cores
- 4 GB RAM
- 50 GB storage
- OS x64, Linux and Windows

## System Requerements

### RSK Node

You need to have a running RSK node version [IRIS-3.0.0](https://github.com/rsksmart/rskj/releases) or higher.

### Yarn

We use `yarn` version `v1.22.0` or higher for package management. 

Installation instructions at Yarn's [site](https://yarnpkg.com/getting-started/install). Check the install by running `yarn version`.

### Node & NPM

We use `Node` version `v12.18.3` or higher.

We recommend the use of [`nvm`](https://github.com/nvm-sh/nvm) and the `.nvmrc` file included at the root of this project, so you can install the correct node version through:

```
nvm use
nvm install
```

### Npx & Truffle

An important tool we use for interacting with the blockchain is `Truffle` version `v5.0.33` or higher.

You can follow the installation guide in the official [site](https://www.trufflesuite.com/truffle).

## Download And Install

Go to [RIF Relay](https://github.com/rsksmart/rif-relay) and download the release version.

Unzip and open a terminal on the root of the RIF Relay and execute.

```
yarn install
```

## Deploy contracts locally

We'll use `truffle` for deploying contracts. Have an RSK node up and running in regtest mode and then execute the following on the project's root folder:

`npx truffle migrate --network rsk`


After running this command you will see a summary of contracts on the 
terminal, something similar to this:

```
|=================================|============================================|
| Contract                        | Address                                    |
|=================================|============================================|
| Penalizer                       | 0xe8C7C6f18c3B9532343487faD807060750C1fE95 |
| RelayHub                        | 0x3bA95e1cccd397b5124BcdCC5bf0952114E6A701 |
| SampleRecipient                 | 0x5D0aBdE7Ed6B7e122eD55EAe514E617d6c08f407 |
| SmartWallet                     | 0xB7a001eE69E7C1eef25Eb8e628e46214Ea74BF0F |
| SmartWalletFactory              | 0x8C1108cFCd7ddad09D8910e5f42982A6c54aD9cD |
| SmartWalletDeployVerifier       | 0x1938517B0762103d52590Ca21d459968c25c9E67 |
| SmartWalletRelayVerifier        | 0x74Dc4471FA8C8fBE09c7a0C400a0852b0A9d04b2 |
| CustomSmartWallet               | 0x96A90Ee24C20c78Ba20AcE1a2aa4D59F79353C54 |
| CustomSmartWalletFactory        | 0x89bac3BB0517F7Dc0E5E94265217A9Acc5cc489f |
| CustomSmartWalletDeployVerifier | 0x3eE31F6049065B616f85470985c0eF067f2bEbDE |
| CustomSmartWalletRelayVerifier  | 0xDE8Ae20488BE104f0782C0126038b6682ECc1eC7 |
|=================================|============================================|
```

You'll need to save this summary for later use.

## Deploy contracts on Testnet

We'll use `truffle` for deploying contracts.

```
npx truffle migrate --network rsktestnet
``` 
*Disclaimer: to use testnet, you should have an unlocked account with funds or configure it in `truffle.js`.*

These contracts have been deployed on Testnet. See [here](/rif/relay/contracts/) for their addresses.

## Run the Relay Server
To start the relay server, you need to configure the json config file located at `<PROJECT_ROOT>/jsrelay/config/relay-config.json` which has this structure:
   
```json
{
  "url": "localhost",
  "port": 8090,
  "relayHubAddress": "0x3bA95e1cccd397b5124BcdCC5bf0952114E6A701",
  "relayVerifierAddress": "0x74Dc4471FA8C8fBE09c7a0C400a0852b0A9d04b2",
  "deployVerifierAddress": "0x1938517B0762103d52590Ca21d459968c25c9E67",
  "gasPriceFactor": 1,
  "rskNodeUrl": "http://rsk-node:4444",
  "devMode": true,
  "customReplenish": false,
  "logLevel": 1,
  "workdir": "/home/user/workspace/relay"
}
```

Where:
- **url**: is the URL where the relay server will be deployed, it could be localhost or the IP of the host machine.
- **port**: the port where the relay server will be hosted.
- **relayHubAddress**: is the relay hub contract address, you can retrieve this from the contract summary.
- **relayVerifierAddress**: is the relay verifier contract address, you can retrieve this from the contract summary.
- **deployVerifierAddress**: is the deploy verifier contract address, you can retrieve this from the contract summary.
- **gasPriceFactor**: is the gas price factor used to calculate the gas on the server, you can leave it as 1.
- **rskNodeUrl**: is the RSK node endpoint URL, where the RSK node is located.
- **devMode**: it indicates to the server if we are in development mode or not.
- **customReplenish**: set if the server uses a custom replenish function or not.
- **logLevel**: is the log level for the relay server.
- **workdir**: is the absolute path to the folder where the server will store the database and all its data.

Afterwards, run `yarn relay` to start the server.

If it's the first time the server is run, some logs will state that the server isn't ready and that some values are wrong. This is expected, you just need to register the server on the relay hub in order for it to be usable by the clients.

## Register the Relay Server

### On Regtest

Once the relay server is up, you need to register this server in order for it to be usable, to do so, first configure the script located on `<PROJECT_ROOT>/scripts/registerRelayServer` and replace the values as you see fit. The script contains the following:

```bash
node dist/src/cli/commands/enveloping.js relayer-register --funds 100 --stake 200 --network http://rsk-node:4444/ --hub "0x3bA95e1cccd397b5124BcdCC5bf0952114E6A701"
```

Where:

* **--funds**: indicates the amount of RBTC that you will transfer from accounts[0] to the worker manager account.
* **--stake**: how much RBTC the server will stake. twice the value of funds is an acceptable value.
* **--hub**: is the relay hub contract address, you can retrieve this from the contract summary.
* **--network**: is the url of the rsk node API.

After doing that you need to open another terminal and run the `yarn registerRelay` command on the root of the relay project in order to register the relay. 

After running this command you will be seeing several log entries indicating how everything is turning out. After a little while, look for this entry in the relay server execution terminal to make sure that the server is ready:

```
Relayer state: READY
```

### On Testnet

1.  In another terminal run `curl http://<SERVER_URL>/getaddr`, which will return a JSON with information of the running jsRelay Server, for example:
```json
{
  "relayWorkerAddress": "0xe722143177fe9c7c58057dc3d98d87f6c414dc95",
  "relayManagerAddress": "0xe0820002dfaa69cbf8add6a738171e8eb0a5ee54",
  "relayHubAddress": "0x38bebd507aBC3D76B10d61f5C95668e1240D087F",
  "minGasPrice": "6000000000",
  "chainId": "31",
  "networkId": "31",
  "ready": false,
  "version": "2.0.1"
}
```
2. Send to relayManagerAddress at least 0.001 tRBTC to set it up
3. Send to relayWorkerAddress at least 0.001 tRBTC to set it up
4. Once both addresses have been funded, run:

```bash
node dist/src/cli/commands/enveloping.js relayer-register --network <RSKJ_NODE_URL> --hub <RELAY_HUB_CONTRACT_ADDRESS> -m <secret_mnemonic> --from <ADDRESS>  --funds <FUNDS> --stake <STAKE> --relayUrl <RELAY_URL>
``` 

where: 
- `<secret_mnemonic>` contains the path to a file with the mnemonic of a funded account to use during the relay server registration
- `<ADDRESS>` is the account address associated to that mnemonic.

## Allow Token Address to BlackList
Now the final step is to allow some tokens to be used by enveloping on the smart wallets.

### On Regtest

On regtest you can use a script located at `<PROJECT_ROOT>/scripts/allowTokens`. This script needs to be configured, and this is what it looks like:
   
```bash
#!/bin/bash

TOKEN_ADDRESSES="0x0E569743F573323F430B6E14E5676EB0cCAd03D9,0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8"
SMART_WALLET_DEPLOY_VERIFIER_ADDRESS="0x1938517B0762103d52590Ca21d459968c25c9E67"
SMART_WALLET_RELAY_VERIFIER_ADDRESS="0x74Dc4471FA8C8fBE09c7a0C400a0852b0A9d04b2"
CUSTOM_SMART_WALLET_DEPLOY_VERIFIER_ADDRESS="0x3eE31F6049065B616f85470985c0eF067f2bEbDE"
CUSTOM_SMART_WALLET_RELAY_VERIFIER_ADDRESS="0xDE8Ae20488BE104f0782C0126038b6682ECc1eC7"
NETWORK=33
RSK_HOST="rsk-node"
RSK_PORT=4444

TRUFFLE_CONFIG="module.exports = {  networks: { development: { host: '${RSK_HOST}', port: ${RSK_PORT}, network_id: '${NETWORK}' } } };"

echo "${TRUFFLE_CONFIG}" > truffle-config.js
...
```

Where:

* **TOKEN_ADDRESSES**: it's a comma separated list of token addresses to be allowed.
* **SMART_WALLET_DEPLOY_VERIFIER_ADDRESS**: is the smart wallet deploy verifier contract address, you can retrieve this from the contract summary.
* **SMART_WALLET_RELAY_VERIFIER_ADDRESS**: is the smart wallet relay verifier contract address, you can retrieve this from the contract summary.
* **CUSTOM_SMART_WALLET_DEPLOY_VERIFIER_ADDRESS**: is the custom smart wallet deploy verifier contract address, you can retrieve this from the contract summary.
* **CUSTOM_SMART_WALLET_RELAY_VERIFIER_ADDRESS**: is the custom smart wallet relay verifier contract address, you can retrieve this from the contract summary.
* **NETWORK**: the network id that for regtest is 33 so can leave it as it is.
* **RSK_HOST**: the RSK node endpoint host.
* **RSK_PORT**: the RSK node endpoint port.

After configuring that script you need to run it and wait until it finishes.

**Important Note**: the script to allow tokens assumes you are in regtest and uses the `account[0]` as the owner of the contracts and that's important because
only the owner can allow tokens on the contracts.

### On Testnet

There is no script for this situation, so you will need to call the method `acceptToken(address token)` directly in the following contracts, using an account with tRBTC:

- `SmartWalletDeployVerifier`
- `SmartWalletRelayVerifier`
- `CustomSmartWalletDeployVerifier`
- `CustomSmartWalletRelayVerifier`
