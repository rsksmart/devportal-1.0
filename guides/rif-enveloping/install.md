---
layout: rsk
title: RIF Enveloping Installation
tags: rif, enveloping, envelope, relay, user, guide, install
permalink: /guides/rif-enveloping/install/
---

## Requirements

### RSK Node

You need to have a running RSK node version [IRIS-3.0.0](https://github.com/rsksmart/rskj/releases) or higher.

### Yarn

We use `yarn` version `v1.22.0` for package management. 

Installation instructions at Yarn's [site](https://yarnpkg.com/getting-started/install). Check the install by running `yarn version`.

### Node & NPM

We use `Node` version `v12.18.3`. 

We recommend the use of [`nvm`](https://github.com/nvm-sh/nvm) and the `.nvmrc` file included at the root of this project, so you can install the correct node version through:

```
nvm use
nvm install
```

If you choose to use node without `nvm`, you can find installation instructions at Node's [site](https://nodejs.org/en/). 

You can check the installation by running `node -v`.

### Npx & Truffle

An important tool we use for interacting with the blockchain is `Truffle` version `v5.0.33`.

You can follow the installation guide in the official [site](https://www.trufflesuite.com/truffle).

We run all truffle commands with the prefix `npx`. This is to execute node packages using the project's version.

Checking the install by running `npx truffle version`.

The configuration file is `truffle.js`. Please see Truffle's documentation for details about this file and how to use it.

### Docker

We recommend following the official [documentation](https://docs.docker.com/get-docker/) for installing Docker and keeping it updated.

You'll need to install both `docker` as well as `docker-compose`.

#### Running on macOS
To run the project using Docker on a Mac, please follow these steps or the scripts and web apps will not work. 

- Patch `readlink`
The startup scripts assume that GNU's `readlink` command is available. But MacOS ships with BSD's `readlink`, which is incompatible with GNU's version. So we must patch `readlink`. This can be done using [Homebrew](https://brew.sh/) as follows:

```
brew install coreutils
ln -s /usr/local/bin/greadlink /usr/local/bin/readlink
```

After this step, you must make sure that your `PATH` variable gives priority to `/usr/local/bin` over `/usr/bin`. You can check this with `which readlink`, which should output `/usr/local/bin/readlink`. Alternatively try executing `readlink -f .`, if it works you're ok.

## Building the project

Clone the project. Then run the following from the project's 
root directory to build it.

```
yarn install
yarn prepare
```

## Deploy contracts Locally

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

## Deploy contracts On Testnet

We'll use `truffle` for deploying contracts.

```
npx truffle migrate --network rsktestnet
``` 
*Disclaimer: to use testnet, you should have an unlocked account with funds or configure it in `truffle.js`.*

These contracts have been deployed on Testnet. See [here](/rif/enveloping/contracts/) for their addresses.
