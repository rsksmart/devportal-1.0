---
menu_title: Account Abstraction on Rootstock using Etherspot Prime SDK
layout: rsk
title: "Build an Account Abstraction dApp on Rootstock using Etherspot Prime SDK"
tags: rootstock, workshop, account-abstraction, wallets, addresses
description: "Learn what account abstraction is, the benefits, dApps on Rootstock, and how to setup an account abstraction dApp using the Etherspot Prime SDK."
---

In this section, we will learn how to use the [Etherspot Prime SDK](https://etherspot.fyi/prime-sdk/other-chains/getting-started-on-rootstock) to create a random Key Based Wallet (KBW), and use the KBW to create an Etherspot Smart Contract Wallet.

## Prerequisites
- [Etherspot Prime SDK](https://github.com/etherspot/etherspot-prime-sdk/)

## Getting Started

Here we’ll get set up with the very basics of using the Prime SDK.

We’ll do the following: 

- Set up a React app 
- Install the Etherspot Prime SDK
- Create an Etherspot smart contract wallet

### Installing the SDK

Start by creating a react app like so:

```shell
npx create-react-app etherspot-starter
```

`cd` into the directory and install the Etherspot Prime SDK and Ethers.

```shell
cd etherspot-starter/
npm i @etherspot/prime-sdk --save
npm i ethers --save
```

### Writing the Smart Contract

Now open the folder in your code editor, and navigate to the `App.js` file.

```javascript
'use client';

import React from 'react';
import { PrimeSdk, EtherspotBundler } from '@etherspot/prime-sdk';
import { ethers } from 'ethers'
import './App.css';


const App = () => {

  const [etherspotWalletAddress, setEtherspotWalletAddress] = React.useState('0x0000000000000000000000000000000000000000');
  const [eoaWalletAddress, setEoaWalletAddress] = React.useState('0x0000000000000000000000000000000000000000');
  const [eoaPrivateKey, setEoaPrivateKey] = React.useState('');

  const generateRandomEOA = async () => {
    // Create random EOA wallet
    const randomWallet = ethers.Wallet.createRandom();
    setEoaWalletAddress(randomWallet.address);
    setEoaPrivateKey(randomWallet.privateKey);
}

  const generateEtherspotWallet = async () => {
    const bundlerApiKey = 'eyJvcmciOiI2NTIzZjY5MzUwOTBmNzAwMDFiYjJkZWIiLCJpZCI6IjMxMDZiOGY2NTRhZTRhZTM4MGVjYjJiN2Q2NDMzMjM4IiwiaCI6Im11cm11cjEyOCJ9';
    const customBundlerUrl = "https://rootstocktestnet-bundler.etherspot.io/"
    // Initialise Etherspot SDK
    const primeSdk = new PrimeSdk({ privateKey: eoaPrivateKey}, { chainId: 31, bundlerProvider: new EtherspotBundler(31, bundlerApiKey, customBundlerUrl) })
    const address = await primeSdk.getCounterFactualAddress();
    setEtherspotWalletAddress(address);
    console.log('\x1b[33m%s\x1b[0m', `EtherspotWallet address: ${address}`);
  }

  return (
    <div className="App-header">

      <h1>Getting started with Etherspot Prime</h1>
      <p> To initialise the SDK, it requires a Key Based Wallet(KBW) to be passed in.</p>
      
      <button onClick={() => generateRandomEOA()}>
        First, click here to generate a random KBW.
      </button>
      
      <a className="App-link" target="_blank" href={"https://explorer.testnet.rootstock.io/address/" + eoaWalletAddress}>
        KBW Address: {eoaWalletAddress}
      </a>

      <p>
        Now we can intialise the SDK with this address as the owner, and create an Etherspot Smart Contract Wallet.
      </p>

      <button onClick={() => generateEtherspotWallet()}>
        Second, click here to generate Etherspot Smart Contract Wallet
      </button>
      <a className="App-link" target="_blank" href={"https://explorer.testnet.rootstock.io/address/" + etherspotWalletAddress}>
        Etherspot Smart Account Address: {etherspotWalletAddress}
      </a>

      <p>
        <a className="App-link" target="_blank" href="https://etherspot.fyi/prime-sdk/intro">
          Now you have a wallet created on Rootstock you can explore what else we can do with the Prime SDK.
        </a>
      </p>
    </div>
  )
}

export default App;
```

**Start the app:**

```shell
npm start
```

![EtherSpot-Rootstock Starter](/assets/img/guides/etherspot-rootstock/etherspot-starter.png)

In this article, we created a random Key Based Wallet (KBW) on Rootstock on page load, and then using this KBW we pass it into the Etherspot Prime SDK, creating an Etherspot Smart Contract Wallet.


----
## Resources
- [Using Prime SDK Examples](https://etherspot.fyi/prime-sdk/examples/intro)
- [Etherspot Prime SDK Repo](https://github.com/etherspot/etherspot-prime-sdk/)