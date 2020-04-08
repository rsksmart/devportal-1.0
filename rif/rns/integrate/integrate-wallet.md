---
layout: rsk
title: Integrate your wallet with RNS
tags: rns, wallet, javascript, integrate
---

The first thing you need to do is to register the name of your wallet now! Search for it here:

{% include rns-register.html %}

**Content**

* [Use domains instead of addresses within your wallet](#use-domains-instead-of-addresses-within-your-app)
    * [Use RSK domains](#use-domains-for-rsk-addresses)
    * [User other blockchain domains](#use-domains-in-other-blockchains)
* [Set your users address resolution to domains](#set-address-resolution)
    * [Set RSK address](#set-rsk-addresses)
    * [Set other blockchain address](#set-other-blockchain-addresses)
* [Register subdomains for newcomers](#register-subdomains-for-newcomers)
    * [Check for available subdomains](#check-subdomain-availability)
    * [Different ways to perform registrations](#create-a-backend)
        * [Create a backend that executes registrations](#create-a-backend)
        * [Create a smart contract that gifts subdomains](#develop-a-smart-contract)
        * [Use the batch registration tool](#batch-subdomain-registration)
* [Create more subdomains under a user subdomain](#create-more-subdomains)

<div class="alert alert-info">
    This tutorial has been created to be used with the <a href="/rif/rns/libs/javascript/Getting-started/">RNS JS</a> library. The library needs <a href="https://www.npmjs.com/package/web3">Web3</a> to be instantiated, so if you already use Web3, welcome to the journey!<br />
    If not, don't worry, you are still able to check out our <a href="/rif/rns/architecture/">smart contracts architecture</a> and interact directly with them, it's easy! We are working to port this library for different clients.
</div>

## Use domains instead of addresses within your app

A fundamental goal of RNS is to simplify blockchain user experience! Instead of typing addresses, why not let your users type domains? This is so much simpler!

### Use domains for RSK Addresses

The following code snippet is a method that receives a domain and returns an address. You can use it in your wallet inputs, allowing users to enter domains instead of addresses.

```javascript
const getAddressFromDomain = async (domain) => {
    const address = await rns.addr(domain);
    
    return address;
}
```

### Use domains in other blockchains

You can even use domains on different networks, like Bitcoin, Litecoin, and more! The multi-coin resolution can be integrated as easily as:

```javascript
const getAddressFromDomain = async (domain, coinId) => {
    const address = await rns.addr(domain, coinId);
    
    return address;
}
```

The coin ID should match the one in [SLIP-0044](https://github.com/satoshilabs/slips/blob/master/slip-0044.md).

## Set address resolution

Sometimes a user may choose to change their address, or your wallet may choose to do so for privacy purposes. It is important to keep the domain's address resolution updated.

### Set RSK addresses

Just make sure that the current user address is the owner of the domain, then copy the method placed below.

```javascript
const setAddressForDomain = async (domain, newAddress) => {
    await rns.setAddr(domain, newAddress);
}
```

Take into account that this method submits a transaction, so it will spend some gas.

### Set other blockchain addresses

The implementation of this method in the RNS JS library is in progress, and you can check [its status here](https://github.com/rnsdomains/rns-js/issues/45). If you do not wish to wait, you can interact directly with the contracts. Check out this article about [multichain resolution](/rif/rns/architecture/MultiCryptoResolver/).

## Register subdomains for newcomers

There are several options to register subdomains for your users. The main thing you need to know is that the only payment needed is the transaction fee. Subdomains are **completely free**! The owner of a domain decides when, how, and who receives subdomains.

But before registering a subdomain, you need to make sure that the subdomain is available. Let's code a bit.

**Install dependencies**

```bash
npm i web3 @rsksmart/rns
```

**Instantiate the library**

```javascript
import Web3 from 'web3';
import RNS from '@rsksmart/rns';

const web3Instance = new Web3(web3.currentProvider);
const rns = new RNS(web3Instance);
```

### Check subdomain availability

```javascript
const available = await rns.subdomains.available('mywallet.rsk', 'alice');
```

If the subdomain is available, we can create it. Take a look at these different options:

* [Create a backend that executes registrations](#create-a-backend)
* [Create a smart contract that gifts subdomains](#develop-a-smart-contract)
* [Use the batch registration tool](#batch-subdomain-registration)

#### Create a backend

This method is the simplest one for end users, because you will pay the transaction fees.

Just need to create a service that will register subdomains on demand. It means that once a user creates a wallet, your app will dispatch a request to your server (who hosts a private key with funds) and that server will register domains by sending a transaction to a registrar contract. Check out this [example of the API and contract implementations](https://github.com/rnsdomains/rns-subdomain-tool), which even includes a sample front end.

![](https://i.imgur.com/eFA66Kf.png)

Here's the checklist of the things you should do to complete this solution

- [ ] Register a domain -- [Use the RNS Manager!](https://manager.rns.rifos.org/)
- [ ]  Create the subdomain registrar smart contract, with a whitelist -- [example](https://github.com/rnsdomains/rns-subdomain-tool/blob/master/contracts/registrar/SubdomainRegistrar.sol)
- [ ] Deploy the subdomain registrar, and whitelist the registrant address.
- [ ] Transfer your domain ownership to the contract.
- [ ] Create a backend to support masive registrations! -- [sample here](https://github.com/rnsdomains/rns-subdomain-tool/blob/master/api/app.js)
- [ ] Use that backend from your front end :smile_cat: -- [another sample here](https://github.com/rnsdomains/rns-subdomain-tool/blob/master/public/index.html)

<div class="alert alert-warning">
    Take into account that this solution is a centralized solution, <b>your server is a single point of failure.</b>
</div>

#### Develop a smart contract

This method is fully decentralized, and is oriented towards advanced users because they are in charge of paying the transaction fee.

You just need to develop a registrar smart contract (find an example [here](https://github.com/rnsdomains/rns-subdomain-tool/blob/master/contracts/registrar/SubdomainRegistrar.sol)) that will be the owner of your domain. Thus that contract is the owner, it is allowed to create subdomains under your wallet domain. So, once the user creates a wallet, your app will prompt him/her to create a subdomain by just submitting a transaction.

Here's the checklist of the things you should do to complete this solution

- [ ] Register a domain -- [Use the RNS Manager!](https://manager.rns.rifos.org/)
- [ ] Create an open subdomain registrar smart contract -- [example](https://github.com/rnsdomains/rns-artifacts-deprecated/blob/master/contracts/registrar/SubdomainRegistrar.sol)
- [ ] Deploy the subdomain registrar.
- [ ] Transfer your domain ownership to the contract.
- [ ] Use the smart contract from the front-end :smile_cat:


#### Batch subdomain registration

This solution is more complicated. We have a tool which registers multiple subdomains using fewer transactions, and this incurring lower costs.

This method needs a trigger that will activate the batch subdomain tool. You will also need to store in some place all the subdomains that should be created at the same time. We provide an example of that tool [here](https://github.com/rnsdomains/rns-subdomain-batch).

You will also need to consider on the client side that the delay of this method could be long. Have creativity! We receive all your ideas on how to entertain the user while waiting to publish them in our articles.

![](https://i.imgur.com/kAmhoRC.png)

Here's the checklist of the things you should do to acquire this solution

- [ ] Register a domain -- [Use the RNS Manager!](https://manager.rns.rifos.org/)
- [ ] Create a backend that stores all the subdomains required by the frontend
- [ ] Execute registrations in batch 
    - using the [open source tool](https://rnsdomains.github.io/rns-subdomain-batch/) or
    - by code, here's an [example](https://github.com/rnsdomains/rns-subdomain-batch/tree/master/app).

## Create more subdomains

In order to create a subdomain, the sender should be the owner of the parent domain ([more information](/rif/rns/architecture/registry/)). When you have registered the subdomains for your user, you have decided if the owner of that subdomain was the user or another address. If you gave ownership to the user, so he can create more subdomains from his own. You can help him and provide that service within your wallet by using this code snippet.

```javascript
const domain = 'alice.mywallet.rsk';
const label = 'savings';
const aliceAddress = await rns.addr('alice.mywallet.rsk');
const newAddress = theOneAliceChose;

const createSubdomain = async (domain, label, aliceAddress, address) => {
    return rns.create(domain, label, aliceAddress, address);
}
```

This will create a new domain called `savings.allice.mywallet.rsk` that will point to `address`. The owner of this new domain will be `alice.mywallet.rsk`.

> Take into account that `alice.mywallet.rsk` should sign the transaction because she is the owner of the parent domain.
> If `mywallet.rsk` attempts to sign the transaction, it would fail, because it is not the owner of the parent domain.
