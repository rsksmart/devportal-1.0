---
menu_order: 200
menu_title: Installation Requirements
layout: rsk
title: RIF Relay Installation Requirements
tags: rif, envelope, relay, user, guide, install
permalink: /guides/rif-relay/installation-requirements/
render_features: 'collapsible'
---

To set up the RIF Relay system running locally there are some tools that are required. All of these tools are open source and have their own support page. The functionality of RIF Relay does not depend on these technologies and could be updated or replaced, if necessary.

[](#top "collapsible")
- Hardware Requirements
    - **A Computer Running x86_64 architecture or Apple Silicon Mac:** A Mac or PC with an Intel x64 architecture or Apple M1 chip (or later models) is required.
- Software Requirements
    -	**macOS, Windows or Linux:** For macOS, you'll need a recent version that supports Apple Silicon (ARM architecture) and Rosetta 2 translation for running x86_64 applications.
    Similarly, for Windows or Linux, any recent distribution that suits your preferences or requirements will work.
    -	**Rosetta 2:** This translation layer enables x86_64 applications to run on Apple Silicon. It's crucial for running software that is yet to be optimized for ARM architecture.
    -	**Homebrew:** This is a package manager for macOS used for installing various software, including the x86_64 version of Java. Depending on the software requirements, you might need both the ARM and x86_64 versions of Homebrew.
    -  **Chocolatey:** This is a Windows equivalent of Homebrew that allows you to install various software, including Java JDK.
    -	**Java Development Kit (JDK):** An ARM-compatible version of Java JDK (like OpenJDK for ARM).
    -	**x86_64 JDK:** For compatibility with specific libraries or applications not yet available for ARM, an x86_64 version of Java is also needed. This can be installed using Homebrew under Rosetta 2.
    -	**Docker:** You need to have `docker` and `docker-compose` installed locally. If you don't have these installed, we recommend following the guidelines in the official [Docker documentation](https://docs.docker.com/get-docker/) for installation and updates.
    -	**Node & NPM:** We use Node version `v18`. It's recommended to manage Node versions with [`nvm`](https://github.com/nvm-sh/nvm). After installing nvm, run these commands to install and switch to Node version 18:
        ```bash
        nvm install 18
        nvm use 18
        ```
        To use Node without `nvm`, follow the installation instructions on Node's [official website](https://nodejs.org/en/). After installation, verify it by executing `node -v` in your command line, which will display the installed Node version. This step ensures Node is correctly installed on your system.
    - **Ethers:** The interaction with the blockchain is done using [Ethers v5](https://docs.ethers.org/v5/).

### Getting Started with RIF Relay

For a detailed step-by-step guide on getting started with RIF Relay, refer to the [Starter kit](/guides/rif-relay/starter-kit).


### RIF Relay Contract Deployment Requirements

[](#top "collapsible")
- Hardhat
    - We use `Hardhat` version `v2.10.2` for blockchain interactions. For details on how to install Hardhat, follow the instructions on the [Hardhat website](https://hardhat.org/hardhat-runner/docs/getting-started#installation). Use the `npx` prefix for Hardhat commands to ensure the use of the project-specific version. Verify the installation with `npx hardhat version`. For configuration, refer to `hardhat.config.ts`. Detailed usage and configuration instructions are available in [Hardhat's documentation](https://hardhat.org/docs).
- Running on macOS
    - To run the project on a Mac using Docker:
    1. **Patch `readlink`**: MacOS uses BSD's `readlink`, which differs from GNU's version. Install GNU's `readlink` via Homebrew:
    ```
    brew install coreutils
    ln -s /usr/local/bin/greadlink /usr/local/bin/readlink
    ```
    2. **Modify `PATH`**: Ensure `/usr/local/bin` takes precedence over `/usr/bin`. To verify the path, run `which readlink`; the output should be `/usr/local/bin/readlink`. To test, run `readlink -f .` to confirm the setup.
- Running on Windows
    1. **Install GNU CoreUtils**: Install GNU CoreUtils via a package manager liFor instance, using Chocolatey: `choco install coreutils`. This will install GNU's readlink among other core utilities.
    2. **Modify `PATH`**: After installation, if not automatically added to the PATH, manually add the location where GNU's readlink is installed (usually `C:\Program Files\GNU\bin`) to the system PATH:
    - Right-click on "This PC" or "My Computer" and select "Properties."
    - Choose "Advanced system settings."
    - Click on "Environment Variables" and then select "Path" under "System Variables."
    - Click "Edit" and add the path to GNU CoreUtils (C:\Program Files\GNU\bin) at the end of the list or create a new entry for it.
    - Close all command prompts and open a new one to verify by running where readlink. The output should indicate the path to the GNU readlink.
- Running on Linux
    - Most Linux distributions come with GNU core utilities by default, so you might not need to install anything extra.
    1. **Modify `PATH`**: In case the system has a different version or for some reason, you've installed GNU CoreUtils separately, ensure that the location of GNU's readlink (typically `/usr/bin or /usr/local/bin`) precedes other versions in the PATH environment variable.
    Check this by running which readlink. If it points to `/usr/bin/readlink`, you may need to update the `PATH`.
    To prioritize the GNU CoreUtils version, modify the PATH variable in your shell's configuration file (e.g., .bashrc, .bash_profile, .zshrc, etc.) by adding: `export PATH=/usr/local/bin:$PATH`.
- Using Docker
    - RIF Relay components can be deployed using Docker or locally using [Hardhat](/guides/rif-relay/installation-requirements#hardhat). A guide for the [RIF Relay Server](https://github.com/rsksmart/rif-relay-server#execute-as-a-docker-container) can be found in the repository.

