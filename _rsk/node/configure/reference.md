---
layout: rsk
title: Configuration reference
tags: rsk, rskj, node, config
description: "Configuration reference for RSKj"
collection_order: 2410
render_features: 'tables-with-borders'
---

## Advanced Configuration

For advanced configuration requirements, please refer to this
[expected configuration file](https://github.com/rsksmart/rskj/blob/master/rskj-core/src/main/resources/expected.conf).
This contains all possible configuration fields parsed by RSKj.

The default values for the config file are defined in this
[reference config file](https://github.com/rsksmart/rskj/blob/master/rskj-core/src/main/resources/reference.conf);
and are "inherited" and varied based on the
[selected network](https://github.com/rsksmart/rskj/tree/master/rskj-core/src/main/resources/config).

## Guide

The following detail the most commonly used configuration fields parsed by RSKj.

- [`peer`](#peer)
- [`database`](#database)
- [`database.import`](#databaseimport)
- [`vm`](#vm)
- [`sync`](#sync)
- [`rpc`](#rpc)
- [`wallet`](#wallet)
- [`scoring`](#scoring)
- [`miner`](#miner)
- [`blockchain.config.name`](#blockchainconfigname)
- [`bind_address`](#bind_address)
- [`public.ip`](#publicip)
- [`genesis`](#genesis)
- [`transaction.outdated`](#transactionoutdated)
- [`play.vm`](#playvm)
- [`hello.phrase`](#hellophrase)
- [`details.inmemory.storage.limit`](#detailsinmemorystoragelimit)
- [`solc.path`](#solcpath)
- [`prune`](#prune)

## peer

Describes how your node peers with other nodes.

* `peer.discovery.enabled = [true/false]`
  enables the possibility of being discovered by new peers.
* `peer.discovery.ip.list = []`
  is a list of the peers to start the discovering.
  These peers must have the `discovery.enabled` option set to true.
  These are the list of some of RSK bootstrap nodes:

  |  | `ip.list` |
  | - | -
  | Regtest | Not applicable |
  | Testnet |`"bootstrap02.testnet.rsk.co:50505","bootstrap03.testnet.rsk.co:50505","bootstrap04.testnet.rsk.co:50505","bootstrap05.testnet.rsk.co:50505"` |
  | Mainnet | `"bootstrap01.rsk.co:5050","bootstrap02.rsk.co:5050","bootstrap03.rsk.co:5050","bootstrap04.rsk.co:5050","bootstrap05.rsk.co:5050","bootstrap06.rsk.co:5050","bootstrap07.rsk.co:5050","bootstrap08.rsk.co:5050","bootstrap09.rsk.co:5050","bootstrap10.rsk.co:5050","bootstrap11.rsk.co:5050","bootstrap12.rsk.co:5050","bootstrap13.rsk.co:5050","bootstrap14.rsk.co:5050","bootstrap15.rsk.co:5050","bootstrap16.rsk.co:5050"` |
* `peer.active = []`
  is used to connect to specific nodes.
  It can be empty.
* `peer.trusted = []`
  is a list of peers whose incoming connections are always accepted from.
  It can be empty.
* `peer.port` is the port used to listen to incoming connections.
  Default port by each RSK network:

  |  | `peer.port` |
  | - | - |
  | Regtest | 30305 |
  | Testnet | 50505 |
  | Mainnet | 5050 |
* `peer.connection.timeout = number (seconds)`
  specifies *in seconds* the timeout for trying to connect to a peer.
  Suggested value: `2`.
* `channel.read.timeout = number (seconds)`
  specifies *in seconds* how much time you will wait for a message to come before closing the channel.
  Suggested value: `30`.
- `peer.privateKey = hash`
  is a securely generated private key unique for your node that **must** be set.
* `peer.networkId = int`
  is the number of the network to connect to.
  It's important to maintain these numbers.
  It identifies the network you are going to connect to.
  For a Regtest private network, you should always use the same
  (not necessarily 34567).
  RSK networks IDs:

  |  | `peer.networkId` |
  | - | - |
  | Regtest | 34567 |
  | Testnet | 779 |
  | Mainnet | 775 |
* `peer.maxActivePeers = int`
  is the max number of active peers that your node will maintain.
  Suggested value: `30`.
* `peer.p2p.eip8 = bool`
  forces peer to send handshake message in format defined by
  [EIP-8](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-8.md).

## database

Describes where the blockchain database is saved.

* `database.dir = path`
  is the place to save physical storage files.
* `database.reset = [true/false]`
  resets the database when the application starts when set to *true*.

## database.import

Options related to experimental import sync v0.1.

* `database.import.url = URL`
  is the URL to the S3 bucket that hosts the database.
* `database.import.trusted-keys = []`
  list of trusted public keys to validate legit source.
* `database.import.enabled = [true/false]`
  enable the import sync.

## vm

Enabling the `vm.structured` will log all the calls to the VM in the local database.
This includes all the contract executions (opcodes).
When testing, using this module is the only way to see exceptions.

* `trace = [true/false]`
  enables the `vm.structured`.
* `dir = foldername`
  the directory where calls are saved.
* `compressed = [true/false]`
  compress data when enabled.
* `initStorageLimit = int`
  the storage limit.

An example:

```
vm.structured {
    trace = false
    dir = vmtrace
    compressed = true
    initStorageLimit = 10000
}
```

## sync

Options related to syncing the blockchain:

* `sync.enabled = [true/false]`
  enables the blockchain synchronization.
  Should be set to `true` to keep the node updated.
* `sync.max.hashes.ask = int`
  determines the max amount of blocks to sync in a same batch.
  The synchronization is done in batches of blocks.
  Suggested value: `10000`.
* `sync.peer.count = int`
  minimum peers count used in syncing.
  Sync may use more peers than this value but always trying to get at least this number from discovery.
  However, it will continue syncing if it's not reached.
* `sync.timeoutWaitingPeers = int (seconds)`
  timeout to start to wait for syncing requests.
* `sync.timeoutWaitingRequests = int (seconds)`
  expiration time in minutes for peer status.
* `sync.maxSkeletonChunks = int`
  maximum amount of chunks included in a skeleton message.
* `sync.chunkSize = int`
  amount of blocks contained in a chunk,
  **must be** 192 or a divisor of 192:
  * 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 192

An example:

```
sync {
    enabled = true
    max.hashes.ask = 10000
    peer.count = 10
    expectedPeers = 5
    timeoutWaitingPeers = 1
    timeoutWaitingRequest = 30
    expirationTimePeerStatus = 10
    maxSkeletonChunks = 20
    chunkSize = 192
}
```

## rpc

Describes the configuration for the RPC protocol.

* `rpc.providers = []`
  lists the different providers (up to this moment, just `web`).
  `rpc.providers.web` has a global setting for every web provider,
  `cors`.
  * `rpc.providers.web.cors = domain`
    restricts the RPC calls from other domains.
    Default value is `localhost`.
* `rpc.providers.web` options:
  * `rpc.providers.web.http`
    defines HTTP configuration:
    * `rpc.providers.web.http.enabled = [true/false]`
      enables this web provider. Default value is `true`.
    * `rpc.providers.web.http.port = port`
      is the HTTP-RPC server listening port.
      By default RSK uses `4444`.
    * `rpc.providers.web.http.bind_address = address`
      is the HTTP-RPC server listening interface.
      By default RSK uses `localhost`.
    * `rpc.providers.web.http.hosts = []`
      is the list of node's domain names or IPs.
      Check [restrictions on valid host names](https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names).
  * `rpc.providers.web.ws`
    defines WebSocket configuration:
    * `rpc.providers.web.ws.enabled = [true/false]`
      enables this web provider.
      Default value is `true`.
    * `rpc.providers.web.ws.port = port`
      is the WS-RPC server listening port.
      By default RSK uses `4445`.
    * `rpc.providers.web.ws.bind_address = address`
      is the WS-RPC server listening interface.
      By default RSK uses `localhost`.
* `rpc.modules` lists of different RPC modules.
  If a module is not in the list and enabled,
  its RPC calls are discarded.

Examples:

```
modules = [
    { name: "eth", version: "1.0", enabled: "true" },
    { name: "net", version: "1.0", enabled: "true" },
    { name: "rpc", version: "1.0", enabled: "true" },
    { name: "web3", version: "1.0", enabled: "true" },
    { name: "evm", version: "1.0", enabled: "true" },
    { name: "sco", version: "1.0", enabled: "true" },
    { name: "txpool", version: "1.0", enabled: "true" },
    { name: "personal", version: "1.0", enabled: "true" }
]
```

It is possible to enable/ disable particular methods in a module.

```
{
    name: "evm",
    version: "1.0",
    enabled: "true",
    methods: {
        enabled: ["evm_snapshot", "evm_revert"],
        disabled: [ "evm_reset", "evm_increaseTime"]
    }
}
```

To use the [RPC miner module](/develop/json-rpc-api)
you must include:

```
{ name: "mnr", version: "1.0", enabled: "true" }
```

## wallet

You can store your accounts on the node to use them to sign transactions. However, it is **not secure** to use a wallet in a public node.

```
wallet {
    enabled = true
    accounts = [
        {
            "publicKey" : "<PUBLIC_KEY>"
            "privateKey" : "<PRIVATE_KEY>"
        }
    ]
}
```

## scoring

Scoring is the way the node 'punishes' other nodes when bad responses are sent. Punishment can be done by node ID or address.

* `scoring.nodes.number = int`
  number of nodes to keep scoring.
* `scoring.nodes.duration` and `scoring.addresses.duration`
  initial punishment duration (in minutes).
  Default is `10`.
* `scoring.nodes.increment` and `scoring.addresses.increment`
  punishment duration increment (in percentage).
  Default is `10`.
* `scoring.nodes.maximum`
  maximum punishment duration (in minutes).
  Default is `0`.
* `scoring.addresses.maximum`
  maximum punishment duration (in minutes).
  Default is `1 week`.

An example:

```
scoring {
    nodes {
        number: 100
        duration: 12
        increment: 10
        maximum: 0
    }
    addresses {
        duration: 12
        increment: 10
        maximum: 6000
    }
}
```

## miner

Check out [Configure RSKj node for mining](/rsk/node/configure/for-mining)
for detailed information about the `miner` configuration.

## blockchain.config.name

A string that describe the name of the configuration.
We use:

|  | `blockchain.config.name` |
| - | - |
| Regtest | regtest |
| Testnet | testnet |
| Mainnet | main |

## bind_address

The network interface with *wire protocol* and *peer discovery*.

This is the last resort for public IP address when it cannot be obtained by other ways.

## public.ip

The node's public IP address.

If it is not configured, defaults to the IPv4 returned
by `http://checkip.amazonaws.com`.

## genesis

It is the path to the genesis file (in *resources/genesis*).
The folder *resources/genesis* contains several versions of
genesis configuration according to the network the peer will run on.

|  | `genesis` |
| - | - |
| Regtest | rsk-dev.json |
| Testnet | bamboo-testnet.json |
| Mainnet | rsk-mainnet.json |

## transaction.outdated

It defines when a transaction is outdated:

* `transaction.outdated.threshold = int`
  is the number of blocks that should pass before pending transaction is removed.
  Suggested value: `10`.
* `transaction.outdated.timeout = int`
  is the number of seconds that should pass before pending transaction is removed.
  Suggested value: `100` (10 blocks * 10 seconds per block).

## play.vm

A boolean that invokes VM program on message received.
If the VM is not invoked, the balance transfer occurs anyway.
Suggested value: `true`.

## hello.phrase

A string that will be included in the hello message of the peer.

## details.inmemory.storage.limit

Specifies when exactly to switch managing storage of the account
on autonomous DB.
Suggested value: `1`.

If the in-memory storage of the contract exceeds the limit,
only deltas are saved.

## solc.path

The path to the [Solidity](http://solidity.readthedocs.io) compiler.
This is set when you may want to use the node to compile your smart contracts.
If you don't have Solidity installed, you can use `/bin/false` as value.

## prune

The prune service is a process that runs over the node storage to lighten the space it needs to be synchronized.
This process removes useless data over a determined amount of blocks processed.

To enable the prune service in your node, override your configuration.

These are the recommended parameters:

```
prune {
    # prune service could be enabled or not
    # values: [true/false]
    # default: false
    enabled = true

    # Number of blocks to process
    blocks {
        # Number of blocks to copy in each prune run
        # default: 5000
        toCopy = 5000

        # Number of blocks to wait to run prune again
        # default: 10000
        toWait = 10000

        # Number of blocks to suspend blockchain process
        # in order to avoid forks
        # default: 100
        toAvoidForks = 100
    }
}
```
