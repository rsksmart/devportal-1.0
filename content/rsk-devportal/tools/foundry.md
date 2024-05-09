---
section_title: Foundry
menu_title: Foundry
layout: rsk
title: Foundry Overview
tags: foundry, quick-start, testing, networks, deployment, npm, tools, rsk, ethereum, smart-contracts, install, windows, mac, linux, get-started, how-to
menu_order: 4
---

[Foundry](https://book.getfoundry.sh) is a smart contract development toolchain. Foundry manages your dependencies, compiles your project, runs tests, deploys, and lets you interact with the chain from the command-line and via Solidity scripts. Foundry offers a user-friendly development environment to write and test smart contracts in Solidity. 


## Foundry Advantages Over Hardhat

Foundry is more solidity friendly and ideal for advanced smart contract analysis, auditing, and fast execution of Solidity tests. However you can use hardhat-foundry plugin to have your Foundry project work alongside hardhat benefiting the best from both.

1. **Local Networks:** It provides a local blockchain environment using `anvil` tool, allowing developers to deploy contracts, run tests, and debug their code. It can also be used to fork other EVM compatible networks.
 
   
   **Read more:** [https://book.getfoundry.sh/reference/anvil/](https://book.getfoundry.sh/reference/anvil/)

2. **Advanced Testing:** Forge comes with a number of advanced testing methods including:

   - Fuzz testing
   - Invariant testing
   - Differential testing
   - Symbolic Execution
   - Mutation Testing
 
   
   **Read more:** [https://book.getfoundry.sh/forge/advanced-testing](https://book.getfoundry.sh/forge/advanced-testing)

3. **Advanced Debugging:** Forge gives advanced debugging divided in four quadrants:

   - Quadrant 1: The opcodes in the debugging session, with the current opcode highlighted. Additionally, the address of the current account, the program counter and the accumulated gas usage is also displayed
   - Quadrant 2: The current stack, as well as the size of the stack
   - Quadrant 3: The source view
   - Quadrant 4: The current memory of the EVM
 
   
   **Read more:** [https://book.getfoundry.sh/forge/debugger](https://book.getfoundry.sh/forge/debugger)

## Prerequisites

You will need the [Rust](https://rust-lang.org/) compiler and Cargo, the Rust package manager. The easiest way to install both is with [rustup.rs](https://rustup.rs).

## Install

To install using Foundryup. Foundryup is the Foundry toolchain installer. You can find more about it [here](https://github.com/foundry-rs/foundry/blob/master/foundryup/README.md).

```bash
curl -L https://foundry.paradigm.xyz | bash
```

Running foundryup by itself will install the latest (nightly) precompiled binaries: forge, cast, anvil, and chisel.

See full setup guide [here](https://book.getfoundry.sh/getting-started/installation)


## Create foundry project
To start a new project with Foundry, use [forge init](https://book.getfoundry.sh/reference/forge/forge-init.html).

```bash
forge init hello_foundry
```
See more details on project [setup](https://book.getfoundry.sh/projects/creating-a-new-project)

## Write your first contract
Let’s check what the default foundry project looks like:


```bash
$ cd hello_foundry
$ tree . -d -L 1
.
├── lib
├── script
├── src
└── test

4 directories

```

The src directory contains counter smart contract with test written in test directory. Now let's build the foundry project.

```bash
forge build
```

And then run tests.

```bash
forge test
```

## Deploy your contract on Rootstock chain

To deploy the counter contract on Rootstock mainnet or testnet configure Foundry a bit by setting up Rootstock RPC url and a private key of an account that’s funded with tRBTC. 

#### Environment Configuration

Once you have an accound with private key then create a .env file in the root of foundry project and add the variables. Foundry automatically loads in a .env file present in your project directory.

The .env file should follow this format:

```bash
ROOTSTOCK_RPC_URL=https://public-node.testnet.rsk.co
PRIVATE_KEY=0x...
```

At the root of the project run:
```bash
# To load the variables in the .env file
source .env
```

#### Modify Deployment Script
Now modify the deployment counter deploy script in scripts directory to use the private key by modifying the run method, see below example:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import "../src/Counter.sol";


contract CounterScript is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast(vm.envUint("PRIVATE_KEY"));

        new Counter();

        vm.stopBroadcast();

    }
}

```

By default, scripts are executed by calling the function named run, our entrypoint.

```solidity
uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
```

Note: you must be careful when exposing private keys in a .env file and loading them into programs. This is only recommended for use with non-privileged deployers or for local / test setups.

When we call `vm.startBroadcast()` the contract creation will be recorded by Forge, and we can broadcast the transaction to deploy the contract on-chain.


#### Execute the deployment script

Now we will use Forge to run our script and broadcast the transactions for us - this can take a little while, since Forge will also wait for the transaction receipts. 


```bash
forge script script/Counter.s.sol --rpc-url $ROOTSTOCK_RPC_URL --broadcast --legacy
```

Note: EIP-1559 is not supported or not activated on the Rootstock RPC url so that's why pass the --legacy flag to use legacy transactions instead of the EIP-1559 ones.

You should see something like this after a minute or so:

```bash

[⠰] Compiling...
No files changed, compilation skipped
Script ran successfully.

== Logs ==
  Counter: 

## Setting up 1 EVM.

==========================

Chain 31

Estimated gas price: 0.065164 gwei

Estimated total gas used for script: 138734

Estimated amount required: 0.000009040462376 ETH

==========================
##
Sending transactions [0 - 0].
⠁ [00:00:00] [###############################################################################################################################################] 1/1 txes (0.0s)##
Waiting for receipts.
⠉ [00:00:25] [###########################################################################################################################################] 1/1 receipts (0.0s)
##### 31
✅  [Success]Hash: 0x015de35ffae94f491d4630f2aec84c49ae8170d5ecf3f4c1cdc8718bc4a00052
Contract Address: 0x64B24E046259042e16a337Be4648CeAAF8Eb72C6
Block: 5071408
Gas Used: 106719



==========================

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.
Total Paid: 0. ETH (106719 gas * avg 0 gwei)

Transactions saved to: /hello_foundry/broadcast/Counter.s.sol/31/run-latest.json

Sensitive values saved to: /hello_foundry/cache/Counter.s.sol/31/run-latest.json

```
The broadcast directory will be updated automatically with the latest output of the deployment. 


See foundry deployment documentation [here](https://book.getfoundry.sh/tutorials/solidity-scripting#deploying-our-contract)



## Related Docs

- [Foundry Project Layout](https://book.getfoundry.sh/projects/project-layout)
- [RPC Calls Using Cast](https://book.getfoundry.sh/cast/)
- [Foundry Configurations](https://book.getfoundry.sh/config/)
- [Solidity Scripting](https://book.getfoundry.sh/tutorials/solidity-scripting)
- [Deploy Smart Contracts To Deterministic Addresses](https://book.getfoundry.sh/tutorials/create2-tutorial)
- [Gas Tracking](https://book.getfoundry.sh/forge/gas-tracking)
- [Debugging](https://book.getfoundry.sh/forge/debugger)
- [Chisel](https://book.getfoundry.sh/chisel/)
- [Deploy and Verify](https://book.getfoundry.sh/forge/deploying)
- [Testing](https://book.getfoundry.sh/forge/advanced-testing)
