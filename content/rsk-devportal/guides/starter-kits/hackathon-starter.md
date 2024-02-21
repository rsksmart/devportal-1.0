---
menu_order: 1100
menu_title: Hackathon Starter Kit
layout: rsk
title: "Rootstock Hackathon Starter Guide"
tags: rootstock, workshop, pre-requisites
description: "This guide provides essential setup instructions for Rootstock development, including hardware and key software installations."
---

The hackathon starter kit guide details the necessary tools and resources for developing on the Rootstock blockchain. It includes setup instructions for essential Dev tools such as Hardhat, and RSKj, wallets, ensuring developers have a clear path to prepare their environment for developing on Rootstock, whether for local development, testing, or for deployment.

## Hardware Requirements

Ensure your system meets the following minimum specifications:

- See [hardware requirements](/rsk/node/install/requirements/)

## Operating Systems

- See [Operating Systems](/rsk/node/install/operating-systems/)

## Node Setup

[](#top "collapsible")
- RSKj
    - RSKj allows you to run a Rootstock node, crucial for local development and testing. It supports connections to Regtest (local), Testnet (testing), and Mainnet (production).
    - **Downloading RSKj:**
        - Visit the [official RSKj GitHub repository](https://github.com/rsksmart/rskj) to download the latest stable release.
    - **Running RSKj:**
        - For local testing with Regtest, use the command:
            ```shell
            java -jar rskj-core-<version>.jar --regtest
            ```
        Replace `<version>` with the actual version number of your RSKj jar file. This command starts a local Rootstock node for development and testing.
        - **Note:** Ensure your development environment has sufficient storage and memory, as connecting to Testnet or Mainnet requires downloading the blockchain.
- RPC 
    - [Remote procedure calls (JSON-RPC)](/rsk/node/architecture/json-rpc/) are the primary interface through which Rootstock nodes communicate over the network.
    - JSON-RPC is available over two network transport protocols: **HTTP** and **WebSockets**
    - [Configuring and using RPC over HTTP](/rsk/node/architecture/json-rpc/transport-protocols#http-transport-protocol)
    - [Configuring and using RPC over WebSockets](/rsk/node/architecture/json-rpc/transport-protocols#websockets-transport-protocol)
    - [RSKj for Developers](/kb/rskj-for-developers/)
    > Note that [Rootstock public nodes](/rsk/node/architecture/json-rpc/)
    > do not expose WebSockets, they are HTTP only.
    > To work around this, you may either run your own Rootstock node,
    > or use a third-party node provider, such as [Getblock](/solutions/getblock/) or [NowNodes](/solutions/nownodes/).

### Command Line Tools

#### POSIX Compliant Shell

[](#top "collapsible")
- macOS/Linux
    - Standard terminal.
- Windows
    - Standard terminals like `cmd` or PowerShell may not support some commands. We recommended installing [Git for Windows](https://gitforwindows.org/) for Git Bash, which provides a more UNIX-like experience. Here's a [tutorial on Git Bash](https://www.atlassian.com/git/tutorials/git-bash).

## Dev Tools

[](#top "collapsible")
- All Tools
    - [Tools](/tools/)
- Wallets
    - [Wallets](/develop/wallet/)
- Node.js
    - Essential for Rootstock development tools.
    - **Version:** 12 or later. Use [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) for installation:
        ```shell
        nvm install 12
        nvm use 12
        ```
- Hardhat
    - Core tool for blockchain project development on Rootstock.
    - Install:
        ```shell
        npm install --save-dev hardhat
        ```
    - See [Rootstock Quick start Guide using Hardhat](/guides/quickstart/hardhat/)

## Tutorials

- [RSKj for Developers](/kb/rskj-for-developers/)
- [Rootstock Quick start Guides](/guides/quickstart/)

## Useful Links

- [JSON RPC](/rsk/node/architecture/json-rpc/)
- [Rootstock Subgraph](/kb/the-graph-rootstock/)
- [Javascript Testing](/guides/starter-kits/javascript-testing/)
- [Smart Contract Testing](/guides/starter-kits/smart-contract-testing/)