---
layout: rsk
title: Token Bridge Dapp Guide
---

This Decentralized Application helps you to interact with the Token Bridge contracts, to safely cross your tokens between RSK and Ethereum networks. It is available at [tokenbridge.rsk.co](https://tokenbridge.rsk.co/) for mainnet or [testnet.tokenbridge.rsk.co](https://testnet.tokenbridge.rsk.co/) for testnet.

## Description

This guide describes the steps to transfer tokens using the Web Interface for the RSK Token Bridge system. Please refer to the project documentation if you’d like to know more about how this bridge works. It is possible to test the transfer of tokens between RSK Testnet and Kovan networks, or RSK Mainnet and Ethereum networks using the RSK Token Bridge web interface.

### Prerequisites

This will require the use of either Chrome or Chromium web browser, with one of the following wallet browser extensions:
- [Nifty Wallet](https://www.poa.network/for-users/nifty-wallet) using a [custom network](/tutorials/resolve-nifty-issue/#add-rsk-as-custom-node) for RSK to keep the same addresses as Ethereum.
- [Metamask](https://metamask.io/download.html) using a [custom network](/develop/apps/wallets/metamask/) to add the RSK network.

## Steps

Start by connecting your wallet (Nifty Wallet or Metamask) and select the network of your choice, in this case we will use RSK Testnet network.

<img src="/assets/img/tools/tokenbridge/dapp-image1-1.png" />

If everything is correct, you should see the following screen:

<img src="/assets/img/tools/tokenbridge/dapp-image1-2.png" />

Then select the token that you want to transfer. For example, tRIF token (you can obtain them from the [Rif Faucet](https://faucet.rifos.org/)).

<img src="/assets/img/tools/tokenbridge/dapp-image2.png" />

Once you have selected it, enter the amount you want to transfer, then click `Convert tokens` button.

<img src="/assets/img/tools/tokenbridge/dapp-image3.png" />

As soon as the process starts, you will see a loader and a disclaimer explaining that you will have to wait around 30 seconds until the transaction gets mined.

<img src="/assets/img/tools/tokenbridge/dapp-image4.png" />

A double pop-up message would be displayed, you're meant to confirm the transaction, then click **submit the transaction**. The following image gives an example of the confirmation popup. The first one is to approve the bridge contract to use the token, the second one is to notify the bridge contract to cross the tokens. These steps require around 30 seconds each for the transaction to be mined.

<img src="/assets/img/tools/tokenbridge/dapp-image5.png" width="300"/>

Once all the steps are done, you have to **wait around 5 minutes in testnet or 24 hours in mainnet** for the tokens to cross. You can check the token contract on the other network by clicking on the token symbol (in this case etRIF).
You can also check it on your wallet. To do this, change the network on your wallet (in this case we would change to Kovan) and add a custom token using the address of the crossed token, you should see the amount crossed once you wait for the corresponding crossing time.

<img src="/assets/img/tools/tokenbridge/dapp-image6.png" />

Check the transaction on the explorer to see that everything is ok.

You can transfer tokens in the other direction too, using the same method.
