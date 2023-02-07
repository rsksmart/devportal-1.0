---
layout: rsk
tags: rif, rif-identity, libraries, service, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

## Issuer service

Serves for the [Government application](../../applications/issuer-app) that allows receiving credential issuance requests and approving them manually.

Read the [running guide](../../run) to run the whole project or [browse the open-source repo](https://github.com/rsksmart/rif-identity-services/tree/v0.1.0/services/issuer) to run locally (please use tag `v0.1.0`)

### Features

- **Request credentials service**: receives Selective disclosure requests with simple key-value claims. This is a public service.
- **Back office**: now it requires a simple HTTP login to access a dashboard to allow or deny credentials
