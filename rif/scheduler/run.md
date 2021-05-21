---
layout: rsk
title: RIF Scheduler - Run your own scheduler
---

By running your own scheduler you can provide the transaction execution service.
In this article you can see how to deploy smart contracts
and run the service that will execute the transactions.

### 1. Deploy the smart contracts

The SP will deploy the smart contract that will keep track of:

- plans
- paid tokens
- scheduled transactions
- execution statuses

> Read more about the smart contracts [here](../contracts)

First of all, clone the
[repo](https://github.com/rsksmart/rif-scheduler-contracts)
and set it up as explained in the Readme.

Also, find the deployment scripts in the readme.
You will find one for local networks,
other for RSK Testnet and other for RSK Mainnet.

In the deployment you will need to provide two addresses in the constructor:

- `address serviceProvider_`:
  Can create and remove plans. Can change the payee.
- `address payee_`:
  Receives the tokens paid after executions.

Take note of the address.

### 2. Deploy the service

The service will execute the requested transactions.
It stores them in a database and runs a recurrent task to execute them.

> Read more about the services [here](../services)

Clone the [repo](https://github.com/rsksmart/rif-scheduler-services)
and set it up as explained in the readme.
Please take a look at the disclaimer about the configuration values.
The configuration parameters is very important to succeed on the executions.
For the `ONE_SHOOT_SCHEDULER_ADDRESS` use the recently deployed smart contract.

If everything works fine, a _Starting..._ message is logged.
