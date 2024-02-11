---
menu_order: 400
menu_title: Compatibility
layout: rsk
title: 'EVM Compatible Smart Contracts and Ethereum Compatible JSON RPC'
description: 'Understand how Rootstock is compatible with EVM and other smart contract development tools'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, blockchain
---

## EVM Compatible Smart Contracts

If you are familiar with smart contract development or dApp development using solidity, web3, and other compatible technologies; you might be excited to know that the Rootstock Virtual Machine (RVM) is compatible with the Ethereum Virtual machine (EVM).
So you can use the same code, tools, and libraries when developing with Rootstock too.
Thus, the smart contract/dApp development skills that you’re used to will transfer across quite nicely too!

### Tools

- [Hardhat](https://hardhat.org/docs) is an Ethereum development environment designed for professionals. It's primarily used in the development of smart contracts for the Ethereum blockchain.
  Refer to the [Hardhat Overview](/tools/hardhat/) for an overview of how it's used on Rootstock.

- [Metamask](https://metamask.io/) is a browser extension cryptocurrency wallet or mobile app,
  enabling users to interact with the Rootstock blockchain,
  including sending RBTC, sending Rootstock-based tokens such as RIF,
  and interacting with smart contracts deployed to the Rootstock network.
  See how to [configure MetaMask to connect to Rootstock](https://developers.rsk.co/wallet/use/metamask/).

- [Mocha](https://mochajs.org/) is a popular JavaScript test framework running on Node.js.
  See [Rootstock Workshop: Javascript Testing](https://developers.rsk.co/tutorials/workshop-js-testing/) to see how to use it to test your smart contracts on Rootstock.

- [Solidity](https://docs.soliditylang.org/) is the most popular programming language for implementing smart contracts.
  The bytecode and ABI that the Solidity compiler, `solc`, outputs can be used to deploy and interact with smart contracts on Rootstock, thanks to the compatibility between RVM and EVM.
  See [The Complete Full Stack Guide on Rootstock](https://developers.rsk.co/guides/full-stack-dapp-on-rsk/part1-overview/) which will guide you through the process of developing and deploying a Solidity smart contract on Rootstock.

## Ethereum Compatible JSON RPC

The set of remote procedure calls (RPCs) that Rootstock supports is largely the same as the RPCs supported by Ethereum.
This is another layer of compatibility, in addition to the virtual machine implementation, which allows the same tools and libraries to be used.

