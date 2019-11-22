---
layout: rsk
title: Running Configurations for Swarm
---

Use the following cheatsheet to run Swarm with the desired capabilities.

For a full list of the available command line options for `swarm`, see [here](https://swarm-guide.readthedocs.io/en/latest/node_operator.html#general-configuration-parameters).

# ENS resolution

```sh
swarm --ens-api $HOME/.ethereum/geth.ipc
```

where the value of the `ens-api` flag is a valid path to a running Geth IPC.

**Tip**: save resources by running Geth in light mode:

```sh
geth --syncmode "light"
```

# Incentivization

```sh
swarm --bzznetworkid 5 --swap --swap-backend-url https://ropsten.infura.io/E4bWUMMVp0qItxErZ69u --swap-initial-deposit 500000000000 --swap-chequebook-factory 0x41ca78f7fd9e745beabb2145a9ffd60992a96a28
```

- `bzznetworkid` matches the allowed network ID for SWAP, which is set through the `AllowedNetworkID`. This can be verified by inspecting the [codebase](https://github.com/ethersphere/swarm).
- `swap` explicitely activates SWAP.
- `swap-backend-url` is URL of the Ethereum API provider.
- `swap-initial-deposit` is the initial deposit amount for the SWAP chequebook that this node will use.
- `swap-chequebook-factory` is the SWAP chequebook factory contract address.