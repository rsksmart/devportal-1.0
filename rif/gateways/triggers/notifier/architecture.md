---
layout: rsk
title: RIF Notifier Architecture
tags: rif, notifier, architecture
---

Contents

1. [Overview](#overview)
2. [Marketplace](#notifier-marketplace-interaction)
3. [Lumino](#notifier-lumino-interaction)


## Overview

 **RIF Notifier** at its core is composed of listeners that listen for events in RSK blockchain and notification services that send notifications on blockchain events to the outside world.

 Users interact with RIF Notifier through two main services

 RIF Marketplace

 RIF Lumino Client

![RIF Notifier Architecture](../assets/img/architecture.png)

## Notifier Marketplace Interaction

1. RIF notifier provider registers with marketplace as a provider. The providers and their specified
 currency tokens are whitelisted by the marketplace.
2. RIF marketplace gets the available subscription plans from the RIF notifier providers and presents to the customer.
3. RIF marketplace sends a request to selected RIF notifier provider with the user selected subscription plan to create or renew a subscription with the topics and notification preferences.
4. RIF notifier activates the subscription upon receipt of payment in notifier smart contract in rsk blockchain.
5. RIF notifier listens to RSK network for the selected topics and send notifications.
6. RIF notifier sends the notification based on selected notification preferences (SMS, EMAIL, API) for the user subscription.

## Notifier Lumino Interaction

1. RIF notifier listens to the token network registry for new tokens and registers the token when one is
created.
2. Lumino light client subscribes with RIF notifier for open channel and close channel events for a registered token in the network .
3. RIF notifier verifies for valid subscription from the Lumino light client user
4. RIF notifier fetches the open channel and close channel events for subscribed users and sends it to the Lumino client user based on their subscription notification preferences.
