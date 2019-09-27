---
layout: rsk
title: Setup node on Docker
---

## Install RskJ Using Docker
First of all, download the RSK a Dockerfile and supervisord.conf from [artifacts repo](https://github.com/rsksmart/artifacts/tree/master/Dockerfiles/RSK-Node).

Inside the artifacts repo, you can choose which ***type of*** node you are going to install:
* A node connected to RSK MainNet: Dockerfile.MainNet
* A node connected to RSK TestNet: Dockerfile.TestNet
* A node Standalone/RegTest or private network: Dockerfile.RegTest

#### Install the node using Docker containers
This only can be done in a machine that is already [running Docker](https://docs.docker.com/install/).

Then build the container by running (depending on your node's type):
* MaiNet
``` 
docker build -t mainnet -f Dockerfile.MainNet .
```
* TestNet
```
docker build -t testnet -f Dockerfile.TestNet .
```
* RegTest
```
docker build -t regtest -f Dockerfile.RegTest .
```

When the build finishes, you have a container ready to run RSK.

To run the container, you should execute (depending on your node's type):

* MaiNet
```
docker run -d --name mainnet-node-01  -p 4444:4444 -p 5050:5050 mainnet
```
* TestNet
```
docker run -d --name testnet-node-01  -p 4444:4444 -p 50505:50505 testnet
```
* RegTest
```
docker run -d --name regtest-node-01  -p 4444:4444 -p 30305:30305 regtest
```
