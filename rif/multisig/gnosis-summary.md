---
layout: rsk
title: Gnosis Summary
description: Overview of the gnosis integration
tags: rif gnosis multisig
render_features: 'collapsible'
---

As mentioned before, Gnosis Safe solution consists of four main modules. This suite is deployed to Ethereum and other EVM networks and, from now on, to RSK.

[](#top "collapsible"){:.open}
- A) The smart contracts
  * The suite of the smart contracts has the following structure:

    * A Gnosis Safe implementation. It implements functionality for:
      * Managing owners<sup>(1)</sup> and threshold<sup>(2)</sup>
      * Submitting signatures or transactions pre-signed off-chain
      * Rejecting transactions
      * Allowing gas payments with tokens (relayed transactions)
      * Enhanced for adding modules <sup>(3)</sup> 
    * A proxy factory contract that deploys proxies using Gnosis Safe implementation in two transactions

    ![Gnosis Safe - Smart contracts interaction](/assets/img/rif-multisig/gnosis-safe-smart-contracts.png)

    {:.no-style}
    * Repo: [https://github.com/gnosis/safe-contracts](https://github.com/gnosis/safe-contracts)
    * Deployments: [https://github.com/gnosis/safe-deployments/tree/main/src/assets/v1.2.0](https://github.com/gnosis/safe-deployments/tree/main/src/assets/v1.2.0)
    * <sup>(1)</sup>Owners: accounts enabled to sign and approve/reject multisig transactions
    * <sup>(2)</sup>Threshold: amount of owners that need to sign to approve and send a transaction
    * <sup>(3)</sup>Those functionalities are not included in this project


- B)  Transaction service
  * The transaction service exposes a REST API for multisig (and other features used in the UI). It collects all the multisig information using <code>trace_transaction</code> and <code>trace_blocks</code>.
    Furthermore, it allows collecting off-chain signatures and retrieving multisig pending transactions.

    ![Gnosis Safe - Transaction Service](/assets/img/rif-multisig/gnosis-safe-transaction-service.png)

    {:.no-style}
    * Repo: [https://github.com/gnosis/safe-transaction-service](https://github.com/gnosis/safe-transaction-service)

- C) The Core SDK
  * A Javascript SDK that currently implements most of the functionalities required.

  ```typescript
  interface Safe {
    connect({ providerOrSigner, safeAddress, contractNetworks }: ConnectEthersSafeConfig): void
    getProvider(): Provider
    getSigner(): Signer | undefined
    getAddress(): string
    getMultiSendAddress(): string
    getContractVersion(): Promise<string>
    getNonce(): Promise<number>
    getOwners(): Promise<string[]>
    getThreshold(): Promise<number>
    getChainId(): Promise<number>
    getBalance(): Promise<BigNumber>
    getModules(): Promise<string[]>
    isModuleEnabled(moduleAddress: string): Promise<boolean>
    isOwner(ownerAddress: string): Promise<boolean>
    createTransaction(...safeTransactions: SafeTransactionDataPartial[]): Promise<SafeTransaction>
    createRejectionTransaction(nonce: number): Promise<SafeTransaction>
    getTransactionHash(safeTransaction: SafeTransaction): Promise<string>
    signTransactionHash(hash: string): Promise<SafeSignature>
    signTransaction(safeTransaction: SafeTransaction): Promise<void>
    approveTransactionHash(hash: string): Promise<ContractTransaction>
    getOwnersWhoApprovedTx(txHash: string): Promise<string[]>
    getEnableModuleTx(moduleAddress: string): Promise<SafeTransaction>
    getDisableModuleTx(moduleAddress: string): Promise<SafeTransaction>
    getAddOwnerTx(ownerAddress: string, threshold?: number): Promise<SafeTransaction>
    getRemoveOwnerTx(ownerAddress: string, threshold?: number): Promise<SafeTransaction>
    getSwapOwnerTx(oldOwnerAddress: string, newOwnerAddress: string): Promise<SafeTransaction>
    getChangeThresholdTx(threshold: number): Promise<SafeTransaction>
    executeTransaction(safeTransaction: SafeTransaction): Promise<ContractTransaction>
    }
  ```
  
    {:.no-style}
    * Repo: [https://github.com/gnosis/safe-core-sdk/tree/main/packages/safe-core-sdk](https://github.com/gnosis/safe-core-sdk/tree/main/packages/safe-core-sdk)

- D) The UI
  * Users can log in with an existent Gnosis Safe, or they can create a new one. It allows to view and to send assets, to show the transaction list, and to edit the safe settings properties (owners, threshold)

    ![Gnosis Safe - UI](/assets/img/rif-multisig/gnosis-safe-ui.png)

    {:.no-style}
    * Repo: [https://github.com/gnosis/safe-react](https://github.com/gnosis/safe-react)
