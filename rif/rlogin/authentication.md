---
menu_order: 400
menu_title: Integrated backend authentication
layout: rsk
title: rLogin - integrated backend authentication
tags: rlogin, rif, rif-identity, web3, react, frontend, dapp, metamask, ledger, trezor, dcent, liquality, portis
description: rLogin - integrated backend authentication - how to use the rLogin with an authentication model based on the user's digital signature capabilities
---

rLogin also integrates an authentication model based on the user's digital signature capabilities when connected to their wallets. The model is based on the SSI standards of DIDs, VCs and VC JSON Schemas

Read more about standards in [RIF Identity specs](../../identity/specs/)

![identity-30](/rif/rlogin/assets/identity-30.png)

This will require you to install the authentication library in your backend. First, follow [backend guidelines](../libraries/express-did-auth) to integrate the authentication model and then just add the backend url to rLogin.

- Sample app: https://data-vault-sample.rlogin.identity.rifos.org/
- Repo: https://github.com/rsksmart/rLogin-sample-apps/tree/main/permissioned-app

### Open flavor

For apps that wish to authenticate users by their account. Configure the backend URL in rLogin and it will prompt users to sign the access code with their wallet.

```typescript
const rLogin = new RLogin({
    providerOptions: { /*... */ },
    rpcUrls,
    supportedChains,
    backendUrl: 'http://url-to-backend',
})
```

### Data Vault flavor

Additionally, you can integrate SSI. This can be used to request users for specific information such as their email. This flavor will integrate RIF Data Vault, and enables you to operate with the user centric cloud system from your dApp.

```typescript
import * as RIFDataVault from '@rsksmart/ipfs-cpinner-client'

const rLogin = new RLogin({
    /*... */
    dataVaultOptions: {
        package: RIFDataVault,
        serviceUrl: 'https://data-vault.identity.rifos.org',
    },
})
```
