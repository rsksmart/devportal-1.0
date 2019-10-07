---
layout: rsk
title: Base Layer
---

## Base Layer
The Base Layer enableds wallet(private keys) to be stored in secure enclave and hardware device. It also provides ways to store, protect, access and recovery wallets.

## Wallet API
A Wallet manages a private/public key pair which is used to cryptographically sign transactions and prove ownership on the blockchain.

new Wallet **( privateKey [ , provider ] )**
>Creates a new instance from privateKey and optionally connect a provider


*Wallet* . **createRandom ( )**   =>   Wallet
>Creates a new random wallet. Ensure this wallet is stored somewhere safe, if lost there is NO way to recover it.

*Wallet* . **fromEncryptedJson** ( json, password [ , progressCallback ] )   =>   Wallet
>Decrypt an encrypted Secret Storage JSON Wallet 

*Wallet* . **fromMnemonic ( mnemonic [ , path = “m/44’/60’/0’/0/0” [ , wordlist ] ] )**   =>   Wallet
Generate a BIP-039 + BIP-044 wallet from mnemonic deriving path using the wordlist. The default language is English (en).
| Language  | node.js	  |
|---|---|
| English (US)  | .wordlists.en  |
|  Italian | .wordlists.it	  |
|  Japanese |  .wordlists.ja	 |
|  Korean |  .wordlists.ko	 |



## Signer API
The Signer API is an abstract class which makes it easy to extend and add new signers, that can be used by this library and extension libraries. The Wallet extends the Signer API, as do the Ledger Hardware Wallet Signer.

To implement a Signer, inherit the abstract class Signer and implement the following properties:

*object*. **provider**
>A Provider that is connected to the network. This is optional, however, without a provider, only write-only operations should be expected to work.

*object*. **getAddress ( )**   =>   Promise<Address>
>Returns a Promise that resolves to the account address.

*object*. **signMessage ( message )**   =>   Promise<hex>
>Returns a Promise that resolves to the Flat-Format Signature for the message.
>
>If message is a string, it is converted to UTF-8 bytes, otherwise it is preserved as a binary representation of the Arrayish data.

*object*. **sendTransaction ( transaction )**   =>   Promise<TransactionResponse>
>Sends the transaction (see Transaction Requests) to the network and returns a Promise that resolves to a Transaction Response. Any properties that are not provided will be populated from the network.


