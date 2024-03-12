---
menu_order: 1100
menu_title: Hackathon Dev Starter Kit
layout: rsk
title: "Rootstock Hackathon Dev Starter"
tags: rootstock, workshop, pre-requisites
description: "This guide provides essential setup instructions for Rootstock development, including hardware and key software installations."
---

The hackathon dev starter guide details the necessary tools and resources for developing on the Rootstock blockchain. It includes setup instructions for essential Dev tools such as Hardhat, and RSKj, wallets, ensuring developers have a clear path to prepare their environment for developing on Rootstock, whether for local development, testing, or for deployment.

## Quick start setup

This section includes setup instructions for the [Quick Start Guide on Rootstock using Hardhat](/guides/quickstart/hardhat/).

[](#top "collapsible")
- A. Installing Node.js and npm
    - Using [Node Version Manager (recommended)](https://nodejs.org/en/download/package-manager#nvm)
        - **Version:** 
            - 12 or later. 
        - For installation, use [NVM install script](https://github.com/nvm-sh/nvm#install--update-script).
    - For Windows 
        -   1. Download the Node.js Installer from [Node.js Downloads](https://nodejs.org/en/download).
            2. Run the installer and follow the on-screen instructions.
            3. Open Command Prompt or PowerShell and check versions with `node -v` and `npm -v`. 
                - See [Posix Compliant Shell](#posix-compliant-shell).
    - For MacOS 
        1. Install Homebrew (if not installed):
            ```shell
            /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)``` 
        2. Install Node.js and npm with `brew install node` 
        3. Check versions in Terminal with `node -v` and `npm -v`
    - For Linux 
        1. Open a terminal.
        2. Update package manager with sudo apt update
        3. Install Node.js and npm with sudo apt install nodejs npm
        4. Check versions in the terminal with `node -v` and `npm -v`
- B. OpenZeppellin
    - To install OpenZeppelin:
        ```shell
        npm install @openzeppelin/cli
        ```
- C. RSKj
    - To install RSKj. See [Node Setup](#rskj-node-setup).

Make sure to adapt the commands based on your system and preferences. Always refer to the official documentation for the latest and most accurate information: [Node.js Downloads](https://nodejs.org/en/download) and [npm documentation](https://docs.npmjs.com/).

## RSKj Node Setup

[](#top "collapsible")
- Ensure your system meets the following minimum specifications:
    -  Node requirements
        - See [hardware requirements](/rsk/node/install/requirements/)
    - Operating Systems
        - See [Operating Systems](/rsk/node/install/operating-systems/)
    - Installing RSKj
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
        - See [Configuring and using RPC over WebSockets](/rsk/node/architecture/json-rpc/transport-protocols#websockets-transport-protocol)
        - See [RSKj for Developers](/kb/rskj-for-developers/)
        > Note that [Rootstock public nodes](/rsk/node/architecture/json-rpc/)
        > do not expose WebSockets, they are HTTP only.
        > To work around this, you may either run your own Rootstock node,
        > or use a third-party node provider, such as [Getblock](/solutions/getblock/) or [NowNodes](/solutions/nownodes/).

## Command Line Tools

### POSIX Compliant Shell

[](#top "collapsible")
- macOS/Linux
    - Standard terminal.
- Windows
    - Standard terminals like `cmd` or PowerShell may not support some commands. We recommended installing [Git for Windows](https://gitforwindows.org/) for Git Bash, which provides a more UNIX-like experience. Here's a [tutorial on Git Bash](https://www.atlassian.com/git/tutorials/git-bash).

## Dev Tools

[](#top "collapsible")
- Tools Overview
    - [Tools](/tools/)
- Wallets
    - [Wallets](/develop/wallet/)
- Hardhat
    - Core tool for smart contract development on Rootstock.
    - Install:
        ```shell
        npm install --save-dev hardhat
        ```
    - See [Rootstock Quick start Guide using Hardhat](/guides/quickstart/hardhat/)

## Useful Links
- [RSKj for Developers](/kb/rskj-for-developers/)
- [Rootstock Quick Start Guides](/guides/quickstart/)
- [Knowledge Base](/kb/)
- [JSON RPC](/rsk/node/architecture/json-rpc/)
- [Rootstock Subgraph](/kb/the-graph-rootstock/)
- [Starter Kits](/guides/starter-kits/)