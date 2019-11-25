---
layout: rsk
title: Running Configurations for Swarm
---

Use the following cheatsheet to run Swarm with the desired capabilities.

For a full list of the available command line options for `swarm`, see [here](https://swarm-guide.readthedocs.io/en/latest/node_operator.html#general-configuration-parameters).

# Table of Contents
1. [ENS Resolution](#1-ens-resolution)
2. [Incentivization](#2-incentivization)


# 1. ENS Resolution

Swarm can't resolve ENS addresses by itself; it needs to delegate this task. 

## 1.1 Through `Geth`

The easiest way to do this is to run a **Geth** node locally and let Swarm make calls to this instance when attempting to resolve addresses.

Run Geth through the `geth` command (to install Geth, follow [these instructions](https://geth.ethereum.org/docs/install-and-build/installing-geth)). Leave the node running long enough so that it's in-sync with the blockchain.

**Tip**: save resources by running Geth in light mode:

```sh
geth --syncmode "light"
```

Then:

```sh
swarm --ens-api $HOME/.ethereum/geth.ipc
```

where the value of the `ens-api` flag is a valid path to a running Geth IPC.

## 1.2 Through Smart Contracts

As an alternative, you can resolve ENS addresses by specifying pairs of top level domains (TLD) and Smart Contracts of the [Resolver type](https://docs.ens.domains/#ens-architecture). For example:

```shell
swarm --ens-api eth:0x98a12be4d89bbf6cdf11d1a2c029904a7b644368@https://public-node.rsk.co
```

In this example:
- `eth` is the TLD.
- `0x98a12be4d89bbf6cdf11d1a2c029904a7b644368` is the smart contract address.
- `https://public-node.rsk.co` is the blockchain endpoint to be used when interacting with the contract.

See [here](https://swarm-guide.readthedocs.io/en/latest/node_operator.html#using-swarm-together-with-the-testnet-ens) for more information.

# 2. Incentivization

Since <a href="../../../incentives/">incentivization</a> is not yet enabled by default, several parameters are needed to run Swarm as a node which is part of an incentivized network. 

Here are the incentives-related parameters. Some of these are optional, whether to use any of these or not depends on your use case.

| Parameter | Info |
|---|---|
| `bzznetworkid` | Numerical network identifier. The default is the public swarm testnet. SWAP-enabled nodes can only be run under a specific networks ID, which is set through the `AllowedNetworkID` constant. Its current value is `5`, but this can be verified by inspecting the [codebase](https://github.com/ethersphere/swarm).  |
| `swap` | Enables SWAP, which is by default disabled. |
| `swap-chequebook` | The address of the SWAP chequebook smart contract that the node is going to use. Note that if not provided, Swarm will attempt to deploy a new chequebook contract, unless it remembers a previously used chequebook. Also keep in mind that the same chequebook cannot be used in different blockchains. |
| `swap-chequebook-factory` | The address of the SWAP chequebook factory smart contract used to validate chequebook smart contracts. You can provide your own contract, but its bytecode will be validated on node start-up. You should only submit this parameter if there is no default factory for the blockchain that you are using (to check this, look for the `Deployments` map in the [codebase](https://github.com/ethersphere/swarm)). If 2 nodes deploy chequebook contracts with different factories, an error will occur during handshake. |
| `swap-initial-deposit` | Amount of Wei to deposit to the SWAP chequebook when deployed. |
| `swap-backend-url` | The URL of the Ethereum API provider to use when calling the blockchain. This will be used when deploying contracts or settling payments. |
| `swap-payment-threshold` | Balance that indicates when to make a payment to a peer to which your node is indebted. You shouldn't need to change this one, generally. |
| `swap-disconnect-threshold` | Balance that indicates when to disconnect a peer which is indebted to your node. You shouldn't need to change this one, generally. |

------

For example:

```sh
swarm --bzznetworkid 5 --swap --swap-backend-url https://ropsten.infura.io/E4bWUMMVp0qItxErZ69u --swap-initial-deposit 500000000000 --swap-chequebook-factory 0x41ca78f7fd9e745beabb2145a9ffd60992a96a28
```

This will start a SWAP-enabled Swarm node using network ID `5`, which means it will only be able to connect to other nodes with this same network ID. 

It will also use Ropsten as a blockchain, deploying on it a new chequebook and making a deposit of `500000000000` Wei to it.

The smart contract used to verify the chequebook contracts of discovered peers is located at address `0x41ca78f7fd9e745beabb2145a9ffd60992a96a28`.