---
layout: rsk
title: Fast payments
collection_order: 4700
tags: rsk, remasc, interval, speed, propagation
description: "Achieving faster on-chain block intervals"
---

RSK already enables second layer off-chain payment networks, but RSK still aims to provide a much better on-chain payment network compared to Bitcoin. To achieve this, RSK adopts the [REMASC protocol](/rsk/architecture/mining/remasc/), which allows RSK to reach a fifteen second average block rate, without creating incentives for mining centralization and selfish mining.

Main features:

* Fifteen to thirty second block intervals, depending on the miner’s state switching efficiency
* Full network propagation of last competing blocks to prevent selfish mining and reduce stale block rate
  * [RSK White Paper Overview](https://www.rsk.co/Whitepapers/RSK-White-Paper-Updated.pdf), see page 17
* New network command to spread block headers with time critical priority
* [REMASC protocol](/rsk/architecture/mining/remasc/) for reward sharing between competing blocks
* GHOST protocol for chain weighting

Since the creation of Bitcoin there has been a race towards lower intervals for PoW blockchain based cryptocurrencies. But low block interval may impact the stability and capability of the cryptocurrency network, so several design factors must be considered. First of all, the most important factor that affects the viability of short confirmation intervals is the number of stale blocks generated. The main factor that affects the stale block rate is the block propagation protocol. For RSK we've carefully analyzed this protocol and we’ve run simulations in order to verify the performance, usability and security of the network.

In Bitcoin, when two or more miners have solved blocks at equal height, there is a clear conflict of interest. Each competing miner wants his block to be selected by the remaining miners as the best-chain tip, while the remaining miners generally would not care which one is chosen from the two. However, all the remaining honest miners and users have a rational preference that the same block tip is chosen, because this reduces the reversal probability. The [REMASC consensus protocol](/rsk/architecture/mining/remasc/) sets the right economic incentives for a convergent choice, without requiring further interaction between miners. It is a reward sharing strategy that incentivizes resolving the conflict economically such that:

1. The conflict is resolved deterministically when all parties have access to the same blockchain state information
2. The chosen resolution maximizes all miners’ collective revenue, and for both the miners in conflict in case block rewards differ by a high margin
3. The chosen resolution maximizes censorship-resistance if competing blocks have approximately similar rewards
4. Resolving the conflict takes negligible time
