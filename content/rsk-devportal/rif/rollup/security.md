---
menu_order: 600
menu_title: Security
layout: rsk
title: RIF Rollup | Security
description: RIF Rollup is a trustless protocol for fast and scalable low-cost payments on Rootstock powered by zkRollup Technology.
tags: rif, aggregation, zksync, rollup
---

## Exodus Mode

The RIF Rollup smart contract keeps a map of priority operations (already executed and pending to be executed). When a priority request is added on-chain to be executed, it is registered with an incremental ID and it has an associated expiration block number (defined in [configuration](https://github.com/rsksmart/ri-aggregation/blob/f59e154865374bdc0f5ded2e2604dac599cb75ee/contracts/contracts/Config.sol#L66)). 
Exodus mode happens when the current Rootstock (RSK) block number is higher than the expiration block number of the **oldest pending** priority request

This means that if any Deposit or FullExit operation is censored by an Operator (by not including them in a rollup block), then the Exodus Mode will be triggered.

In the Deposit scenario, the msg.sender that is equal to the “to” attribute of the Deposit Operation will be able to withdraw the funds from the RIF Rollup contract by calling the [cancelOutstandingDepositsForExodusMode](https://github.com/rsksmart/rif-rollup/blob/main/docs/protocol.md#cancel-outstanding-deposits) function. One call is enough to cancel all the pending Deposit requests but extra care must be taken when specifying the number of priority operations to cancel, for example, if the pending operations queue has the following state:

```bash=
[FullExit, FullExit, Deposit, FullExit, Deposit, Deposit, FullExit] 
```
and we want to cancel the 3 deposit operations, we need to feed the function with the following parameters.

```bash=
_n: 6
_depositsPubdata: [Deposit1PubData, Deposit2PubData, Deposit3PubData]
```
processed in order, you must indicate that at least the following 6 operations must be processed.

The FullExit Operation scenario does not make use of the priority operations queue (that’s why removing them in the previous function has no impact on them), the user must submit the exit proof to get her funds by calling the [performExodus](https://github.com/rsksmart/rif-rollup/blob/main/docs/protocol.md#exodus-mode) function, one call per tokenID. Users can generate a proof by using an [exit tool]() created for this purpose.  

If the exit proof is correct then the funds are moved to the owner in the contract’s internal accounting. The user still needs to call [withdrawPendingBalance](https://github.com/rsksmart/ri-aggregation/blob/f59e154865374bdc0f5ded2e2604dac599cb75ee/contracts/contracts/ZkSync.sol#L246) to actually move them from the `ZKSyncContract` to their L1 account.