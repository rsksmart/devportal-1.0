---
layout: rsk
title: RIF Enveloping - V2 Changelog
tags: rif, enveloping, rsk, envelope, gas station network, gsn, changelog
---


* RelayHub contract doesn't receive payments, the payment for the service (in tokens) is sent directly to the worker relaying the transaction on behalf of the user.
* RelayHub contract now handles relay manager staking.
* Gas estimation improvements:
    * GasOverhead removed from RelayHub, there are no more validations against hardcoded values
    * Now the gas and tokenGas fields from the request can be left undefined, and in that case they will be automatically estimated by the RelayClient.
    * The maximum gas estimation in the RelayServer is more precise now
    * A new utility function is available to estimate the maximum gas a relay transaction would consume, based in a linear fit estimation. This can be used in applications that don't want to sign a payload each time they need an approximation of the cost of relaying the transaction
* Paymaster verifications are done off-chain to optimize gas costs, thus the paymasters are now called Verifiers and they are not part of the on-chain relay flow nor they handle payments at all.
* Big gas cost optimization.
* Security issues fixed.
