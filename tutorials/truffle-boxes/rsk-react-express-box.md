---
layout: rsk
title: Truffle Box (rsk-react-express-box)
---

## Description

In this box you'll find a basic starter pack. It includes Truffle, React and Express JS.

This starter contains two main elements

- Truffle framework 
- React App (located at `app/` folder)

Please read app/README to get more information about React app.

## Unboxing

Run the unbox command

```bash
truffle unbox rsk-react-express-box
```

For simplicity, there is hook that is going to setup the environment and install all it's dependencies.

## Environment setup

### Description

As said before, this box comes with two environments

- Truffle environment (located at root folder)
- React environment (located at `/app`)

Each environment comes with a specific `package.json`.

### Truffle Environment setup

First ensure you are at the root folder and have truffle installed. 

If you don't have truffle installed you'll need to run this in order to install it.

```bash
npm install -g truffle
```

To install truffle dependencies 

```bash
# At project root folder (I.E '../rsk-react-express-box/')
npm install
```

Now, the only thing you'll need to do it's to copy your mnemonic to `truffle-config.js`

```js
// truffle-config.json

const HDWalletProvider = require('@truffle/hdwallet-provider');

//Put your mnemonic here, take care of this and don't deploy your mnemonic into production!
const mnemonic = 'A_MNEMONIC';
```

#### Using the truffle console

You can start a truffle console for any RSK network

```bash
# Console for Mainnet
truffle console --network mainnet

# Console forn Testnet
truffle console --network testnet
```

#### Migrating contracts

In order to migrate contracts to a specific network

```bash
# Migrate for Mainnet
truffle migrate --network mainnet

# Migrate for Testnet
truffle migrate --network testnet
```

### App environment setup

First install it's dependencies.

```bash
# At app folder (I.E '../rsk-react-express-box/app')
npm install
```

Then you can run the `app/` with

```bash
# At app folder (I.E '../rsk-react-express-box/app')
npm start
```

**The page will automatically reload if you make changes to the code.**

#### Build

To build the `app/` run 

```bash
# At app folder (I.E '../rsk-react-express-box/app')
npm build
```

#### Communicating with RSK network

[Web3 JS](https://web3js.readthedocs.io) and [ethereumjs-tx](https://github.com/ethereumjs/ethereumjs-tx) have been bundled in order to communicate with RSK network.

## Repo

[github.com/rsksmart/rsk-react-express-box](https://github.com/rsksmart/rsk-react-express-box)
