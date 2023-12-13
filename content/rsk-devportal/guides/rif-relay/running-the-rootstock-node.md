---
menu_order: 300
menu_title: Running the Rootstock node
layout: rsk
title: How to Run the Rootstock node
tags: rif, envelope, relay, user, guide, rootstock, node
permalink: /guides/rif-relay/run-rootstock-node/
---

This guide provides detailed instructions on how to set up a Rootstock node using two different methods: a `JAR file` and `Docker`. Each method is detailed with specific instructions, ensuring users can choose the approach that best suits their needs and technical capabilities. 

### Using the JAR file

For details on how to run the Rootstock node using the [JAR file](https://github.com/rsksmart/rskj/releases), see the instructions for how to **[Install the node using a JAR file](https://dev.rootstock.io/rsk/node/install/operating-systems/java/).**

1. Create the directory for the node.
   ```jsx
   mkdir rskj-node-jar
   cd ~/rskj-node-jar
   ```
1. Move or copy the just downloaded jar file to the directory.
   ```jsx
   mv ~/Downloads/rskj-core-5.3.0-FINGERROOT-all.jar SHA256SUMS.asc /Users/{user}/rskj-node-jar/
   ```
1. Create another directory inside `~/rskj-node-jar/config`
   ```jsx
   mkdir config
   ```
1. Download this config file: [https://github.com/rsksmart/rif-relay/blob/develop/docker/node.conf](https://github.com/rsksmart/rif-relay/blob/develop/docker/node.conf)
1. Copy or move the `node.conf` file just downloaded into the config directory
1. In the folder containing the jar file, run the following command in the terminal:
   ```bash
   arch -x86_64 /usr/local/opt/openjdk@8/bin/java -Drsk.conf.file=./config/node.conf -cp ./rskj-core-5.3.0-FINGERROOT-all.jar co.rsk.Start --regtest
   ```
   OR
   ```jsx
   java -Drsk.conf.file=./config/node.conf \
   cp ./<PATH-TO-JAR-FILE> co.rsk.Start \
   -regtest
   ```
   Leave the terminal running.
1. Check that the node is running by running the command below in the terminal:
   ```jsx
   curl http://localhost:4444 \
    -s \
    -X POST \
    -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
   ```
   It should output a response like this:
   ```jsx
   {"jsonrpc":"2.0","id":67,"result":"RskJ/5.3.0/Mac OS X/Java1.8/FINGERROOT-202f1c5"}
   ```
1. Check the blockNumber
   ```jsx
   curl -X POST http://localhost:4444/ \
   -H "Content-Type: application/json" \
   --data '{"jsonrpc":"2.0", "method":"eth_blockNumber","params":[],"id":1}'
   ```
   You should see the below output:
   ```jsx
   {"jsonrpc":"2.0","id":1,"result":"0x0"}
   ```
Now, you have successfully setup a Rootstock node using the jar file.

### Using Docker

Follow the instructions in [How to setup a Rootstock node using Docker](https://dev.rootstock.io/rsk/node/install/operating-systems/).
    
In this guide, we will run the node using the **[Dockerfile.RegTest](https://github.com/rsksmart/artifacts/blob/master/Dockerfiles/RSK-Node/Dockerfile.RegTest).** This means a node connected to a private `RegTest` network.
    
Note that If you get the error:
    
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
    

To run the RegTest node, you should execute:

Pull the RSKj Docker Image

```jsx
docker pull rsksmart/rskj
```

Run the Node

```jsx
docker run -d --name rsk-node -p 4444:4444 -p 50505:50505 rsksmart/rskj node --regtest
```

If successful, the node should be running.

Interacting with the Node

```jsx
curl -X POST -H "Content-Type: application/json" --data "{\"jsonrpc\":\"2.0\",\"method\":\"net_version\",\"params\":[],\"id\":1}" http://127.0.0.1:4444
```

---

---

You should see the below output:

```bash
{"jsonrpc":"2.0","id":1,"result":"33"}
```

To check that the node running, see section on Using the JAR file

Now, you have successfully setup a Rootstock node using the docker image.
