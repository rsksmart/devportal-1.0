---
section_title: Operating Systems
menu_order: 300
menu_title: Setup node on Docker
layout: rsk
title: How to setup an RSK node on Docker
tags: docker, desktop, macOS, rskj, windows, install, rsk, node, how-to, network, requirements, mainnet, testnet, regtest
---

Before installing Docker, ensure your system meets the [minimum requirements](../requirements/) before installing the RSK node.

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

To install an RSK node using Docker, download the RSKj Dockerfiles and `supervisord.conf` from the [artifacts repo](https://github.com/rsksmart/artifacts/tree/master/Dockerfiles/RSK-Node)
or pull the image from [Docker Hub](https://hub.docker.com/r/rsksmart/rskj).

Inside the artifacts repo, you can choose which ***type of*** node you are going to install:

* A node connected to the public RSK Mainnet: `Dockerfile.MainNet`
* A node connected to the public RSK Testnet: `Dockerfile.TestNet`
* A node connected to a private RegTest network: `Dockerfile.RegTest`

#### Install the node using Docker containers (Intel Chips)

Build the container by running any of the following commands:

> Note: The type of node to run is dependent on the node's type installed in [install RSKj using Docker](#install-rskj-using-docker).

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

When the build finishes, you should see an output similar to this:

```shell
  RSK-Node % docker build -t mainnet -f Dockerfile.MainNet . 
  [+] Building 452.4s (12/12) FINISHED                                            
  => [internal] load build definition from Dockerfile.MainNet

  Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
```

Now you have a container ready to run RSK!

To run the container, you should execute:

* Mainnet
  ```
  docker run -p 5050:5050 rsksmart/rskj:latest
  ```

> This will start a Mainnet node. 

* Testnet
  ```
  docker run -p 50505:50505 rsksmart/rskj:latest --testnet
  ```
* Regtest
  ```
  docker run rsksmart/rskj:latest --regtest
  ```

#### Install the node using Docker containers (M1 Chips)

To install the node using docker containers from Mac M1:

* Pull `rskj-standalone` docker image and run container from this image with the following command:

  ```
  docker run rsksmart/rskj-standalone
  ``` 

*It's possible that you may need to enable experimental features of Docker if your version does not support BuildX plugin by default. In order to enable experimental features:*

* You can update `/etc/docker/daemon.json` to add the property `experimental: true`.
* If you have docker desktop just click: *Settings -> Docker Engine*. In the center you will see the same json from `daemon.json`, just add the property `experimental: true` at the top level of the json. Finally click on *Apply and Restart* 

Build the container by running any of the following commands:

> Note: The type of node to run is dependent on the node's type installed in[install RSKj using Docker](#install-rskj-using-docker).

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

To run the container, you should execute:

* Mainnet
  ```
  docker run -p 5050:5050 rsksmart/rskj:latest
  ```

> This will start a Mainnet node. 

* Testnet
  ```
  docker run -p 50505:50505 rsksmart/rskj:latest --testnet
  ```
* Regtest
  ```
  docker run rsksmart/rskj:latest --regtest
  ```

## Video

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/c-YGtE3UIjE?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>


Keep in mind that RSK's blockchain is stored locally in the container. If you want to save it to a permanent storage, you can use a volume mount while starting the container as shown in the command below:

```
docker run -p 5050:5050 -v /path/to/my/storage:/var/lib/rsk/.rsk rsksmart/rskj:latest
```

In order to interact with the node's JSON-RPC endpoint, you'll need to expose it to the host:

```
docker run -p 5050:5050 -p 127.0.0.1:4444:4444 rsksmart/rskj:latest
```

Then, you could, for example, query the current block number with

```shell
curl -H "Content-type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","id":1}' http://127.0.0.1:4444/
```

Finally, you can provide a custom configuration to the node with:

```
docker run -p 5050:5050 -v /path/to/my/custom/node.conf:/etc/rsk/node.conf rsksmart/rskj:latest
```