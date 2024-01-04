---
menu_order: 200
menu_title: Create
layout: rsk
title: RIF Wallet
render_features: 'collapsible'
---

![RIF Wallet Logo](/assets/img/rif-wallet/logo-rif-wallet.png)

[RIF Wallet](https://rif.technology/rif-wallet/) provides the framework to build an intuitive and secure mobile-first Web3 experience, it uses account abstraction to pay the gas fees with ERC20 tokens using RIF Relay, wallet infrastructure APIs, and libraries. Businesses can now transition its end users into the Web3 ecosystem without all the complexity. 

- Provides a way to pay for gas fees with ERC20 Tokens using [RIF Relay](/rif/relay/)
- 💰 RIF Wallet currently supports: BTC, RBTC, RIF, and other ERC20 tokens. 
- Provides a seamless onboarding for end-users to recover their wallets without needing a seed or recovery phrase or memorize long and complex addresses.

<a href="/rif/wallet/dev-reference/" target="_blank" class="green-button">Start building</a>
<a href="https://rif.technology/rif-wallet/" target="_blank" class="green-button">Download the RIF wallet</a>

## FAQs

Here are some quick solutions to answer your questions.

### General

[](#top "collapsible")
- What is the RIF Wallet?
    > - The [RIF Wallet](https://rif.technology/rif-wallet/) is an open source smart contract wallet which enables businesses to create and deploy fully customizable on-chain wallets using a set of wallet infrastructure APIs and libraries. The wallet features services like the [RIF Relay](https://github.com/rsksmart/rif-relay), for payment of gas fees using ERC20 tokens, [RIF Name Service](https://github.com/rsksmart/rns-manager-react) for sending and receiving crypto using customizable usernames.
- What is RIF Wallet a self-custody wallet and why does it matter?
    > - RIF Wallet is a self-custody wallet, and that means that you, and **only you**, are the only owner and control over your assets, using your private keys. 
    > - If you hold the private keys to your wallet, it means you have full ownership of its funds and can manage as you like. This is the big difference between a custodial and non-custodial wallet. 
    > - In a custodial wallet, you need to request a withdrawal from your account. Then, this custodial exchange will decide whether or not to permit your withdrawal request. 
    > - This is where RIF Wallet as a self-custody wallet comes to play. Your keys, your crypto. You decide what you do and when. 
- What are the benefits of using  RIF Wallet?
    > Bitcoin and Rootstock Compatibility: No need for additional integration, take advantage of bitcoin security while utilizing the smart contract capabilties on Rootstock.
    > - Easily create and deploy a customizable wallet for your end-users, with capabilities such as on-ramp, personalized domain usernames, cheap gas fee transaction and access to ERC-20 tokens in the Rootstock ecosystem.
    > - Technical support and resources throughout the process to ensure all capabilities of the wallet are fully utilized.
    > Easily build a native wallet application on top of a secure set of pre-packaged libraries and APIs. Written in React Native making deployment to iOS and Android a breeze; get up and running in a few hours.
- Can I import my wallet on RIF Wallet?
    > - No, The RIF Wallet uses a smart contract to hold the tokens and assets for a user. While you can use an existing mnemonic in the RIF Wallet App, your address will be different since your assets are in a smart contract not in the EOA wallet.
- How do I fund my wallet?
    > - There are ways you can do this. See [Funding a wallet](/rif/wallet/user-guide/funding-a-wallet/).
- How can I backup my seed phrase or private key?
    > - See the section on [backing up your wallet](/rif/wallet/user-guide/wallet-backup/).
- Can I add custom tokens to my RIF Wallet?
    > - No, the current version of the RIF Wallet App does not support adding custom tokens. To add other tokens, you will need to receive the token in your wallet. Any of the Rootstock addresses in “receive” can be used to receive funds in your wallet. However, the default tokens in the user's wallet are simple to add, any ERC20 tokens received in your wallet appears on default. 
- Can I swap tokens within the RIF Wallet?
    > - The current version of the RIF Wallet does not include swaps as a built-in functionality yet. 
- Why do I need to deploy my wallet?
    > - The RIF Wallet uses a smart contract to hold the tokens and assets for a user. You can deterministically predict what the address of that smart contract will be. This becomes the user’s wallet address. However, the user does need to deploy the smart contract to that address before they can send tokens outside of their wallet. 
- How do I contact the support?
    > - If you run into any problems, [get a free consultation](https://rif.technology/rif-wallet/)  with the RIF Wallet team or [request a product demo](https://share.hsforms.com/1DkKk-EuxRq6BCv-HxmmOmg1noi4).
- What are the requirements to set up a partner's wallet based on RIF's open source? 
    > - We have all the necessary documentation for a proper build and it should not be complicated. In practice, the developer will read the "readme" file, follow the described steps and will be able to build their wallet in a few minutes. However, to set up that environment may take a bit longer time. See the starter kit for instructions on how to quickly set up your environment to start building your wallet.
- Are there any set-up or running costs associated with RIF Wallet?
    > - While there might be infrastructure costs or resource requirements, the set-up and maintenance of RIF Wallet itself do not incur any direct costs. The open-source nature of the wallet allows for efficient implementation without additional financial obligations. 
- What are the risks associated with the RIF Wallet? 
    > - With a self-custodial wallet, security of your assets depends totally on you. 
    If you lose access to your wallet, no one else can restore access. Write down your 12-word phrase or keep it somewhere safe. 
    Self-custody wallets are often related to a more advanced approach, but we are working hard to abstract the complexity as much as we can. 

### For Developers

[](#top "collapsible")
- What is a smart wallet factory?
    > See the [RIF Relay Documentation](/guides/rif-relay/smart-wallets/).
- Why do I see a Backend and RPC URL?
    > - The backend URL and RPC URL is to be used for development purposes. Check the [RIF Wallet Services](https://github.com/rsksmart/rif-wallet-services#readme) and the [RIF wallet](https://github.com/rsksmart/rif-wallet?tab=readme-ov-file#install-and-setup) repo for more information on how these are used.
- How do I know my wallet has been successfully deployed?
    > - You will see a successful deployment notification on-screen if your wallet was deployed successfully. See section on [Deploying a wallet](/rif/wallet/user-guide/deploy-a-wallet/).

