---
layout: rsk
title: RIF Scheduler - Services
tags: rif, rif-scheduler, sdk, libraries, DID, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

Repo: [`rsksmart/rif-scheduler-services`](https://github.com/rsksmart/rif-scheduler-services)

The Service Providers will run the _scheduler service_ that will
track all new requested transactions and execute them in the correct time

> See [this guide](../run) to run a scheduler on your own

## Architecture

The service works as a _caché_ system.
It collects information from another source of trust: The smart contract.

- Stores the requested transactions in a SQLite database (configurable)
- Runs every 5 minutes collecting transactions that
  need to be executed (configurable)
- Connects to Rootstock (RSK) node using web sockets --
  it uses `eth_getLogs` and `eth_subscribe` RPC methods
- It executes transactions storing a private key in a file --
  this can be easily improved
- It does not expose any HTTP API

## Model

It has 5 core components

- **Recoverer** --
  recovers all the requested executions when the service was asleep
- **Listener** --
  notifies the service when new executions are listed
- **Collector** --
  recurrently collects all the transactions that need to be executed
- **Scheduler** --
  sets alarms for collected executions
- **Executor** --
  executes the requested transaction at the given time

![service](../assets/img/service.png)

The service in designed to allow any of its modules
to be switched for different implementations.
For example, it is easy to change the _scheduler_ module to
implement a different scheduling technique.
