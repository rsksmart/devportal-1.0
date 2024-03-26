---
menu_order: 2100
menu_title: Envio
title: 'Envio - Solutions on Rootstock'
description: 'Connect envio to Rootstock.'
tags: envio, explorer, rootstock, blockchain, tutorial, rootstock
layout: 'rsk'
---

**For ecosystem listing:**

Envio is a modern, multi-chain EVM blockchain indexing framework speed-optimized for querying real-time and historical data.

Envio offers native support for Rootstock and has been designed to support high-throughput blockchain applications that rely on real-time data for their business requirements.

<div align="center"><img width="50%" src="/assets/img/solutions/envio/envio.png" alt="envio Solution"/></div>

## How it Works

Envio’s feature-rich indexing solution and data infrastructure provider for fast and flexible access to real-time and historical data for any EVM including Rootstock⚡.

<div align="center"><img width="90%" src="/assets/img/solutions/envio/envio-diagram.png" alt="envio Solution"/></div>

## About Envio

[Envio](https://envio.dev/) is a feature-rich indexing solution that provides developers with a seamless and efficient way to index and aggregate real-time or historical blockchain data for **any EVM,** including Rootstock. The indexed data is easily accessible through custom[ GraphQL](https://graphql.org/) queries, giving developers the flexibility and power to retrieve specific information.

Envio offers native support for Rootstock and has been designed to support high-throughput blockchain applications that rely on real-time data for their business requirements.

Designed to optimize the developer experience, Envio offers automatic code generation, flexible language support, quickstart templates, and a reliable, cost-effective hosted service.

Indexers on Envio can be written in[ JavaScript](https://www.javascript.com/),[ TypeScript](https://www.typescriptlang.org/), or[ ReScript](https://rescript-lang.org/).


## Envio HyperSync

Envio supports[ HyperSync](https://docs.envio.dev/docs/hypersync) on Rootstock mainnet.

HyperSync is an accelerated data query layer for the Rootstock blockchain, providing APIs that bypass JSON-RPC for 100x faster syncing of historical data. HyperSync is used by default in Envio's indexing framework, with RPC optional. Using HyperSync, application developers do not need to worry about RPC URLs, rate limits, or managing infrastructure. They can easily sync large datasets in a few minutes, something that would usually take hours or days using RPC.

HyperSync is also available as a standalone API for data analytic use cases. Data analysts can interact with the HyperSync API using JavaScript, Python, or Rust clients and extract data in JSON, Arrow, or Parquet formats. For more information, visit the HyperSync documentation[ here](https://docs.envio.dev/docs/overview-hypersync).


## Why choose Envio?

Envio stands out as a dev-friendly EVM-compatible blockchain data indexing solution empowering developers to reliably read and process real-time and historical smart contract events through a robust GraphQL API.

Envio supports indexing on Rootstock and **any EVM-compatible blockchain**, enabling Rootstock developers to:



* [Contract Import](https://docs.envio.dev/docs/contract-import): Autogenerate the key boilerplate for an entire Indexer project off a single or multiple smart contracts. Deploy within minutes.
* [Multi-chain Support](https://docs.envio.dev/docs/multichain-indexing): Aggregate data across multiple networks into a single database. Query all your data with a unified GraphQL API.
* [HyperSync](https://docs.envio.dev/docs/overview-hypersync): To ensure blazing-fast retrieval of historical on-chain data and a seamless developer experience, Envio’s HyperSync endpoint allows for 100x faster indexing than standard RPC. \

* [Asynchronous Mode](https://docs.envio.dev/docs/async-mode): Fetch data from off-chain storage such as IPFS or contract state (e.g. smart contract view functions). \

* Quickstart Templates: Use pre-defined indexing logic for popular OpenZeppelin contracts (e.g. ERC-20).

[Start building on Rootstock](https://envio.dev/app/login)


## Getting Started

Developers can choose whether they want to start from a template (e.g. Blank, ERC-20, etc.), or use the Contract Import feature: 


## Installation


### Prerequisites

The following are the prerequisite packages required for Envio:



* [Node.js](http://node.js) (use[ v18](https://nodejs.org/download/release/v18.18.0/) or newer)
* [pnpm](https://pnpm.io/installation) (use v8 or newer)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Docker is required specifically for running the Envio indexer locally.


### Install Envio

You can install Envio by running the command below:


```
npm i -g envio
```


Command to see available CLI commands for Envio.


```
envio --help
```


The following files are required from the user to run the Envio indexer:



* Configuration (defaults to config.yaml)
* GraphQL Schema (defaults to schema.graphql)
* Event Handlers (defaults to src/EventHandlers.* depending on the language chosen)

These files are auto-generated according to the template and language chosen by running the envio init command.


## Contract Import Tutorial

This walkthrough explains how to initialise an indexer using single or multiple contracts that are already deployed on a blockchain. This process allows a user to quickly and easily start up a basic indexer and a queryable GraphQL API for their blockchain application within a few minutes.


### Initialize your indexer

cd into the folder of your choice and run


```
envio init
```


Name your indexer


```
? Name your indexer:
```


Choose the directory where you would like to set up your project (default is the current directory)


```
? Set the directory:  (.) .
```


Select Contract Import as the initialization option.


```
? Choose an initialization option
  Template
> ContractImport
[↑↓ to move, enter to select, type to filter]
```



```
? Would you like to import from a block explorer or a local abi?
  Block Explorer
> Local ABI
[↑↓ to move, enter to select, type to filter]
```


The Block Explorer option only requires users to input the contract address and chain. This is the quickest setup if the contract is verified and deployed on one of the supported chains, as it will retrieve all needed contract information from a block explorer.

> _**📣Please note**: The Block Explorer option currently only supports networks with Etherscan. You can use the Local ABI option if the network doesn't have Etherscan._

Choosing Local ABI option will allow you to point to a JSON file containing the smart contract ABI. The Contract Import process will then populate the required files from the ABI.

**Specify the directory of the JSON file containing ABI**


```
? What is the path to your json abi file?
```


**Choose which events to include in the config.yaml file**


```
? Which events would you like to index?
> [x] ClaimRewards(address indexed from, address indexed reward, uint256 amount)
  [x] Deposit(address indexed from, uint256 indexed tokenId, uint256 amount)
  [x] NotifyReward(address indexed from, address indexed reward, uint256 indexed epoch, uint256 amount)
  [x] Withdraw(address indexed from, uint256 indexed tokenId, uint256 amount)
[↑↓ to move, space to select one, → to all, ← to none, type to filter]
```


**Specify which chain the contract is deployed on**


```
? Choose network:
 <Enter Network Id>
  ethereum-mainnet
  goerli
  optimism
  base
  bsc
> rootstock
v polygon
[↑↓ to move, enter to select, type to filter]
```


**Enter the name of the contract**


```
? What is the name of this contract?
```


**Enter the address of the contract**


```
? What is the address of the contract?
[Use the proxy address if your abi is a proxy implementation]
```


> _**📣Note**: if you use a proxy contract with an implementation, the address should be for the proxy._

**Select the continuation option**


```
? Would you like to add another contract?
> I'm finished
  Add a new address for same contract on same network
  Add a new network for same contract
  Add a new contract (with a different ABI)
[Current contract: BribeVotingReward, on network: rootstock]
```


The Contract Import process will prompt the user whether they would like to finish the import process or continue adding more addresses for the same contract on the same network, addresses for the same contract on a different network or a different contract.

For more information on the contract import feature, visit the documentation[ here](https://docs.envio.dev/docs/contract-import).


## Envio Indexer Examples

Click[ here](https://docs.envio.dev/docs/example-uniswap-v3) for Envio Indexer Examples.


## Get in touch

Indexing can be a rollercoaster, especially for more complex use cases. Our engineers are available to help you with your data availability needs.

For any technical queries or issues feel free to reach us at [hello@envio.dev](mailto:hello@envio.dev). 


## Resources



* [Landing page](https://envio.dev/)
* [Documentation](https://docs.envio.dev/docs/overview)
* [Blog](https://docs.envio.dev/blog)
* [GitHub](https://github.com/enviodev)


## Socials

* [Discord](https://discord.com/invite/Q9qt8gZ2fX) 
* [Hey](https://hey.xyz/u/envio.lens)
* [X (Twitter)](https://twitter.com/envio_indexer)
* [Reddit](https://www.reddit.com/r/Envio_indexer/)
* [LinkedIn](https://www.linkedin.com/company/envio_indexer)