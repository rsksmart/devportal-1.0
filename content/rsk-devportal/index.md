---
layout: home
---

# Welcome to Rootstock

The Developer Portal is the home for Rootstock documentation for end users and developers. Check out our quickstarts, tutorials, API reference, and code examples.

<div class="features-list">
    <ul id="card-list" class="row">
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/quickstart/">
            <div class="content-container">
               <div class="card-title"><h2 class="zg-text-bg">Getting Started</h2><span class="zg-label ml-1">01</span></div> 
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
              <div class="card-title"><h2 class="zg-text-bg bg-yellow">Node Setup </h2><span class="zg-label ml-1 bg-yellow">02</span></div> 
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
            <div class="card-title"><h2 class="zg-text-bg bg-purple">Smart Contract Dev</h2><span class="zg-label ml-1 bg-purple">03</span></div>
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
               <div class="card-title"><h2 class="zg-text-bg bg-pink">RIF Services</h2><span class="zg-label ml-1 bg-pink">04</span></div> 
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
               <div class="card-title"><h2 class="zg-text-bg bg-green">Register a Domain</h2><span class="zg-label ml-1 bg-green">05</span></div> 
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
               <div class="card-title"><h2 class="zg-text-bg bg-cyan">Become an Ambassador</h2><span class="zg-label ml-1 bg-cyan">06</span></div> 
                <p class="card-desc">A community empowerment initiative, designed to promote awareness, educate and drive adoption around Rootstock and RIF.</p>
            </div>
            </a><div class="btn-container"><a href="https://rootstock.io/ambassadors-program/">
                </a><a class="green" href="https://rootstock.io/ambassadors-program/">Read More</a>
            </div>
            </div>
        </div>
        </li>
    </ul>
</div>

## What is Rootstock?

Rootstock's full [technology stack](/the-stack) is built on top of bitcoin:
From Rootstock smart contracts
to the Rootstock Infrastructure Framework.
The stack is designed to create a
more fair and inclusive financial system.

![Rootstock Technology Stack - High Level](/assets/img/home/rootstock-homepage.svg)

<section >
<div class="row">
  <div class="col two-x-card">
  <div class="header-div">
      <h2 class="zg-text-bg fs-28">Bitcoin</h2><span class="ml-1 zg-label">BTC</span>
  </div>
    <p> Is a store and transfer of value.
The blockchain is secure because miners
with high infrastructure and energy costs
create the new blocks to be added to the blockchain every 10 minutes.
The more hashing power they provide, the more secure the network is.</p>
  </div>
    <div class="col two-x-card">
        <div class="header-div"><h2 class="zg-text-bg bg-pink fs-28">Rootstock</h2><span class="ml-1 zg-label bg-pink">Rootstock</span></div>
    <p> Is the first open source smart contract platform that is
powered by the bitcoin network.
Rootstock's goal is to add value and functionality to the
bitcoin ecosystem by enabling smart-contracts,
near instant payments, and higher-scalability.</p>
  </div>
</div>
</section>

<section>
<h2 class="rsk-tag-wht">How Rootstock is connected to bitcoin?</h2>

<h3 class="fs-48 mb-32">Merged mining with Bitcoin</h3>

The first point of contact is through mining.

The bitcoin miners do what is known as
[merged mining](/rsk/architecture/mining/),
securing both networks with the same infrastructure and energy consumption.


They create blocks on the bitcoin network every 10 minutes,
including transfer of bitcoin from different addresses
and in the process they create new bitcoins.

On Rootstock, blocks are created every 30 seconds,
to secure the execution of smart contracts.
This does not mint any new coins in the process,
but does earn a reward from the merged mining.

Check out [https://rootstock.io/mine-btc-with-rootstock/](https://rootstock.io/mine-btc-with-rootstock/)
to learn more about mining.
</section>
<section>
<h3 class="fs-48 mb-32">Powpeg with Bitcoin</h3>

The second point of contact is the
[Powpeg](/rsk/architecture/powpeg/),
also known as the bridge.

This component connects both networks to allow
the transfer of bitcoins to Rootstock,
thereby allowing developers to interact with smart contracts.
They pay gas using the same bitcoin, the smart bitcoin.


To do so, you send bitcoin to a special address,
where they are locked in the bitcoin network.
Next, in the same address over in the Rootstock network,
that same bitcoin is released to the user
for use in the Rootstock network.
This is called peg-in.

You can do the reverse operation called peg-out,
by sending your bitcoin to a special address in the Rootstock network,
and receiving your bitcoin back in the bitcoin network.
</section>

<hr>

<h3 class="fs-48">Quick Links</h3>

<ul id="ql-list">
  <li><p class="rsk-tag-wht">Mainnet</p><br>
    <a className="btn btn-outline-white btn-outline-white--alt me-3 mb-3 d-inline-flex align-items-center zg-text-sm" target="_blank" rel="noreferrer" href="https://explorer.rsk.co/">
    <img src="./assets/img/home/external.svg"/>Explorer,
    </a>
    <a className="btn btn-outline-white btn-outline-white--alt me-3 mb-3 d-inline-flex align-items-center zg-text-sm" target="_blank" rel="noreferrer" href="https://stats.rsk.co/">
    <img src="./assets/img/home/external.svg"/>Stats
    </a>
  </li>
    <li><p class="rsk-tag-wht">Testnet</p><br>
    <a className="btn ext-link zg-text-sm" target="_blank" rel="noreferrer" href="https://explorer.testnet.rsk.co/">
    <img src="./assets/img/home/external.svg"/>Explorer,
    </a>
    <a className="btn ext-link zg-text-sm" target="_blank" rel="noreferrer" href="https://stats.testnet.rsk.co/">
    <img src="./assets/img/home/external.svg"/>Stats
    </a>
  </li>
</ul>
