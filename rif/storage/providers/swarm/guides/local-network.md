---
layout: rsk
title: Running a local Swarm network
---

This guide sets up 2 Swarm nodes in a local private network. Each of the nodes is loaded into a specific directory; i.e. the folders `./s1` and `./s2`. 

Swarm can be run without a blockchain, since each node—with the help of the bootnodes—will form a network with its peers through [Kademlia](https://en.wikipedia.org/wiki/Kademlia).

It is through the *Swarm Accounting Protocol* (**SWAP**) that Smart Contracts come into play in Swarm, in order to form an <a href="../../../../incentives/">incentivized network</a>.

If you need these nodes to run with incentivization, please refer to the incentivized versions of this guide (<a href="../on-ganache/">for Ganache</a>, or <a href="../on-rsk/">for RSK</a>).

## Table of Contents
1. [Requirements](#requirements)
2. [Run the network](#run-the-network)
3. [Interact with the network](#interact-with-the-network)
4. [Restart the network](#restart-the-network)
5. [Add more nodes to the network](#add-more-nodes-to-the-network)

------

# Requirements

## `websocat` (optional)

`websocat` is a command-line web socket client, used to query the nodes running in the private network.

If you plan to [query the nodes](#query-the-nodes), follow the instructions [here](https://github.com/vi/websocat/) to install it.

------

# Run the network

## 1. Choose a directory

Start a terminal and run `cd` to move to a directory where the files for the nodes will be created.

## 2. Start each node

Make sure the `swarm` command boots up Swarm correctly before starting the nodes.

Start the first node through:

```bash
DATADIR1="s1" && 
rm -rf "$DATADIR1" && mkdir "$DATADIR1/" &&
swarm --datadir "$DATADIR1" --ws --wsaddr=0.0.0.0 --wsapi=bzz --wsorigins='*' --bzzkeyhex 40b3e576b606d4580ad3c875e9fda07ba3e4d99a40534c5bf1bc72226451adb1 --nodekeyhex 2eae3526db799cb5f1ab6ab64255ba8182cdaeb4f773a0ae1244f4ca59978dc2
```

Start the second node through:

```bash
DATADIR2="s2" &&
rm -rf "$DATADIR2" && mkdir "$DATADIR2" &&
swarm --datadir "$DATADIR2" --port 40400 --bzzport 9100 --bootnodes "enode://9b7571c26d50bed78f614be5bf3b2d661176fdfeb546f100b84dd03545f4bc98e42e640286ac92fe110ec5f4995141743e47d8f642aa49ac05bd5f2cab2e881a@127.0.0.1:30399" --ws --wsaddr=0.0.0.0 --wsapi=bzz --wsport 8556 --wsorigins='*'
```

This will populate the directories with all of the files needed for each of the Swarm nodes. 

Note that:
- A private key is specified in the first node so that the second one can find it through the `bootnodes` parameter.
- The first node uses default values for parameters such as ports, but the second one needs them explicitely specified to avoid clashes.
- Both nodes have web socket endpoints enabled through the `ws` (and related) parameters. The only API enabled in this case is `bzz`, but others can be added at discretion (e.g. `swap`, `pss`, etc.). You can omit this parameter if you don't plan to [query the nodes](#query-the-nodes).

------

# Interact with the network

You can interact with the nodes in the network through the following means.

## Query the nodes

`websocat` can be used to call Swarm functions exposed through [RPC](https://www.tutorialspoint.com/remote-procedure-call-rpc).

For example, to query all balances for the node listening on port `8546`, execute the following:

```bash
echo swap_balances | websocat "ws://127.0.0.1:8546" --origin localhost --jsonrpc -n --one-message &&
```

Note that this particular example requires SWAP to be enabled for this node.

Other calls might only be available depending on the `wsapi` [configuration parameter](https://swarm-guide.readthedocs.io/en/latest/node_operator.html#general-configuration-parameters).

The Swarm documentation might not be up-to-date in terms of including all exposed functions. Search for the `rpc.API` string in the Swarm [codebase](https://github.com/ethersphere/swarm) to figure out which calls are available.

## Web interface

A Swarm local web server endpoint for each node should be accessible through your browser.

The web interface will allow you to upload and download files.

By default, the server will be located at `http://localhost:8500`.

You can find which port is used for each node by taking a look at the `bzzport` flag used in each case.

## CLI

By using the `swarm` binary you can execute operations in the standard manner, such as `up`, `down`, etc., for the node that uses the default parameters (such as port `8500`).

You can find a list of commands [here](https://swarm-guide.readthedocs.io/en/latest/dapp_developer/upload_cli.html#reference-table).

------

# Restart the network

If you want to start from scratch, simply execute the entire code again. 

If you want the to maintain state when restarting the network, only repeat the `swarm` command for each node (make sure the `DATADIR` variables are defined) found in the [start the nodes](#run-the-network) section.

------

# Add more nodes to the network

To start up more Swarm nodes, repeat the previous instructions with as many directories (`./s1`, `./s2`, `./s3`, ..., `./sn`) as you wish.

Make sure that:
- You use different ports for each node.
- All nodes except the first one have the same `bootnodes` parameter value.
- Nodes use node IDs (`bzzkeyhex`) which are prefunded by the Ganache seed.
  - Alternatively, use node IDs outside of this seed to see how nodes without funding behave in an incentivized network.

------

_Guide based on [Swap Test Guide](https://hackmd.io/yZLFmgdSRDCMEpBXCiBeBA?view) by Ralph Pichler._
