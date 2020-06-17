---
layout: rsk
title: "Setup - RNS User guide"
description: "Compatible wallets, connect Nifty wallet to RSK, connect Metamask wallet to RSK, get RBTC, get RIF Tokens, display amount of tokens in the Nifty wallet, display amount of tokens in the Metamask wallet"
tags: rns, guide, rns-user-guide
---

To use the application and the service we are going to need three things:

1. An internet browser extension wallet. Read [here](#compatible-wallets) how to get a compatible wallet, or read the guides to connect [Nifty wallet](#connect-nifty-wallet-to-rsk) and [Metamask wallet](#connect-metamask-wallet-to-rsk) to RSK
2. RBTC to pay for the transaction cost -- [Getting RBTC](#getting-rbtc)
3. RIF tokens to buy or extend the expiration of a domain -- [Getting RIF Tokens](#getting-rif-tokens). Also read [here](#display-amount-of-tokens-in-the-nifty-wallet) how to view your tokens in your wallet.

### Compatible wallets

The RNS Manager can be used seamlessly with the following wallets. To the wallets you need to follow the wallet's setup process and [connect it to RSK network](#connect-nifty-wallet-to-rsk).

<div style="width: 40%; float: left; text-align: center;
    border: solid #f8f9fa; margin: 5% 30%; border-radius: 2em;">
    ![](/rif/rns/guide/images/xacetSm.png)
    <p>
        Nifty wallet <span class="badge badge-primary">recommended</span><br/>
        [Get the wallet](https://www.poa.network/for-users/nifty-wallet)
    </p>
</div>

<div style="width: 40%; float: left;  text-align: center; border: solid #f8f9fa; margin: 5%; border-radius: 2em;">
    ![](/rif/rns/guide/images/JVWXQca.png)
    <p>
        Metamask<br />
        [Get the wallet](https://metamask.io/)
    </p>
</div>

<div style="width: 40%; float: left;  text-align: center; border: solid #f8f9fa; margin: 5%; border-radius: 2em;">
    ![](/rif/rns/guide/images/CaM23s8.png)
    <p>
        Brave's Wallet<br />
        [Get the browser](https://brave.com/)
    </p>
</div>

#### Connect Nifty wallet to RSK

1. Open your wallet.
2. Open network selctor

    ![](/rif/rns/guide/images/6PNTmiK.png)

3. Choose 'RSK' option

    ![](/rif/rns/guide/images/VJEs1qu.png)

<div class="alert alert-info">
    To use the RSK testnet network choose the 'RSK Testnet' option instead of RSK.
</div>

#### Connect Metamask wallet to RSK

Find the guides [here](https://developers.rsk.co/develop/apps/wallets/metamask/).

### Getting RBTC

As RNS works on top of RSK blockchain, to pay for transactional fees you will need RBTC toknes. This are going to be used in the registration and for updating any configuration on the domain.

Read [this article](https://developers.rsk.co/rsk/rbtc/) to find exchagnes and more RBTC token information.

<div class="alert alert-info">
    If you are using the testnet you can get free founds in the [RSK faucet](https://faucet.rsk.co/)
</div>

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

Read [this article](https://developers.rsk.co/rif/token/) to find exchagnes and more RIF token information.

<div class="alert alert-info">
    If you are using the testnet you can get free founds in the [RIF faucet](https://faucet.rifos.org/)
</div>

#### Display amount of tokens in the Nifty wallet

To see how many tokens you have in your wallet you should list the RIF Token.

1. Open your wallet ([ensure you are connected to RSK](#connect-nifty-wallet-to-rsk))
2. Go to 'Tokens view'

    ![](/rif/rns/guide/images/xU2f5Fr.png)

3. Click on 'Add token'

    ![](/rif/rns/guide/images/YFS4mlr.png)

4. Select RIF Token

    ![](/rif/rns/guide/images/FBR4RZU.png)
    
    > You are also able to choose RNS Token. This represents the amount of .rsk domains owned by your wallet, you can add it too.

5. Click next

#### Display amount of tokens in the Metamask wallet

Read [this guide](https://docs.matic.network/newbies/conf-custom-tokens-metamask/) to add a custom token to the wallet. You should add the token address dispalyed [here](https://developers.rsk.co/rif/token).
