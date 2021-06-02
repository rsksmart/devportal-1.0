---
layout: rsk
title: 'Merged Mining'
description: 'The guardian of RSK'
tags: armadillo, guard, security, dapp, guides, smart-contracts, web3, bitcoin, rsk, peer-to-peer, dapp-examples, blockchain
---

Merged mining is the process that allows RSK blockchain to be mined simultaneously with Bitcoin blockchain. 
This can be done because both chains use the same [proof-of-work (PoW)](https://en.wikipedia.org/wiki/Proof_of_work) algorithm, 
double SHA-256. 

## How it works

[Bitcoin mining pools](https://developers.rsk.co/rsk/architecture/mining/) include a reference to RSK’s block in every mining job they deliver to miners. 
Every time miners find a solution, 
it is compared to both networks’ difficulties (Bitcoin and RSK), 
delivering three possible outcomes:

- The solution satisfies Bitcoin [network difficulty](https://en.bitcoin.it/wiki/Difficulty). 
Hence, a block is assembled and sent to the network. 
RSK’s merged mining reference will be included in the latest output of the coinbase transaction on the Bitcoin network, 
but ignored by the Bitcoin network. 
Since RSK’s network difficulty is lower than Bitcoin, 
this solution will also work for RSK and can be submitted to the network.

![merged-mining](/assets/img/guides/armadillo/merged-mining.png)

- The Solution does not satisfy Bitcoin network difficulty, 
but satisfies RSK’s network difficulty. 
Consequently, the solution will be submitted to the RSK network, 
but not to the Bitcoin network.

- The solution only satisfies the pool difficulty, 
which is many times lower than Bitcoin or RSK network difficulty, 
and it is not submitted to any network.
The solution submitted to the network allows the node to build an [SPV proof](/guides/armadillo/glossary/#spv-proof). 
If the proof is valid, 
it is included as part of the block that will be sent to the network.

This reference to RSK’s block is called [RSKtag](/guides/armadillo/glossary/#rsktag/), 
which is a 32 bytes of hash of the RSK block.

Prior to Wasabi, RSKtag was the hash of the RSK block, 
this was not providing sufficient information to RSK. 
If some BTC block contains the RSKtag, 
may or may not be in the RSK mainchain. 
An issue occurs when the RSKtag cannot be found somewhere in the RSK mainchain, 
until then there was no way to figure out what had occurred. 
That is the justification for a new RSKtag structure.

### New tag for merged mining

Armadillo was created to take advantage of the [RSKIP110](https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP110.md). 

RSKIP introduces a new way to build the RSKtag used for merged mining. 
This new structure allows RSK to understand in-depth the health of the network, 
recognizing if miners are mining on the same chain and detect if a parallel selfish blockchain is being created, 
all of this with some probability. 

![merged-mining-tag](/assets/img/guides/armadillo/merged-mining-tag.png)

The new tag is divided in 4 fields:
1. **Prefix Hash**: Prefix RSK block hash
2. **CPV**: Commit to parent vector
3. **NU**: Number of Uncles
4. **NB**: RSK block number

### Prefix Hash

Is a 20-bytes prefix for the RSK block hash. 
20 bytes is more than enough to identify the RSK block in terms of a probable collision.

![prefix-hash](/assets/img/guides/armadillo/prefix-hash.png)

### Commit to Parent Vector (CPV)

Is a 7 bytes field where each byte represents the link to a block in the RSK mainchain in the last 448 blocks from the block to consider. 
Each byte consists of the least significant byte of the Bitcoin Block ID field of the last 7 RSK blocks, 
spaced 64 blocks between each of them. 
Hence, ranges of 64 blocks will have the same CPV.  
This creates a sequence of checkpoints to past blocks. 
The data representation of the Commit to Parent Vector (CPV). 
The CPV helps to understand if the RSKtag found in every subsequent BTC block follows the mainchain path or not. 
If there is a mismatch in the CPV bytes it means there is an ongoing fork which could end in a double-spend attack.

Hence, ranges of 64 blocks will have the same CPV.  
This creates a sequence of checkpoints to past blocks. 
The data representation of the Commit to Parent Vector (CPV). 
The CPV helps to understand if the RSKtag found in every subsequent BTC block follows the mainchain path or not. 
If there is a mismatch in the CPV bytes it means there is an ongoing fork which could end in a double-spend attack.

Let’s go over an example: 

Supposing we have to calculate the CPV field for a RSK block at height 5000 (BN = 5000). 
Then every byte in the 7 CPV array will be formed with a Least Significant Byte of the Bitcoin block ID (LSB) positioned at RSK height, 
calculated for the formula  **⎣(BN -1 ) 64⎦ 64 -64\*i**, where i is the position of each byte in the array (0 ⋜ i < 7). 
Then the CPV will be using the least significant byte for the Bitcoin Block ID at the RSK heights (4992 4928 4864 4800 4736 4672 4608). 
For simplicity we use 00, 11, 22, 33, 44, 55, 66  as LSB. 
Then the CPV in hex will be 00112233445566. 
Then, let’s see the difference between an honest miner which follows the RSK mainchain path, 
and a dishonest miner which follows its own path and differs from the mainchain CPV.

![honest miner](/assets/img/guides/armadillo/honest-miner.png)

![dishonest miner](/assets/img/guides/armadillo/dishonest-miner.png)

## Number of Uncles (NU)

This field represents the number of uncles in the last 32 blocks. 
Each block can reference a maximum of 10 uncles (TU), 
so 32 blocks can reference up to 320 uncles. However, 
since the space used by the NU field is only 1 byte, 
the number of uncles is capped to 255. 
A high number of uncles would indicate either an exceptionally abnormal situation of the network or an attack.

![number of uncles](/assets/img/guides/armadillo/number-of-uncles.png)

![number of uncles 2](/assets/img/guides/armadillo/nu-2.png)

## Block Number

Block number is the height of the RSK block being merge mined. 
With this information we can know if a mining pool is merged mining the best block correctly, 
or if it is delayed,has a consensus split, etc.

![Block Number](/assets/img/guides/armadillo/block-number.png)

