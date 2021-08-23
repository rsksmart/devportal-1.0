---
layout: rsk
title: RIF Enveloping Integration
tags: rif, enveloping, envelope, relay, user, guide, integrate
permalink: /guides/rif-enveloping/integrate/
---

Enveloping allows users to pay transaction fees with tokens. For this purpose, the system exposes methods that dApps and wallets can consume to provide Enveloping as a service.

## Relay Client and Relay Server

The Relay Server is the off-chain component in charge of receiving transactions and sending them to the on-chain component, which is a Relay Manager. The Manager owns Relay Worker accounts with funds in native coin. To relay a transaction, a Worker signs it and sends it to the Relay Hub paying for the gas consumed.

A user can communicate with a Relay Server through a Relay Client. A Relay Client knows the addresses of different Relay Managers and it sends the on-chain request to the most active one. The Relay Client then sends the transaction to be sponsored to the Relay Server via HTTP request.

Users can interact with the Relay Server directly or indirectly.

## Using the Relay Server directly

The simplest option to use Enveloping in your wallet or dApp is by calling the Relay Server directly. The instructions for running a Relayer are here. The communication with the Relay Server is through HTTP requests.

The order of events for relaying transactions or deploying smart wallets through the Relay Server is
1. Create a relay or deploy request.
2. Sign the structure (the wrapped transaction) using the EIP712 signature.
3. Create the metadata with the signature.
4. With the relay or deploy request and the metadata, create an HTTP request.
5. Call the HTTP Server `/relay` method using an HTTP POST request.

## Using a Relay Provider

Another option is to use Enveloping through a Relay Provider. The latter wraps web3, and then all transactions and calls are made through the Relay Provider. If a Relay Client is not provided then the Relay Provider creates an instance.

```typescript
    import { RelayProvider, resolveConfiguration } from "@rsksmart/enveloping";
    import Web3 from "web3";

    const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

    const web3 = new Web3("http://localhost:4444");

    const smartWalletFactoryAbi = {};// some json containing the abi of the smart wallet factory contract.
    const smartWalletFactoryAddress = "0x3bA95e1cccd397b5124BcdCC5bf0952114E6A701"; // the smart wallet factort contract address (can be retrieved from the summary of the deployment).
    const smartWalletIndex = 0; // the index of the smart wallet

    const smartWalletAddress = await new web3.eth.Contract(
        smartWalletFactoryAbi,
        smartWalletFactoryAddress
    ).methods.getSmartWalletAddress(
        account.address,
        ZERO_ADDRESS,
        smartWalletIndex
    ).call();

    const relayVerifierAddress = "0x74Dc4471FA8C8fBE09c7a0C400a0852b0A9d04b2"; // the relay verifier contract address (can be retrieved from the summary of the deployment).
    const deployVerifierAddress = "0x1938517B0762103d52590Ca21d459968c25c9E67"; // the deploy verifier contract address (can be retrieved from the summary of the deployment).

    const config = await resolveConfiguration(web3.currentProvider,
        {
            verbose: window.location.href.includes("verbose"),
            onlyPreferredRelays: true,
            preferredRelays: ["http://localhost:8090"],
            factory: smartWalletFactoryAddress,
            gasPriceFactorPercent: 0,
            relayLookupWindowBlocks: 1e5,
            chainId: 33,
            relayVerifierAddress,
            deployVerifierAddress,
            smartWalletFactoryAddress
        });
        resolvedConfig.relayHubAddress = "0x3bA95e1cccd397b5124BcdCC5bf0952114E6A701"; // the relay hub contract address (can be retrieved from the summary of the deployment).

    const provider = new RelayProvider(web3.currentProvider, config);

    provider.addAccount(account);

    web3.setProvider(provider);

    const tokenContract = "0x0E569743F573323F430B6E14E5676EB0cCAd03D9"; // token address to use on smart wallet
    const tokenAmount = "100"; // total token amount for the smart wallet, the smart wallet address should have more than this number before calling the deploy.

    // deploy smart wallet
    const deployTransaction = await provider.deploySmartWallet({
        from: account.address,
        to: ZERO_ADDRESS,
        gas: "0x27100",
        value: "0",
        callVerifier: deployVerifierAddress,
        callForwarder: smartWalletFactoryAddress,
        tokenContract,
        tokenAmount,
        data: "0x",
        index: smartWalletIndex,
        recoverer: ZERO_ADDRESS,
        isSmartWalletDeploy: true,
        onlyPreferredRelays: true,
        smartWalletAddress
    });

    // relay transaction
    const unsigned_tx = {
        // some common web3 transaction with the common parameters.
    };

    const tokenAmountForRelay = "10";

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

**Note: in the example above the `account` object is assumed as an object containing the address (as string) and
the privateKey (as buffer)**

Before running this example, you need to know a few requirements:

1. The smart wallet address generated by the contract call should be funded with tokens before running the deploy call or
   you can set tokenAmount to 0 (or remove it) to make a subsidized deploy instead.
2. The token address you use need to be explicitly allowed. To do so, make a call to the contracts involved to allow them to work with your particular token. These contracts are the relay and deploy verifiers, and the method is `acceptToken`, it should be called
   with the contract deployer account.
   Only the owner of the contracts can do that, but if you are running this in regtest, then the accounts[0]
   is the owner.
   You can allow tokens by calling the relay verifier and deploy verifier (for both wallets, smart wallet and custom smart wallet) contracts manually with web3.
   Here is an example of how to allow tokens using web3 on truffle console:
   ```typescript
        const smartWalletDeployVerifierAbi = require("../src/cli/compiled/DeployVerifier.json").abi;
        const customSmartWalletDeployVerifierAbi = require("../src/cli/compiled/CustomSmartWalletDeployVerifier.json").abi;
        const relayVerifierAbi = require("../src/cli/compiled/RelayVerifier.json").abi;

        const relayVerifierAddress = "0x74Dc4471FA8C8fBE09c7a0C400a0852b0A9d04b2"; // the relay verifier contract address (can be retrieved from the summary of the deployment).
        const deployVerifierAddress = "0x1938517B0762103d52590Ca21d459968c25c9E67"; // the deploy verifier contract address (can be retrieved from the summary of the deployment).
        const customRelayVerifierAddress = "0x74Dc4471FA8C8fBE09c7a0C400a0852b0A9d04b2"; // the custom smart wallet relay verifier contract address (can be retrieved from the summary of the deployment).
        const customDeployVerifierAddress = "0x1938517B0762103d52590Ca21d459968c25c9E67"; // the custom smart wallet deploy verifier contract address (can be retrieved from the summary of the deployment).

        const smartWalletDeployVerifier = await new web3.eth.Contract(smartWalletDeployVerifierAbi, deployVerifierAddress);
        const smartWalletRelayVerifier = await new web3.eth.Contract(relayVerifierAbi, relayVerifierAddress);
        const customSmartWalletDeployVerifier = await new web3.eth.Contract(customSmartWalletDeployVerifierAbi, customDeployVerifierAddress);
        const customSmartWalletRelayVerifier = await new web3.eth.Contract(relayVerifierAbi, customRelayVerifierAddress);
        const accounts = await web3.eth.getAccounts();

        const tokenAddress = "0x0E569743F573323F430B6E14E5676EB0cCAd03D9"; // token address to allow

        await smartWalletDeployVerifier.methods.acceptToken(tokenAddress).send({from: accounts[0]});
        await smartWalletRelayVerifier.methods.acceptToken(tokenAddress).send({from: accounts[0]});
        await customSmartWalletDeployVerifier.methods.acceptToken(tokenAddress).send({from: accounts[0]});
        await customSmartWalletRelayVerifier.methods.acceptToken(tokenAddress).send({from: accounts[0]});
   ```

## Using the Enveloping Utils as a library

As we mentioned in the [documentation](), an advantage of the Enveloping's solution is the chance to have a token's wallet without deploying it. When a user needs to use her tokens, she needs to deploy the smart wallet using a deploy request. Thereby, when a gas-less account sent a transaction through Enveloping, they could use their smart wallet address to pay for the gas.

As a simplification of the process, the Enveloping Utils is provided to use as a library. It simplifies the process to create an smart wallet and therefore relay a transaction. It gives the chance to the developers to propose their provider to sign the transaction. The functions that the developer should code on the provider are `sign` and `verifySign`.

```typescript
//Initialize the Enveloping Utils
const partialConfig: Partial<EnvelopingConfig> =
    {
      relayHubAddress: relayHub.address,
      smartWalletFactoryAddress: factory.address,
      chainId: chainId,
      relayVerifierAddress: relayVerifier.address,  // The verifier that will verify the relayed transaction
      deployVerifierAddress: deployVerifier.address, // The verifier that will verify the smart wallet deployment
      preferredRelays: ['http://localhost:8090'], //If there is a preferred relay server.
    }
    config = configure(partialConfig)
    enveloping = new Enveloping(config, web3, workerAddress)
    await enveloping._init()

//Instances a signature provider: This is just for test, please DO NOT use in production.

const signatureProvider: SignatureProvider = {
    sign: (dataToSign: TypedRequestData, privKey?: Buffer) => {
      // @ts-ignore
      return sigUtil.signTypedData_v4(privKey, { data: dataToSign })
    },
    verifySign: (signature: PrefixedHexString, dataToSign: TypedRequestData, request: RelayRequest|DeployRequest) => {
      // @ts-ignore
      const rec = sigUtil.recoverTypedSignature_v4({
        data: dataToSign,
        sig: signature
      })
      return isSameAddress(request.request.from, rec)
    }
  }

//Deploying a Smart Wallet
const deployRequest = await enveloping.createDeployRequest(senderAddress, deploymentGasLimit, tokenContract, tokenAmount, tokenGas, gasPrice, index)
const deploySignature = enveloping.signDeployRequest(signatureProvider, deployRequest)
const httpDeployRequest = await enveloping.generateDeployTransactionRequest(deploySignature, deployRequest)
const sentDeployTransaction = await enveloping.sendTransaction(localhost, httpDeployRequest)
sentDeployTransaction.transaction?.hash(true).toString('hex') //This is used to get the transaction hash

const encodedFunction = testRecipient.contract.methods.emitMessage('hello world').encodeABI()
const relayRequest = await enveloping.createRelayRequest(gaslessAccount.address, testRecipient.address, smartWalletAddress, encodedFunction, gasLimit, tokenContract, tokenAmount, tokenGas)
const relaySignature = enveloping.signRelayRequest(signatureProvider, relayRequest, gaslessAccount.privateKey)
const httpRelayRequest = await enveloping.generateRelayTransactionRequest(relaySignature, relayRequest)
const sentRelayTransaction = await enveloping.sendTransaction(localhost, httpRelayRequest)
sentRelayTransaction.transaction?.hash(true).toString('hex') //This is used to get the transaction hash
```


## Custom worker replenish function in the Relay Server

Each relayed transaction is signed by a Relay Worker account. The worker accounts are controlled by the Relay Manager. When a relay worker signs and relays a transaction, the cost for that transaction is paid using the funds in that worker's account. If the transaction is not subsidized, then the worker is compensated with tokens.

Worker accounts must always have some minimum balance to pay gas for the transaction. These balances can be managed by implementing a replenishment strategy. The Relay Manager can use the strategy to top off a relay worker's account when the balance gets too low.

We provide a default implementation for a replenishment strategy.  Enveloping solution integrators can implement their own replenish strategy.

To implement and use your own replenish strategy:

1. In the folder `src/relayserver`, open `ReplenishFunction.ts` with a text editor.
2. On the function `replenishStrategy` write your new replenish strategy.
3. Re build the project `yarn && yarn prepare`
4. Add the command `--customReplenish` when running a Relay Server or change the config json file to set `customReplenish` on true.