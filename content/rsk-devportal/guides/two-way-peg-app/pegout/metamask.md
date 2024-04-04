---
menu_order: 1600
menu_title: Peg-out using Metamask
title: "Performing a peg-out using Metamask Wallet"
description: "Here, we will learn how to perform a peg-out using Metamask Wallet."
tags: 2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, trezor, liquality, leger, guide, setup, integrate, use
layout: rsk
---


![2 way peg app (peg-out)](/assets/img/guides/two-way-peg-app/pegout.gif)

## Performing a peg-out transaction using MetaMask
​
**Step 1: Select conversion type**

To perform a peg-out, open  the [2 way peg app - Testnet](https://app.2wp.testnet.rootstock.io/) in your browser.

**Step 2: Choose the RBTC - BTC conversion type**
​
![Select rbtc to btc conversion](/assets/img/guides/two-way-peg-app/select-rbtc-to-btc-conversion.png)
​
**Step 3: Connect your MetaMask wallet**

​
Click on 'Connect wallet' and then select 'MetaMask'.
​
![Click connect wallet](/assets/img/guides/two-way-peg-app/connect-wallet-btn.png)
![Select metamask](/assets/img/guides/two-way-peg-app/select-metamask.png)
​
> If your wallet is locked, see images below for steps on how to unlock it.
​
![Waiting wallet connection](/assets/img/guides/two-way-peg-app/waiting-wallet-connection.png)
![Unlock metamask wallet](/assets/img/guides/two-way-peg-app/unlock-metamask.png)
​
And then click 'Confirm' to complete the first step.
​
![Confirm metamask wallet connection](/assets/img/guides/two-way-peg-app/confirm-metamask.png)

​
**Step 4: Enter an amount**


Enter the amount you want to send​. You can either enter it manually, 
or click 'Use max available balance' if you want to send all the RBTC you have.
​
![RBTC amount to send input](/assets/img/guides/two-way-peg-app/amount-input.png)
​
**Step 5: Verify your Bitcoin destination address**

​
Click 'Get Bitcoin destination address'. Click 'Sign' first in 2-Way Peg App and then in MetaMask.
​
![Click get bitcoin destination address](/assets/img/guides/two-way-peg-app/get-destination-address.png)
![Click sign button](/assets/img/guides/two-way-peg-app/sign-message.png)
![Metamask signature request](/assets/img/guides/two-way-peg-app/signature-metamask.png)
​
After signing, you will be able to know the derived Bitcoin address where you will receive funds.
​
![Derived address](/assets/img/guides/two-way-peg-app/derivated-address.png)

> For more details on derived addresses. See the [advanced operations](/guides/two-way-peg-app/pegout/deriving-electrum) section.

​
**Step 6: Send transaction**


Confirm the information, click 'Send' in 2-Way Peg App and then  click 'Confirm' in MetaMask.
​
![Click to send pegout transaction](/assets/img/guides/two-way-peg-app/send-pegout.png)
![Confirm send on metamask](/assets/img/guides/two-way-peg-app/send-metamask.png)
​
See final screen as shown in the image below;
​
![BTC on its way](/assets/img/guides/two-way-peg-app/final-screen-summary.png)

----

## Resources
* 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
* 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
* How to get [RBTC using Rootstock’s built in Powpeg](/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
* [Rootstock Testnet Faucet](https://faucet.rootstock.io/)
* [Get RBTC using Exchanges](/guides/get-crypto-on-rsk/rbtc-exchanges/)
* [Design architecture](/guides/two-way-peg-app/advanced-operations/design-architecture/)