---
layout: rsk
title: "Setup - RNS User guide"
description: "Compatible wallets, connect Nifty wallet to RSK, connect Metamask wallet to RSK, get RBTC, get RIF Tokens, display amount of tokens in the Nifty wallet, display amount of tokens in the Metamask wallet"
tags: rns, guide, rns-user-guide
render_features: 'next-elem-class'
---

To use the application and the service we are going to need three things:

1. An internet browser extension wallet. Read [Compatible wallets](#compatible-wallets) how to get a compatible wallet, or read the guides to connect [Nifty wallet](#connect-nifty-wallet-to-rsk) and [Metamask wallet](#connect-metamask-wallet-to-rsk) to RSK
2. RBTC to pay for the transaction cost. See [Getting RBTC](#getting-rbtc)
3. RIF tokens to buy or extend the expiration of a domain. See [Getting RIF Tokens](#getting-rif-tokens). Also, read [here](#display-amount-of-tokens-in-the-nifty-wallet) on how to view your tokens in your wallet.

### Compatible wallets

The RNS Manager can be used seamlessly with the following wallets. To setup your wallet, follow the instructions in [connect to RSK network](#connect-nifty-wallet-to-rsk).



<div class="markdown-light-rounded-border markdown-width40 markdown-horizontal-margin30">
    <img src="https://i.imgur.com/xacetSm.png" alt="" />
    <p>
        Nifty wallet <span class="badge badge-primary">recommended</span><br/>
        <a href="https://www.poa.network/for-users/nifty-wallet">Get the wallet</a>
    </p>
</div>

<div class="markdown-light-rounded-border markdown-width40">
    <img src="https://i.imgur.com/JVWXQca.png" alt="" />
    <p>
        Metamask<br />
        <a href="https://metamask.io/">Get the wallet</a>
    </p>
</div>

<div class="markdown-light-rounded-border markdown-width40">
    <img src="https://i.imgur.com/CaM23s8.png" alt="" />
    <p>
        Brave's Wallet<br />
        <a href="https://brave.com/">Get the browser</a>
    </p>
</div>


#### Connect Nifty wallet to RSK

1. Open your wallet.
2. Open network selector

    ![Setup - Nifty wallet network selector](/rif/rns/guide/images/setup-nifty-wallet-network-selector.png)

3. Choose 'RSK' option

    ![Setup - Nifty wallet network selector RSK](/rif/rns/guide/images/setup-nifty-wallet-network-selector-rsk.png)

> To use the RSK testnet network choose the 'RSK Testnet' option instead of RSK.

#### Connect Metamask wallet to RSK

Find the guide on [Metamask](https://developers.rsk.co/develop/apps/wallets/metamask/).

### Getting RBTC

Since RNS works on top of RSK blockchain, to pay for transactional fees you will need RBTC tokens. This is going to be used in the registration and for updating any configuration on the domain.

Read the [R-BTC Token](https://developers.rsk.co/rsk/rbtc/) to find exchanges and more RBTC token information.


> If you are using the testnet you can get free funds in the [RSK faucet](https://faucet.rsk.co/)

### Getting RIF Tokens

The RNS domains have a value in RIF tokens. The cost is described in this table:

| Years | RIF value |
| - | - |
| 1 year | 2 RIF |
| 2 year | 4 RIF |
| 3 year | 5 RIF |
| 4 year | 6 RIF |
| 5 year | 7 RIF |

Each extra year over the three years cost 1 RIF token.

Read [RIF Token](https://developers.rsk.co/rif/token/) to find exchagnes and more RIF token information.

> If you are using the testnet you can get free funds in the [RIF faucet](https://faucet.rifos.org/)

#### Display amount of tokens in the Nifty wallet

To see how many tokens you have in your wallet you should list the RIF Token.

1. Open your wallet ([ensure you are connected to RSK](#connect-nifty-wallet-to-rsk))
2. Go to 'Tokens view'

    ![Setup - Nifty wallet Tokens View](/rif/rns/guide/images/setup-nifty-wallet-tokens-view.png)

3. Click on 'Add token'

    ![Setup - Nifty wallet Add token](/rif/rns/guide/images/setup-nifty-wallet-add-token.png)

4. Select RIF Token

    ![Setup - Nifty wallet RIF Token](/rif/rns/guide/images/setup-nifty-wallet-rif-token.png)
    
    > You are also able to choose RNS Token. This represents the amount of .rsk domains owned by your wallet, you can add it too.

5. Click next

#### Display amount of tokens in the Metamask wallet

Read [Config Custom Tokens](https://docs.matic.network/docs/develop/metamask/custom-tokens) to add a custom token to the wallet. You should add the token address displayed [here](https://developers.rsk.co/rif/token).

----

[Contact us on Gitter](https://gitter.im/rsksmart/rif-name-service) |
[Github](https://github.com/rnsdomains) |
[Register Domain](https://manager.rns.rifos.org/search)
