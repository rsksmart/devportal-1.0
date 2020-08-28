---
layout: rsk
title: RIF Storage Pinning service - Local setup with storage dev CLI
---

This guide is quite advanced and assumes a greater knowledge of how to setup local blockchain environment, IFPS etc. For more detailed guides please consult the [Local setup with dev UI](/rif/storage/services/pinning/guides/local_ui)

## Repos

 - Storage Smart Contracts: [github.com/rsksmart/rif-marketplace-storage](https://github.com/rsksmart/rif-marketplace-storage)
 - Storage Development CLI: [github.com/rsksmart/rif-storage-cli](https://github.com/rsksmart/rif-storage-cli)

## Steps

 1. Clone all repos, run `npm install` everywhere.
 1. Start up Ganache
 1. In Smart Contracts repo using `truffle deploy` deploy contracts and note the `StorageManager` contract address.
 1. Go to Storage Development CLI and create an Offer for the given contract address (use the `npm run bin` script)
 1. Go to Pinning Service repo and configure to use it the deployed contract. You can use environment variables, `local.json` or CLI parameters for this.
 1. Run `npm run init` - this will bootstrap IPFS repos in `.repos` folder and configure the ports settings.
 1. In one tab run `npm run ipfs:consumer daemon`
 1. In another tab run `npm run ipfs:provider daemon`
 1. Create Offer. Suggested way is using the Storage Development CLI. Use `npm run bin` and don't forget to configure the correct contract address.
    Note the Offer ID (which is the address of your RSK account from which you have created the Offer)
 1. Run `npm run bin -- --offerId <offerId>` to start the service.

Consumer IPFS API runs on `5002`, Swarms on `4002` and Gateway is on `8081`.
Provider IPFS API runs on `5003`, Swarms on `4003` and Gateway is on `8082`.
