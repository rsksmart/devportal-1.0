---
layout: rsk
title: RIF Enveloping Versions
tags: rif, enveloping, envelope, relay, gas station network, gsn, versions, changelog
permalink: /rif/enveloping/versions/
---

The first iteration of RIF Enveloping was based on the great work done by the [Gas Station Network team](https://www.opengsn.org/).

## Version 1

RIF Enveloping V1 started as a fork of GSN with two goals in mind:

- Be compatible with existing and future smart contracts without requiring such contracts to be adapted to work with RIF Enveloping.
- Be as cost effective as possible.

## Version 2

### Overview

RIF Enveloping V2 is a redesign of GSN. It reduces gas costs and simplifies the interaction between the different contracts that are part of the system. It achieves this by:

- Securely deploying counterfactual Smart Wallet proxies for each user account: this eliminates the need for relying on `_msgSender()` and `_msgData()` functions, making existing and future contracts compatible with RIF Enveloping without any modification.
- Allowing relayers to receive tokens in a worker address under their control and decide what to do with funds later on.
- Reducing gas costs by optimizing the GSN architecture.

Our main objective is to provide the RSK ecosystem with the means to enable blockchain applications and end-users (wallet-apps) to pay for transaction fees using tokens (e.g. RIF tokens), and thereby remove the need to acquire RBTC in advance.

It is important to recall that - as a security measure - version 1 contracts deployed on Mainnet have limits on the staked amounts to operate; these limits were removed in version 2.

### Details

* RelayHub contract no longer receives payments, the payment for the service (in tokens) is now sent directly to the worker relaying the transaction on behalf of the user.
* RelayHub contract now handles relay manager staking.
* Gas estimation improvements:
    * Gas overhead removed from RelayHub; there are no more validations against hardcoded values.
    * The gas and token gas fields from the request can now be left undefined, and in that case, they will automatically be estimated by the Relay Client.
    * The maximum gas estimation in the Relay Server is more precise now.
    * A new utility function is available to estimate the maximum gas a relay transaction would consume, based in a linear fit estimation. This can be used in applications that don't want to sign a payload each time they need an approximation of the cost of relaying the transaction.
* Paymaster verifications are done off-chain to optimize gas costs, thus the paymasters are now called Verifiers and they are not part of the on-chain relay flow nor do they handle payments at all.
* Big gas cost optimization.
* Security issues fixed.