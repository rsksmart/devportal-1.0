---
menu_order: 200
menu_title: Create a Multisig Account
layout: rsk
title: RIF Multisig SDK - creation
description: Multisig account creation
tags: rif, gnosis, multisig
render_features: 'collapsible tables-with-borders'
prevUrl: '/rif/multisig/sdk/'
nextUrl: '/rif/multisig/sdk/policies/'
---

**Required packages**:
- [@rsksmart/safe-factory-sdk](https://github.com/rsksmart/safe-factory-sdk)

There are two ways for creating Multisig accounts:
- Safe Factory
- Manual creation through [Gnosis Safe UI](https://rsk-gnosis-safe.com/#/welcome)

**Important**: all the SDKs and the sample apps described support Safe contracts **v1.2.0** so far.

## SafeFactory
It allows the creation of a safe account using the `ProxyFactory` and the `SafeSingleton` addresses.

**Pre-requirements**:
- [ProxyFactory](https://docs.gnosis.io/safe/docs/contracts_architecture/#5-proxy-factory) contract deployment
- [SafeSingleton](https://docs.gnosis.io/safe/docs/contracts_architecture/#1-transaction-management-core-contract) contract deployment

[](#top "collapsible")
<div class="accordion"><div class="card accordion__rsk"><div id="collapsible-0-header-0" class="card-header"><a class="btn collapsed" data-toggle="collapse" data-target="#collapsible-0-body-0">
        A) Contract addresses deployed on RSK
        <span class="hint"></span></a></div><div id="collapsible-0-body-0" class="collapse" aria-labelledby="collapsible-0-header-0"><div class="card-body"><ul>
            <li>
                Developers interacting with the RSK networks can use the address of the contracts already deployed
                <ul>
                    <li>
                        <h3 class="heading-with-icon" id="mainnet">
                            <a href="#mainnet" class="heading-icon-container">
                                <img id="anchor-icon-template" src="/assets/img/link.svg" alt="MAINNET">
                            </a>
                            MAINNET
                        </h3>
                        <table>
                          <thead>
                            <tr>
                              <th>Contract</th>
                              <th>Address</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>SafeSingleton</td>
                              <td><code>0xc6cfa90ff601d6aac45d8dcf194cf38b91aca368</code></td>
                            </tr>
                            <tr>
                              <td>ProxyFactory</td>
                              <td><code>0x4b1af52ea200baebf79450dbc996573a7b75f65a</code></td>
                            </tr>
                          </tbody>
                        </table>
                    </li>
                    <li>
                        <h3 class="heading-with-icon" id="testnet">
                            <a href="#testnet" class="heading-icon-container">
                                <img src="/assets/img/link.svg" alt="MAINNET">
                            </a>
                            TESTNET
                        </h3>
                        <table>
                          <thead>
                            <tr>
                              <th>Contract</th>
                              <th>Address</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>SafeSingleton</td>
                              <td><code class="highlighter-rouge">0xffd41b816f2821e579b4da85c7352bf4f17e4fa5</code></td>
                            </tr>
                            <tr>
                              <td>ProxyFactory</td>
                              <td><code class="highlighter-rouge">0x5b836117aed4ca4dee8e2e464f97f7f59b426c5a</code></td>
                            </tr>
                          </tbody>
                        </table>
                    </li>
                </ul>
            </li>
        </ul></div></div></div><div class="card accordion__rsk"><div id="collapsible-0-header-1" class="card-header"><a class="btn collapsed" data-toggle="collapse" data-target="#collapsible-0-body-1">
        B) Create a SafeFactory instance
        <span class="hint"></span></a></div><div id="collapsible-0-body-1" class="collapse" aria-labelledby="collapsible-0-header-1"><div class="card-body"><ul class="snippet__parameters snippet__parameters--lightgreen border-bottom-0">
            <li>
                <strong>Parameters</strong>
                <ul>
                    <li>
                        <code>signer: Signer</code> - <a href="https://docs.ethers.io/v5/api/signer/#Signer" rel="external noopener noreferrer" target="_blank">ethers Signer</a>
                    </li>
                    <li>
                        <code>proxyFactoryAddress: str</code> - address of the deployed <a href="https://docs.gnosis.io/safe/docs/contracts_architecture/#5-proxy-factory" rel="external noopener noreferrer" target="_blank">ProxyFactory contract</a>
                    </li>
                    <li>
                        <code>safeSingletonAddress: str</code> - address of the deployed <a href="https://docs.gnosis.io/safe/docs/contracts_architecture/#1-transaction-management-core-contract" rel="external noopener noreferrer" target="_blank">SafeSingleton contract</a>
                    </li>
                </ul>
            </li>
        </ul><div class="gatsby-highlight" data-language="ts"><pre class="language-ts"><code class="language-ts"><span class="token keyword">import</span> <span class="token punctuation">{</span> EthersSafeFactory <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@gnosis.pm/safe-core-sdk'</span> 

<span class="token keyword">const</span> safeFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">EthersSafeFactory</span><span class="token punctuation">(</span>
signer<span class="token punctuation">,</span>
proxyFactoryAddress<span class="token punctuation">,</span>
safeSingletonAddress
<span class="token punctuation">)</span></code></pre></div><blockquote class="mt-3">
<p>If you are working on RSK networks, you can use the contracts already deployed on <a href="#mainnet">MAINNET</a> OR <a href="#testnet">TESTNET</a>.</p>
</blockquote></div></div></div><div class="card accordion__rsk"><div id="collapsible-0-header-2" class="card-header"><a class="btn collapsed" data-toggle="collapse" data-target="#collapsible-0-body-2">
C) Create a Safe
<span class="hint"></span></a></div><div id="collapsible-0-body-2" class="collapse" aria-labelledby="collapsible-0-header-2"><div class="card-body"><ul class="snippet__parameters snippet__parameters--lightgreen border-bottom-0">
<li>
<strong>Parameters</strong>
<ul>
<li>
<code>owners: str[]</code> - list of owner addresses
</li>
<li>
<code>threshold: number</code> - the minimum number of owner approvals required to execute a safe transaction.
</li>
</ul>
</li>
</ul><div class="language-ts snippet__code snippet__code--lightgreen border-top-0">
<div class="gatsby-highlight" data-language="ts"><pre class="language-ts"><code class="language-ts"><span class="token keyword">const</span> safeSdk <span class="token operator">=</span> <span class="token keyword">await</span> safeFactory<span class="token punctuation">.</span><span class="token function">createSafe</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    owners<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'0x1234...'</span><span class="token punctuation">,</span> <span class="token string">'0xabcd...'</span><span class="token punctuation">,</span> <span class="token string">'0x0987...'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    threshold<span class="token operator">:</span> <span class="token number">2</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span></code></pre></div>
</div></div></div></div></div>

For further information on how to set up a safe account and how to choose the right parameters, please refer to the [official guidelines](https://help.gnosis-safe.io/en/articles/4772567-what-gnosis-safe-setup-should-i-use).

## UI

Please refer to the official [Gnosis Safe guide](https://help.gnosis-safe.io/en/articles/3876461-create-a-gnosis-safe-account)
