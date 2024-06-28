---
# menu_order: 880
menu_title: The Graph Integration
title: 'How to use The Graph on Rootstock | Rootstock (RSK)'
description: 'The Graph is a decentralized protocol for indexing and querying blockchain data. The Rootstock subgraph project aims to set up the bricks for easy implementation of a subgraph for the Rootstock Community'
tags: knowledge-base, the grpah, protocol, rootstock, defi, decentralized
layout: 'rsk'
---

![The Graph](/assets/img/kb/the-graph/logo.png) 

[The Graph](https://thegraph.com/) is a decentralized protocol for indexing and querying blockchain data. For more information, visit [The Graph](https://thegraph.com/docs/en/about/).

## Rootstock Subgraph

A Subgraph Boilerplate for [Rootstock](https://github.com/rsksmart/rootstock-subgraph) has been developed, this project aims to set up the bricks for easy implementation of a subgraph for the Rootstock Community. 

> This solution was forked from [Sovryn Subgraph](https://github.com/DistributedCollective/Sovryn-subgraph). 

<div class="btn-container">
  <span></span>
    <a class="green" href="https://github.com/rsksmart/rootstock-subgraph">Rootstock Subgraph Repo</a>
</div>

### Example Contract

The subgraph for Rootstock contains an example contract, `RootstockEvent`. See deployment on [Testnet](https://explorer.testnet.rsk.co/address/0x8b73111467242aa8829bb17765718c3749df472b).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract RootstockEvent {    
    event Log(address indexed sender, string message);

    function test() public {
        emit Log(msg.sender, "Hello Rootstockers!");        
    }
}
```

The subgraph contains the logic for transforming and storing blockchain events, and serving up a publicly available graphQL API for this data.

> Note that this is an early version of the subgraph. While it has undergone testing, we are aware that there may be some bugs.

## Resources

- Visit [Rootstock Subgraph Repo](https://github.com/rsksmart/rootstock-subgraph)
- Visit [The Graph About](https://thegraph.com/docs/en/about/) to learn more.
- Visit [Sovryn Subgraph](https://github.com/DistributedCollective/Sovryn-subgraph)