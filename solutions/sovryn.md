---
title: "Sovryn - Solutions on RSK"
description: "Sovryn is a non-custodial and permissionless smart contract-based system for Bitcoin lending, borrowing and margin trading"
tags: sovryn, rsk-solutions, rsk, defi, bitcoin
render_features: "tables-with-borders"
layout: "rsk"
---

![sovryn-banner](/assets/img/solutions/sovryn/sovryn-banner-combined.png)

# How Sovryn works

Sovryn is a non-custodial and permissionless smart contract based system for Bitcoin lending, borrowing and margin trading.

Bitcoin layer-2 technologies like RSK enable developers and teams to build out DeFi applications and protocols without being held back by the scalability limitations of Ethereum. Sovryn is building an underlying infrastructure for Bitcoin-native DeFi protocols that uses the RSK sidechain as a bridge builder between crypto platforms, blockchains, DEXes and dApps.

The Sovryn smart contracts have been built using Solidity, and deployed to the RSK sidechain. Unlike smart contracts deployed to Ethereum, these smart contracts are secured by Bitcoin Proof of Work, providing powerful advantages:

- The security assurances of the most secure, trusted Blockchain
- Much lower gas fees
- The ability to pay for transactions in Bitcoin
- Transactions on the Sovryn platform are verified by Bitcoin PoW miners, with fees paid in Bitcoin.
- Users can retain full ownership of their Bitcoin while putting it to use in trading, lending and earning.

One of the greatest challenges in extending Bitcoin's capabilities has been the difficulty in bridging Bitcoin trustlessly to other chains or layer-2 systems. In recent years, advances in threshold technology have allowed for the creation of the first true trustless bridge: TBTC. TBTC-type technology is powerful but requires overcollateralization of assets by stakers to remain trustless. This can make the system expensive for users.

Additionally, threshold signature schemes are complex, making the bridge complex and slow for users. This is changing however. The introduction of taproot to Bitcoin as well as optimizations of the signatory schemes will soon allow faster, cheaper, smoother, bridge transactions, with only a fraction of the required collateralization.

Sovryn is deploying a threshold scheme Bitcoin bridge - and will be the only one that is secured by Bitcoin PoW. Also constructed by Sovryn is the FastBTC relay, which allows users to bridge their Bitcoin seamlessly from any Bitcoin wallet. This system will continue to improve as the technology matures and is optimized.

Sovryn will soon migrate its smart contract to a rollup, allowing users to transact off-chain while still having security assurances provided by the blockchain, for near infinite scale, upgradability, and even lower transaction fees.

After migrating to a rollup, Sovryn will deploy a trustless bridge to Ethereum, which will allow for the quick, secure, and user-friendly transfer of tokens and data between Sovryn and the Ethereum DeFi ecosystem. Bridges of this kind can also be built to provide Bitcoin interoperability to many other chains in the entire DeFi ecosystem.

## How Sovryn integrates with RSK

![sovryn-diagram](/assets/img/solutions/sovryn/sov_diagram.png)

# Current Features

This is what you can do with Sovryn today:

- **Swap-Exchange** - a low cost, low-slippage, AMM allowing instant trades between tokens.
- **Margin Trading** - Creates up to 5X long/short trades, allowing users to borrow leverage from the lending pool.
- **Lending Pool** - Allows HODLers to earn interest by lending tokens to margin traders and borrowers.
- **FastBTC Relay** - Allows use of Bitcoin almost instantly with smart contracts and decentralized products, from any Bitcoin wallet.
- **Governance Token** - A system of [qualified staking](https://sovryn.app/blog/governance-token-guide-the-good-the-bad-and-the-ugly.html) imbues a heightened level of ‘skin in the game’. This governance model incentivizes token holders to stake for the long term while they participate in the decentralized governance mechanism, steering the direction of the protocol.

# Future Features

Sovryn will continue to add features and additional functionality for users. Over the next few months, you will be able to:

- **Borrow** - Allows users and smart contracts to borrow tokens from the lending pool. All lending is over-collateralized.
- **Perpetual Swaps** - BTC backed perpetual swaps allowing trades with up to 20X leverage.
- **Bitcoin-backed Stablecoin** - users can use a USD-pegged token, backed by overcollaterilzed Bitcoin.

# Use cases for Sovryn users

## Stacking Sats and HyperHODLing

- _Alice_, a hodler, wants to put her BTC stack to work by lending them to a margin trade.
- _Bob_, a trader, is so bullish, he isn’t satisfied just to HODL. He wants to **HyperHODL**. He opens a long position on BTC, borrowing the funds from Alice.

Alice and Bob do not want to move their BTC onto a centralized service and give up control of their keys. Using Sovryn, Alice issues a peer to peer loan straight from her wallet and Bob trades straight from his. Alice is now stacking sats, and Bob is **HyperHodling** without compromising their privacy, control or ideals.

## LegoLand

- _Carol_ is building a centralized exchange.
- _David_ is building a decentralized hedging dapp.

Both Carol and David can integrate permissionlessly with the trading, lending and liquidity of Sovryn. In doing so, they gain instant access to more liquidity, more features and can provide greater functionality for both their users and those of Sovryn.

# What does non-custodial and permissionless mean?

Sovryn does not require you to send your Bitcoin to a centralized company, like BitMEX or Binance, in order to trade. With Sovryn, you send your BTC to a smart contract that allows you to keep custody of your private keys, allowing you to withdraw your funds at any time.
Sovryn is permissionless in the sense that no one can censor a transaction, ban your account or require you to undergo KYC before trading.

# Sovryn Individuals

Sovryn governance will be decentralized soon. Instead of shares, governed by laws and enforced by courts, Sovryn dequity (decentralized equity) will be governed by the blockchain and enforced by Bitcoin's POW.

## Bitocracy

The SOV Bitocracy is a distributed, pseudonymous governing body of stakeholders in the future of the Sovryn protocol and business.

![bitocracy](/assets/img/solutions/sovryn/bitocracy.png)

SOV token holders can make executable proposals if they possess enough voting power, vote on proposals during a predefined voting period and in the end evaluate the outcome. If successful, the proposal will be scheduled on the timelock contract. Only after sufficient time has passed can it be executed. A minimum voting power of 1% of SOV (1,000,000) is required for making a proposal as well as a minimum quorum.

In addition, SOV token holders can aggregate their governing power to a specific stakeholder (without transferring their SOV tokens) through delegation.

## Bitocracy Voting

- User requests to makes a code proposal.
- Governance contract checks the Staking contract to determine if the user has enough voting power.
- If the user has the required amount of voting power then the proposal is accepted by the Governance contract and all users with voting power are able to vote.
- Once the voting period is over and the proposal has been voted on, it is directly scheduled for execution and sits in the Timelock contract. The timelock setting decides on the waiting time.
- At the allocated time the proposal executes on the SOVRYN protocol.

# Smart Contract Safety and Audits

The Sovryn protocol smart contracts are periodically assessed by independent security auditors. You can see all audits [here](https://wiki.sovryn.app/en/technical-documents/audits).

# Try it now!

You can find the app at [https://live.sovryn.app/](https://live.sovryn.app/).

# Learn More

- [Library of DYOR](https://sovryn.app/library.html)
- [Sovryn Wiki](https://wiki.sovryn.app/)
- [Read the Blackpaper](https://docsend.com/view/mbhvi379crhagtwp)

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/z1iKPDXKjUo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<br/>

# Get in touch

- [Website](https://sovryn.app/)
- [Forum](https://forum.sovryn.app/)
- [Github](https://github.com/DistributedCollective)
- [Discord](https://discord.gg/J22WS6z)
- [Telegram](https://t.me/SovrynBitcoin)
- [Twitter](https://twitter.com/SovrynBTC)
- [Email](mailto:community@sovryn.app)
