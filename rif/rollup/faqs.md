---
menu_order: 400
menu_title: FAQs
layout: rsk
title: RIF Rollup - Frequently Asked Questions
description: A list of frequently asked questions on RIF Rollup
tags: rif, aggregation, zksync, rollup, faqs
render_features: 'collapsible'
---

Here are frequently asked question on the RIF Rollup.


[](#top "collapsible")
- **How long are withdrawal times?**
    > - At peak usage of RIF Rollup, the withdrawal time is about 30 minutes. During lower use, it can take up to 7 hours. Currently, withdrawal times depend on the activity on rif rollup, when we finalize blocks, and submit them to L1.
- **How do I know if an address accepts smart contract transfers or is an L2 account?**
    > - To know if an address or account accepts smart contract transfers, the `wallet.getAccountState` method can be used to check if the user has funds available (checking all of depositing, committed and verified balances). Check that any of these balances aren’t empty, this means the user has or has received some funds. Also the `pubKeyHash` can be checked to know if the user activated the account. To check for if an account has been activated, call the JSON RPC method [`account_info`](https://docs.zksync.io/api/v0.1/#account-info) or the REST API [`/accounts/addressOrId/stateType`](https://docs.zksync.io/apiv02-docs/#accounts-api-v0.2-accounts-{accountidoraddress}-{statetype}-get).
- **What is the account activation fee?**
    > - The account activation fee is a one-time fee to register your account with RIF Rollup This fee only applies to your first rif rollup transaction.
    > - The registration process happens directly on the Rootstock smart contract and therefore it is an L1 transaction, so the activation fee is to pay the Rootstock miners and not Rollup validators.
- **Differences between initiated, committed and verified transactions?**
    > - **Initiated:** the RIF Rollup server has received and processed the transaction. If the transaction is a transfer, it is ready for immediate use.
    > - **Committed:** the transaction appears in a block that is committed to the L1 smart contract.
    > - **Verified:** the transaction’s block has been proven and verified on the L1 smart contract.