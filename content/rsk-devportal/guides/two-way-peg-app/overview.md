---
menu_order: 200
menu_title: Overview
title: "Overview"
description: "Welcome to the overview section of the 2 way peg app documentation."
tags: 2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, rootstock, testnet, mainnet, guide, setup, integrate, use
layout: rsk
---

In this section, we are going to learn about the 2 way peg app, [how it works](#how-it-works), its [features](#features), and the [benefits](#why-use-the-2-way-peg-app) of using the application.

> To get started, see the [prerequisites](/guides/two-way-peg-app/prerequisites/) section.

The [2 way peg](https://app.2wp.rootstock.io/) is a protocol that converts BTC to RBTC and vice versa. It is secured by the powpeg, which is a unique 2-way peg system that secures the locked bitcoins with the same Bitcoin hashrate that establishes consensus. See the history of the [Powpeg](/rsk/architecture/powpeg/).

The 2 way peg app is a web application that fosters the interaction between the bitcoin blockchain and the Rootstock network for easier exchange of BTC and RBTC. It provides a way to visualize the status of transactions, communicate with a user wallet (both hardware wallets and software wallets), while also providing the highest possible level of security for transactions.

## How it Works

The 2 way peg app uses a [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) and a [2 way peg api](https://github.com/rsksmart/2wp-api) as the backend, this API uses a [daemon](https://en.wikipedia.org/wiki/Daemon_(computing)) process, which is responsible for listening on blockchain transactions to update the state of peg-ins and in the future, the state of peg-outs, these state changes (tx hash, date change, last status) are stored in a mongodb database.

> Currently, the 2 way peg app is available on both [Rootstock Mainnet](https://app.2wp.rootstock.io/) and [Rootstock Testnet](https://app.2wp.testnet.rootstock.io/). 

The source code is available on github, and open source:
- [Front end](https://github.com/rsksmart/2wp-app)
- [Back end](https://github.com/rsksmart/2wp-api)

## Features

The 2 way peg app, has two primary features, they are:

- Peg-in: A conversion from BTC to RBTC. See [Glossary](/guides/two-way-peg-app/glossary/) page for more explanation. 
    - **Note: The peg-in process is final and cannot be reverted**.

- Peg-out: A conversion from RBTC to BTC. This current version of the 2 way peg app. See [pegout](/guides/two-way-peg/pegout/index/) for more explanation.

## Why use the 2 way peg app?

The 2 way peg application has lots of benefits, these include:
 
**Simplified transactions**

The two way peg (peg-in and pegout) are its nature is a complex process and this app makes it simpler. Using the 2 way peg app enables you to choose where to receive the converted BTC / RBTC, which is also possible without it, but with an even higher level of complexity than a legacy peg-in and peg-out.


**Visualization of transactions**

Enables the visualization of the status of transactions on the Rootstock network

**Enables communication with a user wallet (hardware and software)**

The 2 way peg app communicates directly with the following services:
- Trezor: Directly via usb
- Ledger: Directly via usb and integrated with the manufacturer's application
- Liquality: Directly through the application provided by the company
- Metamask: Through the rLogin application. Learn more about the [rLogin application](https://github.com/rsksmart/rLogin)

**Secure transactions**

All transactions need to be confirmed via the device used by the customer, whether a hardware or software wallet, all transaction information and the appropriate signatures are generated through integration with the wallets.

----

## Next

* Convert [BTC to RBTC using the 2 way peg app](/guides/two-way-peg-app/pegin/).
* Convert [RBTC to BTC using the 2 way peg app](/guides/two-way-peg-app/pegout/).
* View [Advanced Operations](/guides/two-way-peg-app/advanced-operations/)

----

## Resources
* 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
* 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
* How to get [RBTC using Rootstock’s built in Powpeg](https://developers.rootstock.io/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
* [Rootstock Testnet Faucet](https://faucet.rootstock.io/)
* [Get RBTC using Exchanges](https://developers.rootstock.io/guides/get-crypto-on-rsk/rbtc-exchanges/)
* [Design architecture](/guides/two-way-peg-app/advanced-operations/design-architecture/)