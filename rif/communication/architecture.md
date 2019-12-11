---
layout: rsk
title: Architecture
---

RIF Communication consist of 3 distinct layers (from the top to the bottom as shown in the figure below):

- User facing layer
- Developer facing layer
- Routing network layer

![](/assets/img/rif-communication/architecture.png)
Let's discuss a each layer in greater detail.

## User facing layer

The **user facing layer** contains services that are using the RIF Communication protocol and libraries. This layer will contain mostly 3rd party solutions as we are focused on building the infrastructure layers. However, we are building 3 services that we see as necessary for the success of the platform.

- **RIF Communication Gateways** allows users, for a small fee, to interact with RIF Communication network without the need of operating node while allowing gateway operators to profit. This is a service open to 3rd parties to operate and has some privacy caveats.
- The **Mailbox service** gives users to receive messages even if they are not online. It is similar to real world mailbox service and as such it also has privacy trade-offs. Mailbox services will be listed on [RIF Marketplace](/rif/marketplace).
- Node operators can use **Node manager** to monitor their communication instances and understand the utilization of their service.

## Developer facing layer

We are building an easy to use set of libraries and SDKs for dApp developers to integrate RIF communication into their dApps.

## Routing network layer

RIF Communication is a network of peer to peer nodes that are using kademlia routing to forward messages.
