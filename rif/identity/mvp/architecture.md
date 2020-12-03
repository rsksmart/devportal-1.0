---
layout: rsk
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
- [Convey service](../services/convery-service) - Public transport layer for JWTs using IPFS
- [Data Vault](../services/data-vault) - This service uses an IPFS node to pin files (POC implementation - productive implementation documentation [here](../../data-valut))

![services](../assets/img/services.png)

### The libraries

Reusable and secure implementations compliant with the design protocols

- [Mnemonics](../../libraries/mnemonics) - identity derivation tools using mnemonic phrases
- [RSK DIDs](../../rsk-ethr-did) - handle Ethr DID method procedures in RSK network
- [Ethr DID](../../ethr-did) - uPort `ethr-did` with RSK support
- [DAF bindings](../../daf) - use uPort agent with RIF identity multi identity model
- [VC Core module](../../core) - Verifiable Credentials in React.js + Redux
- Express DID Auh - Express middleware to authenticate users using DIDs and VCs (POC implementation -  - productive implementation documentation [here](../../rlogin/implementation/express-did-auth))

![libraries](../assets/img/libraries.png)

### The protocols and specifications

A set of documents describing how actors perform different actions over the model - read more [here](../../specs)

### The infrastructure

All the model is design on top of RSK and [IPFS](https://ipfs.io)
