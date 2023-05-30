---
menu_order: 301
menu_title: Getting Started with peg-outs
title: "Getting Started with peg-outs | 2 way peg app Documentation"
description: "Welcome to peg-outs using the 2 way peg app documentation."
tags: 2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, guide, setup, integrate, use
layout: rsk
---
​
In this section, we will learn how to get started using the 2 way peg app to convert RBTC to BTC (peg-out transaction).
1. Perform a peg-out using [Meta Mask wallet](#performing-a-peg-out-transaction-using-metamask)
2. Perform a peg-out using [Liquality wallet](#performing-a-peg-out-transaction-using-liquality)
​
> Note we will be using the 2 way peg app on [2 way peg app - Testnet](https://2wp-app.testnet.rsk.co/) for learning purposes, for transactions using real tokens, please use the [2 way peg app - Mainnet](https://2wp-app.rsk.co/) application.
​
----
​
# Performing a peg-out transaction using MetaMask
​
## Select conversion type
​
Since we are performing a peg-out, choose the RBTC - BTC conversion type. 
​
![Select rbtc to btc conversion](/assets/img/guides/two-way-peg-app/select-rbtc-to-btc-conversion.png)
​
## Connect your MetaMask wallet
​
Click 'Connect wallet' and then 'MetaMask'.
​
![Click connect wallet](/assets/img/guides/two-way-peg-app/connect-wallet-btn.png)
![Select metamask](/assets/img/guides/two-way-peg-app/select-metamask.png)
​
In case your wallet is locked you have to unlock it.
​
![Waiting wallet connection](/assets/img/guides/two-way-peg-app/waiting-wallet-connection.png)
![Unlock metamask wallet](/assets/img/guides/two-way-peg-app/unlock-metamask.png)
​
And then click 'Confirm' to complete the first step.
​
![Confirm metamask wallet connection](/assets/img/guides/two-way-peg-app/confirm-metamask.png)
​
## Enter the amount you want to send
​
You can either enter it manually or click 'Use max available balance' if you want to send all the RBTC you have.
​
![Rbtc amount to send input](/assets/img/guides/two-way-peg-app/amount-input.png)
​
## Verify your Bitcoin destination address
​
Click 'Get Bitcoin destination address'. Click 'Sign' first in 2-Way Peg App and then in MetaMask.
​
![Click get bitcoin destination address](/assets/img/guides/two-way-peg-app/get-destination-address.png)
![Click sign button](/assets/img/guides/two-way-peg-app/sign-message.png)
![Metamask signature request](/assets/img/guides/two-way-peg-app/signature-metamask.png)
​
After signing you will be able to know the derived Bitcoin address where you will receive funds.
​
![Derived address](/assets/img/guides/two-way-peg-app/derivated-address.png)
​
## Send transaction
​
Check the information, click 'Send' in 2-Way Peg App and then 'Confirm' in MetaMask.
​
![Click to send pegout transaction](/assets/img/guides/two-way-peg-app/send-pegout.png)
![Confirm send on metamask](/assets/img/guides/two-way-peg-app/send-metamask.png)
​
The final screen will be like the one below.
​
![BTC on its way](/assets/img/guides/two-way-peg-app/final-screen-summary.png)
​
---
---
​
# Performing a peg-out transaction using Liquality
​
## Select conversion type
![Select rbtc to btc conversion](/assets/img/guides/two-way-peg-app/select-rbtc-to-btc-conversion.png)
​
## Connect your Liquality wallet
​
![Click connect wallet](/assets/img/guides/two-way-peg-app/connect-wallet-btn.png)
![Select liquality wallet](/assets/img/guides/two-way-peg-app/select-liquality.png)
​
In case your wallet is locked you have to unlock it...
​
![Waiting wallet connection](/assets/img/guides/two-way-peg-app/unlock-liquality.png)
​
and then click 'Confirm' to complete the first step.
​
![Confirm metamask wallet connection](/assets/img/guides/two-way-peg-app/confirm-liquality.png)
​
## Enter the amount you want to send
​
You can either enter it manually or click 'Use max available balance' if you want to convert all the rbtc you have.
​
![Rbtc amount to send input](/assets/img/guides/two-way-peg-app/amount-input.png)
​
## Verify your Bitcoin destination address
We don't support the Bitcoin destination address' derivation from Liquality yet, so you have to follow the documentation linked here:
​
![Can't derive destination address using liquality](/assets/img/guides/two-way-peg-app/cant-derive-liquality.png)
​
## Send transaction
Check the information, click 'Send' in 2-way peg app and then 'Confirm' in Liquality.
​
![Send pegout transaction](/assets/img/guides/two-way-peg-app/send-liquality.png)
![Confirm pegout transaction on liquality wallet](/assets/img/guides/two-way-peg-app/confirm-liquality.png)
​
The final screen will be like the one below.
![Btc is on its way](/assets/img/guides/two-way-peg-app/final-screen-liquality.png)
​
​
If you go to the status page by pressing the *Go to status page* button, you will see a page like this.
​
![Transaction status for pegout id](/assets/img/guides/two-way-peg-app/tx-status.png)
​
 with your pegout tx and your Bitcoin recipient address information as well.
 This address should match the one you can access through Electrum.
​
---
​
## Resources
- 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
- 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
- How to get [RBTC using RSK’s built in Powpeg](https://developers.rsk.co/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
- [RSK Testnet Faucet](https://faucet.rsk.co/)
- [Get RBTC using Exchanges](https://developers.rsk.co/guides/get-crypto-on-rsk/rbtc-exchanges/)