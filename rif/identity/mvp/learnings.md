---
layout: rsk
tags: rif, rif-identity, libraries, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

## The MVP - Learnings

After this project, we have advanced in different areas of the field of self-sovereign identity. The greatest challenges are found when developing the different protocols to implement communication between applications

First of all, there is no standard protocol to authenticate the identity of users when using public services. During this MVP we developed a simple [authentication protocol](../../specs/did-auth) and developed an [abstract implementation](/rif/rlogin/libraries/express-did-auth) simple to use in any Express.js service. This resulted in our current project called [rLogin](/rif/rlogin): it consists of a standard protocol to authenticate users, a front-end tool for developers to allow their users to choose any cryptocurrency wallet to operate with the services.

When we try to solve the problem of communication between services, we found an interesting use case that we have not yet developed: a credential issuer could require other pre-issued credentials from a user to validate their identity. As a result of this we are working on a [repository of standard schemas for credentials](/rif/rlogin/libraries/vc-json-schemas), which allows users to port their identity in the different models that apply verifiable credentials.

Another field we explore is cloud storage: we developed a simple implementation of a _data vault_. Users can use their controlled identity in a decentralized way to access their data. Applications may require users to share their data with their permission. We implemented a first service capable of storing user information, and we seek to enlarge this project: we are currently developing the [RID Data Vault](/rif/identity/data-vault).

Finally, another of the fields in which we are investigating is the encryption of information. Users own a cryptocurrency wallet that contains sufficient cryptographic information to securely encrypt their information. currently a user must safely save a 12-word backup of their wallet to have access to all their assets. We seek to develop a protocol that allows wallets to use these same 12 words to create private encryption keys, thus allowing users to recover their data at any time without the need to store more backup information.
