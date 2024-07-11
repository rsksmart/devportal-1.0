---
menu_order: 1200
menu_title: Viewing a derived bitcoin address
title: "Viewing a derived bitcoin address"
description: "Here, we will learn how to view a derived address using Electrum."
tags: 2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, trezor, liquality, leger, guide, setup, integrate, use
layout: rsk
---
![2 way peg app (peg-out)](/assets/img/guides/two-way-peg-app/pegout.gif)


> We regret to inform you that the Liquality Wallet has been discontinued. To continue managing your assets seamlessly, we encourage you 
> to transition to alternative wallet solutions as all functionality has ceased. 
> Find the best solution for your needs at [Rootstock   Wallets](https://blog.rootstock.io/noticia/rootstock-wallets/).

This section contains detailed instructions on how to review funds in Bitcoin after a pegout by:

- Convert [RBTC - BTC](#converting-rbtc-to-btc)
- Import a [key in Electrum](#import-key-in-electrum)
- Import in Electrum if you are using [hardware wallets](#import-key-in-electrum-using-hardware-wallets)

## Why derive address using Electrum?

During the **pegout** process, the destination address of your BTC is derived from your signature, this enables one to know which address will receive the BTCs, to view the destination address, follow this step by step guide.

## Prerequisites:

- Wallet private key
- [Electrum](https://electrum.org/#download)
- [Rootstock Utils](https://github.com/rsksmart/utils)

## How to view a derived address

A derived address is the BTC address derived from the RBTC account. When using the 2 way peg app, it is important to know which address you will receive your BTCs. See [Viewing advanced details](#how-to-view-advanced-details).

We will learn how to view a derived address and use [Liquality](#using-liquality) and [Metamask](#using-metamask) to get a private key. We will also learn how to [convert RBTC - BTC](#converting-btc-to-rbtc) and [Import a Key in Electrum](#import-key-in-electrum).

### Getting a wallet private key

#### Using Liquality

To get your wallet private key, follow the steps below:

Note: To set up a Liquality or a Metamask wallet. Check here for a step by step process for how to add the Rootstock network to the Liquality browser wallet.

**Step 1**: Open the Liquality wallet on your browser, you can find these in the extensions tab in your browser.

**Step 2**: Check that you’re connected to the Rootstock network

![liquality - connection](/assets/img/guides/two-way-peg-app/liquality/connection.png)

**Step 3**: Choose the asset you want to use for the transaction
![liquality - assets](/assets/img/guides/two-way-peg-app/liquality/assets.png)

**Step 4**: Click on the menu by the right, and this will open up a list of options.

**Step 5**: Choose the option “Export private key” in the menu

![liquality - export_private_key](/assets/img/guides/two-way-peg-app/liquality/export_private_key.png)

**Step 6**: Choose “I have privacy”

![liquality - privacy](/assets/img/guides/two-way-peg-app/liquality/privacy.png)

**Step 7**: Fill out wallet password and check “I understand the risk and have privacy”

**Step 8**: Copy the private key and click on “Done”

#### Using Metamask

**Step 1**: Open the Metamask wallet on your browser, you can find this in the extensions tab in your browser.

**Step 2**: Click on the menu icon by the right

**Step 3**: Choose “Account details”

![metamask - privacy](/assets/img/guides/two-way-peg-app/metamask/account_details.png)

**Step 4**: Then click on the “Export private key” button

![metamask - export_private_key](/assets/img/guides/two-way-peg-app/metamask/export_private_key.png)

**Step 5**: Fill out wallet password and click on “Confirm”

![metamask - fill_wallet_password](/assets/img/guides/two-way-peg-app/metamask/fill_wallet_password.png)

**Step 6**: Copy the private key and click on “Done”

![metamask - copy_assets](/assets/img/guides/two-way-peg-app/metamask/copy_assets.png)

### Converting RBTC to BTC

Before converting the funds, we need to convert the private key into a [Wallet Import Format (WIF)](https://learnmeabitcoin.com/technical/wif). A WIF private key is just another way of representing your original private key. If you have a WIF private key, you can always convert it back in to its original format.

For more info on WIF, see the [Bitcoin Wiki](https://en.bitcoin.it/wiki/Wallet_import_format)

#### Using Rootstock Utils (Recommended)

[Rootstock Utils](https://github.com/rsksmart/utils#rsk-utils) is used to convert keys from BTC to Rootstock.

Step 1: Clone the [Rootstock utils project](https://github.com/rsksmart/utils).

Step 2: Follow the steps explained in the [README](https://github.com/rsksmart/utils/blob/master/README.md).

Step 3: Install webpack using the code below;

    ```
        javascript     npm install webpack@4.46.0 -g     npm i webpack-cli@3.3.12 -g     npm install     webpack
    ```

[Optional] you will need npm to install webpack:

`npm install -–save-dev webpack`

Step 4: Run webpack

`webpack`

Step 5: Open the file in your browser

`./build/index.html`

Step 6: Open the generated application and add your private key and convert to WIF,
as shown in the image below:

![browser - open_browser](/assets/img/guides/two-way-peg-app/other/open_browser.png)

#### Using LearnMeABitcoin

> - IMPORTANT: We discourage users from using websites on the internet, note that if your private key is exposed, your funds will also be exposed, therefore it's recommended that you use the offline option, like [Rootstock utils](#using-rootstock-utils).

Follow the steps below to get started;

Step 1: Visit the url: [https://learnmeabitcoin.com/technical/wif](https://learnmeabitcoin.com/technical/wif)

![metamask - WIF](/assets/img/guides/two-way-peg-app/other/wif.png)

> You will find the [Ruby](https://www.ruby-lang.org/en/) code and a tool to convert the private key into a WIF.

Step 2: Paste the private key gotten in [Getting a wallet private key](#getting-a-wallet-private-key) in the “Private Key” field

Step 3: Choose the network: `Mainnet` or `Testnet`

Step 4: Choose compressed option `true`

Step 5: Copy WIF value

> - IMPORTANT:  Using the Ruby code is highly **recommended**
> - This code requires the `checksum.rb` and `base58_encode.rb` functions as shown in the code below.

Download the 'checksum' file [here](https://github.com/in3rsha/learnmeabitcoin-code/blob/master/checksum.rb).
Download the 'base58_encode' file [here](https://github.com/in3rsha/learnmeabitcoin-code/blob/master/base58_encode.rb).

```shell
require_relative 'checksum'
require_relative 'base58_encode'

##### Convert Private Key to WIF

privatekey = "4fd050a8e4fd767f759d75492b9894bc97875e8201873e38443e3f5eae9c8db2f"
extended = "80" + privatekey + "01"
extendedchecksum = extended + checksum(extended)
wif = base58_encode(extendedchecksum)

puts wif
```

## Import key in Electrum

---

[Electrum](https://electrum.org/#download) is used to verify a derived address, this address will then be used to receive and verify the converted funds (RBTC - BTC) when the pegout process is finished.

Step 1: Download Electrum for your OS from the [website](https://electrum.org/#download).

Follow the steps below to create a new wallet in Electrum and import the **private key**:

> NOTE: If you need to run Electrum in Testnet, execute the following commands:

```
cd /Applications/Electrum.app/Contents/MacOS
./run_electrum --testnet
```

Step 2: Start with the “Create New Wallet” option

Step 3: Fill out a new wallet name and click on the “Next” button

Step 4: Choose “Import Bitcoin addresses or private keys” option and click on “Next” button

Step 5: Fill out the WIF value of the private key and click on “Next” button

Step 6: Create a new wallet password and click on the “Next” button

![electrum - new](/assets/img/guides/two-way-peg-app/other/electrum.png)

> In this screen, you will see the address to receive the BTC funds.

## Import key in Electrum using Hardware Wallets

[Electrum](https://electrum.org/#download) is used to verify a derived address, this address will then be used to receive and verify the converted funds (RBTC - BTC) when the pegout process is finished.

Step 1: Download Electrum for your OS from the [website](https://electrum.org/#download).

Follow the steps below to create a new wallet in Electrum and connect to the **hardware wallets**:

> NOTE: If you need to run Electrum in Testnet, execute the following commands:

```
cd /Applications/Electrum.app/Contents/MacOS
./run_electrum --testnet
```

Step 2: Start with the “Create New Wallet” option

Step 3: Fill out the name in “Wallet” field and click on “Next” button

Step 4: Select “Standard wallet” option and click on “Next” button

![wallet - electrum](/assets/img/guides/two-way-peg-app/using-hd-wallets/electrum-hdw-1.png)

Step 4: Select “Use a hardware device” option and click on “Next” button

![wallet - electrum-hardware-device](/assets/img/guides/two-way-peg-app/using-hd-wallets/electrum-hdw-2.png)

Step 5: Select the hardware wallet and click on “Next” button

> NOTE: The follow screen is an example of usage the Trezor Hardware Wallet

![wallet - electrum-hardware-device-trezor](/assets/img/guides/two-way-peg-app/using-hd-wallets/electrum-hdw-3.png)

> NOTE: The follow screen is an example of usage the Ledger Hardware Wallet

![wallet - electrum-hardware-device-ledger](/assets/img/guides/two-way-peg-app/using-hd-wallets/electrum-hdw-4.png)

Step 6: Select “legacy (p2pkh)” option, fill out a custom derivation path field and click on “Next” button

```
Custom derivation path:
Mainnet: m/44'/137'/0'
```

![wallet - electrum-derivation-pathx](/assets/img/guides/two-way-peg-app/using-hd-wallets/electrum-hdw-5.png)

> NOTE: Testnet: m/44'/37310'/0'

![wallet - electrum-derivation-legacy](/assets/img/guides/two-way-peg-app/using-hd-wallets/electrum-hdw-6.png)

> IMPORTANT: For Ledger it is necessary to approve the custom derivation path in the device

![wallet - electrum-ledger-confirmation](/assets/img/guides/two-way-peg-app/using-hd-wallets/electrum-hdw-7.png)

Step 7:  Check “Encrypt wallet file” option and click on “Next” button

![wallet - electrum-encrypt](/assets/img/guides/two-way-peg-app/using-hd-wallets/electrum-hdw-8.png)

Step 8: Finally in Electrum go to “Addresses” tab and you can see your funds

![wallet - electrum-show-funds](/assets/img/guides/two-way-peg-app/using-hd-wallets/electrum-hdw-9.png)

---

## Resources

* 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
* 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
* How to get [RBTC using Rootstock’s built in Powpeg](/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
* [Rootstock Testnet Faucet](https://faucet.rootstock.io/)
<<<<<<< HEAD
* [Get RBTC using Exchanges](/guides/get-crypto-on-rsk/rbtc-exchanges/)
* [Design architecture](/guides/two-way-peg-app/advanced-operations/design-architecture/)
=======
* [Get RBTC using Exchanges](https://developers.rootstock.io/guides/get-crypto-on-rsk/rbtc-exchanges/)
* [Design architecture](/guides/two-way-peg-app/advanced-operations/design-architecture/)
>>>>>>> master
