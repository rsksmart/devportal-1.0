---
layout: rsk
tags: rlogin, rif, rif-identity, integrate, libraries, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
title: rLogin - Integrations
render_features: 'collapsible'
---

We are currently integrated with the following dApps

[](#top "collapsible")
- A) RNS Manager
  * This is [RIF Name Service](/rif/rns) platform. Use it to:
    - Register .rsk domains
    - Administrate your domains
    
  * URL: [manager.rns.rifos.org](https://manager.rns.rifos.org/) ([testnet.manager.rns.rifos.org](https://testnet.manager.rns.rifos.org/) for RSK Testnet)
    
  * PRs:
    - [`rnsdomains/rns-manager-react#354`](https://github.com/rnsdomains/rns-manager-react/pull/354) - Add rLogin support with injected providers
    - [`rnsdomains/rns-manager-react#357`](https://github.com/rnsdomains/rns-manager-react/pull/357) - Add Wallet Connect

- B) RSK Token Bridge
  * Use this app to cross tokens with Ethereum network. For example, you can secure your USDT tokens on RSK network.
  
  * URL: [tokenbridge.rsk.co](https://tokenbridge.rsk.co/)
    
  * PRs:
    - [`rsksmart/tokenbridge#147`](https://github.com/rsksmart/tokenbridge/pull/147) - Add rLogin with injected provider and Wallet Connect
    - [`rsksmart/tokenbridge#148`](https://github.com/rsksmart/tokenbridge/pull/148) and [#149](https://github.com/rsksmart/tokenbridge/pull/149) - minor fixes

- C) RIF Faucet
  * This is the platform where you can get testnet RIF tokens to test the apps on their test modes.
    
  * URL: [faucet.rifos.org](https://faucet.rifos.org/)
    
  * PR: [`riflabs/rif-faucet-client#20`](https://github.com/riflabs/rif-faucet-client/pull/20) - Add rlogin, show message about missing gas, and minor cleanups

- D) RIF Identity Manager
  * Manage your assets, data and identity from a single platform.
  * URL: [`identity.rifos.org`](https://identity.rifos.org/)
  * Repo: [`rif-identity-manager`](https://github.com/rsksmart/rif-identity-manager)

- E) RSK Academy
  * RSK education platform. Find out brand new courses and live classes!
  * URL: [academy.rsk.dev.br](https://academy.rsk.dev.br/)
  * Repo: [`rsksmart/rsk-academy`](https://github.com/rsksmart/rsk-academy)

- F) rLending
  * URL: [rlending.app](https://rlending.app/)
  * Repo: [`riflending/rlending-ui`](https://github.com/riflending/rlending-ui)

- G) RIF Identity Email VC Issuer
  * Use this tool to issue Email Verifiable Credentials. This can be used as a service, the front-end stands as an example.
  * URL: [email-verifier.identity.rifos.org](https://email-verifier.identity.rifos.org/)
  * Repo: [`rsksmart/email-vc-issuer`](https://github.com/rsksmart/email-vc-issuer)

- H) Money on chain
  * The famous DOC, BPro and BTC2x platform. Operate your stable coins backed on Bitcoins.
  * URL: [alpha.moneyonchain.com](https://alpha.moneyonchain.com/)

- I) RIF on chain
  * Similar to Money on chain, but in this case backing the stable coins with RIF tokens.
  * URL: [rif.moneyonchain.com](https://rif.moneyonchain.com/)
  * You may also want to see the [sample apps](/rif/identity/rlogin/samples) list.
