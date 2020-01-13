---
layout: rsk
title: Swarm Incentives
---

File sharing systems heavily rely on users distributing files to others willingly. But strictly speaking, a user could choose to download a file and consume resources without uploading in return.

Incentivization is of major importance for such systems. Why? Think for a second about whether you would like to have your laptop connected, and storing and serving file chunks from your hard-drive 24/7. No? Well, probably you are not the only one.

Ask yourself another question: what would make you willing to serve chunks and contribute to a healthy network?

## Swarm Incentives

Swarm defines the _Swarm Accounting Protocol_ (**SWAP**), which is a tit-for-tat system where nodes account how much data they request and serve.

Basically, this means that if a node requests a million chunks from another, it will serve one million chunks in return.

However, there is a problem with this in a network of file storage. We expect a variability in network usage (a node might stream a video for 2 hours, but then be idle for the upcoming 4 hours) as well as differences in capabilities of nodes (a phone won’t be able to serve many chunks, whereas a server can).

SWAP allows nodes to keep track of their balances, so that if a node requests many more chunks from another than what it serves, this will cause it to issue a payment through a second-layer payment solution.

## SWAP

![The SWAP mechanism](/assets/img/rif-storage/swap-mechanism.gif)

<p style="text-align:center;"><sub>The SWAP mechanism shown here, where nodes send and receive chunks from each other and the balance is settled once the chunk-o-meter tilts too much to one side.</sub></p>

While simple in design, such a concept is powerful in a decentralized network. As illustrated by the rise of Bitcoin and cryptocurrencies, incentives—when well structured—can nudge nodes to behave in certain manners desirable for the health of the network.

In this case, we expect nodes driven by profit to join the network and serve the most desired chunks from high-throughput servers, which will make the network more robust, faster and more difficult to take down.

> Based on the blog post "[RIF Storage: The First Chunks](https://www.rifos.org/blog/rif-storage-the-first-chunks/)", by Vojtěch Šimetka & Rinke Hendriksen.
