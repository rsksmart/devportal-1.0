---
menu_order: 400
menu_title: Troubleshooting
layout: rsk
title: Troubleshooting and Common Errors
description: RIF Rollup is a trustless protocol for fast and scalable low-cost payments on Rootstock powered by zkRollup Technology.
tags: rif, aggregation, zksync, rollup, troubleshooting
render_features: 'collapsible'
---

You may encounter the following errors when trying out the application:

[](#top "collapsible")
- **Error: "Failed to ChangePubKey authorized by ECDSA.: Account does not exist in the Rollup network"**.
    > - Problem: Happens when trying to unlock RIF Rollup Account. Following the steps described above, and using a random mnemonic the code is always falling here. When this "if" is removed, the server throws the above error.
    > - Possible Fix: In order to be able to perform this activation, the mentioned syncWallet should be previously activated. Do this by creating a random mnemonic, send some funds from a wallet with funds and then execute this code snippet.
