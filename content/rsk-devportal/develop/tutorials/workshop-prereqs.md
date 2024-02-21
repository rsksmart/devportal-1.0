---
menu_order: 400
menu_title: Rootstock Development Requirements
layout: rsk
title: "Rootstock Development Environment Setup Guide"
tags: rootstock, workshop, pre-requisites
description: "This guide provides essential setup instructions for Rootstock development, including hardware and key software installations."
---

This guide details the necessary hardware and software requirements for developing on the Rootstock blockchain. It includes setup instructions for essential tools such as Java, Node.js, Hardhat, and RSKj, ensuring developers have a clear path to prepare their environment for Rootstock projects, whether for local development, testing, or deployment.

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
    - Lock dependencies versions
        ```shell
        npm install --save-dev hardhat@2.19.4
        ```

This guide provides a comprehensive overview to prepare your development environment for Rootstock projects. Ensure all requirements are met before proceeding with development activities.
