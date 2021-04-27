---
layout: rsk
title: RIF Notifier
tags: rif, notifier
---

## About RIF Notifier

 **RIF Notifier** is a software service that listens to events on the rsk blockchain and notifies its subscribers.  RIF Notifier sends notifications to active subscribers for the following events in rsk blockchain

- Contract events
- New Transactions
- New Blocks

 RIF Notifier also sends notifications to Lumino clients for following events in the rsk blockchain for registered Lumino tokens.

- ChannelOpened
- ChannelClosed

RIF Notifier offers the following notification methods to its subscribers.  These notification methods are subject to availability at the given RIF notifier provider.

- SMS
- EMAIL
- API

RIF Notifier at its core serves as an interface between the rsk blockchain and the external world. Multiple provider nodes can provide notification services and these provider nodes can be registered with **RIF Marketplace** so end users can create subscription.

Any events in the blockchain are instantly communicated to the users via their requested preferences. RIF Notifier users can also get a list on RNS `addrChanged` events and `chainAddrChanged` events from multi chain contract.
