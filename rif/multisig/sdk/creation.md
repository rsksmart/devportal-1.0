---
layout: rsk
title: RIF Multisig SDK - creation
description: Multisig account creation
tags: rif, gnosis, multisig
render_features: 'collapsible tables-with-borders'
prevUrl: '/rif/multisig/sdk/'
nextUrl: '/rif/multisig/sdk/policies/'
---

**Required packages**:
- [@rsksmart/safe-factory-sdk](https://github.com/rsksmart/safe-factory-sdk)

There are two ways for creating Multisig accounts:
- Safe Factory
- Manual creation through [Gnosis Safe UI](https://rsk-gnosis-safe.com/#/welcome)

**Important**: all the SDKs and the sample apps described support Safe contracts **v1.2.0** so far.

## SafeFactory
It allows the creation of a safe account using the `ProxyFactory` and the `SafeSingleton` addresses.

**Pre-requirements**:
- [ProxyFactory](https://docs.gnosis.io/safe/docs/contracts_architecture/#5-proxy-factory) contract deployment
- [SafeSingleton](https://docs.gnosis.io/safe/docs/contracts_architecture/#1-transaction-management-core-contract) contract deployment

[](#top "collapsible")
- A) Contract addresses deployed on RSK
  * Developers interacting with the RSK networks can use the address of the contracts already deployed
    * ### MAINNET
    
      | Contract          | Address                                    |
      |-------------------|--------------------------------------------|
      | SafeSingleton       | `0xc6cfa90ff601d6aac45d8dcf194cf38b91aca368` |
      | ProxyFactory        | `0x4b1af52ea200baebf79450dbc996573a7b75f65a` |
    * ### TESTNET

      | Contract          | Address                                    |
      |-------------------|--------------------------------------------|
      | SafeSingleton       | `0xffd41b816f2821e579b4da85c7352bf4f17e4fa5` |
      | ProxyFactory        | `0x5b836117aed4ca4dee8e2e464f97f7f59b426c5a` |

- B) Create a SafeFactory instance  
  - **Parameters**
    - `signer: Signer` - [ethers Signer](https://docs.ethers.io/v5/api/signer/#Signer)
    - `proxyFactoryAddress: str` - address of the deployed [ProxyFactory contract](https://docs.gnosis.io/safe/docs/contracts_architecture/#5-proxy-factory)
    - `safeSingletonAddress: str` - address of the deployed [SafeSingleton contract](https://docs.gnosis.io/safe/docs/contracts_architecture/#1-transaction-management-core-contract)
  {:.snippet__parameters.snippet__parameters--lightgreen.border-bottom-0}
    
  
  ```ts
  import { EthersSafeFactory } from '@gnosis.pm/safe-core-sdk'

  const safeFactory = new EthersSafeFactory(
    signer,
    proxyFactoryAddress,
    safeSingletonAddress
  )
  ```
  {:.snippet__code.snippet__code--lightgreen.border-top-0}
  
  > If you are working on RSK networks, you can use the contracts already deployed on [MAINNET](#mainnet) OR [TESTNET](#testnet).
  {:.mt-3}

- C) Create a Safe
  * **Parameters**
    - `owners: str[]` - list of owner addresses
    - `threshold: number` - the minimum number of owner approvals required to execute a safe transaction.
  {:.snippet__parameters.snippet__parameters--lightgreen.border-bottom-0}

  ```ts
  const safeSdk = await safeFactory.createSafe({
    owners: ['0x1234...', '0xabcd...', '0x0987...'],
    threshold: 2
  })
  ```
  {:.snippet__code.snippet__code--lightgreen.border-top-0}

For further information on how to set up a safe account and how to choose the right parameters, please refer to the [official guidelines](https://help.gnosis-safe.io/en/articles/4772567-what-gnosis-safe-setup-should-i-use).

## UI

Please refer to the official [Gnosis Safe guide](https://help.gnosis-safe.io/en/articles/3876461-create-a-gnosis-safe-account)
