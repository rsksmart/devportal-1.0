---
menu_title: Dapp Guide
layout: rsk
title: Token Bridge DApp Guide - Cross-Chain Transactions | Rootstock (RSK)
tags: erc20, bridge, defi, decentralized, token-bridge, tokens, quick-start, testnet, networks, dapps, tools, rsk, ethereum, smart-contracts, guides, tutorial, install, get-started, how-to
---

This Decentralized Application helps you to interact with the Token Bridge contracts, to safely cross your tokens between RSK and Ethereum networks. It is available at [tokenbridge.rsk.co](https://tokenbridge.rsk.co/) for mainnet or [testnet.tokenbridge.rsk.co](https://testnet.tokenbridge.rsk.co/) for testnet.

## Description

This guide describes the steps to transfer tokens using the Web Interface for the Rootstock Token Bridge system. Please refer to the project documentation if you’d like to know more about how this bridge works. It is possible to test the transfer of tokens between Rootstock Testnet and Sepolia networks, or RSK Mainnet and Ethereum networks using the RSK Token Bridge web interface.

### Prerequisites

This will require the use of either Chrome or Chromium web browser, with one of the following wallet browser extensions:
- [Metamask](https://metamask.io/download.html) using a [custom network](/develop/apps/wallets/metamask/) to add the Rootstock network.
- [Liquality Wallet](https://liquality.io/)
- [Definat Wallet](https://defiantapp.tech/)

## Steps

Start by connecting your wallet and select the network of your choice, in this case we will use Rootstock Testnet network.

<img src="/assets/img/tools/tokenbridge/dapp-image1-1.png" alt="token bridge connect"/>

If everything is correct, you should see the following screen:

<img src="/assets/img/tools/tokenbridge/dapp-image1-2.png" alt="token bridge token bridge connected" />

Then select the token that you want to transfer. For example, tRIF token (you can obtain them from the [Rif Faucet](https://faucet.rifos.org/)).
You will need to approve the bridge contract to use the token, this will happen only once.

<img src="/assets/img/tools/tokenbridge/dapp-image2.png" alt="token bridge approve" />

Once you have approved it, enter the amount you want to transfer, and the address that will recieve them on the other side then click `Convert tokens` button. **Important! don't use the bridge to send it to your exchange address, you won't be able to claim it**

<img src="/assets/img/tools/tokenbridge/dapp-image3.png" />

As soon as the process starts, you will see a loader and a disclaimer explaining that you will have to wait around 30 seconds until the transaction gets mined.

<img src="/assets/img/tools/tokenbridge/dapp-image4.png" alt="token bridge wait for transaction" />

You're meant to confirm the transaction, click **submit the transaction**. The following image gives an example of the confirmation popup. This will create  a transaction to call the bridge contract to cross the tokens. These steps require around 30 seconds for the transaction to be mined.

<img src="/assets/img/tools/tokenbridge/dapp-image5.png" width="300" alt="nifty wallet submit transaction" />

If everything worked correctly, you should see the transaction added to the Account Transactions list
You have to **wait depending on the amount you want to cross, around 30 minutes for small amounts, 1 hour for medium amounts or 24 hours for large ammounts** for the tokens to cross.

<img src="/assets/img/tools/tokenbridge/dapp-image6.png" />

Once the tokens have cross **you need to claim them on the other network**. To do this, change the network on your wallet, and click on the claim button.

<img src="/assets/img/tools/tokenbridge/dapp-image7.png" alt="token bridge claim button" />

A confirmation popup will appear to send the claim transaction to the network, submit it. After the transaction get mined, you will see your transaction as Claimed

<img src="/assets/img/tools/tokenbridge/dapp-image8.png" alt="token bridge claimed transaction"/>

You can check the token contract on the other network by clicking on the token symbol (in this case etRIF).
You can also check it on your wallet. To do this add a custom token on the network where the token crossed using the address mentioned before.

You can transfer tokens in the other direction too, using the same method.
