---
layout: rsk
title: RIF Scheduler - Contracts
---

Repo: [`rsksmart/rif-scheduler-contracts`](https://github.com/rsksmart/rif-scheduler-contracts)

Each service provider should deploy an smart contract to manage the plans, receive payments for your service and execute the requested transactions.

The smart contract has four modules:
- [_Admin_](#admin): Service Provider can create new plans and change withdraw account
- [_Purchasing_](#purchasing): Requestors can use this methods to pay for the service using tokens
- [_Scheduling_](#scheduling): Requestors submit the transactions they need to execute and when
- [_Execution_](#execution): Service Provider executes transactions and receives payment

### Admin

The SP can set up different plans. they must determine the price of each execution and the time window in which it will be valid.

```solidity
Plan[] public plans;
function addPlan(uint256 price, uint256 window, IERC677 token) external onlyProvider
function removePlan(uint256 plan) external onlyProvider
```

The _payee_ is the account that receives the tokens after execution. The SP can change this account

```solidity
address public payee
function setPayee(address payee_) external onlyProvider
```

### Purchasing

Purchasing executions of a plan can be done in two manners:
- ERC-20: use `purchase` after performing a ERC-20 `approve`
- ERC-677: use `transferAndCall` with ABI encoded `(uint256 plan, uint256 quantity)`

In both, the requestor can choose the amount of transaction executions they want to purchase at the given price.

```solidity
function purchase(uint256 plan, uint256 quantity) external
```

### Scheduling

Submit new transactions to be executed by the SP. Scheduling can be done only after purchasing a plan. When scheduling you must specify this fields:
- `plan`: the plan id the REQ wants to use for the execution
- `to`: the receiver of the scheduled transaction
- `data`: the _data_ field of the transaction
- `gas`: set a _gas limit_ for the transaction
- `timestamp`: when it must be executed, considering the window

```solidity
function schedule(uint256 plan, address to, bytes calldata data, uint256 gas, uint256 timestamp) external payable
```

It is possible to cancel a scheduling before its execution

```solidity
function cancelScheduling(bytes32 id) external
```

The executions have an **id**. Use this hash function to calculate it:

```js
abi.encode(execution.requestor, execution.plan, execution.to, execution.data, execution.gas, execution.timestamp, execution.value)
```

Query the _sate_ of an execution at any time. State machine is defined as:
- `Scheduled -> Cancelled` -- requestor cancelled execution)
- `Scheduled -> ExecutionSuccessful` -- call was executed in the given time and did not fail
- `Scheduled -> ExecutionFailed` -- call was executed in the given time but failed
- `Scheduled -> Overdue` -- execution window has passed, expected earlier
- `Overdue -> Refunded` -- refund for overdue execution paid

```solidity
enum ExecutionState { Scheduled, ExecutionSuccessful, ExecutionFailed, Overdue, Refunded, Cancelled }
function getState(bytes32 id) public view returns (ExecutionState)
```

### Execution

The execution is done by the SP. They must submit the transaction between `timestamp - window` and `timestamp + window`.

```solidity
function execute(bytes32 id) external nonReentrant
```

This performs execution this way

```solidity
(bool success, bytes memory result) = payable(execution.to).call{ gas: execution.gas, value: execution.value }(execution.data);
```

After execution is completed, the SP will receive the payment for the execution.
