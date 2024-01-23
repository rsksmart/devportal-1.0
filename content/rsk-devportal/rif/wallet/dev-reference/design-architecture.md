---
menu_order: 700
menu_title: Architecture
title: RIF Wallet Design and Architecture
description: 'RIF Wallet is an open source smart contract wallet which enables businesses to create and deploy fully customizable on-chain wallets'
tags: rif-wallet, rif, rootstock, wallet, smart contracts
layout: rsk
---

The [RIF Wallet WebSocket](https://rif-wallet-services.testnet.rifcomputing.net/api-docs/) provides access to get all the updates (balances, transactions, events and prices) of a Smart Wallet. Features include: 
* Getting token balances, transactions and events of smart wallet
* Get prices of all tokens available on a network

![RIF Wallet Architecture](/assets/img/rif-wallet/rif-wallet-architecture-diagram-black-bg.png)

The RIF Wallet architecture follows a client-server architecture, the RIF Wallet is the client and the RIF Wallet Services is the server, which have two responsibilities:

1. Provide wallet historical data: 
The RIF Wallet Services exposes HTTP endpoints for tokens, events, transactions, prices and dApps. For a detailed review of the HTTP endpoints, see the API documentation. 
2. Provide wallet real time data:
To achieve this, RIF Wallet Services exposes a websocket to emit new events from the wallet such as, incoming and outgoing transactions, updated balances, updated prices. Both Profilers and Providers extend the EventEmitter class. 

> The following happens when a client subscribes to WebSocket:
> - A subscription is made indicating an address and chainId to receive new updates of this address in a specific Network (Tesnet or Mainnet)
> - Every subscription creates a new instance of a Profiler. 
The profiler is responsible for creating a Provider, getting data from the Provider and filtering it, to emit only new balances, transactions, prices.
> - Provider is polling every 10 seconds to Rootstock Explorer API to get wallet data and emit it.

Every time a profiler gets new updates, this is emitted to the WebSocket. 

> The following happens when a client unsubscribes to WebSocket:
> - Polling in Providers is stopped or removed except for Prices, since prices don't depend on one wallet. This means that we stop balance, transaction, token transfer and RBTC balance providers.
> - Note that to use the historical data in real time, we can use the [RIF Wallet Services library](/rif/wallet/dev-reference/rif-wallet-libs/) here all endpoints and websocket have been mapped.

## Transactions

![RIF Wallet Transaction Architecture](/assets/img/rif-wallet/rif-wallet-transactions-black-bg.png)

When we make a transaction using RIF Wallet, we are using RIF Relay smart contract to have the ability to pay fees with another token and not only with native cryptocurrency (RBTC).

**The following happens when we make a transfer:**
* We estimate the gas fee in the desired token.
* We invoke relayCall method from RelayHub smart contract, here we need to send a token address which we are going to pay the fee and the estimation obtained in previous step. 
* Then, this invokes the execute method from Smart Wallet smart contract.
* Then, this invokes a transfer method from ERC20 token smart contract to pay the fees and send the token to the recipient.

All these steps are encapsulated in the [RIF relay client sdk](https://github.com/rsksmart/rif-relay-client) library.