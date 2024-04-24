---
menu_order: 400
menu_title: Get RBTC using Powpeg
title: "How to get RBTC using Rootstock’s built in PowPeg | Rootstock (RSK)"
description: "Learn how the Rootstock Powpeg works and how to use it to get RBTC via the peg-in and peg-out process"
tags: rbtc, Rootstock, powpeg, 2-way peg, defi, exchange, crypto, buy, peg-in, peg-out, how-to
layout: "rsk"
---

![Powpeg Banner](/assets/img/guides/get-crypto-on-rsk/powpeg-banner.jpg)

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/KmXayl_z9-0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

If you want to get RBTC,
there are a number of different ways to do it,
ranging from exchanges, decentralised exchanges,
and even peer-to-peer swaps -
These are generally easier to use.

The Rootstock blockchain protocol itself supports a method built into its
blockchain protocol that allows for two-way swaps between BTC and RBTC:
The Rootstock PowPeg.
This is generally more difficult to use,
and is intended for those with a more technical background.

Even if you intend to use those other services to obtain RBTC,
it is still important to know about the PowPeg,
as these other services ultimately rely on the PowPeg themselves.

## What the Rootstock PowPeg does

A two-way peg (2WP) protocol is a protocol that allows transfers of
a cryptocurrency from a main blockchain
to a secondary blockchain and vice versa.
It requires low third party trust.

In the case of Rootstock, the main blockchain is Bitcoin,
and the secondary blockchain is Rootstock.
Every RBTC (or fraction of RBTC) unlocked in the Rootstock platform
requires BTC to be locked on the Bitcoin blockchain.
This mechanism ensures there is a one-to-one relationship
between BTC and RBTC (1 BTC = 1 RBTC),
which is guaranteed by the Rootstock protocol.

When a user wants to swap between BTC and RBTC,
they need to send the cryptocurrency to the address
specified by the PowPeg,
triggering a peg-in or a peg-out,
which we will describe in more detail below.

## How the Rootstock PowPeg works

There are some restrictions and validations done when
a peg-in or peg-out transaction is made, such as:

- minimum values accepted,
- supported BTC address formats to do a peg-in,
- maximum amount of Bitcoins that can be locked in the PowPeg concurrently

Users cannot choose what address they will receive their assets on,
instead the receiving address is determined
using the public key of the sender,
so that both accounts are controlled by the same private key.

> Note that in the upcoming Rootstock release (IRIS-3.0),
> this is partially changing.
> The PowPeg will allow the user to specify the
> receiving address for peg-ins (BTC → RBTC).

The process of peg-ins and peg-outs are done completely using
Bitcoin wallet software and Rootstock wallet software.
The onus to perform the necessary checks and validations
for compliance with the rules of the PowPeg lies on the user,
as there is no application or tool to perform this.

> Warning: The user needs to be aware of this lack of “guard rails”,
> and accept the risk that transactions may be rejected
> or transferred amounts may be burnt (permanently lost),
> if they perform errors during the process.
> Hence, we encourage only users with technical expertise
> to perform peg-ins and peg-outs on their own.

**Pros**:

- Non custodial, users don’t give any third party custody
  of the transferred funds.
- No peg in fees (except for the fees of the BTC transaction).
- Can process larger transactions amounts.
- No registration or KYC required.

**Cons**:

- High wait time.
  - For security reasons, a significant number of transaction
    confirmations need to occur before funds are released.
- Minimum peg-in/ peg-out transaction values allowed are high
  - Currently, amounts must exceed 0.005 BTC and 0.004 RBTC, respectively
- Hard to use for regular users without technical expertise.
- Bitcoin network fees for peg-outs can be high.


## Receiving RBTC (peg-in)

Peg-in is the standard term for the process that
transfers bitcoins from the Bitcoin network to the Rootstock network.

To perform a peg-in send the bitcoins (BTC)
to the PowPeg address on the Bitcoin network,
and subsequently inform the Bridge about this transaction.
The Powpeg subsequently releases bitcoins (RBTC) on the Rootstock network.

![Peg-In](/assets/img/guides/get-crypto-on-rsk/Peg-in.gif)

To summarise, a peg-in:

- Converts BTC to RBTC
- Locks BTC on the Bitcoin network
- Releases RBTC on the Rootstock network

> For a step-by step guide of the process, check out the
[peg-in guide](/rsk/rbtc/conversion/networks/mainnet/#btc-to-rbtc-conversion)
(BTC → RBTC) or use the [2 way peg app](/guides/two-way-peg-app/)

## Sending RBTC (peg-out)

Peg-out is the standard term for the process that transfers
bitcoins from the Rootstock network to the Bitcoin network.

To perform peg-outs, send the bitcoins (RBTC) to the Bridge.
Then wait for the required number of confirmation blocks,
after which the Bridge builds the transaction
to release bitcoins (BTC) on the Bitcoin network.

![Peg-Out](/assets/img/guides/get-crypto-on-rsk/Peg-out.gif)

To summarise, a peg-out:

- Converts RBTC to BTC
- Locks RBTC on the Rootstock network
- Releases BTC on the Bitcoin network

> For a step-by step guide of the process, check out the
[peg-out guide](/rsk/rbtc/conversion/networks/mainnet/#rbtc-to-btc-conversion)
(RBTC → BTC)

## Get RBTC using PowPeg

Watch this demo video showing a conversion
between BTC and RBTC using the PowPeg protocol.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/XTpQW9Rw838" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Next

Be sure to check out our next article in this series,
about how to get the Rootstock cryptocurrency, RBTC,
by using wallets: [How to get RBTC using Wallets](/guides/get-crypto-on-rsk/rbtc-wallets/)