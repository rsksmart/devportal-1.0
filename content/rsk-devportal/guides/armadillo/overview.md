---
menu_order: 200
menu_title: Overview
layout: rsk
title: 'Armadillo - Overview'
description: 'The guardian of RSK'
tags: armadillo, guard, security, guides, bitcoin, rsk, peer-to-peer, merged-mining, blockchain
---


## What is Armadillo?

Armadillo is a suite of tools that monitors the bitcoin and RSK networks. The monitor checks that the [merged mining](https://mining.rsk.co/) protocol is working as expected.

Armadillo has the capability to detect some potential threats in advance.
It checks the Bitcoin blocks and the RSK blocks and determines if there are discrepancies. Using this information Amradillo can detect forks of the RSK mainnet network.
This is important since a RSK fork can potentially be a [double-spend](https://en.wikipedia.org/wiki/Double-spending) attack on the network.

### Diving In

It is important to note that Armadillo is not bulletproof,
the reason for this is that the information it consumes is probabilitic by nature.
Armadillo depends on the information provided by merge-mined blocks that can be retrieved from the Bitcoin network.
Bitcoin blocks may or may not have an [RSKtag](/guides/armadillo/glossary/#rsktag/). An RSKtag contains an RSK block hash and more information that facilitates constructing a fork tree. The RSKtag is generally stored in the last output of the coinbase transaction.
In the best scenario where all Bitcoin miners are mining RSK, all Bitcoin blocks are going to have an RSKtag in their coinbase,
in this circumstance, RSK will reach a 100% of Bitcoin hashing power.

If, for example, RSK has 50% of Bitcoin hashing power, there will be approximately 50% of Bitcoin blocks that will have an RSKtag.
In this case, a Bitcoin block will be mined every 20 RSK blocks on average, and therefore there will be one RSKtag in Bitcoin blocks for every 40 RSK blocks. For the rest of this section, we'll assume RSK has 50% of Bitcoin's hashrate.

Let's consider a wallet or an exchange that waits for 120 blocks to confirm a payment. An attacker will need to revert more than 120 blocks to perform a double-spend attack. 
Consequently, if a fork is being produced with a length of 120 RSK blocks or more,
we will see (probabilistically) 3 Bitcoin blocks having RSKtags. We'll refer to each of those blocks as a [Witness Bitcoin block (WB)](/guides/armadillo/glossary/#witness-bitcoin-block/). The first of these 3 Bitcoin blocks marks the beggining of a window of opportunity to alert that the fork could end up in a double-spending attack.

Since due to the proabilistic nature of merge-mining not all 3 witness blocks could be miners during an attack, the RSK Powpeg expects as many as 4000 blocks to accept a peg-in. Therefore a fork trying to revert a Powpeg peg-in not willing to resign to Bitcoin rewards would produce 100 Witness Bitcoin blocks on average, which is plenty of evidence. 

### Conclusions

The longer an RSK fork is, the more dangerous it is. The faster an Armadillo alert can be created and propagated, the better. However, early detection also means that there can be more false positives. Waiting for more WBs results in more accurate diagnosis but less useful alerts, due to increasing false negatives.
Armadillo strives to provide a balance between accurate and useful alerts.

As we previously stated, the stochastic nature of mining means that 
the [attacker](https://www.investopedia.com/terms/1/51-attack.asp) could eventually mine less bitcoin blocks in the attack window,
which would result in a reduced number of WBs in account required to take an action.

Finally, assuming a worst case scenario where an attacker has a 51% of RSK hashing power of the RSK network - about (25.5% BTC Hashing power),
we would expect approximately 1 WB with attack information for every 4 honest WBs.
Consequently, in this case, Armadillo will not be able to anticipate a fork with a length of 120 blocks.
This is because the first WB could be mined at the beginning of the fork or at the end, and 1 WB is not enough for Armadillo to produce an alert.
For this reason, Armadillo is not bulletproof: The utility of this tool depends on a combination of the hashing power of the network, the hashing power of the attacker, the budget of the attacker, and an element of chance.

Another point to take into consideration is the location in the blockchain where the fork is occurring,
since it could be taking place in the far past, past, near present,
future or far future.
Read more on the various time occurrences [here](/guides/armadillo/network-under-attack/#what-is-a-fork/).
