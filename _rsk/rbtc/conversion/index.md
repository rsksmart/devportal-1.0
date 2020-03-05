---
layout: rsk
title: BTC to R-BTC Conversion
tags: rsk, rbtc, conversion, peg, 2-way, peg-in, peg-out, federation
description: "Converting R-BTC to BTC (peg-in) and BTC to R-BTC (peg-out), for both Mainnet and Testnet."
collection_order: 3100
permalink: /rsk/rbtc/conversion/
---

In this article we will explain step by step on how to convert from BTC to R-BTC, and vice versa.
The process of conversion utilises a **2-way peg** mechanism.
Thus, these conversions are referred to as peg-ins and peg-outs.

- **Peg-in**:
  - A conversion from R-BTC to BTC
  - Locks R-BTC on the RSK network
  - Releases BTC on the Bitcoin network
- **Peg-out**:
  - A conversion from BTC to R-BTC
  - Locks BTC on the Bitcoin network
  - Releases R-BTC on the RSK network

<div class="fade alert alert-warning show">IMPORTANT: WHITELIST PROCESS. To use the 2-way-peg you must first <a href="/rsk/rbtc/conversion/whitelist">get whitelisted</a>.</div>

> Note: On Testnets, the token symbols are prefixed with a lowercase `t`.
> Thus we have `BTC` and `R-BTC` on Mainnets,
> which correspond to `tBTC` and `tR-BTC` of Testnets.

## Step by step instructions

You can try the conversion process using either a hardware wallet, or using software:

- [Using a Trezor hardware wallet](/rsk/rbtc/conversion/with-trezor)
- [Using a Ledger hardware wallet](/rsk/rbtc/conversion/with-ledger)
- [Using software](/rsk/rbtc/conversion/with-node-and-console)

### Testnet Guide

In this section we will go over the steps of converting BTC to R-BTC,
and vice versa on the Bitcoin and RSK Testnets.

Note:
The minimum amount of Bitcoin to convert is **0.01 BTC** for Testnet.

#### 1. tBTC to tR-BTC conversion

Instructions on how to do a Testnet peg-out.

**1.1 Connect a wallet to Bitcoin Testnet**

We recommend to use Electrum BTC wallet for connecting to Bitcoin Testnet.

* Download the wallet from [Electrum Website](https://bitzuma.com/posts/a-beginners-guide-to-the-electrum-bitcoin-wallet/)
* Install Electrum
* Start Electrum in Testnet mode
  * For example on MacOS:
`/Applications/Electrum.app/Contents/MacOS/Electrum --testnet`
* After Electrum starts, create or import a wallet
* Go to the third tab, "Receive". You will see a Bitcoin Testnet address like below.

![Create a Legacy(P2PK) wallet](/dist/images/legacy-private-key.png)

> Note: The Bitcoin wallet needs to be legacy (not Segwit)
> whose public key starts with either *m* or *n*, and private key starting with *p2pkh:*

![Get a Bitcoin Testnet address in Electrum Wallet](/dist/images/electrum-wallet.png)

**1.2 Get test Bitcoin from Testnet Faucet**

There are a few options to get Bitcoin on Testnet.
We use [https://testnet-faucet.mempool.co/](https://testnet-faucet.mempool.co/)

**1.3 Whitelist Bitcoin address in RSK**

You can contact us in RSK official [Gitter channels](https://gitter.im/rsksmart/getting-started)
to whitelist your Bitcoin Testnet address.

**1.4 Send Bitcoin to RSK Federation address**

The RSK Federation address is retrieved by making a Smart Contract call on RSK Testnet.
In order to make the call, you will need to have
[MyCrypto](https://mycrypto.com/contracts/interact) installed,
select RSK Testnet in *"More Networks"*, and Navigate to *"MyCrypto -> Contracts -> Select Existing Contracts -> "Bridge" -> "getFederationAddress"* to execute the call.
It should look like the screenshot below.

![Get RSK Federation address from MyCrypto](/dist/images/mycrypto-federation.png)

Once you have the RSK Federation address, you can send Bitcoin to it from your whitelisted Bitcoin address.

> Note: You need to send a minimum amount of 0.01 BTC for conversion.

**1.5 Get tR-BTC address with tBTC private key**

You can get a corresponding tR-BTC address with your tBTC private key from [https://utils.rsk.co/](https://utils.rsk.co/).

> Note: when entering Bitcoin private key do not include *p2pkh:* in the front.

**1.6 Check tR-BTC balance on Testnet**

You can check balance of above tR-BTC address on Metamask,
MyCrypto or any RSK Testnet compatible wallets.

> Note: You have to wait a minimum of 100 confirmations + a minimum of 5 minutes for checking your R-BTC balance

#### 2. tR-BTC to tBTC conversion

Instructions on how to do a Testnet peg-in.

**2.1 Get tBTC address with tR-BTC private key**

If you forgot tBTC public address you can retrieve it with RSK private key from [https://utils.rsk.co/](https://utils.rsk.co/).


**2.2 Send tR-BTC to RSK Bridge Contract**

RSK Bridge Contract address: `0x0000000000000000000000000000000001000006`

> Note: The minimum amount to send is 0.005 tR-BTC for Testnet

Gas Limit of the transaction needs to be manually set at 100,000 gas;
otherwise the transaction will fail.
Gas Price can be set to 0.06 gwei.

![Customize Gas in Metamask before send transaction on RSK](/dist/images/metamask-gas-limit.png)

**2.3 Check balance of tBTC address on Bitcoin Testnet**

You can either use Electrum wallet downloaded earlier or from any Bitcoin explorer to check the balance.

> Note: The release process on Bitcoin network takes 4000 RSK block confirmations and at least 10 more minutes.

### Mainnet Guide

In this section we will go over the steps of converting BTC to R-BTC and vice versa in Bitcoin and RSK Mainnets.

> Note: The minimum amount of Bitcoin to convert is **0.01 BTC** for Mainnet.

#### 1. BTC to R-BTC conversion

Instructions on how to do a Mainnet peg-out.

**1.1 Get a BTC address with balance**

Any Bitcoin wallet that supports legacy(P2PK) private key works for this step, and here we recommend to use Electrum BTC wallet for connecting to BTC mainnet.

* Download the wallet from [Electrum Website](https://bitzuma.com/posts/a-beginners-guide-to-the-electrum-bitcoin-wallet/)
* Install Electrum
* Start Electrum
* Once Electrum starts, create or import a wallet
* Go to the third tab "Receive". You will see a Bitcoin Testnet address like below.

> Note: The Bitcoin wallet needs to be legacy (not Segwit) whose public key starts with either *m* or *n*, and private key starting with *p2pkh:*

![Create a Legacy(P2PK) wallet](/dist/images/legacy-private-key.png)

**1.2 Whitelist Bitcoin address in RSK**

You need to complete [whitelisting](/rsk/rbtc/conversion/whitelist).

**1.3 Send Bitcoin to RSK Federation address**

<div class="fade alert alert-warning show">IMPORTANT: DO NOT EXECUTE THIS STEP BEFORE BEING <a href="/rsk/rbtc/conversion/whitelist">WHITELISTED</a>.</div>

<div class="fade alert alert-warning show">Note: You need to send a minimum amount of 0.01 BTC and not more than 10 BTC for conversion.</div>

The RSK Federation address is retrieved by making a Smart Contract call on RSK Mainnet. In order to make the call, you will need to have [MyCrypto](https://mycrypto.com/contracts/interact) installed, select RSK Network, and Navigate to *"MyCrypto -> Contracts -> Select Existing Contracts -> "Bridge" -> "getFederationAddress"* to execute the call. It should look like the screenshot below.

![Get RSK Federation address from MyCrypto](/dist/images/mycrypto-federation.png)

Once you have the RSK Federation address, you can send Bitcoin to it from your whitelisted Bitcoin address.

**1.4 Wait for BTC confirmations**

To ensure the transaction, we need to wait 100 BTC confirmations, be patient :)

> 100 blocks * 10 minutes/block = 1000 minutes = 16.667 hours approx.

**1.4 Get R-BTC address with BTC private key**

You can get a corresponding R-BTC address with your BTC private key from [https://utils.rsk.co/](https://utils.rsk.co/).

> Note: when entering Bitcoin private key do not include *p2pkh:* in the front.

**1.5 Check R-BTC balance**

You can check balance of R-BTC address on Metamask, MyCrypto, or any RSK compatible wallets.

> Note: You have to wait a minimum of 100 confirmations + a minimum of 5 minutes for checking your R-BTC balance

#### 2. R-BTC to BTC conversion

Instructions on how to do a Mainnet peg-in.

**2.1 Get BTC address with R-BTC private key**

If you forgot BTC public address you can retrieve it with RSK private key from [https://utils.rsk.co/](https://utils.rsk.co/).

**2.2 Send R-BTC to RSK Bridge Contract**

RSK Bridge Contract address: `0x0000000000000000000000000000000001000006`

> Note: The minimum amount to send is 0.008 R-BTC for Mainnet
Gas Limit of the transaction needs to be manually set at 100,000 gas; otherwise the transaction will fail. Gas Price can be set to 0.06 gwei.

![Customize Gas in Metamask before send transaction on RSK](/dist/images/metamask-gas-limit.png)

**2.3 Check balance of BTC address**

You can either use Electrum wallet downloaded earlier or from any Bitcoin explorer to check the balance.

> Note: The release process on Bitcoin network takes 4000 RSK block confirmations and at least 10 more minutes.

## Video

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/1jdYVw8zLUg?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### Q & A

**1. How often does the RSK Federation address change?**

RSK Federation address has changed three times since RSK mainnet launch.

**2. Do I lose my Bitcoin if the RSK Federation address change during my transfer?**

There is a grace period for the RSK Federation address change. You will still be able to lock Bitcoin and get R-BTC during the grace period. However, any Bitcoin sent to the old RSK Federation address will be lost post to the grace period.

### Feedback

For any questions and suggestions you can post to RSK [Gitter channels](https://gitter.im/rsksmart/getting-started).
