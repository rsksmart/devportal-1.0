---
layout: rsk
title: RIF Scheduler - SDK - Canceling
---

### Canceling a scheduled execution

You can either provide the execution object (using the `executionFactory` function) or the `executionId` if you have one already.

> You can cancel a scheduled execution but keep in mind that it cannot be cancelled too close to its execution date.

```javascript
await rifScheduler.cancelScheduling(execution | executionId)
```
