---
title: 'RSKj for Developers'
description: 'Setup your dev environment and build dApps faster using this quick start guide'
tags: knowledge-base, rskj, rsk, node, blockchain, developers, wallets
layout: 'rsk'
---

## Who needs to develop using RSKj?

If you are developing smart contracts, developing DApps, or participating in a hackathon, you are likely to want to iterate fast, and therefore need quicker feedback loops.

Running RSKj in Regtest mode is the best fit for these needs.

## Steps

### Install Java

- The RSKj executable is a JAR file, and requires Java to run.
- Install the [Java 8 JDK](https://www.java.com/download/).
  
### Download RSKj JAR

- Navigate to [RSKj's releases page](https://github.com/rsksmart/rskj/releases)
- From the **latest** release, download a file whose name looks like
  `rskj-core-*.jar`, where `*` is replaced by the release tag name, for example `3.0.0-IRIS`.
  
### Run RSKj

```shell
java -cp ${JAR} co.rsk.Start \
  --regtest \
  --reset \
  -Drpc.providers.web.cors=* \
  -Dminer.client.autoMine=true \
  co.rsk.Start
```

- The above command runs RSKj connected to Regtest, which is a `localhost`-only network, clears the database each time the node is started,
and enables both CORS and `autoMine` (which makes it behave similar to ganache).
- These are the most useful and commonly used flags and options for when you are developing or testing smart contracts and DApps.
  
## Advanced

### Developer Tools

- [Configuring Truffle for RSK](/kb/configure-truffle-to-rsk/)

## Debugging

- [How to debug transactions in an RSK network?](https://stackoverflow.com/q/66144175/194982)

### RPC

[Remote procedure calls (JSON-RPC)](/rsk/node/architecture/json-rpc/) are the primary interface through which RSK nodes communicate over the network.

JSON-RPC is available over two network transport protocols: **HTTP** and **WebSockets**

- [Configuring and using RPC over HTTP](/rsk/node/architecture/json-rpc/)
- [Configuring and using RPC over WebSockets](/rsk/node/architecture/json-rpc/)

> Note that [RSK public nodes](/rsk/node/architecture/json-rpc/) do not expose WebSockets, they are HTTP only. To work around this, you may either run your own RSK node, or use a third-party node provider, such as [Getblock](/solutions/getblock/).