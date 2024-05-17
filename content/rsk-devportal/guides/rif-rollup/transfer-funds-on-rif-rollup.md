---
section_title: Transfer Funds on RIF Rollup
menu_title: Transfer Funds on RIF Rollup
layout: rsk
title: Transfer Funds on RIF Rollup
description: RIF Rollup is a trustless protocol for fast and scalable low-cost payments on Rootstock powered by zkRollup Technology.
tags: rif, aggregation, zkSync, rollup, rif-rollup, tutorials
---

In this tutorial, we’ll review how to transfer funds to another RIF Rollup account. Whether a Rootstock user has a RIF Rollup account or not, you can send them funds on RIF Rollup to the same address they have on Rootstock.

> Keep in mind these funds will be on Layer 2 (L2), so if you want to use these funds on Layer 1 (L1), you will need to [Send to Rootstock](withdraw-funds-rootstock).

1. Click on the token of choice
In this tutorial, we use RBTC, click on token.

<center><img src="/assets/img/rif-rollup/11-select-rbtc-token.png"  title="Click on Token" width="70%"/>
</center>

2. Click on “Transfer”

<center><img src="/assets/img/rif-rollup/12-transfer-l2.png"  title="Click on Transfer" width="70%"/>
</center>

3. Enter Details

Enter a RIF Rollup (L2) wallet address and amount to transfer, the second field shows the transaction fees required to make a transfer transaction, this is auto-generated and cannot be changed.

Note that on first interaction with the RIF Rollup Wallet dApp, you may need to provide another wallet address to be used for L2 transactions. See FAQ section.

<center><img src="/assets/img/rif-rollup/13-authorize-to-send-tx.png"  title="Authorize" width="70%"/>
</center>

3. Sign the Transaction

<center><img src="/assets/img/rif-rollup/14-sign-authorized-tx.png"  title="Sign the tx" width="70%"/>
</center>


If this is your first transaction after depositing or funding your rif rollup account, see the [Account Activation section](./account-activation)

Note: Before transacting, you can change the fee token. Users can pay transaction fees in all popular ERC-20 tokens since rif rollup supports "gasless meta-transactions” via RIF Relay.

4. Read the warning then click Proceed to Send on RIF Rollup

<center><img src="/assets/img/rif-rollup/16-read-warning.png"  title="Proceed to send on RIF Rollup" width="70%"/>
</center>

> Note: You may be asked to reconfirm the send fee since the price for RIF Rollup transactions fluctuates. Once confirmed, click on proceed to send on RIF Rollup. 

4. Sign the transaction

Signing this message submits the transaction to the rollup network.

<center><img src="/assets/img/rif-rollup/17-sign-l2-transfer-tx.png"  title="Sign Authorize Request" width="70%"/>
</center>

The transfer should take no longer than a couple of seconds (If you have any difficulties, please check [RIF Rollup explorer](https://explorer.testnet.rollup.rif.technology/) to monitor the transaction.

<center><img src="/assets/img/rif-rollup/18-transfer-l2-tx-successful.png"  title="Transfer to RIF Rollup" width="70%"/>
</center>

Your transfer is complete! The transaction has been initiated and the funds are ready for immediate use on the RIF Rollup Wallet.