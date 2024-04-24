---
menu_order: 200
menu_title: Connect Frontend
layout: rsk
title: 'Build a DApp with rLogin - Part 1: Connect Frontend | Rootstock (RSK)'
description: 'Create a DApp, add the rLogin connect button, and perform several operations with the connected wallet'
tags: rLogin, frontend, backend, dapp, tutorial, overview, guides, smart-contracts, web3, bitcoin, rsk, peer-to-peer, dapp-examples, blockchain, auth, libraries
---

In this article,
we are going to connect to the user's wallet from
a React.js application.
To summarize, we are going to:

1. Create a frontend app
2. Add a _login button_ that requests user's account and wallet access
3. Perform some operations that can be done with user's wallet

Prerequisites:

- React.js for the frontend
- A compatible wallet - you can try with any of
  [these supported providers](https://github.com/rsksmart/rlogin#features) --
  we recommend trying this with a browser wallet and a mobile wallet,
  to have both experiences.

**Let's start!**

The app we are going to build is published in this repo:
[github.com/rsksmart/rlogin-sample](https://github.com/rsksmart/rlogin-sample/)

### Create the frontend

```shell
npx create-react-app rlogin-sample
cd rlogin-sample
```

We have a React.js frontend already created!
If you want you can first clean up a little bit of the UI,
removing React logo et cetera.

### Install rLogin

Let's install [rLogin](https://github.com/rsksmart/rLogin).
With this library, we are going to display a pop-up
that lets users pick any compatible wallet of choice.

```shell
yarn add @rsksmart/rlogin @walletconnect/web3-provider
```

With a quick setup, we can enable users to connect to our app
using any browser wallet or even any mobile wallet.

Connect to RSK Testnet with your wallet
(or pick another set of supported networks in the setup).
We recommend trying the [Defiant mobile wallet](https://defiantapp.tech/)
that supports RSK by default.

```javascript
import RLogin, { RLoginButton } from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useState } from 'react';
import './App.css';

// construct rLogin pop-up in DOM
const rLogin = new RLogin({
  cachedProvider: false, // change to true to cache user's wallet choice
  providerOptions: { // read more about providers setup in https://github.com/web3Modal/web3modal/
    walletconnect: {
      package: WalletConnectProvider, // setup wallet connect for mobile wallet support
      options: {
        rpc: {
          31: 'https://public-node.testnet.rsk.co' // use RSK public nodes to connect to the testnet
        }
      }
    }
  },
  supportedChains: [31] // enable rsk testnet network
})

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

    // display pop up
  const connect = () => rLogin.connect()
    .then(({ provider }) => { // the provider is used to operate with user's wallet
      setProvider(provider)
      // request user's account
      provider.request({ method: 'eth_accounts' }).then(([account]) => setAccount(account))
    })

  return (
    <div className="App">
      <RLoginButton onClick={connect}>Connect wallet</RLoginButton>
      <p>wallet address: {account}</p>
    </div>
  );
}

export default App;
```

We now have a simple button that, when clicked, displays a pop-up.
This pop-up will let user pick their wallet of choice.
Once the user accepts, their wallet address will be displayed in the frontend.
Easy right?!

![connect-wallet-address](/assets/img/guides/rLogin/connect-wallet-address.png)

### Operate the wallet

We are now connected to our user's wallet
and we want to do three things:

1. Get user's balance
2. Send blockchain transactions
3. Digitally sign messages

The last two operations will prompt a notification
in the user's wallet asking for permission to proceed.

Let's go for it!

#### Get the balance

This is one of the most common queries we can do to the blockchain.

To do so we are going to execute another RPC request.
We add some code for setting the transaction hash to React state.

```javascript
const [balance, setBalance] = useState('')

const getBalance = () => provider.request({
    method: 'eth_getBalance',
    params: [account]
}).then(setBalance)
```

```jsx
<button onClick={getBalance} disabled={!account}>get balance</button>
<p>balance: {balance}</p>
```

Get some funds from the
[RSK Testnet faucet](https://faucet.rsk.co/)
and try it out.

#### Send transactions

As an example, we are just going to send
a basic transaction with no data. It is simple:

```javascript
const [txHash, setTxHash] = useState('')

const faucetAddress = '0x88250f772101179a4ecfaa4b92a983676a3ce445' // giving back some funds
const sendTransaction = () => provider.request({
    method: 'eth_sendTransaction',
    params: [{ from: account, to: faucetAddress, value: '100000' }]
}).then(setTxHash)
```

```jsx
<button onClick={sendTransaction} disabled={!account}>send transaction</button>
<p>txHash: {txHash}</p>
```

This will notify the user asking for approval in their wallet.
Once the user accepts, the method will return the transaction hash.
This is the unique identifier of the transaction,
and can be searched in the
[RSK Testnet explorer](https://explorer.testnet.rsk.co).

#### Digitally sign messages

This is pretty similar!
We simply need to perform another RPC request, `personal_sign`:

```javascript
const [signature, setSignature] = useState('')

const message = 'Welcome to RIF Identity suite!!!'
const personalSign = () => provider.request({
    method: 'personal_sign',
    params: [message, account]
}).then(setSignature)
```

```jsx
<button onClick={personalSign} disabled={!account}>sign message</button>
<p>signature: {signature}</p>
```

![connect-wallet-testnet](/assets/img/guides/rLogin/connect-wallet-testnet.png)

#### Perform complex transactions

Complex transactions, such as smart contract operations,
can be performed with any Web3 client.
These include
[`web3.js`](https://github.com/ChainSafe/web3.js),
[`ethers.js`](https://github.com/ethers-io/ethers.js/), and
[`ethjs`](https://github.com/ethjs/ethjs).
For example, you can instantiate a `web3.js` object with:

```javascript
import Web3 from 'web3'
const web3 = new Web3(provider)
```

#### Other operations

Sending transactions and signing messages are merely
the two most common operations.
With the rLogin provider, you are able to perform any
[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) operation:

- Send transactions
- Operate with smart contracts
- Sign messages ([EIP-191](https://eips.ethereum.org/EIPS/eip-191))
- Sign typed data ([EIP-712](https://eips.ethereum.org/EIPS/eip-712))
- Request user's accounts
- Request user's connected network
- Listen to network or accounts changes
- Listen to user disconnection

## The rLogin library

rLogin is a frontend library that was built with one main purpose:
To reduce the technical gap for those new to crypto apps.
Most of our work was put in building a simple and intuitive frontend,
and in future versions will include tutorials for each wallet provider.

We support RSK Mainnet and RSK Testnet,
and also Ethereum and its testnets.
The objective of rLogin is to maintain a set of quality assurance tests,
making the library a reliable frontend tool
to be used along different kinds of applications.

rLogin adds features to
[`web3modal`](https://github.com/web3Modal/web3modal/),
the Ethereum login tool.
When setting up rLogin,
you can pick any providers that are supported by `web3modal`.
Additionally, the library also allows setting up
a challenge-response authentication model --
this will be covered in the following article.

---

## Useful links

* [rLogin: The New Authentication Libraries for Blockchain Based Apps on Hackernoon](https://hackernoon.com/rlogin-the-new-authentication-libraries-for-blockchain-based-apps-h619330z)
* [RIF Identity docs](https://developers.rsk.co/rif/identity/)
* [rLogin repo](https://github.com/rsksmart/rlogin)
* [rLogin docs](https://developers.rsk.co/rif/rlogin/)
* [rLogin sample apps](https://github.com/rsksmart/rlogin-sample-apps)
* [`web3modal`](https://github.com/web3Modal/web3modal/)
* [EIP-1193 - Ethereum Provider JavaScript API](https://eips.ethereum.org/EIPS/eip-1193)
* [RIF Website](https://rifos.org)

