---
layout: rsk
title: RIF Multisig SDK - creation
---

**Required packages**:
- [@rsksmart/safe-factory-sdk](https://github.com/rsksmart/safe-factory-sdk)

There are two ways for creating Multisig accounts:
- Safe Factory
- Manual creation through UI

**Important**: all the SDKs and the sample apps described support Safe contracts **v1.2.0** so far.

## SafeFactory
It allows the creation of a safe account using the `ProxyFactory` and the `SafeSingleton` addresses.

**Pre-requirements**:
- [ProxyFactory](https://docs.gnosis.io/safe/docs/contracts_architecture/#5-proxy-factory) contract deployment
- [SafeSingleton](https://docs.gnosis.io/safe/docs/contracts_architecture/#1-transaction-management-core-contract) contract deployment

### MAINNET
**TBD**
### TESTNET
**TBD**

### Usage

Create a SafeFactory instance.

```ts
import { EthersSafeFactory } from '@gnosis.pm/safe-core-sdk'

const safeFactory = new EthersSafeFactory(
  signer,
  proxyFactoryAddress,
  safeSingletonAddress
)
```

Parameters:
- `signer: Signer` - [ethers Signer](https://docs.ethers.io/v5/api/signer/#Signer)
- `proxyFactoryAddress: str` - address of the deployed [ProxyFactory contract](https://docs.gnosis.io/safe/docs/contracts_architecture/#5-proxy-factory)
- `safeSingletonAddress: str` - address of the deployed [SafeSingleton contract](https://docs.gnosis.io/safe/docs/contracts_architecture/#1-transaction-management-core-contract)

> If you are working on RSK networks, you can use the contracts already deployed on [MAINNET](#mainnet) OR [TESTNET](#testnet).

Call the `createSafe` method.

```ts
const safeSdk = await safeFactory.createSafe({
  owners: ['0x1234...', '0xabcd...', '0x0987...'],
  threshold: 2
})
```

Parameters:
- `owners: str[]` - list of owner addresses
- `threshold: number` - the minimum number of owner approvals required to execute a safe transaction.

For further information on how to set up a safe account and how to choose the right parameters, please refer to the [official guidelines](https://help.gnosis-safe.io/en/articles/4772567-what-gnosis-safe-setup-should-i-use).

## UI

Please refer to the official [Gnosis Safe guide](https://help.gnosis-safe.io/en/articles/3876461-create-a-gnosis-safe-account)