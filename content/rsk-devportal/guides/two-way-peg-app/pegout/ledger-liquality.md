---
menu_order: 1300
menu_title: Peg-out using Liquality and Ledger
title: "Performing a peg-out using Liquality and Ledger"
description: "Here, we will learn how to perform a peg-out using Liquality and Ledger."
tags: 2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, trezor, liquality, leger, guide, setup, integrate, use
layout: rsk
---


![2 way peg app (peg-out)](/assets/img/guides/two-way-peg-app/pegout.gif)

## Performing a peg-out transaction using Ledger and Liquality

The [Liquality Wallet](/solutions/liquality/) is a browser extension for accessing Bitcoin, Rootstock, and Ethereum applications. 

We will perform a peg-out transaction using the Ledger Hardware Wallet and Liquality.

> See [How to perform a peg-in transaction using Ledger](/guides/two-way-peg-app/pegin/ledger/)

### Get started

To perform a peg-out transaction using the Ledger device with Liquality, follow the steps below:

Step 1:  Plug the Ledger device into the computer

Step 2: Enter your pin to unlock it. See step 2 in [pegout transaction using Liquality](#performing-a-peg-out-transaction-using-liquality) for how to unlock your device.

Step 3: On the device, navigate to the TSK or RSK Test app on your Ledger device.

Step 4: Open Liquality and select Ledger option

![Select Ledger Option](/assets/img/guides/two-way-peg-app/liquality/ledger-steps/1-ledger-steps.png)


Step 5: Choose the "RSK asset" and click on the "Connect" button

![Connect Ledger](/assets/img/guides/two-way-peg-app/liquality/ledger-steps/2-ledger-steps.png)


Step 6: Choose the account that you want to use with Liquality

![Choose account](/assets/img/guides/two-way-peg-app/liquality/ledger-steps/3-ledger-steps.png)


Step 7: Click the "Close this Tab" button

![Close tab](/assets/img/guides/two-way-peg-app/liquality/ledger-steps/4-ledger-steps.png)

Now you can see "Ledger" label in Liquality accounts

![Final screen](/assets/img/guides/two-way-peg-app/liquality/ledger-steps/5-ledger-steps.png)

----

## Next
* See [Performing a peg-out transaction using Trezor and Ledger](/guides/two-way-peg-app/pegout/trezor/)

----

## Resources
* 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
* 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
* How to get [RBTC using Rootstock’s built in Powpeg](/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
* [Rootstock Testnet Faucet](https://faucet.rootstock.io/)
* [Get RBTC using Exchanges](/guides/get-crypto-on-rsk/rbtc-exchanges/)
* [Design architecture](/guides/two-way-peg-app/advanced-operations/design-architecture/)