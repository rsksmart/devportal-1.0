---
layout: rsk
title: rLogin Libraries
description: 'multiple libraries that enable seamless integration to rLogin protocols'
tags: rlogin, libraries, architecture, rif, identity, vault, marketplace, auth, rif-data-vault, rns, ui
---

The implementation of the architecture defined above consists of multiple libraries that enable seamless integration to rLogin protocols:
- The [RIF Data Vault](/rif/identity/data-vault) - a user-centric cloud storage service
- [Verifiable Credential JSON Schemas](/rif/identity/rlogin/libraries/vc-json-schemas) and [parser](/rif/identity/rlogin/libraries/vc-json-schemas-parser) - proposes unique standard interface for Verifiable Credentials
- [Express DID Auth](/rif/identity/rlogin/libraries/express-did-auth) and [DID Auth client](/rif/identity/rlogin/libraries/did-auth-client) - a Node.js back-end authentication library and a client-side authentication consumer
- [rLogin modal](/rif/identity/rlogin/libraries/modal) - a UI tool that lets front-end developer to integrate different compatible wallets and a pre designed UX for application signup and login.
