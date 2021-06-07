---
layout: rsk
title: RIF Scheduler - SDK - Getting status
---

### Verifying the status of a scheduled execution

You can either provide the execution object (using the `executionFactory` function) or the `executionId` if you have one already.

```javascript
import { RifScheduler } from "@rsksmart/rif-scheduler-sdk";

const rifScheduler = new RifScheduler(serviceProviderContractAddress, signer);

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

What you can do with this sdk?

- [Getting Started](../)
- [Query plans](../query-plans)
- [Purchase one of this plans](../purchasing-plan)
- [Schedule a transaction for the next minutes](../scheduling)
- [Get status](../statuses)