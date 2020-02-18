---
layout: rsk
title: 2-way peg
collection_order: 4300
tags: rsk, rbtc, btc, peg
description: "Transfer BTC to RBTC, and RBTC to BTC through a 2-way peg."
---

The 2-Way Peg is a method to [transfer BTC into RBTC](/rsk/rbtc/conversion/), and vice-versa. In practice, when BTC and RBTC are exchanged, no currency is “transferred” between blockchains.

There is no single transaction that does the job. This is because Bitcoin cannot verify the authenticity of balances on another blockchain.

When a user intends to convert BTC to RBTC, some BTC are locked in Bitcoin Blockchain and the same amount of RBTC is unlocked in RSK.

When RBTC needs to be converted back into BTC, the RBTC get locked again in RSK and the same amount of BTC are unlocked in the Bitcoin blockchain. [A security protocol](/rsk/architecture/security/) ensures that the same currency cannot be unlocked on both blockchains at the same time.

<a href="/rsk/rbtc/conversion/" class="green-button">Convert BTC into RBTC</a>
