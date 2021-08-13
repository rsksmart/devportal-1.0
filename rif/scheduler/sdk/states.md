---
layout: rsk
title: RIF Scheduler - SDK - Getting status
---

### Verifying the status of a scheduled execution

You can either get the execution by id or use any Execution instance if you have one already.

```javascript
import { RifScheduler } from "@rsksmart/rif-scheduler-sdk";

const config = {
    contractAddress: serviceProviderContractAddress,
    providerOrSigner: signer
}

const rifScheduler = new RIFScheduler(config);

const execution = await rifScheduler.getExecution(executionId)

const status = await execution.getState()

// enum ExecutionState {
//   NotScheduled = 0,
//   Scheduled = 1,
//   ExecutionSuccessful = 2,
//   ExecutionFailed = 3,
//   Overdue = 4,
//   Refunded = 5,
//   Cancelled = 6
// }
```

What you can do with this sdk?

- [Getting Started](../)
- [Query plans](../query-plans)
- [Purchase one of this plans](../purchasing-plan)
- [Schedule a transaction for the next minutes](../scheduling)
- [Get states](../states)