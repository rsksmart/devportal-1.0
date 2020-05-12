---
layout: rsk
title: Setup node on Java
collection_order: 2324
---

Make sure your system meets the [minimum requirements](../requirements/) before installing RSK nodes on it.

You also need to install [Java 8 JDK](https://www.java.com/download/).

## Install the node using a JAR file

The Fat JAR or Uber JAR can be [downloaded](https://github.com/rsksmart/rskj/releases) or compiled (in a [reproducible way](https://github.com/rsksmart/rskj/wiki/Reproducible-Build) or [not](/rsk/node/contribute)).

To run the node:
```bash
$ java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
```

Replace `<PATH-TO-THE-RSKJ-JAR>` with your path to the JAR file. As an example: `C:/RskjCode/rskj-core-2.0.1-PAPYRUS-all.jar`

## OPTIONAL: Using experimental import sync

If you don't want to syncronize your node in the regular way, you can use the import sync. This method imports a synchronized dabase from a trusted origin in a fraction of the time currently required.

Use this command to run the node:

```bash
$ java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
```

If your hardware meets the minimum RAM memory requirement or you get a memory error during the process, please consider adding the following flag to the command:

```bash
$ java -Xmx4G -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --import
```

Replace `<PATH-TO-THE-RSKJ-JAR>` with your path to the JAR file. As an example: `C:/RskjCode/rskj-core-2.0.1-PAPYRUS-all.jar`

## Check the RPC

If you see no output, it means that the node is running. To check, you can open a new console tab (it is important you do not close this one or interrupt the process) and issue a request to the node's RPC HTTP server. This is an example using cURL:

```bash
$ curl localhost:4444/1.1.0/ -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

The response should look similar to `{"jsonrpc":"2.0","id":1,"result":"0xfc0"}`, where the `result` property is the number of the latest block that has been synced (in hexadecimal).

## Switching networks

If you want to change the network use these commands:

- Mainnet: `java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start`
- Testnet: `java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start --testnet`
- Regtest: `java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start --regtest`

Replace `<PATH-TO-THE-RSKJ-FATJAR>` with your path to the jar file. As an example: `C:/RskjCode/rskj-core-2.0.1-PAPYRUS-all.jar`

## Video

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/TxpS6WhxUiU?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
