---
layout: rsk
title: Full smart contracts suite
tags: rif, rns, rif-name-service, javascript,  domains, address, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

Import contracts using [npm](https://www.npmjs.com/).

## Registry

Abstract RNS Registry and a `0.5.0` implementation.

- Source: [https://github.com/rnsdomains/rns-registry](https://github.com/rnsdomains/rns-registry)

- npm: [https://www.npmjs.com/package/@rsksmart/rns-registry](https://www.npmjs.com/package/@rsksmart/rns-registry)

    ```
    npm i @rsksmart/rns-registry
    ```

## Resolver

Addr Resolver and Multi-chain resolver.

- Source: [https://github.com/rnsdomains/rns-resolver](https://github.com/rnsdomains/rns-resolver)

- npm: [https://www.npmjs.com/package/@rsksmart/rns-resolver](https://www.npmjs.com/package/@rsksmart/rns-resolver)

    ```
    npm i @rsksmart/rns-resolver
    ```

## Reverse

Reverse Registrar and Name Resolver.

- Source: [https://github.com/rnsdomains/rns-reverse](https://github.com/rnsdomains/rns-reverse)

- npm: [https://www.npmjs.com/package/@rsksmart/rns-reverse](https://www.npmjs.com/package/@rsksmart/rns-reverse)

    ```
    npm i @rsksmart/rns-reverse
    ```

## ERC-677 Token

ERC-677 Token contract implementation, compatible with RIF Token implementation.

> Use it for testing purposes.

- Source: [https://github.com/rnsdomains/erc677](https://github.com/rnsdomains/erc677)

- npm: [https://www.npmjs.com/package/@rsksmart/erc677](https://www.npmjs.com/package/@rsksmart/erc677)

    ```
    npm i @rsksmart/erc677
    ```

## Auction Registrar

`0.5.0` implementation of Rootstock (RSK) Auction Registrar (outdated).

- Source: [https://github.com/rnsdomains/rns-auction-registrar](https://github.com/rnsdomains/rns-auction-registrar)

- npm: [https://www.npmjs.com/package/@rsksmart/rns-auction-registrar](https://www.npmjs.com/package/@rsksmart/rns-auction-registrar)

    ```
    npm i @rsksmart/rns-auction-registrar
    ```

## Rootstock (RSK) Registrar

Current Rootstock (RSK) Registrar.

- Source: [https://github.com/rnsdomains/rns-rskregistrar](https://github.com/rnsdomains/rns-rskregistrar)

- npm: [https://www.npmjs.com/package/@rsksmart/rns-rskregistrar](https://www.npmjs.com/package/@rsksmart/rns-rskregistrar)

    ```
    npm i @rsksmart/rns-rskregistrar
    ```

## Locally install full suite

Run current architecture of RNS in a local network.

- Source: [https://rsksmart.com/rsksmart/rns-full-suite](https://rsksmart.com/rsksmart/rns-full-suite)

```
git clone https://github.com/rsksmart/rns-full-suite.git
cd rns-full-suite
npm i
truffle develop
truffle(develop)> migrate
```
