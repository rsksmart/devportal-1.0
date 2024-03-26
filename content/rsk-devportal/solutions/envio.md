---
menu_order: 2100
menu_title: Envio
title: 'Envio - Solutions on Rootstock'
description: 'Connect Envio with Rootstock'
tags: envio, rootstock, tutorial,blockchain
layout: 'rsk'
---

Envio is a modern, multi-chain EVM blockchain indexing framework speed-optimized for querying real-time and historical data. Envio offers native support for Rootstock and has been designed to support high-throughput blockchain applications that rely on real-time data for their business requirements.

<div align="center"><img width="90%" src="/assets/img/solutions/envio/envio.png" alt="envio Solution"/></div>

### How it Works

Envio’s feature-rich indexing solution and data infrastructure provider for fast and flexible access to real-time and historical data for any EVM including [Rootstock](https://rootstock.io/)⚡.

<div align="center"><img width="90%" src="/assets/img/solutions/envio/envio-diagram.png" alt="envio Solution"/></div>

### About Envio

[Envio](https://envio.dev/) is a feature-rich indexing solution that provides developers with a seamless and efficient way to index and aggregate real-time or historical blockchain data for any EVM, including Rootstock. The indexed data is easily accessible through custom [GraphQL](https://graphql.org/) queries, giving developers the flexibility and power to retrieve specific information.

Envio offers native support for Rootstock and has been designed to support high-throughput blockchain applications that rely on real-time data for their business requirements.

Designed to optimize the developer experience, Envio offers automatic code generation, flexible language support, quickstart templates, and a reliable, cost-effective hosted service.

Indexers on Envio can be written in [JavaScript](https://www.javascript.com/), [TypeScript](https://www.typescriptlang.org/), or [ReScript](https://rescript-lang.org/).

### Envio HyperSync

Envio supports [HyperSync](https://docs.envio.dev/docs/hypersync) on Rootstock mainnet.

HyperSync is an accelerated data query layer for the Rootstock blockchain, providing APIs that bypass JSON-RPC for 100x faster syncing of historical data. HyperSync is used by default in Envio's indexing framework, with RPC optional. Using HyperSync, application developers do not need to worry about RPC URLs, rate limit, or managing infrastructure. They can easily sync large datasets in a few minutes, something that would usually take hours or days using RPC.

HyperSync is also available as a standalone API for data analytic use cases. Data analysts can interact with the HyperSync API using JavaScript, Python, or Rust clients and extract data in JSON, Arrow, or Parquet formats. For more information, visit the HyperSync documentation [here](https://docs.envio.dev/docs/overview-hypersync).
