---
section_title: Operating Systems
menu_order: 4
menu_title: Setup node on Docker
layout: rsk
title: How to setup a Rootstock node on Docker
tags: docker, desktop, macOS, rskj, windows, install, rsk, node, how-to, network, requirements, mainnet, testnet, regtest
render_features: 'collapsible'
---

Before installing Docker, ensure your system meets the [minimum requirements](/rsk/node/install/requirements/) for installing the Rootstock node.

### Install Docker Desktop Client

[Docker Desktop](https://www.docker.com/products/docker-desktop/) provides an easy and fast way for running containerized applications on various operating systems.

[](#top "collapsible")
- Mac OSX and Windows
    - [Download](https://www.docker.com/products/docker-desktop) and install
    - Start the Docker Desktop client
    - Login with a free Docker Hub account
- Linux
    - Install [Docker Engine Community](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
    - By default, you will need to use `sudo` for all docker commands. To avoid this, follow the [additional steps](https://docs.docker.com/install/linux/linux-postinstall/) required.

Ensure that docker is running by running the following command:

```shell
docker ps
```
This should run without errors.
> To learn more about installing Docker, visit the [Docker installation page](https://docs.docker.com/install/).

### Install RSKj using Docker image
To install a Rootstock node using Docker:

1. Pull the RSKj image from [Docker Hub](https://hub.docker.com/r/rsksmart/rskj). Alternatively, you can download the RSKj Dockerfiles and `supervisord.conf` from the [Rootstock artifacts repo](https://github.com/rsksmart/reproducible-builds/tree/master/rskj/5.4.0-fingerroot).
    [](#top "collapsible")
    - Downloading from the artifacts repository
        - If you're downloading from the artifacts repo, navigate to the repo and select which ***type of*** node you want to install:
            * A node connected to the public Rootstock Mainnet: `Dockerfile.MainNet`
            * A node connected to the public Rootstock Testnet: `Dockerfile.TestNet`
            * A node connected to a private RegTest network: `Dockerfile.RegTest`
        > **Note:** If you get the following error, ensure that supervisord.conf is in the same folder as the dockerfile:
        ```jsx
        => ERROR [6/6] COPY supervisord.conf /etc/supervisor/conf.d/supervisord.  0.0s
        ------
            > [6/6] COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf:
            ------
                failed to compute cache key: "/supervisord.conf" not found: not found
        ```     
        When the build finishes, you should see an output similar to this:
        ```jsx
        [+] Building 158.0s (11/11) FINISHED                                          
        => [internal] load build definition from Dockerfile.RegTest               0.0s
        => => transferring dockerfile: 293B
            ....
            => => exporting layers                                                    3.8s 
            => => writing image sha256:d73739affdbe3f82a8ba9c686d34c04f48ac510568522  0.0s 
            => => naming to docker.io/library/regtest                                 0.0s
            Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
        ```
        Now you have a Docker container ready to run the Rootstock node!
    
1. To run the RegTest node, execute the following commands:

    1. Pull the RSKj Docker Image:
        ```jsx
        docker pull rsksmart/rskj
        ```
    1. Run the Node:
        ```jsx
        docker run -d --name rsk-node -p 4444:4444 -p 50505:50505 rsksmart/rskj node --regtest
        ```
    If successful, the node should be running.

1. Interact with the Node using the following command:
    ```jsx
    curl -X POST -H "Content-Type: application/json" --data "{\"jsonrpc\":\"2.0\",\"method\":\"net_version\",\"params\":[],\"id\":1}" http://127.0.0.1:4444
    ```
    This should return an output as shown below:
    ```bash
    {"jsonrpc":"2.0","id":1,"result":"33"}
    ```

1. To check that the node running, see the [Check the RPC](https://dev.rootstock.io/rsk/node/install/operating-systems/java/#check-the-rpc) section in Using the JAR file.

Now, you have successfully setup a Rootstock node using the Docker image.

### Install the node using Docker containers (Intel Chips)

1. Build the container by running any of the following commands:

    > Note: The type of node to run is dependent on the node's type installed in [install RSKj using Docker](/rsk/node/install/operating-systems/#install-rskj-using-docker-image).

    [](#top "collapsible")
    - Mainnet
        ```
        docker build -t rskj/5.4.0-fingerroot .
        ```
    - Testnet
        ```
        docker build -t rskj/5.4.0-fingerroot .
        ```
    - Regtest
        ```
        docker build -t rskj/5.4.0-fingerroot .
        ```

    When the build finishes, you should see an output similar to this:
    ```shell
      docker build -t rskj/5.4.0-fingerroot . 
      [+] Building 5.9s (15/15) FINISHED                        docker:desktop-linux
       => [internal] load build definition from Dockerfile                      0.0s
       => => transferring dockerfile: 1.97kB                                    0.0s
       => [internal] load .dockerignore                                         0.0s
       => => transferring context: 2B                                           0.0s
       => [internal] load metadata for docker.io/library/openjdk:8-jre-slim-bu  5.9s
       => [internal] load metadata for docker.io/library/openjdk:8-jdk-slim-bu  5.9s
       => [runner 1/5] FROM docker.io/library/openjdk:8-jre-slim-buster@sha256  0.0s
       => [builder 1/5] FROM docker.io/library/openjdk:8-jdk-slim-buster@sha25  0.0s
       => CACHED [runner 2/5] RUN useradd -m rsk                                0.0s
       => CACHED [runner 3/5] WORKDIR /home/rsk                                 0.0s
       => CACHED [builder 2/5] RUN apt-get update -y &&     apt-get install -q  0.0s
       => CACHED [builder 3/5] WORKDIR /code/rskj                               0.0s
       => CACHED [builder 4/5] RUN gitrev=FINGERROOT-5.4.0 &&     git init &&   0.0s
       => CACHED [builder 5/5] RUN gpg --keyserver https://secchannel.rsk.co/S  0.0s
       => CACHED [runner 4/5] COPY --from=builder --chown=rsk:rsk /code/rskj/r  0.0s
       => CACHED [runner 5/5] COPY --from=builder --chown=rsk:rsk /root/.m2/re  0.0s
       => exporting to image                                                    0.0s
       => => exporting layers                                                   0.0s
       => => writing image sha256:e6ef5d147f12c24619b2d0b6f69375476c66f9f7abdf  0.0s
       => => naming to docker.io/rskj/5.4.0-fingerroot                          0.0s
       What's Next?
       1. Sign in to your Docker account → docker login
       2. View a summary of image vulnerabilities and recommendations → docker scout quickview
    ```

    Now you have a container ready to run Rootstock node!

1. To run the container, execute one of the following commands:

    [](#top "collapsible")
    - Mainnet
        ```
        docker run -p 5050:5050 rsksmart/rskj:latest
        ```
        > This will start a Mainnet node. 
    - Testnet
        ```
        docker run -p 50505:50505 rsksmart/rskj:latest --testnet
        ```
    - Regtest
        ```
        docker run rsksmart/rskj:latest --regtest
        ```

### Install the node using Docker containers (M1 Chips)

To install the node using docker containers from Mac M1:

1. Pull `rskj-standalone` docker image and run container from this image with the following command:
    ```
    docker run rsksmart/rskj-standalone
    ``` 
    > Note: You may need to enable experimental features of Docker if your version does not support BuildX plugin by default. To do this, you need to add the `experimental: true` property to your `/etc/docker/daemon.json`. Follwo the instruction in the next step for how to add it.

1. If you have docker desktop:

    1. Click **Settings -> Docker Engine**.
    1. In the center you will see the same json from `daemon.json`, add the property `experimental: true` at the top level of the json.
    1. Click **Apply and Restart**.

1. To build the container, execute any of the following commands:

    > **Note:** The type of node to run is dependent on the node's type installed in[install RSKj using Docker](#install-rskj-using-docker).

    [](#top "collapsible")
    - Mainnet
        ```
        docker buildx build --platform linux/amd64 -t mainnet -f /path/to/Dockerfile /path/to/rskj-node-jar
        ```
    - Testnet
        ```
        docker buildx build --platform linux/amd64 -t testnet -f /path/to/Dockerfile /path/to/rskj-node-jar
        ```
    - Regtest
        ```
        docker buildx build --platform linux/amd64 -t regtest -f /path/to/Dockerfile /path/to/rskj-node-jar
        ```
    When the build finishes, you have a container ready to run Rootstock node.
    
1. Once the restart is complete, run the container by executing any of the following commands:

    [](#top "collapsible")
    - Mainnet
        ```
        docker run -p 5050:5050 rsksmart/rskj:latest
        ```
        > This will start a Mainnet node. 
    - Testnet
        ```
        docker run -p 50505:50505 rsksmart/rskj:latest --testnet
        ```
    - Regtest
        ```
        docker run rsksmart/rskj:latest --regtest
        ```

### Video walkthrough

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/c-YGtE3UIjE?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

> **Note:** RSK's blockchain is stored locally in the container.

1. If you want to save it to a permanent storage, you can use a volume mount while starting the container as shown in the command below:
    ```
    docker run -p 5050:5050 -v /path/to/my/storage:/var/lib/rsk/.rsk rsksmart/rskj:latest
    ```
1. To interact with the node's JSON-RPC endpoint, expose it to the host with the following command:
    ```
    docker run -p 5050:5050 -p 127.0.0.1:4444:4444 rsksmart/rskj:latest
    ```
1. After exposing the endpoint, you  can interact with the node. The following example queries the current block number:
    ```shell
    curl -H "Content-type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","id":1}' http://127.0.0.1:4444/
    ```
1. To provide custom configuration to the node, you can run the command as follows:
    ```
    docker run -p 5050:5050 -v /path/to/my/custom/node.conf:/etc/rsk/node.conf rsksmart/rskj:latest
    ```
