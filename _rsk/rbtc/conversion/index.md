---
layout: rsk
title: BTC to RBTC Conversion
tags: rsk, rbtc, conversion, peg, 2-way, peg-in, peg-out, federation
description: 'Converting RBTC to BTC (peg-in) and BTC to RBTC (peg-out), for both Mainnet and Testnet.'
collection_order: 3100
permalink: /rsk/rbtc/conversion/
render_features: '2-way-peg-verifier'
---

In this article we will explain step by step on how to convert from BTC to RBTC, and vice versa.
The process of conversion utilises a **Powpeg** mechanism.
Thus, these conversions are referred to as peg-ins and peg-outs.

- **Peg-in**:
  - A conversion from BTC to RBTC
  - Locks BTC in the BTC Federation address
  - Releases RBTC in the RSK derived address
- **Peg-out**:
  - A conversion from RBTC to BTC
  - Locks RBTC on the RSK network
  - Releases BTC on the Bitcoin network

## Compatibility

**The types of addresses that are accepted for the Federation are**:
- Legacy (P2PKH)
- Segwit Compatible (P2SH-P2WPKH)

> Note: On the Testnets, the token symbols are prefixed with a lowercase `t`.
> Thus we have `BTC` and `RBTC` on the Mainnets,
> which correspond to `tBTC` and `tRBTC` of the Testnets.

### Address verifier

Enter your BTC address below to verify whether it may be used to peg in from BTC to RBTC.

[](#top "pegin-address-verifier")

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

There is a grace period for the RSK Federation address change. You will still be able to lock Bitcoin and get RBTC during the grace period. However, any Bitcoin sent to the old RSK Federation address will be lost post to the grace period.

### Feedback

For any questions and suggestions you can post to RSK [Gitter channels](https://gitter.im/rsksmart/getting-started).
