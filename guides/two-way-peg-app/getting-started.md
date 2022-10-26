---
title: "Getting Started | 2 way peg app Documentation"
description: "Welcome to the 2 way peg app documentation."
slug: 2wp-docs
tags: 2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, guide, setup, integrate, use
layout: rsk
---

![2 way peg app (peg-in)](/assets/img/guides/two-way-peg-app/2-way-peg.gif)

In this section, we will learn how to get started using the 2 way peg app to convert BTC to RBTC, we will do the following:

1. [Set up your environment](#requirements)
2. Use supported [browsers](#supported-browsers) and [wallets](#supported-wallets)
3. Use [supported addresses](#supported-addresses)
4. Get [mainnet and testnet](#getting-funds) funds
5. Perform a peg-in transaction using [Ledger Hardware Wallet](#ledger-hardware-wallet)
6. Perform a peg-in transaction using [Trezor Hardware Wallet](#trezor-hardware-wallet)
7. [View a transaction status](#view-transaction-status).

## Requirements

The following are the setup requirements to get started with the 2 way peg app.

- PC
    - Computer (at least Windows 8.1 (64-bit), macOS 10.10, or Linux) with internet.
- Ledger Nano S / Ledger Nano X hardware wallets. 
    - Download and install [Ledger Live](https://support.ledger.com/hc/en-us/articles/4404389503889-Getting-started-with-Ledger-Live?docs=true).
        - You’ll need the Ledger Live application which is a must have companion to your Ledger device. Ledger live software is an interface app for your Ledger Nano X and Ledger Nano S device. The application allows users to manage their ledger device and is available for both desktop as well as mobile.
        - You’ll need this to install the Bitcoin and Bitcoin testnet app on your ledger. We hope you have a ledger live application ready. If not you can download from [here](https://www.ledger.com/ledger-live/download).
    - Ledger Nano S. See [setup](https://support.ledger.com/hc/en-us/articles/360000613793?docs=true) instructions
    - Ledger Nano X. See [setup](https://support.ledger.com/hc/en-us/articles/360018784134-Set-up-your-Ledger-Nano-X?docs=true) instructions
- Trezor hardware Wallet
    - How to [setup](https://wiki.trezor.io/User_manual:Setting_up_the_Trezor_device) a Trezor hardware wallet device.
- Funds (at least 0.05 BTC)

> - In this guide, we will be using the Ledger Nano S hardware wallet. All other versions of the Ledger and Trezor hardware wallets are also supported by the 2 way peg app.
> - If you don’t own any of the hardware wallet devices listed above, please visit the official website of the [Ledger](https://shop.ledger.com/products/ledger-nano-s-plus) and [Trezor](https://shop.trezor.io/) hardware wallets to purchase one.

## Supported Browsers

- [Google Chrome](https://www.google.com/chrome/)
- [Brave Browser](https://brave.com/)

> Note: The current v1.1.0 of the 2 way peg app is currently not operational on mobile devices.

![Supported Browser](/assets/img/guides/two-way-peg-app/supported-broswer.png)

![Mobile browser not supported](/assets/img/guides/two-way-peg-app/mobile-not-supported.png)

## Supported Addresses

The following address types are supported by the 2 way peg app.

- Segwit:
A SegWit address starts with the number 3 and has more elaborated functionality than a legacy address. Types include P2SH-P2WPKH and P2SH-P2WSH.

- Native segwit:
Also known as Bech32 address, native SegWit looks different from the P2-styles as it starts with bc1.

- Legacy address:
These addresses are the original BTC addresses. It uses a special script hash function called P2PKH (Pay-to-Pubkey Hash) address and starts with the number 1.

## Supported Wallets

- Hardware wallets
    - Ledger
    - Trezor
- Software wallets
    - [Liquality](/solutions/liquality/) (Coming soon)

> The current version of the 2 way peg app supports peg-in transactions using hardware wallets. Future releases of the 2 way peg app will include support for performing peg-in operations using **software wallets**.

## Install Apps

- Bitcoin Testnet

The Bitcoin testnet app does not show on Ledger live manager by default. To be able to see the BTC Testnet app you need to enable the developer mode in Ledger live.

### Enabling Developer Mode 

To enable developer mode, we will do the following:
- Connect your ledger hardware device and unlock it.
- Open Ledger live, click on Manager and open settings. 
- Navigate to the experimental features menu and enable developer mode. This will show developer and testnet apps in the manager.

![Install Apps Settings](/assets/img/guides/two-way-peg-app/install-apps-settings.png)

Go to Ledger live manager and search for Bitcoin testnet app

![Ledger live bitcoin test](/assets/img/guides/two-way-peg-app/ledger-live-bitcoin-test.png)

Click on install to install the Bitcoin Testnet application. To use the testnet app you also need the main Bitcoin app. So install both the apps to your device.

![Install bitcoin test](/assets/img/guides/two-way-peg-app/install-bitcoin-test.png)

**Get Testnet address**

On your ledger device, you’ll find all the apps installed on your device. The Bitcoin app to be used on Mainnet, and Bitcoin Test app to be used on Testnet.

To start using testnet, we need the testnet address, to get this address, 

- Open the Bitcoin test app on your ledger device. You will see a “Bitcoin Testnet is ready” screen
- In the ledger live app, go to accounts tab, click on add account.

![Add Account](/assets/img/guides/two-way-peg-app/add-account.png)

Search testnet and select Bitcoin Testnet (BTC). Click on Continue

![Add Account 2](/assets/img/guides/two-way-peg-app/add-accounts.png)

- Approve the Bitcoin Test app on your hardware wallet device
- On the next screen choose the address format (Native SegWit / SegWit).

Click on **Add Account**.

![Add Accounts 3](/assets/img/guides/two-way-peg-app/add-account-3.png)

_Note: See [supported addresses](#supported-addresses) section for the types of addresses supported by the 2 way peg app._

Now you have successfully added the Bitcoin testnet app to your account.

![Account Added Successfully](/assets/img/guides/two-way-peg-app/account-added-successfully.png)

## Getting Funds

**Getting Testnet Tokens**

Go to the receive tab on Ledger live.

![Receive tab](/assets/img/guides/two-way-peg-app/receive-tab.png)

Select Bitcoin testnet and click on continue. 

![Receive Tab - Select Bitcoin Testnet](/assets/img/guides/two-way-peg-app/receive-tab-select-bitcoin-testnet.png)

Copy BTC Testnet address

![Copy BTC Testnet Address](/assets/img/guides/two-way-peg-app/copy-btc-testnet-address.png)

### Getting Testnet Tokens

Use the following faucet to receive testnet tokens.

- Open [Coinfaucet](https://coinfaucet.eu/en/btc-testnet/)
- Paste the address into the field and click on Get Bitcoins. 

_Note: You need at least **0.005 TBTC** to use the 2 way peg app on Mainnet and Testnet._

### Getting Mainnet Tokens

You can get BTC on Exchanges like [Liquality](/solutions/liquality/) and [Defiant](https://www.defiantapp.tech/en/en).  See [Get Crypto on RSK](/guides/get-crypto-on-rsk/) for how to get RBTC.

> - The 2 way peg app is available on both Mainnet and Testnet. Both applications follow the same process, for production purposes, use [Mainnet](https://2wp-app.rsk.co/), for testing and development purposes, use the [Testnet](https://2wp-app.testnet.rsk.co/). 
> - See [glossary](/guides/two-way-peg-app/glossary/) for explanation of these terms.

## Using hardware wallets

In this guide, we will be using the 2 way peg app on [2 way peg app - Testnet](https://2wp-app.testnet.rsk.co/) for learning purposes, for transactions using real tokens, please use the [2 way peg app - Mainnet](https://2wp-app.rsk.co/) application.

### Ledger Hardware Wallet

![Connect Ledger](/assets/img/guides/two-way-peg-app/1-connect-ledger.png)

> Ensure to complete the steps in [install apps](#install-apps) and [requirements](#requirements) before proceeding with this section.

**Step 1: Connect to a ledger wallet**
- Plug your Ledger wallet by connecting the USB cable that comes with the Ledger.
- Enter your pin that has already been configured in [requirements](#requirements), to unlock the Ledger.

**Step 2: Enter Pin**

![Enter Pin](/assets/img/guides/two-way-peg-app/2-enter-pin.png)

**Step 3: Choose Wallet**

Here, we will use the Bitcoin Test wallet. For Mainnet, use the Bitcoin wallet.

![Choose Wallet](/assets/img/guides/two-way-peg-app/3-choose-wallet.png)

_Note: On the Nano S ledger, whenever you want to confirm an option, click on the 2 upper buttons at the same time._

**Step 4: Confirm connection to Bitcoin Testnet**

Once the above steps have been completed, a confirmation appears - “Bitcoin Testnet is ready”. 

![Confirm Connection Testnet](/assets/img/guides/two-way-peg-app/4-confirm-connection-testnet.png)

Now, you have successfully connected your Ledger device to the Bitcoin network.

## Performing a peg-in transaction with Ledger

A peg-in is the process of exchanging BTC for RBTC. See the [glossary](/guides/two-way-peg-app/glossary/) section for more information.

> The minimum values allowed when creating a peg-in transaction is **0.005 BTC**. 

Open [2 way peg application](https://2wp-app.testnet.rsk.co/) on Testnet.

**Step 1: Select Conversion Type**

Since we are performing a peg-in, choose the BTC - RBTC conversion type, as shown in the image below;

![Select Conversion Type](/assets/img/guides/two-way-peg-app/5-select-conversion-type.png)

**Step 2: Choose Hardware Wallet**

Here, we are using the ledger hardware wallet to interact with the 2 way peg app. Select your hardware wallet, ensure your device is already connected by inserting your pin into the Ledger device before clicking the Ledger option in the 2 way peg app. See the [connect to a ledger wallet](#ledger-hardware-wallet) section. 

![Choose Hardware wallet](/assets/img/guides/two-way-peg-app/6-choose-hardware-wallet.png)

**Step 3: Read pop up information**

The pop up shown in the image below describes the duration of the peg-in process which requires at least 100 confirmations on the Bitcoin network, this gives an estimate of around 17 hours in total. It also describes the three main steps involved which is; connecting to the hardware wallet, sending a signed transaction to the BTC network until the corresponding RBTC value is made available in the destination wallet and a receipt for this transaction.

![Read popup info](/assets/img/guides/two-way-peg-app/7-read-popup-info.png)

> Click the checkbox - “Don’t show again” to turn off this pop-up in the future or close temporarily.

**Step 4: Connect to the app**

Click **Continue** to connect to the 2 way peg application.

![Connect to the app](/assets/img/guides/two-way-peg-app/8-connect-to-the-app.png)

The 2 way peg app shows the pop-up with the connected usb ledger devices, if your device is not visible, unplug the usb device and plug in again, unlock with a pin and click **Retry** or go back to the [connect ledger wallet](#ledger-hardware-wallet) section.

![Connect device error](/assets/img/guides/two-way-peg-app/8a-connect-device-error.png)

To confirm successful connection to the 2 way peg app, you will be directed to the screen below, where we will perform a Peg-in transaction. 

![Peg-in screen](/assets/img/guides/two-way-peg-app/8b-pegin-screen.png)

> - The balance of the accounts in your hardware wallet will be loaded, and this shows the balance of 3 different types of accounts: segwit, legacy, native segwit. See the [supported addresses](#supported-addresses) for the meaning of these types of accounts.

**Step 5: Sending a transaction**

**Choose Account**

Select the account you would like to send BTC from, by clicking on the dropdown as shown in the image below. 

![Select Testnet Bitcoin Account](/assets/img/guides/two-way-peg-app/9-select-testnet-btc-account.png)

> Note that for each selected account type, we will see a corresponding balance in the 'Device account' field in transaction summary section on the right hand side of the screen.

**Enter Amount**

After selecting the account you will like to send BTC from, the next step is to enter an amount you would like to send. The amount entered appears in the BTC field, and you can see the corresponding amount in USD under transaction summary.

![Enter Amount](/assets/img/guides/two-way-peg-app/10-enter-amount.png)

> - The minimum amount to send is **0.005 BTC**, any amount less than this throws an error message: **“You cannot send that amount of BTC, you can only send a minimum of 0.005 BTC”**.
> - Note that the amount sent in BTC is the same amount to be received in RBTC on the RSK network.

**Step 6: Enter address**

To enter an address, we are provided with two options: 

- (1) Manually enter or copy and paste an RSK compatible address. See [Account based addresses](/rsk/architecture/account-based/) 
- (2) Connect to a software wallet. E.g, Metamask. Here, the address is automatically filled in by the account that is connected to your metamask wallet.

![Enter address](/assets/img/guides/two-way-peg-app/11-enter-address.png)

**Tips:**

> - Use the [address verifier](/kb/verify-address-ownership/) to verify if an address is RSK-compatible and can be used to perform a peg in a transaction.
> - Use the [Metamask-RSK](https://metamask-landing.rifos.org/) tool to automatically connect to RSK mainnet or [manually connect metamask to the RSK mainnet or testnet](/guides/quickstart/browser/).

**Step 6a: Click on Connect Wallet**

![Click Connect Wallet](/assets/img/guides/two-way-peg-app/12-click-connect-wallet.png)

**Step 6b: Choose your preferred wallet**

In this section, we will use the [Liquality wallet](/solutions/liquality/).

![Choose Liquality wallet](/assets/img/guides/two-way-peg-app/13-choose-liquality-wallet.png)

This triggers a pop-up. Ensure to check the wallet address and the network automatically selected by Liquality. Grant the requested permissions to liquality by clicking on **Confirm**.

> See connect with [Metamask](/wallet/use/metamask/#connect-with-metamask).

**Step 6c: Confirm Details**

![Confirm network details](/assets/img/guides/two-way-peg-app/14-confirm-network-details.png)

This automatically connects your wallet and adds a destination address. You can choose to disconnect the wallet by clicking on the **Disconnect wallet** button.

![Select Address](/assets/img/guides/two-way-peg-app/15-select-address.png)

**Step 7: Select Transaction Fee**

Here, we can select the fee that will be used for this transaction, this is set on default to average.

![Select Transaction Fee](/assets/img/guides/two-way-peg-app/16-select-transaction-fee.png)

> - The transaction fee is not part of the amount you’re sending via the 2 way peg app, it will only be used for the correct processing of the transaction on the Bitcoin network. Also see the different types of fees (slow, average, fast) and their corresponding cost in TBTC and USD, depending on preference, you can choose any of those three. See the [adjusting network fees](/guides/two-way-peg-app/advanced-operations#adjusting-network-fees) section for more information. 
> - The time for each type of fee per transaction may vary depending on the number of transactions on the network and the fees charged at the time.

**Step 8: View transaction summary**

In this section, we can confirm the selected values:

- Device account address
- Amount in BTC
- Destination RSK address
- Refund Bitcoin address
- Transaction fee in BTC and USD
- Transaction total (BTCs amount + Transaction fee selected)

![Transaction Summary](/assets/img/guides/two-way-peg-app/17-transaction-summary.png)

> - In the instance of an error on this transaction, the amount will be sent to the address indicated in the **refund Bitcoin address** located in your hardware wallet.
> - See the [glossary](/guides/two-way-peg-app/glossary/) section for the meaning of these values.

**Step 9: Continue and sign transaction**

By clicking on the **Continue** button, we can see all the transactions that will be made, their corresponding inputs and outputs, and the network fees that will be charged, all this information must be confirmed on your hardware wallet screen.

![View transaction summary](/assets/img/guides/two-way-peg-app/18-view-transaction-summary.png)

Under transaction summary, we can see the **destination** and **refund** address, as well as the **Powpeg** recipient address. After confirming these details are correct, click on the **sign** button, and confirm all information on your hardware wallet.

![Sign Transaction Summry](/assets/img/guides/two-way-peg-app/19-transaction-summary-sign.png)

**Step 10: Confirm transaction in Ledger Device**

Here, you can confirm or reject the transaction in your hardware wallet. Unlock ledger device to confirm the transaction.

![Confirm transaction on Ledger Device](/assets/img/guides/two-way-peg-app/20-confirm-transaction-ledger.png)

**Step 11: Confirm all outputs**

The user needs to review and approve all outputs, the value of the transaction and the fee of the transaction. This test transaction generates 3 outputs. 

> To approve or confirm any action on the screen, press on the two buttons beside the ledger hardware device at the same time.

**Review and accept output 1**

![review output one](/assets/img/guides/two-way-peg-app/21-review-output-one.jpg)

![accept output one](/assets/img/guides/two-way-peg-app/22-accept-output-one.jpg)

**Review and accept the output 2**

![review output two](/assets/img/guides/two-way-peg-app/23-review-output-two.jpg)

![accept output two](/assets/img/guides/two-way-peg-app/24-accept-output-two.jpg)

**Review and accept the output 3**

![review output three](/assets/img/guides/two-way-peg-app/25-review-output-three.jpg)

![accept output three](/assets/img/guides/two-way-peg-app/26-accept-output-three.jpg)

**Confirm amount of test transactions**

![confirm amount of test tx](/assets/img/guides/two-way-peg-app/27-confirm-amount-test-tx.jpg)

**Confirm if the fee value is the same present in the transaction summary screen**.

![confirm fee value](/assets/img/guides/two-way-peg-app/28-confirm-fee-value.jpg)

**Now, confirm all transactions**

![confirm transactions](/assets/img/guides/two-way-peg-app/29-confirm-transactions.jpg)

**Accept and send the transaction to be broadcasted to the network.**

![accept and send](/assets/img/guides/two-way-peg-app/30-accept-and-send.jpg)

> After signing, the transaction is sent to the network to be processed, taking into account the fee value selected previously. 


**Step 12: View transaction status**

This shows the status of your transaction, with a transaction ID and a link to check the transaction on the explorer. 

![view transaction status](/assets/img/guides/two-way-peg-app/31-view-transaction-status.png)

By clicking on the transaction link, the user can check the status directly in the block explorer, outside the 2 way peg app application, and view the data on the bitcoin blockchain. 

![View transaction on Blockcypher](/assets/img/guides/two-way-peg-app/32-view-tx-blockcypher.png)

> Users can also copy the transaction id to view the status of their transaction on the Bitcoin network. See the view transaction status section for how to view transaction status.

Click **Done**.

**Now you have successfully performed a peg-in transaction using the 2 way peg application.**


## Trezor Hardware Wallet

![Connect Trezor](/assets/img/guides/two-way-peg-app/33-connect-trezor.png)

**Step 1: Connecting to a trezor wallet**

Plug your Trezor wallet by connecting the USB cable that comes with Trezor.

**Step 2: Export multiple addresses**
In this step, the user is redirected to Trezor's site and needs to click on export to export the addresses. 

![Export Testnet Addresses](/assets/img/guides/two-way-peg-app/34-export-testnet-addresses.png)

**Step 3: Enter Pin and confirm**
Enter a pin for your Trezor, displayed on your hardware wallet. Click **confirm**.

![Insert Trezor Wallet Pin](/assets/img/guides/two-way-peg-app/35-insert-trezor-wallet-pin.png)

![Insert Wallet Pin - Trezor](/assets/img/guides/two-way-peg-app/35a-insert-wallet-pin-trezor.jpg)

**Step 4: Unlock Trezor with passphrase**

![Enter passphrase](/assets/img/guides/two-way-peg-app/36-enter-passphrase.png)

Step 5:
- Type Trezor passphrase
- Trezor will display the message: 'Please enter your passphrase using the computer's keyboard'.

![Enter Passphrase using Keyboard](/assets/img/guides/two-way-peg-app/36a-enter-passphrase-keyboard.jpg)

The user fills the passphrase, and confirms passphrase fields, using the Trezor Connect application. The user will see this screen on Trezor: "Access Hidden Wallet?".

![Access hidden wallet notification](/assets/img/guides/two-way-peg-app/37-access-hidden-wallet-notification.jpg)

![Use passphrase](/assets/img/guides/two-way-peg-app/37a-use-passphrase.png)

Now, you have successfully connected your Trezor to the Bitcoin network.

## Performing a peg-in transaction with Trezor

![Waking Device](/assets/img/guides/two-way-peg-app/38-waking-device.jpg)

Follow the same process in [Step 1 - 9: Performing a Pegin transaction with Ledger](#performing-a-peg-in-transaction-with-ledger).

## Using Software Wallets

Coming soon.


## View transaction status

The transaction status shows the status of transactions performed using the 2 way peg application.

There are two ways to view the transaction status.

1. Using the Transaction status page on the 2 way peg application.
2. View a transaction using Blockcypher Explorer

### Using the transaction status page

To view a transaction status using the 2 way peg application, we will do the following steps;

**Step 1: Go to the homepage**

Visit: [2 way peg on Testnet](https://2wp-app.testnet.rsk.co/). 

Click on transaction status.

![Transaction status](/assets/img/guides/two-way-peg-app/39-transaction-status.png)

**Step 2: Enter Transaction ID**

Copy the transaction ID derived in [Step 12: Performing a Pegin transaction with Ledger](#performing-a-peg-in-transaction-with-ledger), paste into the field as shown below, click on enter or click on the search icon.

![Transaction status field](/assets/img/guides/two-way-peg-app/40-transaction-status-field.png)

![Enter transaction ID](/assets/img/guides/two-way-peg-app/41-enter-transaction-id.png)

**Step 3: View transaction status**

This shows what stage the transaction is in, the transaction performed was a peg-in transaction (BTC to RBTC), in the image below, you will see whether funds have moved from the Bitcoin network to the RSK network, and also when the funds have been successfully delivered to an RSK address, here you can also view the total no of confirmations needed and the estimated time left. 

![Transaction status update](/assets/img/guides/two-way-peg-app/42-transaction-status-update.png)

Click on the **refresh** button by scrolling down on the page below to view the updated status.

![Transaction status full page](/assets/img/guides/two-way-peg-app/43-transaction-status-full-page.png)

**Step 4: View transaction summary**

Here, you can see the following information:

**Device account address:**
- The account address the user is sending from in BTC.

**Amount in BTC:**
- The amount a user is sending

**Destination RSK address:**
- The account address to receive the RBTC.

**Refund Bitcoin address**
- The bitcoin address to be refunded

**Transaction fee**
- The transaction fee, its equivalent is specified in BTC and USD

**Transaction total**
- This comprises the BTCs amount + Transaction fee selected.

![Transaction summary started](/assets/img/guides/two-way-peg-app/44-transaction-summary-started.png)

**Transaction completed!**

![Transaction summary completed](/assets/img/guides/two-way-peg-app/45-transaction-summary-completed.png)

> Note: In case an error occurs with this transaction, the amount will be sent back to the address indicated in the refund Bitcoin address located in your hardware wallet.
> See the [glossary](/guides/two-way-peg-app/glossary/) section for in-depth definition and explanation of these terms.

### Using Blockcypher Explorer

To view transactions status using Blockcypher Explorer, we will do the following:

**Step 1: Click the transaction link**

In the successful transaction notification page, click the transaction link.

![Transaction successful page](/assets/img/guides/two-way-peg-app/46-transaction-successful-page.png)

This automatically opens a new tab which leads to viewing the transaction status directly on [Blockcypher](https://live.blockcypher.com/). 

![Blockcypher Explorer](/assets/img/guides/two-way-peg-app/47-blockcypher-explorer.png)

Alternatively, you can copy the transaction ID from the successful transaction notification page.

**Step 1a: Visit Blockcypher Explorer**

Once you’re on the [Blockcypher explorer](https://live.blockcypher.com/), toggle on Bitcoin Testnet as shown in image below;

![Choose Bitcoin Testnet](/assets/img/guides/two-way-peg-app/48-choose-bitcoin-testnet.png)

**Step 1b: Paste Transaction ID**

Paste transaction ID into search field and click on Search icon or press enter.

![Enter Transaction ID](/assets/img/guides/two-way-peg-app/49-enter-transaction-id.png)

This shows the status for the transaction.

![Blockcypher Transaction Status](/assets/img/guides/two-way-peg-app/50-blockcypher-transaction-status.png)

## Next

Be sure to check out our next article in this guide,
on [Advanced operations you can perform on the 2 way peg app](/guides/two-way-peg-app/advanced-operations/)

----

## Resources
- 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
- 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
- How to get [RBTC using RSK’s built in Powpeg](https://developers.rsk.co/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
- [RSK Testnet Faucet](https://faucet.rsk.co/)
- [Get RBTC using Exchanges](https://developers.rsk.co/guides/get-crypto-on-rsk/rbtc-exchanges/)