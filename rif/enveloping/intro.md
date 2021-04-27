---
layout: rsk
title: Introduction
tags: rif, enveloping, rsk, gas station network, gsn, defi
description: "A Secure sponsored transaction system to enable users to pay fees using ERC-20 tokens."
---

The first version of Enveloping was based on the [Gas Station Network (GSN) project](https://github.com/opengsn/gsn). GSN is a decentralized system that improves dApp usability without sacrificing security. In a nutshell, GSN abstracts away gas (used to pay transaction fees) to minimize onboarding and UX friction for dApps. With GSN, "gasless clients" can interact with smart contracts paying for gas with tokens instead of native-currency.

RIF Enveloping V2 is a redesign of GSN. It reduces gas costs and simplifies contract interaction.

It achieves this by:

- Securely deploying counterfactual Smart Wallet proxies for each user account: this eliminates the need for relying on `_msgSender()` and `_msgData()` functions, making existing and future contracts compatible with RIF Enveloping without any modification.
- Allowing Relay providers to receive tokens in a worker address under their control to later on decide what to do with funds.
- Reducing gas costs by optimizing the existing GSN architecture.

Our main objective is to provide the RSK ecosystem with the means to enable blockchain applications and end-users (wallet-apps) to pay for transaction fees using tokens (e.g. RIF tokens), and thereby remove the need to acquire RBTC in advance.

It is important to recall that - as a security measure - the version 1 contracts deployed on Mainnet have limits on the staked amounts to operate, these limits were removed in version 2.
