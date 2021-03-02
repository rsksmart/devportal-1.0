---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: rsk
---

# RIF Identity

RIF Identity is the identity and reputation layer within the RIF ecosystem.

It is meant to allow users to easily control their digital identities to interact in decentralized economies while building a self-sovereign identity and reputation. This will enable people, especially those excluded from the traditional financial system, to participate in the decentralized digital economy of the future.

The main goal of RIF Identity is to protect users’ personal data in a privacy respectful way, empowering them to manage who can access it and giving them full control of their reputation so they can use it to interact with multiple marketplaces and platforms with freedom to move from one to another without losing their track record, contacts and social value.

<div class="container the-stack">
  <div class="row rif_blue_text">
    <div class="col">
      <div class="rns-index-box">
        <a href="mvp">Try</a>
        <br />
        <br />
        <p>Use the self-sovereign identity MVP</p>
      </div>
    </div>
    <div class="col">
      <div class="rns-index-box">
        <a href="specs">Learn</a>
        <br />
        <br />
        <p>Read the specifications</p>
      </div>
    </div>
  </div>
  <div class="row rif_blue_text">
    <div class="col">
      <div class="rns-index-box">
        <a href="libraries">Develop</a>
        <br />
        <br />
        <p>Use RIF Identity libraries</p>
      </div>
    </div>
    <div class="col">
      <div class="rns-index-box">
        <a href="data-vault">Data Vault</a>
        <br />
        <br />
        <p>User-centric cloud storage</p>
      </div>
    </div>
  </div>
</div>

<!--
  <div class="row rif_blue_text">
    <div class="col">
      <div class="rns-index-box">
        <a href="rlogin">rLogin</a>
        <br />
        <br />
        <p>Web3 based authentication</p>
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
-->

## Table of contents

- [The MVP](mvp)
  - [Run locally](mvp/run)
  - [Design & architecture](mvp/architecture)
  - [Applications](mvp/applications)
  - [Services](mvp/services)
  - [Learnings](mvp/learnings)
  - [Acknowledgements](mvp/acknowledgements)
- RIF Identity Manager ([more info](https://github.com/rsksmart/rif-identity-manager))
- [rLogin](rlogin)
  - [Integrate](rlogin/integrate)
  - [Integrations](rlogin/integrations)
  - [Design & architecture](rlogin/architecture)
  - [Libraries](rlogin/libraries)
    - [rLogin modal (client side)](rlogin/libraries/modal)
    - [DID Auth (server side)](rlogin/libraries/express-did-auth)
    - [Verifiable Credential schemas (communication)](rlogin/libraries/vc-json-schemas)
  - [Develop](rlogin/develop)
- [Data Vault](data-vault)
  - [Use](data-vault/use)
  - [Design & architecture](data-vault/architecture)
    - [Web client SDK](data-vault/architecture/client)
    - [HTTPS service](data-vault/architecture/service)
    - [Provider module](data-vault/architecture/provider)
  - [Develop](data-vault/develop)
- [Libraries](libraries)
  - [Mnemonics](libraries/mnemonics) - identity derivation tools using mnemonic phrases
  - [RSK DIDs](libraries/rsk-ethr-did) - handle Ethr DID method procedures in RSK network
  - [Ethr DID](libraries/ethr-did) - uPort `ethr-did` with RSK support
  - [Ethr DID Utils](libraries/ethr-did-utils) - testing utilities for Ethr DID Registry
  - [DAF bindings](libraries/daf) - use uPort agent with RIF identity multi identity model
  - [VC Core module](libraries/core) - Verifiable Credentials in React.js + Redux
  - [Node utils](libraries/node-utils) - utilities for Node.js backend
- [Specs](specs)
  - [Identity layout](specs/identity-layout) - create and recover identities
  - [Encryption layout](specs/encryption-layout) - Storing and recovering encrypted information
  - [DID authentication](specs/did-auth) - a challenge–response authentication model based on DIDs
  - [Credential requests protocol](specs/credential-requests) - a simple protocol for request, grant and receive credential case
  - [The Convey service](specs/convey-service) - transport content that does not fit into a QR code
  - [Presentations timestamps](specs/presentation-timestamps) - emitting and validating presentations with timestamps
- [About](about)
- [Collaboration guidelines](contribute)
- [Definitions](definitions)
- [References](references)

<!--
- [RIF Identity Manager](manager)
  - [User guide](manager/user-guide)
  - [Design & architecture](manager/architecture)
  - [Develop](manager/develop)
- [rLogin](rlogin)
  - [Integrate](rlogin/integrate)
  - [Design & architecture](rlogin/architecture)
  - [Implementation](rlogin/implementation)
    - [rLogin modal (client side)](rlogin/implementation/modal)
    - [DID Auth (server side)](rlogin/implementation/express-did-auth)
    - [Verifiable Credential schemas (communication)](rlogin/implementation/vc-json-schemas)
  - [Develop](rlogin/develop)
- [FAQ](faq)
-->

## Repos

MVP

- [MVP Node.js Services](https://github.com/rsksmart/rif-identity-services)
- [MVP React.js and React Native apps](https://github.com/rsksmart/rif-identity-ui)

Identity Manager

- [RIF Identity manager](https://github.com/rsksmart/rif-identity-manager)

rLogin

- [rLogin](https://github.com/rsksmart/rLogin)
- [Express DID Auth](https://github.com/rsksmart/rif-identity.js/tree/develop/packages/express-did-auth)
- [VC JSON Schemas](https://github.com/rsksmart/vc-json-schemas)
- [Wallet Connect POC](https://github.com/rsksmart/RSKWalletConnect)

Data Vault

- [Data vault Javascript monorepo](https://github.com/rsksmart/rif-data-vault)

Libraries

- [Javascript libraries monorepo](https://github.com/rsksmart/rif-identity.js)
- [Ethr DID + RSK support](https://github.com/rsksmart/ethr-did)
- [Ethr DID dev utils](https://github.com/rsksmart/ethr-did-utils)
