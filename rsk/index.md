---
layout: rsk
title: RSK Blockchain
---

## RSK Technology & Security Model Overview

#### __RSK platform is, at its core, the combination of:__
* __A Turing-complete resource-accounted deterministic virtual machine (for smart contracts)__
* __A two-way pegged Bitcoin Sidechain (for BTC denominated exchange) based on a Federation secured with custom Hardware Security Modules (HSM's). Once the drivechain protocol becomes implemented on Bitcoin, there are plans to move to a hybrid- drivechain mechanism)__
* __A selfish-mining resistant merge-mining-based consensus protocol__
* __A low-latency block-propagation network (for fast payments)__

#### [Turing-Complete Virtual Machine (RVM)](/GettingStarted/RSK/Turing-Complete)

The RSK Virtual Machine (RVM) is compatible with the Ethereum Virtual Machine (EVM) at the op-code level, allowing Ethereum contracts to run flawlessly on the RSK blockchain.

There are numerous performance improvements documented and being developed known as RSK Improvement Proposals (RSKIP's), created by the RSK team and community.

#### [Security Model： Sidechains & Federation](/GettingStarted/RSK/Security-Model)

A sidechain is an independent blockchain whose native currency is pegged to the value of currency of another mutually independent blockchain automatically using proofs of payment. A two-way pegged sidechain provides proofs that will allow anyone monitoring the main blockchain and the sidechain to verify when currency value is pegged, and additionally provides users who possess the appropriate private keys that control currency on either blockchain to peg (lock) currency on one chain, and release (unlock) currency value on the other, and vice versa. 

In RSK, the Smart Bitcoin (RBTC) on the RSK blockchain is Two-way pegged to BTC on the Bitcoin blockchain.

As of January 2019, the RSK Federation comprises 15 well-known, and highly-secure notaries. Leading Blockchain companies currently integrate the RSK Federation and participate in an autonomous protocol to securely lock Bitcoins. 

#### [Merged Mining](/GettingStarted/RSK/Merged-Mining)

Merge mining is a mechanism that allows Bitcoin miners to mine other cryptocurrencies simultaneously with nearly zero marginal cost. The same mining infrastructure, hardware and software they use to mine Bitcoins is used with almost no additional overhead to mine the RSK sidechain simultaneously. This is done by creating a unique output whenever the miner discovers a new Bitcoin block and broadcasts that to the bitcoin network. This means that the miners are rewarded with the additional transaction fees on the RSK sidechain, and as transactions increase on the RSK blockchain, the incentive for merged mining becomes increases.

#### [Fast Payments and Low-Latency-Network](/GettingStarted/RSK/Fast-Payments)

RSK aims to provide a much better on-chain payment network compared to Bitcoin.

#### [Transaction Privacy](/GettingStarted/RSK/Transaction-Privacy)

RSK does not provide better transaction privacy by itself than Bitcoin, and relies on pseudonyms for accounts. Nevertheless, the VM of RSK is Turing-complete, so anonymization technologies such as CoinJoin, ring Signatures, zkSNARKS and similar privacy mechanisms can be implemented securely without third-party trust.

#### [Scalability](/GettingStarted/RSK/Scalability)

RSK can scale far beyond Bitcoin in its current state. For example, an RSK payment requires a fifth of the size of a standard Bitcoin payment. Using RSK's proposed LTCP protocol, transaction size can be reduced to 1/50th of a Bitcoin transaction size, immediately providing substantial increase in transaction volume capability. Additionally, there are community proposals (RSKIPs) to enable user-selectable signature schemes: ECDSA, Schnorr and Ed25519. Because Ed25519 is more performant than Bitcoin ECDSA curve, using this scheme may lead to even more capacity.