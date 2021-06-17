---
layout: rsk
title: 'RSK Quick Start Guide | Overview'
description: 'Learn how to interact with RSK in your web browser, how to look at RSK transactions, develop and deploy your very first smart contract to the RSK network.'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, peer-to-peer, merged-mining, blockchain, powpeg
---

## What is RSK?

RSK’s full technology stack is built on top of Bitcoin:
From RSK smart contracts to the RSK Infrastructure Framework.
The stack is designed to create a more fair and inclusive financial system.

![RSK Stack](/assets/img/home/rsk-tech-stack-high-level.png)

Bitcoin, is a store and transfer of value.
The blockchain is secure because miners with high infrastructure and energy costs create new blocks to be added to the blockchain every 10 minutes. 
The more hashing power they provide, the more secure the network is.
RSK is the first open source smart contract platform that is powered by the bitcoin network. 
RSK’s goal is to add value and functionality to the bitcoin ecosystem by enabling smart-contracts, 
near instant payments, and higher-scalability.
RIF  is an all-in-one suite of open and decentralized infrastructure applications and services that enable faster, 
easier and scalable development of distributed applications (dApps) within a unified blockchain environment.

RSK is connected to Bitcoin in terms of how its blocks are mined,
and also in terms of a common currency.
RSK is also compatible with Ethereum in terms of its virtual machine (which executes smart contracts),
as well as the RPC (external API) that it exposes.
Let’s briefly look at each of these areas.

## Merged Mining: Layer 2 to Bitcoin layer 1

The bitcoin miners do what is known as [merged mining](/rsk/architecture/mining/), 
securing both networks with the same infrastructure and energy consumption.

![RSK Mining Animation](/assets/img/home/rsk-mining-animation-sprite.png)

They create blocks on the bitcoin network every 10 minutes,
including transfer of bitcoin from different addresses,
and in the process they create new bitcoins.
On RSK, blocks are created every 30 seconds,
to secure the execution of smart contracts.
This does not mint any new coins in the process, 
but does earn a reward from the merged mining.
Check out [mining.rsk.co](https://mining.rsk.co/) to learn more about mining.

> NOTE: The time between blocks on each network listed above are approximate values.

## PowPeg: 1-to-1 peg between BTC and RBTC

The second point of contact is the [Powpeg](/rsk/architecture/powpeg/).
This component connects both networks to allow the transfer of bitcoins to RSK, 
thereby allowing developers to interact with smart contracts. 
They pay gas using the same bitcoin, the smart bitcoin.
![Peg Animation Sprite](/assets/img/home/rsk-peg-animation-sprite.png)

To do so, you send bitcoin to a special address, 
where they are locked in the bitcoin network. 
Next, in the same address over in the RSK network, 
that same bitcoin is released to the user for use in the RSK network. 
This is called peg-in.
You can do the reverse operation called peg-out, 
by sending your bitcoin to a special address in the RSK network, 
and receiving your bitcoin back in the bitcoin network.

## EVM Compatible Smart Contracts

If you are familiar with smart contract development or dApp development using solidity, web3, and other compatible technologies; you might be excited to know that the RSK Virtual Machine (RVM) is compatible with the Ethereum Virtual machine (EVM). 
So you can use the same code, tools, and libraries when developing with RSK too. 
Thus, the smart contract/dApp development skills that you’re used to will transfer across quite nicely too!

### Tools

![RSK Tools](/assets/img/guides/quickstart/rsk-tools.png)

- [Truffle](https://www.trufflesuite.com/) is a development, testing, and deployment framework for smart contracts,
and is an essential tool among blockchain developers.
Truffle works well with RSK.
In fact, we have our own [Truffle Boxes](https://developers.rsk.co/tools/truffle/boxes/), 
which are templates or starter projects that are already configured to connect to RSK.

- [Ganache](https://www.trufflesuite.com/ganache) i is your personal (localhost-only) simulated blockchain that has been optimised for smart contract development. 
You can use this to run tests, execute commands, 
and inspect state during development. 
We recommend using a combination of Ganache and RSKj in Regtest mode for local development.

- [Metamask](https://metamask.io/) is a browser extension cryptocurrency wallet or mobile app, 
enabling users to interact with the RSK blockchain, 
including sending RBTC, sending RSK-based tokens such as RIF, 
and interacting with smart contracts deployed to the RSK network. 
See how to [configure MetaMask to connect to RSK](https://developers.rsk.co/wallet/use/metamask/).

- [Mocha](https://mochajs.org/) is a popular JavaScript test framework running on Node.js. 
Smart contract testing in Truffle occurs through a slightly modified version of Truffle. 
See [RSK Workshop: Javascript Testing](https://developers.rsk.co/tutorials/workshop-js-testing/) to see how to use it to test your smart contracts on RSK.

- [Solidity](https://docs.soliditylang.org/) is the most popular programming language for implementing smart contracts. 
The bytecode and ABI that the Solidity compiler, `solc`, outputs can be used to deploy and interact with smart contracts on RSK, 
thanks to the compatibility between RVM and EVM. 
See [The Complete Full Stack Guide on RSK](https://developers.rsk.co/guides/full-stack-dapp-on-rsk/part1-overview/) which will guide you through the process of developing and deploying a Solidity smart contract on RSK.

## Ethereum compatible JSON RPC

The set of remote procedure calls (RPCs) that RSK supports is largely the same as the RPCs supported by Ethereum. 
This is another layer of compatibility, 
in addition to the virtual machine implementation, 
which allows the same tools and libraries to be used.

## Differences with Ethereum: Checksums, derivation paths, gas prices

RSK is not 100% compatible with Ethereum: It has differences in the way checksums are calculated, 
the derivation path it uses, and how gas is calculated.

**Checksum differences**
- Different Ethereum-compatible networks differentiate themselves using “chain IDs”. 
- Each blockchain network has its own unique chain ID. 
- RSK uses the chain ID when calculating checksums for its addresses, 
whereas Ethereum does not take this into account. 
- Checksums in both networks are represented using capitalisation (uppercase and lowercase letters), 
so the “same” address will not pass checksum validations on both RSK and Ethereum.

**Derivation path differences**

Remembering or storing private keys for your crypto wallets can be super challenging, 
even for technical people. 
This is because these keys are essentially extremely large numbers. 
So to make things easier, the crypto community has come up with a technique called “HD wallets”, 
where using a seed phrase (a set of randomly chosen dictionary words), 
plus a “derivation path”. RSK and Ethereum have different derivation paths, 
therefore, the same seed phrase results in a different set of keys and addresses between RSK and Ethereum.

**Gas differences**

The EVM and RVM are compatible in that they support the same op-codes, 
and therefore can run the same smart contracts. 
However, the price of each op-code (measured in units known as gas) is different between EVM and RVM, 
thus the total gas consumed in various transactions is different. 
Further to that, gas units are multiplied by gas price to calculate the transaction cost. 
Since RSK’s gas price is denominated in RBTC and Ethereum’s gas price is denominated in Ether, 
there is another difference between gas prices on RSK and Ethereum.

----
**Further Reading**:

- About additional security and alerting systems for the merged mining process between RSK and Bitcoin, 
check out the [Armadillo guide](/guides/armadillo).
- About [merged mining](/rsk/architecture/mining/)
- About [PowPeg](/rsk/architecture/powpeg/)
- About [gas, and gas calculations](/rsk/rbtc/gas/)
- About [derivation path, checksum, and chain ID](/rsk/architecture/account-based/)
- About [Turing completeness](/rsk/architecture/turing-complete/)
- About [RSK Improvement Proposals](https://github.com/rsksmart/RSKIPs), many of which involve EVM compatibility
- About [the RPCs that are available](/rsk/node/architecture/json-rpc/), including documentation with sample requests and responses
- About [RSK public nodes](/rsk/public-nodes/), which expose RPC endpoints
