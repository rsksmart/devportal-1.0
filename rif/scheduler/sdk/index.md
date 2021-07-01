---
layout: rsk
title: RIF Scheduler - SDK
---

Repository: [`rsksmart/rif-scheduler-sdk`](https://github.com/rsksmart/rif-scheduler-sdk)

With the RIF Scheduler SDK you can schedule transactions in the RSK network.

Features:

- Query and purchase plans
- Schedule transactions
- Schedule recurrent transactions
- Cancel a scheduling
- Query transactions scheduled and statuses

This is the official SDK for [`@rsksmart/rif-scheduler-contracts`](https://github.com/rsksmart/rif-scheduler-contracts) smart contract. Use it to interact with the `OneShotScheduler` smart contract in a more simple way.

## Getting Started

`@rsksmart/rif-scheduler-sdk` is built on top of [`ethers`](https://docs.ethers.io/).

### Installation

```
npm i @rsksmart/rif-scheduler-sdk ethers
```

Use [`0xad249557515d8b89f2869834857BB872D7B5C398`](https://explorer.testnet.rsk.co/address/0xad249557515d8b89f2869834857bb872d7b5c398) for RSK Testnet
> You can run your own instance following [this guide](https://developers.rsk.co/rif/scheduler/run/)

### Initialization

First, you will need an `ethers` `provider` or `signer` instance.

In order to create an instance of `RifScheduler` you will need an ethers provider or signer.

Using a `provider` will only allow _read-only_ operations, such as `getPlan`. Using a `signer` will allow all operations, such as `purchasePlan`, `schedule`, etc.

#### For example, to connect the SDK to Metamask

```javascript
import { RifScheduler } from "@rsksmart/rif-scheduler-sdk";
import { providers } from "ethers";

const provider = new providers.Web3Provider(web3.currentProvider);

// Creates instance with provider, you can execute read-only operations
const rifScheduler = new RifScheduler(serviceProviderContractAddress, provider);

const signer = provider.getSigner();

// Creates instance with signer, you can execute any kind of operation
const rifScheduler = new RifScheduler(serviceProviderContractAddress, signer);
```

#### to connect the SDK to RPC / Ganache

```javascript
import { RifScheduler } from "@rsksmart/rif-scheduler-sdk";
import { providers } from "ethers";

const url = "http://localhost:8545";

const provider = new providers.JsonRpcProvider(url);

// Creates instance with provider, you can execute read-only operations
const rifScheduler = new RifScheduler(serviceProviderContractAddress, provider);

const signer = provider.getSigner();

// Creates instance with signer, you can execute any kind of operation
const rifScheduler = new RifScheduler(serviceProviderContractAddress, signer);
```

What you can do with this sdk?

- [Query plans](query-plans)
- [Purchase one of this plans](purchasing-plan)
- [Schedule a transaction for the next minutes](scheduling)
- [Get status](statuses)
