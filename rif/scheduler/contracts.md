---
layout: rsk
title: RIF Scheduler - Contracts
tags: rif, rif-scheduler, libraries, DID, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

Repo: [`rsksmart/rif-scheduler-contracts`](https://github.com/rsksmart/rif-scheduler-contracts)

Each service provider should deploy a smart contract to manage the plans,
receive payments for the service and execute the requested transactions.

The smart contract has four modules:

- [_Admin_](#admin): The Service Provider can create new plans and change withdraw account
- [_Purchasing_](#purchasing): The requestors can use these methods to pay for the service using tokens
- [_Scheduling_](#scheduling): Requestors submit the transactions they need to execute and when
- [_Execution_](#execution): Service Provider executes transactions and receives payment

> See this guide about [how to run a scheduler](../run) on your own.

Please not tha

### Admin

The Service Provider can set up different plans.
The plans must specify the:
- Price per execution,
- The time window (in seconds) within a scheduled execution should run.
We recommend a value bigger than 15 seconds.
For example, if the time window for a plan is set to 100, then this following condition should apply, otherwise the execution will not performed:

 `scheduled time` - 10 <= `execution time` <=  `scheduled time` + 10
- The maximum gas that an schedule execution could spend.
- The address of the token used to purchase executions. If the address `0x0` passed as parameter the contract assumes that the executions will be paid with RBTC.

```solidity
Plan[] public plans;
function addPlan(uint256 price, uint256 window, uint256 gasLimit, IERC677 token) external onlyProvider

function removePlan(uint256 plan) external onlyProvider
```

The _payee_ is the account that receives the tokens after execution.
The Service Provider can change this account by calling `setPayee`.

```solidity
address public payee
function setPayee(address payee_) external onlyProvider
```

### Purchasing

Purchasing executions of a plan can be done in three ways:

- ERC-20: Use `purchase` after performing a ERC-20 `approve`
- ERC-677: Use `transferAndCall` with ABI encoded `(uint256 plan, uint256  quantity)`
- RBTC: Use `purchase` sending an RBTC value. This only available for plans having set the token address to `0x0`

In all of them, the requestor can choose the amount of transaction executions
that they want to purchase at the given price.

```solidity
function purchase(uint256 plan, uint256 quantity) external payable
```

### Scheduling
The executions have an **id**. Use this hash function to calculate it:

```js
abi.encode(execution.requestor, execution.plan, execution.to, execution.data, execution.timestamp, execution.value)
```

Submit new transactions to be executed by the Service Provider.
Scheduling can be done only after purchasing a plan.
When scheduling you must specify this fields:

- `plan`: The plan id the requestor wants to use for the execution
- `to`: The receiver of the scheduled transaction
- `data`: The _data_ field of the transaction
- `timestamp`: When it must be executed, considering the window

```solidity
function schedule(uint256 plan, address to, bytes calldata data, uint256 timestamp) external payable
```

It is possible to schedule multiple transactions at the same time by calling:

```solidity 
batchSchedule(bytes[] calldata data) external payable
```

This function receives an array of ABI encoded transactions to be executed and the total RBTC required by them, if necessary.
Each element of the transaction array should be encoded as follows:

```js
abi.encode(['uint256', 'address', 'bytes', 'uint256', 'uint256'], [execution.plan, execution.to, execution.data, execution.timestamp, execution.value])
```

To cancel a scheduling before its execution use:

```solidity
function cancelScheduling(bytes32 id) external
```
When the scheduled transactions are cancelled, the contract refunds any value transferred during the schedule and increases the plan balance for the requestor.
Please note that it is only possible to cancel `Scheduled` and `Overdue` transaction executions.

### Retrieving scheduled transactions data

Query the _state_ of an execution at any time. State machine is defined as:

- `Nonexistent -> Scheduled` -- Nonexistent status is returned by the contract when asking for an execution that has not been registered to the blockchain. This is never assigned. The first valid state is `Scheduled`. 
- `Scheduled -> Cancelled` -- requestor cancelled execution
- `Scheduled -> ExecutionSuccessful` -- call was executed in the given time and did not fail
- `Scheduled -> ExecutionFailed` -- call was executed in the given time but failed
- `Scheduled -> Overdue` -- execution window has passed, expected earlier
- `Overdue -> Refunded` -- refund for overdue execution paid

```solidity
enum ExecutionState { Nonexistent, Scheduled, ExecutionSuccessful, ExecutionFailed, Overdue, Refunded, Cancelled }
function getState(bytes32 id) public view returns (ExecutionState)
```

Retrieve the data for a particular scheduled transaction execution using its **id** (computed as described above).

```solidity
  function getExecutionById(bytes32 id) public view returns (Execution memory execution)
```

To get the number of transactions for a requestor use:

```solidity
  function executionsByRequestorCount(address requestor) external view returns (uint256)
```
 and list them with:
```solidity
  function getExecutionsByRequestor(
    address requestor,
    uint256 fromIndex,
    uint256 toIndex
  )
  ```
 Besides the requestor address, this function also requires `fromIndex` and `toIndex` to enable pagination.
 


### Execution

The execution is performed by the Service Providers.
The Service Providers performs the execution of the scheduled transaction by submitting it between `transaction.timestamp - plan.window` and `transaction.timestamp + plan.window`.

```solidity
function execute(bytes32 id) external nonReentrant
```

This performs execution in this way:

```solidity
(bool success, bytes memory result) = payable(execution.to).call{ gas: plan.gas, value: execution.value }(execution.data);
```

After execution is completed, the Service Provider will receive
the payment for the execution.

If the transaction is submitted before time window, the execution will be rejected and it will remain scheduled.
If it is submitted after the time window, it won't be executed and its state will be Overdue.

In any case the Service Provider is not responsible for the successful execution of the submitted transaction. It will only guarantee that it is submitted as scheduled.

### Overdue executions refunding
The requestor can request the refund of the overdue scheduled transactions (those that were not executed on time, inside the execution window).
To clain the refund, the requestor should call the following method:

```solidity
  function requestExecutionRefund(bytes32 id) external
```

This will set the requested execution as refunded and the remaining executions for thar plan will be increased by one. Also if there was some value transferred during the scheduling, it will be returned to the requestor.


### Plans refunding
The following steps describe the procedure that should be followed in the case that the user provider stops offering the scheduling service. This allows users to get a refund for their available balance:

1. The service provider should pause the contract using the method `pause()`. This blocks all the plan purchases, transaction schedules, and executions.
    Nevertheless this operation does not affect any state or balance, and may be reverted calling `unpause()`.
2. Once the contract is paused, each requestor should cancel all the pending executions (Scheduled or Overdue), by calling `cancelScheduling(bytes32 id)` as described above. This will cancel the schedule and increase the available executions. 
3. Then, each requestor should call the method `requestPlanRefund(uint256 plan)` for each plan that they purchased to receive a transfer for the value of the remaining balance. Please notice that this is only available while the contract is paused.

Steps 2 and 3 can be repeated as many times as needed. These can also be combined in a single contract call using the `multicall` method.

### Multicall
The contract allows to combine multiple call in a single one using the methods.

```solidity 
multicall(bytes[] calldata data, bool revertIfFails)
```

This method receives:
- calldata: an array of encoded contract calls to be executed
- revertIfFails: if true when a transaction in calldata is executed and it reverts, all the transactions will be reverted. Otherwise, it will continue executing the following transactions.
