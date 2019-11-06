---
layout: rsk
title: Switch network
---

If you want to switch your node to MainNet, TestNet, or RegTest mode:

1. If necessary (your node is not in localhost), connect your computer to the node using bash. 

```bash
ssh user@server
```

2. Run
#### - For RegTest:
```bash
sudo service rsk stop
cd /etc/rsk
sudo rm -f node.conf
sudo ln -s regtest.conf node.conf
sudo service rsk start
```
Using this network, it allows you to start with some wallets (accounts) on your node. These wallets have funds.


#### - For TestNet:
```bash
sudo service rsk stop
cd /etc/rsk
sudo rm -f node.conf
sudo ln -s testnet.conf node.conf
sudo service rsk start
```

#### - For MainNet
```bash
sudo service rsk stop
cd /etc/rsk
sudo rm -f node.conf
sudo ln -s mainnet.conf node.conf
sudo service rsk start
```
Running these instructions in bash, you are:
- Stopping RSK service in Azure, 
- Moving to RSK configuration folder (`cd`). 
- Removing `node.conf`, that is a symbolic link to the configuration you're using (`rm` deletes it).
- Linking `node.conf` with the configuration file you decide (`ls` with the `-s` option, it makes symbolic -or _soft_- links). The node is configured to read directly from the `node.conf` link.
- Restarting the service.
