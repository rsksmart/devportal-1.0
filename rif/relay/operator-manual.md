---
layout: rsk
title: RIF Relay Operator Manual
tags: rif, relay, gas station network, gsn
permalink: /rif/relay/operator-manual/
---

RIF Relay operator manual can guide you to set up RIF Relay server, register the server, allow new tokens, create smart wallets, deploy smart wallets and execute transactions.

## Table of Contents
- [**Hardware Requerements**](#hardware-requirements)
- [**System Requirements**](#system-requirements)
- [**Download and install**](#download-and-install)
  - [**RSK Node**](#rsk-node)
  - [**Yarn**](#yarn)
  - [**Node and nvm**](#node-and-nvm)
  - [**Npx and Truffle**](#npx-and-truffle)
- [**Deploy contracts locally**](#deploy-contracts-locally)
- [**Deploy contracts on Testnet**](#deploy-contracts-on-testnet)
- [**Run the RIF Relay Server**](#run-the-rif-relay-server)
- [**Register the RIF Relay Server**](#register-the-relay-server)
  - [**On Regtest**](#on-regtest)
  - [**On Testnet**](#on-testnet)
- [**Allow Token Address to Whitelist**](#allow-token-address-to-whitelist)
  - [**On Regtest**](#on-regtest-1)
  - [**On Testnet**](#on-testnet-1)
- [**How to Monitor the Address Used to RIF Relay Transactions**](#how-to-monitor-the-address-used-to-rif-relay-transactions)
  - [**On Regtest**](#on-regtest-1)
  - [**On Testnet**](#on-testnet-1)
- [**Create a Small Wallet**](#create-a-smart-wallet)
- [**Deploy a Smart Wallet**](#deploy-a-smart-wallet)
- [**RIF Relay Transaction**](#rif-relay-transaction)

## Hardware requirements

These are the minimum requirements that must be met to run a RIF Relay Server:

- 2 cores
- 4 GB RAM
- 50 GB storage
- OS x64, Linux and Windows

## System Requirements

### RSK Node

You need to have a running RSK node version [IRIS-3.0.0](https://github.com/rsksmart/rskj/releases) or higher.

### Yarn

We use `yarn` version `v1.22.0` or higher for package management. 

Installation instructions at Yarn's [site](https://yarnpkg.com/getting-started/install). Check the install by running `yarn version`.

### Node and nvm

We use `Node` version `v12.18.3` or higher.

We recommend the use of [`nvm`](https://github.com/nvm-sh/nvm) and the `.nvmrc` file included at the root of this project, so you can install the correct node version through:

```
nvm use
nvm install
```

### Npx and Truffle

An important tool we use for interacting with the blockchain is `Truffle` version `v5.0.33` or higher.

You can follow the installation guide on the official [site](https://www.trufflesuite.com/truffle).

To install NPX execute `npm install -g npx`.

## Download and install

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

## Run the RIF Relay Server
To start the RIF Relay server, you need to configure the JSON config file located at `<PROJECT_ROOT>/jsrelay/config/relay-config.json` which has this structure:
   
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
* **--network**: is the URL of the RSK node API.

After doing that, you need to open another terminal and run the `yarn registerRelay` command on the root of the relay project in order to register the relay. 

After running this command, you will be seeing several log entries indicating how everything is turning out. After a little while, look for this entry in the relay server execution terminal to make sure that the server is ready:

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

## Allow Token Address to Whitelist
Now the final step is to allow some tokens to be used by relay on the smart wallets.

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

* **TOKEN_ADDRESSES**: it's a comma-separated list of token addresses to be allowed.
* **SMART_WALLET_DEPLOY_VERIFIER_ADDRESS**: is the smart wallet deploy verifier contract address, you can retrieve this from the contract summary.
* **SMART_WALLET_RELAY_VERIFIER_ADDRESS**: is the smart wallet relay verifier contract address, you can retrieve this from the contract summary.
* **CUSTOM_SMART_WALLET_DEPLOY_VERIFIER_ADDRESS**: is the custom smart wallet deploy verifier contract address, you can retrieve this from the contract summary.
* **CUSTOM_SMART_WALLET_RELAY_VERIFIER_ADDRESS**: is the custom smart wallet relay verifier contract address, you can retrieve this from the contract summary.
* **NETWORK**: the network id that for regtest is 33 so can leave it as it is.
* **RSK_HOST**: the RSK node endpoint host.
* **RSK_PORT**: the RSK node endpoint port.

After configuring that script you need to run it and wait until it finishes.

**Important Note**: the script to allow tokens assumes you are in regtest and uses the `account[0]` as the owner of the contracts and that's important because only the owner can allow tokens on the contracts.

### On Testnet

There is no script for this situation, so you will need to use web3 to instantiate these contracts:
- `SmartWalletDeployVerifier`
- `SmartWalletRelayVerifier`
- `CustomSmartWalletDeployVerifier`
- `CustomSmartWalletRelayVerifier`

 Then call the method `acceptToken(address token)` directly in each contract, using an account with tRBTC.

## How to Monitor the Address Used to RIF Relay Transactions
It is important to verify the address used to relay transactions to have enough balance (rBTC).
To get the `relayWorkerAddress`, the user can call the relay server endpoint `<host:port>/getaddr`. The following information will be returned:
{
  - `"relayWorkerAddress":"0x242870b75325309f3d1aa635fe175390fd8c15ea"`,
  - `"relayManagerAddress":"0xaf0e7d0d4ca272181680897d9358724564e88828"`,
  - `"relayHubAddress":"0x49b770a30156aDC02a08E1dd0d7CEAb021ABF34D"`,
  - `"minGasPrice":"1"`,
  - `"chainId":"33"`,
  - `"networkId":"33"`,
  - `"ready":true`,
  - `"version":"2.0.1"`
  }

## Create a Smart Wallet

There are **two ways** to create a Smart Wallet:

1. **Regular transaction:** The Requester (or another account on behalf of the Requester) calls the Proxy Factory asking to get a new Smart Wallet. Therefore the Proxy Factory creates a proxy to the SmartWallet code, delegating the ownership to the Requester.
2. **Sponsored:** It needs to go through the RIF Relay process, which is described in detail below. The requester asks a third party to pay for the Smart Wallet deployment, and the requester pays in tokens for that (or free if it is subsidized by the third-party, a.k.a, Sponsor).


## Deploy a Smart Wallet

To deploy a smart wallet, we need to do some steps to generate the wallet address, fund it and finally deploy the smart wallet. Here below the steps required:

1. Generate your smart wallet address. To do this, you need to call the method `getSmartWalletAddress` on the
   `SmartWalletFactory` contract, it can be found in the relay repo under `src/cli/compiled/SmartWalletFactory.json`.
   You need to extract the abi from there and then use it to instantiate the contract with web3.
   Here is an example of how to do it:
   ```javascript
        import Web3 from "web3";

        const web3 = new Web3(<RSK_NODE_ENDPOINT>);

        const smartWalletAddress = await new web3.eth.Contract(
            <SMART_WALLET_FACTORY_ABI>,
            <SMART_WALLET_FACTORY_ADDRESS>
        ).methods.getSmartWalletAddress(
            <RSK_ACCOUNT_ADDRESS>,
            <SMART_WALLET_RECOVERER>,
            <SMART_WALLET_INDEX>
        ).call();
   ```
   Where variables are:

   * **RSK_NODE_ENDPOINT**: the RSK node endpoint where is running (e.g., http://localhost:4444).
   * **SMART_WALLET_FACTORY_ABI**: the smart wallet factory contract abi json to use.
   * **SMART_WALLET_FACTORY_ADDRESS**: the deployed smart wallet factory contract address.
   * **RSK_ACCOUNT_ADDRESS**: the rsk address that will own the smart wallet.
   * **SMART_WALLET_RECOVERER**: the rsk address that will be the recoverer account, in case the owner account is lost.
   * **SMART_WALLET_INDEX**: a wallet index, since we can have more than just one smart wallet per RSK address
   you can specify the index of the wallet.

2 (Optional). Now if you want, you can prefund this new address that will represent your smart wallet. To do that you can go to any wallet and send some tokens to that address. Also, you can use web3 if you are working on regtest, here is an example:
   ```javascript
      import Web3 from "web3";

      const web3 = new Web3(<RSK_NODE_ENDPOINT>);

      const token = await new this.web3.eth.Contract(
        <ERC20_TOKEN_ABI>,
        <TOKEN_ADDRESS>
      );
     const accounts = await this.web3.eth.getAccounts();
     await token.methods.transfer(<SMART_WALLET_ADDRESS>, this.web3.utils.toWei(<AMOUNT_OF_TOKENS>, "ether"))
          .send({ from: accounts[0] });
   ```
   Where variables are:

   * **RSK_NODE_ENDPOINT**: the RSK node endpoint where is running (e.g., http://localhost:4444).
   * **ERC20_TOKEN_ABI**: the ERC20 token contract abi to use.
   * **TOKEN_ADDRESS**: the token contract address.
   * **SMART_WALLET_ADDRESS**: the generated address of last step.
   * **AMOUNT_OF_TOKENS**: string containing the amount of tokens in decimal unit.

   **NOTE: in this example we asume that the `account[0]` of regtest has tokens to use.**

3. Finally to deploy your smart wallet, you must follow these steps:

   1. Use the provider from relay to that you have an example here:
   ```javascript

      import { RelayProvider, resolveConfiguration } from "@rsksmart/rif-relay";
      import Web3 from "web3";

      const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

      const web3 = new Web3(<RSK_NODE_ENDPOINT>);

      const config = await resolveConfiguration(web3.currentProvider,
      {
        verbose: window.location.href.includes("verbose"),
        onlyPreferredRelays: true,
        preferredRelays: ["http://localhost:8090"],
        factory: <SMART_WALLET_FACTORY_CONTRACT_ADDRESS>,
        gasPriceFactorPercent: 0,
        relayLookupWindowBlocks: 1e5,
        chainId: 33,
        relayVerifierAddress: <RELAY_VERIFIER_CONTRACT_ADDRESS>,
        deployVerifierAddress: <DEPLOY_VERIFIER_CONTRACT_ADDRESS>,
        smartWalletFactoryAddress: <SMART_WALLET_FACTORY_CONTRACT_ADDRESS>
      });
      resolvedConfig.relayHubAddress = <RELAY_HUB_CONTRACT_ADDRESS>;

      const provider = new RelayProvider(web3.currentProvider, config);

      provider.addAccount({
         address: <RSK_ACCOUNT_ADDRESS>,
         privateKey: Buffer.from(<RSK_ACCOUNT_PRIVATE_KEY>.replaceAll("0x", ""), "hex")
      });

      web3.setProvider(provider);

      const transaction = await provider.deploySmartWallet({
        from: <RSK_ACCOUNT_ADDRESS>,
        to: ZERO_ADDRESS,
        gas: "0x27100",
        value: "0",
        callVerifier: <DEPLOY_VERIFIER_CONTRACT_ADDRESS>,
        callForwarder: <SMART_WALLET_FACTORY_CONTRACT_ADDRESS>,
        tokenContract: <TOKEN_ADDRESS>,
        tokenAmount: <TOKEN_AMOUNT>,
        data: "0x",
        index: <SMART_WALLET_INDEX>,
        recoverer: <SMART_WALLET_RECOVERER>,
        isSmartWalletDeploy: true,
        onlyPreferredRelays: true,
        smartWalletAddress: <SMART_WALLET_ADDRESS>,
      });
   ```

   Where variables are:

   * **RSK_NODE_ENDPOINT**: the RSK node endpoint where is running (e.g., http://localhost:4444).
   * **SMART_WALLET_FACTORY_CONTRACT_ADDRESS**: the deployed smart wallet factory contract address.
   * **RELAY_VERIFIER_CONTRACT_ADDRESS**: the deployed relay verifier contract address.
   * **DEPLOY_VERIFIER_CONTRACT_ADDRESS**: the deployed deploy verifier contract address.
   * **RELAY_HUB_CONTRACT_ADDRESS**: the deployed relay hub contract address.
   * **RSK_ACCOUNT_ADDRESS**: the RSK account address.
   * **RSK_ACCOUNT_PRIVATE_KEY**: the RSK account private key string.
   * **TOKEN_ADDRESS**: the token address.
   * **TOKEN_AMOUNT**: string containing the amount of tokens in decimal unit. This amount should be lower
     or equal to the amount of tokens that you transferred to the smart wallet account. If you didn't, just set `0` here.
   * **SMART_WALLET_INDEX**: a wallet index, since we can have more than just one smart wallet per RSK address
   * **SMART_WALLET_RECOVERER**: the RSK address that will be the recoverer account, in case the owner account is lost.
   * **SMART_WALLET_ADDRESS**: the address generated on the first step.

After following all these steps you should be able to have a deployed smart wallet with tokens ready to be used.

## RIF Relay Transaction

Another option is to use RIF Relay through a RIF Relay Provider. A RIF Relay Provider is a web3 provider and all transactions and calls are handled through it. Under the hood, the RIF Relay Provider uses a RIF Relay Client instance to interact with the RIF Relay Server.

Here's a sample typescript snippet for relaying a transaction through the use of the RIF Relay Provider.

```typescript
import { RelayProvider, resolveConfiguration } from "@rsksmart/rif-relay";
import Web3 from "web3";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const web3 = new Web3("http://localhost:4444");

const smartWalletFactoryAbi = {
  // JSON data containing the abi of the smart wallet factory contract
}; 
const smartWalletFactoryAddress = "0x3bA95e1cccd397b5124BcdCC5bf0952114E6A701"; // the smart wallet factory contract address (can be retrieved from the deployment summary)
const smartWalletIndex = 0; // the index of the smart wallet to use (leave as 0 for default behavior)

const smartWalletAddress = await new web3.eth.Contract(
    smartWalletFactoryAbi,
    smartWalletFactoryAddress
).methods.getSmartWalletAddress(
    account.address,
    ZERO_ADDRESS,
    smartWalletIndex
).call(); // this will generate an address for the Smart Wallet to be deployed

const relayVerifierAddress = "0x74Dc4471FA8C8fBE09c7a0C400a0852b0A9d04b2"; // the relay verifier contract address (can be retrieved from the deployment summary)
const deployVerifierAddress = "0x1938517B0762103d52590Ca21d459968c25c9E67"; // the deploy verifier contract address (can be retrieved from the deployment summary)

const config = await resolveConfiguration(web3.currentProvider,
    {
        verbose: true,
        onlyPreferredRelays: true,
        preferredRelays: ["http://localhost:8090"], // replace with your own if necessary
        factory: smartWalletFactoryAddress,
        gasPriceFactorPercent: 0,
        relayLookupWindowBlocks: 1e5,
        chainId: 33, // regtest
        relayVerifierAddress,
        deployVerifierAddress,
        smartWalletFactoryAddress
    });
config.relayHubAddress = "0x3bA95e1cccd397b5124BcdCC5bf0952114E6A701"; // the relay hub contract address (can be retrieved from the deployment summary)

const provider = new RelayProvider(web3.currentProvider, config);

provider.addAccount(account); // see note down below

web3.setProvider(provider);

// Deploy Smart Wallet

const tokenContract = "0x0E569743F573323F430B6E14E5676EB0cCAd03D9"; // token address to use on smart wallet
const tokenAmount = "100"; // total token amount for the smart wallet, the smart wallet address should have a balance greater than this number before calling the deploy

// RIF Relay Transaction

const unsigned_tx = {
  // some common web3 transaction with the usual parameters, for example:
  "nonce": "0x0",
  "to": "0xAfA16A8d7a94550079014D537e9440ddB7765d29",
  "value": "0x00",
  "data": "0x0a798f2400000000000000000000000020ff84b8da5034b51cf3dfdc7a92d2b7c3b6a2f30000000000000000000000001938517b0762103d52590ca21d459968c25c9e6700000000000000000000000000000000000000000000000000000000000001f4",
  "chainId": "33"
};

const tokenAmountForRelay = "10"; // how many tokens will be used to pay for the relaying. if left at 0, transaction will be sponsored

const relayTransaction = web3.eth.sendTransaction({
    from: account.address,
    callVerifier: relayVerifierAddress,
    callForwarder: smartWalletAddress,
    isSmartWalletDeploy: false,
    onlyPreferredRelays: true,
    tokenAmount: tokenAmountForRelay,
    tokenContract,
    ...unsigned_tx,
});
```

**Note**: in the example above the `account` object is assumed as an object containing the address (as string) and the privateKey (as buffer). This is just an example, **DO NOT** use this in production:

```typescript
decryptedAccount = web3.eth.accounts.privateKeyToAccount(_privateKey);
const account = {
  address: decryptedAccount.address,
  privateKey: Buffer.from(
    decryptedAccount.privateKey.replaceAll("0x", ""),
    "hex"
  ),
  privateKeyString: decryptedAccount.privateKey,
}
``` 

Before running this example, you need to know of a few requirements:

1. The smart wallet address generated by the contract call should be funded with tokens before running the deploy call. Otherwise, you can set `tokenAmount` to `0` (or remove it) to make a subsidized deploy instead.
2. The token address you use needs to be explicitly allowed. To do so, make a call to the contracts involved to allow them to work with your particular token. These contracts are the relay and deploy verifiers. The method in question is called `acceptToken`, and it can be successfully called only from the contract deployer account (if you are running this in regtest, then `accounts[0]` is the owner).
