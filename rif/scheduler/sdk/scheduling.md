---
layout: rsk
title: RIF Scheduler - SDK - Scheduling Executions
---

### Scheduling a single execution

Here you can see how to schedule the execution of any smart contract.

This will be executed by the service provider according to the date and time specified in `executedAt`.

Keep in mind that the execution will occur in a time frame given by the plan window that you purchased earlier.

```javascript
import { RifScheduler, Execution } from "@rsksmart/rif-scheduler-sdk";
import { utils } from "ethers";

const config = {
    contractAddress: serviceProviderContractAddress,
    providerOrSigner: signer
}

const rifScheduler = new RIFScheduler(config);

const plan = rifScheduler.getPlan(planIndex);

const encodedFunctionCall = new utils.Interface(MyContract.abi).encodeFunctionData('<MyContractFunction>', [arrayOfMyContractFunctionParameters])

const valueToTransfer = BigNumber.from(0)

const execution = new Execution(config, plan, myContractAddress, encodedFunctionCall, executeAt, valueToTransfer, yourAccountAddress)
const scheduledExecutionTransaction = await rifScheduler.schedule(execution)

await scheduledExecutionTransaction.wait(12)
```

### Scheduling a recurrent execution

If you want to schedule the same execution many times, you will need to specify a cron expression and the number of executions.

The cron expression specifies the interval between each execution, starting from the `startToExecuteAt` date.

Tool for cron expressions: [cron-tab](https://crontab.guru/)

```javascript
import { RifScheduler, Execution } from "@rsksmart/rif-scheduler-sdk";
import { utils } from "ethers";

const config = {
    contractAddress: serviceProviderContractAddress,
    providerOrSigner: signer
}

const rifScheduler = new RIFScheduler(config);

const plan = rifScheduler.getPlan(planIndex);

const encodedFunctionCall = new utils.Interface(MyContract.abi).encodeFunctionData('<MyContractFunction>', [arrayOfMyContractFunctionParameters])

const valueToTransfer = BigNumber.from(0)

const cronExpression = '*/15 * * * *'; // every 15 minutes
const quantity = 5; // schedule its execution 5 times
const startToExecuteAt = new Date(tomorrow)

const execution = new Execution(config, plan, myContractAddress, encodedFunctionCall, executeAt, valueToTransfer, yourAccountAddress)

const executionsToSchedule = Execution.fromCronExpression(execution, cronExpression, quantity)

const scheduledExecutionsTransaction = await rifScheduler.scheduleMany(executionsToSchedule)

await scheduledExecutionsTransaction.wait(12)
```

### Estimating gas

It can either return the estimated gas or undefined.

**When could the result be undefined?**

* If there were no funds in the account at the moment of the estimation, it would result null, but as soon as funds are available, the result will change automatically.
* It can also result null if the address or any other parameter provided is incorrect, in that case, you would need to provide the correct information before scheduling, to avoid the execution charge on a failed transaction.


```javascript
import { RifScheduler, Execution } from "@rsksmart/rif-scheduler-sdk";

const config = {
    contractAddress: serviceProviderContractAddress,
    providerOrSigner: signer
}

const rifScheduler = new RIFScheduler(config);

const plan = rifScheduler.getPlan(planIndex);

const encodedFunctionCall = new utils.Interface(MyContract.abi).encodeFunctionData('<MyContractFunction>', [arrayOfMyContractFunctionParameters])

const valueToTransfer = BigNumber.from(0)

const execution = new Execution(config, plan, myContractAddress, encodedFunctionCall, executeAt, valueToTransfer, yourAccountAddress)

const gas = await execution.estimateGas()

// 2000 | null
```

What you can do with this sdk?

- [Getting Started](../)
- [Query plans](../query-plans)
- [Purchase one of this plans](../purchasing-plan)
- [Schedule a transaction for the next minutes](../scheduling)
- [Get status](../states)
