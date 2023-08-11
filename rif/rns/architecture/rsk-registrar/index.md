---
menu_order: 400
section_title: .rsk Registrar
menu_title: About .rsk Registrar
layout: rsk
title: .rsk Registrar
tags: rif, rns, rif-name-service, registrar, javascript,  domains, address, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

The registrar is separated into several components for simplicity, modularity, and privilege minimization. [Rootstock (RSK) Owner](rskowner) is the owner of rsk top level domain, so it is the only contract that can invoke `setSubdomainOwner` in [RNS Registry](../registry#setsubnodeowner). It grants access to other contracts for registering new domains and/or renewing domain's expiration time. Currently we've enabled a [first-in first-served registrar](registrars/fifs) contract and a [simple renewer](renewers/renewer) contract that enable minimal actions to provide basic functionality for domain creation and administration.
