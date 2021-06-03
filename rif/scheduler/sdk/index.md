---
layout: rsk
title: RIF Scheduler - SDK
---

Repository: [`rsksmart/rif-scheduler-sdk`](https://github.com/rsksmart/rif-scheduler-sdk)

This is the official sdk for the [OneShootScheduler](https://github.com/rsksmart/rif-scheduler-contracts) smart contract.

This sdk gives you the ability to interact with the `OneShootScheduler` contract in a more simple way.

## Getting Started

rif-scheduler-sdk is built on top of [ethers](https://docs.ethers.io/). 

### Installation

```
npm i @rsksmart/rif-scheduler-sdk ethers
```

### Initialization

In order to create an instance of `RifScheduler` you will need an ethers provider or signer.

The provider will only allow `read-only` operations, such as `getPlan`. In the other hand the signer will allow all operations, such as `purchasePlan`, `schedule`, etc.

#### with metamask

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

#### with RPC / Ganache

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

[Purchasing Plans](purchasing-plans)

[Scheduling Executions](scheduling)

[Canceling](canceling)
