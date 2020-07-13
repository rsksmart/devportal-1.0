---
layout: rsk
title: "Value proposition RNS for Wallets"
description: "Phase 1: Problems to solve, UX proposal, Send BTC example, Feature summary, RNS Integration guidelines. Phase 2:  Problems to solve, Feature summary"
tags: rns, guide, wallets, value
---

## Phase 1

**Improve UX to improve user adoption**

*   Simplify the way users send and receive crypto-assets (in RSK and other blockchains)
*   Avoid losing funds due to human errors and hacking/phishing.

### Problems to solve

1. **Difficult or impossible to remember crypto wallet addresses**
   _→ bad UX for end users, diminishes non-tech user adoption._
2. **Error-prone when writing traditional crypto wallet addresses**
   _→ can derive to lost funds when transferring crypto assets._
3. **Hacking/phising-prone when copy-pasting traditional crypto wallet addresses**
   _→ can derive to lost funds when transferring crypto assets._
4. **Difficult to add contacts to crypto wallets** **and impossible to dynamically update contact’s addresses**
  _→ bad UX for end users._

### UX Proposal

#### Full UX Flow in Figma

[https://www.figma.com/file/U1lTWDKjzIi8JvEl77FEYy/RNS-for-rWallet](https://www.figma.com/file/sRGQFRnFTJXcVpxSGBwZIT/RNS-for-Wallet-Integration?node-id=0%3A1&viewport=421%2C-606%2C0.07086607068777084)

**_Steps:_**

1. _Click the above [link](https://www.figma.com/file/sRGQFRnFTJXcVpxSGBwZIT/RNS-for-Wallet-Integration?node-id=0%3A1&viewport=421%2C-606%2C0.07086607068777084) in desktop computer._
2. _Press the PLAY ► button in the upper right corner._
   ![RNS for Wallets - Integration](/rif/rns/guide/images/rns-for-wallets-integration.png)

### Quick example: Send BTC


![RNS for Wallets - Walkthrough 01](/rif/rns/guide/images/rns-for-wallets-walkthrough-01.png)

![RNS for Wallets - Walkthrough 02](/rif/rns/guide/images/rns-for-wallets-walkthrough-02.png)

![RNS for Wallets - Walkthrough 03](/rif/rns/guide/images/rns-for-wallets-walkthrough-03.png)

![RNS for Wallets - Walkthrough 04](/rif/rns/guide/images/rns-for-wallets-walkthrough-04.png)

![RNS for Wallets - Walkthrough 05](/rif/rns/guide/images/rns-for-wallets-walkthrough-05.png)

This will send the funds to the app user’s Bitcoin address linked to `alice.yourwallet.rsk`.

### Feature summary

1. **YourWallet Nickname**
    *   _Free_ RNS subdomain when installing app**
        1. Domain template: `xxxxx.yourwallet.rsk`
        2. `xxxxx` is the nickname
    *   **It is linked to all the wallet addresses created when installing the app.**
    *   It can be presented to end users as a “[YourWallet]’s **nickname**” to improve non-tech user adoption.
    *   Users won’t have to understand a new concept such as RNS nor smart contracts nor fees nor gas.
    *   Behind the scenes is simply a RNS subdomain of the yourwallet.rsk domain
    *   Subsidized fees and gas by IOV Labs
    > Note: "yourwallet.rsk" is just an example main domain. Replace "yourwallet" for the domain you will use for your wallet (eg, if your wallet is called "Bitcoin Wallet" you could register bitcoinwallet.rsk and use it as your main domain).
    > Talk to your IOV account manager for more information. Or, if you prefer, just go to rns.rifos.org and register the main domain of your preference.
2. **Send crypto-asset using human-readable addresses** (_YourWallet_ nicknames and any other RNS domain) while also maintaining traditional wallet addresses.
3. **Contact book**
4. **Easy _YourWallet_ nickname sharing**

### RNS Integration Guidelines

[https://developers.rsk.co/rif/rns/integrate/](https://developers.rsk.co/rif/rns/integrate/)

### RNS Documentation

#### rns-js library

[https://www.npmjs.com/package/@rsksmart/rns](https://www.npmjs.com/package/@rsksmart/rns)

#### RNS in RSK Developer portal

[https://developers.rsk.co/rif/rns/](https://developers.rsk.co/rif/rns/)

#### Integrate Your Wallet with RNS

[https://developers.rsk.co/rif/rns/integrate/integrate-wallet/](https://developers.rsk.co/rif/rns/integrate/integrate-wallet/)

#### Integrate Your dApp with RNS

[https://developers.rsk.co/rif/rns/integrate/integrate-dapp/](https://developers.rsk.co/rif/rns/integrate/integrate-dapp/)

## Phase 2 (optional)

**Empower YourWallet users with the full RNS experience**

*   Let Your Wallet users have full control of their RNS domains.
*   Let users switch their main RNS domain in Your Wallet.
*   Let users register new RNS domains.
*   Let users admin their RNS domains from Your Wallet.

### Problems to solve

1. **Not possible to update the address resolution for my domain.**
    _→ more steps to do it if having to go to the [RNS Manager](https://rns.rifos.org)_
2. **Not possible to change my main YourWallet subdomain (nickname)**
    _→ less flexibility for end users and less decentralization_
3. **Not possible to control, register, use and admin different RNS domains from YourWallet**
    _→ RNS frequent users will have less flexibility to fulfill their needs_


### Feature Summary

1. **Change main domain**
    *   Users will be able to change their `xxxxx.yourwallet.rsk` for another RNS domain they own of any type (eg, `xxxxx.rsk`).
2. **Change address resolution**
    *   Users will be able to change the address resolved by their YourWallet nickname (or RNS domain).
3. **Register new RNS domains**
    *   Users will be able to register new RNS domains from YourWallet app.
4. **Full Admin RNS domains**
    *   Users will be able to register new **sub**domains from YourWallet app.
    *   Users will be able to renew domains from YourWallet app.
    *   Users will be able to transfer domains from YourWallet app.
    *   Users will be able to set Ethereum/Binance/IPFS/Swarm/RIF Storage/Tor/Torrent/Lumino/etc. addresses resolutions from YourWallet app.
