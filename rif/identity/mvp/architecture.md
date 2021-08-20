---
layout: rsk
tags: rif, rif-identity, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

## The MVP - Design & Architecture

The product is designed in 5 layers

![](../assets/img/architecture.png)

### Applications layer

User interfaces letting users form part of the model
- [Ministry of Transport app](../applications/issuer-app)
- [Citizens app](../applications/holder-app)
- [Police officers app](../applications/verifier-app)

### Services layer

W eb services built to enable communication and interaction between actors
- [Issuer service](../services/issuer-service) - allows receiving credential issuance requests and approving them manually
- [Convey service](../services/convey-service) - Public transport layer for JWTs using IPFS
- [Data Vault](../services/data-vault) - This service uses an IPFS node to pin files (POC implementation - productive implementation documentation [here](/rif/identity/data-vault))

![services](../assets/img/services.png)

### The libraries

Reusable and secure implementations compliant with the design protocols

- [Mnemonics](../../libraries/mnemonics) - identity derivation tools using mnemonic phrases
- [RSK DIDs](../../libraries/rsk-ethr-did) - handle Ethr DID method procedures in RSK network
- [Ethr DID](../../libraries/ethr-did) - uPort `ethr-did` with RSK support
- [DAF bindings](../../libraries/daf) - use uPort agent with RIF identity multi identity model
- [VC Core module](../../libraries/core) - Verifiable Credentials in React.js + Redux
- Express DID Auh - Express middleware to authenticate users using DIDs and VCs (POC implementation -  - productive implementation documentation [here](/rif/rlogin/libraries/express-did-auth))

![libraries](../assets/img/libraries.png)

### The protocols and specifications

A set of documents describing how actors perform different actions over the model - read more [here](../../specs)

### The infrastructure

All the model is design on top of RSK and [IPFS](https://ipfs.io)
