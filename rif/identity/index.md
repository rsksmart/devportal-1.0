---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: rsk
---

# RIF Identity

RIF Identity is the identity and reputation layer within the RIF ecosystem.

It is meant to allow users to easily control their digital identities to interact in decentralized economies while building a self-sovereign identity and reputation. This will enable people, especially those excluded from the traditional financial system, to participate in the decentralized digital economy of the future.

The main goal of RIF Identity is to protect users’ personal data in a privacy respectful way, empowering them to manage who can access it and giving them full control of their reputation so they can use it to interact with multiple marketplaces and platforms with freedom to move from one to another without losing their track record, contacts and social value.

## Table of contents

- [The MVP](mvp)
  - [Run locally](mvp/run)
  - [Design & architecture](mvp/architecture)
  - [Learnings](mvp/learnings)
  - [Acknowledgements](mvp/acknowledgements)
- [RIF Identity Manager](manager)
  - [User guide](manager/user-guide)
  - [Design & architecture](manager/architecture)
  - [Develop](manager/develop)
- rLogin
  - Integrate
  - Design & architecture
    - rLogin modal (client side)
    - DID Auth (server side)
    - Verifiable Credential schemas (communication)
  - Develop
- Data Vault
  - Use
  - Design & architecture
    - Provider module
    - HTTPS service
    - Web client SDK
  - Develop
- Libraries
  - Mnemonics - secure mnemonics and accounts
  - Ethr DID - RSK + Ethr DID seamless
  - DAF bindings - RIF Identity layout with uPort `daf`
  - VC Core module - Verifiable Credentials in React.js + Redux
  - RSK DIDs - uPort `ethr-did` module + RSK support
  - Node utils - utilities for Node.js backend
  - Ethr DID Utils - testing utilities for Ethr DID Registry
- Specs
  - Identity layout - create and recover identities
  - Encryption layout - Storing and recovering encrypted information
  - DID authentication - a challenge–response authentication model based on DIDs
  - Credential requests protocol - a simple protocol for request, grant and receive credential case
  - The Convey service - transport content that does not fit into a QR code
  - Presentations timestamps - emitting and validating presentations with timestamps
- About
- Collaboration guidelines
- Definitions
- References

## Repos

- [SSI Javascript monorepo](https://github.com/rsksmart/rif-identity.js)
- [Node.js Services](https://github.com/rsksmart/rif-identity-services)
- [React.js and React Native apps](https://github.com/rsksmart/rif-identity-ui)
- [Data vault Javascript monorepo](https://github.com/rsksmart/rif-data-vault)
- [Ethr DID + RSK support](https://github.com/rsksmart/ethr-did)
- [Ethr DID dev utils](https://github.com/rsksmart/ethr-did-utils)
- [rLogin](https://github.com/rsksmart/rLogin)
- [RIF Identity manager](https://github.com/rsksmart/rif-identity-manager)
- [Wallet Connect POC](https://github.com/rsksmart/RSKWalletConnect)

See how to [contribute](/rif/identity/contribute) in Github!

<!--

MISSING DOCS:
Architecture
Issuer service
Verifier app
Import READMEs:
- [Mnemonic module](./ssi/libraries/mnemonics)
- [RSK Ethr DID](./ssi/libraries/ethr-did)
- [uPort DAF bindings](./ssi/libraries/daf)
- [RIF Identity Core](./ssi/libraries/core)
- [Express DID Auth](./ssi/libraries/express-did-auth)
- [Node Utils](./ssi/libraries/node-utils)

-->
