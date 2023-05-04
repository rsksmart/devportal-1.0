---
layout: home
---

# Welcome to Rootstock

The Developer Portal is the home for Rootstock (RSK) documentation for end users and developers. Check out our quickstarts, tutorials, API reference, and code examples.

<div class="features-list">
    <ul id="card-list" class="row">
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/quickstart/">
            <div class="content-container">
                <p class="zg-text-bg card-title">Getting Started</p><span class="zg-label ml-1">1</span>
                <p class="card-desc">SmartBitcoin (RBTC) is linked 1:1 to Bitcoin (1 RBTC = 1 BTC)</p>
            </div>
            </a><div class="btn-container "><a href="/guides/quickstart/">
                </a><a class="green" href="/guides/quickstart/">Read More</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/rsk/node/install">
            <div class="content-container">
                <p class="zg-text-bg card-title bg-yellow">Node Setup </p><span class="zg-label ml-1 bg-yellow">2</span>
                <p class="card-desc">Learn how to set up a Rootstock node.</p>
            </div>
            </a><div class="btn-container"><a href="/rsk/node/install">
                </a><a class="green" href="/rsk/node/install">Read More</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content two-line-title-content"><a href="/ethereum-dapp-to-rsk">
            <div class="content-container">
                <p class="zg-text-bg card-title bg-purple">Smart Contract Development</p><span class="zg-label ml-1 bg-purple">3</span>
                <p class="card-desc">Learn how to port Ethereum projects to Rootstock</p>
            </div>
            </a><div class="btn-container"><a href="/ethereum-dapp-to-rsk">
                </a><a class="green" href="/ethereum-dapp-to-rsk">Read More</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/rif">
            <div class="content-container">
                <p class="zg-text-bg card-title bg-pink">RIF Services</p><span class="zg-label ml-1 bg-pink">4</span>
                <p class="card-desc">Access storage, oracles, naming and CPU services all in one place with the RIF token</p>
            </div>
            </a><div class="btn-container"><a href="/rif">
                </a><a class="green" href="/rif">Read More</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/rif/rns">
            <div class="content-container">
                <p class="zg-text-bg card-title bg-green">Register a Domain</p><span class="zg-label ml-1 bg-green">5</span>
                <p class="card-desc">Learn more about RIF Name Service</p>
            </div>
            </a><div class="btn-container"><a href="/rif/rns">
                </a><a class="green" href="/rif/rns">Read More</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="https://rootstock.io/ambassadors-program/">
            <div class="content-container">
                <p class="zg-text-bg card-title bg-cyan">Become an Ambassador</p><span class="zg-label ml-1 bg-cyan">6</span>
                <p class="card-desc">The Rootstock Ambassadors Program is a community empowerment initiative, designed to promote awareness, educate and drive adoption around RSK and RSK Infrastructure Framework (RIF).</p>
            </div>
            </a><div class="btn-container"><a href="https://rootstock.io/ambassadors-program/">
                </a><a class="green" href="https://rootstock.io/ambassadors-program/">Read More</a>
            </div>
            </div>
        </div>
        </li>
    </ul>
</div>

# What is Rootstock?

Rootstock's full [technology stack](/the-stack) is built on top of bitcoin:
From Rootstock smart contracts
to the Rootstock Infrastructure Framework.
The stack is designed to create a
more fair and inclusive financial system.

![Rootstock Technology Stack - High Level](/assets/img/home/rif-relationship-rootstock-bitcoin.svg)

**Bitcoin**, is a store and transfer of value.
The blockchain is secure because miners
with high infrastructure and energy costs
create the new blocks to be added to the blockchain every 10 minutes.
The more hashing power they provide, the more secure the network is.

**Rootstock** is the first open source smart contract platform that is
powered by the bitcoin network.
Rootstock's goal is to add value and functionality to the
bitcoin ecosystem by enabling smart-contracts,
near instant payments, and higher-scalability.

How Rootstock (RSK) is connected to bitcoin?

## Merged mining with Bitcoin

The first point of contact is through mining.

The bitcoin miners do what is known as
[merged mining](/rsk/architecture/mining/),
securing both networks with the same infrastructure and energy consumption.

<div class="sprite-transform-animation-wrapper rsk-mining">
  <div class="sprite-transform-animation rsk-mining"></div>
</div>

They create blocks on the bitcoin network every 10 minutes,
including transfer of bitcoin from different addresses
and in the process they create new bitcoins.

On Rootstock, blocks are created every 30 seconds,
to secure the execution of smart contracts.
This does not mint any new coins in the process,
but does earn a reward from the merged mining.

Check out [https://rootstock.io/mine-btc-with-rootstock/](https://rootstock.io/mine-btc-with-rootstock/)
to learn more about mining.

## Powpeg with Bitcoin

The second point of contact is the
[Powpeg](/rsk/architecture/powpeg/),
also known as the bridge.

This component connects both networks to allow
the transfer of bitcoins to Rootstock,
thereby allowing developers to interact with smart contracts.
They pay gas using the same bitcoin, the smart bitcoin.

<div class="sprite-transform-animation-wrapper rsk-peg">
  <div class="sprite-transform-animation rsk-peg"></div>
</div>

To do so, you send bitcoin to a special address,
where they are locked in the bitcoin network.
Next, in the same address over in the Rootstock network,
that same bitcoin is released to the user
for use in the Rootstock network.
This is called peg-in.

You can do the reverse operation called peg-out,
by sending your bitcoin to a special address in the Rootstock network,
and receiving your bitcoin back in the bitcoin network.

# Quick Links

<ul>
  <li>Mainnet:
    <a href="https://explorer.rsk.co/" target="_blank">Explorer</a>,
    <a href="https://stats.rsk.co/" target="_blank">Stats</a>
  </li>
  <li>Testnet:
    <a href="https://explorer.testnet.rsk.co/" target="_blank">Explorer</a>,
    <a href="https://stats.testnet.rsk.co/" target="_blank">Stats</a>
   </li>
</ul>
