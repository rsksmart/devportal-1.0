---
menu_order: 500
menu_title: Get RBTC using Wallets
title: "How to get RBTC using wallets | Rootstock (RSK)"
description: "Understand what crypto wallets are and how they work, and then see how you can use Rootstock wallets that have the BTC and RBTC swapping feature built in"
tags: rbtc, Rootstock, wallets, defi, exchange, crypto, how-to, knowledge-base
layout: "rsk"
---

![How to get RBTC using wallets](/assets/img/guides/get-crypto-on-rsk/rbtc-wallets.jpg)

If the technical expertise required to
[use the PowPeg to swap between BTC and RBTC](/kb/get-crypto-on-rsk/powpeg-btc-rbtc/) 
is something that you prefer to avoid,
you may wish to consider using crypto wallets that can make this process easier to do!
Let’s first understand what crypto wallets are and how they work,
and then see how you can use Rootstock wallets that have
the BTC and RBTC swapping feature built in.

## What wallets do

The term “wallet” refers to several different things,
which all have to do with storing something of value;
it could be a traditional pocket wallet used to store physical cash,
or it could be a digital wallet.
Crypto wallets are a type of digital wallet.
Unlike ‘pocket’ wallets, crypto wallets do not store physical currency,
such as bank or government issued notes or coins.
In fact, cryptocurrencies and tokens don’t get stored in any single location,
or even exist in physical form.
Instead, crypto wallets are software programs that store your
**cryptographic keys** securely,
and use them to interface with a blockchain.

This enables users to send and receive cryptocurrencies and tokens,
and monitor their balances.
Underpinning all of this is their ability to use cryptography
to **digitally sign transactions**.

Some crypto wallets support **smart contracts** when
they connect to blockchain networks such as Rootstock.
They allow a user to invoke smart contract functions.
Recall one of the
[differences between tokens and cryptocurrency](/kb/get-crypto-on-rsk/cryptocurrency-vs-token/),
which is that **tokens** are implemented using smart contracts.
Thus crypto wallets which understand smart contracts
are necessary to store and transfer tokens.


## Difference between a Private and Public Key

![Public and private keys](/assets/img/guides/get-crypto-on-rsk/public-vs-private-key.png)

In crypto wallets, public keys and private keys are
primarily used in digital signature algorithms.
The private key is used to sign information such as blockchain transactions,
and the public key is used to verify the signed information.
The public key may be distributed to others -
think of it as analogous to your user ID.
The private key must be kept secret -
think of it as analogous to your password.

## Hardware and Software Wallets

![Hardware and Software Wallets](/assets/img/guides/get-crypto-on-rsk/hardware-software.png)

A **hardware wallet** is a special-purpose device
configured to accept supported cryptocurrencies and tokens.
Hardware wallets usually take the form of a physical device.
To interact with the blockchain, one usually connects it to
a computer via USB, or uses a companion mobile app.
Note that the private keys are **never transmitted** to 
he computer or smartphone that they are connected to.

A **software wallet** is an application that is installed
on a computer or smartphone. 
The private keys are **stored on** the computer or smartphone.

No one type of wallet is better than the other, rather,
each one is better suited to different use cases.
Hardware wallets are generally seen to be more secure than software wallets,
because private keys never leave the device.
Instead, they receive unsigned transactions,
and output signed transactions.
This however, adds extra steps, and thus some hassle for the user
when interacting with the blockchain network.
Software wallets, on the other hand,
provide a better user experience by being available directly
on the same device that needs to sign transactions,
thus offering a better user experience.
This choice is therefore akin to the classic tradeoff
between ease of use, and security.

> Note that there are other types of wallets that exist apart from these two, including
> [paper wallets](https://en.bitcoin.it/wiki/Paper_wallet).
> However, we will not cover them in this article.

## How wallets work

![Wallet Image](/assets/img/guides/get-crypto-on-rsk/wallet.png)

**Watch this short explainer video to understand how crypto wallets work**

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/hKW182_Izaw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

> For a list of updated wallets, see the [Wallets](/develop/wallet/use/) section.

When a user wishes to interact with the Rootstock blockchain,
for example to transfer RBTC:

- They input some instructions into the crypto wallet.
- The wallet uses this information to construct a raw transaction.
- The wallet then uses a private key to sign the raw transaction
  - using a [digital signature algorithm](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm).
- This produces a signed transaction.
- The wallet then submits the signed transaction to
  computers running the Rootstock blockchain software,
  using RPC messages
- If the user checks the state of the wallet, at this point,
  they will see the transaction that they input earlier as “pending”.
- The Rootstock blockchain nodes form a peer to peer network,
  and they each independently verify the transaction,
  and come to a consensus about whether the transaction
  is valid and should be confirmed.
- The wallet waits until the transaction has been confirmed,
  and then obtains the transaction receipt,
  using RPC messages once again.
- The wallet processes and stores information from the transaction receipt
  to update the state of the wallet.
- If the user checks the state of the wallet, at this point,
  they will see the transaction that they input earlier as being “confirmed”.

Both Bitcoin wallets and Rootstock wallets work in the manner described above.
However, it is much more complex when a wallet needs to swap BTC with RBTC.
This would need a special type of wallet that integrates with
either the Rootstock native PowPeg,
or a wallet that integrates with a 3rd party service that performs the swaps.

Let’s take a look at two different Rootstock wallets, 
each of which implements the above techniques.

## Wallets that support Rootstock

> For a list of updated wallets, see the [Wallets](/develop/wallet/use/) section.

### Defiant

Defiant is a software wallet that can be installed on a smartphone.

Currently, it is the only wallet giving its users the possibility of swapping BTC and RBTC through the native Rootstock PowPeg. This is an especially good option for users that are already using the wallet with BTC or RBTC balances.

![Defiant Wallet Image](/assets/img/guides/get-crypto-on-rsk/rbtc-wallets-defiant.png)
![Defiant Wallet Image 2](/assets/img/guides/get-crypto-on-rsk/rbtc-wallets-defiant-2.png)

**Pros**:
- Easy to use and less prone to error.
- Users of the wallet don’t need to move to another tool or wallet to make use of this feature.
- No registration or KYC required.
- No need to relinquish keys to a counterparty.

**Cons**:
- Users from other wallets need to move funds to the supported wallets to use this functionality.
- Unless the wallet charges specific fees, there is no clear business model for a wallet to integrate this feature.
- Same cons as the native Rootstock PowPeg method.

#### How to Get RBTC with defiant wallet

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/ptYfTMMA6DM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### Liquality

Liquality is a software wallet that can be installed as a browser extension.

It works in a manner similar to other browser extension wallets, such as MetaMask. Its key feature allows users to swap between BTC and RBTC. However, unlike Defiant, the user does not have to deal directly with the native Rootstock PowPeg, and instead it performs cross-chain atomic swaps, using Liquality’s own technology.

![Wallet Screens Landing](/assets/img/solutions/Liquality/Wallet-Screens-Landing-p-1080.jpeg)

**Pros**:
- Easy to use and less prone to error.
- Users of the wallet don’t need to move to another tool or wallet to make use of this feature.
- No registration or KYC required.
- No need to relinquish keys to a counterparty
- Faster than native Rootstock PowPeg.
- No need for technical expertise or knowledge of the Rootstock PowPeg to operate.

**Cons**:
- Users from other wallets need to move funds to the supported wallets to use this functionality.
- Users are charged a fee for the swap service.

Check out the [Liquality solutions page](/solutions/liquality/) for more information!

#### How to Get RBTC with liquality wallet

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/qD1lODbCBqE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Sending and Receiving RBTC

Watch the videos below for a step by step guide on how to send and receive RBTC using Defiant and Liquality.

**Using the Powpeg in Defiant**  (Español)

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/1kTJhlA-5V8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

**Using the Liquality Atomic Swap**

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/j8laciB7ihw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Next

Be sure to check out our next article in this series,
about how to get the Rootstock cryptocurrency, RBTC,
by using exchanges: [How to get RBTC using Exchanges](/guides/get-crypto-on-rsk/rbtc-exchanges/)