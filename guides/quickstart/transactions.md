---
layout: rsk
title: 'RSK Quick Start Guide | Exploring RSK Transactions'
description: 'Learn how to interact with RSK in your web browser, how to look at RSK transactions, develop and deploy your very first smart contract to the RSK network.'
tags: quick-start, getting-started, guide, how-to, transactions, explorer, bitcoin, rsk, peer-to-peer, merged-mining, blockchain, powpeg
---

In the previous section, we set up a browser extension that is a crypto wallet, MetaMask. We connected to the RSK Testnet, and loaded this up with RSK’s cryptocurrency, RBTC, and an RSK-based token, RIF. 

> Note, if you have yet to do the above, we encourage you to go back and complete that step first. See: [Using RSK in the browser](/guides/quickstart/browser).

## Block Explorer

Now that we are set up, let’s explore some transactions!
The RSK network is an **immutable public ledger**.
Let’s dissect that phrase:
- **Ledger**: An ordered list of transactions recorded in some form
- **Immutable**: The way this ledger is recorded and stored means that any existing transactions may not be deleted or modified. You may also think of it as being an “append-only” ledger.
- **Public**: The contents of this ledger are open and transparent, therefore anyone connected to this network can view every single transaction in history.

This is where block explorers come in.
They are a special type of software that connect to a blockchain network, and display the data from this immutable public ledger.

Since it is open and transparent, there is nothing stopping multiple block explorers from displaying the data in a single blockchain. This is certainly true for RSK, and there are multiple block explorers. We’ll use the canonical one here, however, feel free to use other block explorers too!

## View account in the block explorer

Watch this short video demonstrating how to view an account in the block explorer.

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube.com/embed/p-q7NBmEqBo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

For the RSK Mainnet, we would go to [`explorer.rsk.co`](https://explorer.rsk.co/).
However, since we are currently connected to the RSK Testnet, we go to [`explorer.testnet.rsk.co`](https://explorer.testnet.rsk.co/) instead.

Once you are there, you should see the main screen.

![View Explorer](/assets/img/guides/quickstart/transactions/explorer.png)

Next, open up MetaMask, and click on the address to copy it.

![View Explorer](/assets/img/guides/quickstart/transactions/metamask_address.png)

Then paste your address into the search box in the block explorer. The RSK Block Explorer will automatically detect that this is an address and perform a lookup within the blockchain data. After the little animation, you should see the address being displayed.

![View Address Block Explorer](/assets/img/guides/quickstart/transactions/view_address_block_explorer.png)

You should see the "Balance" for this address, which should match the balance that you have received from the tRBTC Faucet earlier. If you scroll down in the block explorer, you should see a list of transactions.

You should see 2 transactions: One in which the tRBTC Faucet transferred the current cryptocurrency into this address, and another in which the tRIF Faucet transferred the current tokens to this address.

![View Block Explorer Transaction](/assets/img/guides/quickstart/transactions/explorer_transactions.png)

You should also see a few other “tabs” in this section, and one of them is “Tokens”. Click on this to see your tokens.

![View Block Explorer Tokens](/assets/img/guides/quickstart/transactions/explorer_token.png)

Here you should see the balance of the RIF tokens that you have.

## Transfer tRBTC from one account to another

So far, you have not made any transactions from your address. The transactions that you see when you view the address in the block explorer were made from other addresses (in this case, a couple of Testnet faucets). Now, it’s time for you to initiate your own transactions!

We’ll start by transferring cryptocurrency from your address, back to the faucet’s address.

In your address page, under transactions, you should see the “from” address of the RBTC Testnet Faucet. Click on the “copy” icon (looks like 2 sheets of paper stacked).

![View Block Explorer Copy Address](/assets/img/guides/quickstart/transactions/explorer_copy_address.png)

Then open up MetaMask, and in the main account screen, select the “Assets” tab, then select “tRBTC”, then select “Send”. In the field under “Add recipient”, paste the address that you copied earlier.

**Assets Tab**
![Metamask Copy Address](/assets/img/guides/quickstart/transactions/metamask_copy_address.png)

**Send tRBTC**
![Metamask Send](/assets/img/guides/quickstart/transactions/metamask_send.png)

**Convert Address to Lowercase**
![Metamask Lowercase](/assets/img/guides/quickstart/transactions/metamask_lowercase.png)

> If you get the above error, you will need to [convert your address to lowercase](https://convertcase.net/), because MetaMask does not yet support the EIP-1191 checksum standard used by RSK. See the [*Checksum* section of *Account Based RSK Addresses*](/rsk/architecture/account-based/) for more information.

**Address Detected**
![Metamask Address Detected](/assets/img/guides/quickstart/transactions/metamask_address_detected.png)

**Confirm Transactions**
![Metamask Address Detected Confirm](/assets/img/guides/quickstart/transactions/metamask_confirm_ether.png)

**Transaction Processing**
![Metamask Transaction Processing](/assets/img/guides/quickstart/transactions/metamask_send_ether.png)

**Transaction Successful**
![Metamask Transaction Successful](/assets/img/guides/quickstart/transactions/metamask_send_eth_success.png)
**View Sent Transaction**
![Metamask View Send Transaction](/assets/img/guides/quickstart/transactions/metamask_view_send_transactions.png)

## Transfer tRIF from one account to another

For the RIF Testnet Faucet:

1- Go to [`faucet.rifos.org`](https://faucet.rifos.org), you will take similar steps to the one above but this time you will send tRIF back to the RIF Testnet faucet address instead.

![tRIF Landing](/assets/img/guides/quickstart/transactions/rif_faucet_landing.png)

2- Copy the Faucet Address
![tRIF Landing Address](/assets/img/guides/quickstart/transactions/rif_faucet_address.png)

3- Open Metmask and click on the asset - tRIF
![Metamask Enter tRIF](/assets/img/guides/quickstart/transactions/metamask_enter_trif.png)

4- Click on the send button
![Metamask Send tRIF](/assets/img/guides/quickstart/transactions/metamask_send_trif.png)

5- Paste your address in the address bar and click on next
![Metamask Send tRIF](/assets/img/guides/quickstart/transactions/metamask_enter_address.png)

> If you get an error titled “Not ETH network, set to lowercase”, you will need to [convert your address to lowercase](https://convertcase.net/), because MetaMask does not yet support the EIP-1191 checksum standard used by RSK. See the [*Checksum* section of *Account Based RSK Addresses*](/rsk/architecture/account-based/) for more information.

6- Click the Next button
![Metamask Send tRIF Next](/assets/img/guides/quickstart/transactions/metamask_send_rif_next.png)

7- Click on Confirm
![Metamask Send tRIF Next](/assets/img/guides/quickstart/transactions/metamask_confirm_tRIF.png)

8- Transaction processing
![Transaction Processing](/assets/img/guides/quickstart/transactions/trif_processing.png)

9- Transaction Successful
![Send Transaction Successful](/assets/img/guides/quickstart/transactions/send_trif_success.png)

10- View the Transaction
![View tRIF Transactions](/assets/img/guides/quickstart/transactions/view_trif_transactions.png)

## Why RBTC balance decreases (gas)

You may have noticed that when you sent tRBTC, the tRBTC balance decreased by **slightly more** than the amount that you sent. You may also have noticed that when you sent tRIF, the tRBTC balance also decreased by a small amount, even though only tRIF were sent in that transaction.

You would have seen this in the transaction confirmation screens when you confirmed each transaction.

**tRBTC Gas Fee**
![tRBTC Gas](/assets/img/guides/quickstart/transactions/rbtc_gas_fee.png)

**tRIF Gas Fee**
![tRIF Gas](/assets/img/guides/quickstart/transactions/metamask_trif_gas.png)

This is **not an error**, it is simply a fundamental aspect of how blockchain networks function - any time you add a transaction to the blockchain, you must pay the network a fee to compensate them for their computational costs.

## View transactions in the block explorer

When you performed each of the transactions, you should have received notifications in popups.

![Confirmed Transaction](/assets/img/guides/quickstart/transactions/metamask_transaction_confirmed.png)

However, if you missed this, not to worry, you can also find this within the transaction history within MetaMask. To do so, within the main screen of MetaMask, click on the “Activity” tab. You’ll see the list of the transactions.

![Metamask Activity Tab](/assets/img/guides/quickstart/transactions/metamask_activity_tab.png)

Then you click on any transaction, and click on the arrow button beside copy button named transaction ID, this takes you to the [Testnet explorer](https://explorer.testnet.co)

![View testnet explorer](/assets/img/guides/quickstart/transactions/view_testnet_explorer.png)

![View testnet explorer](/assets/img/guides/quickstart/transactions/view_testnet_explorer_2.png)


If you clicked on the popup notification, or if you find it within the “Activity” tab, either way, this should open up the block explorer with the selected transaction selected.

For the transaction of the tRBTC transfer, you should see this

![View testnet transaction explorer](/assets/img/guides/quickstart/transactions/view_testnet_transaction.png)

You will notice that this transaction has an amount.

For the transaction of the tRIF transfer, you should see this

![View testnet transaction explorer trif](/assets/img/guides/quickstart/transactions/view_testnet_transaction_trif.png)

You will notice that this transaction has a zero amount, but it does emit some events, which is because the smart contract of the RIF token does this.

![View testnet logs](/assets/img/guides/quickstart/transactions/view_testnet_logs.png)

## View network stats

So far we have checked out individual addresses and transactions. These are very detailed and specific information. What if you were after the big picture instead? A bird’s eye view of the RSK blockchain as a whole?

For this, we will not use the RSK Block explorer, and instead use the RSK Stats page.

![RSK Stats Landing](/assets/img/guides/quickstart/transactions/rsk_stats_landing.png)

Here, we can see some very important numbers such as the average block duration, and the merged mining hash rate - and several other important technical indicators of the RSK network.
A key indicator to look for is the average block time, which should be approximately 33s. Another key indicator to look for is the percentage of the Bitcoin network’s hash rate that is merge mining RSK.

----
**Further reading:**

- The [RSK Mainnet Block Explorer](https://explorer.rsk.co/)
- The [RSK Testnet Block Explorer](https://explorer.testnet.rsk.co/)
- Alternative [Blockscout RSK Mainnet Block Explorer](https://blockscout.com/rsk/mainnet/)
- [Convert Addresses to lowercase using ConvertCase](https://convertcase.net)
- About [the RBTC cryptocurrency](/rsk/rbtc/)
- About [gas](/rsk/rbtc/gas/)
- The [RSK Mainnet Stats Page](https://stats.rsk.co/)
- The [RSK Testnet Stats Page](https://stats.testnet.rsk.co/)

