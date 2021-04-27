---
layout: rsk
title: How To Use
description: "How to build and run a Lumino node. How to use its user interface to view the dashboard, quick payments, token view, send tokens, pay, deposit, open and close channels, and view payments"
---

## Build your Lumino Node

In order to [get your own RIF Lumino node up and running](/rif/lumino/node/install), refer to the corresponding documentation.

## Access the UI

To access the **Dashboard** of your Lumino node, start up a browser and use the chose `api-address` param value as a URL. We're going to use `localhost:5001` in this example.

### Dashboard

This is the initial screen you will arrive at, which presents a summary of information for the running node.

<div align="center"><img src="/assets/img/lumino/lumino-node-dashboard.png" alt=""/></div>

Let's talk about the other sections and pages that are accesible from here.

### Header

<div align="center"><img src="/assets/img/lumino/lumino-node-header.png" alt=""/></div>

1. At the left we have the RSK Address of the running node
2. There is a global search bar in which we can search by the following criteria:
    1. Lumino Nodes
    2. Channels
    3. Tokens
3. Quick payment (we will talk more about this in the following section)
4. Notifications Bell: this will display a list of TODO's or pending operations, as well as all sorts of things related to notifications (like when a payment has been made, etc.).

#### Quick Payment

<div align="center"><img src="/assets/img/lumino/lumino-node-quick-payment.png" alt=""/></div>

The purpose of this feature is to make a payment to any partner using any token. The link is available across all of the pages in the UI, in order to give quick access to it on every page.

To make a payment we need to indicate 3 parameters:

1. Partner address: Node we want to make the payment to
2. Token Address: Token we want to pay in
3. Amount: Amount of tokens to be paid

After you hit **PAY** a new payment will be initiated. You will be able to see the state of it in the Notification Bell icon placed at the header.

A valid route must exist from your node to the destination for the payment to be successful. This includes nodes being online as well as enough balance across every hop.

### Token View

<div align="center"><img src="/assets/img/lumino/lumino-node-token-view.png" alt=""/></div>

In this view you can see all the tokens registered in the Lumino Network. In this example we just have one token registered called "Token".

The view has a filter bar where you can search by name, or sort by *Name*, *Symbol* or *Balance*.

Each token displays the following information & actions:

- **Token Address**: the address of this token
- **Balance**: your balance for this particular token
- 2 possible actions (only 1 is displayed at a time):
  - **Join Network**: if you don't have any channel open using this token, this button will appear. If you go for this action Lumino will create 3 new channels using this token, with random partners. This function is very useful when you want to have channels in a particular token to start to send & receive payments but you don't know any other partner yet.
  - **Leave Network**: If you already have at least 1 channel using this token, a *Leave Network* action will appear. This action will close ALL your open channels which use this token.

### Channels

<div align="center"><img src="/assets/img/lumino/lumino-node-channels.png" alt=""/></div>

This view is used for:

- Creating channels between nodes
- Sending tokens (like the one we made in Quick payment)
- Interacting with each channel created with our node, for which we can do the following:
  - Make a payment over this channel (this will be an offchain payment)
  - Deposit more tokens in the channel (this requires an onchain transaction)
  - See details for each transaction related to the channel
  - Close the channel (this requires an onchain transaction)

See below for a more in-depth explanation for each section of this page.

##### *New Channel* button

You can use this button to create a new channel between the running node and a chosen partner, using a specific token.

<div align="center"><img src="/assets/img/lumino/lumino-node-new-channel.png" alt=""/></div>

As the fields indicate, you need to enter the chosen **partner address**, a **token address** and an **amount** to be added as your initial balance for the channel (of course you can always deposit more tokens after you create the channel).

After you create the channel, you will see a new channel widget like the following in the channel list:

<div align="center"><img src="/assets/img/lumino/lumino-node-channel-list.png" alt=""/></div>

We already discussed the actions before, so let's talk about the information displayed:

- The ID for the channel
- Address of the partner
- Token used for this channel
- Your balance in this particular channel
- The status of the channel; open, closed, etc.

##### *Send Tokens* button

<div align="center"><img src="/assets/img/lumino/lumino-node-send-tokens.png" alt=""/></div>

This button works in the exact same way as the [_Quick Payment_](#quick-payment) button.

Now let's discuss the actions for each channel widget.

##### *Pay* button (from channel widget)

As an example we're going to send some tokens to the partner; say for example 15.

To do this, just click the *Pay* button, enter `15` as an **Amount**, and press `PAY`.

<div align="center"><img src="/assets/img/lumino/lumino-node-channel-payment.png" alt=""/></div>

When the transfer is done, a *Success* message is received, indicating the amount of tokens we've sent:

<div align="center"><img src="/assets/img/lumino/lumino-node-transfer-success.png" alt=""/></div>

**Reminder:** amounts in the notifications are displayed wei (that's why you'll see those big numbers there).

You can see the detail of the payment in the *Payments* view on the sidebar:

<div align="center"><img src="/assets/img/lumino/lumino-node-payments.png" alt=""/></div>

##### *Deposit* button (from channel widget)

If we want to deposit more tokens in the channel we can do it by clicking the *Deposit* button and indicating some amount. Let's add some tokens to the balance from our node's side.

Click the button, enter `30` as an amount, and press `Deposit`.

<div align="center"><img src="/assets/img/lumino/lumino-node-deposit.png" alt=""/></div>

After we receive the confirmation, check the channel and you'll see that the balance has indeed been updated.

<div align="center"><img src="/assets/img/lumino/lumino-node-balance.png" alt=""/></div>

Remember, we had 80 tokens at the start, and then we paid 15 to our partner. Now we've deposited 30 more.

**Reminder:** of course you must have enough onchain balance in order to make the deposit.

##### *View Details* button (from channel widget)

Let's check the *View Details* button, so we can see the payments that we've recently submitted.

<div align="center"><img src="/assets/img/lumino/lumino-node-details.png" alt=""/></div>

In this view we can see details for all the payments that have been made, related to the channel for which we've clicked the *View Details* button.

Here we have some features to filter the payments that happened in the channel.

- You can filter by date, indicating a **from** or **to** date
- Use the dropdown to filter by:
  - *All*: it will not discriminate the data
  - *Received*: show only the payments made by your partner
  - *Failed*: in case of a failed payment, it can be reviewed here
  - *Sent*: show successful payments made to your partner
- Pagination
  - Indicate how many rows you want to see. Options are: 5, 10, 20, 25, 50 & 100 rows
  - Advance between pages
- You can also see interesting data presented more aesthetically at the top of the page, such as your address, the token that's being used, and the partner address.

##### Close (from channel widget)

<img src="/assets/img/lumino/lumino-node-close-channel.png" alt=""/>

When clicking _Close_, you'll need to confirm the action as shown.

The channel status will change to `closed` and then after a few validations, it'll change to `waiting_for_settlement`.

The latter state will last for take 500 blocks; after that, the channel status will displayed `settled` for a short period of time, and then the channel will be deleted from the view.

### Payments

<div align="center"><img width="100%" src="/assets/img/lumino/lumino-node-payments.png" alt=""/></div>

This view is similar to the _View Details_ button of each channel.

In a nutshell, it shows all the payments made in the channels. The difference is that it does not discriminate by channel like the _View Details_ button does.

Before you leave, let's see how all the changes we have made affected the dashboard:

(Note: we have executed a couple more actions, like transactions and failures to see more numbers at this point)

<div align="center"><img width="100%" src="/assets/img/lumino/lumino-node-metrics.png" alt=""/></div>

We believe these metrics should prove useful to you.

Additionally, if you scroll down a little bit you will see a small table with relevant data, like in payments:

<div align="center"><img width="100%" src="/assets/img/lumino/lumino-node-payments-table.png" alt=""/></div>

### Invoices

#### Generation

An invoice is a text containg all the information of a payment, which can be later used by a node to make a payment to another.

Lumino allows invoice generation, but currently the only way to do this is through the REST API.

To create a new invoice, send a `POST` request to `<PaymentReceiverHost>:<Port>/api/v1/invoice` with the following body:

```json
{
  "token_address": "0xF87366bE772C612f94F73C87aB4F5BE79c0B1AEd",
  "currency_symbol": "lum",
  "partner_address": "0x5BCd2644CFe6Cf5CBAb14e0D96F2Fe8cDc403E18",
  "amount": "1",
  "description": "prueba_invoice",
  "expires": "1588634544"
}
}
```

Where:
- `token_address` is the token's address.
- `currency_symbol` is the token's symbol (case sensitive).
- `partner_address` is the receiver of the payment. It MUST be the same address as the one of the node receiving the API call. Otherwise, the invoice will be generated, but the invoice won't work when you try to pay it.
- `expires` is the number of seconds until the payment expires.

The response will be something like:

```json
{
    "type": 1,
    "status": 1,
    "expiration_date": "2021-02-24T01:18:40.548412",
    "encode": "lmlum11psrg4lspp560ejml7f46g2mj8dzgtvwtaq8x2v3tqcn7fv48qvhmkts0auzz7sdqhwpe82etzv90kjmnkda5kxegxqyz5vqnpqt0xjv3x0um84ew43fcxeduh73nwyq0sctpqlpekd0nh93sjl98h8jr6kn6mu7wqkxhd4kmlkde2zgukw6vzyu0hf79ngrjg7d7fyaj4u6gqecg0k2t0djwsk57jlgp4xvc8zzn6ek05t329yzu5kdy3ualx4fquuh70f49xpqcpuas3ml",
    "payment_hash": "0xd3f32dffc9ae90adc8ed1216c72fa03994c8ac189f92ca9c0cbeecb83fbc10bd",
    "secret": "0x08304db713bf298ef4b1e9a87437185a36d0b9bfff3974b946421fdd94c32577",
    "currency": "lum",
    "amount": "1",
    "description": "prueba_invoice",
    "target_address": "0x5bcd2644cfe6cf5cbab14e0d96f2fe8cdc403e18",
    "token_address": "0xf87366be772c612f94f73c87ab4f5be79c0b1aed",
    "created_at": "2021-02-23T01:18:40"
}
```

The `encode` field corresponds to the encoded invoice, and it's the text which holds the information of the payment that can be used to pay it.

#### Payment

<div align="center"><img src="/assets/img/lumino/lumino-node-invoice-payment.png" alt=""/></div>

In order to pay an invoice, click on the `Invoice` switch inside the `Send Tokens` view or `Pay` button from the channel widget.

A text area will be displayed where you can paste the encoded invoice.

Once you click the `Pay` button, the node will decode the payee, the token, and the amount from the invoice, and pay it as a regular offchain Lumino transfer. Note that a path of channels with enough balance will be needed as in any other payment.
