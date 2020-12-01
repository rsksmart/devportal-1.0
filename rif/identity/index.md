---
title: RIF Identity
layout: rif-identity
---

**RIF Identity** is the identity and reputation layer within the RIF ecosystem.

It is meant to allow users to easily control their digital identities to interact in decentralized economies while building a self-sovereign identity and reputation. This will enable people, especially those excluded from the traditional financial system, to participate in the decentralized digital economy of the future.

The main goal of RIF Identity is to protect users’ personal data in a privacy respectful way, empowering them to manage who can access it and giving them full control of their reputation so they can use it to interact with multiple marketplaces and platforms with freedom to move from one to another without losing their track record, contacts and social value.

<div class="container the-stack">
  <div class="row rif_blue_text">
    <div class="col">
      <div class="rns-index-box">
        <a href="ssi/mvp">Try</a>
        <br />
        <br />
        <p>Use the self-sovereign identity MVP</p>
      </div>
    </div>
    <div class="col">
      <div class="rns-index-box">
        <a href="ssi/specs">Learn</a>
        <br />
        <br />
        <p>Read the specifications</p>
      </div>
    </div>
  </div>
  <div class="row rif_blue_text">
    <div class="col">
      <div class="rns-index-box">
        <a href="architecture">Develop</a>
        <br />
        <br />
        <p>Build on top of RIF Identity architecture</p>
      </div>
    </div>
    <div class="col">
      <div class="rns-index-box">
        <a href="manager">Manage</a>
        <br />
        <br />
        <p>Let your users manage their identity</p>
      </div>
    </div>
  </div>
</div>

## Table of contents

- [Self-sovereign identity](./ssi)
    - [Specs](./ssi/specs)
    - Architecture <!--[Architecture](./ssi/architecture) -->
    - [Libraries](./ssi/libraries)
        - Mnemonic module <!--[Mnemonic module](./ssi/libraries/mnemonics) --> - identity derivation tools using mnemonic phrases
        - RSK Ethr DID <!--[RSK Ethr DID](./ssi/libraries/ethr-did) --> - handle Ethr DID method procedures in RSK network
        - uPort DAF bindings<!--[uPort DAF bindings](./ssi/libraries/daf) --> - use uPort agent with [RIF identity multi identity model](./ssi/specs/#multi-identity-model)
        - RIF Identity Core <!--[RIF Identity Core](./ssi/libraries/core) --> - implementation of [RIF Identity protocols](./ssi/specs/#protocols) using DAF agent
        - [Express DID Auth](./ssi/libraries/express-did-auth) - handle user authentication using W3C credentials
        - Node Utils <!--[Node Utils](./ssi/libraries/node-utils) --> - a suite of handy utils to use in Node.js services
    - [Services](./ssi/services)
        - [Convey service](./ssi/services/convey-service) - public transport layer for JWTs using IPFS
        - Issuer service <!-- [Issuer service](./ssi/services/issuer-service) --> - serves for an application that allows receiving credential issuance requests and approving them manually
    - [Applications](./ssi/applications)
        - [Issuer app](./ssi/applications/issuer-app) - application that serves as the credential request manager. It allows to grant-deny requests or revoke existing credentials
        - [Holder app](./ssi/applications/holder-app) - wallet used to store declarative details and credentials of it’s users
        - Verifier app <!-- [Verifier app](./ssi/applications/verifier-app) --> - QR scanner app that verifies Verifiable Presentations
    - FAQ <!-- [FAQ](ssi/faq) -->
- [Data Vault](./data-vault)
    - [Centralized Data Vault provider](./data-vault/cpinner/cpinner-provider) - an IPFS Data Vault provider
    - [Data Vault service](./data-vault/cpinner/cpinner-service) - a Data vault first approach. This service uses an IPFS node to pin files
    - [Web Client SDK](./data-vault/cpinner/cpinner-client) - a lightweight web client for the Data Vault service
- rLogin - a web tool that combines Web3 and W3C standard protocols to manage user's identity
- RIF Identity manager - a platform where users can manage their personal information and other components that make up their identity

## Repos

- [Documentation](https://github.com/rsksmart/rif-identity-docs)
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
