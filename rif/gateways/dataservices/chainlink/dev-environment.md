---
layout: rsk
title: RIF Gateways Chainlink Dev Environment
tags: rif, gateways, data services, chainlink, dev environment
---

This [repository](https://github.com/smartcontractkit/chainlink-RSK) contains a boilerplate for running and testing a **local** development environment for the Chainlink/RSK integration. Follow these **steps** to setup the development environment:

## 1 - Install Docker

[Install Docker](https://docs.docker.com/get-docker/)

## 2 - Clone Repo
```bash
git clone git@github.com:smartcontractkit/chainlink-RSK.git
```

## 3 - Run Local Development Setup

To start the services and the test runner, simply run:

```bash
docker-compose up
```
Docker will download the required images, build the containers and start services. The test runner should start automatically.

To stop the containers and delete the volumes, so that the configuration and chain resets:

```bash
docker-compose down -v
```


The objective of this local environment is to provide external data to a **Consumer** contract deployed on Rootstock (RSK) network through the Chainlink Oracle system, using a simple and natural way to join both services thanks to the help of an **external initiator** and **external adapter**. 

A test runner is included to **setup the environment** and test the complete data flow, which will be:

`Consumer contract => Oracle contract => Rootstock Initiator => Chainlink => Rootstock TX Adapter => Oracle contract => Consumer contract`

## Services:

This boilerplate has 7 services, each running in its own Docker container

- `chainlink-node`, a Chainlink node connected to an Eth dev network, using the develop Docker image.
- `postgres-server`, a PostgreSQL server for the Chainlink node, Rootstock Initiator and RSKTX Adapter databases.
- `ethereum-node`, an Ethereum geth node for the Chainlink node to connect to.
- `rsk-node`, a single RSK node configured to work on regtest network (private development network), using latest Docker image.
- `rsk-initiator`, an external initiator connected to the Rootstock node that reads the event log from an Oracle contract and invokes a job run. A new run created by the Rootstock (RSK) Initiator is automatically given the parameters needed for the Rootstock (RSK) TX adapter task to report the run
back to the contract that originally created the event log, just like the native Runlog initiator.
- `rsktx-adapter`, an external adapter connected to the Rootstock node that takes the input given and places it into the data field of a transaction, just like the native EthTx adapter. It then signs the transaction and sends it to an address on Rootstock (RSK) network.
- `test-runner`, a node script that initializes the testing environment, first deploying a SideToken contract and an Oracle contract. It then configures
the Chainlink node, creating the initiator and adapter bridges and a job that includes them. Once the Chainlink node is ready, it deploys a Consumer contract configured with the previously deployed SideToken and Oracle contracts, and the previously created job. Then mints
tokens and sends some to the Consumer contract. Finally it calls the `requestRIFPrice` of the Consumer contract and then polls it for current price.

## Contracts:

- `Oracle`, the Oracle contract is the 0.5 version, with a single modification on the `onTokenTransfer` function of the LinkTokenReceiver to be able to work with the SideToken.
- `SideToken`, is the contract that will be created through the Rootstock (RSK) Token Bridge, mirroring the LinkToken contract deployed on Ethereum network.
- `Consumer`, is the contract that will request the data to the Oracle. On test run, it will request last traded price of RIF/BTC pair from Liquid.com exchange.

