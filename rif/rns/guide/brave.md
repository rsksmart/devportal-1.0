---
layout: rsk
title: "Connect Brave to the RSK Network - RNS User guide"
description: "How to locate Brave's Wallet, connect to the RSK Mainnet and Testnet, get your RSK account address, add the RIF token"
tags: rns, guide, rns-user-guide
---

# Connect Brave to the RSK Network

## Locate Brave's Wallet

The wallet in the Brave browser is not as prominent as it is with Chrome or Firefox Nifty and Metamask plugins. The wallet is located under the Main Menu / Crypto Wallet:

![](https://i.imgur.com/ee210Rg.jpg)


If this is the first time you have set up Brave it will ask you to create a wallet. This article assumes that you have already a wallet. Since the wallet is hidden under the main menu, I would suggest creating a bookmark for it on the bookmark row. To do this, on Windows press `[CTRL]+[D]` or on Mac, `[Apple]+[D]`.

![](https://i.imgur.com/l8Xc37x.jpg)


This should place Wallets on the bookmark bar for easy access. This will make it easier to switch between different networks and accounts.

![](https://i.imgur.com/1iLUKEa.jpg)


## Connect to the RSK Mainnet and Testnet

On the wallet screen, towards the right, it should show that it is connected to the Main Ethereum Network. If you toggle the dropdown, towards the bottom there an option to connect to a "Custom RPC".

![](https://i.imgur.com/kGfNmmn.jpg)


The New Network tab will open and ask some questions about the network. For RKS Mainnet, use the following settings:

| Input Field | RSK Mainnet Value | RSK Testnet Value |
| -- | -- | -- |
| Network Name | RSK Mainnet | RSK Testnet |
| New RPC Url | https://public-node.rsk.co | https://public-node.testnet.rsk.co |
| Chain Id | 30 | 31 |
| Symbol | RBTC | RBTC |
| Block Explorer URL | https://explorer.rsk.co | https://explorer.testnet.rsk.co/

**Example:**

![](https://i.imgur.com/AUhoBtJ.jpg)

Hit Save and close settings. 

## Getting your RSK account address

If you closed out of the wallet, navigate back to your Crypto Wallets by using the bookmark you set. Under "Account 1" you will see your address and a copy button. Copy your address to the clipboard.

![](https://i.imgur.com/gldRM3h.jpg)

This is the address that you will use in the next step of getting RBTC.

## Add the RIF token

Next, we need to add the RIF token which is used in the RSK network. While connected to the RSK Mainnet, on the Accounts page, towards the bottom there is a heading "Don't see your Tokens?" and a link to "Add Token":

![](https://i.imgur.com/nDoJWDt.png)


Click the Add Token link and then click on the "Custom Token" tab. In the first field, Token Contract Address put the RIF Token Address:

| Network | RIF Contract Address |
| -- | -- |
| RSK Mainnet | 0x2acc95758f8b5f583470ba265eb685a8f45fc9d5 |
| RSK Testnet | 0x19f64674d8a5b4e652319f5e239efd3bc969a1fe |

When you press tab, or  move to the next field, Token Symbol and Decimals of Precision will autofill with the token's information:

![](https://i.imgur.com/60JzGfm.jpg)


Click "Next" and then "Add Tokens.".

You can repeat these steps for the RSK Testnet.