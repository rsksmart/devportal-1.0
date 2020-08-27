---
layout: rsk
title: RIF Storage Pinning service
---

## RIF Storage Pinning service
The RIF Storage Pinning service, found in the RIF Marketplace, is a place where the demand for storing data meets with offers of parties that want to land their free disk space in monetary exchange. The main goal is to provide a registry where storage Provides can announce their empty storage and conditions under which they are willing to offer it to 3rd parties. The Consumers can enter into service agreement with a given Provider, lending their storage in exchange for R-BTC or RIF tokens.

## Repositories
 - [Pinning Service](https://github.com/rsksmart/rif-storage-pinner): A nodejs service which listens on Providers offer and pins/unpins files from Provider run IPFS node
 - [Marketplace UI](https://github.com/rsksmart/rif-marketplace-ui): User interface where Providers can announce their storage offer and Consumer can apply and start an SLA
 - [Storage Smart Contracts](https://github.com/rsksmart/rif-marketplace-storage): A smart contract registry which stores the offers and agreements.

### Development Tools
- [Marketplace Dev Environment](https://github.com/rsksmart/rif-marketplace-dev): Makes it easy to setup Marketplace development environment
- [Pinning CLI](https://github.com/rsksmart/rif-storage-cli): CLI tool for interacting with the Storage Smart Contracts
- [Pinning UI](https://github.com/rsksmart/rif-storage-pinning-ui): Simple UI for development purposes which interacts with the Storage Smart Contracts
