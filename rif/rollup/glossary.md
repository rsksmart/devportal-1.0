---
menu_order: 500
menu_title: Glossary
layout: rsk
title: RIF Rollup Documentation | Glossary
description: RIF Rollup Terms and Meaning
tags: rif, aggregation, zksync, rollup, glossary, rif-rollup
---

Here is a list of terms used throughout the documentation and their meaning.

* **L1:** A layer-1 blockchain (Rootstock)
* **Rollup:** Layer-2 blockchain (zkSync)
* **Owner:** A user who controls some assets in L2.
* **Operator:** The entity operating the Rollup.
* **Eventually:** Happening within finite time.
* **Assets in rollup:** Assets in L2 smart contract controlled by owners.
* **Rollup key:** Owner's private key used to control deposited assets.
* **Rollup block:** Rollup block refers to a data batch of multiple user transactions that is processed off-chain and then a single proof of its validity is submitted to the RSK blockchain
* **Rescue signature:** The result of signing the owner's message, using his private key, used in Rollup internal transactions.
* **Fee Token:** A fee token is a listed token with a liquid market volume.
* **ZKP:** Zero-knowledge proof
* **Transaction:** What users can submit to the operator directly.
* **Priority operation:** What users can submit to the zkSync smart contract.
* **Rollup operation:** Part of the rollup block representing Transaction or Priority operation.
* **Onchain operation:** What the operator can put into the rollup block pubdata (operation pubdata).
* **Node implementation:** Node model that describes an operation.
* **Circuit implementation:** Circuit model that describes the operation and its witness.
* **Chunk:** The dimension of the operation. Each chunk has its own part of the public data (10 bytes) given through witnesses.
* **Significant bytes:** How many bytes, of all bytes occupied by the operation, are significant (including operation number).
* **Hash:** The result of SHA-256 function with operation's pubdata as input. Used for operation identification.
* **zk-SNARKs:** Succinct Non-Interactive ARgument of Knowledge
* **on-chain Data Availability:** After processing transactions off-chain, RIF Rollup generates a cryptographic proof, known as a zkRollup, which summarizes all the transaction data. This zkRollup proof is then committed to the Rootstock blockchain. This commitment contains a cryptographic hash that represents the zkSync state changes without revealing the transaction details themselves. This guarantees that anyone can verify that the transactions were processed correctly.