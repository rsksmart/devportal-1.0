---
layout: rsk
title: RIF Scheduler - SDK - Purchasing Plans
---

### Purchasing executions

With the information of the previous step, you can approve and purchase executions to be able to schedule them in the future.

> If the token is one of the supported ERC-677 you don’t need to approve before purchasing. You can pass the list of supported tokens using [`config.supportedERC677Tokens`](https://github.com/rsksmart/rif-scheduler-sdk/blob/develop/src/Base.ts#L6)

```javascript
import { RIFScheduler } from "@rsksmart/rif-scheduler-sdk";

const config = {
    contractAddress: serviceProviderContractAddress,
    providerOrSigner: signer
}

const rifScheduler = new RIFScheduler(config);

const executionsQuantity = 2;

const plan = rifScheduler.getPlan(planIndex)
const totalAmount = plan.pricePerExecution.mul(executionsQuantity)

// First, check if token requires approval
if (plan.token.needsApproval(totalAmount))
    await plan.token.approve(totalAmount)

const purchaseTransaction = await plan.purchase(executionsQuantity)

await purchaseTransaction.wait(12)
```

### Verifying your remaining executions

It will return how many executions you have left.

You will need to purchase some executions if you want to schedule something (see previous step).

This is an optional step, but it is useful because it will give you feedback that everything you have done in the previous steps was correct.

```javascript
import { RIFScheduler } from "@rsksmart/rif-scheduler-sdk";

const config = {
    contractAddress: serviceProviderContractAddress,
    providerOrSigner: signer
}

const rifScheduler = new RIFScheduler(config);
const plan = rifScheduler.getPlan(planIndex)

const remainingExecutions = await plan.getRemainingExecutions()

//  2
```

What you can do with this sdk?

- [Getting Started](../)
- [Query plans](../query-plans)
- [Purchase one of this plans](../purchasing-plan)
- [Schedule a transaction for the next minutes](../scheduling)
- [Get status](../states)