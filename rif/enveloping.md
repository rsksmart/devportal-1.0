---
layout: rsk
title: Enveloping
tags: rif, enveloping, rsk, envelope, gas station network, gsn
description: "RIF Enveloping provides the RSK ecosystem with the means to allow blockchain applications and end-users (wallet-apps) to transact without needing RBTC."
---

RIF Enveloping provides the RSK ecosystem with the means to allow blockchain applications and end-users (wallet-apps) to transact without needing RBTC.

## Goals

Most blockchains have native tokens to pay for transaction fees. This simple design has many benefits. First, to bootstrap an economy, the native token model creates an initial demand for a new token. Second, it simplifies the interaction between users and miners because it forces them to use the same means of payment. Third, it reduces the complexity of the consensus rules. Finally, it provides Denial of Service (DoS) protection to the network as full nodes can pay what the miners expect to include a received transaction. This way nodes can decide to propagate a transaction or not, preventing the free consumption of network bandwidth, and stop spam transactions.



With the advent of Decentralized Finance (DeFi), several stablecoins have become a preferred means of payment and savings for both users and miners, therefore, separate systems to facilitate alternative payment mechanisms. Transactions that enable paying transactions with any coin other than the native currency are named meta-transactions because in some systems the user transaction is embedded in a higher-level (or meta) transaction created by a third party.

A more approachable term for these transactions is “envelopes” or, for the whole system, an Enveloping system. A meta-transaction/enveloping system can serve at least two different use cases: 1) pay the transaction fees with tokens, where one new party receives the tokens (from the user) and pays the gas on behalf of the user, and 2) enable smart contract developers to subsidize the gas used to interact with their contracts. 

The main goal of the RIF Enveloping Project is to provide the RSK ecosystem with the means to allow blockchain applications and end-users (wallet-apps) to transact without needing RBTC. The system should allow RSK users to pay transaction fees with methods of payment (i.e., tokens) other than RBTC while maintaining their accounts as transaction senders. 

The first iteration of RIF Enveloping was based on the great work done by the Gas Station Network team: [Gas Station Network](https://www.opengsn.org/).

## Glossary

1. Sponsor: A third party that pays the gas consumed by a sponsored transaction (see below) by submitting it to the blockchain.
2. Sponsored Transaction: A transaction sent by the requester (see below) through the Sponsor, this type of transaction aims to separate the gas payer from the sender of the transaction.
3. Requester: It’s an EOA. The requester sends a sponsored transaction to the Sponsor. She does not pay the gas with native-currency but with a token accepted by the Sponsor, if they don’t subsidize it.
4. Recipient: An abbreviation for recipient contract. It’s the destination of the requester’s transaction.

## Index of Contracts and Components

- **Relay Provider** - The access point to the Enveloping system for dApps using Web3. It wraps the RelayClient to provide Web3 compatibility.
- **Relay Client** - The access point to the Enveloping system. It Creates, signs, and sends the Enveloping Request, which is signed by the requester and forwarded to the Relay Server via the HTTP protocol.
- **Relay Server** - The Relay Server receives the Enveloping Request via HTTP from the Relay Client. The server has only one Relay Manager address and only one Relay Worker and points to just one Relay Hub. When the Relay Server receives a request, it signs the sponsored transaction using its Relay Worker address and then sends it to the Relay Hub contract.
- **Contract Interactor** - A provider and wrapper for all the smart contract ABIs.
- **Relay Manager** - An on-chain account that has staked balance. It delegates the requests to Relay Workers, which are the actual initiators of the relay flow. Any penalization done against a Relay Worker impacts the Relay Manager's stake. A Relay Worker can be managed by only one Relay Manager. A Relay Manager can have one or more Relay Workers. The responsibilities of the Relay Manager are: register the Relay Server and add relay workers, both in the Relay Hub.
- **Relay Worker** - An account address that belongs to only one Relay Manager. It’s the sender of the Relay Request.
- **Enveloping Request** - The structure used to relay a transaction. It is formed by Relay Data and Forward Request.
    - **Relay Data** - All information required to relay the defined Forward Request. 
    - **Forward Request** - It is formed by all the "common" transaction fields in addition to all the token payment data and the Proxy Factory address as well.
- **Proxy Factory**  - Factory of Proxies to the SmartWallet logic. The Smart Wallet itself is a Template with portions delegated to an optional custom logic (which is also a proxy pattern).
- **Proxy** - A simple proxy that delegates every call to a SmartWallet logic address. This proxy is the one instantiated per smart wallet, and it will receive the Smart Wallet template address as Master Copy (MC). So every call made to this proxy will end up executing the logic defined in the MC. 
    - For the transaction execution (`execute()` call), MC logic will do the signature verification and payment. Then it will execute the request, and, if custom logic was defined, it will forward the flow to it before returning.
- **Smart Wallet** - It’s the “contract-based account” owned by the Requester, the one that calls the Recipient contract (i.e., the `msg.sender` address the Recipient will see). During the execution,  the contract verifies the Enveloping Request and, if it’s valid, it calls the defined Recipient’s function, otherwise it reverts the invocation. The verification includes checking that the owner of the Smart Wallet made the request, rejecting any request with an invalid signature, and preventing replay attacks using a nonce. Finally, it invokes the recipient contract's function.

Moreover, the Smart Wallet allows adding, only during deployment, custom logic for the next functions: initialization, execution, and fallback.

**There are two ways of creating a Smart Wallet:**

1. **Regular transaction**: The Requester (or another account on behalf of the Requester) calls the Proxy Factory asking to get a new Smart Wallet. Therefore the Proxy Factory creates one delegating the ownership to the Requester.
2. **Sponsored**: It needs to go through the Enveloping process, which is described in detail below. The requester asks a third party to pay for the Smart Wallet deployment, and the requester pays in tokens for that (or free if it is subsidized by the third-party, a.k.a, Sponsor).

- **GSNEip712Library** - This is an auxiliary library that bridges the Relay Request into a call of a Smart Wallet or Proxy Factory (in such case, the Request is a Deploy Request)
- **Paymaster** - The Paymaster is an abstract contract that authorizes a specific relay request. It has two hook methods, one to authorize the request and perform all the logic before executing the request (preRelayedCall), and another one to do logic after the execution (postRelayedCall). 
    - **Relay Paymaster** - Maintains a list of tokens that it accepts. When it receives a relay request, checks the token’s acceptance and the payer’s balance for the token.
    - **Deploy Paymaster** - An implementation used in the Smart Wallet deployment process. It performs the same Token Paymaster’s checks but also, it makes sure that the Smart Wallet to be deployed doesn’t already exist and that a Proxy Factory address is provided in the Relay Request.
- **Relay Hub** - The Relay Hub is the most central component of Enveloping architecture. It acts as an interface with the Relay Server and the whole on-chain architecture. It receives the Relay Request and forwards it to the Smart Wallet. Also, the Relay Hub forms part of the relay worker’s registration process together with the Relay Managers. Furthermore, the Relay Hub keeps the balances staked by the Relay Workers and Paymasters.
- **Stake Manager** - The Stake Manager supports multiple Relay Hubs, the stakers are the Relay Managers and they can authorize/deauthorize specific Relay Hubs so they can penalize the managers if needed.

Deauthorizing a Relay Hub means unstaking it, which also means not being able to relay through that hub anymore. Unstaking has a predefined delay (in blocks). This is intended to prevent the Relay Manager from unstaking before a slashing that was going to occur.

**Execution flow (Smart Wallet created without custom logic)**

![Enveloping - Execution Flow](/assets/img/rif-enveloping/Execution-flow.jpg)

1. A Requester creates a transaction and signs it.
2. A Requester sends the transaction to the Relay Client (through Relay Provider).
3. The Relay client creates a  Relay Request containing the Requester’s transaction.
4. The Relay Client sends the Relay Request to the Relay Server (via HTTPClient-HTTPServer)
5. The Relay Server signs the Relay Request with a Relay Worker account
6. The Relay Worker account is an EOA registered in the Relay Hub
7. The Relay Server sends the request to the Relay Hub using the same worker account as the previous step, executing the relayCall function of the Relay Hub contract.
  ```solidity
  function relayCall(
         uint paymasterMaxAcceptanceBudget,
         GsnTypes.RelayRequest calldata relayRequest,
         bytes calldata signature,
         bytes calldata approvalData,
         uint externalGasLimit
     )
  ```
  - The Relay Worker account has funds to pay the consumed gas (RBTC).
  ```solidity
  balances[relayRequest.relayData.paymaster] = balances[relayRequest.relayData.paymaster].sub(charge);
         balances[workerToManager[msg.sender]] = balances[workerToManager[msg.sender]].add(charge);
  ```
  - This verification is done in the Relay Client and in the Relay Server as well. Then, it is done again in the Relay Hub (7).
  - The Relay Manager account locks funds in the Relay Hub for staking (penalization).
  - When the Relay Hub receives a transaction from a Relay Worker, it verifies that the manager’s Relay Worker has indeed locked funds for staking (using isStacked). If not, the execution is reverted.
  - The Relay Hub takes the Token Paymaster address from the Relay Request and checks if it has enough funds locked in the Relay hub to cover the gas (RBTC) to be used by the Relay Call, if not the execution is reverted as well.
8. The Relay Hub invokes the preRelayCall method in the Token Paymaster contract passing the received Relay Request and waits for the Token Paymaster to answer if it is possible to execute (true) or not (false).
9. The Token Paymaster executes its preRelayCall method and must ensure that the Requester is able to pay. 
 - The Token Paymaster checks that it accepts the token used to pay and that the payer has sufficient token balance. If everything is okay, then the Paymaster returns true.
10. The RelayHub instructs the Smart Wallet to execute the Relay Request.
  ```solidity
  (forwarderSuccess, vars.relayedCallSuccess,lastSuccTrx, vars.relayedCallReturnValue) = GsnEip712Library.execute(relayRequest, signature);
  ```
11. The Smart Wallet checks the signature and the nonce of the Requester, reverting if it fails the checking.
12. Then, the Smart Wallet performs the token transfer between the Requester and the relayer, using the data received within the Relay Request.
13. It invokes the recipient contract with the indicated method in the Forward Request
    - If the execution fails, the Smart wallet reverts.
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

The gas-less requester has an ERC20 address where they receive tokens but don't use them. If the requester needs to send the tokens to another account, they must deploy a Smart Wallet first.

1. A Requester creates a transaction and signs it.
2. A Requester sends the transaction to the Relay Server through Relay Client.
3. Relay Client wraps the transaction sent by the Requester in a Deploy Request to create the Smart Wallet.
4. The Relay Client sends to the Relay Server a Deploy Request (via HTTPClient-HTTPServer)
5. The Relay Server sign the Deploy Request with the Relay Worker account
    - The Relay Worker account is an EOA registered in the Relay Hub
6. The Relay Server sends the request to the Relay Hub using the Relay Worker account executing the relay call function of the Relay Hub contract. 
7. The Relay Hub invokes the `preRelayCall` method in the Deploy Paymaster contract using the received Deploy Request as parameters.
8. The Deploy Paymaster must ensure:
    - The Paymaster accepts the offered tokens.
    - The Proxy Factory contract isn’t creating an existing Smart Wallet.
    - The requester has enough tokens to pay.
9. The Relay Hub calls the Proxy Factory using the method relayedUserSmartWalletCreation.
10. The Proxy Factory performs the following checks:
    - Checks the sender’s nonce.			
    - Checks the Deploy Request signature
11. The Proxy Factory using the `create2` opcode creates the Smart Wallet calling the `initialize` function in the Smart Wallet contract. 
12. The Smart Wallet, before deployment, executes the token transfer.
13. Then it initializes the Smart Wallet logic and sets the requester as the owner of the Smart Wallet 
    - In the case there is a custom logic for initialization is called as well.	
14. The Relay Hub executes `postRelayCall` in the Paymaster.