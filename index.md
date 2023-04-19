---
layout: home
title: Welcome to RSK
---

# Welcome to RSK

The Developer Portal is the home for RSK documentation for end users and developers. Check out our quickstarts, tutorials, API reference, and code examples.

<div class="features-list">
    <ul id="card-list" class="row">
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
            <a href="/guides/quickstart/">
            <div class="icon started h-100">
            <div class="icon-cont text-center my-auto">
            <img src="/assets/img/features/started-icon.png" alt="started icon">
            </div>
            </div>
            </a><div class="content"><a href="/guides/quickstart/">
            <div class="content-container">
                <p class="card-title rsk_green">Getting Started</p>
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
            <a href="/rsk/node/install">
            <div class="icon node h-100">
            <div class="icon-cont text-center my-auto">
            <img src="/assets/img/features/node-icon.png" alt="started icon">
            </div>
            </div>
            </a><div class="content"><a href="/rsk/node/install">
            <div class="content-container">
                <p class="card-title rsk_green">Node Setup </p>
                <p class="card-desc">Learn how to set up a RSK node.</p>
            </div>
            </a><div class="btn-container"><a href="/rsk/node/install">
                </a><a class="green" href="/rsk/node/install">Read More</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
            <a href="/ethereum-dapp-to-rsk">
            <div class="icon smart h-100">
            <div class="icon-cont text-center my-auto">
            <img src="/assets/img/features/contract-icon.png" alt="started icon">
            </div>
            </div>
            </a><div class="content two-line-title-content"><a href="/ethereum-dapp-to-rsk">
            <div class="content-container">
                <p class="card-title rsk_green">Smart Contract Development</p>
                <p class="card-desc">Learn how to port Ethereum projects to RSK</p>
            </div>
            </a><div class="btn-container"><a href="/ethereum-dapp-to-rsk">
                </a><a class="green" href="/ethereum-dapp-to-rsk">Read More</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
            <a href="/rif">
            <div class="icon rif h-100">
            <div class="icon-cont text-center my-auto">
            <img src="/assets/img/features/rif-icon.png" alt="started icon">
            </div>
            </div>
            </a><div class="content"><a href="/rif">
            <div class="content-container">
                <p class="card-title rsk_green">RIF Services</p>
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
            <a href="/rif/rns">
            <div class="icon domain h-100">
            <div class="icon-cont text-center my-auto">
            <img src="/assets/img/features/domain-icon.png" alt="started icon">
            </div>
            </div>
            </a><div class="content"><a href="/rif/rns">
            <div class="content-container">
                <p class="card-title rsk_green">Register a Domain</p>
                <p class="card-desc">Learn more about RSK Name Service</p>
            </div>
            </a><div class="btn-container"><a href="/rif/rns">
                </a><a class="green" href="/rif/rns">Read More</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
            <a href="https://ambassadors.rsk.co/">
            <div class="icon tools h-100">
            <div class="icon-cont text-center my-auto">
            <img src="/assets/img/features/contract-icon.png" alt="started icon">
            </div>
            </div>
            </a><div class="content"><a href="https://ambassadors.rsk.co/">
            <div class="content-container">
                <p class="card-title rsk_green">Become an Ambassador</p>
                <p class="card-desc">The RSK Ambassadors Program is a community empowerment initiative, designed to promote awareness, educate and drive adoption around RSK and RSK Infrastructure Framework (RIF).</p>
            </div>
            </a><div class="btn-container"><a href="https://ambassadors.rsk.co/">
                </a><a class="green" href="https://ambassadors.rsk.co/">Read More</a>
            </div>
            </div>
        </div>
        </li>
    </ul>
</div>

# What is RSK?

RSK's full [technology stack](/the-stack) is built on top of bitcoin:
From RSK smart contracts
to the RSK Infrastructure Framework.
The stack is designed to create a
more fair and inclusive financial system.

![RSK Technology Stack - High Level](/assets/img/home/rsk-tech-stack-high-level.png)

**Bitcoin**, is a store and transfer of value.
The blockchain is secure because miners
with high infrastructure and energy costs
create the new blocks to be added to the blockchain every 10 minutes.
The more hashing power they provide, the more secure the network is.

**RSK** is the first open source smart contract platform that is
powered by the bitcoin network.
RSK's goal is to add value and functionality to the
bitcoin ecosystem by enabling smart-contracts,
near instant payments, and higher-scalability.

How RSK is connected to bitcoin?

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

On RSK, blocks are created every 30 seconds,
to secure the execution of smart contracts.
This does not mint any new coins in the process,
but does earn a reward from the merged mining.

Check out [mining.rsk.co](https://mining.rsk.co/)
to learn more about mining.

## Powpeg with Bitcoin

The second point of contact is the
[Powpeg](/rsk/architecture/powpeg/),
also known as the bridge.

This component connects both networks to allow
the transfer of bitcoins to RSK,
thereby allowing developers to interact with smart contracts.
They pay gas using the same bitcoin, the smart bitcoin.

<div class="sprite-transform-animation-wrapper rsk-peg">
  <div class="sprite-transform-animation rsk-peg"></div>
</div>

To do so, you send bitcoin to a special address,
where they are locked in the bitcoin network.
Next, in the same address over in the RSK network,
that same bitcoin is released to the user
for use in the RSK network.
This is called peg-in.

You can do the reverse operation called peg-out,
by sending your bitcoin to a special address in the RSK network,
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
