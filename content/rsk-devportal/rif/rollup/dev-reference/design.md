---
menu_order: 500
menu_title: Design and Architecture
layout: rsk
title: Design and Architecture
description: zkSync main architecture and design
tags: rif, aggregation, zksync, rollup
---

The zkSync system is composed by:
- zkSync Smart Contract (L1)
- Server
- Prover
- Database 

![Rollup - Architecture](/assets/img/rif-rollup/architecture.png)

* **zkSync Smart Contract (L1):** This forms the connection between L1 and L2 blockchains. It receives priority operations from users and rollup transactions from the zkSync backend server. It also receives rollup transaction data through block commit, execute and verify transactions from the backend server (through the EthSender microservice).

* **Server:** The backend server (or just “server”) is the central component that interacts directly with the smart contract, prover instances, and the database. It also obtains token price and liquidity feeds from various sources (e.g. CoinMarketCap, CoinGecko, Uniswap). The server is incharge of receiving transactions.

* **Prover:** A prover is responsible for creating or generating ZK-SNARK proofs for each block in the database where the L2 state is stored. Multiple prover instances can be launched to work in parallel. It acts as a client of the ZK Sync server, connected through an HTTP connection. The relation between the server and the clients is one-to-many. The zkSync server exposes to its clients an HTTP API with the `Get_job`, `Working_on`, and `Publish` methods.

* **Database:** This stores L2 blockchain data including account balances, transactions, blocks, block commitment and verification status (on L1), etc.


## Transaction flow

zkSync transactions can be initiated both on L1 and L2.

- Owners can submit some transaction requests (priority operations only) directly to the ZkSync SmartContract on L1
- Owners can use the L2 API to submit transaction requests through the server.
    1. Prepare and encode the transaction data into a byte sequence
    2. Create a zkSync signature for these bytes with the account private key
    3. Generate an [Ethereum signature](https://zksync.io/dev/payments/sending_transactions.html#sending-transactions-2) or provide an [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) signature
    4. Send the transaction via [API](https://docs.zksync.io/apiv02-docs/#transactions-api-v0.2-transactions-post)
    5. The server **aggregates** multiple transactions into a single rollup block
    6. Once the block is filled, the server sends a cryptographic commitment of the new state of L1 along with a cryptographic proof. At the same time, the minimal information needed for each transaction is published on L1 through [calldata](https://docs.soliditylang.org/en/latest/types.html?highlight=calldata#data-location).
    7. The SmartContract verifies the proof and the calldata state information, confirming the transactions' validity in the rollup block and block data availability.

![Rollup - Transaction flow](/assets/img/rif-rollup/transaction-flow.png)

## Operations

There are two types of operations in RIF Rollup:

**Priority** operations are initiated on the ZkSync SmartContract by an Rootstock (RSK) account. Those operations are then discovered by the server and included in a rollup block as any other **Rollup** operation.

### Priority operations

- *Deposit*: move funds from L1 to L2. If the account doesn't exist, it will be created.
- *FullExit*: withdraw funds from L2 to L1 without interacting with the server, useful in case of detected censorship. This operation must be done separately for each token.

### Rollup operations

These Transactions must be submitted to L2 using a rollup (i.e. an L2) account. Transactions are identified by the hash of their serialized representation.

- *ChangePubKey*: sets the signing public key of the L2 account. Without a signing key, the L2 account cannot perform any operation.
- *Transfer*: transfers tokens between L2 accounts.
- *TransferToNew*: transfers token to new L2 accounts, so it creates the receiver L2 account first and then performs the transfer.
- *Swap*: performs an atomic swap of funds between two existing L2 accounts.
- *Withdraw*: withdraws funds from L2 to L1.
- *ForcedExit*: allows a user (known as the initiator) to force a withdrawal of funds from another L2 account that doesn't have a signing key set (i.e. an unowned account), to the same target address on the L1.
- *MintNFT*: mints an NFT in L2.
- *WithdrawNFT*: move an NFT from L2 to an L1 address
- *Noop*: Empty operation. Only used for padding the rollup block with zero bytes (cheap in calldata) to the nearest permitted block size.

## Accounts

In order to perform transactions on L2, the user must be the owner of an L2 account, because those accounts use a different curve for signing, the [JubJub](https://z.cash/technology/jubjub/) curve that is better suited for ZK proofs.
By default, each user owns a regular L1 account, so an L2 account creation and activation is required. For the L2 account creation, the user could deposit some tokens in the ZkSync SmartContract or receive funds to their L2 addresses. For the L2 account activation, the user must set its public key hash via a *ChangePubKey* transaction. The L2 account is created without public key (also known as *unowned*) because of the following reasons:
- if a transfer is valid in L1, it's also valid in L2
- not every address can have a private key
- transfers in L2 may happen without a confirmation by the receiver; in this case, if the receiver doesn't claim ownership, the funds can be transferred to an L1 account.

However, the usage of a new type of account implies that the users cannot directly use regular wallets (e.g.: Metamask) because they don't support the creation of zkSync accounts (L2 accounts).


### SDK enabled operations

The SDK allows for the creation of [batches of transactions](). Transactions can be grouped and submitted in batches, with the benefit of being able to share a single payment fee instead of each transaction defining their respective fee (although both options are available). Batching also solves some issues related to operating with tokens that are not suitable for fees payment.
