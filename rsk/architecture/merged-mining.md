---
layout: rsk
title: Merged mining
---

## Merged Mining

Satoshi consensus, based on proof-of-work, is the only consensus system that prevents the rewrite of blockchain history at a low cost. The academic community is advancing the knowledge and study of proof-of-stake as an alternative, but currently PoW provides the highest proven security. Merge mining is a technique that allows Bitcoin miners to mine other cryptocurrencies simultaneously with nearly zero marginal cost. The same mining infrastructure and setup they use to mine Bitcoins is reused to mine RSK simultaneously. This means that, as RSK rewards the miners with additional transaction fees, the incentive for merged mining becomes high.
  
 We have identified three phases for RSK merge-mining growth:

- bootstrapping phase: merge-mining is below 30% of Bitcoin hashrate.
- Stable phase: merge-mining is between 30% and 60% of Bitcoin hashrate.
- Mature phase: merge-mining is higher than 60% of Bitcoin hashrate.


RSK has left behind its bootstrapping phase, when rogue merge-miners could revert RSK blockchain at a low cost. As of January 2019, more than 40% of Bitcoin miners are engaged in RSK merge-mining. But as RSK fees remain low compared to Bitcoin block reward, the cost to attack RSK by a double-spent is lower than Bitcoin’s.
RSK has some properties to reduce the risk of double-spend attacks, such as long miner rewards maturity. Still RSK Lab research team has developed several protections to prevent attacks during the stable and mature phases of the project:
* ___Signed notifications:___ RSK clients can make use of signed notifications by notaries. Nodes can use these notifications to detect Sybil attacks and inform the user.
* ___Transparent double-spend trails:___ this is a method where all RSK merge-mining tags are augmented with additional information that can be used to detect selfish RSK forks that are public in the Bitcoin blockchain. Selfish-fork proofs are automatically constructed and these proofs are presented to the RSK nodes, which spread them over the network. The proofs force nodes to enter a “safe mode” where no transaction is advertised as confirmed. The safe mode prevents merchants and exchanges from accepting payments that could be double-spent. Once the proven selfish-fork is outpaced by the RSK mainchain in accumulated PoW, the network reverts to its normal state. This method is a deterrent for any RSK double-spent attempt (where the malicious miner still tries to collect Bitcoin rewards when mining the selfish fork).
Once the platform enters the maturity phase, we estimate the security of RSK will be enough to support the economy of worldwide financial inclusion.


Main features:


• DECOR+ consensus protocol
• One-day maturity for mining reward
• No loss of efficiency in Bitcoin mining expected from merge mining (for late mid-
state switching)
