---
layout: rsk
title: JSON-RPC API for Mining Pools & Merged Mining | Rootstock (RSK)
tags: API, json, rpc, json-rpc, transactions, quick-start, guides, tutorial, testnet, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, sidechain, contracts, mining
---

These methods are meant to be used for mining. Mining pools should interact with this API in order to do merged mining.

## JSON-RPC Methods

* [mnr_getWork](#mnr_getwork)
* [mnr_submitBitcoinBlock](#mnr_submitbitcoinblock)
* [mnr_submitBitcoinBlockTransactions](#mnr_submitbitcoinblocktransactions)
* [mnr_submitBitcoinBlockPartialMerkle](#mnr_submitbitcoinblockpartialmerkle)

## JSON-RPC API Reference

#### mnr_getWork

Returns the hash of the current block for merged mining, the boundary condition to be met ("target"), parent block hash and notify flag.

##### Parameters

none

##### Returns

- `blockHashForMergedMining`: `DATA`, 32 Bytes - Hash of the RSK block that should be used for merged mining. This
hash must be included after the `RSKBLOCK:` tag. It is a 256-bit unsigned integer represented as a
hexadecimal string.
- `target`: `DATA`, 32 Bytes - Target difficulty that solution for current work must met to be valid.  Merged mined block is solved if it's hash is below or equal this target.
Target is a 256-bit unsigned integer represented as a hexadecimal string.
- `parentBlockHash`: `DATA`, 32 Bytes - Parent block hash, 256-bit unsigned integer as an hexadecimal string.
- `feesPaidToMiner`: `QUANTITY` - Fees paid to the miner in the RSK block in 1/10^18 bitcoins.
- `notify`: `Boolean` - This is a boolean flag that is used by RSK node to alert mining pools
that there is a new work unit and all previous work units can be updated.

##### Example
```js
//Request
curl -X POST --data '{"jsonrpc": "2.0", "id":"1", "method": "mnr_getWork", "params": [] }' -H "Content-Type:application/json" 


//Result
{
"jsonrpc":"2.0",
"id":1,
"result":{
  "blockHashForMergedMining":"0x43513e9808bab44f1b4e9858ff737b226d7893d7d7ed4f92fdc885e5d0922672",
  "target":"0x5555555555555555555555555555555555555555555555555555555555555555",
  "feesPaidToMiner":"0",
  "notify":false,
  "parentBlockHash":"0x6953ed2171304931f096307ec71120da1e26d356e2aab6e7c35dbda9997d3f5e"
  }
}
```
***

#### mnr_submitBitcoinBlock

Used for submitting a solution to RSK node. This method sends a bitcoin block through the network (~1Mb), for methods that use lower network resources please refer to:
* [mnr_submitBitcoinBlockTransactions](#mnr_submitbitcoinblocktransactions)
* [mnr_submitBitcoinBlockPartialMerkle](#mnr_submitbitcoinblockpartialmerkle)

##### Parameters

Bitcoin block serialized as hexadecimal.

##### Returns 

- `blockImportedResult`: `DATA` -  Hexadecimal String, indicates if solution was included or not in the blockchain. Possible status are:
    - 0x494d504f525445445f42455354 (IMPORTED_BEST) - Valid block and added to the main chain.
    - 0x494d504f525445445f4e4f545f42455354 (IMPORTED_NOT_BEST) - Block is valid and was added as an uncle to the chain.
    - 0x4558495354 (EXIST) - Block already exist in chain. 
    - 0x4e4f5f504152454e54 (NO_PARENT) - Block parent doesn't exist.
    - 0x494e56414c49445f424c4f434b (INVALID_BLOCK) - Block is invalid.
 - `blockHash`: `DATA`, 32 Bytes - Hash for the block added to the chain.
 - `blockIncludedHeight`: `QUANTITY` - Height of the chain where the block was added. 

##### Example

```js
//Request
curl -X POST --data '{"jsonrpc": "2.0", "method": "mnr_submitBitcoinBlock", "params": ["010000309821be091716ff34ddd54dd79a5d26af10a4214229b78b6e89d490360c000000eb436828fd1883ca69c1c6876174412da9f58f4848a29d7f4d698a7d09eaed593497ee58ffff7f2021393df40101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff1f021402043497ee5808f8000002000000000d2f72736b5f7374726174756d2f000000000240be4025000000001976a914e5e9208d759e89a2e1767f5baeda58f188da206a88ac00000000000000002952534b424c4f434b3a3be5d1c4427993f22f985ff8e99a2b8560b2d1205580867e4eec21123315213b00000000"], "id": 1}' -H "Content-Type:application/json"

//Result
{
  "jsonrpc":"2.0",
  "id":1,"result":{
      "blockImportedResult":"0x494d504f525445445f42455354",
      "blockHash":"0x6953ed2171304931f096307ec71120da1e26d356e2aab6e7c35dbda9997d3f5e",
      "blockIncludedHeight":"0x762"
      }
}
```

##### Error Result
```js
{
  "jsonrpc":"2.0",
  "id":1,
  "error":{
    "code":  -33000,
    "message":"Error message.."
  }
}`
```

***
#### mnr_submitBitcoinBlockTransactions

Used for submitting a solution to RSK node. This method sends only some information from the bitcoin block (hash, header, coinbase, transaction's hashes) 
It should be used over [mnr_submitBitcoinBlock](#mnr_submitbitcoinblock) since it sends less data over the network.
Implementation wide, it is considered to be easier to use than [mnr_submitBitcoinBlockPartialMerkle](#mnr_submitbitcoinblockpartialmerkle)

##### Parameters

1. `blockHashHex`: `DATA`, 32 Bytes - Hash of the bitcoin block used for merged mining.
2. `blockHeaderHex`: - `DATA`, 80 Bytes - Bitcoin block header used for merged mining.
3. `coinbaseHex`: `DATA` - Bitcoin coinbase transaction that belongs to the block used for merged mining.
4. `txnHashesHex`: `DATA` - Collection of transaction hashes that belong to the block used for merged mining. Said collection must be formatted into a space separated string (e.g. "hash1 hash1 hash2"). The coinbase's hash **must not** be present in the collection.

##### Returns 

See [mnr_submitBitcoinBlock](#mnr_submitbitcoinblock)

##### Example

```js
//Request
curl -X POST --data '{"jsonrpc":"2.0","method":"mnr_submitBitcoinBlockTransactions","params":["39eee5957455bfdeaa432605c75659020ac75b378df2d78566449700000000","03000030c72830a3533b330c204ba9176614ca1b9e9c514bfc79efa1fc8674178c5c8c020bfd0e47a9cbcc7fd9acf206420370e2b56f6f89fc2b48f161c8db63671b2712495fcf5affff7f20892982dc","01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff3002ce000004495fcf5a04cb9e820d0c595ecf5a00000000000000000a636b706f6f6c0d2f6d696e656420627920636b2fffffffff02a80a0395000000001976a914d754fa97263b730e513a5ef814e2204e1c6a4aef88ac00000000000000002a6a52534b424c4f434b3af84a70a01da46056fa1329fa5f496cf691afb7df832834071ea3868fa1fe70a200000000","e62c2f2526fb1bd2b12d19ed1b8b545810a2743c6d05a9f241dbedaaed82a8d0"],"id":1}' -H "Content-Type:application/json"
  
//Result
{
 "jsonrpc":"2.0",
 "id":54,
 "result":{
    "blockImportedResult":"0x494d504f525445445f42455354",
    "blockHash":"0x6953ed2171304931f096307ec71120da1e26d356e2aab6e7c35dbda9997d3f5e",
    "blockIncludedHeight":"0x762"
    }
 }
```

##### Error Result
```js
{
  "jsonrpc":"2.0",
  "id":1,
  "error":{
    "code": -33000,
    "message":"Error message.."
  }
}`
```

***
#### mnr_submitBitcoinBlockPartialMerkle 

Used for submitting a solution to RSK node. This method sends only some information from the bitcoin block (hash, header, coinbase, coinbase's merkle tree branch hashes, transaction count) 
It sends minimal data over the network so it is recommended to be used over the other two submit methods provided by this API.

##### Parameters
    
1. `blockHashHex`: `DATA`, 32 Bytes - Hash of the bitcoin block used for merged mining.
2. `blockHeaderHex`: - `DATA`, 80 Bytes - Bitcoin block header used for merged mining.
3. `coinbaseHex`: `DATA` - Bitcoin coinbase transaction that belongs to the block used for merged mining.
4. `merkleHashesHex`: `DATA` - Collection of merkle hashes from the bitcoin block used for merged mining. Hashes should be from the merkle branch to which the coinbase belongs. Said collection must be formatted into a space separated string (e.g. "hash1 hash1 hash2"). The coinbase's hash **must** be present in the collection in the **first** position.
5. `blockTxnCountHex`: `QUANTITY` - Length of merkle hashes collection represented as an hexadecimal string.

##### Returns 

See [mnr_submitBitcoinBlock](#mnr_submitbitcoinblock)

##### Example
```js
//Request
curl -X POST --data '{"jsonrpc":"2.0","method":"mnr_submitBitcoinBlockPartialMerkle","params":["39eee5957455bfdeaa432605c75659020ac75b378df2d78566449700000000","03000030c72830a3533b330c204ba9176614ca1b9e9c514bfc79efa1fc8674178c5c8c020bfd0e47a9cbcc7fd9acf206420370e2b56f6f89fc2b48f161c8db63671b2712495fcf5affff7f20892982dc","01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff3002ce000004495fcf5a04cb9e820d0c595ecf5a00000000000000000a636b706f6f6c0d2f6d696e656420627920636b2fffffffff02a80a0395000000001976a914d754fa97263b730e513a5ef814e2204e1c6a4aef88ac00000000000000002a6a52534b424c4f434b3af84a70a01da46056fa1329fa5f496cf691afb7df832834071ea3868fa1fe70a200000000","39975a670108078346cb166ed991ccc7328f4f8bc06fd4a77b642e0dbcfc7405",1],"id":1}' -H "Content-Type:application/json"
    
//Result
{
 "jsonrpc":"2.0",
 "id":54,
 "result":{
    "blockImportedResult":"0x494d504f525445445f42455354",
    "blockHash":"0x6953ed2171304931f096307ec71120da1e26d356e2aab6e7c35dbda9997d3f5e",
    "blockIncludedHeight":"0x762"
    }
 }
```

##### Error Result
```js
{
  "jsonrpc":"2.0",
  "id":1,
  "error":{
    "code":  -33000,
    "message":"Error message.."
  }
}`
```
