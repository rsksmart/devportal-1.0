---
layout: rsk
title: Quick Start - Step 1
---
## Step 1 : Install RSK local node


RSK node can be installed on all major platforms, including Linux, Windows, and Mac. In this tutorial, we provide step-by-step instructions for running a local RegNet node through Docker. Docker installation supports Mac, Windows, and Linux.

#### Prepare the Environment 
The tutorial project files can be downloaded from this [github repo](https://github.com/rsksmart/truffle-integration).

```shell
git clone https://github.com/rsksmart/truffle-integration

cd truffle-integration
```
For MAC OSX Developers:

Please ensure you are running xcode directly and not the command-line instance. Run 
```shell
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer 
```


#### Install Docker Desktop Client
Docker Desktop provides an easy and fast way for running containerized applications on various of operating systems. 

- Download and Install from https://www.docker.com/products/docker-desktop

- Start the Docker Desktop client

- Login with a Docker Hub free account


#### Download the RSKJ Docker File
Dockerfiles corresponding to the different environments can be downloaded from the [RSK Artifacts ](https://github.com/rsksmart/artifacts/tree/master/Dockerfiles/RSK-Node)page.

to build a docker container for MainNet
 ```shell
docker build -t mainnet -f Dockerfile.MainNet .
```

to run a docker container selected before
 ```shell
docker run -d --name mainnet-node-01  -p 4444:4444 -p 5050:5050 mainnet
```


#### Start RSKJ Container for a RegNet Node
For this quick start tutorial, we are going to use the docker file from [here](https://github.com/rsksmart/truffle-integration/tree/master/docker). It provides a ready-to-use RegNet environment. 

- Make sure you have login docker hub by doing docker ps in terminal
```shell
docker ps
```

- Run this command to build a RSKJ node for RegNet
```shell
cd <tutorial-root>/docker/
docker build -t regtest -f Dockerfile.RegTest .
```

- Start a container with the built image. This command will start Rskj node with port 4444, 4445 and 30305 open.
```shell
docker run -d --name regtest-node-01 -p 4444:4444 -p 4445:4445 -p 30305:30305 regtest. This
```

- After finishing the tutorial, you can use the following commands to shut down or remove the container.
```shell
docker container list
docker kill <container id>
docker rm <container id>
```