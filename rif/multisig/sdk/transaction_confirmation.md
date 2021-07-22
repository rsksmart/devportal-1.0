---
layout: rsk
title: RIF Multisig SDK - transaction confirmation
description: Steps required to confirm a transaction
tags: rif, gnosis, multisig
render_features: 'collapsible'
---

**Required packages**:
- [@gnosis.pm/safe-core-sdk](https://github.com/gnosis/safe-core-sdk)
- [@gnosis.pm/safe-service-client](https://www.npmjs.com/package/@gnosis.pm/safe-service-client) (still in alpha version as June 2021).

Transactions confirmation can be on-chain and off-chain.

[](#top "collapsible")
- Off-chain signature
    * Off-chain signature consists of adding the signature to the transaction object without actually interacting with the contract. 

    ```ts
    import EthersSafe from '@gnosis.pm/safe-core-sdk'

    const safeSdk = await EthersSafe.create({ ethers, safeAddress, providerOrSigner })

    const signature = await safeSdk.signTransaction(safeTransaction)
    ```
    {:.snippet__code.snippet__code--lightgreen}

    This implies that the signature must be published through the [Safe Transaction Service API](https://github.com/gnosis/safe-transaction-service), using the [@gnosis.pm/safe-service-client](https://www.npmjs.com/package/@gnosis.pm/safe-service-client).

    ```ts
    const safeService = new SafeServiceClient(SAFE_TRANSACTION_SERVICE_URL)

    const safeTxHash = await safeCoreSdk.getTransactionHash(transaction)
    await safeServiceClient.confirmTransaction(safeTxHash, signature.data)
    ```
    {:.snippet__code.snippet__code--lightgreen}

- On-chain signature
    * On-chain signature consists of interacting directly with the safe account. Hence, no further action is required to make it available to other users.

    ```ts
    const txHash = await safeSdk.getTransactionHash(safeTransaction)
    const approveTxResponse = await safeSdk.approveTransactionHash(txHash)
    await approveTxResponse.wait()
    ```
    {:.snippet__code.snippet__code--lightgreen}

    It is also possible to retrieve all the owners who approved a transaction:

    ```ts
    const ownersWhoApproved = await safeSdk.getOwnersWhoApprovedTx(txHash)
    ```
    {:.snippet__code.snippet__code--lightgreen}

- Transaction execution
    ```ts
    const txResponse = await safeSDk.executeTransaction(safeTransaction)
    await txResponse.wait()
    ```
    {:.snippet__code.snippet__code--lightgreen}

    > The transaction execution includes the signing of the transaction, so if there is only one missing signature to reach the threshold, the signature step can be skipped, and the transaction can be executed directly.
    {:.mt-3}
