---
layout: rsk
title: RIF Scheduler - SDK - Purchasing Plans
---

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

### Obtaining ALL plans

If you want to obtain all plans from the service provider, you must first get the plans count and then get the plans one by one.

```javascript
const rifScheduler = new RifScheduler(serviceProviderContractAddress, provider);

const plansCount = await rifScheduler.getPlansCount();

let allPlans = []

for (let i = 0; i < plansCount; i++) {
    const plan = await rifScheduler.getPlan(i);
    allPlans.push(plan)
}

//  [{
//    pricePerExecution: 10000000000000;
//    window: 300;
//    token: 0x...;
//    active: true;
//  },
//  {
//    pricePerExecution: 50000000000000;
//    window: 600;
//    token: 0x...;
//    active: true;
//  }]
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

What else you can do?

- [Getting Started](../index)
- [Scheduling Executions](../scheduling)
- [Canceling](../canceling)
