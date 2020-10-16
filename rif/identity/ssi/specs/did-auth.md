---
layout: rsk
title: "DID Auth - Specs - Self-Sovereign Identity - RIF Identity"
tags: rif-identity, rif-id, ssi, self-sovereign-identity
---

## DID authentication - a challenge–response authentication model based on DIDs

A challenge–response authentication is a family of protocols in which one party presents a question ("challenge") and another party must provide a valid answer ("response") to be authenticated. {% include ref.html id="10" %}

This protocol is based on CHAP{% include ref.html id="11" %} authentication protocol, W3C Verifiable Credentials model {% include ref.html id="7" %}, [uPort selective disclosure implementation](https://developer.uport.me/flows/selectivedisclosure) and W3C Verifiable Credentials JSON Schema Specification {% include ref.html id="12" %}.

It is designed to:

- Let the application request the user to share specific information that can be verified - this information can be used in business logic to grant or deny access
- Allow the user to opt-in or out to the information - it is a user-centric protocol, the user decides wether to share the information or not
- Provide an access token to the user that can be reused - wallet systems usually request user action to sign messages, enabling reusing access token reduces the amount of signatures required and improves the user experience

It uses HTTPS as the message transport layer.

Alice needs to access Bob's service, so Bob needs to authenticate Alice:

1. Alice sends `POST /request_auth { did }` to Bob, where `did` is Alice's DID
2. Bob creates a random challenge to send to Alice, stores the pair `did-challenge`, and responses with `{ challenge, sdr }` were `sdr` is a [selective disclosure request](#request)
3. Alice receives Bob's `challenge` and `sdr` request, obtains information required, creates a JWT {% include ref.html id="1" %} with payload `{ challenge, sdr }` signed with `did`'s private key, where `sdr` is the [selective disclosure response](#response), and sends  `POST /auth { response: jwt({ challenge, sdr }) }`
4. Bob verifies JWT signature, compares the challenge in the payload to the stored challenge, and performs business logic over the sdr. If it is a valid user, creates and responds with an access token. That access token is a `jwt({ issuer, subject, expiration, audience, sdr })`.
5. Alice accesses next HTTPS requests using header `Authentication` with the Credential received

The access token issued by Bob can be reused until `expirationDate` value.

The selective disclosure request is optional and it depends on the service needings.
- Open apps: it needs just a proof that the user controls the did. In that case the `challenge` is enough
- Permissioned apps: it needs a proof that the user controls the did and also proofs that the user fullfil the business needings. IE: be older than 18 years old.

This protocol can be modified to use disposable tokens in order to ensure that the user is always controlling the did, without reusable credentials. A simple implementation may require Alice to request a new challenge for each interaction with the service. A smarter implementation would respond with a new challenge after each interaction, so Alice will need to save the next challenge to be used and the protocol will prompt _Alice_ to make only one extra request to get the first challenge.

## Sequence diagram

![did auth]({{ site.baseurl }}/assets/img/ssi/08_did_auth.png)

## Selective disclosure

It is strongly based on [uPort implementation](https://developer.uport.me/flows/selectivedisclosure), where the service requires certain information and the user responds with it.

The selective disclosure request must be compatible with [uPort DAF implementation](https://github.com/uport-project/daf/blob/d7714e5b3c2f00a90a861488deb2d37fba750173/packages/daf-selective-disclosure/src/action-handler.ts#L16-L23), so it must implement the following interfaces.


### Request 

```
export interface Claim {
  claimType: string
  claimValue: string
  reason?: string
  essential?: boolean
}

export interface SelectiveDisclosureRequest {
  issuer: string
  subject: string
  replyUrl?: string
  claims?: Claim[]
  credentials?: string[]
}
```

`issuer`: the service did. REQUIRED

`subject`: the user did (the one received when requesting the challenge). REQUIRED

`replyUrl`: the auth endpoint.

`claims`: needed claims that may be or not be part of a credential. IE: `preferredLanguage`.

`credentials`: array of W3C Verifiable Credentials JSON Schema names. Those schemas definitions will be published in an open repository in Github. IE: `EmailCredential`, `BirthdateCredential`.


### Response 

```
import { VerifiableCredential } from 'did-jwt-vc'

export interface SelectiveDisclosureResponse {
  issuer: string
  subject: string
  claims?: Claim[]
  credentials: VerifiableCredential[]
}
```

`issuer`: the user did. REQUIRED

`subject`: the service did. REQUIRED

`claims`: requested claims. IE: `{ claimType: 'preferredLanguage', claimValue: 'english' }`

`credentials`: array of W3C Verifiable Credentials that implements the requested JSON schemas


### Implementations

- [`@rskmsart/rif-id-did-auth`](../libraries/express-did-auth) - in progress
<!-- - [RIF Data Vault authentication]({{ site.baseurl }}/data-vault/architecture/auth) -->

### Open work

- Build a repository of W3C Verifiable Credentials JSON Schema definition
- This protocol can be abstracted from the transport layer