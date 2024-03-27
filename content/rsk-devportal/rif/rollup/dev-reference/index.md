---
menu_order: 1200
section_title: Developer Reference
menu_title: Getting Started
layout: rsk
title: Getting Started
description: The developer reference section provides all information you need to use and integrate the RIF Rollup using the SDKs available. 
tags: rif, aggregation, zksync, rollup
---

This section provides all information you need to setup and integrate the RIF Rollup [using the SDKs and APIs](sdk). 

## General Setup

* Install `Node` (requires version 14.14.0 or higher) and NPM.
* Install `yarn`. Instructions can be found on the [yarn official site](https://classic.yarnpkg.com/en/docs/install/). Check if `yarn` is installed by running `yarn -v`. See the yarn documentation.

See the [RIF Rollup User Guide](/guides/rif-rollup/)

## Supported Tokens

RIF Rollup has a list of accepted tokens. A token is added to RIF Rollup via a transaction to its smart contract on L1. The listed tokens are the only tokens available to transact or pay the fees on L2. Each token has an ID, the L1 native token (RBTC) has the ID zero.

RIF Rollup requires fees for transactions to cover expenses for network operations and paying gas fees on L1. In contrast to L1 transactions (though this can be achieved by using [RIF Relay](https://github.com/rsksmart/rif-relay)), L2 transactions can be paid using any listed token that is available to be used as a fee token. A fee token is a listed token with a liquid market volume.

RIF Rollup can be used to transfer RBTC and ERC20 tokens. The full list of currently supported tokens is available under this [link](https://explorer.dev.aggregation.rifcomputing.net/). Read more in the [Token](https://github.com/rsksmart/rif-rollup/blob/main/docs/tokens.md#tokens) section.

> DISCLAIMER: Listing of a token on RIF Rollup does not represent an endorsement for this token by the RIF Rollup team, IOVLabs, or any other entity. We do not have competence and authority to analyze the token business model and smart contract security guarantees of a particular token. Please use any token at your own risk and judgment.

## Addresses

* See the [Supported Tokens](https://explorer.testnet.rollup.rif.technology/explorer/tokens) list, which basically comprises of tRBTC, tRIF, USDRIF.

### RNS

Using RIF Name Service (RNS) domains in your dApp. See the [RNS Documentation](/rif/rns/).

## Fees
Fees for each type of transaction are computed based on three main factors:

* Amount of data that will be sent to the L1 network.
* Current gas price on L1 (e.g. currently around 0.06 gwei on Rootstock).
* Cost of computational resources to generate a proof for a block including the transaction.

Fees are low since these fees are distributed among all the transactions included in the rollup block.

### Fee Costs

In RIF Rollup the cost of every transaction has two components:

* **Off-chain part (storage + prover costs):** the cost of the state storage and the SNARK (zero-knowledge proof) generation. This part depends on the use of hardware resources and is therefore invariable.
* On-chain part (gas costs): for every RIF Rollup block the validator must pay gas to verify the SNARK proof, plus additional gas per transaction to publish the state 𝛥, depending on the transaction type. However, this part is orders of magnitude cheaper than the cost of normal RBTC/ERC20 transfers.

### How fees are paid

Transfers in RIF Rollup support "gasless meta-transactions": users pay transaction fees in the tokens being transferred. Thus, for example, if you want to transfer RIFPro stable-coin, there is no need for you to own RBTC or any other tokens. Just pay your fees in a fraction of RIFPro.

## Transaction Batching

Transaction batching allows the user to submit several transactions at the same time, with the added benefit that the collected fee may be calculated for the whole batch instead of per transaction.

## Javascript(JS) SDK

[Transaction batching](https://github.com/rsksmart/rif-rollup-js-sdk-docs/tree/develop/providers#submit-transactions-batch) allows the user to submit several transactions at the same time, with the added benefit that the collected fee may be calculated for the whole batch instead of per transaction.
This allows the user to include any transaction in the batch, whether it operates with a token that is eligible for fee payment or not, since the batch builder allows the user to specify a fee token type that is independent of any of the tokens used in the operations. The user includes several transactions in the batch, each of them with ‘0’ as fee, and then selects a valid fee token when building the Batch transaction using the SDK, then the server will calculate the total amount needed to be paid on that fee token.

See the [JS SDK](./sdk)

For example, for two Transfer operations.

```shell
const batch = await sender
  .batchBuilder()
  .addTransfer({ to: receiver.address(), tokenWithoutLiquidity1, amount })
  .addTransfer({ to: receiver.address(), tokenWithoutLiquidity2, amount })
  .build(tokenForFees);
```

By specifying the fee token (tokenForFees) during the Batch build process, it is expected for all the transactions included to have the “fee amount” in 0, otherwise, the build process will fail. The build process will [automatically calculate](https://github.com/rsksmart/rif-rollup-js-sdk/blob/main/src/batch-builder.ts#L110) the cost for the whole batch, in the provided tokenForFees token. 

For that it will first calculate the fee with the [following formula](https://github.com/rsksmart/rif-rollup/blob/main/core/bin/zksync_api/src/fee_ticker/mod.rs#L408):

> - $ token_risk_factor = 1 $
> - $ token_price_with_risk_in_usd = token_risk_factor / token_price_in_usd $
> - $ total_zkp_fee_in_tokens = cost_per_chunk_in_usd total_chunks token_price_with_risk_in_usd $
> - $ total_gas_fee_in_tokens = wei_in_usd total_gas gas_price_in_wei scale_factor token_price_with_risk_in_usd $
> - $ batch_fee_in_tokens = total_zkp_fee_in_tokens + total_gas_fee_in_tokens $

- `scaleFactor`: is a constant factor applied to the gasPrice to account for price volatility. feeTokenRiskFactor can be used to apply a correction factor that accounts for the risk of accepting the fee token as a method of payment. Currently, it is hardcoded to one but it may be used in future releases of RIF Rollup, or we may implement its use.
- `totalGas`: The batch gas cost is the sum of the calculated gas cost of all the included transactions. Each transaction type has a standard gas cost, consisting of the sum of the Verification cost, the Commit cost, and “processing” cost proportional to the transaction’s Chunk Size. All these values can be found [here](https://github.com/rsksmart/rif-rollup/blob/main/core/bin/zksync_api/src/fee_ticker/constants.rs). To this cost, a [scale factor](https://github.com/rsksmart/rif-rollup/blob/main/etc/env/base/fee_ticker.toml#L24) is applied (by default it is 100 which means no factor) if the transaction type is Transfer, Swap, MintNFT, or ChangePubKey. For fast Withdrawals (the ones that reduce the time-to-block-seal) there’s an extra step. Depending on the number of pending chunks in the current proposed (but pending) block, if there are enough chunks to fit the operation, the additional cost would be a proportional value given by the [AMORTIZED_COST_PER_CHUNK](https://github.com/rsksmart/rif-rollup/blob/main/core/bin/zksync_api/src/fee_ticker/constants.rs#L7) property.
- `zkpFee`: In addition to the total gas cost, there exists the total zkp generation cost, which is calculated as the cost per chunk (in Wei) multiplied by the total number of chunks in the batch.

The batch build process adds the `feeToken` to be used to the last transaction of the batch if the transfer token = feeToken. Otherwise it adds a new Transfer Transaction with 0 amount of feeToken to be transferred.

During the submission of the Batch, the user will invoke `submitTxsBatch` which starts the [submit_txs_batch](https://github.com/rsksmart/rif-rollup/blob/main/core/bin/zksync_api/src/api_server/tx_sender.rs#L633) process on the server.

### JS SDK batch processing

The server makes a distinction between batches that use:

* A **single** token type to pay fees with _feeToken_
* Multiple fee token types

## Networks

The RIF Rollup is available ONLY on [Testnet](https://wallet.testnet.rollup.rif.technology/) at this time.