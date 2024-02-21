---
menu_order: 300
menu_title: Write a Smart Contract
layout: rsk
title: 'Write a Smart Contract'
description: 'Learn how to write a smart contract on the Rootstock network'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, rootstock, blockchain
---

In this section, we'll create a smart contract using the [OpenZeppelin library](https://www.openzeppelin.com/contracts).

OpenZeppelin is widely used for its secure, community-vetted, and standardized codebase, which simplifies developing robust and secure smart contracts.

### Create Your Smart Contract

To create your smart contract:

#### Step 1: Install OpenZeppelin Contracts

- Run the following command to install OpenZeppelin's library of reusable smart contracts.
    ```shell
    npm install @openzeppelin/contracts
    ```

#### Step 2: Create Your Token Contract

To create your contract:

1. Navigate to the `contracts` directory in the root directory of your project:
    ```shell
    cd contracts
    ```

2. In the contracts directory, open the `MyToken.sol` file for your token contract:

    - [`MyToken.sol` initial state](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/master/contracts/MyToken.sol)
    
    - To configure an ERC20 token, copy the code snipet below and paste it in your token file or see the [`MyToken.sol` file](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/feat/complete/contracts/MyToken.sol) on GitHub.
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

    This contract defines an ERC20 token named `MyToken` with the symbol `MTK`, using OpenZeppelin's ERC20 standard implementation.

### Build the Contract

To build the contract, run the following command in your project's root directory.
```shell
npx hardhat compile
```
This will compile your smart contracts and generate artifacts:
![Hardhat Compile Success](/assets/img/guides/quickstart/hardhat/compile-success.png)

---
Next, we'll [Test your Smart Contract](/guides/quickstart/hardhat/test-smart-contract/) to ensure it's working as expected.
