---
menu_order: 1800
menu_title: Viewing Peg-out Transaction Status
title: "Viewing the status of a transaction after peg-out | 2 way peg app Documentation"
description: "Here, we will learn how to view  a transaction status after a peg-out."
tags: 2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, trezor, liquality, leger, guide, setup, integrate, use
layout: rsk
---

The processing of a pegout transaction is made up of several dependencies, and for each dependency a processing step is added, and at each step in the process, the pegout is shown in a form on the transaction status query screen.

After finish a pegout you can search for the current status in the [status page](https://app.2wp.rootstock.io/status)

**Not mined status:**
Just after finish a pegout transaction, this transaction is not mined in the Rootstock network yet, this status will be showed in the transaction status page:
![not-mined](/assets/img/guides/two-way-peg-app/using-hd-wallets/1-not-mined.png)

**Rejected status:**
A pegout transaction mined and not valid, will be showed in the transaction status page:
![rejected](/assets/img/guides/two-way-peg-app/using-hd-wallets/pegout-rejected.png)

**Received status:**
A pegout transaction mined and valid, will be showed in the transaction status page:
![mined](/assets/img/guides/two-way-peg-app/using-hd-wallets/2-mined.png)

**Waiting for confirmation status:**
A pegout transaction mined and valid, and waiting for confirmation, will be showed in the transaction status page:
![waiting-for-confirmation](/assets/img/guides/two-way-peg-app/using-hd-wallets/waiting-for-confirmation.png)

**Released status:**
A pegout transaction mined, valid, and with the btc transaction performed will be showed in the transaction status page:
![waiting-for-confirmation](/assets/img/guides/two-way-peg-app/using-hd-wallets/released.png)

**Operation summary:**
The operation summary contains the transaction details:
![mined](/assets/img/guides/two-way-peg-app/using-hd-wallets/operation-summary.png)

---
### Rootstock side

**Sender address:** Contains the address from which the RBTC was sent.

**Sent:** The amount in RBTC sent.

**Transaction hash:** The hash of the transaction in the Rootstock network.

--- 
### Bitcoin side

**Recipient:** The address where the BTC will be delivered.

**Will Receive:** The amount to be delivered in the BTC address discounted the network fee.

**Estimated fee:** The estimated network fee, if the BTC transaction is not finished yet, this label will be "Estimated", if the BTC transaction is sent to the BTC network the value presented will be the effective value and not the estimated.

----

## Resources
* 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
* 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
* How to get [RBTC using Rootstock’s built in Powpeg](/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
* [Rootstock Testnet Faucet](https://faucet.rootstock.io/)
* [Get RBTC using Exchanges](/guides/get-crypto-on-rsk/rbtc-exchanges/)
* [Design architecture](/guides/two-way-peg-app/advanced-operations/design-architecture/)