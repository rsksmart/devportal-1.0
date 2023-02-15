---
layout: rsk
title: RIF Relay Deployment
description: RIF Relay deployment process
tags: rif, envelope, relay, user, guide, deployment
render_features: 'collapsible tables-with-borders'
permalink: /guides/rif-relay/deployment/
---

[](#top "collapsible")
- 1) Contracts Deployment
  * We will begin by deploying the on-chain components. All the necessary tools to do the deployments are included in the [RIF Relay Contract](https://github.com/rsksmart/rif-relay-contracts). 

  [](#top "collapsible")
    - Regtest
      * To start the process on `Regtest` we just execute the following command:

        ```
        npx hardhat deploy --network regtest
        ```

        > Note: The deploy script is using the regtest configuration that was previously configured in the hardhat.config.ts file.

        After the deployment, we will see the summary of the deployed contracts. Most of this contracts are the on-chain components that will be used by RIF Relay and some are for testing purposes.

        ```
        ┌─────────────────────────────────┬──────────────────────────────────────────────┐
        │             (index)             │                    Values                    │
        ├─────────────────────────────────┼──────────────────────────────────────────────┤
        │            Penalizer            │ '0x77045E71a7A2c50903d88e564cD72fab11e82051' │
        │            RelayHub             │ '0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974' │
        │           SmartWallet           │ '0x83C5541A6c8D2dBAD642f385d8d06Ca9B6C731ee' │
        │       SmartWalletFactory        │ '0xE0825f57Dd05Ef62FF731c27222A86E104CC4Cad' │
        │         DeployVerifier          │ '0x73ec81da0C72DD112e06c09A6ec03B5544d26F05' │
        │          RelayVerifier          │ '0x03F23ae1917722d5A27a2Ea0Bcc98725a2a2a49a' │
        │        CustomSmartWallet        │ '0x1eD614cd3443EFd9c70F04b6d777aed947A4b0c4' │
        │    CustomSmartWalletFactory     │ '0x5159345aaB821172e795d56274D0f5FDFdC6aBD9' │
        │ CustomSmartWalletDeployVerifier │ '0x7557fcE0BbFAe81a9508FF469D481f2c72a8B5f3' │
        │ CustomSmartWalletRelayVerifier  │ '0x0e19674ebc2c2B6Df3e7a1417c49b50235c61924' │
        │            UtilToken            │ '0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8' │
        │         VersionRegistry         │ '0x8901a2Bbf639bFD21A97004BA4D7aE2BD00B8DA8' │
        └─────────────────────────────────┴──────────────────────────────────────────────┘
        ```

        As shown, we have two sets of Smart Wallets with their own verifiers. This is because each verifier uses the factory to perform deploy and relay validations. For testing purposes, we will be using the Smart Wallet Contracts.

    - Testnet
      * To start the process on `Testnet`, we need an account with funds. The funds retrieval can be done from the [tRBTC Faucet](https://faucet.rsk.co/).

        ```
        npx hardhat deploy --network testnet
        ```
        > Take into consideration that testnet needs to be configured in the hardhat.config.ts file.

        RIF Relay already have contracts deployed on `Testnet`, and can be found in the [contracts](/rif/relay/contracts) section.
    
    - Mainnet
      * To start the process on `Mainnet`, we need an account with funds.

        ```
        npx hardhat deploy --network mainnet
        ```
        > Take into consideration that mainnet needs to be configured in the hardhat.config.ts.

        RIF Relay already have contracts deployed on `Mainnet` and can be found in the [contracts](/rif/relay/contracts) section.

- 2) Revenue Sharing
  * The Revenue Sharing is an optional feature that can be implemented using a collector contract. In principle, any number of `Collector` contracts can be deployed and used. This does not automatically occur alongside the deployment of the rest of the Relay contracts. For an overview of the `Collector` contract, please see [the corresponding architecture section](/rif/relay/architecture/#collector).

      Before deploying a Collector contract please make sure that:
      1. The token chosen for this contract matches the one used for relayed transaction fees. **Any tokens other than the one set at the time of the Collector deployment which are sent to the contract will be impossible to retrieve, including the native token**. 
      2. The owner of the Collector contract has been chosen (be it a multisig contract address, a regular contract address or an EOA). This does not need to match the address deploying the contract, please note that the owner should be able to call the withdraw function from the collector contract otherwise **all revenue sharing funds will be permanently locked in the contract**. 
      3. Partners and their shares have been defined correctly. This means that beneficiary shares must collectively add up to 100. As with the previous point, any tokens sent to an address without its private key held by its beneficiary will be lost. For an example of a structurally valid revenue shares definition see [this deploy collector task input sample](https://github.com/rsksmart/rif-relay-contracts/blob/master/deploy-collector.input.sample.json).

  [](#top "collapsible")
    - Regtest
      * To deploy the Collector contract we will be using the [RIF Relay Contract](https://github.com/rsksmart/rif-relay-contracts).

      *  We need to create a configuration file with the following structure and save it as `deploy-collector.input.json`:

        ```json
        {
          "collectorOwner": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
          "partners": [
              {
                  "beneficiary": "0x7986b3DF570230288501EEa3D890bd66948C9B79",
                  "share": 20
              },
              {
                  "beneficiary": "0x0a3aA774752ec2042c46548456c094A76C7F3a79",
                  "share": 35
              },
              {
                  "beneficiary": "0xCF7CDBbB5F7BA79d3ffe74A0bBA13FC0295F6036",
                  "share": 13
              },
              {
                  "beneficiary": "0x39B12C05E8503356E3a7DF0B7B33efA4c054C409",
                  "share": 32
              }
          ],
          "tokenAddress": "0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8",
          "remainderAddress": "0xc354D97642FAa06781b76Ffb6786f72cd7746C97"
        }
        ```
         > The collectorOwner, beneficiaries and remainderAddress are the first 5 default accounts provided by the node in regtest.

         Now we only need to execute the following command:

        ```
        npx hardhat collector:deploy --network regtest
        ```

        The collector is ready and can start receiving fees. 
    - Testnet
      * TBD
    - Mainnet
      * TBD

- 3) Allow Tokens
  * RIF Relay only accepts whitelisted tokens. There are multiple reasons to just allow whitelisted tokens but the main one is to ensure that RIF Relay is accepting tokens that represent value for the sponsor.

  * To whitelist a token we need to execute the `acceptToken(address token)` on the Relay Verifiers contracts:
      * `SmartWalletDeployVerifier`
      * `SmartWalletRelayVerifier`
      > The contract execution needs to be done by the owner of the contracts. The owner is the account that did the deployment.

  [](#top "collapsible")
    - Regtest
      * In the RIF Relay Contracts, we will need to execute the command:
        ```
        npx hardhat allow-tokens --network regtest 0x1Af2844A588759D0DE58abD568ADD96BB8B3B6D8
        ```
        > The `allowTokens` uses the account[0] as the owner of the contracts and that’s important because only the owner can allow tokens.
    
    - Testnet
      * In the RIF Relay Contracts we will need to execute the command:
        ```
        npx hardhat allow-tokens --network testnet 0x3F49BaB0afdC36E9f5784da91b32E3D5156fAa5C
        ```
        > The `allowTokens` script will use the Testnet network configured in the `hardhat.config.ts`, this network will be required to use the account that did the deployment of the contracts.

    - Mainnet
      * In the RIF Relay Contracts we will need to execute the command:
        ```
        npx hardhat allow-tokens --network mainnet 0xe49b8906A3ceFd184621A4193e2451b1c3C3dB0B
        ```
        > The `allowTokens` script will use the Mainnet network configured in `hardhat.config.ts`, this network will be required to use the account that did the deployment of the contracts.


- 4) Run RIF Relay Server
  * Once we have all the on-chain components, we will continue with the off-chain components. This process is done with the [RIF Relay Server](https://github.com/rsksmart/rif-relay-server).

    Before starting the Relay Server, we need to configure it. To simplify the configuration process, the [node-config](https://www.npmjs.com/package/config) package was used, more documentation about the benefits can be found in their [wiki](https://github.com/node-config/node-config/wiki) page.

    <b>The TL;DR:</b> create a file inside the `config` directory with `local.json` name. 
    
    Some useful diagrams about the way that the Relay Server works can be found [here](/rif/relay/architecture/#relay-server).

  [](#top "collapsible")
    - Regtest
      * Below is an example using the RSKj node locally and the contracts that were deployed in `Regtest`.

        ```json
        {
            "app": {
                "url": "http://127.0.0.1",
                "port": 8090,
                "devMode": true,
                "logLevel": 1,
                "workdir": "./enveloping/environment/",
            },
            "blockchain": {
                "rskNodeUrl": "http://127.0.0.1:4444",
            },
            "contracts": {
                "relayHubAddress": "0xDA7Ce79725418F4F6E13Bf5F520C89Cec5f6A974",
                "relayVerifierAddress": "0x03F23ae1917722d5A27a2Ea0Bcc98725a2a2a49a",
                "deployVerifierAddress": "0x73ec81da0C72DD112e06c09A6ec03B5544d26F05"
            }
        }
        ```
        > The Relay and Deploy verifier are using the contracts from the Smart Wallet section in the summary.

        The meaning of each key can be found in [RIF Relay Server Configuration](https://github.com/rsksmart/rif-relay-server#server-configuration)

        Now we can start the server with the following command:

        ```
        npm run start
        ```
        > By default the server will use the file `default.json5` in the config directory and depending the profile in the `NODE_ENV` the values on this file will be overriden. 

        At this point the server should be running and ready to start processing transactions, however, we still need to register all the off-chain components in the Relay Hub. To do the registration process, the following command needs to be executed:

        ```
        npm run register
        ```
        > The command needs to be executed in a different terminal since it needs the server to be running to perform the registration.

        > The register command can receive multiple parameters, more information can be found in the [RIF Relay Server documentation](https://github.com/rsksmart/rif-relay-server#overrides).

        The register process performs the following actions:
        - Stakes the Relay Manager
        - Adds the Relay Worker
        - Registers the Relay Server

        Now the server is ready to start processing transactions and a ready message will be on the console.

    - Testnet
      * Below is an example using the off-chain components deployed on RSK Testnet (https://public-node.testnet.rsk.co). **Important: keep in mind that due to some specific RSKj node modules enabled, it's not possible to connect RIF Relay Server to the public nodes**

        ```json
       {
          "app": {
              "url": "https://backend.dev.relay.rifcomputing.net",
              "port": 8090,
              "devMode": true,
              "logLevel": 1,
              "feePercentage": "0",
              "workdir": "/srv/app/environment"
          },
          "blockchain": {
              "rskNodeUrl": "http://172.17.0.1:4444"
          },
          "contracts": {
              "relayHubAddress": "0xAd525463961399793f8716b0D85133ff7503a7C2",
              "relayVerifierAddress": "0xB86c972Ff212838C4c396199B27a0DBe45560df8",
              "deployVerifierAddress": "0xc67f193Bb1D64F13FD49E2da6586a2F417e56b16"
          }
      }
        ```

        > The [contracts](https://developers.rsk.co/rif/relay/contracts/#primary-contracts) that are been used, are the primary one that does not have support for CustomSmartWallet.

        The meaning of each key can be found in [RIF Relay Server Configuration](https://github.com/rsksmart/rif-relay-server#server-configuration)

        Now we can start the server with the following command:

        ```
        npm run start
        ```
        > By default the server will use the file `default.json5` in the config directory. > By default the server will use the file `default.json5` in the config directory and depending the profile in the `NODE_ENV` the values on this file will be overriden.  Therefore we need to setup the `NODE_ENV` environment to `testnet`.

        At this point the server should be running and ready to start processing transactions, however, we still need to register all the off-chain components in the Relay Hub. To do the registration process, the Relay Manager and Worker must have funds.

        To obtain the addresses we need to execute the command:
        ```
        curl http://<SERVER_URL>/getaddr
        ```
        > The command needs to be executed in a different terminal since it needs the server to be running to perform the request.

        ```json
        {
          "relayWorkerAddress": "0xabf898bd73b746298462915ca91623f5630f2462",
          "relayManagerAddress": "0xa71d65cbe28689e9358407f87e0b4481161c7e57",
          "relayHubAddress": "0xe90592939fE8bb6017A8a533264a5894B41aF7d5",
          "minGasPrice": "6000000000",
          "chainId": "31",
          "networkId": "31",
          "ready": false,
          "version": "2.0.1"
        }
        ```

        Send at least 0.001 tRBTC to the Worker and Manager.

        Now execute the register command.

        ```
        npm run register
        ```
        > The register command can receive multiple parameters, more information can be found in the [RIF Relay Server](https://github.com/rsksmart/rif-relay-server#overrides) documentation.

        Below its an example of the `register.json5`

        ```json
        {
          "register": {
            "stake": "REGISTER_STAKE",
            "funds": "REGISTER_FUNDS",
            "mnemonic": "REGISTER_MNEMONIC",
            "privateKey": "REGISTER_PRIVATE_KEY",
            "hub": "REGISTER_HUB_ADDRESS",
            "gasPrice": "REGISTER_GAS_PRICE",
            "relayUrl": "REGISTER_RELAY_URL",
            "unstakeDelay": "REGISTER_UNSTAKE_DELAY"
          }
        }
        ```

        The register process performs the following actions:
        - Stakes the Relay Manager
        - Adds the Relay Worker
        - Registers the Relay Server

        Now the server is ready to start processing transactions and a message with "ready" will be shown on the console.
        
    - Mainnet
      * To run RIF Relay Server on RSK Mainnet, the procedure is the same as the one on Testnet, the only part that is different is the configuration. We need to configure it to use contracts deployed on Mainnet and an RSKj node connected to Mainnet.
