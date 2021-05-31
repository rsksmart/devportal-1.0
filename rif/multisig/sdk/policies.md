---
layout: rsk
title: RIF Multisig SDK - policies
---

**Required packages**:
- [safe-core-sdk](https://github.com/gnosis/safe-core-sdk)

Each multisig account is associated to a list of owners (possibly with one single owner) and a threshold.

The owners are the accounts that are allowed to operate on the Multisig account.
The threshold is the minimum number of approval required for executing a Multisig transaction.

For further information on how to setup a safe account and how to choose the right parameters, please refer to the [official guidelines](https://help.gnosis-safe.io/en/articles/4772567-what-gnosis-safe-setup-should-i-use).


Both owners and threshold can be changed by means of transactions; those transactions. as all the other Multisig transactions, require to be signed at least by a minimum number of owners equal to the threshold set.

The [safe-core-sdk](https://github.com/gnosis/safe-core-sdk) package provides a set of methods to be used to create those transactions.

## Owners

Add a new owner to the Multisig account.
```
// IMPORTANT! keep in mind that the new threshold cannot be greater than the ACTUAL number of owners (before executing the transaction)
const newThreshold = <N> 
const ownerTx = await safe.getAddOwnerTx(newOwner, newThreshold)
```

Remove a new owner to the Multisig account.
```
// IMPORTANT! keep in mind that the new threshold cannot be greater than the ACTUAL number of owners (before executing the transaction)
const newThreshold = <N> 
const ownerTx = await safe.getRemoveOwnerTx(existingOwner, newThreshold)
```

Replace an owner with a new one.
```
const ownerTx = await safe.getSwapOwnerTx(oldOwner, newOwner)
```


## Threshold


Change the threshold.
```
// IMPORTANT! keep in mind that the new threshold cannot be greater than the ACTUAL number of owners (before executing the transaction)
const newThreshold = <N> 
const ownerTx = await safe.getChangeThresholdTx(newThreshold)
```

> **IMPORTANT**: With the previously mentioned methods, we are creating the transaction, but we are not changing the Multisig account yet. The change will be applied once the transaction will be executed, after being signed by the right number of owners. Please refers to [transaction execution](/rif/multisig/sdk/transaction_confirmation) for further instructions.