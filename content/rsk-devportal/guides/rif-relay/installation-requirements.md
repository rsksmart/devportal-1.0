---
menu_order: 200
menu_title: Installation Requirements
layout: rsk
title: RIF Relay Installation Requirements
tags: rif, envelope, relay, user, guide, install
permalink: /guides/rif-relay/installation-requirements/
---

## Installation Requirements

To set up the RIF Relay system running locally there are some tools that are required. All of these tools are open source and have their own support page. The functionality of RIF Relay does not depend on these technologies and could be updated or replaced, if necessary. 

### Hardware Requirements

- **Apple Silicon Mac:** A Mac with an Apple M1 chip (or later models) is required.

### Software Requirements

-	**macOS:** A recent version of macOS that supports both Apple Silicon (ARM architecture) and Rosetta 2 translation for running x86_64 applications.
-	**Java Development Kit (JDK):** ARM-compatible JDK: An ARM-compatible version of Java (like OpenJDK for ARM).
-	**x86_64 JDK:** For compatibility with specific libraries or applications not yet available for ARM, an x86_64 version of Java is also needed. This can be installed using Homebrew under Rosetta 2.
-	**Rosetta 2:** This translation layer enables x86_64 applications to run on Apple Silicon. It's crucial for running software that is yet to be optimized for ARM architecture.
-	**Homebrew:** This is a package manager for macOS used for installing various software, including the x86_64 version of Java. Depending on the software requirements, you might need both the ARM and x86_64 versions of Homebrew.
-	**Docker:** You need to have `docker` and `docker-compose` installed locally. If you don't have these installed, we recommend following the guidelines in the official [Docker documentation](https://docs.docker.com/get-docker/) for installation and updates.
-	**Node & NPM:** We use Node version `v18`. It's recommended to manage Node versions with [`nvm`](https://github.com/nvm-sh/nvm). After installing nvm, run these commands to install and switch to Node version 18:
    ```bash
    nvm install 18
    nvm use 18
    ```
    To use Node without `nvm`, follow the installation instructions on Node's [official website](https://nodejs.org/en/). After installation, verify it by executing `node -v` in your command line, which will display the installed Node version. This step ensures Node is correctly installed on your system.
- **Rootstock Node:** You need to set up and run a Rootstock node, preferably the latest version from RSKj releases. The node can operate locally or via Docker. For details on how to run a Rootstock node using a JAR file, see [How to setup node on Java](https://dev.rootstock.io/rsk/node/install/operating-systems/java/). For Docker, see [How to setup an RSK node on Docker](https://dev.rootstock.io/rsk/node/install/operating-systems/).
- **Ethers:** The interaction with the blockchain is done using [Ethers v5](https://docs.ethers.org/v5/).

## RIF Relay Contract Deployment Requirements

### Hardhat

We use `Hardhat` version `v2.10.2` for blockchain interactions. For details on how to install Hardhat, follow the instructions on the [Hardhat website](https://hardhat.org/hardhat-runner/docs/getting-started#installation). 
Use the `npx` prefix for Hardhat commands to ensure the use of the project-specific version. Verify the installation with `npx hardhat version`. For configuration, refer to `hardhat.config.ts`. Detailed usage and configuration instructions are available in [Hardhat's documentation](https://hardhat.org/docs).

### Running on macOS

To run the project on a Mac using Docker:

1. **Patch `readlink`**: MacOS uses BSD's `readlink`, which differs from GNU's version. Install GNU's `readlink` via Homebrew:

   ```
   brew install coreutils
   ln -s /usr/local/bin/greadlink /usr/local/bin/readlink
   ```

2. **Modify `PATH`**: Ensure `/usr/local/bin` takes precedence over `/usr/bin`. To verify the path, run `which readlink`; the output should be `/usr/local/bin/readlink`. To test, run `readlink -f .` to confirm the setup.

### Using Docker

RIF Relay components can be deployed using Docker or locally using [Hardhat](/guides/rif-relay/installation-requirements#hardhat)
A guide for the [RIF Relay Server](https://github.com/rsksmart/rif-relay-server#execute-as-a-docker-container) can be found in the repository.
