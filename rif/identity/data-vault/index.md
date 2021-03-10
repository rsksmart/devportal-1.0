---
layout: rsk
---

## Data vault

The RIF Identity Data Vault is a public service where the users can store their personal information in a secure way.
That information may be declarative details, verifiable credentials or other metadata related to the user. It is controlled 100% by the user, who just needs the mnemonic phrase to access it, other apps need authorization from the user to access his information because the data will be encrypted with the user private key.

> The project has a known vulnerability that is being fixed right now. See [#74](https://github.com/rsksmart/rif-data-vault/pull/74).

The first version of the RIF Data Vault is the [IPFS Centralized Pinner](./architecture)

- [Use](use)
- [Design & architecture](architecture)
  - [Web client SDK](architecture/client)
  - [HTTPS service](architecture/service)
  - [Provider module](architecture/provider)
- [Develop](develop)
