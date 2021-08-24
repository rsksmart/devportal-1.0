---
layout: rsk
tags: rlogin, rif, rif-identity, libraries, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
render_features: 'collapsible'
---

## rLogin - Design & Architecture

The objective of rLogin project is to build a set of libraries that enables users to use their crypto wallets to authenticate, store their data and port it across different applications. Developers can user rLogin project to enable Self-sovereign identity in their applications in an easy and intuitive way.

The rLogin design consists of 4 core modules:

- A back-end authentication library
- A cloud storage service where users can store their credentials
- A standard interface for Verifiable Credentials enabling data portability
- A client library combining authentication against back-end using user's wallet and store credentials

![rlogin-architecture](../assets/rlogin-architecture.jpg)

[](#top "collapsible")
- A) back-end authentication library
  * Most applications have a backend, which defines the application model and an interface to interact and collaborate with the model. Users must be authenticated, that is, they must be authorized to use this model.
  * Today one of the most used authentication methods are [Google Identity](https://developers.facebook.com/products/facebook-login/) or [Facebook Login](https://developers.facebook.com/products/facebook-login/). A user of our application is recognized as such by having a Google or Facebook account. Google and Facebook will tell us the data that the user authorizes to share, such as their name or email. That data will be used to validate and accept a new user in our app.
  **Our model proposes a different methodology, where who shares the data is the user and not the third party.** Third parties will digitally sign the information that represents the user, issuing Verifiable Credentials, and users will save the information in their preferred store, thus avoiding depositing their information in data silos.
  * To achieve this we designed and developed [DID Auth](/rif/identity/specs/did-auth), an authentication protocol in which the application will only communicate with the user, and the user will not need any third party to share their information.
  * Read more:
    - [Express.js DID Auth docs](../libraries/express-did-auth)
    - [DID Auth client](../libraries/did-auth-client)

- B) A cloud storage service where users can store their credentials
  * Users will be able to save their information in their preferred place. Even so, we developed **the [RIF Data Vault](/rif/identity/data-vault), a user-centric cloud service**. This service will allow users to store their information in a secure way, encrypting the data on the client side. This encrypted data can then be stored on any distributed network such as IPFS.
  * The Data Vault then allows users to store their Verifiable Credentials, issued by different applications, and to access when authenticating to other applications, thus carrying their information automatically.
  * Read more:
    - [RIF Data Vault](/rif/identity/data-vault)

- C) A standard interface for Verifiable Credentials enabling data portability
  * The metadata stored in the cloud must have a specific format so that the different applications can understand the meaning of it. Verifiable Credentials allow issuers to digitally sign the data they claim. In this project we began to develop a representation model that allows all applications to understand the same meaning for the same credentials, thus allowing users to port their data across the different applications with which it operates. This way users can build their reputation in a unique way.
  * This standard is called VC JSON Schemas and is under development by the W3C. We create a first implementation: a repository where you can find different standard credential schemas and propose new ones.
  * Read more:
    - [VC JSON Schemas](../libraries/vc-json-schemas)
    - [VC JSON Schemas parser](../libraries/vc-json-schemas-parser)

- D) A client library combining authentication against back-end
  * It leverages user's wallet and store credentials
  * All the communication with back end under this model is wrapped up in a front end library that enables developer to easily integrate into Self-sovereign Identity. With rLogin library users will be able to pick the wallet of choice to interact with any dApp. It also handles the process of disclosing the information with the application in a private and secure way.
  * In summary, the front end tool pops a modal that lets user follow this steps:
      1. Pick wallet of choice
      2. Connect to backend and request access
      3. Download required credentials from Data Vault
      4. Disclose the credentials with the application

  * Read more:
    - [rLogin modal](../libraries/modal)
