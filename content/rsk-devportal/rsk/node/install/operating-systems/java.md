---
layout: rsk
title: Setup node on Java
tags: java, install, rsk, rskj, node, how-to, network, requirements, mainnet, jar
menu_order: 4
render_features: 'custom-terminals'
---

Make sure your system meets the [minimum requirements](/rsk/node/install/requirements/) before installing RSK nodes on it.

You also need to install [Java 8 JDK](https://www.java.com/download/).

#### For Mac M1 / M2 (Apple Chips)

In order to run RSKj on Apple M1/M2 machines using x86 based software, make sure to have `Rosetta` installed in your device (it should be pre-installed by default on recent versions of macOS). Also you'd need an x86 JDK build. A suggestion could be [Azul Zulu 11 (x86)](https://www.azul.com/downloads/?version=java-11-lts&os=macos&package=jdk)

## Install the node using a JAR file

The Fat JAR or Uber JAR can be [downloaded](https://github.com/rsksmart/rskj/releases) or compiled (in a [reproducible way](https://github.com/rsksmart/rskj/wiki/Reproducible-Build) or [not](/rsk/node/contribute)).

Create the directory for the node:

```jsx
mkdir rskj-node-jar
cd ~/rskj-node-jar
```

Move or copy the just downloaded jar file to the directory

```jsx
mv ~/Downloads/rskj-core-5.3.0-FINGERROOT-all.jar SHA256SUMS.asc /Users/{user}/rskj-node-jar/
```

Create another directory inside `~/rskj-node-jar/config`

```jsx
mkdir config
```

- Download this config file: [https://github.com/rsksmart/rif-relay/blob/develop/docker/node.conf](https://github.com/rsksmart/rif-relay/blob/develop/docker/node.conf)
- Copy or move the `node.conf` file just downloaded into the config directory
- CD into the folder containing the jar file

### To run the node:

[](#top "multiple-terminals")
- Linux, Mac OSX
  ```shell
  $ java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
  ```
- Windows
  ```windows-command-prompt
  C:\> java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
  ```

Replace `<PATH-TO-THE-RSKJ-JAR>` with your path to the JAR file. As an example: `C:/RskjCode/rskj-core-5.3.0-FINGERROOT-all.jar`

## Using import sync

> Note: This feature is optional.

> Note: This feature, first released as part of RSKj v2.0.1, is currently experimental.

If you don't want to synchronize your node in the default way,
you can use the import sync feature.
This method imports a synchronized database from a trusted origin
in a fraction of the time currently required.

Use this command to run the node:

[](#top "multiple-terminals")
- Linux, Mac OSX
  ```shell
  $ java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
  ```
- Windows
  ```windows-command-prompt
  C:\> java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
  ```

If your hardware meets the
[minimum hardware requirements](/rsk/node/install/requirements/),
but you get a memory error during the process,
please consider adding the following flag to the command
to change the memory allocated to the process:

[](#top "multiple-terminals")
- Linux, Mac OSX
  ```shell
  $ java -Xmx4G -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
  ```
- Windows
  ```windows-command-prompt
  C:\> java -Xmx4G -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
  ```

Replace `<PATH-TO-THE-RSKJ-JAR>` with your path to the JAR file. As an example: `C:/RskjCode/rskj-core-5.3.0-FINGERROOT-all.jar`

For further reference, check out the
[`database.import` configuration setting](/rsk/node/configure/reference/#databaseimport).

## Check the RPC

If you see no output, it means that the node is running. To confirm, you can open a new console tab (it is important you do not close this tab or interrupt the process) and issue a request to the node's RPC HTTP server. This is an example using cURL:


[](#top "multiple-terminals")
- Linux, Mac OSX
  ```shell
  $ curl http://localhost:4444 \  -s \   -X POST \    -H "Content-Type: application/json" \     --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
  ```
- Windows
  ```windows-command-prompt
    C:\> curl http://localhost:4444 \   -s \   -X POST \   -H "Content-Type: application/json" \    --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
  ```

It should output a response like this:

```shell
{"jsonrpc":"2.0","id":67,"result":"RskJ/5.3.0/Mac OS X/Java1.8/FINGERROOT-202f1c5"}
```

Check the blockNumber:

[](#top "multiple-terminals")
- Linux, Mac OSX
  ```shell
  $ curl -X POST http://localhost:4444/ \ -H "Content-Type: application/json" \ --data '{"jsonrpc":"2.0", "method":"eth_blockNumber","params":[],"id":1}'
  ```
- Windows
  ```windows-command-prompt
    C:\> curl -X POST http://localhost:4444/ \ -H "Content-Type: application/json" \ --data '{"jsonrpc":"2.0", "method":"eth_blockNumber","params":[],"id":1}'
  ```

You should see the below output:

```jsx
{"jsonrpc":"2.0","id":1,"result":"0x0"}
```

Now, you have successfully setup a Rootstock node using the jar file.

... where the `result` property is the number of the latest block that has been synced (in hexadecimal).

## Switching networks

If you want to change the network use these commands:

- Mainnet: `java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start`
- Testnet: `java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start --testnet`
- Regtest: `java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start --regtest`

Replace `<PATH-TO-THE-RSKJ-FATJAR>` with your path to the jar file. As an example: `C:/RskjCode/rskj-core-5.3.0-FINGERROOT-all.jar`

## Video

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/TxpS6WhxUiU?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
