---
layout: rsk
title: RIF Scheduler - SDK
tags: rif, rif-scheduler, sdk, libraries, DID, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
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

The provider will only allow `get` operations, such as `getPlan`. In the other hand the signer will allow all operations, such as `purchasePlan`, `schedule`, etc.

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

### Obtaining a plan

First of all, you need to get a plan from the service provider, which will give you the price per execution, the payment token and the execution window in seconds, among other things.

```javascript
const rifScheduler = new RifScheduler(serviceProviderContractAddress, provider);

const planIndex = 0;
const plan = await rifScheduler.getPlan(planIndex);

//  {
//    pricePerExecution: 10000000000000;
//    window: 300;
//    token: 0x...;
//    active: true;
//  }
```

### Purchasing executions

With the information of the previous step, you can approve and purchase executions to be able to schedule them in the future.

```javascript
const rifScheduler = new RifScheduler(serviceProviderContractAddress, signer);

const executionsQuantity = 2;
const totalAmount = plan.pricePerExecution.mul(executionsQuantity)

// first you need to approve the totalAmount of tokens
await rifScheduler.approveToken(plan.token, totalAmount)

const purchaseTransaction = await rifScheduler.purchasePlan(planIndex, executionsQuantity)

// we recommend to wait at least 10 confirmations to be sure that your transaction was processed correctly.
await purchaseTransaction.wait(12)
```

### Verifying your remaining executions

It will return how many executions you have left.

You will need to purchase some executions if you want to schedule something (see previous step).

This is an optional step, but it is useful because it will give you feedback that everything you have done in the previous steps was correct.

```javascript
const rifScheduler = new RifScheduler(serviceProviderContractAddress, signer);

const remainingExecutions = await rifScheduler.remainingExecutions(planIndex)

//  2
```

### Estimating the gas

It can either return the estimated gas or undefined.

**When could the result be undefined?**

* If there were no funds in the account at the moment of the estimation, it would result undefined, but as soon as funds are available, the result will change automatically.
* It can also result undefined if the address or any other parameter provided is incorrect, in that case, you would need to provide the correct information before scheduling, to avoid the execution charge on a failed transaction.

> In any case you can schedule the execution anyway calculating/approximating the gas manually.

```javascript
const gas = await this.schedulerSDK
    .estimateGas(MyContract.abi, myContractAddress, '<MyContractFunction>', [arrayOfMyContractFunctionParameters])

// 2000 | undefined
```

### Scheduling a single execution

Here you can see how to schedule the execution of any smart contract.

This will be executed by the service provider according to the date and time specified in `executedAt`.

Keep in mind that the execution will occur in a time frame given by the plan window that you purchased earlier.

```javascript
const rifScheduler = new RifScheduler(serviceProviderContractAddress, signer);

const encodedFunctionCall = new utils.Interface(MyContract.abi).encodeFunctionData('<MyContractFunction>', [arrayOfMyContractFunctionParameters])

const valueToTransfer = BigNumber.from(0)

const execution = executionFactory(planIndex, myContractAddress, encodedMethodCall, gas, executeAt, valueToTransfer, yourAccountAddress)
const scheduledExecutionTransaction = await rifScheduler.schedule(execution)

// we recommend to wait at least 10 confirmations to be sure tha your transaction was processed correctly.
await scheduledExecutionTransaction.wait(12)
```

### Verifying the status of a scheduled execution

You can either provide the execution object (using the `executionFactory` function) or the `executionId` if you have one already.

```javascript
const state = await rifScheduler.getExecutionState(execution | executionId)

// enum ExecutionState {
//   Scheduled = 0,
//   ExecutionSuccessful = 1,
//   ExecutionFailed = 2,
//   Overdue = 3,
//   Refunded = 4,
//   Cancelled = 5
// }
```

### Canceling a scheduled execution

You can either provide the execution object (using the `executionFactory` function) or the `executionId` if you have one already.

> You can cancel a scheduled execution but keep in mind that it cannot be cancelled too close to its execution date.

```javascript
await rifScheduler.cancelScheduling(execution | executionId)
```
