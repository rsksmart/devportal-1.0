---
menu_order: 500
menu_title: Migrating
layout: rsk
title: rLogin - Migrating
tags: rlogin, rif, rif-identity, web3, react, frontend, dapp, metamask, ledger, trezor, dcent, liquality, portis
description: rLogin - Migrating - guide to migrate from other login solutions
---

It is easy to migrate from other libraries to rLogin!

### Web3modal

The Web3modal configuration will be completely compatible with rLogin configuration. The only required change is

```diff=
- web3modal.connect().then(provider => {})
+ rLogin.connect().then(({ provider }) => {})
```

### Web3 React

Use the [`rsksmart/rLogin-web3-react-connector` adapter](https://github.com/rsksmart/rLogin-web3-react-connector) to integrate rLogin on top of web3 React
