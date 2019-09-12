---
layout: rsk
title: Setup node on Java
---

## Install the node using RskJ Fat (or Uber) JAR

The Fat JAR or Uber JAR can be [downloaded](https://github.com/rsksmart/rskj/releases) or compiled (in a [reproducible way](https://github.com/rsksmart/rskj/wiki/Reproducible-Build) or [not](https://github.com/rsksmart/rskj/wiki/Compile-and-run-a-RSK-node-locally)).

Once you have the JAR, you should install [Java 8 JDK](https://www.java.com/es/download/).

To run the node:
```bash
$ java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start 
```

Replace `<PATH-TO-THE-RSKJ-FATJAR>` with your path to the jar file. As an example: `C:/RskjCode/rskj-core-1.0.2-WASABI-all.jar`

## Check everything's working with an RPC call

If you see no output, then it means the node is running. To check, you can open a new console tab (it's important you don't close this one or interrupt the process) and issue a request to the node's RPC HTTP server. This is an example using cURL:

```bash
$ curl localhost:4444 -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

The response should be something like `{"jsonrpc":"2.0","id":1,"result":"0xfc0"}`, where the `result` property is the number of the latest block you've synced so far (in hexadecimal).



## Switching networks
If you want to change the network use these commands:
- MainNet: `java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start`
- TestNet: `java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start --testnet`
- RegTest: `java -cp <PATH-TO-THE-RSKJ-FATJAR> co.rsk.Start --regtest`

Replace `<PATH-TO-THE-RSKJ-FATJAR>` with your path to the jar file. As an example: `C:/RskjCode/rskj-core-1.0.2-WASABI-all.jar`