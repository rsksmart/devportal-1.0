---
layout: rsk
---

## Data vault

The RIF Identity Data Vault is a public service where the users can store their personal information in a secure way.
That information may be declarative details, verifiable credentials or other metadata related to the user. It is controlled 100% by the user, who just needs the mnemonic phrase to access it, other apps need authorization from the user to access his information because the data will be encrypted with the user private key.

The first version of the RIF Data Vault is the [IPFS Centralized Pinner](./cpinner)

- [Use](use)
- [Design & architecture](architecture)
  - [Provider module](cpinner/cpinner-provider)
  - [HTTPS service](cpinner/cpinner-service)
  - [Web client SDK](cpinner/cpinner-client)
- [Develop](develop)
