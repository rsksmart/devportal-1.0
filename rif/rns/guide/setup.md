---
layout: rsk
title: "Setup - RNS User guide"
description: "Compatible wallets, connect Nifty wallet to RSK, connect Metamask wallet to RSK, get RBTC, get RIF Tokens, display amount of tokens in the Nifty wallet, display amount of tokens in the Metamask wallet"
tags: rns, guide, rns-user-guide
---

## Setup


To use the application and the service we are going to need three things:

1. An internet browser extension wallet. Read [here](#Compatible-wallets) how to get a compatible wallet, or read the guides to connect [Nifty wallet](#Connect-Nifty-wallet-to-RSK) and [Metamask wallet](#Connect-Metamask-wallet-to-RSK) to RSK
2. RBTC to pay for the transaction cost -- [Getting RBTC](#Getting-RBTC)
3. RIF tokens to buy or extend the expiration of a domain -- [Getting RIF Tokens](#Getting-RIF-Tokens). Also read [here](#Display-amount-of-tokens-in-the-Nifty-wallet) how to view your tokens in your wallet.

### Compatible wallets

The RNS Manager can be used seamlessly with the following wallets. To the wallets you need to follow the wallet's setup process and [connect it to RSK network](#Connect-Nifty-wallet-to-RSK).

<div style="width: 40%; float: left; text-align: center;
    border: solid #f8f9fa; margin: 5% 30%; border-radius: 2em;">
    <img src="https://i.imgur.com/xacetSm.png" style="width: 70%" />
    <p>
        Nifty wallet <span class="badge badge-primary">recommended</span><br/>
        <a href="https://www.poa.network/for-users/nifty-wallet" target="_blank">Get the wallet</a>
    </p>
</div>

<div style="width: 40%; float: left;  text-align: center; border: solid #f8f9fa; margin: 5%; border-radius: 2em;">
    <img src="https://i.imgur.com/JVWXQca.png"style="width: 50%; margin: 10%" />
    <p>
        Metamask<br />
        <a href="https://metamask.io/" target="_blank">Get the wallet</a>
    </p>
</div>

<div style="width: 40%; float: left;  text-align: center; border: solid #f8f9fa; margin: 5%; border-radius: 2em;">
    <img src="https://i.imgur.com/CaM23s8.png" style="width: 50%; margin: 10%; height: 135px; width: auto" />
    <p>
        Brave's Wallet<br />
        <a href="https://brave.com/" target="_blank">Get the browser</a>
    </p>
</div>

#### Connect Nifty wallet to RSK

1. Open your wallet.
2. Open network selctor

    ![](https://i.imgur.com/6PNTmiK.png)

3. Choose 'RSK' option

    ![](https://i.imgur.com/VJEs1qu.png)

<div class="alert alert-info">
    To use the RSK testnet network choose the 'RSK Testnet' option instead of RSK.
</div>

#### Connect Metamask wallet to RSK

Find the guides [here](https://developers.rsk.co/develop/apps/wallets/metamask/).

### Getting RBTC

As RNS works on top of RSK blockchain, to pay for transactional fees you will need RBTC toknes. This are going to be used in the registration and for updating any configuration on the domain.

Read [this article](https://developers.rsk.co/rsk/rbtc/) to find exchagnes and more RBTC token information.

<div class="alert alert-info">
    If you are using the testnet you can get free founds in the <a href="https://faucet.rsk.co/" target="_blank">RSK faucet</a>
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
    If you are using the testnet you can get free founds in the <a href="https://faucet.rifos.org/" target="_blank">RIF faucet</a>
</div>

#### Display amount of tokens in the Nifty wallet

To see how many tokens you have in your wallet you should list the RIF Token.

1. Open your wallet ([ensure you are connected to RSK](#Connect-Nifty-wallet-to-RSK))
2. Go to 'Tokens view'

    ![](https://i.imgur.com/xU2f5Fr.png)

3. Click on 'Add token'

    ![](https://i.imgur.com/YFS4mlr.png)

4. Select RIF Token

    ![](https://i.imgur.com/FBR4RZU.png)
    
    > You are also able to choose RNS Token. This represents the amount of .rsk domains owned by your wallet, you can add it too.

5. Click next

#### Display amount of tokens in the Metamask wallet

Read [this guide](https://docs.matic.network/newbies/conf-custom-tokens-metamask/) to add a custom token to the wallet. You should add the token address dispalyed [here](https://developers.rsk.co/rif/token).
