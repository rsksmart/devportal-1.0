---
menu_order: 600
section_title: Getting Started with Hardhat
menu_title: Overview - Introduction to Hardhat
layout: rsk
title: 'Getting Started with Hardhat'
description: 'Get started with creating a dApps on Rootstock using Hardhat and other tools.'
tags: quick-start, getting-started, guide, how-to, transactions, explorer, bitcoin, rsk, rootstock, peer-to-peer, merged-mining, blockchain, powpeg
---

Welcome to the world of Web3 development using Hardhat! 

This guide is designed to smoothly transition Web2 developers into the Web3 ecosystem using the Rootstock network, a unique platform that is EVM (Ethereum Virtual Machine) compatible with Bitcoin's proven security. If you’re a web3 developer, this guide also provides a demo application for deploying smart contracts on the Rootstock platform.

> Are you already familiar with Web3 development and solidity and setting up a Hardhat project? You can skip to the section on [Setting up your environment](/guides/quickstart/hardhat/create-hardhat-project/) in this guide to configure a Hardhat project for the Rootstock network.

> - We made a [GitHub repository](https://github.com/zdaodu-iov/rootstock-quick-start-guide) for this project that has everything you need, including how to set it up. Each stages shows each step of setting up the project. To see different parts of the project, first copy the project to your computer. Then, go through the steps from the beginning to the end. Remember, you can use the file links at each step to try the project yourself.


<div class="features-list">
    <ul id="card-list" class="row">
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/develop/tutorials/workshop-prereqs/">
            <div class="content-container">
               <div class="card-title"><h2 class="zg-text-bg">Prerequisites</h2><span class="zg-label ml-1">01</span></div> 
                <p class="card-desc">Learn about the tools you need to have in place to follow along with this guide.</p>
            </div>
            </a><div class="btn-container "><a href="/develop/tutorials/workshop-prereqs/">
                </a><a class="green" href="/develop/tutorials/workshop-prereqs/">View the Prerequisites</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/quickstart/hardhat/create-hardhat-project/">
            <div class="content-container">
              <div class="card-title"><h2 class="zg-text-bg bg-yellow">Create Hardhat Project</h2><span class="zg-label ml-1 bg-yellow">02</span></div> 
                <p class="card-desc">Learn how to set up your environment for development using Hardhat</p>
            </div>
            </a><div class="btn-container"><a href="/guides/quickstart/hardhat/create-hardhat-project/">
                </a><a class="green" href="/guides/quickstart/hardhat/create-hardhat-project/">Setup Environment</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/quickstart/hardhat/configure-hardhat/">
            <div class="content-container">
               <div class="card-title"><h2 class="zg-text-bg bg-yellow">Configure Hardhat for Rootstock</h2><span class="zg-label ml-1 bg-yellow">03</span></div> 
                <p class="card-desc">Learn how to configure your Hardhat project for development on Rootstock testnet and mainnet.</p>
            </div>
            </a><div class="btn-container"><a href="/guides/quickstart/hardhat/configure-hardhat/">
                </a><a class="green" href="/guides/quickstart/hardhat/configure-hardhat/">View the libraries</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content two-line-title-content"><a href="/guides/quickstart/hardhat/write-smart-contract/">
            <div class="content-container">
            <div class="card-title"><h2 class="zg-text-bg bg-purple">Write Smart Contracts</h2><span class="zg-label ml-1 bg-purple">04</span></div>
                <p class="card-desc">Learn how to create a smart contract on the Rootstock network</p>
            </div>
            </a><div class="btn-container"><a href="/guides/quickstart/hardhat/write-smart-contract/">
                </a><a class="green" href="/guides/quickstart/hardhat/write-smart-contract/">Get Started</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/quickstart/hardhat/test-smart-contract/">
            <div class="content-container">
               <div class="card-title"><h2 class="zg-text-bg bg-pink">Test Smart Contracts</h2><span class="zg-label ml-1 bg-pink">05</span></div> 
                <p class="card-desc">Learn how to test your smart contract to ensure it's working as expected.</p>
            </div>
            </a><div class="btn-container"><a href="/guides/quickstart/hardhat/test-smart-contract/">
                </a><a class="green" href="/guides/quickstart/hardhat/test-smart-contract/">Start Testing</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/quickstart/hardhat/deploy-smart-contract/">
            <div class="content-container">
               <div class="card-title"><h2 class="zg-text-bg bg-green">Deploy Smart Contracts</h2><span class="zg-label ml-1 bg-green">06</span></div> 
                <p class="card-desc">Learn how to deploy your smart contract on your local environment</p>
            </div>
            </a><div class="btn-container"><a href="/guides/quickstart/hardhat/deploy-smart-contract/">
                </a><a class="green" href="/guides/quickstart/hardhat/deploy-smart-contract/">Start Deployment</a>
            </div>
            </div>
        </div>
        </li>
<li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/quickstart/hardhat/integrate-frontend/">
            <div class="content-container">
               <div class="card-title"><h2 class="zg-text-bg bg-cyan">Integrate with Frontend</h2><span class="zg-label ml-1 bg-cyan">07</span></div> 
                <p class="card-desc">Learn how to integrate your smart contract with a front-end application.</p>
            </div>
            </a><div class="btn-container"><a href="/guides/quickstart/hardhat/integrate-frontend/">
                </a><a class="green" href="/guides/quickstart/hardhat/integrate-frontend/">Start interacting</a>
            </div>
            </div>
        </div>
        </li>
        <li class="col-xl-6 col-md-6">
        <div class="feature-card">
<div class="content"><a href="/guides/quickstart/hardhat/debugging-and-troubleshooting/">
            <div class="content-container">
               <div class="card-title"><h2 class="zg-text-bg bg-cyan">Debugging and Troubleshooting Tips</h2><span class="zg-label ml-1 bg-cyan">08</span></div> 
                <p class="card-desc">Learn about the common issues you can come across while building following this guide and how you can solve them.</p>
            </div>
            </a><div class="btn-container"><a href="/guides/quickstart/hardhat/debugging-and-troubleshooting/">
                </a><a class="green" href="/guides/quickstart/hardhat/debugging-and-troubleshooting/">Learn how to Debug</a>
            </div>
            </div>
        </div>
        </li>
    </ul>
</div>