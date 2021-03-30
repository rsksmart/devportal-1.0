---
layout: rsk
title: About RIF Enveloping
tags: rif, enveloping, rsk, envelope, gas station network, gsn
permalink: /rif/enveloping/
description: "RIF Enveloping provides the RSK ecosystem with the means to allow blockchain applications and end-users (wallet-apps) to transact without needing RBTC."
---

RIF Enveloping provides the RSK ecosystem with the means to allow blockchain applications and end-users (wallet-apps) to transact without needing RBTC.

- [Architecture](/rif/enveloping/architecture/)
- [Intro](/rif/enveloping/intro/)
- [Setup](/rif/enveloping/dev-setup/)
- [User Guide](/guides/rif-enveloping/)
- [Gas Costs](/rif/enveloping/gas-costs/)
- [Testnet](/rif/enveloping/testnet/)

## Guide

Checkout out the [Enveloping guide](/guides/rif-enveloping/)
for a step-by-step walkthrough on getting started and using Enveloping.

## Goals

Most blockchains have native tokens to pay for transaction fees. This simple design has many benefits. First, to bootstrap an economy, the native token model creates an initial demand for a new token. Second, it simplifies the interaction between users and miners because it forces them to use the same means of payment. Third, it reduces the complexity of the consensus rules. Finally, it provides Denial of Service (DoS) protection to the network as full nodes can pay what the miners expect to include a received transaction. This way nodes can decide to propagate a transaction or not, preventing the free consumption of network bandwidth, and stop spam transactions. But with the advent of Decentralized Finance (DeFi), several stable coins have become a preferred means of payment and savings for both users and miners, therefore, separate systems to facilitate alternative payment mechanisms. Transactions that enable paying transactions with any coin other than the native currency are named meta-transactions because in some systems the user transaction is embedded in a higher-level (or meta) transaction created by a third party. A more accessible term for these transactions is “envelopes” or, for the whole system, an Enveloping system. A meta-transaction/enveloping system can serve at least two different use cases: 1) pay the transaction fees with tokens, where one new party receives the tokens (from the user) and pays the gas on behalf of the user, and 2) enable smart contract developers to subsidize the gas used to interact with their contracts.

The main goal of the RIF Enveloping Project is to provide the RSK ecosystem with the means to allow blockchain applications and end-users (wallet-apps) to transact without needing RBTC. The system should allow RSK users to pay transaction fees with methods of payment (i.e., tokens) other than RBTC while maintaining their accounts as transaction senders.

The first iteration of RIF Enveloping was based on the great work done by the Gas Station Network team: [Gas Station Network](https://www.opengsn.org/).

## Glossary

1. Sponsor: A third party that pays the gas consumed by a sponsored transaction (see below) by submitting it to the blockchain.
2. Sponsored Transaction: A transaction sent by the requester (see below) through the Sponsor, this type of transaction aims to separate the gas payer from the sender of the transaction.
3. Requester: It’s an EOA. The requester sends a sponsored transaction to the Sponsor. She does not pay the gas with native-currency but with a token accepted by the Sponsor, if they don’t subsidize it.
4. Recipient: An abbreviation for recipient contract. It’s the destination of the requester’s transaction.
5. Envelope: Using the “envelopes” analogy, it’s the transaction, (funded with native cryptocurrency as gas) sent by the Sponsor to the blockchain, that wraps the requester’s transaction payload (sponsored transaction).
6. Enveloping: The entire system which allows the relay of sponsored transactions.
7. DoS: A Denial of Service is an information-security threat whose goal is to become a service unavailable.
8. DeFi: An acronym for Decentralized Finance, it’s a novel form for finance based in blockchain technology.
9. EOA: An External Owned Account (EOA) is an account managed with a key, which is capable of signing and sending transactions, and paying the cost for it.

## Index of Contracts and Components

- **Relay Provider** - The access point to the Enveloping system for dApps using Web3. It wraps the RelayClient to provide Web3 compatibility.
- **Relay Client** - The access point to the Enveloping system. It creates, signs, and sends the Sponsored transaction, which is signed by the requester and forwarded to the Relay Server via the HTTP protocol.
- **Relay Server** - The Relay Server receives the sponsored transaction via HTTP from the Relay Client.
The server has only one Relay Manager address and only one Relay Worker and points to just one Relay Hub.
When the Relay Server receives an http “relay” request, it creates an Envelope, wrapping the sponsored transaction, signs it using its Relay Worker address and then sends it to the Relay Hub contract.
- **Contract Interactor** - A provider and wrapper for all the smart contract ABIs.
- **Relay Manager** - An on-chain account that has staked balance. It delegates the requests to Relay Workers, which are the actual initiators of the relay flow. Any penalization done against a Relay Worker impacts the Relay Manager's stake. A Relay Worker can be managed by only one Relay Manager. A Relay Manager can have one or more Relay Workers. The responsibilities of the Relay Manager are: register the Relay Server and add relay workers, both in the Relay Hub.
- **Relay Worker** - An EOA that belongs to only one Relay Manager. It’s the sender of the Relay Request.
- **Enveloping Request** - It’s the Sponsored Transaction, the structure used to relay a transaction. It is formed by Relay Data and Forward Request.
    - **Relay Data** - All information required to relay the defined Forward Request.
    - **Forward Request** - It is formed by all the "common" transaction fields in addition to all the token-payment data and the Proxy Factory address as well.
When the Sponsor creates an Envelope (the actual blockchain transaction to submit), it will add this Enveloping Request (sponsored transaction) as part of the encoded data, along with the contract and method to call (RelayHub and relayCall respectively)
.
- **Proxy Factory**  - Factory of Proxies to the SmartWallet logic. The Smart Wallet itself is a template with portions delegated to an optional custom logic (which is also a proxy pattern).
- **Proxy** - A simple proxy that delegates every call to a SmartWallet logic address. This proxy is the one instantiated per SmartWallet, and it will receive the SmartWallet template address as Master Copy (MC). So every call made to this proxy will end up executing the logic defined in the MC.
For the transaction execution (`execute()` call), MC logic will do the signature verification and payment. Then it will execute the request, and, if custom logic was defined, it will forward the flow to it before returning.
- **Smart Wallet** - It’s the “contract-based account” owned by the Requester’s EOA.
It is the one that calls the Recipient contract (i.e, the `msg.sender` address the Recipient will see). During the execution,  the contract verifies the Enveloping Request and, if it’s valid, it calls the defined Recipient’s function, otherwise it reverts the invocation. The verification includes checking that the owner of the SmartWallet made the request, rejecting any request with an invalid signature, and preventing replay attacks using a nonce.

Moreover, when a proxy to the Smart Wallet is created, it can define a custom logic that replaces what is done with the Enveloping Request after verifying it. With no custom logic, the recipient is called, but with custom logic, the request is delegated to the logic code.
If a custom logic is set, it can be initialized (which would impact the proxy’s state of course). This happens automatically during the deployment of the Proxy if the code of the logic contract has defined a function that conforms to the initialize(bytes) ABI.

## Ways to create smart wallets

There are **two ways** to create a Smart Wallet:

1. **Regular transaction:** The Requester (or another account on behalf of the Requester) calls the Proxy Factory asking to get a new Smart Wallet. Therefore the Proxy Factory creates a proxy to the SmartWallet code, delegating the ownership to the Requester.
2. **Sponsored:** It needs to go through the Enveloping process, which is described in detail below. The requester asks a third party to pay for the Smart Wallet deployment, and the requester pays in tokens for that (or free if it is subsidized by the third-party, a.k.a, Sponsor).

## Terminology

- **GSNEip712Library** - This is an auxiliary library that bridges the Relay Request into a call of a Smart Wallet or Proxy Factory (in such case, the Request is a Deploy Request).
- **Paymaster** - The Paymaster is an abstract contract that authorizes a specific relay request, it is the one paying the RelayWorker with native cryptocurrency so, in the specific implementation to be used/implemented, it would be beneficial to check that the payment in tokens is destined to the paymaster itself or an account the paymaster accepts as a valid recipient.
The abstract contract has two hook methods, one to authorize the request and perform all the logic before executing the request (preRelayedCall), and another one to do logic after the execution (postRelayedCall).
Two example implementations are provided:
    - **Relay Paymaster** - The Relay Paymaster has a list of tokens that it accepts. When it receives a relay request, checks the token’s acceptance and the payer’s balance for the token.
    - **Deploy Paymaster** - An implementation used in the SmartWallet deployment process. It performs the same Token Paymaster’s checks but also, it makes sure that the SmartWallet to be deployed doesn’t already exist and that a Proxy Factory address is provided in the Relay Request and it is the factory instance accepted by the paymaster.
- **Relay Hub** - The Relay Hub is the main on-chain component of the Enveloping architecture. It acts as an interface with the Relay Server and the whole on-chain architecture. It receives the Relay Request and forwards it to the Smart Wallet. Also, the Relay Hub forms part of the relay worker’s registration process together with the Relay Managers. Furthermore, the Relay Hub keeps the balances the Paymasters will use to pay the relay workers for their transaction submission. A Paymaster without enough balance in the Relay Hub to pay for the relay of a transaction will cause the relay call to revert.
- **Stake Manager** - The Stake Manager supports multiple Relay Hubs, the stakers are the Relay Managers and they can authorize/de-authorize specific Relay Hubs so they can penalize the managers if needed. The staked cryptocurrency is held in the StakeManager contract.
The account staking for a specific Relay Manager for the first time becomes the owner of the stake, only this account can make subsequent stakes for this specific RelayManager.
    When a Relay Manager unauthorised a Relay Hub, it means it is unstaking from it, which also means not being able to relay through that hub any more. Any balance held in the Relay Hub (as a consequence of being paid by a Paymaster) is sent to the original sender of the stake (the owner). Also, the workers’ balances are transferred to the stake owner, and, if configured, the Relay Manager’s balance can also be transferred to the stake owner.
    Unstaking has a predefined delay (in blocks). This is intended to prevent the Relay Manager from unstaking before a slashing that was going to occur.

**Execution flow (Smart Wallet already created)**

![Enveloping - Execution Flow](/assets/img/rif-enveloping/Execution-flow.jpg)

1. A Requester creates a request.
2. A Requester sends the request to the Relay Client (through Relay Provider).
3. The Relay client wraps the request into a  Relay Request and signs it.
4. The Relay Client sends the Relay Request to the Relay Server (via HTTPClient-HTTPServer)
5. The Relay Server create a transaction including the Relay Request and signs it with a Relay Worker account
6. The Relay Worker account is an EOA registered in the Relay Hub
7. The Relay Server sends the transaction to the Relay Hub using the same worker account as the previous step, executing the relayCall function of the Relay Hub contract.
  ```solidity
  function relayCall(
       uint paymasterMaxAcceptanceBudget,
       GsnTypes.RelayRequest calldata relayRequest,
       bytes calldata signature,
       bytes calldata approvalData,
       uint externalGasLimit
   )
  ```
    - When the Relay Hub receives a transaction from a Relay Worker, it verifies with the StakeManager that the Worker’s Relay Manager has indeed locked funds for staking (using isStacked). If not, the execution is reverted.
    - The Relay Worker account must have funds to pay the consumed gas (RBTC).
        - This verification is done in the Relay Client and in the Relay Server as well. Then, it is done again in the Relay Hub.
    - The Relay Hub takes the Relay Paymaster address from the Relay Request and checks if it has enough funds locked in the Relay Hub to cover the total maximum charge (RBTC) of the relay, if not the execution is reverted as well.
8. The Relay Hub invokes the preRelayCall method in the Relay Paymaster contract passing the received Relay Request and waits for the Relay Paymaster to answer if it is possible to execute (true) or not (false).
9. The Relay Paymaster executes its preRelayCall method and must ensure that the Requester is able to pay the tokens.
    - The Relay Paymaster checks that it accepts the token used to pay and that the payer has a sufficient token balance. In addition, it verifies the used smart wallet is the correct one. If everything is okay, then the Paymaster returns true.
10. The RelayHub instructs the Smart Wallet to execute the Relay Request.
    ```solidity
      (forwarderSuccess, vars.relayedCallSuccess,lastSuccTrx, vars.relayedCallReturnValue) = GsnEip712Library.execute(relayRequest, signature);
    ```
11. The Smart Wallet checks the signature and the nonce of the Requester, reverting if it fails the checking.
12. Then, the Smart Wallet performs the token transfer between the Requester and the token recipient, using the data received within the Relay Request.
13. It invokes the recipient contract with the indicated method in the Forward Request
14. Finally, the Relay Hub calls the Paymaster (using the method postRelayCall).
    ```solidity
    vars.data = abi.encodeWithSelector(
            IPaymaster.postRelayedCall.selector,
            vars.recipientContext,
            vars.relayedCallSuccess,
            totalInitialGas - gasleft(), /*gasUseWithoutPost*/
            relayRequest.relayData
        );
    ```

**The Smart Wallet with gasless EOA creation flow**

![Enveloping - Smart Wallet with Gasless EOA](/assets/img/rif-enveloping/SmartWalletWithGasless.jpg)

The gas-less requester has a SmartWallet address where they receive tokens but don't use them. If the requester needs to call a contract, e.g,  to send the tokens to another account, they must deploy a Smart Wallet first.

1. A Requester creates a deployWallet request.
2. A Requester sends the request to the Relay Server through Relay Client.
3. Relay Client wraps the transaction sent by the Requester in a Deploy Request to create the Smart Wallet and signs it.
4. The Relay Client sends to the Relay Server a Deploy Request (via HTTPClient-HTTPServer)
5. The Relay Server signs the transaction containing the Deploy Request, with the Relay Worker account.
6. The Relay Server sends the request to the Relay Hub using the Relay Worker account executing the relay call function of the Relay Hub contract. Following the same process from step 6.
7. The Relay Hub invokes the `preRelayCall` method in the Deploy Paymaster contract using the received Deploy Request as parameters.
8. The Deploy Paymaster must ensure:
    - The Paymaster accepts the offered tokens.
    - The Proxy Factory instance to use is known by the paymaster
    - The Proxy Factory contract isn’t creating an existing Smart Wallet.
    - The requester has enough tokens to pay.
9. The Relay Hub calls the Proxy Factory using the method relayedUserSmartWalletCreation.
10. The Proxy Factory performs the following checks:
    - Checks the sender’s nonce.
    - Checks the Deploy Request signature
11. The Proxy Factory using the `create2` opcode creates the Smart Wallet.
12. Then it calls the `initialize` function in the Smart Wallet contract.
    - The Smart Wallet, during its initialization, executes the token transfer.
    - Then it initializes the Smart Wallet state and sets the requester’s EOA as the owner of the Smart Wallet
    - In the case there is a custom logic,  its initialization is called as well.
13. The Relay Hub executes `postRelayCall` in the Paymaster.
