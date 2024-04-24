---
menu_order: 300
menu_title: Cryptocurrency vs Token
title: What are Crypto Tokens - Difference between Cryptocurrency and Tokens
description: 'Understand the various types of digital assets, smart contracts, and the differences between a cryptocurrency and a token.'
tags: knowledge-base, tokens, Rootstock, smart contracts, cryptocurrency
layout: 'rsk'
---

![CryptovsTokenBanner](/assets/img/guides/get-crypto-on-rsk/crypto-token-banner.png)

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/GWoNxoaIsbQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## What is a Digital Asset?

In broad terms, a digital asset is a non-tangible asset that is created, traded, and stored in a digital format. Using this definition, in the context of blockchains, digital assets include cryptocurrency and crypto tokens.

![CryptovsTokenList](/assets/img/guides/get-crypto-on-rsk/crypto-token-1.jpg)

> Read about the [3 Ways to Get RBTC](https://blog.rootstock.io/noticia/smart-bitcoin-3-easy-ways-to-get-rbtc/).

The blockchain terms; token and cryptocurrency are often used interchangeably, as these are both digital assets on blockchains. The biggest difference between a cryptocurrency and a token is that cryptocurrencies are the native asset of a
blockchain like BTC, RBTC, or ETH, whereas tokens are built on an existing blockchain, using smart contracts. Most commonly, these are EIP-20 tokens.

The following chart summarises the similarities between the two:

![CryptovsTokenList2](/assets/img/guides/get-crypto-on-rsk/cryptocurrency-vs-token.png)

As we can see, these are largely the same from the perspective of the end user. However, there are large technical differences between the two. Let’s dive a little bit deeper into the technical differences:

## Blockchain, Blocks, Transactions, and Signatures

Here’s a whirlwind introduction to blockchain:

- End-users use public-key cryptography to digitally sign information
- This signed information is a transaction
- The transaction is broadcast to a peer-to-peer network of computers running the blockchain node software
- All the nodes have to reach a consensus on whether or not the transaction is valid
- If the transaction is valid, it gets added to a block, which is a set of transactions
- Many computers on the network build these blocks of transactions, but only one block gets added at a time
- These blocks form a single chain, called a blockchain

Note that many details have been left out of the above description, for the sake of brevity.

**Public key cryptography** is used in blockchain networks, mainly for digitally signing information, and then subsequently verifying those signatures. This was the process of transaction creation and transaction verification. The user possesses both a private key and a public key and needs to keep the private key a secret while allowing the public key to be broadcast widely.

## Transfer Transactions vs Smart Contract Interaction Transactions

In Bitcoin, and in many other blockchains, the information being signed was about one account transferring units from itself to another account. These units are encoded into the software protocols of the blockchain software itself and are known as cryptocurrency. In this system, there is only one type of transaction.

In Ethereum, Rootstock, and many other blockchains that support smart contracts, the information being signed was about one account transferring units of cryptocurrency from itself to another account too. However, these add a new concept where you could have “smart contracts” which are autonomously executing code and data stored on the blockchain. These smart contracts may be thought of as a special type of account. Now an account may sign information that does **not** transfer any units of cryptocurrency, but instead contains instructions for a smart contract to execute some code or store some data. In this system, there are two types of transaction. Read more about Smart contracts in [How to Build a Full Stack dApp on Rootstock](https://dev.rootstock.io/guides/full-stack-dapp-on-rsk/part1-overview/).

## Tokens

Tokens behave very similarly to cryptocurrencies, in the sense that they are a type of currency that exists on a blockchain, and can be transferred from one account to another. However, unlike cryptocurrencies, their behaviour is not built into the blockchain software itself. Instead, their behaviour comes about by implementations in smart contracts. These smart contracts tally the units of the token transferred between accounts.

To transfer units of these tokens, an account signs a transaction telling the smart contract to debit a number of units of the token from its tally, and credit the same number of units of the token to the other account’s tally. Most tokens conform to the EIP-20 token standard, and in fact, the majority of all smart contracts on blockchain networks tend to be of this type; making it easy for users, wallets, exchanges, etc to interact with them.

When interacting with blockchain networks, it is important to be aware of this distinction. On Ethereum, Ether is the cryptocurrency, and other “currencies” are tokens. Likewise, on Rootstock, RBTC is the cryptocurrency, and other “currencies” are tokens. Some practical reasons to take note of this are that:

- Fees (or gas) for transactions are cheaper when transferring the cryptocurrency, and more expensive when transferring tokens.
- Fees (or gas) are always paid for in the cryptocurrency, and therefore when transferring tokens, you will still need some cryptocurrency in the same account.

> Note that when talking about tokens, you will see the terms ERC-20 as well as EIP-20. These are both **the same**. At the outset, the process for defining standards for Ethereum, and Ethereum-compatible networks, was called “Ethereum Request for Comment”. This process has since been refined and renamed to “Ethereum Improvement Proposal”. Read more in [Fungible Token Standards](/kb/fungible-tokens-standard/)

## Next

Be sure to check out our next article in this series,
about how to get the Rootstock cryptocurrency, RBTC,
by using the PowPeg: [How to get RBTC using Rootstock’s built in PowPeg](/guides/get-crypto-on-rsk/powpeg-btc-rbtc/)