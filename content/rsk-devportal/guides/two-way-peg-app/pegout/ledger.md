---
menu_order: 1400
menu_title: Peg-out using Ledger
title: "Performing a peg-out using Ledger Hardware Wallet | 2 way peg app Documentation"
description: "Here, we will learn how to perform a peg-out using Ledger Hardware Wallet."
tags: 2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, trezor, liquality, leger, guide, setup, integrate, use
layout: rsk
---

![2 way peg app (peg-out)](/assets/img/guides/two-way-peg-app/pegout.gif)

## Performing a peg-out transaction using rLogin(Trezor and Ledger)

​> - Note that we will be using the 2 way peg app on [2 way peg app - Testnet](https://app.2wp.testnet.rootstock.io/) for learning purposes.
> - For transactions using **real tokens**, use the [2 way peg app - Mainnet](https://app.2wp.rootstock.io/) application.
> - We're using Ledger Nano and Trezor One hardware wallets on this tutorial.
> - For how to perform a peg-in transaction using hardware wallets. See [Getting started using hardware wallets](/guides/two-way-peg-app/getting-started#using-hardware-wallets).
> - To use Ledger hardware wallet to create a **peg-in** see [How to perform a peg-in transaction using Ledger](/guides/two-way-peg-app/getting-started#performing-a-peg-in-transaction-with-ledger)
> - To use Trezor hardware wallet to create a **peg-in** see [How to perform a peg-in transaction using Ledger](/guides/two-way-peg-app/getting-started#trezor-hardware-wallet)


### Get started with Ledger

To perform a peg-out transaction using the Ledger device directly, follow the steps below:

Step 1:  Plug the Ledger device into the computer

Step 2: Enter your pin to unlock it

Step 3: On the device, navigate to the TRSK or RSK Test app on your Ledger device
​
Step 4: Access **peg-out** screen:
![pegout screen](/assets/img/guides/two-way-peg-app/using-hd-wallets/acessing-pegout-screen.png)

Step 5: Click on **Connect wallet** button
![connect-wallet](/assets/img/guides/two-way-peg-app/using-hd-wallets/connect-wallet.png)

Step 6: Click on **Ledger** button <br/>
![connect-wallet](/assets/img/guides/two-way-peg-app/using-hd-wallets/ledger.png)


Step 8: The application will show what network you are connecting on. For this tutorial we are using **Testnet**
![network](/assets/img/guides/two-way-peg-app/using-hd-wallets/network.png)

Step 9: The application will show a simple tutorial:
![1-plug](/assets/img/guides/two-way-peg-app/using-hd-wallets/1-plug.png)
![2-install](/assets/img/guides/two-way-peg-app/using-hd-wallets/2-install.png)
![3-close](/assets/img/guides/two-way-peg-app/using-hd-wallets/3-close.png)
![4-open](/assets/img/guides/two-way-peg-app/using-hd-wallets/4-open.png)
![5-confirm](/assets/img/guides/two-way-peg-app/using-hd-wallets/5-confirm.png)

Step 10: Click on the **Finish tutorial and connect** button: <br/>
![6-finish](/assets/img/guides/two-way-peg-app/using-hd-wallets/6-finish.png)

Step 11: Select an account <br/>
![7-select](/assets/img/guides/two-way-peg-app/using-hd-wallets/select.png)

Step 12: Ledger Connected <br/>
![8-connected](/assets/img/guides/two-way-peg-app/using-hd-wallets/ledger-connected.png)
<br/>
Step 13: Continue filling in the other fields as amount and click on the Send button

Step 14: After finish the pegout transaction creation, click here to see how to see the steps to access to Bitcoin derived address in hardware wallet using [Electrum](/guides/two-way-peg-app/advanced-operations/#electrum-hardware-wallets)

----

## Next

* See [Performing a peg-out transaction using Ledger and Liquality](/guides/two-way-peg-app/pegout/ledger-liquality/)


----

## Resources
* 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
* 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
* How to get [RBTC using Rootstock’s built in Powpeg](/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
* [Rootstock Testnet Faucet](https://faucet.rootstock.io/)
* [Get RBTC using Exchanges](/guides/get-crypto-on-rsk/rbtc-exchanges/)
* [Design architecture](/guides/two-way-peg-app/advanced-operations/design-architecture/)