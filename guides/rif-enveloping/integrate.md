---
layout: rsk
title: Integration Guide
tags: rif, enveloping, rsk, gas station network, gsn, defi, integrate
---

Enveloping allows users to pay transaction fees with tokens. For this purpose, the system exposes methods that dApps and wallets can consume to provide Enveloping as a service.

## Relay Client and Server

The Relay Server is the off-chain component in charge of receiving transactions and sending them to the on-chain component, which is a Relay Manager. The Manager owns Relay Worker accounts with funds in native coin. To relay a transaction, a Worker signs it and sends it to the Relay Hub paying for the gas consumed.

A user can communicate with a Relay Server through a Relay Client. A Relay Client knows the addresses of different Relay Managers and it sends the on-chain request to the most active one. The Relay Client then sends the transaction to be sponsored to the Relay Server via HTTP request.

Users can interact with the Relay Server directly or indirectly.

## Using the Relay Server directly

The simplest option to use Enveloping in your wallet or dApp is by calling the Relay Server directly. See the instructions for running a Relayer in [Getting Started](/guides/rif-enveloping/getting-started/). The communication with the Relay Server is through HTTP requests.

The order of events for relaying transactions or deploying smart wallets through the Relay Server is

- Create a relay or deploy request.
- Sign the structure (the wrapped transaction) using the EIP712 signature.
- Create the metadata with the signature.
- With the relay or deploy request and the metadata, create an HTTP request.
- Call the HTTP Server `/relay` method using an HTTP POST request.

## Using a Relay Provider

Another option is to use Enveloping through a Relay Provider. The latter wraps web3, and then all transactions and calls are made through the Relay Provider. If a Relay Client is not provided then the Relay Provider creates an instance.

```javascript
this.config = await resolveConfigurationGSN(web3.currentProvider, {
      verbose: window.location.href.includes('verbose'),
      onlyPreferredRelays: false, //If false it will look for a relayer, if true it reads preferred Relays
      chainId: chainId,
      relayVerifierAddress: this.contracts.relayVerifier,
      factory: this.contracts.factory,
      preferredRelays:[]
    })

    this.provider = new Enveloping.RelayProvider(web3.currentProvider, this.config)
    web3.setProvider(this.provider)

    this.provider.deploySmartWallet(trxData)
    this.provider.calculateSmartWalletAddress(
    factory.address,gaslessAccount.address, recoverer, customLogic, walletIndex, bytecodeHash)

    await testRecipient.emitMessage('hello world', {
        from: gaslessAccount.address,
        gas: '100000',
        gasPrice: '1',
        callVerifier: verifierInstance.address,
        onlyPreferredRelays: true //It will read the preferredRelays on the config.
    })
```

## Using the Enveloping Utils as a Library

As we mentioned in the [documentation](/rif/enveloping/), an advantage of the Enveloping's solution is the chance to have a token's wallet without deploying it. When a user needs to use her tokens, she needs to deploy the smart wallet using a deploy request. Thereby, when a gas-less account sent a transaction through Enveloping, they could use their smart wallet address to pay for the gas.

As a simplification of the process, the Enveloping Utils is provided to use as a library. It simplifies the process to create an smart wallet and therefore relay a transaction. It gives the chance to the developers to propose their provider to sign the transaction. The functions that the developer should code on the provider are `sign` and `verifySign`.

```javascript
// Initialize the Enveloping Utils
const partialConfig: Partial<EnvelopingConfig> =
    {
      relayHubAddress: relayHub.address,
      proxyFactoryAddress: factory.address,
      chainId: chainId,
      relayVerifierAddress: relayVerifier.address,  // The verifier that will verify the relayed transaction
      deployVerifierAddress: deployVerifier.address, // The verifier that will verify the smart wallet deployment
      preferredRelays: ['http://localhost:8090'], //If there is a preferred relay server.
      forwarderAddress: swAddress //To get the smart wallet address it's necessary to calculate the smart wallet address.
    }
    config = configure(partialConfig)
    enveloping = new EnvelopingUtils(config, web3, workerAddress)
    await enveloping._init()

// Instances a signature provider: This is just for test, please DO NOT use in production.

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

// Deploying a Smart Wallet
const deployRequest = await enveloping.createDeployRequest(senderAddress, deploymentGasLimit, tokenContract, tokenAmount, tokenGas, gasPrice, index)
const deploySignature = enveloping.signDeployRequest(signatureProvider, deployRequest)
const httpDeployRequest = await enveloping.generateDeployTransactionRequest(deploySignature, deployRequest)
const sentDeployTransaction = await enveloping.sendTransaction(localhost, httpDeployRequest)
sentDeployTransaction.transaction?.hash(true).toString('hex') //This is used to get the transaction hash

// Relaying a transaction

const encodedFunction = testRecipient.contract.methods.emitMessage('hello world').encodeABI()
const relayRequest = await enveloping.createRelayRequest(gaslessAccount.address, testRecipient.address, encodedFunction, gasLimit, tokenContract, tokenAmount, tokenGas)
const relaySignature = enveloping.signRelayRequest(signatureProvider, relayRequest, gaslessAccount.privateKey)
const httpRelayRequest = await enveloping.generateRelayTransactionRequest(relaySignature, relayRequest)
const sentRelayTransaction = await enveloping.sendTransaction(localhost, httpRelayRequest)
sentRelayTransaction.transaction?.hash(true).toString('hex') //This is used to get the transaction hash

```

## MetaCoin

As a complete example (works on Regtest), we developed Metacoin for minting and sending tokens without requiring RBTC for gas.

See: [Enveloping MetaCoin](https://github.com/rsksmart/enveloping-metacoin)
