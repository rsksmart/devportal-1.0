---
layout: rsk
title: 'Armadillo - Network Under Attack'
description: 'The guardian of RSK'
tags: armadillo, guard, security, guides, bitcoin, rsk, peer-to-peer, merged-mining, blockchain
---

[![Armadillo-banner](/assets/img/guides/armadillo/Armadillo_banner.png)](/guides/armadillo/)

## What is a fork?

A fork in the general sense is a chain of blocks that don't follow the [mainchain](/guides/armadillo/glossary/#mainchain).
A fork may be an isolation from the network by an attacker or by mistake,
the node can be out of consensus due to a consensus-splitting bug,
or the node could be maliciously building a parallel chain in preparation for a double-spend attack.

Armadillo detects if a BTC block contains a valid RSKtag information,  also if it is in the RSK mainchain or not.
Those tags which are not in the mainchain will be part of a new fork or an existing one.

Otherwise, they are going to be placed into the Armadillo mainchain with the corresponding RSK block info.

**Example:**

![network under attack](/assets/img/guides/armadillo/network-under-attack.png)

> At 8324 BTC height there is a RSKtag, which points at 4998 height of the RSK block.

Armadillo verifies that the RSKtag does not match with the RSK network.
In the CPV, there is a difference of 4 bytes between the RSK mainchain block at the same height and the one found in the WB,
this means that the fork could have started in the range of 4672 and 4736 of RSK heights,
because of the CPV formula.

Then, the worst case scenario is a fork of 4998 - 4672 = 326 blocks length.

![network under attack 2](/assets/img/guides/armadillo/network-under-attack-2.png)

This is a continuation of the previously mentioned fork.
The RSKtag in WBs at heights 8327 and 8332 didn’t match at RSK network heights.
However, their CPVs follow the same path branch with the one already existing at WB height 8324.
This means that all these new WBs are going to be added to the same fork.

As stated in the previous example,
the length of the fork in the worst case scenario was 326 blocks,
given that there are new items in the fork,
the newly calculated length of this fork for the worst case scenario is 5223 - 4672 = 551 blocks.

This example shows how the new items in an existing fork are added and how the new incremental length of the fork gives awareness of the possible threat.

## Fork Scenarios

Forks could be detected at the past, present or future,
the “time” is according to the RSK mainchain [best block](/guides/armadillo/glossary/#best-block/) and it will depend on the first WB detected,
explicitly in the Block Number (BN) field in RSKtag WB (`WB_BN`).
This field indicates that a mining pool could be behind or ahead of the mainchain.
So, if all miners are following the top of RSK mainchain,
they are going to be competing at the best block height,
then `WB_BN` would be equal or close to RSK Best block (`RSK_BB`).

### Fork In The Far Past

A fork in the far past is the one which starts in the past respected RSK_BB,
and the distance to the RSK_BB is greater than 6000 blocks.

A fork which is in the far past has less probability to have a chance to rewrite the blockchain,
the further it is, the more difficult to accomplish and less dangerous it is for RSK.

This scenario is more useful as an indicator of the health of the network than a possible attack scenario.

### Fork In The Past

A fork in the past is the one which starts in the past respected `RSK_BB`, and the distance to the RSK_BB is closer than 6000 blocks.

If the first WB was found in the past and is close to RSK_BB,
this means that there is a possibility that it can rewrite the blockchain,
obviously the attacker should meet others requirements,
for instance the hashing power should be higher (>50%) than the RSK network in order to be able to achieve the double-spending.

### Fork In The Present

A fork in the present is the one which starts at the same height as RSK_BB height (RSK_BBH).

This is a common scenario,
and could happen because the network had a reorganization (some blocks are competing),
or, why not, because a fork could have started at that time.

### Fork In The Future

A fork in the future is the one which starts in the future with respect to RSK_BB,
and the distance to the RSK_BB is closer to 6000 blocks.

This is a probable scenario, it could happen because:
- The network is competing at the best block,
then a miner can be one block ahead of the rest of miners.
- A fork could have started at present (RSK_BB).
- A fork could have started at the PAST and because that miner has more than 50% of the hashing power,
reach the FUTURE, this is a dangerous case and could end up in an double-spending attack.

### Fork In The Far Future

A fork in the far future is the one which starts in the future with respect to RSK_BB,
and the distance to the RSK_BB is greater than 6000 blocks.

A fork which is in the far future has low probability to be a real attack.
The chance of Armadillo not noticing the [WBs](/guides/armadillo/glossary/#witness-bitcoin-block/) from a height in the past to the far future is really low,
even more if the miner has a high [hashing power](/guides/armadillo/glossary/#hashing-power/).

This scenario could tell more about the health of the network than a possible attack scenario,
for example, if a mining pool made a mistake with the RSKTag.



