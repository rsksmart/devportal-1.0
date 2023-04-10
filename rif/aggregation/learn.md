---
menu_order: 200
menu_title: Learn
layout: rsk
title: RIF Aggregation - Architecture
description: ZkSync main architecture
tags: rif, aggregation, zksync
---

The ZkSync system is composed by:
- ZkSync SmartContract (L1)
- Server
- Prover
- Database 

![Aggregation - Architecture](/assets/img/rif-aggregation/architecture.png)

ZkSync SmartContract (L1)
: it's the connection between L1 and L2, it receives *priority* operations from users and rollup transactions from the server.

Server
: it's the L2 component that interacts with all the other components.

Prover
: it waits for non-proven blocks and generates SNARK proofs (The current deployment in Testnet provides a dummy prover).

Database
: it's used to store the L2 blockchain data (e.g.: account balances, transactions, block, etc...)


## Transaction flow

ZkSync transactions can be initiated both on L1 and L2.
- Owners can submit some transaction requests (priority operations only) directly to the ZkSync SmartContract on L1
- Owners can use the L2 API to submit transaction requests through the server.
    1. Prepare and encode the transaction data into a byte sequence
    2. Create a zkSync signature for these bytes with the account private key
    3. Generate an [Ethereum signature](https://zksync.io/dev/payments/sending_transactions.html#sending-transactions-2) or provide an [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) signature
    4. Send the transaction via API ([v0.1](https://docs.zksync.io/api/v0.1/#tx-submit), [v0.2](https://docs.zksync.io/apiv02-docs/#transactions-api-v0.2-transactions-post))
    5. The server **aggregates** multiple transactions into a single rollup block
    6. Once the block is filled, the server sends a cryptographic commitment of the new state of L1 along with a cryptographic proof. At the same time, the minimal information needed for each transaction is published on L1 through [calldata](https://docs.soliditylang.org/en/latest/types.html?highlight=calldata#data-location).
    7. The SmartContract verifies the proof and the calldata state information, confirming the transactions' validity in the rollup block and block data availability.

![Aggregation - Transaction flow](/assets/img/rif-aggregation/transaction-flow.png)


## Operations

**Priority** operations are initiated on the ZkSync SmartContract by an Rootstock (RSK) account. Those operations are then discovered by the server and included in a rollup block as any other **Rollup** operation.

### Priority operations

- *Deposit*: move funds from L1 to L2. If the account doesn't exist, it will be created.
- *FullExit*: withdraw funds from L2 to L1 without interacting with the server, useful in case of detected censorship. This operation must be done separately for each token.

### Rollup operations

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

However, the usage of a new type of account implies that the users cannot directly use regular wallets (e.g.: Metamask) because they don't support the creation of ZkSync accounts (L2 accounts).
