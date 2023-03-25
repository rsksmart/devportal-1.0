---
layout: rsk
title: RIF Relay Installation Requirements
tags: rif, envelope, relay, user, guide, install
permalink: /guides/rif-relay/installation-requirements/
---

## Requirements

To have the RIF Relay System running locally there are some tools that are required. All of these tools are open source and have their own support page. The functionality of RIF Relay does not depend on these technologies and could be updated or replaced, if necessary. 

### RSK Node

You need to have a running RSK node version [RSKj](https://github.com/rsksmart/rskj/releases). It is recommended to use the latest released version.

> The node can be run locally or using docker.

When running a local RSKj node, we can configure the node to connect to a specific network; in this guide we will use `Regtest` and `Testnet`. 

### Node & NPM

The `Node` version used is `v16`. 

We recommend the use of [`nvm`](https://github.com/nvm-sh/nvm). After the installation process you can execute the following commands to use node version 16.

```
nvm install 16
nvm use  16
```

If you choose to use node without `nvm`, you can find the installation instructions at Node's [website](https://nodejs.org/en/). 

You can check the installation by running `node -v`.

### Hardhat

An important tool we use for interacting with the blockchain is `Hardhat` version `v2.10.2`.

You can follow the installation guide in the Hardhat official [website](https://hardhat.org/).

Run all hardhat commands with the prefix `npx`. This is to execute node packages using the project's version.

Check if the installation was successful by running `npx hardhat version` in your terminal.

The configuration file is `hardhat.config.ts`. Please see [Harhats's documentation](https://hardhat.org/docs) for details about this file and how to use it.


### Using Docker

We recommend following the official [documentation](https://docs.docker.com/get-docker/) for installing Docker and keeping it updated.

You'll need to install both `docker` as well as `docker-compose`.

The RIF Relay components can be deployed using Docker or locally using [Hardhat](/guides/rif-relay/installation-requirements#hardhat)

A guide for the [RIF Relay Server](https://github.com/rsksmart/rif-relay-server#execute-as-a-docker-container) can be found in the repository.

#### Running on macOS

To run the project using Docker on a Mac, please do the following: 

- Patch `readlink`
The startup scripts assume that GNU's `readlink` command is available. But MacOS ships with BSD's `readlink`, which is incompatible with GNU's version. So we must patch `readlink`. This can be done using [Homebrew](https://brew.sh/) as follows:

```
brew install coreutils
ln -s /usr/local/bin/greadlink /usr/local/bin/readlink
```

After this step, ensure that the `PATH` variable gives priority to `/usr/local/bin` over `/usr/bin`. You can check this with `which readlink`, which should output `/usr/local/bin/readlink`. Alternatively, try executing `readlink -f .`, if it works, you're ok.

### Ethers

The interaction with the blockchain is done using [Ethers v5](https://docs.ethers.org/v5/).