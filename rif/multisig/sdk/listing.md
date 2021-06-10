---
layout: rsk
title: RIF Multisig SDK - Transaction listing
---

**Required packages**:

- [@gnosis.pm/safe-service-client](https://www.npmjs.com/package/@gnosis.pm/safe-service-client) (still in alpha version as June 2021), client SDK to facilitate the interaction with the [Safe Transaction Service API](https://github.com/gnosis/safe-transaction-service).

## SafeServiceClient initialization

```ts
import SafeServiceClient from "@gnosis.pm/safe-service-client";

const safeService = new SafeServiceClient(SAFE_TRANSACTION_SERVICE_URL)
```

## Get Safe accounts by owner

It retrieves the list of safes for which the account provided is among the owners.

```ts
const safesByOwner: OwnerResponse = await safeServiceClient.getSafesByOwner(
    ownerAddress
);
```

Parameters:
- `ownerAddress: string` - the address of the owner for which we want to retrieve the safe addresses

## Get the list of pending transactions

With the list of safe addresses previously retrieved, we need to collect all the pending transactions for each safe address.

```ts
const pendingTransactions = await safeService.getPendingTransactions(safeAddress);
```

Parameters:
- `safeAddress: string` - the address of the safe for which we want to retrieve the transactions
- `nonce?: number` - optional, it is used to filter the transactions with nonce greater than or equal to the one specified.

It uses the following query to retrieve all transactions:

```ts
const PENDING_TRANSACTIONS_URL = /safes/${safeAddress}/multisig-transactions/?executed=false&nonce__gte=${nonce}`
```

The service doesn't allow filtering transactions by confirmations, so the filter must be applied on client-side after retrieving the transactions.
For checking if a transaction has been confirmed by an owner, we need to check the `confirmations` array field in the transactions retrieved.

Transaction format:

```json
{
    "safe": "string",
    "to": "string",
    "value": "string",
    "data": "string",
    ...
    "confirmations": [
        {
            "owner": "string",
            "submissionDate": "2021-06-10T08:55:22.014Z",
            "transactionHash": "string",
            "signature": "string",
            "signatureType": "string"
        }
    ],
    "signatures": "string"
}
```

Each confirmation has the following format:

```json
{
    "owner": "string",
    "submissionDate": "2021-06-10T08:55:22.014Z",
    "transactionHash": "string",
    "signature": "string",
    "signatureType": "string"
}
```
So to verify if a transaction is pending because of a specific owner approval, we need to check if that owner is among the ones who haven't confirmed the transaction yet. If the owner has already confirmed the transaction, it means the transaction is still pending because of other approvals (the approvals don't satisfy the threshold yet).

## Get the transaction history

With the list of safe addresses previously retrieved, we need to collect all the transactions (either pending or executed) for each safe address.

```ts
const transactionHistory = await safeServiceClient.getMultisigTransactions(safeAddress)
```

## Get the list of past transactions

Right now the `safe-service-client` package doesn't provide a method to retrieve all the **past** transactions, so we need to query the [Safe Transaction Service API](https://github.com/gnosis/safe-transaction-service) URL directly. 
With the list of safe addresses previously retrieved, we need to collect all the **past** transactions for each safe address.

```ts
const url = `${SAFE_TRANSACTION_SERVICE_URL}/api/v1/safes/${safe}/all-transactions/?queued=false&executed=true`;
```

So we could use the [axios package](https://github.com/axios/axios#axios) to fetch data.

```ts
import axios from 'axios';

const axiosResponse = await axios.get(url);
const transactions = axiosResponse.data
```

**Important**: Since that the library is still in alpha version, all the methods afore mentioned don't allow to query transactions per page, and the default limit is set to 100.