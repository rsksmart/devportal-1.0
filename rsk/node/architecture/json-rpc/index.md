---
layout: rsk
title: JSON-RPC
---

RSK is currently supporting the following:
- [JSON RPC methods](#json-rpc-methods)
- [Management API methods](#management-api-methods)
- [RPC PUB SUB methods](#rpc-pub-sub-methods)

> Note: request headers must contain the specification of ``` "Content-Type:application/json" ```

## JSON RPC methods

| Method | Supported | Comments |
| ------ | ------ | ------ |
| `web3_clientVersion` | YES | |
| `web3_sha3` | YES | |
| `net_version` |	YES | Mainnet Chain Id = "30", Testnet Chain Id = "31" |
| `net_peerCount`	| YES | |
| `net_listening`	| YES |	|
| `eth_protocolVersion` |	YES | |
| `eth_syncing` |	YES | |
| `eth_coinbase` | YES | |
| `eth_mining` | YES | |
| `eth_hashrate` | YES | |
| `eth_gasPrice` | YES | |
| `eth_accounts` | YES | |
| `eth_blockNumber` | YES | |
| `eth_getBalance` | YES | |
| `eth_getStorageAt` | YES | |	
| `eth_getTransactionCount` | YES | |
| `eth_getBlockTransactionCountByHash` | YES | |
| `eth_getBlockTransactionCountByNumber` | YES | |	
| `eth_getUncleCountByBlockHash` | YES | |
| `eth_getUncleCountByBlockNumber` | PARTIALLY | Option "pending" not yet supported |	
| `eth_getCode` | PARTIALLY | Option "pending" not yet supported |	
| `eth_sign` | YES | |
| `eth_sendTransaction` | YES | |
| `eth_sendRawTransaction` | YES | |
| `eth_call` | YES | |
| `eth_estimateGas` | YES | |
| `eth_getBlockByHash` | YES | |
| `eth_getBlockByNumber` | PARTIALLY | Option "pending" not yet supported | 
| `eth_getTransactionByHash` | YES | |
| `eth_getTransactionByBlockHashAndIndex` | YES | |
| `eth_getTransactionByBlockNumberAndIndex` | PARTIALLY | Option "pending" not yet supported |
| `eth_getTransactionReceipt` | YES | |
| `eth_getUncleByBlockHashAndIndex` | YES | |
| `eth_getUncleByBlockNumberAndIndex` | PARTIALLY | Option "pending" not yet supported |
| `eth_getCompilers` | - | For security reasons, we've decided not to include compilers in node |
| `eth_compileLLL` | - | For security reasons, we've decided not to include compilers in node |
| `eth_compileSolidity` | - | For security reasons, we've decided not to include compilers in node |
| `eth_compileSerpent` | - | For security reasons, we've decided not to include compilers in node |
| `eth_newFilter` | YES | |
| `eth_newBlockFilter` | YES | |
| `eth_newPendingTransactionFilter` | YES | |
| `eth_uninstallFilter` | YES | |
| `eth_getFilterChanges` | YES | |
| `eth_getFilterLogs` | YES | |
| `eth_getLogs` | YES | |
| `eth_getWork` | YES | Method name is mnr_getWork |
| `eth_submitWork` | YES | Method name is mnr_submitBitcoinBlock |
| `eth_submitHashrate` | - | |
| `db_putString` | - | Deprecated |	
| `db_getString` | - | Deprecated |
| `db_putHex` | - | Deprecated |
| `db_getHex` | - | Deprecated |
| `shh_post` | - | Whisper protocol not supported |
| `shh_version` | - | Whisper protocol not supported |
| `shh_newIdentity` | - | Whisper protocol not supported |
| `shh_hasIdentity` | - | Whisper protocol not supported |
| `shh_newGroup` | - | Whisper protocol not supported |
| `shh_addToGroup` | - | Whisper protocol not supported |
| `shh_newFilter` | - | Whisper protocol not supported |
| `shh_uninstallFilter` | - | Whisper protocol not supported |
| `shh_getFilterChanges` | - | Whisper protocol not supported |
| `shh_getMessages` | - | Whisper protocol not supported |


## Management API methods

| Method | Supported | Comments |
| ------ | ------ | ------ |
| `admin_addPeer` | NO | |
| `admin_datadir` | NO | |
| `admin_nodeInfo` | NO | |
| `admin_peers` | NO | |
| `admin_setSolc` | NO | |
| `admin_startRPC` | NO | |
| `admin_startWS` | NO | |
| `admin_stopRPC` | NO | |
| `admin_stopWS` | NO | |
| `debug_backtraceAt` | NO | |
| `debug_blockProfile` | NO | |
| `debug_cpuProfile` | NO | |
| `debug_dumpBlock` | NO | |
| `debug_getBlockRlp` | NO | |
| `debug_goTrace` | NO | |
| `debug_memStats` | NO | |
| `debug_seedHash` | NO | |
| `debug_setHead` | NO | |
| `debug_setBlockProfileRate` | NO | |
| `debug_stacks` | NO | |
| `debug_startCPUProfile` | NO | |
| `debug_startGoTrace` | NO | |
| `debug_stopGoTrace` | NO | |
| `debug_traceBlock` | NO | |
| `debug_traceBlockByNumber` | NO | |
| `debug_traceBlockByHash` | NO | |
| `debug_traceBlockFromFile` | NO | |
| `debug_traceTransaction` | YES | |
| `debug_vmodule` | NO | |
| `debug_writeBlockProfile` | NO | |
| `debug_writeMemProfile` | NO | |
| `miner_setExtra` | NO | |
| `miner_setGasPrice` | NO | |
| `miner_start` | NO | |
| `miner_stop` | NO | |
| `miner_setEtherBase` | NO | |
| `personal_importRawKey` | YES | |
| `personal_listAccounts` | YES | |
| `personal_lockAccount` | YES | |
| `personal_newAccount` | YES | |
| `personal_unlockAccount` | YES | |
| `personal_sendTransaction` | YES | |
| `personal_sign` | NO | |
| `personal_ecRecover` | NO | |
| `txpool_content` | YES | |
| `txpool_inspect` | YES | |
| `txpool_status` | YES | |

## RPC PUB SUB methods

| Method | Supported | Comments |
| ------ | ------ | ------ |
| `eth_subscribe` | PARTIALLY | Only option "newHeaders" is supported |
| `eth_unsubscribe` | YES | |
