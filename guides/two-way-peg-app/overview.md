---
title: "Overview | 2 way peg app Documentation"
description: "Welcome to the overview section of the 2 way peg app documentation."
tags: 2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, guide, setup, integrate, use
layout: rsk
---

In this section, we are going to learn about the 2 way peg app, [how it works](#how-it-works), its [features](#features), and the [benefits](#why-use-the-2-way-peg-app) of using the application.

The [2 way peg](https://2wp-app.rsk.co/) is a protocol that converts BTC to RBTC and vice versa. It is secured by the powpeg, which is a unique 2-way peg system that secures the locked bitcoins with the same Bitcoin hashrate that establishes consensus. See the history of the [Powpeg](/rsk/architecture/flyover).

The 2 way peg app is a web application that fosters the interaction between the bitcoin blockchain and the RSK network for easier exchange of BTC and RBTC. It provides a way to visualize the status of transactions, communicate with a user wallet (both hardware wallets and software wallets), while also providing the highest possible level of security for transactions.

> Note: The current version (v1.1.0) of the 2 way peg app does not support peg-outs.

## How it Works

The 2 way peg app uses a [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) and a [2 way peg api](https://github.com/rsksmart/2wp-api) as the backend, this API uses a [daemon](https://en.wikipedia.org/wiki/Daemon_(computing)) process, which is responsible for listening on blockchain transactions to update the state of peg-ins and in the future, the state of peg-outs, these state changes (tx hash, date change, last status) are stored in a mongodb database.

> Currently, the 2 way peg app is available on both [RSK Mainnet](https://2wp-app.rsk.co/) and [RSK Testnet](https://2wp-app.testnet.rsk.co/). 

The source code is available on github, and open source:
- [Front end](https://github.com/rsksmart/2wp-app)
- [Back end](https://github.com/rsksmart/2wp-api)

## Features

The 2 way peg app, has two primary features, they are:

- Peg-in: A conversion from BTC to RBTC. See [Glossary](/guides/two-way-peg-app/glossary/) section for more explanation. 
    - **Note: The peg-in process is final and cannot be reverted**.

- Peg-out: A conversion from RBTC to BTC. This current version of the 2 way peg app (v1.1.0) does not support the peg-out functionality.

## Why use the 2 way peg app?

The 2 way peg application has lots of benefits, these include:
 
**Simplified transactions**

The peg-in in its nature is a complex process and this app makes it simpler. Using the 2 way peg app enables you to choose where to receive the converted BTC, which is also possible without it, but with an even higher level of complexity than a legacy peg-in.

**Visualization of transactions**

Enables the visualization of the status of transactions on the RSK network

**Enables communication with a user wallet (hardware and software)**

The 2 way peg app communicates directly with the following services:
- Trezor: Directly via usb
- Ledger: Directly via usb and integrated with the manufacturer's application
- Liquality: Directly through the application provided by the company
- Nifty: Through the [rLogin](/rif/rlogin/) application
- Metamask: Through the rLogin application. Learn more about the [rLogin application](https://github.com/rsksmart/rLogin)

**Secure transactions**

All transactions need to be confirmed via the device used by the customer, whether a hardware or software wallet, all transaction information and the appropriate signatures are generated through integration with the wallets.

## Next

Be sure to check out our next article in this guide,
on [Getting Started with the 2 way peg app](/guides/two-way-peg-app/getting-started/)

----

## Resources
- 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
- 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
- How to get [RBTC using RSK’s built in Powpeg](https://developers.rsk.co/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
- [RSK Testnet Faucet](https://faucet.rsk.co/)
- [Get RBTC using Exchanges](https://developers.rsk.co/guides/get-crypto-on-rsk/rbtc-exchanges/)