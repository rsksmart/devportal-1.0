---
menu_order: 300
menu_title: Differences with Ethereum
layout: rsk
title: 'Differences with Ethereum: Checksums, derivation paths, gas prices'
description: 'Learn the differences in checksums, derivation paths and gas prices of Rootstock with Ethereum'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, blockchain, tools
---
Rootstock is not 100% compatible with Ethereum: It has differences in the way checksums are calculated,
the derivation path it uses, and how gas is calculated.

## Checksum differences

- Different Ethereum-compatible networks differentiate themselves using “chain IDs”.
- Each blockchain network has its own unique chain ID.
- Rootstock uses the chain ID when calculating checksums for its addresses, whereas Ethereum does not take this into account.
- Checksums in both networks are represented using capitalisation (uppercase and lowercase letters), so the “same” address will not pass checksum validations on both Rootstock and Ethereum.

## Derivation path differences

Remembering or storing private keys for your crypto wallets can be super challenging, even for technical people.
This is because these keys are essentially extremely large numbers.
So to make things easier, the crypto community has come up with a technique called “HD wallets”, where using a seed phrase (a set of randomly chosen dictionary words), plus a “derivation path”. Rootstock and Ethereum have different derivation paths, therefore, the same seed phrase results in a different set of keys and addresses between Rootstock and Ethereum.

## Gas differences

The EVM and RVM are compatible in that they support the same op-codes, and therefore can run the same smart contracts.
However, the price of each op-code (measured in units known as gas) is different between EVM and RVM, thus the total gas consumed in various transactions is different.
Further to that, gas units are multiplied by gas price to calculate the transaction cost.
Since Rootstock’s gas price is denominated in RBTC and Ethereum’s gas price is denominated in Ether, there is another difference between gas prices on Rootstock and Ethereum.
