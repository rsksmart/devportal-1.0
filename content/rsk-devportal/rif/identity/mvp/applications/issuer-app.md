---
menu_title: Government app
title: Government app
# menu_order: 300
layout: rsk
tags: rif, rif-identity, libraries, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

## Government app - web application listing credential requests

The Government app is a React application that handles the back office tasks of issuing and rejecting credential requests. It is built to be connected to any Request Credential Service Server (that is API compatible with [RIF Identity issuer service](../../services/)), and login happens with a username and password.

Read the [running guide](../../run) to run the whole project or [browse the open-source repo](https://github.com/rsksmart/rif-identity-ui/tree/holder-v0.1.2/apps/issuer-app) to run locally (please use tag `holder-v0.1.2`)

### Specifications

- User interface: web browser app capable to display the citizen’s information when a credential request arrives, requiring a user-activated confirmation before issuing the credentials.
- Holder app interaction: the server will receive a credential request and open a private communication endpoint for the holder’s app to query the issuance process status and the credential information.
- Persistence: the application must store all the information in a local database. It logs when a request arrives and an issuance is performed.

### Features

- Login using HTTP Basic Auth with username and password
- View list of received credential requests and request content
- Issue and Deny Verifiable Credentials

### Screenshots

#### Login Screen

![Login Screen](../../assets/img/applications/issuer-app/sign-in.jpg)

#### Credential List

![Credential List](../../assets/img/applications/issuer-app/credential-list.jpg)

### Extend

The issuer app has a lot of potential for future development including:
- Adding back-office claims to credentials
- User management
- Revoking credentials
- Managing credential templates/types
- History
