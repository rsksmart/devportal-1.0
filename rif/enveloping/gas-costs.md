---
layout: rsk
title: RIF Enveloping Gas Costs
tags: rif, enveloping, envelope, relay, gas station network, gsn, overview, gas, costs
permalink: /rif/enveloping/gas-costs/
render_features: 'tables-with-borders'
---

The overhead gas cost is the extra amount of gas required to process the relay call requested by the user. Let's call **X** the gas consumed by the destination contract method call, and **Y** the total gas consumed by the relay call, then the relay call cost (i.e. overhead gas cost) is: **Z = Y - X**.

## SmartWallet templates

RIF Enveloping V1 only has one SmartWallet [template](https://github.com/rsksmart/enveloping/blob/v1.0.1/contracts/forwarder/SmartWallet.sol), which can be used as-is, or be injected with extra logic during the SmartWallet instance creation.

V2 introduces a cheaper template ([SmartWallet](https://github.com/rsksmart/enveloping/blob/master/contracts/smartwallet/SmartWallet.sol)), to be used when there's no need for extra custom-logic in the smart wallets. The behaviour is the same as the CustomSmartWallet [template](https://github.com/rsksmart/enveloping/blob/master/contracts/smartwallet/CustomSmartWallet.sol) of V2, but without this capability.


| RIF Version | SW Template       | Avg. overhead gas |
|-------------|-------------------|-------------------|
| 1           | SmartWallet       | 172400            |
| 2           | CustomSmartWallet | 98070             |
| 2           | SmartWallet       | 97695             |

Note that the instance of CustomSmartWallet used didn't point to any extra custom logic.

## Transaction Batching
RIF Enveloping V2 also introduces transaction batching

### Scenarios

#### A
Each transaction has the same smart wallet, token payment and destination contract

#### B
Each transaction has the same smart wallet, token payment but each has a different destination contract

The gas costs for scenarios A and B are the same

#### C
Each transaction has a different smart wallet, but the token payment and destination contract are the same

#### D
Each transaction has a different smart wallet and destination contract, but the same token payment 

The gas costs for scenarios C and D are the same

#### E
Each transaction has a different smart wallet and token payment but the same destination contract

#### F
Each transaction has a different  smart wallet, token payment and destination contract

The gas costs for scenarios E and F are the same

### Overhead costs in batching
The following table depicts the average gas overhead per transaction for the SmartWallet template when using transaction batching
The gas difference of using the CustomSmartWallet template without extra logic versus using the SmartWallet template is approximately an extra of between 200 and 300 gas.

| Tx per batch  | A,B       | C,D       | E,F             |
|---------------|-----------|-----------|-----------------|
| 50            | 44400     | 59033     | 73690           |
| 30            | 45050     | 59520     | 74006           |
| 25            | 45300     | 59720     | 74183           |
| 20            | 45990     | 60130     | 74405           |
| 15            | 46953     | 60853     | 74822           |
| 10            | 48800     | 62270     | 75743           |
| 9             | 49495     | 62760     | to be continued |
| 8             | 50240     | 63240     |                 |
| 7             | 51200     | 64050     |                 |
| **6**         | **52600** | **65020** |                 |
| 5             | 54500     | 66430     |                 |
| 4             | 57300     | 68553     |                 |
| 3             | 62100     | 71985     |                 |
| 2             | 71600     | 79130     |                 |
| 1             | 100240    | 100240    |                 |
