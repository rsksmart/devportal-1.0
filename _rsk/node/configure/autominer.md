---
layout: rsk
title: Run with autominer (Ganache-like)
tags: rsk, rskj, node, config
description: "Run the RSK node with autominer - simmilar to Ganache default config"
---

Ganahce local network runs like what RSK calls _autominer_ mode:
- Creates blocks when new transactions are sent to the node
- Will not create blocks if no transactions are sent
- Allows to mine blocks manually via RPC
- (optionally) Delete the databse on restart

To configure the node we are going to
1. Run it in `--regtest` mode
2. Use a custom config to activate the autominer

The configuration we need to use is

```
miner.client.autoMine = true
```

Create a `autominer.conf` file in the root of the repo (or other dir., remember to use the correct path afterwards)

This option can be activate when using the node in different modes

### Setup autominer on IntelliJ

On top of the default configuration (Java version and main class), we will need to add

- Program arguments: `--regtest` and optionally `--reset` for database reset on restart
- VM options: `-Drsk.conf.file=./autominer.conf` (or the path you chose)

It should look like this

![autominer_inellij_config](/assets/img/rsk/autominer_intellij_config.png)

### Setup autominer on CLI

For example, if you are running with JAR, use the command

```
java -cp rskj-core-4.1.0-HOP-all.jar -Drsk.conf.file=./autominer.conf co.rsk.Start --regtest --reset
```

## Result

Now you have an RSK node running locally! It will create blocks only for new transactions, or arbitrarily by using the `evm_mine` RPC call.

As a result you should be able to do this

![autominer_demo](/assets/img/rsk/autominer_demo.mov)
