---
layout: rsk
title: RIF Multisig SDK - policies
description: Creation of the transactions required to change safe policies (owners and threshold) 
tags: rif, gnosis, multisig
render_features: 'collapsible'
---

**Required packages**:
- [@gnosis.pm/safe-core-sdk](https://github.com/gnosis/safe-core-sdk)

Each multisig account is associated with a list of owners (eventually with one single owner) and a threshold.

The owners are the accounts that are allowed to operate on the Multisig account.
The threshold is the minimum number of approvals required for executing a Multisig transaction.

For further information on how to setup a safe account and how to choose the right parameters, please refer to the [official Gnosis Safe guidelines](https://help.gnosis-safe.io/en/articles/4772567-what-gnosis-safe-setup-should-i-use).


Both owners and threshold can be changed by means of transactions; those transactions, like all the other Multisig transactions, require to be signed at least by a minimum number of owners equal to the threshold set.

The [safe-core-sdk](https://github.com/gnosis/safe-core-sdk) package provides a set of methods to be used to create those transactions.


[](#top "collapsible")
- Owners
    * Add a new owner to the Multisig account and, optionally, set a new threshold.
    
    ```ts
    // IMPORTANT! keep in mind that the new threshold cannot be greater than the ACTUAL number of owners (before executing the transaction)
    const newOwner: string
    const newThreshold: number
    const ownerTx = await safe.getAddOwnerTx(newOwner, newThreshold)
    ```
    {:.snippet__code.snippet__code--lightgreen.mb-3}

    * Remove an owner from the Multisig account and, optionally, set a new threshold.

    ```ts
    // IMPORTANT! keep in mind that the new threshold cannot be greater than the ACTUAL number of owners (before executing the transaction)
    const newThreshold: number
    const existingOwner: string
    const ownerTx = await safe.getRemoveOwnerTx(existingOwner, newThreshold)
    ```
    {:.snippet__code.snippet__code--lightgreen.mb-3}

    * Replace an owner with a new one.

    ```ts
    const oldOwner: string
    const newOwner: string
    const ownerTx = await safe.getSwapOwnerTx(oldOwner, newOwner)
    ```
    {:.snippet__code.snippet__code--lightgreen}

- Threshold
    * Change the threshold.

    ```ts
    // IMPORTANT! keep in mind that the new threshold cannot be greater than the ACTUAL number of owners (before executing the transaction)
    const newThreshold: number
    const ownerTx = await safe.getChangeThresholdTx(newThreshold)
    ```
    {:.snippet__code.snippet__code--lightgreen}

___

> **IMPORTANT**: With the previously mentioned methods, we are creating the transaction, but we are not changing the Multisig account yet. The change will be applied once the transaction is executed, after being signed by the right number of owners. Please refers to [transaction execution](/rif/multisig/sdk/transaction_confirmation) for further instructions.
