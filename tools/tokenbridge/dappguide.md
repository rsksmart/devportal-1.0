---
layout: rsk
title: Token Bridge Dapp Guide
---

This Decentralized Application helps you to interact with the Token Bridge contracts, to safely cross your tokens between RSK and Ethereum networks. It is available at [tokenbridge.rsk.co](https://tokenbridge.rsk.co/) for mainnet or [testnet.tokenbridge.rsk.co](https://testnet.tokenbridge.rsk.co/) for testnet.

## Description

This guide describes the steps to transfer tokens using the Web Interface for the RSK Token Bridge system. Please refer to the project documentation if you’d like to know more about how this bridge works. It is possible to test the transfer of tokens between RSK Testnet and Kovan networks, or RSK Mainnet and Ethereum networks using the RSK Token Bridge web interface. 

### Prerequisites

This will require access to either Chrome or Chromium web browser, with either [Nifty Wallet](https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid) or [Metamask with custom network](https://developers.rsk.co/develop/apps/wallets/metamask/) wallet browser extension installed. The derivation path used in RSK is different from the one used in Ethereum, so you need to [use a custom network](https://developers.rsk.co/tutorials/resolve-nifty-issue/#add-rsk-as-custom-node) to keep the same address in RSK and Ethereum.
You will need R-BTC on RSK and ETH on Ethereum to pay for the necessary transactions.

## Steps

Start by connecting your wallet (Nifty Wallet or Metamask) and select the network of your choice, in this case we will use RSK Testnet network. 

<img src="/assets/img/tools/tokenbridge/dapp-image1-1.png" />

If everything is correct, you should see the following screen:

<img src="/assets/img/tools/tokenbridge/dapp-image1-2.png" />

Then select the token that you want to transfer. For example, tRIF token (you can obtain them from the [Rif Faucet](https://faucet.rifos.org/)).

<img src="/assets/img/tools/tokenbridge/dapp-image2.png" />

Once you have selected it, enter the amount you want to transfer, then click `Cross the Tokens` button.

<img src="/assets/img/tools/tokenbridge/dapp-image3.png" />

As soon as the process starts, you will see a list of the steps needed to cross the tokens.

<img src="/assets/img/tools/tokenbridge/dapp-image4.png" />

The second and third steps will show a message pop-up to confirm the transaction, **submit the transaction**. The following image gives an example of the confirmation popup. This steps require around 30 seconds each for the transaction to be mined.

<img src="/assets/img/tools/tokenbridge/dapp-image5.png" width="300"/>

Once all the steps are done, you have to **wait around 5 minutes in testnet or 1 hour in mainnet** for the tokens to cross. You can check the token contract on the other network by clicking on the symbol (red arrow on the image).
You can also change the network on you wallet (in this case we would change to Kovan). To do this, add the token to your wallet using the address of the crossed token contract (red arrow on the image) in your wallet.

<img src="/assets/img/tools/tokenbridge/dapp-image6.png" />

This address can be used to verify the balance and confirm that the tokens were effectively transferred to the other network. 

You can transfer tokens in the other direction too, using the same method.
