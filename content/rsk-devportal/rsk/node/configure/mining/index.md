---
layout: rsk
section_title: Mining
menu_title: For mining
title: How to Configure RSKj node for mining | Rootstock (RSK)
tags: rsk, rskj, node, config, mining
description: "How to run RSKj in a manner suited for mining."
menu_order: 500
---

In the previous steps we launched a single node. However the default configuration is **not** suitable for mining. Mining is needed in order to publish contracts so let's configure our node to mine.
A sample configuration for mining is [miner1.conf](/assets/files/mining-config/miner1.conf).

In IntelliJ IDEA, copy the existing *RSK* configuration and add the *VM options* for the miner node:

![img](/assets/img/rsk/howToInstallAndRun/Miner1Conf.png)

With the Run button, you're running your first miner node!

## Running miners

To setup more mining nodes two more configurations are here: ([miner2.conf](/assets/files/mining-config/miner2.conf) and [miner3.conf](/assets/files/mining-config/miner3.conf)).

We now have three configurations for different miners.
Now for the fun part, let's run a local RSK network!
Go to *Run configuration* button again and start all the miners configurations one after the other.

Congratulations! you're running a local RSK mining node!

> Checkout how to run the [RSK node with autominer](/rsk/node/configure/autominer/)