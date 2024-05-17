---
section_title: Withdraw Funds to Rootstock
menu_title:  Withdraw Funds to Rootstock
layout: rsk
title:  Withdraw Funds to Rootstock
description: RIF Rollup is a trustless protocol for fast and scalable low-cost payments on Rootstock powered by zkRollup Technology.
tags: rif, aggregation, zkSync, rollup, rif-rollup, tutorials
---

This tutorial covers the process of withdrawing funds from RIF Rollup (L2) back to the Rootstock main chain (L1).

We will;

* Withdraw funds to Rootstock
* [Use two-step withdrawal method](#two-step-withdrawals)

**Moving funds to an exchange:** If you want to move your funds from Rollup to an exchange, these steps follow the correct method. Alternatively, you can take a risk and enter the exchange address when you withdraw, but most exchanges do not observe smart contract transfers, which may require you to contact their customer support to see your funds on the exchange.

1. Click on "Withdraw"

<center><img src="/assets/img/rif-rollup/19-withdraw-to-l1.png"  title="Withdraw to layer one" width="70%"/>
</center>

2. Enter Address and Withdraw Amount

Note: If you enter a different address for withdrawal, please check that it accepts smart contract transfers. See [FAQ: How to know if an address accepts smart contract transfers]().

<center><img src="/assets/img/rif-rollup/20-send-on-rootstock.png"  title="Click to Withdraw to layer one" width="70%"/>
</center>

Now, click on the “Send to Rootstock” button.

If this is your first transaction after depositing or funding your rif rollup account, see the [Account Activation section](account-activation).

3. Read pop-up carefully to avoid loss of funds
Click on the I understand button

<center><img src="/assets/img/rif-rollup/21-read-warning-popup.png"  title="Read warning" width="70%"/>
</center>

4. Accept fee changes

<center><img src="/assets/img/rif-rollup/22-accept-fee-changes.png"  title="Accept fee changes" width="70%"/>
</center>

5. Confirm the withdrawal amount, address, fee, and sign the message.

<center><img src="/assets/img/rif-rollup/23-sign-tx-request.png"  title="Sign withdraw request" width="70%"/>
</center>

Your withdrawal has been initiated. There will be an immediate change in your account balance in Rollup, but withdrawal times can take from 30 minutes to 7 hours before being available on Rootstock (L1).

<center><img src="/assets/img/rif-rollup/24-withdraw-to-rootstock.png"  title="withdraw request successful" width="70%"/>
</center>

Note: When network activity increases, blocks fill up faster, and withdrawal times decrease.

## Two-step withdrawals

If the rollup server config “two steps withdrawals(security measure)” is enabled, see how to enable this on an extra step is required for the withdrawal process to reach the end user L1 account. The wallet UI reacts to this configuration by showing an extra tab called **WITHDRAWALS**.

<center><img src="/assets/img/rif-rollup/two-step-withdraw.png"  title="two step withdrawal" width="70%"/></center>

So once the steps in the section above are finished that that tx is set as “confirmed”

<center><img src="/assets/img/rif-rollup/withdraw-history.png"  title="two step withdrawal history" width="70%"/></center>

Your “withdraw balance” will show up in Withdrawals section as shown below: 

<center><img src="/assets/img/rif-rollup/withdrawal-balance.png"  title="two step withdrawal balance" width="70%"/></center>

Tap withdraw, follow the instructions, sign the L1 tx. And that makes it effective after the L1 tx gets mined. The user should be able to verify that that balance has been transferred to their L1 account. 
