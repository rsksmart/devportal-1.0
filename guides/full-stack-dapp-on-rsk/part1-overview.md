---
layout: rsk
title: The Complete Full Stack dApp Guide on RSK - Part 1:Overview
description: 'Build a complete full stack decentralized application on RSK, from front-end to smart contracts'
tags: the-complete-full-stack-dapp-guide, full-stack, dapp, tutorial, overview, front-end, guides, smart-contracts, web3, bitcoin, rsk, peer-to-peer, dapp-examples, blockchain
---

A Step by Step Guide on how to build, test, and deploy a complete decentralised application (dApp) on RSK.

- **Programming languages**: Solidity and Javascript
- **Development tools**: Truffle and Mocha

![The Complete Full Stack dApp guide](/assets/img/guides/complete-full-stack-dapp/Fullstack-tutorial2.jpg)

## Overview
RSK is the most secure smart contract network in the world and enables decentralized applications secured by the Bitcoin Network to empower people and improve the quality of life of millions.

In this full stack dApp guide, we're going to cover how to build decentralised applications, and deploy them on the RSK network. We will cover topics such as essential blockchain concepts, the development environment, how to develop smart contracts, the user interface (front end), and automated testing.

In this article, part 1, we'll explain complex blockchain concepts such as smart contracts, dApps, web3, et cetera.

## Prerequisites

- Knowledge of how the Web works
- Knowledge of the command line
- Knowledge of HTML and CSS

## What is a Decentralized Application (dApp)?

![dApp architecture](/assets/img/guides/complete-full-stack-dapp/dapp architecture.jpg)

To understand the architecture of a dapp, you will need to understand how the web works. A web application runs on a cluster computers but is mainly controlled by a single person or company which makes it centralized, while a decentralized web application runs on a peer to peer network of computers. You might want to think of a dApp as having no central server which runs on multiple computers and is not controlled by a single person or company. Similarly, In centralized software systems, the components are located around and connected with one central component. In contrast, the components of distributed systems form a network of connected components without having any central element of coordination or control. 
This is illustrated in the image below;

![Centralized Vs Decentralized Web Application](/assets/img/guides/complete-full-stack-dapp/Central&Decentral.png)

> On the left-hand side in the image above, a distributed architecture is illustrated where components are connected with one another without having a central element. It is important to see that none of the components is directly connected with all other components. However, all components are connected with one another at least indirectly. The right-hand side illustrates a centralized architecture where each component is connected to one central component. The components are not connected with one another directly. They only have one direct connection to the central component.


## What Is A Smart Contract?

![Smart Contract](/assets/img/guides/complete-full-stack-dapp/smart contracts.png)

Smart contracts are simply computer programs that execute autonomously. It eliminates the need for a middleman, it is simply a self executing contract which contains terms and conditions of agreement between parties, these terms and conditions are represented in code.

When a smart contract is stored and executed on a blockchain, it inherits the tamper-proof and tamper-evident properties that are vital for parties interacting with it to have confidence in them.

A real world example of the use of smart contracts is in Supply Chain and Tracking, as a distributor you can use smart contracts to sell and distribute your products all over the world. The code behind the smart contract can track the location of your products, so you can trace them as they change hands throughout the supply chain. Many aspects of the supply chain can be replaced by a smart contract, making the entire system more efficient and more fraud resistant. 

## What is web3?
 
![History of The Web](/assets/img/guides/complete-full-stack-dapp/Web3_History.png)

web3.js is a collection of libraries that allow you to interact with a local or remote ethereum node using HTTP, IPC or WebSocket. It represents a JavaScript language binding for Ethereum JSON RPC interface, which makes it directly usable in web technology, as JavaScript is natively supported in almost all web browsers. Web3.js can be used to connect to the RSK network via any RSK node that allows access via HTTP.

One common way of integrating a web browser application with RSK is to use the [Metamask](https://metamask.io/) or [Nifty](https://www.poa.network/for-users/nifty-wallet) browser extension in combination with Web3.js. Metamask is an in-browser Ethereum wallet that injects a Web3 provider object into the browser. A Web3 provider is a data-structure providing a link to publicly accessible RSK nodes. Using Metamask allows users to manage private keys and sign transactions within their web browser. Using these browser extensions in combination with Web3.js, in a web interface, makes for a convenient way to interact with the RSK network.

![Web3 with RSK](/assets/img/guides/complete-full-stack-dapp/Web3RSK-PixTeller.png)

This image above illustrates how a web application using web3.js library connects to the RSK Node through a JSON RPC Client.


## dApp Architecture

The image above illustrates the architecture of a dApp. dApps are decentralized applications that runs on a [peer-to-peer](https://en.wikipedia.org/wiki/Peer-to-peer) network of computers unlike traditional web apps that runs on centralized servers as shown in the image above. When these dapps are built over the RSK network, they are known as “RSK dApps”. In decentralized apps, all the users’ data is stored on immutable distributed ledger (Blockchain) and every participating node has a copy of that ledger. 

The logic for the dApps are stored on the blockchain as bytecode, and this logic may be executed when transactions are executed on the blockchain. A developer does not usually write byte code directly, and instead writes in a high level language, most commonly used is the Solidity Language, which is traditionally called Smart Contracts.


## dApps on RSK

There are many dApps deployed on RSK,
see them on [Use Cases](https://www.rsk.co/Use-cases).

Kudos for getting this far! 

**Next:** Let's get started building a complete decentralised application on RSK in [The Complete Full Stack dApp Guide on RSK Part 2: Smart Contract](/guides/full-stack-dapp-on-rsk/part2-smart-contracts/)

Further Reading!
- [How Smart Contracts Work](https://www.dummies.com/personal-finance/smart-contracts-work/)

----

[Visit Our Developers Portal](https://github.com/rsksmart/devportal) |
[Contact us on Gitter](https://gitter.im/rsksmart/getting-started) |
[Visit our Webinars Section](https://developers.rsk.co/webinars/)
