---
layout: rsk
tags: rlogin, rif, rif-identity, integrate, libraries, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

## rLogin - Integrate

We have published two sample applications to show how to integrate with rLogin.

- [**Basic Example**](https://github.com/rsksmart/rlogin-sample-apps/tree/main/basic-dapp) - In this example, the rLogin modal popups up and the user selects the provider they wish to connect with. In the demo, we are connecting with the injected provider (i.e. a browser wallet such as Metamask) and Wallet Connect.
- [**Permissioned Example**](https://github.com/rsksmart/rlogin-sample-apps/blob/main/permissioned-app) - In this example, the user needs to provide a *Name* declarative detail and an *Email* credential to sign in. In order do this, there is a [backend server implementation](https://github.com/rsksmart/rlogin-sample-apps/blob/main/permissioned-app/backend/index.js) and a [React frontend application](https://github.com/rsksmart/rlogin-sample-apps/blob/main/permissioned-app/frontend-app/src/App.js). After signing in, rLogin returns the DataVault as an object to be used.


### Basic implementation:

To add rLogin to a project, first install the dependency:

```bash
yarn add rLogin --save
# or
npm install rLogin --save
```

In your application, create a rLogin instance. Make sure this instance is created outside of a render function as only one instance should be present at a time. Set the supported chain IDs. In the example below, it will connect with RSK Mainnet and RSK Testnet. rLogin has been tested with RSK (Mainnet and Testnet) and Ethereum (Mainnet and Testnet), however, it should work with any chain ID.

```javascript
import RLogin from '@rsksmart/rlogin'
...
const rLogin = new RLogin({
  cacheProvider: true,
  providerOptions: {
    injected: {}
  },
  supportedChains: [30, 31]
})
```

Next, initiate the `connect()` function. This will cause the pop up to display and allow the user to connect with their provider. rLogin will provide an object with the Web3 Provider, the DataVault (if connected, [see the permissioned example app](https://github.com/rsksmart/rlogin-sample-apps/blob/main/permissioned-app/frontend-app/src/App.js#L63-L92)), and a disconnect/logout function.

```javascript
rLogin.connect()
  .then(response => {
    const provider = response.provider
    const dataVault = response.dataVault
    const disconnect = response.disconnect
  })
```

### Disconnect:

To disconnect from the provider and clean up the `localStorage` and cookies set, use the disconnect function provided by the rLogin response. You may also have to clean up variables set in your app.

```
rLoginResponse.disconnect()
```
