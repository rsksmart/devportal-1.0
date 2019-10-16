---
layout: rsk
title: Conversion with Trezor
---

### Summary
This document explains how to try the 2-way peg mechanism using Trezor. You can use 2-way peg in Testnet. 
- [General requirements](#general-requirements)
- [Lock: From BTC to RBTC](#from-btc-to-rbtc)
- [Release: From RBTC to BTC](#from-rbtc-to-btc)

## General Requirements
* Clone [this project](https://github.com/rsksmart/utilities/tree/master/peg/hw/trezor).
* You need a [Trezor](https://trezor.io/).
* We recommend you to have [Trezor Bridge](https://wallet.trezor.io/#/bridge/) installed and review this [Developers Guide](https://wiki.trezor.io/Developers_guide).


## From BTC to RBTC
:exclamation: **Before start:** read [lock requirements](/rsk/rbtc/conversion/#locking-from-btc-to-rbtc)
1. Open `trezor-peg.html` in your web browser.

2.  Get your BTC Address clicking "Get BTC Address" button on the left top.

![Get BTC Address](/assets/img/rsk/peg-trezor/getBTCAddress.png)

3. Send this BTC address to RSK in [Gitter](https://gitter.im/rsksmart/getting-started) in order to be added to Peg Whitelist.

4. Go to some BTC Testnet Faucet and send some BTC to this address.

5.  Get your RSK Address clicking "Get RSK Address" button on the right top and keep it. You will use it to receive your RBTC from Bridge.

![Get RSK Address](/assets/img/rsk/peg-trezor/getRSKAddress.png)

6.  Complete "From address Path" field using the given format.

7.  Get RSK Federation Address from "Get Federation Address" button, then complete "Federation Address" field.

![Get RSK Federation Address](/assets/img/rsk/peg-trezor/getRSKFederationAddress.png)

8.  Complete Transaction Amount in satoshis value. 

9.  Complete "Input UTXO ID" with the hash of the UTXO that you will use. An easier way to find UTXO information is using this [API](https://testnet.blockexplorer.com/api/addr/%address/utxo) replacing `%address` with your BTC address.

10.  Complete "Input UTXO Index" with the index of the same UTXO.

11.  Finally set "Input UTXO Amount", remember it has to be enough to complete the transaction.

![Get RSK Fedetation Address](/assets/img/rsk/peg-trezor/lockProcessFields.png)

12. Once the transaction is signed, press the link and set the tx hash in bitcoin explorer to broadcast.

![Signed Transaction](/assets/img/rsk/peg-trezor/lockProcessResponse.png)

13. Wait the stipulated time.

14. Then use our [Testnet Explorer](https://explorer.testnet.rsk.co) to see your RBTC balance.

## From RBTC to BTC
:exclamation: **Before start:** read [release requirements](/rsk/rbtc/conversion/#releasing-from-rbtc-to-btc).
1. Go to "Release process" section at the bottom.

2.  Get RSK Address clicking "Get RSK Address" button on the right top and keep it. Put this value in "From RSK Address" field.

3. Set this RSK Address in the field.

3. Set the tx Amount.

![Release Process Fields](/assets/img/rsk/peg-trezor/releaseProcessFields.png)

![Release Process Completed](/assets/img/rsk/peg-trezor/releaseProcessResponse.png)

4. Once you see the tx hash press the link, you will go to MyCrypto site. Set the hash in the field and send it.

Field:

![My Crypto Step 1](/assets/img/rsk/peg-trezor/myCryptoBroadcastField.png)

Once completed:

![My Crypto Step 2](/assets/img/rsk/peg-trezor/myCryptoBroadcastDetail.png)

Success:

![My Crypto Step 3](/assets/img/rsk/peg-trezor/myCryptoBroadcastSuccess.png)

5. Wait the stipulated time.
