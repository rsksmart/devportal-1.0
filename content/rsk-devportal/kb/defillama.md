---
menu_order: 850
menu_title: Add Protocol To Defillama
title: 'How to add your protocol in Defillama'
description: 'DefiLlama is the largest TVL aggregator for DeFi (Decentralized Finance).'
tags: knowledge-base, defillama, protocol
layout: 'rsk'
---

![Defillama](/assets/img/kb/defillama/defillama-logo.png) DefiLlama is the largest TVL aggregator for DeFi (Decentralized Finance). Their data is fully open-source and maintained by a team of passionate individuals and contributors from hundreds of protocols.
Their focus is on accurate data and transparent methodology.

DefiLlama considers the value of any tokens locked in the contracts of a protocol / platform as TVL. Therefore they count the TVL of bridge projects but do not contribute them towards the TVL of any chain. 

Check out the [Defillama page](https://defillama.com/) and [DeFi Llama docs](https://docs.llama.fi/list-your-project/readme) for more details!

## How to list a DeFi project

The majority of adapters on DefiLlama are contributed and maintained by their respective communities, with all changes being coordinated through the [DefiLlama/DefiLlama-Adapters](https://github.com/DefiLlama/DefiLlama-Adapters) github repo.

Please follow this [guide](https://docs.llama.fi/list-your-project/submit-a-project)

## How to write an SDK adapter

An adapter is just some code that takes in a UNIX timestamp and chain block heights, and returns the balances of assets locked in a protocol, including all the decimals (that is, the way it's stored on chain). Our SDK will convert all raw asset balances into their USD equivalent and sum to obtain total TVL, so you need minimal processing inside the adapter.

Follow this [guid](https://docs.llama.fi/list-your-project/how-to-write-an-sdk-adapter)

### Support

You can visit [Defillama About](https://defillama.com/about).