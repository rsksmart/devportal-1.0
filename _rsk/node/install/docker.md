---
layout: rsk
title: Setup node on Docker
tags: docker, desktop, macOS, rskj, windows, install, rsk, node, how-to, network, requirements, mainnet
collection_order: 2321
---

Make sure your system meets the [minimum requirements](../requirements/) before installing RSK nodes on it.

### Install Docker Desktop Client

Docker Desktop provides an easy and fast way for running containerized applications on various of operating systems.

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

First of all, download the RSK a Dockerfile and supervisord.conf from [artifacts repo](https://github.com/rsksmart/artifacts/tree/master/Dockerfiles/RSK-Node).

Inside the artifacts repo, you can choose which ***type of*** node you are going to install:

* A node connected to the public RSK Mainnet: `Dockerfile.MainNet`
* A node connected to the public RSK Testnet: `Dockerfile.TestNet`
* A node connected to a private RegTest network: `Dockerfile.RegTest`

#### Install the node using Docker containers (Intel Chips)

Then build the container by running (depending on your node's type):

* Mainnet
  ```
  docker build -t mainnet -f Dockerfile.MainNet .
  ```
* Testnet
  ```
  docker build -t testnet -f Dockerfile.TestNet .
  ```
* Regtest
  ```
  docker build -t regtest -f Dockerfile.RegTest .
  ```

When the build finishes, you have a container ready to run RSK.

To run the container, you should execute (depending on your node's type):

* Mainnet
  ```
  docker run -d --name mainnet-node-01  -p 4444:4444 -p 5050:5050 mainnet
  ```
* Testnet
  ```
  docker run -d --name testnet-node-01  -p 4444:4444 -p 50505:50505 testnet
  ```
* Regtest
  ```
  docker run -d --name regtest-node-01  -p 4444:4444 -p 30305:30305 regtest
  ```

#### Install the node using Docker containers (M1 Chips)

To install the node using docker containers from Mac M1:

* Pull `rskj-standlone` docker image and run container from this image with the following command:
  ```
  docker run rsksmart/rskj-standalone
  ``` 

*It's possible that you may need to enable experimental features of Docker if your version does not support BuildX plugin by default. In order to enable experimental features:*

* You can update `/etc/docker/daemon.json` to add the property `experimental: true`.
* If you have docker desktop just click: *Settings -> Docker Engine*. In the center you will see the same json from `daemon.json`, just add the property `experimental: true` at the top level of the json. Finally click on *Apply and Restart* 

Then build the container by running (depending on your node's type):

* Mainnet
  ```
  docker buildx build --platform linux/amd64 -t mainnet -f Dockerfile.MainNet .
  ```
* Testnet
  ```
  docker buildx build --platform linux/amd64 -t testnet -f Dockerfile.TestNet .
  ```
* Regtest
  ```
  docker buildx build --platform linux/amd64 -t regtest -f Dockerfile.RegTest .
  ```

When the build finishes, you have a container ready to run RSK.

To run the container, you should execute (depending on your node's type):

* Mainnet
  ```
  docker run -d --name mainnet-node-01  -p 4444:4444 -p 5050:5050 mainnet
  ```
* Testnet
  ```
  docker run -d --name testnet-node-01  -p 4444:4444 -p 50505:50505 testnet
  ```
* Regtest
  ```
  docker run -d --name regtest-node-01  -p 4444:4444 -p 30305:30305 regtest
  `

## Video

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/c-YGtE3UIjE?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
