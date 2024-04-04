---
menu_order: 200
menu_title: Overview
layout: rsk
title: RIF Rollup | Overview
description: RIF Rollup is a trustless protocol for fast and scalable low-cost payments on Rootstock powered by zkRollup Technology.
tags: rif, aggregation, zksync, rollup, rif-rollup
---

RIF Rollup is a trustless protocol for **fast and scalable low-cost** payments on Rootstock powered by zkRollup Technology.  It is a fork of the Zero Knowledge zkSync Lite (v1) developed by [Matter Labs](https://matter-labs.io/). Its current functionality and scope includes low gas transfers of RBTC and ERC20 tokens on the Rootstock network.

The RIF Rollup is a payment-only layer 2 scaling solution, and it can be used to support a wide variety of payment applications. It uses the [zk-SNARKs (Succinct Non-Interactive ARgument of Knowledge)](https://en.wikipedia.org/wiki/Non-interactive_zero-knowledge_proof) to prove the correctness of batches of transactions, and uses [on-chain data availability](/rif/rollup/glossary/) to keep users’ funds safe while maintaining the security of layer-1 (Rootstock).

## Features

Some features of the Rollup include;

* Users are always in control of their funds
* Extremely low transaction fees
* Trustless protocol 
* Funds are cryptographically secure, same as in the Rootstock mainnet
* No operational activity is required to keep the funds safe

## How it Works

Scaling solutions are methods to increase blockchain transaction processing capacity while reducing latency and transaction costs. Scalability, unfortunately, is often at odds with two other desirable properties: a blockchain's security and its level of decentralization. This tension between scalability, decentralization, and security even has a name - [The Blockchain Trilemma](https://www.ledger.com/academy/what-is-the-blockchain-trilemma). Also known as the Scalability Trilemma, which states that “no single blockchain can possess the three desirable components of an ideal blockchain: decentralization, security and scalability, according to the trilemma, a blockchain can only optimize two of these variables”. Generally, scaling solutions strive to achieve a balance between these properties. 

![RIF Rollup Blockchain Trilemma](/assets/img/rif-rollup/rif-rollup-how-it-works-trillemma.jpg)

zkSync Lite is a layer 2 (L2) scaling solution that uses Ethereum as L1. The research team at Rootstock ported the same solution to use Rootstock as L1. zkSync is based on [Zero-Knowledge Rollups](https://ethereum.org/en/developers/docs/scaling/layer-2-rollups/#zk-rollups). This means that all funds are held by a smart contract (the [Rollup Contract](https://github.com/rsksmart/ri-aggregation/blob/rsk_merge_master_Dec2021/contracts/contracts/ZkSync.sol)) on the main-chain, while computation and storage management (L2 state) are performed off-chain. 

![RIF Rollup Architecture](/assets/img/rif-rollup/rif-rollup-architecture.png)

A group of [L2](glossary) transactions are included in a Rollup block. Moreover, zkSync comes with on-chain Data Availability. This means that state changes associated with all L2 transactions are communicated to L1. This is done using a transaction [calldata](https://docs.soliditylang.org/en/latest/types.html?highlight=calldata#data-location). In case of some irrecoverable failure of the rollup system, data availability permits users to reconstruct the L2 state and recover locked assets from the rollup contract. For each Rollup block, a SNARK (a family of cryptographic proof systems) is generated to prove the validity of every single transaction in the Rollup block. Once the proof is generated it can be verified using the Rollup contract on L1. 

This architecture guarantees the following:
* The Rollup validator(s) can never corrupt the state nor steal funds
* Users can always retrieve the funds from the Rollup even if the validator(s) stop cooperating because the L2 state data is available (reconstructable).
* No need to be online to monitor Rollup blocks to prevent fraud, this is thanks to validity proofs.

## Capabilities

RIF Rollup provides users with the following capabilities:
* Users can become owners (i.e, controlling some assets in L2, thus having an account in L2) by depositing some assets from L1 to L2 or by receiving transfers from other owners.
* Owners can transfer assets to other accounts
* Owners can withdraw assets under their control to an L1 address of the owner’s choice
* Rollup operation requires the assistance of an Operator, who rolls transactions together, computes a zero-knowledge proof of the correct state transition, and affects the state transition by interacting with the rollup contract.