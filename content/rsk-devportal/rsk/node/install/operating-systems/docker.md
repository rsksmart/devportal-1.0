---
section_title: Operating Systems
menu_order: 5
menu_title: Setup node on Docker
layout: rsk
title: How to setup a Rootstock node on Docker | Rootstock (RSK)
tags: docker, rootstock, desktop, macOS, rskj, windows, install, rsk, node, how-to, network, requirements, mainnet, testnet, regtest
---

Before installing Docker, ensure your system meets the [minimum requirements](/rsk/node/install/requirements/) before installing the Rootstock node. If you already have docker installed. See [Install RSKj using Docker](#install-rskj-using-docker).

### Install Docker Desktop Client

[Docker Desktop](https://www.docker.com/products/docker-desktop/) provides an easy and fast way for running containerized applications on various operating systems.

For Mac OSX and Windows:

- [Download](https://www.docker.com/products/docker-desktop) and install
- Start the Docker Desktop client
- Login with a Docker Hub free account

For Linux:

- Install [Docker Engine Community](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
- Note that you will need to use `sudo` for all docker commands, by default. To avoid this [additional steps](https://docs.docker.com/install/linux/linux-postinstall/) are required.

Ensure that docker is running by running the following command - it should run without any errors.

```shell
docker ps
```

More information about Docker install [here](https://docs.docker.com/install/).

## Install RSKj Using Docker

To install a Rootstock node using Docker, visit the [Docker Hub](https://hub.docker.com/r/rsksmart/rskj) for installation instructions.