---
menu_title: Credential requests protocol
menu_order: 500
layout: rsk
tags: rif, rif-identity, credential, request, self-sovereign, DID, libraries, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

# Verifiable credential requests protocol

### A simple protocol for request, grant and receive verifiable credential case

Users can build their self-sovereign identity by interacting with different services that grant them verifiable credentials. Both users and services are identified with decentralized identities (DIDs), and can issue and receive verifiable credentials ("credentials"). The credentials are cryptographically signed, this guarantees non repudiation, issuer authenticity, data integrity and allows the holder of the credential to present it to other entities.

This protocol is held by two entities: the _issuer_ and the _holder_. The issuer is a public entity that issues a specific type of credential, the holder is a user who wishes to acquire that credential and controls a certain DID. The issuer may require the holder to share specific information. This information can be either data input by the user in a declarative way (declarative details) or other credentials issued by the same issuer or another entity.

One important aspect considered is that the holder has an application were they can confirm or reject information sharing. The application must display clear explanation of the information that is going to be shared and the user must be able to accept it with "manual" input. Other important aspect considered in the protocol is that the issuance of the credential may be granted after user "manual" approval. For example, a web platform could display all _pending_ credential requests and grant or deny them manually.


The schema that is used to share credentials and declarative details in the credential request is not specified, and neither a discovery method for this schema. The holder should know what credentials and declarative details are requested by the issuer.

1. Holder requests a credential with their application
2. Holder's application display the information that is going to be requested (e.g.: full name, age, and a verified email)
3. Holder accepts to share the information
4. Holder's application sends credential request to the issuer in form of a JWT. The holder saves the JWT hash that will be used to poll for the response
5. Issuer's application verifies and shows credential request information
6. Issuer grants credential and exposes it to be discoverable with the credential request hash
7. Holder polls until getting the requested credential

## Sequence diagram

![credential requests](../assets/img/09_credential_requests.png)

### Open work

- Support DID Document service detection - allow the holder to find the issuer's service endpoint using its DID Document
- Provide a standard API to be implemented by holders
- Standard method for schema discovery


## Implementations

- [RIF Identity services - issuer app](https://github.com/rsksmart/rif-identity-services)
