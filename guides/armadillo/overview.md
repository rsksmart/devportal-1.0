---
layout: rsk
title: 'Armadillo - Overview'
description: 'The guardian of RSK'
tags: armadillo, guard, security, guides, bitcoin, rsk, peer-to-peer, merged-mining, blockchain
---

[![Armadillo-banner](/assets/img/guides/armadillo/Armadillo_banner.png)](/guides/armadillo/)

## What is Armadillo?

Armadillo is a suite of tools that includes a monitor that controls the bitcoin and RSK networks, checking that the [merged mining](https://mining.rsk.co/) algorithm works as expected.

Armadillo has the capability to detect some potential threats in advance.
It determines if there are discrepancies in the information in both networks,
and any discrepancies found will be catalogued as forks of the RSK mainnet network.
These forks can potentially be a [double-spend](https://en.wikipedia.org/wiki/Double-spending) attack on the network.

### Diving In

It is important to note that Armadillo is not bulletproof,
the reason for this is in its own nature.
Armadillo depends on the block’s information retrieved from the Bitcoin network.
Every block in BTC may or may not have an [RSKtag](/guides/armadillo/glossary/#rsktag/).
In the best scenario where all BTC mining pools are mining RSK,
this means that all BTC blocks are going to have an RSKtag in their coinbase,
in this circumstance, RSK will reach a 100% of BTC hashing power.

In the instance where RSK has 50% of BTC hashing power,
there will be 50% of BTC blocks that will have an RSKtag.
Therefore, because it’s known that on average a BTC block is mined every 20 RSK blocks,
(probabilistically) there will be one RSKtag in BTC blocks for every 40 RSK blocks.

Under current circumstances, a double-spending attack which goes from 100 to 200 blocks length could be dangerous for a wallet,
since the average time to have a transaction confirmed is around 120 blocks.
In comparison, the RSK federation expects 4000 blocks to make a block valid,
then a fork with more than 4000 blocks could become problematic for RSK.

Consequently, if a fork is being produced with a longitude of 120 RSK blocks,
we will see (tentatively) 3 BTC blocks with RSKtag,
which will be referred to as [Witness Bitcoin block (WB)](/guides/armadillo/glossary/#witness-bitcoin-block/),
therefore, we have a window opportunity to alert that the fork could end up in a double-spending attack.
In conclusion, the faster the Armadillo alert is; the better.

Also, the more blocks a fork has; the more problematic it could be.
However, Armadillo will be more accurate in terms of credibility.
Having more WBs results in more data available for analysis to work out if a fork has bad intentions.
Finally, if Armadillo is more accurate in terms of quantity of data we can act more precisely about what level of alert should be triggered.

Moreover, it is understandable that for certain reasons,
the [attacker](https://www.investopedia.com/terms/1/51-attack.asp) could eventually mine less bitcoin blocks in the attack window,
which would result in the number of WB in account required to take an action.

Also, assuming that an attacker has a 51% of RSK hashing power network - about (25,5% BTC Hashing power),
there is going to be approximately 1 WB with attack information for every 4 WBs.
Consequently, Armadillo will not be able to anticipate a fork of 120 blocks length in a worst case scenario.
This is because the first WB could be at the beginning of the fork or at the end,
in an ideal scenario we will be able to have just 1 WB, and 1 WB is not enough to say that we are being attacked.
That is the reason why Armadillo is not bulletproof,
it depends on the hashing power of the network and probability.

Another point to take into consideration is the location in the blockchain where the fork is occurring,
since it could be taking place in the far past, past, near present,
future or far future.
Read more on the various time occurrences [here](/guides/armadillo/network-under-attack/#what-is-a-fork/).
