---
layout: rsk
title: How to update
menu_title: Rootstock Node Updates
menu_order: 2
tags: rsk, rskj, node, update, version, rootstock
description: "How to update RSKj, the Rootstock node, to a newer version, and verify that it works correctly. Also sign up for updates to get notified when there is a new version released."
---

## 1. Download rskj

Download the latest release from the [Github repo](https://github.com/rsksmart/rskj/releases).

## 2. Update jar file

Note that `PREVIOUS` and `NEW` refer to version numbers.

```bash
cd /usr/share/rsk
sudo service rsk stop
sudo mv rsk.jar rsk-PREVIOUS.jar
sudo mv rskj-core-NEW-all.jar rsk.jar
```

## 3. Clean up log directory

This step is optional.

```bash
sudo mkdir /var/log/rsk/PREVIOUS/
sudo mv /var/log/rsk/rsk* /var/log/rsk/PREVIOUS/
sudo service rsk start
```

## 4. Validate service is running normally

Check logs:

```bash
tail -f /var/log/rsk/rsk.log
```

Check that Blockchain is moving forward, and adding blocks:

```bash
curl -s -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber", "params": {},  "id":123}' http://127.0.0.1:4444 | jq .result | tr -d '"' | awk '{print "printf \"%d\\n\" "$0}' | sh
```

If you run this command a few times and the block number is increasing,
it means it is syncing correctly too.
