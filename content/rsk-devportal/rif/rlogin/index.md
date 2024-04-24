---
menu_order: 400
section_title: rLogin
menu_title: Get Started
layout: rsk
render_features: 'collapsible'
title: rLogin - Integrate rLogin into Your App | Rootstock (RSK)
tags: rlogin, rif, rif-identity, rsk login, rif login, web3, react, frontend, dapp, metamask, ledger, trezor, dcent, liquality, portis
description: "Integrate rLogin into your app and allow your users to choose their favourite wallets to log in"
---

Integrate rLogin into your app and allow your users to choose their favourite wallets to log in. With a single tool, you will get connected to their wallet using an API compatible with Metamask, continue developing as you did.

<iframe src="https://codesandbox.io/embed/rlogin-3b4g9?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="rlogin"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

<div class="row">
  <div class="col">
    <h3>Wallet support:</h3>
    <ul>
      <li>Browser wallets: Metamask, Liquality</li>
      <li>Mobile wallets via Wallet Connect</li>
      <li>Custodial wallets: Portis, Torus (beta)</li>
      <li>Hardware wallets: Ledger, Trezor, D'Cent</li>
    </ul>
    <h3>EIP-1193 support</h3>
  </div>
  <div class="col">
    <h3>Network support:</h3>
    <ul>
      <li>Rootstock Mainnet, Rootstock Testnet</li>
      <li>Ethereum, Ropsten, Kovan, Rinkeby, Goerli</li>
    </ul>
    <h3>Clients support</h3>
    <ul><li><code>ethers</code>, <code>web3.js</code> and others</li></ul>
  </div>
</div>

Repo: [`rsksmart/rLogin`](https://github.com/rsksmart/rLogin)

---

## Getting started

Follow this guide to configure rLogin in minutes


[](#top "collapsible")
- 1) Install rLogin
    ```
    yarn add @rsksmart/rlogin
    ```

    Add wallets peer dependecies:

    | Wallet provider | Required package |
    | - | - |
    | Browser wallets | none |
    | Wallet Connect | `@walletconnect/web3-provider` |
    | Portis | `@portis/web3` |
    | Torus (beta) | `@toruslabs/torus-embed` |
    | Trezor | `@rsksmart/rlogin-trezor-provider` |
    | Ledger | `@rsksmart/rlogin-ledger-provider` |
    | D'Cent | `@rsksmart/rlogin-dcent-provider` |

    ```
    yarn add @walletconnect/web3-provider @portis/web3 @toruslabs/torus-embed @rsksmart/rlogin-trezor-provider @rsksmart/rlogin-ledger-provider @rsksmart/rlogin-dcent-provider
    ```

- 2) Create rLogin DOM element, configure networks and wallet providers  
  ```ts
  import RLogin from '@rsksmart/rlogin'
  import WalletConnectProvider from '@walletconnect/web3-provider'
  import Portis from '@portis/web3'
  import Torus from '@toruslabs/torus-embed'
  import { trezorProviderOptions } from '@rsksmart/rlogin-trezor-provider'
  import { ledgerProviderOptions } from '@rsksmart/rlogin-ledger-provider'
  import { dcentProviderOptions } from '@rsksmart/rlogin-dcent-provider'

  const rpcUrls = {
    30: 'https://public-node.rsk.co',
    31: 'https://public-node.testnet.rsk.co',
  }

  const supportedChains = Object.keys(rpcUrls).map(Number)
  
  const infoOptions = {
    30: { addressBaseURL: 'https://explorer.rsk.co/address/' },
    31: { addressBaseURL: 'https://explorer.testnet.rsk.co/address/' }
  }

  export const rLogin = new RLogin({
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          rpc: rpcUrls
        }
      },
      portis: {
        package: Portis,
        options: {
          id: "a1c8672b-7b1c-476b-b3d0-41c27d575920",
          network: {
            nodeUrl: 'https://public-node.testnet.rsk.co',
            chainId: 31,
          }
        }
      },
      torus: {
          package: Torus,
      },
      'custom-ledger': ledgerProviderOptions,
      'custom-dcent': dcentProviderOptions,
      'custom-trezor': {
        ...trezorProviderOptions,
        options: {
          manifestEmail: 'info@iovlabs.org',
          manifestAppUrl: 'https://basic-sample.rlogin.identity.rifos.org/',
        }
      }
    },
    rpcUrls,
    supportedChains,
    infoOptions
  })
  ```

  > Tip: Put this all together in a single file named `rlogin.ts` and export a single instance of `RLogin`. This ensures that only a single DOM element is created.

  **How to Add Web3Modal Compatible Providers to rLogin**

  You can add any [`web3modal`](https://github.com/web3Modal/web3modal) compatible providers to rLogin `providerOptions`. See the list of [compatible wallet providers](https://github.com/Web3Modal/web3modal/tree/master/docs/providers) and their setup.

  > Note that these are not tested yet (the ones that are not on the default rLogin instance) and they might need extra configuration to work on Rootstock (RSK), because they are Ethereum based wallet providers.

- 3) Connect!
  ```typescript
  import { providers } from 'ethers'

  const login = () => rLogin.connect()
      .then(({ provider, disconnect }) => {
          const provider = new providers.Web3Provider(provider)
          provider.getSigner(0).getAddress().then(console.log)
      })
  ```

  You can use `provider` with your preferred client: [`Web3.js`](https://github.com/ethereum/web3.js/), [`ethjs`](https://github.com/ethjs/ethjs), [`ethers.js`](https://github.com/ethers-io/ethers.js/) or other.

  Use `disconnect` to disconnect from the selected wallet. This single function simplifies handling the wallet specifics at all.

<div class="container the-stack">
  <div class="row rif_blue_text">
    <div class="col">
      <div class="rns-index-box">
        <a href="../../rif/rlogin/features">Features</a>
        <br />
        <br />
        <p>i18n, theming, dark/light, listeners, triggers</p>
      </div>
    </div>
    <div class="col">
      <div class="rns-index-box">
        <a href="https://dev.rootstock.io/rif/rlogin/samples/">rLogin sample apps</a>
        <br />
        <br />
        <p>Sample apps! Find all the code you need</p>
      </div>
    </div>
  </div>
  <div class="row rif_blue_text">
    <div class="col">
      <div class="rns-index-box">
        <a href="https://dev.rootstock.io/rif/rlogin/authentication/">Integrated backend authentication</a>
        <br />
        <br />
        <p>Integrate the authentication model based on the user's digital signature capabilities</p>
      </div>
    </div>
    <div class="col">
      <div class="rns-index-box">
        <a href="../../rif/rlogin/migrating/">Migrating</a>
        <br />
        <br />
        <p>From <code>web3modal</code> or <code>web3react</code></p>
      </div>
    </div>
  </div>
</div>

## The developer experience

rLogin is compatible with Metamask implementations! You can use rLogin in your dapp with your favourite libraries just as you did before.


### EIP-1193

rLogin supports [EIP-1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md). This means rLogin `provider` is compatible with the API described in the standard, thus polymorphic with Metamask API. This also allows you to make a single implementation and integrate all the supported wallets instantly, and let you work with your favourite web3 client.

## The UX

The UX is the most important part of this project. This is the main point to consider when integrating rLogin

### Wallet information

Before logging in to the app, the user will be able to validate the account and network they are connecting to.

<p align="middle">
  <img src="https://i.imgur.com/OZjZZPb.png" alt="wallt info" height="400" />
</p>

### Tutorials and helpers for hardware wallets

Hardware wallets can be quite hard to use. rLogin includes a few short tutorials that will help users to overcome these difficulties, and get connected to the different networks with the most secure devices.

<p align="middle">
  <img src="https://i.imgur.com/dqGd4qO.png" alt="wallt info" height="350" />
</p>

### Choose network

Some wallets need the user to pick their wallet network conneciton from the UI. We added a selector for the networks that are listed in `rpcUrls` This step will be prompted for hardware wallets or Torus.

<p align="middle">
  <img src="https://i.imgur.com/KkJxOn0.png" alt="wallt info" height="200" />
</p>

### Supported networks

If the user can choose the network in their wallet rLogin will ask the user to change the network before `rLogin.connect()` happens. This will ensure you the user is connected to the correct network when landing.

It will also show up after logging in, if the user changes the network and it is not supported.

rLogin supports Metamask features to change the network from the app. For the other providers we show the list of available networks.

<p align="middle">
  <img src="https://i.imgur.com/xzXMtrX.png" alt="wallt info" height="350" />
</p>

## Design & architecture

![rlogin-architecture-simple](/rif/rlogin/assets/rlogin-architecture-simple.png)

Read more about the architecture [here](../../rif/rlogin/design-and-architecture/)

> Follow the [development guidelines](https://dev.rootstock.io/rif/rlogin/develop/) to collaborate
