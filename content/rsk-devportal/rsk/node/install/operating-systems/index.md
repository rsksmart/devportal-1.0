---
section_title: Operating Systems
menu_order: 4
menu_title: Setup node on Docker
layout: rsk
title: How to setup an RSK node on Docker
tags: docker, desktop, macOS, rskj, windows, install, rsk, node, how-to, network, requirements, mainnet, testnet, regtest
render_features: 'collapsible'
---

Before installing Docker, ensure your system meets the [minimum requirements](/rsk/node/install/requirements/) before installing the RSK node.

### Install Docker Desktop Client

[Docker Desktop](https://www.docker.com/products/docker-desktop/) provides an easy and fast way for running containerized applications on various operating systems.

[](#top "collapsible")
- Mac OSX and Windows
    - [Download](https://www.docker.com/products/docker-desktop) and install
    - Start the Docker Desktop client
    - Login with a Docker Hub free account
- Linux
    - Install [Docker Engine Community](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
    - Note that you will need to use `sudo` for all docker commands, by default. To avoid this [additional steps](https://docs.docker.com/install/linux/linux-postinstall/) are required.

Ensure that docker is running by running the following command - it should run without any errors.

```shell
docker ps
```

You can find more information about Docker install [here](https://docs.docker.com/install/).

### Install RSKj Using Docker
To install an Rootstock node using Docker:

1. Download the RSKj Dockerfiles and `supervisord.conf` from the [artifacts repo](https://github.com/rsksmart/reproducible-builds/tree/master/rskj/6.0.0-arrowhead) or pull the image from [Docker Hub](https://hub.docker.com/r/rsksmart/rskj).

    In the artifacts repo, select which ***type of*** node you want to install:
      * A node connected to the public RSK Mainnet: `Dockerfile.MainNet`
      * A node connected to the public RSK Testnet: `Dockerfile.TestNet`
      * A node connected to a private RegTest network: `Dockerfile.RegTest`

    > **Note:** If you get the following error:
      
    ```jsx
      => ERROR [6/6] COPY supervisord.conf /etc/supervisor/conf.d/supervisord.  0.0s
      ------
        > [6/6] COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf:
          ------
            failed to compute cache key: "/supervisord.conf" not found: not found
    ```     
    Ensure that supervisord.conf is in the same folder as the dockerfile.
      
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
    Now you have a container ready to run Rootstock!
    
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
    You should see the below output:

    ```bash
    {"jsonrpc":"2.0","id":1,"result":"33"}
    ```
1. To check that the node running, see the [Check the RPC](https://dev.rootstock.io/rsk/node/install/operating-systems/java/#check-the-rpc) section in Using the JAR file.

Now, you have successfully setup a Rootstock node using the docker image.

### Install the node using Docker containers (Intel Chips)

1. Build the container by running any of the following commands:

    > Note: The type of node to run is dependent on the node's type installed in [install RSKj using Docker](#install-rskj-using-docker).

    [](#top "collapsible")
    - Mainnet
        ```
        docker build -t mainnet -f Dockerfile.MainNet .
        ```
    - Testnet
        ```
        docker build -t testnet -f Dockerfile.TestNet .
        ```
    - Regtest
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
    *It's possible that you may need to enable experimental features of Docker if your version does not support BuildX plugin by default. In order to enable experimental features:*

1. Update `/etc/docker/daemon.json` to add the property `experimental: true`.

1. If you have docker desktop:

    1. Click **Settings -> Docker Engine**.
    1. In the center you will see the same json from `daemon.json`, add the property `experimental: true` at the top level of the json.
    1. Click **Apply and Restart**.

1. To build the containe, execute any of the following commands:

    > **Note:** The type of node to run is dependent on the node's type installed in[install RSKj using Docker](#install-rskj-using-docker).

    [](#top "collapsible")
    - Mainnet
        ```
        docker buildx build --platform linux/amd64 -t mainnet -f Dockerfile.MainNet .
        ```
    - Testnet
        ```
        docker buildx build --platform linux/amd64 -t testnet -f Dockerfile.TestNet .
        ```
    - Regtest
        ```
        docker buildx build --platform linux/amd64 -t regtest -f Dockerfile.RegTest .
        ```
    When the build finishes, you have a container ready to run RSK.
    
1. To run the container, execute any of the following commands:

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

## Video

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
1. Then, you could, for example, query the current block number with:
    ```shell
    curl -H "Content-type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber","id":1}' http://127.0.0.1:4444/
    ```
1. Finally, you can provide a custom configuration to the node with:
    ```
    docker run -p 5050:5050 -v /path/to/my/custom/node.conf:/etc/rsk/node.conf rsksmart/rskj:latest
    ```
