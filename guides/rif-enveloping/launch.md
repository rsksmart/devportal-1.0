---
layout: rsk
title: RIF Enveloping Launch
tags: rif, enveloping, envelope, relay, user, guide, launch
permalink: /guides/rif-enveloping/launch/
---

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

* **url**: is the URL where the relay server will be deployed, it could be localhost or the IP of the host machine.
* **port**: the port where the relay server will be hosted.
* **relayHubAddress**: is the relay hub contract address, you can retrieve this from the contract summary.
* **relayVerifierAddress**: is the relay verifier contract address, you can retrieve this from the contract summary.
* **deployVerifierAddress**: is the deploy verifier contract address, you can retrieve this from the contract summary.
* **gasPriceFactor**: is the gas price factor used to calculate the gas on the server, you can leave it as 1.
* **rskNodeUrl**: is the RSK node endpoint URL, where the RSK node is located.
* **devMode**: it indicates to the server if we are in development mode or not.
* **customReplenish**: set if the server uses a custom replenish function or not.
* **logLevel**: is the log level for the relay server.
* **workdir**: is the absolute path to the folder where the server will store the database and all its data.

Now we can use the command `yarn relay` (on the root of the relay project) to start the relay server.
If it's the first time you run the relay server, you will see a log saying that it isn't ready and that some values are wrong, that's ok, you just need to register this relay server into the relay hub in order to be usable by the clients.

## Register the Relay Server

### On Regtest

Once the relay server is up, you need to register this server in order for it to be usable, to do so, first configure the script located on `<PROJECT_ROOT>/scripts/registerRelayServer` and replace the 
   values as you consider. The script contains the following:

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

1.  In another terminal run `curl http://localhost:8090/getaddr`, which will return a JSON with information of the running jsRelay Server, for example:
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

## Allow tokens

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
