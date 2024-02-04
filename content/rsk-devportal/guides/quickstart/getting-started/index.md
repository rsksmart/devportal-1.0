---
menu_order: 600
section_title: Getting Started
menu_title: Table of Contents
layout: rsk
title: 'Rootstock Quick Start Guide | Getting Started'
description: 'Get started with creating a dApps on Rootstock using Hardhat and other tools.'
tags: quick-start, getting-started, guide, how-to, transactions, explorer, bitcoin, rsk, peer-to-peer, merged-mining, blockchain, powpeg
---

Welcome to the world of Web3 development! This guide is designed to smoothly transition Web2 developers into the Web3 ecosystem using the Rootstock network, a unique platform that is EVM (Ethereum Virtual Machine) compatible with Bitcoin's proven security. If you’re a web3 developer, this guide also provides a demo of deploying smart contracts on the Rootstock platform.

As you embark on this journey, the focus is on leveraging the Rootstock network to its fullest potential, showcasing its EVM compatibility, robust decentralization backed by Bitcoin, and notably lower transaction fees.

Whether you have experience with other Web3 development tools or are just stepping into the world of smart contract development, this guide will equip you with the essential knowledge to navigate and utilize Hardhat on the Rootstock network.

## Why This Guide?
This guide enables Web2 developers to get up to speed on Smart contracts and deployment. It focuses on the Rootstock network's unique features and procedures. It aims to provide an understanding of how to build on the Rootstock platform, offering foundational insights into blockchain technology and its practical applications in Web3 development with Hardhat.

Already familiar with Web3 development and solidity and setting up a Hardhat project? You can skip to [Part 2, Section 2](https://docs.google.com/document/d/14753MjSL8kMXDB0vBJ3N-A9g4RO-b23JpZbWW3dOxUA/edit#heading=h.blzhed584kyc) in this guide to configure your Hardhat project for the Rootstock network.
View the [GitHub](https://github.com/jesus-iov/rootstock-quick-start-guide) for the full code and installation.

Let's dive in!

<div class="row features-list">
    <li class="col-xl-6 col-md-6">
        <div class="feature-card">
            <a href="/develop/tutorials/workshop-prereqs/">
                <div class="icon rif h-100">
                    <div class="icon-cont text-center my-auto">
                        <img src="/assets/img/rsk_logo.svg" alt="rsk icon">
                    </div>
                </div>
            </a>
            <div class="content">
                <a href="/develop/tutorials/workshop-prereqs/">
                    <div class="content-container">
                        <p class="card-title rsk_green">Prerequisites</p>
                        <p class="card-desc">Learn about...</p>
                    </div>
                </a>
                <div class="btn-container">
                    <span></span>
                    <a class="green" href="/develop/tutorials/workshop-prereqs/">Learn More</a>
                </div>
            </div>
        </div>
    </li>
    <li class="col-xl-6 col-md-6">
        <div class="feature-card">
            <a href="/guides/quickstart/getting-started/set-up-environment/">
                <div class="icon rif h-100">
                    <div class="icon-cont text-center my-auto">
                        <img src="/assets/img/rsk_logo.svg" alt="rsk icon">
                    </div>
                </div>
            </a>
            <div class="content">
                <a href="/guides/quickstart/getting-started/set-up-environment/">
                    <div class="content-container">
                        <p class="card-title rsk_green">Set Up Your Environment</p>
                        <p class="card-desc">Learn how to...</p>
                    </div>
                </a>
                <div class="btn-container">
                    <span></span>
                    <a class="green" href="/guides/quickstart/getting-started/set-up-environment/">Learn More</a>
                </div>
            </div>
        </div>
    </li>
    <li class="col-xl-6 col-md-6">
        <div class="feature-card">
            <a href="/guides/quickstart/getting-started/create-smart-contract/">
                <div class="icon rif h-100">
                    <div class="icon-cont text-center my-auto">
                        <img src="/assets/img/rsk_logo.svg" alt="rsk icon">
                    </div>
                </div>
            </a>
            <div class="content">
                <a href="/guides/quickstart/getting-started/create-smart-contract/">
                    <div class="content-container">
                        <p class="card-title rsk_green">Create a Smart Contract</p>
                        <p class="card-desc">.....</p>
                    </div>
                </a>
                <div class="btn-container">
                    <span></span>
                    <a class="green" href="/guides/quickstart/getting-started/create-smart-contract/">Learn More</a>
                </div>
            </div>
        </div>
    </li>
    <li class="col-xl-6 col-md-6">
        <div class="feature-card">
            <a href="/guides/quickstart/getting-started/test-smart-contract/">
                <div class="icon rif h-100">
                    <div class="icon-cont text-center my-auto">
                        <img src="/assets/img/rsk_logo.svg" alt="rsk icon">
                    </div>
                </div>
            </a>
            <div class="content">
                <a href="/guides/quickstart/getting-started/test-smart-contract/">
                    <div class="content-container">
                        <p class="card-title rsk_green">Test your Smart Contract</p>
                        <p class="card-desc">....</p>
                    </div>
                </a>
                <div class="btn-container">
                    <span></span>
                    <a class="green" href="/guides/quickstart/getting-started/test-smart-contract/">Learn More</a>
                </div>
            </div>
        </div>
    </li>
    <li class="col-xl-6 col-md-6">
        <div class="feature-card">
            <a href="/guides/quickstart/getting-started/deploy-smart-contract/">
                <div class="icon rif h-100">
                    <div class="icon-cont text-center my-auto">
                        <img src="/assets/img/rsk_logo.svg" alt="rsk icon">
                    </div>
                </div>
            </a>
            <div class="content">
                <a href="/guides/quickstart/getting-started/deploy-smart-contract/">
                    <div class="content-container">
                        <p class="card-title rsk_green">Deploy your Smart Contract</p>
                        <p class="card-desc">....</p>
                    </div>
                </a>
                <div class="btn-container">
                    <span></span>
                    <a class="green" href="/guides/quickstart/getting-started/deploy-smart-contract/">Learn More</a>
                </div>
            </div>
        </div>
    </li>
    <li class="col-xl-6 col-md-6">
        <div class="feature-card">
            <a href="/guides/quickstart/getting-started/debugging-and-troubleshooting/">
                <div class="icon rif h-100">
                    <div class="icon-cont text-center my-auto">
                        <img src="/assets/img/rsk_logo.svg" alt="rsk icon">
                    </div>
                </div>
            </a>
            <div class="content">
                <a href="/guides/quickstart/getting-started/debugging-and-troubleshooting/">
                    <div class="content-container">
                        <p class="card-title rsk_green">Debugging and Troubleshooting Tips</p>
                        <p class="card-desc">....</p>
                    </div>
                </a>
                <div class="btn-container">
                    <span></span>
                    <a class="green" href="/guides/quickstart/getting-started/debugging-and-troubleshooting/">Learn More</a>
                </div>
            </div>
        </div>
    </li>
    <li class="col-xl-6 col-md-6">
        <div class="feature-card">
            <a href="/guides/quickstart/getting-started/integrate-with-frontend/">
                <div class="icon rif h-100">
                    <div class="icon-cont text-center my-auto">
                        <img src="/assets/img/rsk_logo.svg" alt="rsk icon">
                    </div>
                </div>
            </a>
            <div class="content">
                <a href="/guides/quickstart/getting-started/integrate-with-frontend/">
                    <div class="content-container">
                        <p class="card-title rsk_green">Integrate with Front-end Applications</p>
                        <p class="card-desc">....</p>
                    </div>
                </a>
                <div class="btn-container">
                    <span></span>
                    <a class="green" href="/guides/quickstart/getting-started/integrate-with-frontend/">Learn More</a>
                </div>
            </div>
        </div>
    </li>
</div>