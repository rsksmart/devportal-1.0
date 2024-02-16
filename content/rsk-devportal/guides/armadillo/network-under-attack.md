---
menu_order: 400
menu_title: Network Under Attack
layout: rsk
title: 'Armadillo - Network Under Attack'
description: 'The guardian of RSK'
tags: armadillo, guard, security, guides, bitcoin, rsk, peer-to-peer, merged-mining, blockchain
---

## What is a fork?

A fork in the general sense is a chain of blocks that don't follow the [mainchain](/guides/armadillo/glossary/#mainchain).
A fork may be created for several diffferent reasons:

- The miner may become isolated from the rest of the network by an attacker or by mistake.
- The miner's node may go out of consensus due to a consensus-splitting bug.
- The miner's node could be maliciously building a parallel chain in preparation for a double-spend attack.

The Armadillo tool can detect if a Bitcoin block contains valid RSKtag information, 
and also whether it is in the RSK mainchain.
The tags that are not in the mainchain will be classified by Armadillo as new for,
or as an extension of a previously identified fork.

In case it belongs to the mainchain, Armadillo will classify them as such.

**Example:**

![network under attack](/assets/img/guides/armadillo/network-under-attack.png)

> At 8324 Bitcoin height there is a RSKtag, which points at 4998 height of the RSK block.

Armadillo verifies that the RSKtag does not match with the mainchain of the RSK network.
In the CPV, there is a difference of 4 bytes between the RSK mainchain block at the same height and the one found in the WB.
This means that the fork could have started in the RSK block with height in the range between 4672 and 4736. 

Then, the worst case scenario is a fork of 4998 - 4672 = 326 blocks in length.

![network under attack 2](/assets/img/guides/armadillo/network-under-attack-1.png)

This is a continuation of the previous example, where the attacker extends the malicious fork.
The RSKtag in WBs at heights 8327 and 8332 do not match at the RSK network height.
However, their CPVs follow the same path branch with the one already existing at WB height 8324.
This means that all these new WBs are going to be added to the same, previously identified, fork.

As stated in the previous example,
the length of the fork in the worst case scenario is 326 blocks,
given that there are new items in the fork,
the newly calculated length of this fork for the worst case scenario is 5223 - 4672 = 551 blocks.

This example shows how the new blocks in an existing fork are added and how the growth of the fork increases the information available to classify the threat.

## Fork Scenarios

Forks could be detected at the past, present or future,
the “time” is according to the RSK mainchain [best block](/guides/armadillo/glossary/#best-block/) and it will depend on the first WB detected,
explicitly in the Block Number (BN) field in RSKtag WB (`WB_BN`).
This field indicates that a mining pool could be behind or ahead of the mainchain.
So, if all miners are following the top of RSK mainchain,
they are going to be competing at the best block height,
then `WB_BN` would be equal or close to RSK Best block (`RSK_BB`).

### Fork In The Far Past

A fork in the far past is the one which starts in the past respect to RSK_BB,
and the distance to the RSK_BB is greater than 6000 blocks.

A fork which is in the far past is less likely to be able to catch up with the blockchain tip and reorganize the blockchain.
The further the fork starts, the more difficult the attack is, and less dangerous the fork is for RSK.

A fork in the far past is likely to be an indicator of a poor health of the mining network than a possible attack scenario.

### Fork In The Past

A fork in the past is the one which starts in the past respect to `RSK_BB`, and the distance to the RSK_BB is closer than 6000 blocks.

If the first WB was found in the past and is close to RSK_BB,
this means that there is a possibility that it can rewrite the blockchain. Obviously, the attacker also needs to meet other requirements,
including having a hashing power higher than the than honest miners of the RSK network in order to be able to achieve the double-spend.

### Fork In The Present

A fork in the present is the one which starts at the same height as RSK_BB height (RSK_BBH).

This is a common scenario,
which could happen because the network had a recent reorganization due to the normal short block reorganizations that occur in RSK,
or could happen when where the fork commences as a result of two blocks produced within a very short time.

### Fork In The Future

A fork in the future is the one which starts in the future with respect to RSK_BB,
and the distance to the RSK_BB is closer to 6000 blocks.

This is a probable scenario, it could happen because:
- The network is competing at the best block,
then a miner can be one block ahead of the rest of miners.
- A fork could have started at present (RSK_BB).
- A fork could have started at the PAST and because that miner has more than 50% of the hashing power,
  the fork reaches the **future**. This is a dangerous case and could end up in an double-spend attack.

### Fork In The Far Future

A fork in the far future is the one which starts in the future with respect to RSK_BB,
and the distance to the RSK_BB is greater than 6000 blocks.

A fork which is in the far future has low probability of being an attack.
The chance of Armadillo not noticing the [WBs](/guides/armadillo/glossary/#witness-bitcoin-block/) from a height in the past to the far future is really low,
even more if the miner has a high [hashing power](/guides/armadillo/glossary/#hashing-power/).

This scenario indicates a problem with the health of the network,
and is much less likely to be related to an attack.
For example, a mining pool could have made a mistake when building the RSKtag.


