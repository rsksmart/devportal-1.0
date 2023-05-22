---
menu_order: 400
menu_title: Advanced Operations
title: "Advanced Operations | 2 way peg app Documentation"
description: "Welcome to the advanced operations you can perform using the 2 way peg app documentation."
tags: 2 way peg, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, guide, setup, integrate, use
layout: rsk
---

This section contains detailed instructions on how to perform advanced operations on the 2 way peg app. 

These operations include;

- How to review funds in Bitcoin after a pegout by [viewing a derived address](#how-to-view-a-derived-address), 
Convert [RBTC - BTC](#converting-rbtc-to-btc) and import a [key in Electrum](#import-key-in-electrum)
- Selecting [different accounts](#account-selection)
- Viewing [advanced details](#how-to-view-advanced-details)
- Adjusting [network fees](#adjusting-network-fees)
- Viewing [Advanced data](#advanced-data)

## How to view a derived address

Here, we will learn how to view a derived address and use [Liquality](#using-liquality) and [Metamask](#using-metamask) to get a private key. We will also learn how to [convert RBTC - BTC](#converting-btc-to-rbtc) and [Import a Key in Elecrum](#import-key-in-electrum).

### Prerequisites:
- Wallet private key
- [Electrum](https://electrum.org/#download)
- [Rootstock Utils](https://github.com/rsksmart/utils)

### Getting a wallet private key

### Using Liquality

To get your wallet private key, follow the steps below: 

Note: To set up a Liquality or a Metamask wallet. Check here for a step by step process for how to add the Rootstock network to the Liquality browser wallet.

**Step 1**: Open the Liquality wallet on your browser, you can find these in the extensions tab in your browser.

**Step 2**: Check that you’re connected to the Rootstock network

![liquality - connection](/assets/img/guides/two-way-peg-app/liquality/connection.png)

**Step 3**: Choose the asset you want to use for the transaction
![liquality - assets](/assets/img/guides/two-way-peg-app/liquality/connection.png)

**Step 4**: Click on the menu by the right, and this will open up a list of options. 

**Step 5**: Choose the option “Export private key” in the menu

![liquality - export_private_key](/assets/img/guides/two-way-peg-app/liquality/export_private_key.png)

**Step 6**: Choose “I have privacy”

![liquality - privacy](/assets/img/guides/two-way-peg-app/liquality/privacy.png)

**Step 7**: Fill out wallet password and check “I understand the risk and have privacy”

**Step 8**: Copy the private key and click on “Done”

### Using Metamask

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

    ```javascript
    npm install webpack@4.46.0 -g
    npm i webpack-cli@3.3.12 -g
    npm install
    webpack
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

```shell
require_relative 'checksum'
require_relative 'base58_encode'

# Convert Private Key to WIF

privatekey = "4fd050a8e4fd767f759d75492b9894bc97875e8201873e38443e3f5eae9c8db2f"
extended = "80" + privatekey + "01"
extendedchecksum = extended + checksum(extended)
wif = base58_encode(extendedchecksum)

puts wif
```

### Import key in Electrum

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

![wallet - electrum](/assets/img/guides/two-way-peg-app/other/electrum.png)

> In this screen, you will see the address to receive the BTC funds.

## Account selection

There are three types of accounts on the 2 way peg app. See [supported addresses](/guides/two-way-peg-app/getting-started#supported-addresses) section for examples of these types of addresses.

To select an account to send BTC from, click on **Select the account** as shown in the image below. This loads the balance for all the addresses in your hardware wallet.

> Note: Your hardware wallet must be connected to view this section of the 2 way peg app.

![Bitcoin account to send from](/assets/img/guides/two-way-peg-app/51-bitcoin-account-to-send-from.png)

Choose the address you want to send TBTC from. See the [getting funds](/guides/two-way-peg-app/getting-started#getting-funds) section for how to get BTC or TBTC.

## How to view advanced details

To view advanced details, click on the plus icon as shown in the image below;

![View advanced details](/assets/img/guides/two-way-peg-app/52-view-advanced-details.png)

Here you can find a long string of numbers called an unsigned raw tx.

![Advanced data](/assets/img/guides/two-way-peg-app/53-advanced-data.png)

### Advanced data

**Unsigned raw tx**

A Bitcoin raw transaction is a chunk of bytes that contains the info about a Bitcoin transaction. That raw transaction will become part of the blockchain when a miner adds it to a block. The pegin transaction has at least one input and two outputs, all information is encoded and displayed for the users’ verification.

## Adjusting network fees

There are three options to choose from when deciding on which fee rate to use when sending a transaction.

**Slow**

A slow transaction is less expensive and will take longer to confirm.

![Slow transaction](/assets/img/guides/two-way-peg-app/54-slow-transaction.png)

**Average**

This is also known as normal, here, the transaction is priced at an average rate and will take an average time to confirm.

![Average transaction](/assets/img/guides/two-way-peg-app/55-average-transaction.png)

**Fast**

A fast transaction is the most expensive but the transaction confirms at the quickest time possible.

![Fast transaction](/assets/img/guides/two-way-peg-app/56-fast-transaction.png)

> The type of fee to be selected depends on several variables, like network speed, time, and amount the user is willing to spend on a single transaction.

## Next

Be sure to check out our next article in this guide,
on [Design & Architecture of the 2 way peg app](/guides/two-way-peg-app/design-architecture/)

----

## Resources
- 2 way peg app frontend [repo](https://github.com/rsksmart/2wp-app)
- 2 way peg app backend [repo](https://github.com/rsksmart/2wp-api)
- How to get [RBTC using RSK’s built in Powpeg](https://developers.rsk.co/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)
- [RSK Testnet Faucet](https://faucet.rsk.co/)
- [Get RBTC using Exchanges](https://developers.rsk.co/guides/get-crypto-on-rsk/rbtc-exchanges/)