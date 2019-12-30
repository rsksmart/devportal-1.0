---
layout: rsk
title: Token Bridge Dapp Guide
---

This Decentralized Application helps you to interact with the Token Bridge contracts, to safetly cross your tokens from RSK to Ethereum [https://tokenbridge.rsk.co/](https://tokenbridge.rsk.co/)

### Description
This guide describes the steps to transfer tokens using the Web Interface for the RSK Tokenbridge system. Please refer to the project documentation if you’d like to know more about how this bridge works.

It is possible to test the transfer of tokens between RSK and Kovan networks using the RSK Tokenbridge web interface. This will require access to a Chrome or Chromium web browser and install one the extensions [Nifty Wallet](https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid) or [Metamask with custom network](https://github.com/rsksmart/rskj/wiki/Configure-Metamask-to-connect-with-RSK).

## Steps
Start by connecting one of the extensions to the RSK Testnet network. If everything is correct, you will see the following:

<img src="/assets/img/tools/tokenbridge/dapp-image1.png" />

Then, locate the address of the token in RSK Testnet for which you want to transfer tokens from. For example 0x5D248F520b023acB815eDeCD5000B98ef84CbF1b

<img src="/assets/img/tools/tokenbridge/dapp-image2.png" />

Paste the address in the Token Address field, the token will be recognized and the symbol shown automatically. Enter the amount you want to transfer and confirm with the Cross the Tokens button. 

<img src="/assets/img/tools/tokenbridge/dapp-image3.png" />

As the alert shows, a few moments after sending the request, it will be necessary to confirm the transaction to approve the token crossing. The following image gives an example of the confirmation popup.

<img src="/assets/img/tools/tokenbridge/dapp-image4.png" />

Once the transaction is approved, the page will be updated with the new status and will ask once again to confirm the token passage to the Bridge:

<img src="/assets/img/tools/tokenbridge/dapp-image5.png" />

<img src="/assets/img/tools/tokenbridge/dapp-image6.png" />

If the transfer is successful, a new alert is displayed

<img src="/assets/img/tools/tokenbridge/dapp-image7.png" />

Next, you can obtain the address associated with the token on the other network, in this case Kovan. To do this, switch from the browser extension to the Kovan network and enter the original token address. Confirm with Get Side Token Address. 
A new address that corresponds to the associated token in Kovan should appear

<img src="/assets/img/tools/tokenbridge/dapp-image8.png" />

This address can be used to verify the balance and confirm that the tokens were effectively transferred. In the same way, you can use it to make a cross back of tokens between the networks.
