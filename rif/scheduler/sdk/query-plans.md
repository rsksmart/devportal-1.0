---
layout: rsk
title: RIF Scheduler - SDK - Querying Plans
---

### Querying a plan

To schedule a transaction you need to purchase a plan. Plans are paid in tokens or RBTC.

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

### Querying ALL plans

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

What you can do with this sdk?

- [Getting Started](../index)
- [Query plans](../query-plans)
- [Purchase one of this plans](../purchasing-plan)
- [Schedule a transaction for the next minutes](../scheduling)
- [Get status](../statuses)