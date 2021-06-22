---
layout: rsk
title: RIF Storage Pinning service - Local setup with storage dev CLI
tags: rif, rif-storage, ipfs, rif-pinning, swarm, storage, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

This guide is quite advanced and assumes a greater knowledge of how to setup local blockchain environment, IFPS, etc. 

## Repositories

 - Storage Smart Contracts: [github.com/rsksmart/rif-marketplace-storage](https://github.com/rsksmart/rif-marketplace-storage)
 - Storage Development CLI: [github.com/rsksmart/rif-storage-cli](https://github.com/rsksmart/rif-storage-cli)

## Steps

 1. Clone all repos, run `npm install` globally.
 1. Start up Ganache
 1. In Smart Contracts repo using `truffle deploy` deploy contracts and take note of the `StorageManager` contract address.
 1. Go to Storage Development CLI and create an Offer for the given contract address (use the `npm run bin` script)
 1. Go to Pinning Service repo and configure it to use the deployed contract. You can use environment variables, `local.json` or CLI parameters for this.
 1. Run `npm run init` - this will bootstrap IPFS repos in `.repos` folder and configure the ports settings.
 1. In one tab run `npm run ipfs:consumer daemon`
 1. In another tab run `npm run ipfs:provider daemon`
 1. Create Offer. Suggested way is using the Storage Development CLI. Use `npm run bin` and don't forget to configure the correct contract address.
    Note the Offer ID (which is the address of your RSK account from which you have created the Offer)
 1. Run `npm run bin -- --offerId <offerId>` to start the service.

Consumer IPFS API runs on `5002`.
Provider IPFS API runs on `5003`.