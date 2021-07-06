---
layout: rsk
title: RIF Enveloping - Installation And Launch
tags: rif, enveloping, rsk, envelope, gas station network, gsn, install, installation
---

### Building the project

Clone the project. Then run the following from the project's 
root directory to build it.

```
yarn install
yarn prepare
```

### Deploy contracts Locally

We'll use `truffle` for deploying contracts. Have an RSK node up and running in regtest mode and then execute the following on the project's root folder:

`npx truffle migrate --network rsk`


After running this command you will see a summary of contracts on the 
terminal, something similar to this:

```
|===================================|============================================|
| Contract                          | Address                                    |
|===================================|============================================|
| Penalizer                         | 0xe8C7C6f18c3B9532343487faD807060750C1fE95 |
| RelayHub                          | 0x3bA95e1cccd397b5124BcdCC5bf0952114E6A701 |
| SampleRecipient                   | 0x5D0aBdE7Ed6B7e122eD55EAe514E617d6c08f407 |
| SmartWallet                       | 0xB7a001eE69E7C1eef25Eb8e628e46214Ea74BF0F |
| SmartWalletFactory                | 0x8C1108cFCd7ddad09D8910e5f42982A6c54aD9cD |
| SmartWalletDeployVerifier         | 0x1938517B0762103d52590Ca21d459968c25c9E67 |
| SmartWalletRelayVerifier          | 0x74Dc4471FA8C8fBE09c7a0C400a0852b0A9d04b2 |
| CustomSmartWallet                 | 0x96A90Ee24C20c78Ba20AcE1a2aa4D59F79353C54 |
| CustomSmartWalletFactory          | 0x89bac3BB0517F7Dc0E5E94265217A9Acc5cc489f |
| CustomSmartWalletDeployVerifier   | 0x3eE31F6049065B616f85470985c0eF067f2bEbDE |
| CustomSmartWalletRelayVerifier    | 0xDE8Ae20488BE104f0782C0126038b6682ECc1eC7 |
|===================================|============================================|
```

You'll need to save this summary for later use.


### Deploy contracts On Testnet


We'll use `truffle` for deploying contracts.

```
npx truffle migrate --network rsktestnet
``` 
*Disclaimer: to use testnet, you should have an unlocked account with funds or configure it in `truffle.js`.*

These contracts have been deployed on Testnet. See [here](../testnet/) for their addresses.
