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

For Mac OSX Developers:

Please ensure you are running xcode directly and not the command-line instance. Run 

```shell
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer 
```

#### Install Docker Desktop Client

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

#### RSKJ Docker Images

Dockerfiles corresponding to the different environments can be downloaded from the [RSK Artifacts](https://github.com/rsksmart/artifacts/tree/master/Dockerfiles/RSK-Node) page.

Next run the following commands to build the Docker images for each of the environments.

```shell
git clone git@github.com:rsksmart/artifacts.git
cd cd artifacts/Dockerfiles/RSK-Node/
docker build -t mainnet -f Dockerfile.MainNet .
docker build -t testnet -f Dockerfile.TestNet .
docker build -t regtest -f Dockerfile.RegTest .
```

The final line of output for each of the `docker build` commands should look similar to `Successfully tagged regtest:latest`.

#### Start RSKJ Container for a RegNet Node

For this quick start tutorial, we are going to use the `RegTest` docker

Run this command to build a RSKJ node for RegNet

```shell
cd <tutorial-root>/docker/
docker build -t regtest -f Dockerfile.RegTest .
```

Start a container with the built image. This command will start an RSKJ node with port 4444, 4445 and 30305 open.

```shell
docker run -d --name regtest-node-01 -p 4444:4444 -p 4445:4445 -p 30305:30305 regtest
```

If the container runs successfully, you should get an output that is a hash, for example: `2f75d6c3f08dc15232be42ed2dabcc370742b3dd573f45fcac7253abce151f9d`.

You should be able to view the shell output for the container. Instead of the container ID, you may also use the hash that was output previously.

```shell
sudo docker container logs --follow regtest-node-01
```

You should see this in the logs: `INFO success: rsk entered RUNNING state, process has stayed up for > than 1 seconds (startsecs)`. That indicates that an RSKJ node is running within this docker container.

#### Testing the nodes

RSK nodes allow you to connect over HTTP, whcih is exposed on port `4444`.
Let us verify that this works.

```bash
curl http://localhost:4444/1.1.0/ -X POST -H "Content-Type: application/json"     --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
{"jsonrpc":"2.0","id":1,"result":"0x2db0b"}
```
You can enter any valid JSON-RPC commands as the `POST` body.

The RSK nodes also allow you to connect over websockets, which are exposed on port `4445`.
Let us verify that this works too.

```bash
npx wscat -c ws://localhost:4445/websocket
```

If you have not installed `wscat` globally before, wait for it to do so,
and then it will load up its own shell.

```text
Connected (press CTRL+C to quit)
>
```

Again, you can enter any valid JSON-RPC command in the prompt.
Be sure to check that you receive a valid and expected response.

```text
> {"jsonrpc":"2.0","method":"eth_blockNumber", "params": [], "id":1}
< {"jsonrpc":"2.0","id":1,"result":"0x72"}
```

#### Cleaning up

After finishing the tutorial, you can use the following commands to shut down or remove the container.

```shell
docker container list
docker kill <container id>
docker rm <container id>
```

For the above example, `<container id>` is `regtest-node-01`.

----

<a href="/quick-start/step2-install-truffle-and-ganache" class="green-button">Next</a>