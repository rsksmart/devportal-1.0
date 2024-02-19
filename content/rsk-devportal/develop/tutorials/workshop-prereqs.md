---
menu_order: 400
menu_title: Rootstock Development Requirements
layout: rsk
title: "Rootstock Development Environment Setup Guide"
tags: rootstock, workshop, pre-requisites
description: "This guide provides essential setup instructions for Rootstock development, including hardware and key software installations."
---
**Welcome to the Rootstock Workshop Prerequisite!** Whether you're here to dive into the world of Rootstock tools for the first time or to ensure you have all the necessary setup before advancing your existing projects, you're in the right place. This page is your guide to starting, outlining all the prerequisites needed to install and use any Rootstock tool effectively.

**Rootstock Development Environment Setup Guide!** 

This guide details the necessary hardware and software requirements for developing on the Rootstock blockchain. It includes setup instructions for essential tools such as Java, Node.js, Hardhat, and RSKj, ensuring developers have a clear path to prepare their environment for Rootstock projects, whether for local development, testing, or deployment.

## Hardware Requirements

Ensure your system meets the following minimum specifications:
- **CPU:** 2 cores
- **Memory:** 8 GB RAM
- **Storage:** 128 GB
- **Operating System:** 64-bit

## Software Requirements
### Operating Systems

- **Supported OS:** 
    - macOS
    - Windows
    - Linux

> macOS users should have a version that supports Apple Silicon and Rosetta 2

### Command Line Tools

#### POSIX Compliant Shell

[](#top "collapsible")
- macOS/Linux
    - Standard terminal.
- Windows
    - Standard terminals like `cmd` or PowerShell may not support some commands. We recommended installing [Git for Windows](https://gitforwindows.org/) for Git Bash, which provides a more UNIX-like experience. Here's a [tutorial on Git Bash](https://www.atlassian.com/git/tutorials/git-bash).

### Development Tools

[](#top "collapsible")
- Code Editor
    - Recommended: A code editor with Solidity and JavaScript syntax support, such as [Visual Studio Code](https://code.visualstudio.com).
- Node.js
    - Essential for Rootstock development tools.
    - **Version:** 12 or later. Use [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm) for installation:
        ```shell
        nvm install 12
        nvm use 12
        ```
- Hardhat
    - Core tool for blockchain project development on Rootstock.
    - Install with npm:
        ```shell
        npm install --save-dev hardhat
        ```
- Java
    - Needed for RSKj, the Rootstock node software.
    - **Version:** Java 8. We recommend installing Java using SDKman which allows you to install and switch between multiple versions if needed:
        ```shell
        curl -s "https://get.sdkman.io/" | bash
        source "$HOME/.sdkman/bin/sdkman-init.sh"

        # to get a filtered list of available java versions
        sdk list java | grep "8\."

        # copy and install one of the options listed for use, e.g. 8.0.242.j9-adpt
        sdk install java <selected-version>

        # list installed versions, and switch to the selected one
        sdk use java <selected-version>
        java -version
        ```
- cURL
    - For data exchange between your device and a server.
    - Run `curl --version` to verify installation or download from [cURL website](https://curl.haxx.se/download.html).
- OpenZeppelin CLI
    - For developing, managing, and securing decentralized applications.
    - Installation command:
        ```shell
        npm install @openzeppelin/cli
        ```
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

## Conclusion
This guide provides a comprehensive overview to prepare your development environment for Rootstock projects, covering both hardware and software aspects. Ensure all requirements are met before proceeding with development activities.
