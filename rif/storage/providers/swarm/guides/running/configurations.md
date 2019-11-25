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

## Through `Geth`

The easiest way to do this is to run a **Geth** node locally and let Swarm make calls to this instance when attempting to resolve addresses.

Run Geth through the `geth` command. Leave the node running long enough so that it's in-sync with the blockchain.

**Tip**: save resources by running Geth in light mode:

```sh
geth --syncmode "light"
```

Then:

```sh
swarm --ens-api $HOME/.ethereum/geth.ipc
```

where the value of the `ens-api` flag is a valid path to a running Geth IPC.

## Through Smart Contracts

As an alternative, you can resolve ENS addresses by specifying pairs of top level domains (TLD) and Smart Contracts. For example:

```shell
swarm --ens-api eth:0x98a12be4d89bbf6cdf11d1a2c029904a7b644368@https://public-node.rsk.co
```

In this example:
- `eth` is the TLD.
- `0x98a12be4d89bbf6cdf11d1a2c029904a7b644368` is the smart contract address.
- `https://public-node.rsk.co` is the blockchain endpoint to be used when interacting with the contract.

See [here](https://swarm-guide.readthedocs.io/en/latest/node_operator.html#using-swarm-together-with-the-testnet-ens) for more information.

# 2. Incentivization
```sh
swarm --bzznetworkid 5 --swap --swap-backend-url https://ropsten.infura.io/E4bWUMMVp0qItxErZ69u --swap-initial-deposit 500000000000 --swap-chequebook-factory 0x41ca78f7fd9e745beabb2145a9ffd60992a96a28
```

- `bzznetworkid` matches the allowed network ID for SWAP, which is set through the `AllowedNetworkID`. This can be verified by inspecting the [codebase](https://github.com/ethersphere/swarm).
- `swap` explicitely activates SWAP.
- `swap-backend-url` is URL of the Ethereum API provider.
- `swap-initial-deposit` is the initial deposit amount for the SWAP chequebook that this node will use.
- `swap-chequebook-factory` is the SWAP chequebook factory contract address.