---
layout: rsk
title: RIF Scheduler - SDK - Purchasing Plans
---

### Purchasing executions

With the information of the previous step, you can approve and purchase executions to be able to schedule them in the future.

> If the token is one of the supported ERC-677 you don’t need to approve before purchasing. You can pass the list of supported tokens using [`options. supportedER677Tokens`](https://github.com/rsksmart/rif-scheduler-sdk/blob/develop/src/RifScheduler.ts#L14)

```javascript
const rifScheduler = new RifScheduler(serviceProviderContractAddress, signer);

const executionsQuantity = 2;
const totalAmount = plan.pricePerExecution.mul(executionsQuantity)

// first you need to approve the totalAmount of tokens
await rifScheduler.approveToken(plan.token, totalAmount)

const purchaseTransaction = await rifScheduler.purchasePlan(planIndex, executionsQuantity)

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

What you can do with this sdk?

- [Getting Started](../index)
- [Query plans](../query-plans)
- [Purchase one of this plans](../purchasing-plan)
- [Schedule a transaction for the next minutes](../scheduling)
- [Get status](../statuses)