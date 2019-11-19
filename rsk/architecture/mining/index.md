---
layout: rsk
title: Merged Mining
---

Merged mining is the process that allows RSK blockchain to be mined simultaneously with Bitcoin blockchain. This can be done because both chains use the same PoW algorithm (double SHA-256).

## How it works

Bitcoin mining pools include a reference to RSK's block in every mining job they deliver to miners. 
Everytime miners find a solution, it is compared to both networks difficulties (Bitcoin and RSK) delivering three possible outcomes:
- Solution satisfies Bitcoin network difficulty. Hence, a block is assembled and sent to the network. RSK's merged mining reference will be included and ignored by Bitcoin network. Since RSK's network difficulty is lower than Bitcoin, this solution will also work for RSK and can be submitted to the network.
- Solution does not satisfy Bitcoin network difficulty, but does satisfy RSK network difficulty. As a consequence, solution will be submitted to RSK network and not to Bitcoin network.
- Solution only satisfies pool difficulty, which is many times lower than Bitcoin or RSK network difficulty, and it is not submitted to any network.

Solution submitted to RSK allows the node to build an SPV proof. If the proof is valid, it is included as part of the block that will be sent to the network.

## What are the benefits?

Miners earn a high percentage of transaction fees from the RSK block they mine. This mining process is done with the same hashing power used in Bitcoin mining, and has no additional cost or impact.

## What is the current RSK network's hashing power?

You can see RSK network hashing power in our [Stats Website](https://stats.rsk.co).

## Implementation details for mining software pools

Check our [implementation guide](/rsk/architecture/mining/implementation-guide).

## References:

- [Merged-mining](/rsk/architecture/mining/reference)
- [REMASC](/rsk/architecture/mining/remasc)
- [Implementation guide](/rsk/architecture/mining/implementation-guide)
