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
//   NonExistent = 0,
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
- [Get status](../statuses)