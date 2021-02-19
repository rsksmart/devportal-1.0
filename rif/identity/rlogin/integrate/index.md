---
layout: rsk
---

## rLogin - Integrate

{% include rif-id/rlogin-integrate.html %}

### Basic implementation:

To add rLogin to a project, first install the dependency:

```bash
yarn add rLogin --save
// or
npm install rLogin --save
```

In your application, create a rLogin instance. Make sure this instance is created outside of a render function as only one instance should be present at a time. Set the supported chain ids. In the example below, it will connect with RSK Mainnet and RSK Testnet. rLogin has been tested with RKS (mainnet and testent) and Ethereum (mainnet and testnet), however, it should work with any chain Id.

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

Next, initiate the connect() function. This will cause the pop up to display and allow the user to connect with their provider. rLogin will provide an object with the web3 provider, the datavault (if connected, [see the permissioned example app](https://github.com/rsksmart/rlogin-sample-apps/blob/main/permissioned-app/frontend-app/src/App.js#L63-L92)), and a disconnect/logout function.

```javascript
rLogin.connect()
  .then(response => {
    const provider = response.provider
    const dataVault = response.dataVault
    const disconnect = response.disconnect
  })
```

### Disconnect:

To disconnect from the provider and clean up the localStorage and cookies set, use the disconnect function provided by the rLogin response. You may also have to clean up variables set in your app.

```
rLoginResponse.disconnect()
```