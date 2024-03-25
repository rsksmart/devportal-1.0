---
layout: rsk
menu_title: FAQ
menu_order: 200
title: Frequently Asked Questions
tags: knowledgebase, rsk, faqs, help, support, rootstock
description: "Welcome to Rootstock and RIF Knowledge-base; Explore the Rootstock faqs section"
render_features: 'collapsible'
---

Here are some frequently asked questions about the Rootstock and RIF Platform.

## About Rootstock
[](#top "collapsible")
  - What is Rootstock?
    * Rootstock is an open-source smart contract platform that runs on the Bitcoin network. It allows users to create and deploy blockchain solution on the Bitcoin network using its native RBTC token.
  - What is a smart contract?
    * Smart contracts are digital agreements stored on a blockchain network such as Rootstock and executed automatically without intermediaries. A smart contract allows for the digital representation of physical entities, which can be controlled, exchanged, and transferred without interference. Smart contracts are usable in various use cases, such as lending, voting, decentralized payments and exchanges, asset tokenization, supply chain tracking, insurance, crowdfunding, escrow, and tenders.
  - What is the purpose of Rootstock?
    * The Bitcoin network is plagued by long transaction confirmation times and network congestion. By allowing some other tasks to be performed on a sidechain, Rootstock aims to enable faster, cheaper, and more scalable transactions than Bitcoin while preserving the security and decentralization of the Bitcoin network. Rootstock also seeks to foster innovation and the development of decentralized applications (dApps) that can leverage the Bitcoin ecosystem.
  - Is the Rootstock network compatible with the Ethereum network?
    * Rootstock is compatible with Ethereum at the following layers:
    - EVM compatibility
    - Interprocess connectivity in JSON-RPC
    - Smart contract programming in Solidity
    - JavaScript interface with web3.js
    The Rootstock virtual machine is highly compatible with the Ethereum Virtual Machine (EVM). Approximately annually, the Ethereum community performs a hard fork to add new functionalities to the blockchain. The Rootstock community also performs a corresponding hard fork to maintain devoted compatibility with the EVM.
    Additionally, RSKVM offers improved features over EVM, such as bridging with Bitcoin, which can be enjoyed by effecting some changes in a native EVM smart contract source code.
  - Do you plan to support smart contract programming languages other than Solidity?
    * Rootstock currently supports all the opcodes and precompiles contracts of Ethereum, and therefore, it can support any language that compiles to the EVM. This includes Solidity, Julia, and new or experimental programming languages like Vyper.
  - What is the current state of the Rootstock project?
    * As of March 2024, the latest released version of Rootstock is the [Arrowhead v6.0.0](https://github.com/rsksmart/rskj/releases), an update that introduces several features on bringing Ethereum compatibility enhancements to the Rootstock virtual machine and a set of performance optimizations in the 2-way peg protocol.
    [Live statistics](https://stats.rootstock.io/) about the entire Rootstock network are available at Rootstock Stats, and all the necessary source codes can be found at the Rootstock GitHub organization: [github.com/rsksmart](https://github.com/rsksmart). Other information about the Rootstock project, including a [getting started guide](/guides/quickstart/), can be found on the Rootstock & RIF Developer Portal.
    For the latest news and updates, check out the Rootstock Blog.
  - How does Rootstock plan to be a reference in terms of smart contracts?
    * Since its inception, security and scalability have been, and will continue to be, Rootstock's key competitive advantages. With a deep understanding of scalability as a significant obstacle in driving blockchain adoption, The IOVLabs innovation & research team will keep working on efficient solutions that make it seamless to port between the Ethereum and Bitcoin blockchains through the Rootstock network. This is what Rootstock aims to be referenced as in terms of smart contracts.
  - How is Rootstock approaching node diversity?
    > - How many nodes does a healthy protocol need?
    > - Rootstock places a higher value on node diversity and independence than node quantity. Even though a few hundred Rootstock nodes can support a global cryptocurrency network now, we prioritize more variety and autonomy among node operators. That's what decentralization means: don't trust, verify yourself. IOVLabs has created incentives for running full nodes and reduced their resource needs with the Unitrie proposal. We also have plans for light clients to enable mobile nodes. We want the Rootstock network to be secure and scalable in the long run, with both quality and quantity of nodes.
  - Where can I find the Rootstock Whitepaper?
    - You can find the [Original Whitepaper](https://rootstock.io/static/163f032d63d561e4c2fd7befe01d3e4e/rsk_white_paper-original.pdf) or the [Updated Whitepaper](https://rootstock.io/static/a79b27d4889409602174df4710102056/RS-whitepaper.pdf).

## Rootstock vs Other Platforms
[](#top "collapsible")
  - How is Rootstock different from Liquid?
    - While Rootstock and Liquid are Bitcoin sidechains, they have different goals and features. Rootstock is a smart contract platform highly compatible with Ethereum, while Liquid is a federated sidechain that aims to provide fast and secure inter-exchange settlement. 
    - Some of the main differences are:
    - Consensus mechanism: Rootstock uses merge-mining with Bitcoin, which means that Rootstock blocks are secured by the same hashing power as Bitcoin. Liquid uses a federation of trusted functionaries that validate and sign blocks. Rootstock’s merge-mining is more decentralized and thermodynamically secure than Liquid’s federation.
    - Smart contract capabilities: Rootstock supports Turing-complete smart contracts and has a virtual machine almost identical to Ethereum’s. This allows developers to use the same tools, libraries, and languages as Ethereum and port existing applications to Rootstock. Liquid has a simpler scripting system that is not Turing-complete and only supports a limited set of use cases, such as atomic swaps and multisig transactions.
    - Peg mechanism: Rootstock’s two-way peg is based on a smart contract that locks and unlocks bitcoins on both chains, using SPV proofs and a PowPeg Federation. Liquid’s two-way peg is based on a multisig wallet controlled by the functionaries, using a hardware security module (HSM) and an emergency recovery system. Rootstock’s peg is more open and accessible to individual users, while Liquid’s peg is faster and more convenient for exchanges.
    - Scalability: Rootstock can achieve a higher transaction throughput than Liquid because Rootstock’s transactions are smaller and have a lower block time. Rootstock also has several scalability proposals, such as parallel transaction processing, transaction compression, and the Lumino network, a second-layer payment network similar to Lightning. Liquid relies on its federated model and HSMs for fast and secure transactions.
  - How is Rootstock different from Truthcoin’s drivechain?
    * Rootstock and Truthcoin aim to enable smart contracts on the Bitcoin network using a sidechain mechanism called drivechain. However, there are some notable differences in their design and implementation. These include:
    - Sidechain governance: Rootstock uses a decentralized model of sidechain governance, where the miners of the mainchain (Bitcoin) have the power to validate and activate the sidechain transactions and withdrawals. The miners can also vote on the sidechain parameters, such as the block gas limit and the difficulty adjustment. Truthcoin uses a hybrid model of sidechain governance, where the functionaries of the sidechain (Truthcoin) have the power to validate and activate the sidechain transactions and withdrawals. Still, the mainchain miners can veto their actions if they are malicious or fraudulent. The functionaries are also responsible for setting the sidechain parameters and resolving disputes in the prediction markets.
    - Sidechain security: Rootstock uses a merge-mining technique that allows the sidechain to leverage the hash power of the mainchain and achieve a high level of thermodynamic security. Rootstock can reach up to 100% of Bitcoin’s hash rate, making it resistant to attacks. Truthcoin uses a blind-merge-mining technique that allows the sidechain to use the hash power of the mainchain, but without requiring the mainchain miners to be aware of the sidechain.
  - How is Rootstock different from Lightning?
    * Rootstock and Lightning are both layer-2 solutions that aim to improve the scalability and functionality of Bitcoin, but they have different approaches and trade-offs. Some of the main differences are:
    - Architecture: Rootstock is a sidechain connected to the Bitcoin mainchain through a two-way peg mechanism, allowing users to lock and unlock bitcoins on both chains. Lightning is a network of payment channels built on top of the Bitcoin mainchain, allowing users to send and receive bitcoins off-chain.
    - Smart contracts: Rootstock supports Turing-complete smart contracts and is compatible with the Ethereum Virtual Machine, which enables a wide range of decentralized applications and use cases on the Bitcoin network. Lightning only supports simple scripts, and transactions are mainly focused on fast and cheap payments.
    - Security: Rootstock is secured by merge-mining with Bitcoin, which means that Rootstock blocks are validated by the same miners and hash power as Bitcoin. The Bitcoin mainchain, the ultimate arbiter and enforcer of the payment channel states secure Lightning. Rootstock has a higher level of thermodynamic security than Lightning, as it can leverage up to 100% of Bitcoin’s hash rate. At the same time, Lightning relies on the cooperation and honesty of the channel participants.
  - How does Rootstock compare with Ethereum?
    - **Is the Rootstock chain growing at the same speed as Ethereum?**
    > - In terms of blockchain size, Rootstock has less on-chain activity than Ethereum, which is something you would expect for a younger blockchain. Therefore, the blockchain is much smaller than Ethereum. However, before the 1.0.0 release, the Rootstock blockchain could grow as fast as Ethereum for equal transaction volumes. With the advent of the Unitrie, part of the 1.0.0 release, the blockchain state is ten times smaller. For example, the last world-state consumes no more than 50 mbytes. The current Ethereum state consumes about 130 GB. That’s 2600 times more.


## Rootstock and RIF Token
[](#top "collapsible")
  - What is the RIF token, and what is its purpose?
    * The RIF token is a cryptocurrency that powers the Rootstock Infrastructure Framework (RIF), a set of open-source, decentralized tools and technologies that make it easy to build accessible DeFi products and services on the blockchain. The RIF OS includes support for off-chain payment networks, APIs for secure communication, and an easy-to-use interface for developers. The RIF token is the means of access and payment for all the services offered by the RIF OS, such as Identity, Payments, Gateways, Storage, and Communications, including third-party-developed infrastructure services and any other apps that might be deployed on RIF’s framework that agrees to accept RIF Tokens as a means of accessing/consuming the service or app. See the [RIF Whitepaper](https://rootstock.io/static/6c63424b1adab118667c0f85b44c6d65/rif-whitepaper-en.pdf)
  - What is the RBTC token, and what is its purpose?
    * Smart Bitcoin (RBTC) is the native token of the Rootstock network. RBTC is pegged 1:1 to BTC, enabling merge-mining on the Rootstock and Bitcoin networks. It can be converted to and from BTC through the federated PowPeg mechanism.
    RBTC is used as gas to pay for executing transactions and smart contracts on the Rootstock network, rewarding miners and nodes, enabling interoperability among Bitcoin-based applications, and supporting the development of new solutions that use the Rootstock and RIF ecosystems.
  - How is the RIF token different from RBTC?
    - The RIF token is different from RBTC in the following ways:
    > - Purpose: RBTC is the native token of the Rootstock network used to maintain a one-to-one relationship with Bitcoin. It is also used as gas to pay for smart contract execution and transaction fees on the network. RIF is a utility token used to access the services of the RIF OS protocols, such as identity, payments, gateways, storage, and communications.
    > - Portability: RBTC is pegged 1:1 to BTC and can be converted to and from BTC using the 2-way peg mechanism. RIF is an ERC20-compatible token that can be transferred across smart contract platforms.
    > - Supply: RBTC has the same supply as BTC, which is capped at 21 million. RIF has a fixed supply of 1 billion tokens, which were pre-mined and distributed according to a token sale and an allocation plan.
  - How can I obtain RBTC and RIF tokens?
    * You can get RBTC by converting through BTC through the [PowPeg mechanism](/rsk/architecture/powpeg/). However, this requires that you get a Rootstock node. A faster and easier way to get either RBTC or RIF tokens is to buy from supported centralized and decentralized exchanges. See [How to easily convert your BTC to RBTC](https://youtu.be/02M2lg80NbM?si=JB5cx59lNGTxXt2c) with the PowPeg.
  - Why is RBTC listed in exchanges?
    * RBTC is listed in exchanges to make it easier for less technical users to access it. It takes almost a day to transfer BTC to RBTC using the peg. Users need at least small amounts of RBTC to pay for transaction fees required for smart contract execution. Exchanges help to cater to the expected growth in demand for RBTC.
  - How does the RIF token accrue value?
    * The RIF token accrues value by providing access to the RIF services, a set of decentralized tools and technologies for building DeFi products and services on the blockchain. RIF is neutral to any smart contract platform, such as Rootstock, Ethereum, or EOS, and its price depends on the supply and demand of the RIF services. The RIF token can be easily converted to and from the native currencies of the platforms where the RIF services are integrated, such as RBTC, ETH, or EOS, using DEXs (Decentralized Exchanges). The RIF token enables interoperability and innovation among different crypto-economies and brings the Internet of Value closer to reality. It is a portable and beneficial token for the decentralized ecosystem.
  - How does the peg work?
    * When a Bitcoin user wants to use the 2-Way Peg, he sends a transaction to a multisig wallet whose funds are secured by the PowPeg Federation. The same public key associated with the source bitcoins in this transaction is used on the Rootstock chain to control the Smart Bitcoins. This means that the private key that controls the Bitcoins in the Bitcoin blockchain can be used to control an account on the Rootstock chain. Although both public and private keys are similar, each blockchain encodes the address in a different format. This means that the addresses on both blockchains are different.
  - What wallets support Rootstock and RIF tokens?
    * Rootstock is currently supported in several different software hardware wallets. Check the [RBTC](/guides/get-crypto-on-rsk/) and [Wallets](/develop/wallet/) pages for more information.

## Rootstock Features and Functionality
[](#top "collapsible")
  - What is merged mining, and how does it secure the Rootstock network?
    * Merged mining is a technique that allows miners to mine two or more blockchains simultaneously, using the same hash power and without compromising the security of either chain. The Rootstock network is merge-mined with the Bitcoin network and designed such that merge-mining with Bitcoin does not pose any performance penalty to Bitcoin miners. Therefore, merge miners can earn rewards on both Rootstock and Bitcoin simultaneously.
    The merge-mining process secures the Rootstock network by leveraging the hash power of the Bitcoin network, the largest and most secure blockchain in the world. By doing so, Rootstock achieves high decentralization, reliability, and immutability for its smart contracts and transactions.
  - What consensus protocol does Rootstock use, and how does it prevent attacks?
    * Rootstock uses DECOR+, a unique variant of Nakamoto Consensus, with the capability to merge mine with Bitcoin or any other blockchain, sharing the Bitcoin block format and proof-of-work.
    The proof-of-work (PoW) consensus mechanism requires miners to solve a cryptographic puzzle to create new blocks and validate transactions. This prevents attacks by making it costly and difficult for malicious actors to alter the blockchain or create fraudulent transactions. PoW also ensures that the longest and most secure chain is always valid.
  - What is the Rootstock Transactional throughput?
    * The block gas limit and the average block rate determine the number of transactions per second executable on the Rootstock platform. The current average block rate is one block every 30 seconds. The miner can vote to increase the block gas limit at each mined block. Currently, the block gas limit is 6.8M gas units per block. A simple RBTC transaction consumes 21K gas, so the Rootstock platform can execute 11 transactions per second today. This limit could increase as several improvement proposals, such as the RSKIP04 and LTCP protocol, propose improvements that can lower the resources required to process transactions on the Rootstock network.
  - What is the average transaction confirmation time of Rootstock, and how many confirmations are required?
    * On average, the network currently generates a block every 30 seconds. Miners can reduce the average block time to 15 seconds by optimizing their merge-mining operations. Systems that receive payments over Rootstock in exchange for a good or service outside the Rootstock blockchain should wait a variable number of confirmation blocks, depending on the amount involved in the payments. A minimum of 12 confirmations is recommended, corresponding to an average delay of 6 minutes.
  - How many transactions per second will the Rootstock network withstand?
    * Beta releases of improved Rootstock nodes have been tested to accommodate 100 tx/s without incident. As the technology improves, transactions per second may similarly increase. The goal of Rootstock is to reach up to 20,000 tx/sec using its Lumino technology, a second layer off-chain payment network embedded on its reference node in the following release.
    How does Rootstock protect its network from resource exhaustion attacks?
    The Rootstock “gas system” prevents attackers from creating, spreading, and including resource-intensive transactions in blocks without paying the associated fees. Every resource, including CPU, bandwidth, and storage, is accounted for by the consumption of an amount of gas. Every block has a gas limit, so the resources a block can consume are limited, making a resource exhaustion attack ineffective.
  - Is Rootstock secure from miners abusing the gas system to acquire resources cheaply, as in Ethereum?
    * On Ethereum, a miner can include transactions specifying zero gas price, thus acquiring persistent contract state memory almost for free (if there is no transaction backlog). On Rootstock, a high percentage of the transaction fees go into a reward pool for future miners, a small fraction of the transaction fees are burned, and the miners negotiate a minimum gas price. Therefore, rogue miners cannot get platform resources at no cost.
    What is the address format of Rootstock, and how is it different from Bitcoin?
    A Rootstock address is an identifier of 40 hexadecimal characters, while a Bitcoin address is an identifier of 26-35 alphanumeric characters. There are RSKIP proposals that suggest using different address types in the future.
  - Is there a correlation between BTC addresses and Rootstock addresses despite them looking like ETH addresses?
    * Rootstock addresses are similar to Ethereum addresses. To avoid situations where users mistakenly send funds to Ethereum addresses or vice versa, we’ve implemented an address checksum mechanism that distinguishes between chains. This is currently in use by many Ethereum-like networks. Although this is not enforced in the node itself, it’s important to consider it at the client level (e.g., wallets). The checksum mechanism is described in the RSKIP60 Rootstock Improvement Proposal.


## Rootstock and RIF Services
[](#top "collapsible")
  - What is RIF OS, and what are its goals?
    * [RIF OS](/rif/) is a suite of open and decentralized infrastructure protocols that enable faster, easier, and more scalable distributed application development (dApps) within a unified environment. RIF OS is built on the Rootstock smart contract network, the first general-purpose smart contract secured by the Bitcoin network. RIF OS includes support for decentralized, third-party, off-chain payment networks; a set of APIs for seamless and secure communications between decentralized applications; and easy-to-use interfaces for developers.
    RIF OS aims to bridge the gap between blockchain technologies and their mass-market adoption by providing developers and users access to various services across multiple crypto-economies.
  - What exactly is the value proposition of RIF?
    * RIF OS is a suite of open, decentralized infrastructure protocols that enable faster and scalable distributed application development. RIF token is useful for accessing all the services provided in the RIF OS ecosystem and as collateral for service providers on the RIF Marketplace. In the long term, RIF OS aims to be a unified Marketplace for off-chain infrastructure services that every major Smart Contract-enabled crypto-economy can consume.
  - What is RIF Name Service?
    > - RIF Name Service (RNS) is a protocol that enables the identification of blockchain addresses by human-readable names or aliases. It can identify other personal resources, such as payment or communication addresses, smart contracts, and Non-Fungible Tokens (NFTs). 
    RNS makes interacting with blockchain resources easier and more user-friendly and enhances interoperability across different platforms. 
    > - You can learn more about [RNS](https://dev.rootstock.io/rif/rns/guide/getting-started/).
  - Can I register a domain in RNS and then sell it in a secondary market?
    * Anyone registering a domain in RNS can sell the domain directly or using a third-party secondary market. 
  - What is RIF Lumino, and how does it enable off-chain payments on Rootstock?
    * RIF Lumino is a layer-2 solution that enables fast and cheap off-chain payments on the Rootstock network. RIF Lumino allows users to create payment channels in any ERC20 token deployed on Rootstock and transact with other users without broadcasting every transaction to the blockchain. RIF Lumino uses a network of nodes that relay payments and ensure validity. RIF Lumino is compatible with other off-chain payment networks, such as Lightning, and aims to achieve interoperability and scalability for the Bitcoin ecosystem.

## Rootstock Security and Scalability
[](#top "collapsible")
  - What is the PowPeg Federation, and what is its role in the two-way peg?
    - The PowPeg Federation is a group of functionaries that run specialized hardware called PowHSMs to facilitate the transfer of bitcoins between the main chain and the side chain and protect the bitcoins locked in the two-way peg between Rootstock and Bitcoin. The PowPeg Federation does not directly control the private keys of the Bitcoin multisig but only signs transactions that are proven valid by enough cumulative work. The PowPeg Federation also provides a watch tower service to inform the Rootstock Bridge smart contract about peg-in transactions. The PowPeg Federation's role is to keep their hardware and nodes connected and alive at all times and to audit the changes in the PowHSM, the Powpeg node, and the communication between them.
  - What is the Armadillo monitoring systems?
    - **How does it protect the Rootstock network from malicious miner?**
    > - The Armadillo monitoring system is a tool that detects and alerts about potential attacks on the Rootstock network. It uses the Rootstock network's block headers and the Bitcoin network's coinbase information to measure the percentage of honest merge-mining. If the percentage drops below 50%, most miners could be trying to attack the Rootstock network by creating a hidden chain or censoring transactions.
    > - The Armadillo system protects the Rootstock network from malicious miners by providing timely and accurate information to the nodes and the community. The Rootstock nodes can use the Armadillo data to adjust their security parameters and reject blocks that are not sufficiently visible. The community can use the Armadillo data to monitor the network's health and take actions to mitigate the risk of an attack.
  - What is the Rootstock virtual machine, and how is it compatible with Ethereum?
    - The Rootstock virtual machine (RVM) is the core of the Rootstock smart contract platform. The RVM is a forked version of the Ethereum virtual machine (EVM), meaning it can execute the same bytecode and opcodes as the EVM. The RVM is compatible with Ethereum smart contracts and the tools used to deploy and interact with them, such as Solidity, Truffle, Remix, etc. The RVM also has features such as native support for Bitcoin opcodes, precompiled contracts for elliptic curve cryptography, and a performance improvement pipeline.
  - What is the Rootstock two-way peg, and how does it work?
    - The Rootstock two-way peg is a protocol that allows users to transfer bitcoins from the Bitcoin blockchain to the Rootstock blockchain and back, creating a token called rBTC that is pegged to the value of Bitcoin. The Rootstock two-way peg works by locking bitcoins in a multi-signature address on the Bitcoin side and releasing an equivalent amount of rBTC on the Rootstock side. The reverse process is also possible by burning rBTC on the Rootstock side and unlocking bitcoins on the Bitcoin side. A group of reputable organizations controls the multi-signature address called the PowPeg Federation, which uses special hardware devices called PowHSMs to protect private keys and validate transactions. The PowHSMs only sign transactions approved by both the Rootstock and Bitcoin networks using a proof-of-work mechanism. This way, the Rootstock two-way peg ensures high security and decentralization for the peg-in and peg-out transactions.