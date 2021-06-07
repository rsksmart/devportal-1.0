---
layout: rsk
title: RIF Scheduler - SDK - Scheduling Executions
---

### Estimating the gas

It can either return the estimated gas or undefined.

**When could the result be undefined?**

* If there were no funds in the account at the moment of the estimation, it would result undefined, but as soon as funds are available, the result will change automatically.
* It can also result undefined if the address or any other parameter provided is incorrect, in that case, you would need to provide the correct information before scheduling, to avoid the execution charge on a failed transaction.

> In any case you can schedule the execution anyway calculating/approximating the gas manually.

```javascript
const gas = await rifScheduler
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

await scheduledExecutionTransaction.wait(12)
```

### Scheduling a recurrent execution

If you want to schedule the same execution many times, you will need to specify a cron expression and the number of executions.

The cron expression specifies the interval between each execution, starting from the `startToExecuteAt` date.

Tool for cron expressions: [cron-tab](https://crontab.guru/)

```javascript
const rifScheduler = new RifScheduler(serviceProviderContractAddress, signer);

const encodedFunctionCall = new utils.Interface(MyContract.abi).encodeFunctionData('<MyContractFunction>', [arrayOfMyContractFunctionParameters])

const valueToTransfer = BigNumber.from(0)

const cronExpression = '*/15 * * * *'; // every 15 minutes
const quantity = 5; // schedule its execution 5 times
const startToExecuteAt = new Date(tomorrow)

const execution = executionFactory(planIndex, myContractAddress, encodedMethodCall, gas, startToExecuteAt, valueToTransfer, yourAccountAddress)
const scheduledExecutionsTransaction = await rifScheduler.scheduleMany(execution, cronExpression, quantity)

await scheduledExecutionsTransaction.wait(12)
```

What you can do with this sdk?

- [Getting Started](../index)
- [Query plans](../query-plans)
- [Purchase one of this plans](../purchasing-plan)
- [Schedule a transaction for the next minutes](../scheduling)
- [Get status](../statuses)
