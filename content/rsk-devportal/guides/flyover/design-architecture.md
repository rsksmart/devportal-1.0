---
menu_title: Design and Architecture
title: "Flyover Protocol Documentation | Design and Architecture"
description: "Welcome to the flyover documentation, learn about the flyover architecture, how to get started and integrate the flyover protocol into your project."
tags: flyover, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, guide, setup, integrate, use
render_features: 'tables-with-borders'
layout: rsk
---

The flyover protocol enables the RSK community to build powerful decentralised applications.

It also aims to increase number of possible use cases on the RSK network.

In this section, we will cover the design, architecture, flow diagrams, and minimum requirements needed to use the components of the Flyover Protocol.

The flyover system is composed of;

- [Client](#client)
- [Liquidity Provider (LP)](#liquidity-provider-lp)
- [Liquidity Bridge Contract (LBC)](#liquidity-bridge-contract-lbc)

## Client

An RSK user sending BTC to RSK (peg-in). A flyover peg-in protocol client would be a user holding BTC that wants to convert them to RBTC. This process is then facilitated by an [LP](#liquidity-provider-lp).

## Liquidity Provider (LP)

**System requirements:**

- go 1.16.5 or above
- RSK and Bitcoin running node instance [LPS](/guides/flyover/tools#liquidity-provider-server-lps) can connect to.

The [liquidity provider (LP)](https://github.com/rsksmart/liquidity-provider) is in charge of making an RSK call on behalf of the user. As such, it needs to:

- Register with the LBC as a liquidity provider.
- Monitor the Bitcoin blockchain.
- Interact with the user wallet and agree to the terms of the service.
- Interact with the LBC to provide the service.
- Interact with the LBC to penalise any misbehaving LPs.

LPs are entities that provide advance payments in RBTC and BTC on behalf of users. They may charge a service fee for their services. The workflows differ from peg-ins to peg-outs. While peg-ins require an off-chain interaction between the user wallet and the LP, the fast peg-out process can be executed without such interaction. We’ll first describe the peg-in process, and later we'll move to the peg-out process.

To be able to participate as an LP, LPs must register themselves in a Liquidity Bridge Contract (LBC) and perform one mandatory deposit on RSK: a security bond that is slashed if they misbehave. A second deposit is optional: they can pre-deposit the BTC liquidity they wish to make available in RSK. While this has a financial cost, by doing so they signal the intent to fulfil the promise. Users can use this information to pick an LP that is well-funded and reduce the risk of deviations while expecting the advance payment.

However, the LPs are incentivized to follow the protocol because they earn a share of each transfer they accelerate, and because if they fail to accelerate them, their security deposit (or collateral) is burned. Several other penalties are possible, such as locking the LP liquidity for a long duration, which equates to a financial loss.
Liquidity Providers can privately serve their own users or offer their services in an open marketplace. The [RIF marketplace](https://marketplace.rifos.org/) is one of such markets.

Abstraction of a [Liquidity Provider’s](https://github.com/rsksmart/liquidity-provider) contract. The artefact is not deployed independently but as part of a dApp that uses one or more LPs.

### Operations

The LP exposes the following methods:

**getQuote**

Computes and returns a [quote](#quote) for the service.

**Parameters**

| Parameters | Type | Value |
| -------- | -------- | -------- |
|`callContractAddress` | `address` | Contract or EOA address |
|`callContractArguments`| `bytes`  | Contract data    |
|`valueToTransfer`| `uint` | Value to send in the call|
|`gasLimit`  | `uint` | Gas limit to use in the call |
|`rskRefundAddress` | `address`| User RSK refund address|
|`bitcoinRefundAddress` | `bytes21` | User Bitcoin refund address |

**Returns:**

`quote` - returns an array of [quotes](#quote). 

**acceptQuote**

	Allows the wallet to accept a quote.

**Parameter:**

    - quoteHash (bytes32) - Keccak hash of the parameters in the quote.  

**Returns:**

    - signature (bytes) - Signature of the quote.
    - bitcoinDepositAddressHash (bytes32) - Hash of the address where the user needs to make the deposit.

## Liquidity Bridge Contract (LBC)

The [Liquidity Bridge Contract (LBC)](https://github.com/rsksmart/liquidity-bridge-contract) manages the interaction between users and liquidity providers (LP) in order to achieve fast peg-ins.

See **Testnet**: [0x0d77ed96104f41295d011ba16f4b79542bd7e390](https://explorer.testnet.rsk.co/address/0x0d77ed96104f41295d011ba16f4b79542bd7e390?__ctab=Code) and **Mainnet**: [0x0fc7386a22e00629fe611516b2c97004d5ff4082](https://explorer.rsk.co/address/0x0fc7386a22e00629fe611516b2c97004d5ff4082) contract addresses.

**System requirements:**
- [Node](https://nodejs.org/en/)
- [Truffle](https://trufflesuite.com/)
- [RSK node](https://developers.rsk.co/rsk/node/)

The LBC provides the following API:

| function | meaning |
| -------- | -------- 
| `getBridgeAddress` | Returns the bridge address used by the LBC.
| `getMinCollateral` | Returns the minimum allowed collateral for liquidity providers
| `getPenaltyRatio` | Returns the penalty ratio
| `getRewardRatio` | Returns the reward ratio
| `getResignationBlocks` | Returns the number of blocks required to resign
| `register` | Registers the sender as a liquidity provider with an amount of collateral
| `addCollateral` | Increases the collateral of the sender, who must be a registered liquidity provider
| `getCollateral (address)` - Address of the liquidity provider. | Returns ( uint) the amount of locked collateral of a liquidity provider
| `withdrawCollateral` | Withdraws locked collateral
| `deposit` | Increases the balance of the sender
| `getBalance` (address) - Address of the liquidity provider | Returns (uint) the amount of funds of a liquidity provider
| `withdraw` | Withdraws funds from the balance of the sender
| `isOperational  (address)` - The address of the liquidity provider | Checks if a liquidity provider is registered and has enough locked collateral to operate and returns (`bool`)
| `resign` | Used to resign as a liquidity provider
| `callForUser (quote)` | Performs a call on behalf of a user and returns a `bool` if the call has been unsuccessful or not |
| `registerPegIn` | Registers a peg-in transaction with the bridge and pays to the involved parties. Also penalises the liquidity provider in case of misbehaviour. Returns (int) the total amount of peg in or an error code.

### Quote

The quote structure defines the conditions of a service, and acts as a contract between users and [LPs](#liquidity-provider-lp). Quotes consist of:

| params | type | meaning |
| -------- | -------- | -------- |
| `fedBtcAddress` | `bytes20` | The BTC address of the PowPeg |
|  `lbcAddress` | `address` |  The address of the LBC    |
|  `lpRSKAddr` | `address` | The RSK address of the LP|
|  `btcRefundAddress` | `bytes`| A User BTC refund address |
|  `rskRefundAddress` | `address` | A User RSK refund address|
|  `lpBTCAddr` | `bytes` | The BTC address of the LP |
| `callFee` | `uint` | The fee charged by the LP. See [callFee](/guides/flyover/glossary/) |
|  `penaltyFee` | `uint` | The penalty fee that the LP pays if it fails to deliver the service. See [maxPenaltyFeePercent](/guides/flyover/glossary/) |
|  `contractAddress` | `address`| The destination address of the peg-in|
|  `data` | `bytes` | The arguments to send in the call |
|  `gasLimit` | `uint` | the gas limit|
|  `nonce` | `uint` | A nonce that uniquely identifies this quote |
|  `value` | `uint` | The value to transfer in the call |
|  `agreementTimestamp` | `uint` | The timestamp of the agreement |
|  `timeForDeposit` | `uint` | The time (in seconds) that the user has to achieve one confirmation on the BTC deposit. |
|  `callTime` | `uint` | The time (in seconds) that the LP has to perform the call on behalf of the user after the deposit achieves the number of confirmations |
|  `depositConfirmations` | `uint` | The number of confirmations that the LP requires before making the call |
|  `callOnRegister` | `bool` | a boolean value indicating whether the `callForUser` can be called on `registerPegIn`. |

## ABI Signature

### callForUser

This method makes a request to the [LBC](/guides/flyover/design-architecture#liquidity-bridge-contract-lbc) and performs a call on behalf of a user.

Parameters;

```
function callForUser(
    Quote quote
) returns bool success
```

See sample `callForUser` transaction in [Testnet Explorer](https://explorer.testnet.rsk.co/tx/0x7f731277b55745f3239568cf38cf8f887a4a4b92ceef5aa3a1ec18bef1a81400).

### registerPegIn

This method requests the Bridge contract on RSK to provide a refund for the service. Internally, it is being triggered by the [LPS](/guides/flyover/tools#liquidity-provider-server-lps) once funds has been deposited  (tBTC) into a Bitcoin deposit address. This method returns the amount transferred to the contract or an [error code](https://github.com/rsksmart/RSKIPs/blob/fast-bridge-alternative/IPs/RSKIP176.md#error-codes).

Parameters;

```
function registerPegIn(
    Quote quote,
    bytes signature,            // LP's signature of the quote
    bytes btcRawTransaction,    // raw deposit transaction
    bytes partialMerkleTree,    // PMT that proves the inclusion of the deposit in a block
    uint256 height              // block number that contains the deposit tx
) returns int executionStatus
```

See sample contract call in [Testnet Explorer](https://explorer.testnet.rsk.co/tx/0xbf35a1ffb846ea35a01318108750cd861a74c662f5389fd3540d5c73ba9c5f1b).

> Note: A transaction fee will be charged when making these contract calls for `callForUser` and `registerPegIn`.

## Workflows

The following diagrams show the interactions between liquidity provider, liquidity bridge contract and bridge contract in three different scenarios: basic flyover workflow, unsuccessful call, and liquidity provider fails to deliver.

- Flyover Flow Diagram
- Unsuccessful Call
- No call

### Flow Diagram

The following diagram shows the interaction of the different components during the peg-in process. 

![User Flow](/assets/img/guides/flyover/flow-diagram-complete.jpg)

The flow diagram above shows the participants involved when trying to perform a peg-in (BTC → RBTC)  operation; they include the client, LPS, LBC. 

- The client wants to send BTC to RSK via the liquidity provider
- Client triggers `getQuote` on LPS and gets a quote JSON object
- Client makes a call to LBC's `hashQuote`, which accepts a `quote` object and returns its hash.
- Client triggers `acceptQuote` on LPS with the hash received on the previous step and gets a quote signature and a BTC deposit address.
- Once deposit is made to the `depositAddress`, the LP waits for the required number of deposit confirmations, makes a `callForUser` (performs a call on behalf of the user), and waits for the required bridge confirmations.
- Once successful, a registerPegIn operation is made and deemed successful.

> Notes:
> - The call to `isOperational` may be performed at a different point in the sequence, to that shown in this diagram.
> - Making a call to `isOperational` is not necessary, it is intended to help check if the LP and LBC are operational.
> - The call performed by the LP can be a transfer of value to an account or a call to a contract method. This is specified by the value and data arguments of the call.
> - The first version of the Flyover converts only the peg-in process. Later versions will also enable to streamline the peg-out process.


### Flyover workflow

Basic flyover workflow.

![Flyover workflow](/assets/img/guides/flyover/basic-workflow.jpeg)

> Note: `registerPegin` (labelled "3") can be called by the LP or any other entity.

### Unsuccessful Call

Flyover interactions when the call on behalf of the user is unsuccessful. The LP keeps the call fee and the rest is refunded to the RSK refund address.

![Unsuccessful Call](/assets/img/guides/flyover/unsuccessful-call.jpeg)

### No call

Flyover interactions when the LP fails to call the LBC on behalf of the user. The LBC slashes the LP’s collateral and refunds the user on the RSK refund address.

![no call](/assets/img/guides/flyover/no-call.jpg)