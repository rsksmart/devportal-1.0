---
menu_order: 300
menu_title: Write a Smart Contract
layout: rsk
title: 'Write a Smart Contract'
description: 'Learn how to write a smart contract on the Rootstock network'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, rootstock, blockchain
render_features: 'collapsible'
---
Let's delve into creating a smart contract utilizing the [OpenZeppelin library](https://www.openzeppelin.com/contracts).

OpenZeppelin is widely chosen for its secure, community-vetted, and standardized codebase, which greatly simplifies developing robust and secure smart contracts.

### Create a Smart Contract

To create your smart contract:

[](#top "collapsible")
- Install OpenZeppelin Contracts
    Run the following command to install OpenZeppelin's library of reusable smart contracts.
    ```shell
    npm install @openzeppelin/contracts
    ```
- Create the Contracts Directory
    If your project does not already have a contracts directory, create it in your project's root directory. You can `mkdir` contracts in your terminal or command prompt.
    ```shell
    mkdir contracts
    ```
- Create Your Token Contract
    Create a new file for your token contract inside the contracts directory, for example, **MyToken.sol.** Use OpenZeppelin's ERC20 standard implementation in your contract. Here's a basic example:
    ```s
    // SPDX-License-Identifier: MIT
    pragma solidity ^0.8.20;

    import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

    contract MyToken is ERC20 {
        constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
            _mint(msg.sender, initialSupply);
        }
    }
    ```
This contract defines an ERC20 token named "MyToken" with the symbol "MTK."

### Build the Contract

Run npx hardhat compile in your project directory.

```shell
npx hardhat compile
```

This will compile your smart contracts and generate artifacts:

![Hardhat Compile Success](/assets/img/guides/quickstart/getting-started/compile-success.png)

**Github Commit:** To examine the completed code for this section and compare your work, visit our GitHub repository: [View Commit](https://github.com/jesus-iov/rootstock-quick-start-guide/commit/eff6d60a10ba3779d35eb53c4c7c99696dcf283c5). This link directs you to the specific commit with the updates made in this section.
