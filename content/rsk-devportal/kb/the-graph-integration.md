---
menu_order: 880
menu_title: The Graph Integration
title: 'How to use The Graph on Rootstock'
description: 'The Graph is a decentralized protocol for indexing and querying blockchain data'
tags: knowledge-base, the grpah, protocol, rootstock, defi, decentralized
layout: 'rsk'
---

![TheGraph](/assets/img/kb/the-graph/logo.png) 

[TheGraph](https://thegraph.com/) is a decentralized protocol for indexing and querying blockchain data. For more information about it go [here](https://thegraph.com/docs/en/about/)

# Rootstock Subgraph

We have developed a Subgraph Boilerplate for [Rootstock] (https://github.com/rsksmart/rootstock-subgraph). This solution was forked from [Sovryn Subgraph](https://github.com/DistributedCollective/Sovryn-subgraph). 

This project aims to set up the bricks for easy implementation of a subgraph for the Rootstock Community. 

The subgraph for Rootstock contains an example contract, `RootstockEvent`. It is deployed on [Testnet](https://explorer.testnet.rsk.co/address/0x8b73111467242aa8829bb17765718c3749df472b)

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract RootstockEvent {    
    event Log(address indexed sender, string message);

    function test() public {
        emit Log(msg.sender, "Hello Rootstockers!");        
    }
}
```

This subgraph contains logic for transforming and storing blockchain events, and serving up a publicly available graphQL API for this data.

Please note that this is still an early version of the subgraph. While it has undergone testing, we are aware there may be some bugs.

## Resources

- Visit [Rootstock] (https://github.com/rsksmart/rootstock-subgraph)
- Visit [The Graph About](https://thegraph.com/docs/en/about/) to learn more.
- Visit [Sovryn Subgraph](https://github.com/DistributedCollective/Sovryn-subgraph)