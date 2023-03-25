---
layout: rsk
title: Integrate your dApp with RNS
tags: rif, rns, rif-name-service, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
description: Learn how to integrate RNS with your dApp.
---

Surely you want to reserve the name of your dapp now! Search it here

{% include rns-register.html %}


**Content**

*  [Use a compatible wallet](#use-a-compatible-wallet)
*  [Detect user current broswer wallet](#detect-user-current-browser-wallet)
*  [Authenticate users](#authenticate-users)
    *  [With a given domain](#authenticate-with-a-given-domain)
    *  [With reverse lookup](#authenticate-by-detecting-the-domain-with-reverse-operation)
* [Gift subdomains](#gift-subdomains-to-your-users)
    * [Create subdomains under your user's domain](#create-subdomains-under-your-users-domain)
    * [Update a subdomain](#set-a-new-address-for-your-users-domain)
*  [Use domains instead of addresses within your app](#use-domains-instead-of-addresses-within-your-app)

## Use a compatible wallet

  * [Metamask](https://metamask.io/)
  * [Brave](https://brave.com/)
  * If you use another wallet, [here](/develop/apps/wallets/) you may need to perform additional steps.

## Detect user current browser wallet

First of all, let's install the required packages

```bash
npm i web3 @rsksmart/rns
```

Now, let's code! 
If there is a wallet extension, let's enable it so we can interact with the blockchain.

```javascript
if (window.ethereum) {
    const accounts = await window.ethereum.enable();
    const currentAddress = accounts[0];
} else {
    console.error('No wallet extension found!');
}
```

> From this point onward, the code snippets assume that the wallet is already enabled and that the `currentAddress` variable is set.

*Check if the wallet is connected to the proper network*

Is important to confirm that the current blockchain is the one you are expecting.

>Rootstock (RSK) Mainnet ID: 30
>
>Rootstock (RSK) Testnet ID: 31

```javascript
import Web3 from 'web3';
import RNS from '@rsksmart/rns';

const web3Instance = new Web3(window.web3.currentProvider);
const rns = new RNS(web3Instance);

await rns.compose();

const networkId = rns.currentNetworkId;
```

> From now on, we assume that `rns` is already instantiated.

## Authenticate users

### Authenticate with a given domain

If the current user already has a domain, you can authenticate it.
With this approach, we check that the given `domain` owner is the `currentAddress` holder.

```javascript
const owner = await rns.owner(domain);

if (owner == currentAddress) {
    console.log('Success login!');
}
```

> `setOwner()` method is not implemented yet, you can follow its development [here](https://github.com/rnsdomains/rns-js/issues/52)

### Authenticate by detecting the domain with reverse operation

This approach is more complex. What we do here is to check if the `currentAddress` has a [reverse resolution](/rif/rns/architecture/ReverseSuite/) set. In that case, we use the `name` received and check its owner. If the owner of that name is also the `currentAddress`, then the user is authenticated.

```javascript
const name = await rns.reverse(currentAddress);
const owner = await rns.owner(name);

if (owner == currentAddress) {
    console.log(`Success login for ${name}!`);
}
```

## Gift subdomains to your users

As you are the owner of `myapp.rsk`, you are in charge of registering those new subdomains.

There are different approaches to create subdomains under your domain:
* [Create subdomains one by one from the RNS Manager](/rif/rns/operations/register-subdomain/)
* Create multiple subdomains using the [RNS subdomain batch tool](https://github.com/rnsdomains/rns-subdomain-batch) 
* Create a backend in charge of creating subdomains on demand
    * [Example](https://github.com/rnsdomains/rns-subdomain-tool)

## Create subdomains under your user's domain

In order to create a subdomain, the sender should be the owner of the parent domain ([more information](/rif/rns/architecture/registry/)). This allow your users create subdomains under their own domains.

```javascript
const domain = 'alice.myapp.rsk';
const label = 'wallet';
const aliceAddress = await rns.addr('alice.myapp.rsk');
const newAddress = theOneAliceChose;

const createSubdomain = async (domain, label, aliceAddress, address) => {
    return rns.create(domain, label, aliceAddress, address);
}
```

This will create a new domain called `wallet.allice.myapp.rsk` that will point to `address`. The owner of this new domain will be `alice.myapp.rsk`.

> Take in account that `alice.myapp.rsk` should sign the transaction because she is the owner of the parent domain.

## Set a new address for your user's domain

It's really simple to change the address associated with a domain. You just need to make sure that the `currentAddress` is the owner of the domain and copy the method placed below.

```javascript
const setAddressForDomain = async (domain, newAddress) => {
    await rns.setAddr(domain, newAddress);
}
```

> Take in account that this method submits a transaction, so it will spend gas and will prompt the user to sign the transaction using the installed wallet.

## Use domains instead of addresses within your app

A fundamental goal of RNS is to simplify blockchain user experience! Instead of typing addresses, why not let your users type domains? This is so much simpler!

The following code snippet is a method that receives a domain and returns an address. You can use it in your (client-side) dApp inputs, allowing users to enter just domains.

```javascript
const getAddressFromDomain = async (domain) => {
    const address = await rns.addr(domain);
    
    return address;
}
```
