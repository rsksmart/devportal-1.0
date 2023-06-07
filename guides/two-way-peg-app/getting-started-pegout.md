---
menu_order: 301
menu_title: Getting Started with peg-outs
title: "Getting Started with peg-outs | 2 way peg app Documentation"
description: "Welcome to peg-outs using the 2 way peg app documentation."
tags: 2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, guide, setup, integrate, use
layout: rsk
---
​
In this section, we will learn how to perform a [peg-out](/guides/two-way-peg-app/glossary/) transaction using the 2 way peg app, to convert RBTC to BTC (peg-out). We will do the following:

1. Perform a peg-out using [Meta Mask wallet](#performing-a-peg-out-transaction-using-metamask)
2. Perform a peg-out using [Liquality wallet](#performing-a-peg-out-transaction-using-liquality)
3. Perform a peg-out using [Ledger+Liquality](#performing-a-peg-out-transaction-using-ledger-and-liquality)

> For how to perform a peg-in transaction using hardware wallets. See [Getting started using hardware wallets](/guides/two-way-peg-app/getting-started#using-hardware-wallets).


## Prerequisites

- [Metamask Wallet](/develop/wallet/use/metamask/), or
- [Liquality Wallet](/solutions/liquality/)

> - Ensure you have installed any of the software wallet listed above in your browser. For more information, see the [Supported Browsers](/guides/two-way-peg-app/getting-started#supported-browsers) and [Supported Wallets](/guides/two-way-peg-app/getting-started#supported-wallets) section.
​> - Note that we will be using the 2 way peg app on [2 way peg app - Testnet](https://2wp-app.testnet.rsk.co/) for learning purposes.
> - For transactions using **real tokens**, use the [2 way peg app - Mainnet](https://2wp-app.rsk.co/) application.

​​
## Performing a peg-out transaction using MetaMask
​
**Step 1: Select conversion type**

​
To perform a peg-out, open  the [2 way peg app - Testnet](https://2wp-app.testnet.rsk.co/) in your browser.

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

> For more details on derived addresses. See the [advanced operations](/guides/two-way-peg-app/advanced-operations#how-to-view-a-derived-address) section.

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
​​
## Performing a peg-out transaction using Liquality

The [Liquality Wallet](/solutions/liquality/) is a browser extension for accessing Bitcoin, Rootstock, and Ethereum applications. 

​
**Step 1: Choose the RBTC - BTC conversion type**

![Select rbtc to btc conversion](/assets/img/guides/two-way-peg-app/select-rbtc-to-btc-conversion.png)
​
**Step 2: Connect your Liquality wallet**
​
![Click connect wallet](/assets/img/guides/two-way-peg-app/connect-wallet-btn.png)
![Select liquality wallet](/assets/img/guides/two-way-peg-app/select-liquality.png)
​
See how to unlock your wallet, if locked.
​
![Waiting wallet connection](/assets/img/guides/two-way-peg-app/unlock-liquality.png)
​
Then, click 'Confirm' to complete the first step.
​
![Confirm metamask wallet connection](/assets/img/guides/two-way-peg-app/confirm-liquality.png)
​
**Step 3: Enter the amount you want to send**

​
You can either enter it manually or click 'Use max available balance' if you want to convert all the rbtc you have.
​
![Rbtc amount to send input](/assets/img/guides/two-way-peg-app/amount-input.png)
​
**Step 4: Verify your Bitcoin destination address**

We don't support the Bitcoin destination address' derivation from Liquality yet, so you have to follow the documentation linked here:
​
![Can't derive destination address using liquality](/assets/img/guides/two-way-peg-app/cant-derive-liquality.png)
​
**Step 5: Send transaction**


Review the information, and click 'Send' in 2-way peg app and then click 'Confirm' in Liquality.
​
![Send pegout transaction](/assets/img/guides/two-way-peg-app/send-liquality.png)
![Confirm pegout transaction on liquality wallet](/assets/img/guides/two-way-peg-app/confirm-liquality.png)

​
The final screen will be like the one below.
![Btc is on its way](/assets/img/guides/two-way-peg-app/final-screen-liquality.png)

​
To see the status of a transaction, click on the *Go to status page* button, you will see a page  as shown below, with your pegout tx and your Bitcoin recipient address information as well.
​
![Transaction status for pegout id](/assets/img/guides/two-way-peg-app/tx-status.png)


This address should match the one you can access through Electrum. See [How to view a derived address](/guides/two-way-peg-app/advanced-operations#how-to-view-a-derived-address) and [How to check a transaction status](/guides/two-way-peg-app/getting-started#using-the-transaction-status-page).

## Performing a peg-out transaction using Ledger and Liquality

The [Liquality Wallet](/solutions/liquality/) is a browser extension for accessing Bitcoin, Rootstock, and Ethereum applications. 

We will perform a peg-out transaction using the Ledger Hardware Wallet and Liquality.

> See [How to perform a peg-in transaction using Ledger](/guides/two-way-peg-app/getting-started#performing-a-peg-in-transaction-with-ledger)

### Get started

To perform a peg-out transaction using the Ledger device with Liquality, follow the steps below:

Step 1:  Plug the Ledger device into the computer

Step 2: Enter your pin to unlock it. See step 2 in [pegout transaction using Liquality](#performing-a-peg-out-transaction-using-liquality) for how to unlock your device.

Step 3: On the device, navigate to the TSK or RSK Test app on your Ledger device.

Step 4: Open Liquality and select Ledger option

![Select Ledger Option](/assets/img/guides/two-way-peg-app/liquality/ledger-steps/1-ledger-steps.png)


Step 5: Choose the "RSK asset" and click on the "Connect" button

![Connect Ledger](/assets/img/guides/two-way-peg-app/liquality/ledger-steps/2-ledger-steps.png)


Step 6: Choose the account that you want to use with Liquality

![Choose account](/assets/img/guides/two-way-peg-app/liquality/ledger-steps/3-ledger-steps.png)


Step 7: Click the "Close this Tab" button

![Close tab](/assets/img/guides/two-way-peg-app/liquality/ledger-steps/4-ledger-steps.png)


Now you can see "Ledger" label in Liquality accounts

![Final screen](/assets/img/guides/two-way-peg-app/liquality/ledger-steps/5-ledger-steps.png)
​
--- 
​
## Resources
- [Performing a Peg-in transaction using Hardware wallets](/guides/two-way-peg-app/getting-started#using-hardware-wallets)
- 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
- 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
- How to get [RBTC using RSK’s built in Powpeg](https://developers.rsk.co/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
- Pegout [Common errors](/guides/two-way-peg-app/pegout-common-errors)
- [RSK Testnet Faucet](https://faucet.rsk.co/)
- [Get RBTC using Exchanges](https://developers.rsk.co/guides/get-crypto-on-rsk/rbtc-exchanges/)