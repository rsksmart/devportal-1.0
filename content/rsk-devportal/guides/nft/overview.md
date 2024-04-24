---
menu_order: 200
menu_title: Overview
title: 'Deploy an NFT project on the Rootstock Testnet | Rootstock (RSK)'
description: 'Learn about NFTs, create, connect, and deploy to the Rootstock Blockchain.'
tags: NFTs, tutorial, overview, guides, tokens, web3, bitcoin, rsk, rootstock, peer-to-peer, blockchain, nft, ERC-721, smart-contract, hardhat, ethersjs, ipfs, metamask, testnet, pinata
layout: 'rsk'
---

**We will do the following in this tutorial.**

* A brief introduction to NFTs, and ERC-721
* Setting up your environment
* What is IPFS? 
* How to set up your Pinata account
* Create NFT metadata (JSON File)
* Create ERC 721 smart contract 
* Deploy smart contract on the Rootstock blockchain


### Prerequisites 

To follow this tutorial, you should have knowledge in:

* Smart contract fundamentals using Solidity 
* JavaScript
* Command line
* Git 

If you are not familiar with the above, it will be advisable to learn the basics by clicking the links above, before proceeding with this tutorial on how to create and deploy your NFT project to the Rootstock Testnet.

### What is a Non-fungible Token (NFT)?

Fungibility, is about whether something is interchangeable and divisible.
A fungible token has both of those properties,
and behave in a manner similar to fiat cash;
whereas a non-fungible token is
neither interchangeable nor divisible,
and behave in a manner similar to many real world objects.

ERC-20 is the most commonly used technical standard for fungible tokens (FTs);
and ERC-721 is the most commonly used technical standard for non-fungible tokens (NFTs).

Non-fungible is a term used to describe digital assets that represent real world objects like art, furniture, a song file, in-game items, your computer or even real estate. Unlike ERC-20 tokens, tokens that are created under ERC-721 are not interchangeable, this comes from the fact that while two NFTs may look identical to each other, they both hold unique information. Non-fungible tokens also lack another feature of their ERC-20 counterparts – they are not divisible, which means that you cannot own a portion of an NFT.

**NFTs can be used in the following use cases:**

* **Medical Records and Identity Verification** - NFT ledgers can store an individual’s medical records without compromising confidentiality or risking tampering from external sources 
* **Real Estate** - NFTs could be used to transfer land deeds, provide proof of ownership and even keep track of changes in property value over time using timestamped NFTs.
* **Ensuring Authenticity of Products** - NFTs can be used to ensure that the product you are purchasing is authentic. NFTs can also be used to store information about the manufacturing process, ensuring that everything is fair trade
* **Academic Credentials** - NFTs are also a good way to represent academic credentials. NFTs can provide proof of attendance, degree earned, and other important information which will be stored on the NFT chain that cannot be altered or hacked into.
* **Gaming Industry** - NFTs can be integrated into the gaming world by allowing NFT cross-platform playability.

### What is ERC-721?

[ERC-721](https://docs.openzeppelin.com/contracts/3.x/erc721#:~:text=ERC721%20is%20a%20standard%20for,across%20a%20number%20of%20contracts.) is a standard for representing ownership of non-fungible tokens, where each token is unique. It provides functionalities like to transfer tokens from one account to another, to get the current token balance of an account, to get the owner of a specific token and also the total supply of the token available on the network. 

[EIP-721](https://eips.ethereum.org/EIPS/eip-721) is a standard interface for non-fungible tokens.

### Setting up your Development Environment

### What is Hardhat?

Hardhat is a development environment that enables you to compile, deploy, test, and debug your Rootstock software. It helps to manage and automate the recurring tasks that are inherent to the process of building Blockchain applications.

Check out this step-by-step tutorial on [how to set up a Hardhat project to connect to the Rootstock Testnet](https://developers.rsk.co/kb/hardhat-setup-on-rsk/).

### What is ethers.js?

Ethers.js is a JavaScript library that allows developers to interact with the blockchain. The library includes utility functions in JavaScript and TypeScript, and can also support wallets.

### What is tRBTC (Smart Bitcoin in Testnet)?

The Test Smart Bitcoin (tRBTC) is the token used to pay for the execution of transactions in the Rootstock Testnet environment.

Watch this video tutorial on [How to Get tRBTC from the Rootstock Testnet Faucet](https://www.youtube.com/watch?v=twfK8Rd5hak). 

### What is IPFS?

IPFS (Interplanetary File System) is a file system/protocol for storing and sharing content, it allows you to store files, keeping track of them on a distributed network. This storage system allows direct interaction through a secure and global P2P network.

IPFS files are content-addressable. This means that it uses content identifiers, or CIDs, as a label to point to material in IPFS. These CIDs are based on the contents of the files themselves, and may be thought of as *hashes*. It doesn't indicate where the content is stored, but it forms a kind of address based on the content itself. This property makes IPFS a suitable platform for referencing images within smart contracts. We will use IPFS to host/store our NFT images.

## Next

Be sure to check out our next article in this series,
about how to configure your NFT metadata, [Configure NFT Metadata](/guides/nft/configure-nft-metadata/)

----

If you would like to delve deeper, here are some resources and tools that we recommend.

**Resources**

- [Visit Our Developers Portal](https://github.com/rsksmart/devportal) 
- [Rootstock Global Discord Community](https://rootstock.io/discord)
- [Rootstock Youtube](https://www.youtube.com/channel/UCYQSvSaqX8Q-XMbQmUG0yJg)