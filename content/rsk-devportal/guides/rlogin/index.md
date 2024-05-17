---
section_title: Complete a DApp with rLogin
menu_title: Overview
layout: rsk
title: rLogin Guide
tags: guide, rsk
description: "Guides on RSK, workshops, and other guides"
---

In this series of three articles,
we are going to build a decentralized application with a backend.
We will use rLogin suite,
developed by [RIF Identity](../../rif/identity/) team,
which will allow us to build a secure, reliable and scalable
DApp from scratch.

- Part 1 - [Build a frontend with rLogin, and perform wallet operations](/guides/rlogin/connect-frontend/)
- Part 2 - Build a backend with decentralised identity authentication: Coming Soon!
- Part 3 - Integrate with RIF Data Vault to store Verifiable Credentials: Coming Soon!

![rLogin-connect-wallet](/assets/img/guides/rLogin/connect-wallet.png/)

The first article is an introduction and
explains **how to connect to the user's digital wallet**.
It also shows how to perform different operations
and interactions with the wallet:
Send transactions, digitally sign messages, and so on.
This will be a pure frontend app at first.
Users will be able to join the application with
any RSK or Ethereum compatible wallet,
even using a mobile phone wallet.
This will be powered by the
[rLogin](https://github.com/rsksmart/rLogin) library.

In the second article, we will build a backend for this app, using an
[Express DID Auth](https://github.com/rsksmart/express-did-auth)
library, which allows us
to **authenticate users using their wallet address as a unique identifier**.
The library enables a secure and simple authentication model
where the user needs to digitally sign a message with their wallet.
This optimizes the user experience avoiding the need to
remember passwords, or receive any emails to validate identity.

Finally, in the third article, we will work with something
a little bit more complex: the
[RIF Data Vault](https://github.com/rsksmart/rif-data-vault).
This service allows users to
have **a user-centric cloud storage, where saved files are encrypted on the client side**.
We make use of the user's wallet to encrypt files,
empowering users with real privacy for their information.
This means that even the Data Vault server cannot decrypt your data.
The service allows us, for example,
to store Verifiable Credentials that can be requested
at the time as part of authentication.

The combination of rLogin, DID Auth, and RIF Data Vault,
enables developers to build DApps which do things that
were previously not possible in the crypto world!
