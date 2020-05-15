---
layout: rsk
title: BTC to R-BTC Conversion
tags: rsk, rbtc, conversion, peg, 2-way, peg-in, peg-out, federation
description: "Converting R-BTC to BTC (peg-in) and BTC to R-BTC (peg-out), for both Mainnet and Testnet."
collection_order: 3100
permalink: /rsk/rbtc/conversion/
---

In this article we will explain step by step on how to convert from BTC to R-BTC, and vice versa.
The process of conversion utilises a **2-way peg** mechanism.
Thus, these conversions are referred to as peg-ins and peg-outs.

- **Peg-in**:
  - A conversion from BTC to R-BTC
  - Locks BTC in the BTC Federation address
  - Releases R-BTC in the RSK derived address
- **Peg-out**:
  - A conversion from R-BTC to BTC
  - Locks R-BTC on the RSK network 
  - Releases BTC on the Bitcoin network  

<div class="fade alert alert-warning show">IMPORTANT: WHITELIST PROCESS. To use the 2-way-peg you must first <a href="/rsk/rbtc/conversion/whitelist">get whitelisted</a>.</div>

> Note: On Testnets, the token symbols are prefixed with a lowercase `t`.
> Thus we have `BTC` and `R-BTC` on Mainnets,
> which correspond to `tBTC` and `tR-BTC` of Testnets.

## Step by step instructions

- [Mainnet Guide](/rsk/rbtc/conversion/networks/mainnet)
- [Testnet Guide](/rsk/rbtc/conversion/networks/testnet)

You can try the conversion process using either a hardware wallet, or using software:

- [Using a Ledger hardware wallet](/rsk/rbtc/conversion/with-ledger)
- [Using software](/rsk/rbtc/conversion/with-node-and-console)

## Video

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/1jdYVw8zLUg?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### Q & A

**1. How often does the RSK Federation address change?**

RSK Federation address has changed three times since RSK mainnet launch.

**2. Do I lose my Bitcoin if the RSK Federation address change during my transfer?**

There is a grace period for the RSK Federation address change. You will still be able to lock Bitcoin and get R-BTC during the grace period. However, any Bitcoin sent to the old RSK Federation address will be lost post to the grace period.

### Feedback

For any questions and suggestions you can post to RSK [Gitter channels](https://gitter.im/rsksmart/getting-started).