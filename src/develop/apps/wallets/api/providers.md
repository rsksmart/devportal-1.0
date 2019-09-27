---
layout: rsk
title: Providers
---
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
