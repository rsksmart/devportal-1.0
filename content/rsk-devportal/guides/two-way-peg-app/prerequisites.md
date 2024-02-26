---
menu_order: 300
menu_title: Prerequisites
title: "Prerequisites"
description: "Welcome to the overview section of the 2 way peg app documentation."
tags: 2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, rootstock, testnet, mainnet, guide, setup, integrate, use
layout: rsk
---

- [Metamask Wallet](/develop/wallet/use/metamask/), or
- [Liquality Wallet](/solutions/liquality/)
- [Install Apps](/guides/two-way-peg-app/prerequisites#install-apps)
- [Enabling Developer Mode](/guides/two-way-peg-app/prerequisites#enabling-developer-mode)
- [Get Testnet Tokens](/guides/two-way-peg-app/prerequisites#getting-testnet-tokens)
- [Get Mainnet Tokens](/content/rsk-devportal/guides/two-way-peg-app/prerequisites#getting-mainnet-tokens)
- [Peg-in Requirements](/content/rsk-devportal/guides/two-way-peg-app/prerequisites#requirements-for-pegin)
- [Peg-out Requirements](/content/rsk-devportal/guides/two-way-peg-app/prerequisites#requirements-for-pegout)

> Ensure you have installed any of the software wallet listed above in your browser. For more information, see the [Supported Browsers](/guides/two-way-peg-app/getting-started#supported-browsers) and [Supported Wallets](/guides/two-way-peg-app/getting-started#supported-wallets) section.
> **Note:** We will be using the 2 way peg app on [2 way peg app - Testnet](https://app.2wp.testnet.rootstock.io/) for learning purposes.
> For transactions using **real tokens**, use the [2 way peg app - Mainnet](https://app.2wp.rootstock.io/) application.


[](#top "collapsible")
- Install Apps
    - The Bitcoin testnet app does not show on Ledger live manager by default. To be able to see the BTC Testnet app you need to enable the developer mode in Ledger live.
    **Enabling Developer Mode for Bitcoin Testnet** 
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
    >_Note: See [supported addresses](#supported-addresses) section for the types of addresses supported by the 2 way peg app._
    Now you have successfully added the Bitcoin testnet app to your account.
    ![Account Added Successfully](/assets/img/guides/two-way-peg-app/account-added-successfully.png)
- Getting Funds
    - **Getting Testnet Tokens**
    Go to the receive tab on Ledger live.
    ![Receive tab](/assets/img/guides/two-way-peg-app/receive-tab.png)
    Select Bitcoin testnet and click on continue. 
    ![Receive Tab - Select Bitcoin Testnet](/assets/img/guides/two-way-peg-app/receive-tab-select-bitcoin-testnet.png)
    Copy BTC Testnet address
    ![Copy BTC Testnet Address](/assets/img/guides/two-way-peg-app/copy-btc-testnet-address.png)
    **Getting Testnet Tokens**
    Use the following faucet to receive testnet tokens.
    - Open [Coinfaucet](https://coinfaucet.eu/en/btc-testnet/)
    - Paste the address into the field and click on Get Bitcoins. 
    > _Note: You need at least **0.005 BTC** to perform a pegin on Mainnet and Testnet.Likewise,
    you need at least **0.004 RBTC** to perform a pegout on Mainnet and Testnet._
    **Getting Mainnet Tokens**
    You can get BTC on Exchanges like [Liquality](/solutions/liquality/) and [Defiant](https://www.defiantapp.tech/en/en).  See [Get Crypto on Rootstock](/guides/get-crypto-on-rsk/) for how to get RBTC.
    > - The 2 way peg app is available on both Mainnet and Testnet. Both applications follow the same process, for production purposes, use [Mainnet](https://app.2wp.rootstock.io/), for testing and development purposes, use the [Testnet](https://app.2wp.testnet.rootstock.io/). 
    > - See [glossary](/guides/two-way-peg-app/glossary/) for explanation of these terms.
- Requirements for Pegin
    - The following are the setup requirements to get started with the 2 way peg app.
        - PC: A computer (at least Windows 8.1 (64-bit), macOS 10.10, or Linux) with internet connection.
        - Ledger Nano S / Ledger Nano X hardware wallets. 
            - Download and install [Ledger Live](https://support.ledger.com/hc/en-us/articles/4404389503889-Getting-started-with-Ledger-Live?docs=true).
                - You’ll need the Ledger Live application which is a must have companion to your Ledger device. Ledger live software is an interface app for your Ledger Nano X and Ledger Nano S device. The application allows users to manage their ledger device and is available for both desktop as well as mobile.
                - You’ll need this to install the Bitcoin and Bitcoin testnet app on your ledger. We hope you have a ledger live application ready. If not you can download from [here](https://www.ledger.com/ledger-live/download).
            - To install Ledger Nano S, see [setup](https://support.ledger.com/hc/en-us/articles/360000613793?docs=true) instructions
            - To install Ledger Nano X, see [setup](https://support.ledger.com/hc/en-us/articles/360018784134-Set-up-your-Ledger-Nano-X?docs=true) instructions
        - Trezor hardware Wallet
            - How to [setup](https://wiki.trezor.io/User_manual:Setting_up_the_Trezor_device) a Trezor hardware wallet device.
    - Funds (at least 0.05 BTC)
    > In this guide, we will be using the Ledger Nano S hardware wallet. All other versions of the Ledger and Trezor hardware wallets are also supported by the 2 way peg app.
    > If you don’t own any of the hardware wallet devices listed above, please visit the official website of the [Ledger](https://shop.ledger.com/products/ledger-nano-s-plus) and [Trezor](https://shop.trezor.io/) hardware wallets to purchase one.
- Requirements for Pegout
    - The following are the setup requirements to get started with the 2 way peg app:
    - PC: A computer (at least Windows 8.1 (64-bit), macOS 10.10, or Linux) with internet connection.
    - Ledger Nano S / Ledger Nano X hardware wallets.
        - Download and install [Ledger Live](https://support.ledger.com/hc/en-us/articles/4404389503889-Getting-started-with-Ledger-Live?docs=true).
            - You’ll need the Ledger Live application which is a must have companion to your Ledger device. Ledger live software is an interface app for your Ledger Nano X and Ledger Nano S device. The application allows users to manage their ledger device and is available for both desktop as well as mobile.
            - You’ll need this to install the Bitcoin and Bitcoin testnet app on your ledger. We hope you have a ledger live application ready. If not you can download from [here](https://www.ledger.com/ledger-live/download).
        - To install Ledger Nano S, see [setup](https://support.ledger.com/hc/en-us/articles/360000613793?docs=true) instructions.
        - To install Ledger Nano X, see [setup](https://support.ledger.com/hc/en-us/articles/360018784134-Set-up-your-Ledger-Nano-X?docs=true) instructions.
    - Trezor hardware Wallet
        - How to [setup](https://wiki.trezor.io/User_manual:Setting_up_the_Trezor_device) a Trezor hardware wallet device.
    - Liquality Software Wallet
        - How to [setup](https://www.liquality.io/) a Liquality software wallet.
    - Funds (at least 0.04 BTC)
    > In this guide, we will be using the Ledger Nano S hardware wallet. All other versions of the Ledger and Trezor hardware wallets are also supported by the 2 way peg app.
    > If you don’t own any of the hardware wallet devices listed above, please visit the official website of the [Ledger](https://shop.ledger.com/products/ledger-nano-s-plus) and [Trezor](https://shop.trezor.io/) hardware wallets to purchase one.  
- Resources
    * See the [overview section](/guides/two-way-peg-app/overview/) to learn about the 2 way peg app
    * Convert [BTC to RBTC using the 2 way peg app](/guides/two-way-peg-app/pegin/)
    * 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
    * 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
    * How to get [RBTC using Rootstock’s built in Powpeg](https://developers.rootstock.io/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
    * [Rootstock Testnet Faucet](https://faucet.rootstock.io/)
    * [Get RBTC using Exchanges](https://developers.rootstock.io/guides/get-crypto-on-rsk/rbtc-exchanges/)
    * [Design architecture](/guides/two-way-peg-app/advanced-operations/design-architecture/)