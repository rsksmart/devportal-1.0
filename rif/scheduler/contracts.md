---
layout: rsk
title: RIF Scheduler - Contracts
---

Repo: [`rsksmart/rif-scheduler-contracts`](https://github.com/rsksmart/rif-scheduler-contracts)

Each service provider should deploy an smart contract to manage the plans,
receive payments for your service and execute the requested transactions.

The smart contract has four modules:

- [_Admin_](#admin): Service Provider can create new plans and change withdraw account
- [_Purchasing_](#purchasing): Requesters can use these methods to pay for the service using tokens
- [_Scheduling_](#scheduling): Requesters submit the transactions they need to execute and when
- [_Execution_](#execution): Service Provider executes transactions and receives payment

> See this guide about [how to run a scheduler](../run) on your own.

### Admin

The Service Provider can set up different plans.
They must determine the price of each execution and
the time window in which it will be valid.

```solidity
Plan[] public plans;
function addPlan(uint256 price, uint256 window, IERC677 token) external onlyProvider
function removePlan(uint256 plan) external onlyProvider
```

The _payee_ is the account that receives the tokens after execution.
The Service Provider can change this account

```solidity
address public payee
function setPayee(address payee_) external onlyProvider
```

### Purchasing

Purchasing executions of a plan can be done in two ways:

- ERC-20: Use `purchase` after performing a ERC-20 `approve`
- ERC-677: Use `transferAndCall` with ABI encoded `(uint256 plan, uint256 quantity)`

In both, the requester can choose the amount of transaction executions
that they want to purchase at the given price.

```solidity
function purchase(uint256 plan, uint256 quantity) external
```

### Scheduling

Submit new transactions to be executed by the Service Provider.
Scheduling can be done only after purchasing a plan.
When scheduling you must specify this fields:

- `plan`: The plan id the requester wants to use for the execution
- `to`: The receiver of the scheduled transaction
- `data`: The _data_ field of the transaction
- `gas`: Set a _gas limit_ for the transaction
- `timestamp`: When it must be executed, considering the window

```solidity
function schedule(uint256 plan, address to, bytes calldata data, uint256 gas, uint256 timestamp) external payable
```

It is possible to cancel a scheduling before its execution:

```solidity
function cancelScheduling(bytes32 id) external
```

The executions have an **id**. Use this hash function to calculate it:

```js
abi.encode(execution.requestor, execution.plan, execution.to, execution.data, execution.gas, execution.timestamp, execution.value)
```

Query the _state_ of an execution at any time. State machine is defined as:

- `Scheduled -> Cancelled` -- requester cancelled execution
- `Scheduled -> ExecutionSuccessful` -- call was executed in the given time and did not fail
- `Scheduled -> ExecutionFailed` -- call was executed in the given time but failed
- `Scheduled -> Overdue` -- execution window has passed, expected earlier
- `Overdue -> Refunded` -- refund for overdue execution paid

```solidity
enum ExecutionState { Scheduled, ExecutionSuccessful, ExecutionFailed, Overdue, Refunded, Cancelled }
function getState(bytes32 id) public view returns (ExecutionState)
```

### Execution

The execution is done by the Service Provider.
They must submit the transaction between
`timestamp - window` and `timestamp + window`.

```solidity
function execute(bytes32 id) external nonReentrant
```

This performs execution this way:

```solidity
(bool success, bytes memory result) = payable(execution.to).call{ gas: execution.gas, value: execution.value }(execution.data);
```

After execution is completed, the Service Provider will receive
the payment for the execution.
