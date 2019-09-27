---
layout: rsk
title: Top Layer
---
## Top Layer
The RSK Key Management Top Layer provides Account Management interfaces, API interfaces (Python, JS) and Provider handler to interact with RSK provider networks (Local, Public, and 3rd party operated).

#### **connect (provider-network)** 
> Connect to an RSK node network

For RSK recommended providers, please refer to []

#### **create_wallet**
>Create a wallet with a label & master encrypted passphrase choose between using a hardware wallet, generating Keystore file or a mnemonic phrase.

Example:
* create_wallet MyWallet1_Label -pass (prompted to enter password);
* create_wallet MyWallet1_Label -mnemonic “.... ….”;

#### **set_wallet_label**

>Sets the local wallet label to a new label

Usage: 
* set_wallet_label MyWallet1 My-Developer-Wallet

#### **import_wallet**
>Import existing wallet’s accounts as a new Wallet using a private key or encrypted JSON keystore

Usage: 
* import_wallet MyWallet1 -json mywallet1.json 
* NewEncryptedPass (prompted to enter the old encrypted password) 

#### **recover_wallet_mnemonic**
>Recover a wallet using a mnemonic phrase

#### **create_new_account**
Usage:
* Create_new_account MyWallet1 [label_new_account]
* Output: New account created 0x……. with label Account1 for wallet MyWallet1

#### **import_account**
>Import an existing account

Usage: 
* import 0x…. <from_Wallet2> <to_myWallet1>

#### **export** 
>Export the keyset for a wallet

#### **get_dev_coins [RIF or RBTC]**
>Quickly get rBTC or RIF testnet funds from faucets. 
( Only works if you are connected to RSK-Testnet. )

Usage: 
* get_dev_coins RIF MyWallet1 Account1
* Output: Account1 in MyWallet1 has received 100 RIF tokens 


#### **contract_create**
>Creates a new contract instance with all methods and events defined in the interface 

Usage: 
* contract_create(Interface, address, options)

#### **contract_method**
>Create a transaction object for a method that can be called, sent, estimated

#### **ttcontract_event_subscribe_once**
>Subscribes to an event only once

#### **contract_event_subscribe**
>Subscribes to an event

#### **contract_allevents**
>Receives all events from this smart contract, or filter events.

#### **contract_pastevents**
>Gets past events for this contract.

#### **view_accounts**
>Show accounts for existing wallet using a variety of methods [ hardware, web3, private key, keystore, mnemonic]

Usage:
* view_accounts MyWallet1 <encrypted_passphrase>

#### **get_balance**
>Get balance of accounts in a wallet, or specify a specific account

Usage: 
* get_balance MyWallet1  OR   get_balance MyWallet1 0xAccountInfo

#### **pay, payment**
>to, amount, account from, fee

#### **paytomany**
>Pay to many

#### **signMsg, signTx**
>Signing of messages or transactions

Usage: 
* signTx(tx, privatekey, callback)

#### **check_tx_status**
>Check the transaction status of a txID

#### **build_tx**
>build_tx(account, amount, gas, nonce, gasPrice, data)
#### **send_tx**
>Sends a signed transaction

Usage: 
* sendtx(0x + hex_string)

## Providers 

A Provider abstracts a connection to the RSK blockchain, for issuing queries and sending signed state changing transactions.

The JsonRpcProvider allows you to connect to RSK nodes you control or have access to, including mainnet and testnets.

For most situations, it is recommended that you use a default provider.

## Connecting to RSK

#### getDefaultProvider

**.getDefaultProvider ([network =** *"homestead"* **]) => Provider**
>This creates a FallbackProvider backed by multiple backends.
>
>This is the **recommended** method of connecting to the network if you are not running your own RSK node.

**new providers.JsonRpcProvider([ urlOrInfo =** *"http://localhost:8545"* **][ ,network ])**
>Connect to the JSON-RPC API URL urlorInfo of an RSK node
>
>The urlOrInfo may also be specified as an object with the properties:

 * **url** — the JSON-RPC URL (required).
 * **user** — a username to use for Basic Authentication (optional).
* **password** — a password to use for Basic Authentication (optional).
* **allowInsecure** — allow Basic Authentication over an insecure HTTP network (default: false).

**Also See**: JSON-RPC provider-specific [Properties](#JsonRpcProvider).

## Properties

#### Provider
*prototype* . **blockNumber**
>The most recent block number (block height) this provider has seen and has triggered events for. If no block has been seen, this is null.

*prototype* . **polling**
*mutable*

>If the provider is currently polling because it is actively watching for events. This may be set to enable/disable polling temporarily or disabled permanently to allow a node process to exit.

*prototype* . **pollingInterval**
*mutable*

>The frequency (in ms) that the provider is polling. The default interval is 4 seconds.

>This may make sense to lower for PoA networks or when polling a local node.

#### <div id="JsonRpcProvider">JsonRpcProvider</div>

*prototype* . **connection**
>An object describing the connection of the JSON-RPC endpoint with the properties:
>
>* **url** — the JSON-RPC URL
>* **user** — a username to use for Basic Authentication (optional)
>* **password** — a password to use for Basic Authentication (optional)
>* **allowInsecure** — allows Basic Authentication over an insecure HTTP network




## Account 

*prototype* . **getBalance( addressOrName [ , blockTag =** *“latest”* **] )   =>   Promise<BigNumber>**
>Returns a Promise with the balance (as a BigNumber).

*prototype* . **getTransactionCount ( addressOrName [ , blockTag =** *“latest”* **] )   =>   Promise<number>**

>Returns a Promise with the number of sent transactions (as a Number). This is also the nonce required to send a new transaction.

## Blockchain Status
*prototype* **. getBlockNumber ( )   =>   Promise<number>**
>Returns a Promise with the latest block number (as a Number).

*prototype* . **getGasPrice ( )   =>   Promise<BigNumber>**
>Returns a Promise with the current gas price (as a BigNumber).

*prototype* **. getBlock ( blockHashOrBlockNumber )   =>   Promise<Block>**
>Returns a Promise with the block at blockHashOrBlockNumber.

*prototype* **. getTransaction ( transactionHash )   =>   Promise<TransactionResponse>**
>Returns a Promise with the transaction with transactionHash. 

*prototype* **. getTransactionReceipt ( transactionHash )   =>   Promise<TransactionReceipt>**
>Returns a Promise with the transaction receipt with transactionHash. (See: Transaction Receipts)