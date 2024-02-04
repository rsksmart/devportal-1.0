---
menu_order: 500
menu_title: Deploy NFT on Rootstock
title: 'Deploy NFT on Rootstock | Write and Deploy an NFT project on the Rootstock Testnet'
description: 'Learn about NFTs, create, connect, and deploy to the Rootstock Blockchain.'
tags: NFTs, tutorial, overview, guides, tokens, web3, bitcoin, rsk, rootstock, peer-to-peer, blockchain, nft, ERC-721, smart-contract, hardhat, ethersjs, ipfs, metamask, testnet, pinata
layout: 'rsk'
---

## How to deploy your NFT on Rootstock

**Steps**
    
we will do the following steps;

* Switch to Node.js 12 for Hardhat to work
`nvm use 12`
    
* compile Meow-NFT smart contract
`npx hardhat compile`
    
* deploy Meow-NFT smart contract to Rootstock testnet. See other possible networks in hardhat.config.js
`npx hardhat deploy --network rsktestnet`

you will see a message:
    
`Meow NFT deployed to: 0xE360F4BFb74A1B2B1d102f40BE6c7D0f5C9d12C8
Copy this address and paste to the 'mint' task in 'hardhat.config.js' `
    
Paste the address to the mint task!

* mint your NFTs from CIDs specified in the mint task of project.config.js
    
`npx hardhat mint --network rsktestnet`
    
### View NFT using Metamask
    
### Metamask
    
Metamask is a kind of web wallet which facilitates transactions using yours accounts. It can be used with 
Rootstock networks too. It has versions for several browsers, like Chrome, Firefox, Opera and Brave.

Go to metamask.io and install it.

Create an account.

Write down your 12 word seed phrase. This is used to recover your account, in case you lose your password.

The seed phrase is the most important thing in a wallet / account!

### Connect MetaMask to Rootstock testnet

You can either use the [metamask-landing.rifos.org](https://metamask-landing.rifos.org/) tool to download/install Metamask, and add Rootstock custom network or follow the steps listed below. 

Go to networks -> Custom RPC, and enter the following values:

* Network Name
    `RSK Testnet`
* New RPC URL
    `https://public-node.testnet.rsk.co`
* ChainID (optional)
    `31`
* Symbol (optional)
    `tRBTC`
* Block Explorer URL (optional)
    `https://explorer.testnet.rsk.co`

After configuring it, select the Rootstock Testnet.

![MetaMask screenshot before adding NFT collection](/assets/img/guides/nft/before-importing-nfts.png)

You should now see an account connected to the Rootstock Testnet.
Not to worry if you see "No NFTs yet" under the NFTs tab,
there is one more step before we'll be able to see them!

### Add NFT to Metamask 
    
Once you’re on the Rootstock network, select the “NFTs” tab on the right and add the NFT smart contract address and the ERC-721 token ID of your NFT — which you should be able to find on [Rootstock Testnet Explorer](https://explorer.testnet.rsk.co/) based on the transaction hash from your NFT deployed to Rootstock Testnet.

You may need to refresh the page to see your newly minted NFT.

![MetaMask screenshot after adding NFT collection](/assets/img/guides/nft/after-importing-nft.png)

Congratulations! In this article, we learnt about NFTs, IPFS, Hardhat, and we have successfully created and deployed our NFT project to the Rootstock Testnet.

----

If you would like to delve deeper, here are some resources and tools that we recommend.

**Resources**

- [Visit Our Developers Portal](https://github.com/rsksmart/devportal) 
- [Rootstock Global Discord Community](https://rootstock.io/discord)
- [Rootstock Youtube](https://www.youtube.com/channel/UCYQSvSaqX8Q-XMbQmUG0yJg)