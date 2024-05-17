---
menu_title: Glossary
layout: rsk
title: 'Armadillo - Glossary'
description: 'The guardian of RSK'
tags: armadillo, guard, security, guides, bitcoin, rsk, peer-to-peer, merged-mining, blockchain
---

## Explanation of Key Terms

### Armadillo

Meaning “armoured one” in [Spanish](https://en.wikipedia.org/wiki/Armadillo).
Armadillo is a suite of tools that includes a monitor that controls the bitcoin and RSK networks checking that the merged mining algorithm works as expected.

### Best Block

Latest block mined of a blockchain.

### Block

The [blockchain](https://en.wikipedia.org/wiki/Blockchain) is made up of blocks,
a block contains a cryptographic hash of the previous block,
a timestamp, and transaction data (generally represented as a Merkle tree).

### Coinbase

"Coinbase" is another name for a generation transaction.
The input of such a transaction contains some arbitrary data where the scriptSig would go in normal transactions -- this data is sometimes called the "coinbase", as well.

### Double-spend

Attempting to spend coins that have already been spent in another transaction

### Powpeg

A PowPeg is a multi-signature management system where participants’ nodes have no direct access or control over private keys.
Keys are controlled by tamper-proof HSMs.
These HSMs internally run lightweight RSK nodes which obey commands originating from an RSK smart-contract called the Bridge that orchestrate peg-outs.
Only when such commands are confirmed by thousands of blocks produced by the mining network does the HSM proceed to sign peg-out requests.
The PowPeg is a new security protection layered on top of the previous federation.
It is unique in the crypto ecosystem and radically reduces the attack surface for the most frequent security breaches.
The RSK community has collectively decided on a strategy for increasing the security of the peg based on defence-in-depth: Adding more security layers on top of existing ones,
protecting the system from the failure of any of them.
The ultimate goal is the complete decentralisation of the peg.
Refer to the [Security Model](https://developers.rsk.co/rsk/architecture/security/) for the details around the security model of the 2-way peg.
**The conditions to become a pegnatory (PowPeg  signatory) have been established, including security policies, backup procedures and legal requirements**.

### Fork

Go to [What is a fork](/guides/armadillo/network-under-attack/#what-is-a-fork/)?

### Hashing Power

Mining hashrate is a key security metric.
The more hashing (computing) power in the network,
the greater its security and its overall resistance to attack.
Although Bitcoin’s exact hashing power is unknown,
it is possible to estimate it from the number of blocks being mined and the current block difficulty.

### Mainchain

The valid blockchain

### RSKtag

This is a reference to RSK’s block,
which is a 32 bytes of hash of the RSK block.

### SPV Proof

Simple Payment Verification, usually abbreviated to SPV,
is a system outlined in the original Bitcoin Whitepaper that enables light clients (wallets running on low-end systems) to verify that a transaction has been included in Bitcoin and therefore a payment has been made.

### Wasabi

Version 1.x of the rskj node.

### Witness Bitcoin Block

Is a BTC block which contains a RSKtag in the coinbase information.
