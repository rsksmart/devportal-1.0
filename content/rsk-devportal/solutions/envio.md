---
menu_order: 2100
menu_title: Envio
title: 'Envio - Solutions on Rootstock'
description: 'Connect Envio with Rootstock'
tags: envio, rootstock, tutorial,blockchain
layout: 'rsk'
---

Envio is a modern, multi-chain EVM blockchain indexing framework speed-optimized for querying real-time and historical data. Envio offers native support for Rootstock and has been designed to support high-throughput blockchain applications that rely on real-time data for their business requirements.

<div align="center"><img width="50%" src="/assets/img/solutions/envio/envio.png" alt="envio Solution"/></div>

## How it Works

Envio’s feature-rich indexing solution and data infrastructure provider for fast and flexible access to real-time and historical data for any EVM including [Rootstock](https://rootstock.io/)⚡.

<div align="center"><img width="90%" src="/assets/img/solutions/envio/envio-diagram.png" alt="envio Solution"/></div>

## About Envio

[Envio](https://envio.dev/) is a feature-rich indexing solution that provides developers with a seamless and efficient way to index and aggregate real-time or historical blockchain data for **any EVM**, including Rootstock. The indexed data is easily accessible through custom [GraphQL](https://graphql.org/) queries, giving developers the flexibility and power to retrieve specific information.

Envio offers native support for Rootstock and has been designed to support high-throughput blockchain applications that rely on real-time data for their business requirements.

Designed to optimize the developer experience, Envio offers automatic code generation, flexible language support, quickstart templates, and a reliable, cost-effective hosted service.

Indexers on Envio can be written in [JavaScript](https://www.javascript.com/), [TypeScript](https://www.typescriptlang.org/), or [ReScript](https://rescript-lang.org/).

## Envio HyperSync

Envio supports [HyperSync](https://docs.envio.dev/docs/hypersync) on Rootstock mainnet.

HyperSync is an accelerated data query layer for the Rootstock blockchain, providing APIs that bypass JSON-RPC for 100x faster syncing of historical data. HyperSync is used by default in Envio's indexing framework, with RPC optional. Using HyperSync, application developers do not need to worry about RPC URLs, rate limit, or managing infrastructure. They can easily sync large datasets in a few minutes, something that would usually take hours or days using RPC.

HyperSync is also available as a standalone API for data analytic use cases. Data analysts can interact with the HyperSync API using JavaScript, Python, or Rust clients and extract data in JSON, Arrow, or Parquet formats. For more information, visit the HyperSync documentation [here](https://docs.envio.dev/docs/overview-hypersync).

## Why choose Envio?

Envio stands out as a dev-friendly EVM-compatible blockchain data indexing solution empowering developers to reliably read and process real-time and historical smart contract events through a robust GraphQL API.
Envio supports indexing on Rootstock and **any EVM-compatible blockchain**, enabling Rootstock developers to:

- [**Contract Import**](https://docs.envio.dev/docs/contract-import): Autogenerate the key boilerplate for an entire Indexer project off a single or multiple smart contracts. Deploy within minutes.

- [**Multi-chain Support**](https://docs.envio.dev/docs/multichain-indexing): Aggregate data across multiple networks into a single database. Query all your data with a unified GraphQL API.

- [**HyperSync**](https://docs.envio.dev/docs/overview-hypersync): To ensure blazing-fast retrieval of historical on-chain data and a seamless developer experience, Envio’s HyperSync endpoint allows for 100x faster indexing than standard RPC.

- [**Asynchronous Mode**](https://docs.envio.dev/docs/async-mode): Fetch data from off-chain storage such as IPFS or contract state (e.g. smart contract view functions).

- **Quickstart Templates**: Use pre-defined indexing logic for popular OpenZeppelin contracts (e.g. ERC-20).

[Start building on Rootstock](https://envio.dev/app/login)!

## Getting Started

Developers can choose whether they want to start from a template (e.g. Blank, ERC-20, etc.) or use the Contract Import feature: 

### Installation

#### Prerequisites

The following are the prerequisite packages required for Envio:

- [Node.js](http://node.js) (use [v18](https://nodejs.org/download/release/v18.18.0/) or newer)
- [pnpm](https://pnpm.io/installation) (use v8 or newer)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Docker is required specifically for running the Envio indexer locally.

#### Install Envio

Install Envio by running the command below:

```
npm i -g envio
```

See the available CLI commands for Envio here.

```
envio --help
```

The following files are required from the user to run the Envio indexer:

- Configuration (defaults to config.yaml)
- GraphQL Schema (defaults to schema.graphql)
- Event Handlers (defaults to src/EventHandlers.* depending on the language chosen)

These files are auto-generated according to the template and language chosen by running the envio init command.
