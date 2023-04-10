---
menu_order: 1100
section_title: Aggregation
menu_title: Overview
layout: rsk
title: RIF Aggregation
description: RIF Aggregation overview
tags: rif, aggregation, zksync
---


The objective of this project is to provide the Rootstock (RSK) community with a scaling solution based on [Zero-Knowledge Rollups](https://ethereum.org/en/developers/docs/scaling/layer-2-rollups/#zk-rollups).

## Abstract

The current version of RIF Aggregation is a port of [zkSync](https://docs.zksync.io/dev/), a layer 2 (L2) scaling solution developed by Matter Labs that uses Ethereum as L1.
ZkSync increases scalability by holding all funds on L1 ([Rollup Contract](https://github.com/rsksmart/ri-aggregation/blob/rsk_merge_master_Dec2021/contracts/contracts/ZkSync.sol)) and performing computation and storage management off-chain (L2).
Furthermore, the state changes associated with all L2 transactions are stored on L1 using transaction [calldata](https://docs.soliditylang.org/en/latest/types.html?highlight=calldata#data-location), hence guaranteeing on-chain data availability: in case of L2 failures, users can reconstruct the L2 state and recover locked assets. For each Rollup block, a proof (SNARK proof) is generated and verified on L1.

The architecture provides the following guarantees:

* The Rollup validator(s) can never corrupt the state nor steal funds
* Users can always retrieve the funds from the Rollup even if the validator(s) stop cooperating because the L2 state data is available (reconstructable).
* Thanks to validity proofs, there is no need to be online to monitor Rollup blocks to prevent fraud.



<div class="container the-stack">
  <div class="row rif_blue_text">
    <div class="col">
      <div class="rns-index-box">
        <a href="learn">Learn</a>
        <br />
        <br />
        <p>Learn more about the RIF Aggregation architecture</p>
      </div>
    </div>
    <div class="col">
      <div class="rns-index-box">
        <a href="dapps">Dapps</a>
        <br />
        <br />
        <p>Take a look at the dapps currently available on Rootstock (RSK)</p>
      </div>
    </div>
  </div>
  <div class="row rif_blue_text">
    <div class="col">
      <div class="rns-index-box">
        <a href="https://docs.zksync.io/api/" rel="noopener noreferrer" >SDKs</a>
        <br />
        <br />
        <p>Use one of the SDKs available or the APIs to create your zk-based dapp</p>
      </div>
    </div>
    <div class="col">
      <div class="rns-index-box">
        <a href="walkthrough">Walk-through</a>
        <br />
        <br />
        <p>A step-by-step guide to create your zk-based dapp</p>
      </div>
    </div>
  </div>
</div>
