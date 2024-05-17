---
section_title: Adding Funds to RIF Rollup from Metamask
menu_title: Adding Funds to RIF Rollup from Metamask
layout: rsk
title: Adding Funds to RIF Rollup from Metamask
description: RIF Rollup is a trustless protocol for fast and scalable low-cost payments on Rootstock powered by zkRollup Technology.
tags: rif, aggregation, zkSync, rollup, rif-rollup, tutorials
---

In this tutorial, we will be depositing into a RIF Rollup wallet with MetaMask on RIF Rollup Testnet.

## Prerequisites

* A Metamask Wallet
* tRBTC / tRIF
* [RIF Rollup - Testnet](https://wallet.testnet.rollup.rif.technology/)

### Step 1: Connect Rootstock to Metamask

Go to [RIF Rollup - Testnet](https://wallet.testnet.rollup.rif.technology/) and connect your wallet using the connect wallet button.

**Select Network**

To connect your wallet to the RIF Rollup Testnet, select the "RSK Testnet" button at the top of Metamask.

<center><img src="/assets/img/rif-rollup/2-choose-network-testnet.png"  title="RIF Rollup - Select network" width="50%"/></center>

Select your preferred wallet and accept the confirmation.

<center><img src="/assets/img/rif-rollup/1-ug-select-wallet.png"  title="RIF Rollup - Select preferred wallet" width="50%"/></center>

### Get Test Tokens

To get test tokens, click on the receive button, visit: [https://faucet.rsk.co/](https://faucet.rsk.co/) and enter your wallet address and enter captcha or get tRIF token using the faucet: [https://faucet.rifos.org/](https://faucet.rifos.org/).

> Skip this step if you already have test tokens in your wallet.

2. Choose "Deposit"
Here, you can deposit tokens from your Rootstock Wallet to RIF Rollup Wallet.

<center><img src="/assets/img/rif-rollup/5-rif-rollup-deposit.png"  title="RIF Rollup - Deposit tokens" width="50%"/></center>

You can choose different methods for adding funds to your Rollup wallet including token minting or via the bridge (for this tutorial we will use the RIF Rollup Bridge).

Select your token by clicking on **RBTC** by the left hand side, enter an amount, and click on the "Deposit" button.

<center><img src="/assets/img/rif-rollup/5b-deposit-to-wallet.png"  title="RIF Rollup - Click Deposit" width="50%"/></center>

Accept the confirmation on your metamask wallet by clicking on confirm button.

<center><img src="/assets/img/rif-rollup/6-confirm-commit-tx.png"  title="RIF Rollup - Accept Confirmation" width="70%"/></center>

Wait for the transaction to be committed. Click on **OK**.

<center><img src="/assets/img/rif-rollup/7-successfully-tx-l1.png"  title="RIF Rollup - Deposit Successful" width="70%"/></center>

This is an L1 transaction (as you deposit funds from L1 to L2), and therefore the time for it to appear in a block depends on the fee that you set.

Your funds will appear on L2 only after your transaction is processed on L1 (If you have any difficulties, please check the [Rollup Explorer](https://explorer.testnet.rollup.rif.technology/) to monitor the transaction. See the section on [Viewing Transaction status](#transactions).

Your deposit is complete! The transaction has been initiated, and your funds will be visible in your Rollup wallet within ten confirmations of your L1 transaction. Click on the token, for e.g RBTC to see status of the transaction.

<center><img src="/assets/img/rif-rollup/8-view-token-tx-status.png"  title="RIF Rollup - Click token to view status" width="70%"/></center>

| Committed | Verified |
| -------- | -------- |
|   ![RIF Rollup Committed Tx](/assets/img/rif-rollup/9-tx-committed.png)|   ![RIF Rollup Verified Tx](/assets/img/rif-rollup/10-tx-verified.png)|

> Note: An estimated time of 30 secs - 3mins is required for the transaction to be verified, basically as much time as it takes for a block to be mined in L1, this is the slowest part and further transactions do not take this long. Additionally, you can hover over the checkmark to see the status or click on the Rootstock or Rollup icon besides the token amount to view the transaction status on the Rootstock (L1) or RIF Rollup (L2).
