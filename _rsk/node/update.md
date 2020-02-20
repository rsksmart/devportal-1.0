---
layout: rsk
title: RSK Node Updates
tags: rsk, rskj, node, update, version
description: "How update RskJ, the RSK node, to a newer version, and verify that it works correctly. Also sign up for updates to get notified when there is a new version released."
---


Sign up for our RSK Node update notifications. We will use your email only for the purpose of keeping your application connected to the most up to date version of the node.

<!-- Begin Mailchimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/slim-10_7.css" rel="stylesheet" type="text/css">
<style>#mc_embed_signup form { padding: 0; }</style>
<div id="mc_embed_signup">
<form action="https://rifos.us15.list-manage.com/subscribe/post?u=f52247d792ffe22c6f7be1379&amp;id=bb20694a36" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
	<label for="mce-EMAIL">RSK Node Updates?</label>
	<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_f52247d792ffe22c6f7be1379_bb20694a36" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button rounded"></div>
    </div>
</form>
</div>
<!--End mc_embed_signup-->

# How to update

## 1. Download rskj 
Download the latest release from the [Github repo](https://github.com/rsksmart/rskj/releases).

## 2. Update jar file 

```
cd /usr/share/rsk
sudo service rsk stop
sudo mv rsk.jar rsk-PREVIOUS.jar
sudo mv rskj-core-NEW-all.jar rsk.jar
```

## 3. Clean up log dir (OPTIONAL)

```
sudo mkdir /var/log/rsk/PREVOUS/
sudo mv /var/log/rsk/rsk* /var/log/rsk/PREVOUS/
sudo service rsk start
```

## 4. Validate service is running normally
Check logs:

```
tail -f /var/log/rsk/rsk.log
```

Blockchain is moving forward adding blocks:
```
curl -s -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_blockNumber", "params": {},  "id":123}' http://127.0.0.1:4444 | jq .result | tr -d '"' | awk '{print "printf \"%d\\n\" "$0}' | sh
```
If you run this command a few times and the block number is increasing means it's syncing correctly too.
