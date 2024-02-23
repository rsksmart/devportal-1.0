---
menu_order: 400
menu_title: Interact with the wallet
title: Interact with the RIF wallet
description: 'RIF Wallet is an open source smart contract wallet which enables businesses to create and deploy fully customizable on-chain wallets'
tags: rif-wallet, rif, rootstock, wallet, smart contracts
layout: rsk
---

The [RIF Wallet](https://github.com/rsksmart/rif-wallet) uses the [RIF Relay Server](https://github.com/rsksmart/rif-relay-server) to send transactions on behalf of the user. The user creates a transaction in the app, signs it, and then passes it to the RIF Relay Server to get a cost estimation. That estimation is returned to the user, and the user signs an updated transaction with that cost and passes it to the Relay Server.

The server takes the fee as payment for the transaction and broadcasts the transaction to the network paying the gas fee.

In the case that the the RIF Relay Server no longer exists or is not providing the service correctly, the users still have full access to their private key and funds. In the smart wallet contract there is a method called `directExecute` which allows a user to send transactions directly to the smart contract. In this scenario, the Externally Owned Account (EOA) can execute transactions directly on the smart contract while paying for the gas in rBTC.

## Interacting with the wallet without the Relay Server

Use the [Sample Script](https://github.com/rsksmart/rif-wallet/tree/develop/docs/recovery). The script in `main.js` is a sample example of how to interact with the user's smart contract without the use of RIF Relay. The user's `smartwallet` includes a function called `directExecute` that allows the user to execute any transaction directly on the smartwallet and pay the gas fee from their EOA wallet.



