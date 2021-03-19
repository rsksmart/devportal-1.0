---
layout: rsk
title: Tesnet Guide
tags: rsk, rbtc, conversion, peg, 2-way, peg-in, peg-out, federation
description: 'Converting t-BTC to tR-BTC (peg-in) and tR-BTC to t-BTC (peg-out).'
collection_order: 3120
permalink: /rsk/rbtc/conversion/networks/testnet/
---

In this section we will go over the steps of converting t-BTC to tR-BTC,
and vice versa on the Bitcoin and RSK Testnets.

Note:
The minimum amount of Bitcoin to convert is **0.01 BTC** for Testnet.

## tBTC to tR-BTC conversion

Instructions on how to do a Testnet peg-in.

**1 Connect a wallet to Bitcoin Testnet**

We recommend to use Electrum BTC wallet for connecting to Bitcoin Testnet.

- Download the wallet from
  [Electrum Website](https://bitzuma.com/posts/a-beginners-guide-to-the-electrum-bitcoin-wallet/)
- Install Electrum
- Start Electrum in Testnet mode
  - For example on MacOS:
    `/Applications/Electrum.app/Contents/MacOS/Electrum --testnet`
- After Electrum starts, create or import a wallet
- Go to the third tab, "Receive".
  You will see a Bitcoin Testnet address like below.

![Create a Legacy (`p2pkh`) wallet](/dist/images/legacy-private-key.png)

> Note: The Bitcoin wallet needs to be legacy (not Segwit)
> whose public key starts with either `m` or `n`,
> and private key starting with `p2pkh:`

![Get a Bitcoin Testnet address in Electrum Wallet](/dist/images/electrum-wallet.png)

**2 Get test Bitcoin from Testnet Faucet**

There are a few options to get Bitcoin on Testnet.
We use [https://testnet-faucet.mempool.co/](https://testnet-faucet.mempool.co/)

**3 Send Bitcoin to RSK Federation address**

The RSK Federation address is retrieved by making a Smart Contract call
on RSK Testnet.
In order to make the call, you will need to have
[MyCrypto](https://mycrypto.com/contracts/interact)
installed, select RSK Testnet in
_"More Networks"_, and Navigate to _"MyCrypto -> Contracts -> Select Existing Contracts -> "Bridge" -> "getFederationAddress"_
to execute the call.
It should look like the screenshot below.

![Get RSK Federation address from MyCrypto](/dist/images/mycrypto-federation.png)

Once you have the RSK Federation address,
you can send Bitcoin to it from your Bitcoin address.

> Note: You need to send a minimum amount of 0.01 BTC for conversion.

**4 Get tR-BTC address with tBTC private key**

You can get a corresponding tR-BTC address from your tBTC private key by using [github.com/rsksmart/utils](https://github.com/rsksmart/utils). If you do not want to compile the utility, you can download the [latest release](https://github.com/rsksmart/utils/releases/latest).

> Note: when entering Bitcoin private key do not include _p2pkh:_ in the front.

**5 Check tR-BTC balance on Testnet**

You can check balance of above tR-BTC address on Metamask,
MyCrypto or any RSK Testnet compatible wallets.

> Note: You have to wait a minimum of 100 confirmations +
> a minimum of 5 minutes for checking your R-BTC balance

## tR-BTC to tBTC conversion

Instructions on how to do a Testnet peg-out.

**1 Get tBTC address with tR-BTC private key**

You can get a corresponding tBTC address from your tR-BTC private key by using [github.com/rsksmart/utils](https://github.com/rsksmart/utils). If you do not want to compile the utility, you can download the [latest release](https://github.com/rsksmart/utils/releases/latest).

**2 Send tR-BTC to RSK Bridge Contract**

RSK Bridge Contract address: `0x0000000000000000000000000000000001000006`

> **Importante note**: The minimum amount to send must be **greater than** 0.005 tR-BTC for Testnet (sending the exact amount fails and funds get lost)

Gas Limit of the transaction needs to be manually set at 100,000 gas;
otherwise the transaction will fail.
Gas Price can be set to 0.06 gwei.

![Customize Gas in Metamask before send transaction on RSK](/dist/images/metamask-gas-limit.png)

**3 Check balance of tBTC address on Bitcoin Testnet**

You can either use Electrum wallet downloaded earlier or from
any Bitcoin explorer to check the balance.

> Note: The release process on Bitcoin network takes
> 4000 RSK block confirmations and at least 10 more minutes.
