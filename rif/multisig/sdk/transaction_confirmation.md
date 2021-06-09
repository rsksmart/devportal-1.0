---
layout: rsk
title: RIF Multisig SDK - transaction confirmation
---

Transactions confirmation can be on-chain and off-chain.

## Off-chain signature

Off-chain signature consists in adding the signature to the transaction object, without actually interacting with the contract. 

```
const signature = await safeSdk.signTransaction(safeTransaction)
```

This implies that the signature must be published in a different way, using the [safe-transactions-service])(https://github.com/gnosis/safe-transaction-service). **Further details to be added here**


## On-chain signature

On-chain signature consists in interacting directly with the safe account hence no further action is required to make it available to other users.

```
const txHash = await safeSdk.getTransactionHash(safeTransaction)
const approveTxResponse = await safeSdk.approveTransactionHash(txHash)
await approveTxResponse.wait()
```

It is also possible to retrieve all the owners who approved a transaction:
```
const ownersWhoApproved = await safeSdk.getOwnersWhoApprovedTx(txHash)
```

## Transaction execution

```
const txResponse = await safeSDk.executeTransaction(safeTransaction)
await txResponse.wait()
```

> The transaction execution includes the signing of the transaction, so if there is only one missing signature to reach the threshold, the signature step can be skipped and the transaction can be executed directly.