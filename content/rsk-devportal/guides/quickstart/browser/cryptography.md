---
menu_order: 200
menu_title: Cryptography
layout: rsk
title: 'Cryptography in Crypto Wallets'
description: 'Learn about how cryptographic security is implemented in crypto wallets'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, rootstock, peer-to-peer, merged-mining, blockchain, powpeg
---
## Private Keys and Public Keys

In wallet software, you generally see “accounts” represented by addresses on the blockchain network.
In the case of Rootstock, this is `0x` followed by a series of hexadecimal characters, for example, `0xdfc0e6361fd1846a223e2d7834a5ebd441a16dd4`.
There is some hidden complexity behind that, to do with cryptography, which is necessary to secure the account, and all the blockchain transactions it makes.

- You start off with a private key, which is essentially an extremely large number, and should be randomly generated.
  You should keep the private key secret, because that is what is used to sign transactions.
- A public key is generated from the private key, and this is also a very large number.
  This does not need to be kept secret, because others in the blockchain network use it to verify transactions.
- An address is generated from the public key, and is the hexadecimal string that you see in your wallet software.

### Seed Phrases

When you open up MetaMask for the first time after installing it, you will be asked to initialise it using a seed phrase.
If you have done this before, you can use your own seed phrase. Otherwise, let’s generate a new one!

> To generate a new seed phrase, you will need to create a new wallet.
> See above [steps](#steps) to create a new wallet.

Most blockchain users operate one or more accounts, and it can be quite difficult to remember the value of cryptographic keys - those very large numbers - you’ll need superhuman memory!
The **seed phrase** is presently the most popular method used to generate, store, remember, and recover keys for crypto wallets, and is something that is approachable for the average user.

It also is the default method used by MetaMask (and many other wallets).
In a nutshell, it takes a randomly generated sequence of dictionary words.
The wallet then uses this sequence of words to generate not one, but multiple sets of cryptographic keys.
This is how MetaMask is able to support multiple accounts using a single seed phrase.

This process is described in detail in the BIP-44 technical standard.
This ensures that the way that seed phrases work is the same between multiple crypto wallets, enabling the same phrase to be portable.
