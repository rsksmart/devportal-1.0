---
layout: rsk
title: Setup node using Java
tags: java, install, rsk, rskj, node, how-to, network, requirements, mainnet, jar
menu_order: 4
render_features: 'custom-terminals collapsible' 
---

To setup a Rootstock node using Java, you need to:

- Ensure your system meets the [minimum requirements](/rsk/node/install/requirements/) for installing the Rootstock node.
- Install [Java 8 JDK](https://www.java.com/download/).
Additinally for Mac M1 / M2 (Apple Chips) using x86 based software:
- Ensure you have `Rosetta` installed. This is typically pre-installed on recent macOS versions.
- Download an x86 JDK build, such as [Azul Zulu 11 (x86)](https://www.azul.com/downloads/?version=java-11-lts&os=macos&package=jdk), to ensure compatibility with x86 based software.

### Install the node using a JAR file

[](#top "collapsible")
- Download and Setup
    1. **Download the JAR**: Download the Fat JAR or Uber JAR from [RSKj releases](https://github.com/rsksmart/rskj/releases), or compile it [reproducibly](https://github.com/rsksmart/rskj/wiki/Reproducible-Build) or [otherwise](/rsk/node/contribute).
    1. **Create Directory**: Create a directory for the node.
        ```jsx
        mkdir rskj-node-jar
        cd ~/rskj-node-jar
        ```
    1. **Move the JAR**: Move or copy the just downloaded jar file to your directory.
        ```jsx
        mv ~/Downloads/rskj-core-5.4.0-FINGERROOT-all.jar SHA256SUMS.asc /Users/{user}/rskj-node-jar/
        ```
- Configuration
    1. **Create Config Directory**: Create another directory inside `~/rskj-node-jar/config`
        ```jsx
        mkdir config
        ```
    1. **Download Config File**: Get `node.conf` from [here](https://github.com/rsksmart/rif-relay/blob/main/docker/node.conf).
    1. **Move Config File**: Move the `node.conf` file to the `config` directory.
- Run the Node
    [](#top "multiple-terminals")
    - Linux, Mac OSX
        ```shell
        java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
        ```
    - Windows
        ```windows-command-prompt
        java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
        ```
        > Replace `<PATH-TO-THE-RSKJ-JAR>` with the actual path to your JAR file. For example, `C:/RskjCode/rskj-core-5.4.0-FINGERROOT-all.jar`.

### Using Import Sync

> **Note**: This is an optional, experimental feature first introduced in RSKj v2.0.1.

Instead of the default synchronization, you can use import sync to import a pre-synchronized database from a trusted origin, which is significantly faster.

**Running Node with Import Sync:**


[](#top "multiple-terminals")
- Linux, Mac OSX
    ```shell
    java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
    ```
- Windows
    ```windows-command-prompt
    java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
    ```

> **Memory Issues?** If you encounter memory errors and meet the [minimum hardware requirements](/rsk/node/install/requirements/), consider using `-Xmx4G` flag to allocate more memory as shown below:

[](#top "multiple-terminals")
- Linux, Mac OSX
    ```shell
    $ java -Xmx4G -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
    ```
- Windows
    ```windows-command-prompt
    C:\> java -Xmx4G -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
    ```

    > Replace `<PATH-TO-THE-RSKJ-JAR>` with your JAR file path. For configuration details, see [`database.import` setting](/rsk/node/configure/reference/#databaseimport).

### Check the RPC

If you don't get any output after starting the node, then it's running correctly. To confirm, open a new console tab (it is important you do not close this tab or interrupt the process) and test the node's RPC server.

- Run the following sample cURL request:

    [](#top "multiple-terminals")
    - Linux, Mac OSX
        ```shell
        curl http://localhost:4444 -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
        ```
    - Windows
        ```windows-command-prompt
        curl http://localhost:4444 -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
        ```

        Expect a response like:
        ```shell
        {"jsonrpc":"2.0","id":67,"result":"RskJ/5.4.0/Mac OS X/Java1.8/FINGERROOT-202f1c5"}
        ```

- To check the block number:

    [](#top "multiple-terminals")
    - Linux, Mac OSX
        ```shell
        curl -X POST http://localhost:4444/ -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"eth_blockNumber","params":[],"id":1}'
        ```
    - Windows
        ```windows-command-prompt
        curl -X POST http://localhost:4444/ -H "Content-Type: application/json" --data '{"jsonrpc":"2.0", "method":"eth_blockNumber","params":[],"id":1}'
        ```

        Output:
        ```jsx
        {"jsonrpc":"2.0","id":1,"result":"0x0"}
        ```

Now, you have successfully setup a Rootstock node using the jar file.
The `result` property represents the latest synced block in hexadecimal.

### Switching networks

To change networks on the RSKj node, use the following commands:

[](#top "collapsible")
- Mainnet
    ```
    java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start
    ```
- Testnet
    ```
    java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start --testnet
    ```
- Regtest
    ```
    java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start --regtest
    ```

> Replace `<PATH-TO-THE-RSKJ-FATJAR>` with the actual path to your jar file. For example: `C:/RskjCode/rskj-core-5.4.0-FINGERROOT-all.jar`.

### Video walkthrough

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/TxpS6WhxUiU?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
