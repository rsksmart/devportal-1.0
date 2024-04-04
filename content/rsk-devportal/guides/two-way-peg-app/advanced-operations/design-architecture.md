---
menu_order: 1300
menu_title: Design and Architecture
title: "Design and Architecture"
description: "Two way peg design and architecture."
tags: 2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, rootstock, testnet, mainnet, guide, setup, integrate, use
layout: rsk
---

The [2 way peg app](https://app.2wp.rootstock.io/) is a protocol to convert BTC to RBTC and vice versa. It is secured by the powpeg, which is a unique 2-way peg system that secures the locked bitcoins with the same Bitcoin hashrate that establishes consensus. See the history of the [Powpeg](/rsk/architecture/flyover).

In this section, we will cover the design and architecture used in building the 2 way peg application. It comprises of a [web interface](#high-level) built with Vue.js, a [backend application](#components) built with Node.js, and made to run via [containers](#containers).

## High level

The solution is a web interface, which integrates with a REST API, which in turn communicates with internal services such as the blockchain node and databases. In addition, a daemon/worker will be created that will be responsible for obtaining data from the blockchain and changing the status of the transaction.

This diagram shows the architecture of the 2 way peg app, a Customer (Person) refers to someone who owns BTC or RBTC who wishes to use the 2 way peg app to send a transaction.

![High level diagram - Customer](/assets/img/guides/two-way-peg-app/57-high-level-diagram.png)

## Components

The front-end application of the 2 way peg app is developed using Vue.js. The backend application is developed using Nodejs containing a restful API Service and a Daemon service. The API is responsible to serve the data to the front-end, and the Daemon service is responsible for listening for transactions on-chain and updates the database.

![Frontend Application - 2 way peg](/assets/img/guides/two-way-peg-app/58-frontend-application-diagram.png)

## Containers

All applications are available to run using [Docker](https://www.docker.com/) and are built using a Dockerfile. The front-end application will start a node environment with nginx to serve the Vuejs application, and the back-end will start nodejs and start the daemon and api listening by default on port `3000`.

![Containers Diagram](/assets/img/guides/two-way-peg-app/59-containers-diagram.png)

----

## Resources
* 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
* 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
* How to get [RBTC using Rootstock’s built in Powpeg](/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
* [Rootstock Testnet Faucet](https://faucet.rootstock.io/)
* [Get RBTC using Exchanges](/guides/get-crypto-on-rsk/rbtc-exchanges/)
* [Design architecture](/guides/two-way-peg-app/advanced-operations/design-architecture/)