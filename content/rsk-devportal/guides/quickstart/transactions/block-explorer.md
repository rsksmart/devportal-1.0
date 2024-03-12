---
menu_order: 100
menu_title: Block Explorer
layout: rsk
title: 'Block Explorer'
description: 'Understand how to use the Rotstock block explorer'
tags: quick-start, getting-started, guide, how-to, transactions, explorer, bitcoin, rsk, peer-to-peer, merged-mining, blockchain, powpeg
---
## Block Explorer

Now that we are set up, let’s explore some transactions!
The Rootstock network is an **immutable public ledger**.
Let’s dissect that phrase:

- **Ledger**: An ordered list of transactions recorded in some form
- **Immutable**: The way this ledger is recorded and stored means that any existing transactions may not be deleted or modified. You may also think of it as being an “append-only” ledger.
- **Public**: The contents of this ledger are open and transparent, therefore anyone connected to this network can view every single transaction in history.

This is where block explorers come in.
They are a special type of software that connect to a blockchain network, and display the data from this immutable public ledger.

Since it is open and transparent, there is nothing stopping multiple block explorers from displaying the data in a single blockchain. This is certainly true for Rootstock, and there are multiple block explorers. We’ll use the canonical one here, however, feel free to use other block explorers too!

## View account in the block explorer

Watch this short video demonstrating how to view an account in the block explorer.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/p-q7NBmEqBo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

For the Rootstock Mainnet, we would go to [`explorer.rsk.co`](https://explorer.rsk.co/).
However, since we are currently connected to the Rootstock Testnet, we go to [`explorer.testnet.rsk.co`](https://explorer.testnet.rsk.co/) instead.

Once you are there, you should see the main screen.

![View Explorer](/assets/img/guides/quickstart/transactions/explorer.png)

Next, open up MetaMask, and click on the address to copy it.

![View Explorer](/assets/img/guides/quickstart/transactions/metamask_address.png)

Then paste your address into the search box in the block explorer. The Rootstock Block Explorer will automatically detect that this is an address and perform a lookup within the blockchain data. After the little animation, you should see the address being displayed.

![View Address Block Explorer](/assets/img/guides/quickstart/transactions/view_address_block_explorer.png)

You should see the "Balance" for this address, which should match the balance that you have received from the tRBTC Faucet earlier. If you scroll down in the block explorer, you should see a list of transactions.

You should see 2 transactions: One in which the tRBTC Faucet transferred the current cryptocurrency into this address, and another in which the tRIF Faucet transferred the current tokens to this address.

![View Block Explorer Transaction](/assets/img/guides/quickstart/transactions/explorer_transactions.png)

You should also see a few other “tabs” in this section, and one of them is “Tokens”. Click on this to see your tokens.

![View Block Explorer Tokens](/assets/img/guides/quickstart/transactions/explorer_token.png)

Here you should see the balance of the RIF tokens that you have.
