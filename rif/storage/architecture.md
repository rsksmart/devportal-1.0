---
layout: rsk
title: storage/architecture
---

RIF Storage consist of 3 disting layers (from the top to the bottom as shown in the figure below):

- [User facing layer](#user-facing-layer)
- [Developer facing layer](#developer-facing-layer)
- [Storage layer](#storage-layer)

![](/assets/img/rif-storage/architecture.png)

## User facing layer

The **user facing layer** contains services that are using the RIF Storage protocol and libraries. As we are focused on building the infrastructure layers, this layer will contain mostly 3rd party solutions. However, we are building 3 services that we see are necessary for success of the platform:

- **RIF Storage Gateways** allows users to interact with RIF Storage for a small fee, without the need of an operating node while allowing gateway operators to profit. This is a service open to 3rd parties to operate.
- The **Pinning service** gives any storage provider the oportunity to guarantee persistance of files and be rewarded for the service. Pinning services will be listen on [RIF Marketplace](/rif/marketplace).
- Node operators can use **Node manager** to monitor their storage instances and understand the utilization of their service.

## Developer facing layer

We are providing dApp developers a unified API allowing them to seamlessly utilize any of the supported storage providers or even switch on the go. The [RIF Storage JS](/storage/libraries/javascript) library allows easy integration in any web dApp or Node.js project.

## Storage layer

RIF Storage is building on top of existing storage providers bringing the discinct benefits of each solution to offer wide range of usecases. We are working with these project sharing our improvements back to the original code. Our main focus is to increase the resilience against attacks and stability of the solution by adding incentives. Currently we are integrated with Swarm and IPFS.
