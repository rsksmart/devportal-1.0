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