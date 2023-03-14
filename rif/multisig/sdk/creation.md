---
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
                        <h3 class="heading-with-icon" id="testnet"><a href="#testnet" class="heading-icon-container"><svg id="anchor-icon-template" width="20" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 31.891 31.891" style="display: none;"><g style="fill: white;"><path d="M30.543,5.74l-4.078-4.035c-1.805-1.777-4.736-1.789-6.545-0.02l-4.525,4.414c-1.812,1.768-1.82,4.648-0.02,6.424 l2.586-2.484c-0.262-0.791,0.061-1.697,0.701-2.324l2.879-2.807c0.912-0.885,2.375-0.881,3.275,0.01l2.449,2.42 c0.9,0.891,0.896,2.326-0.01,3.213l-2.879,2.809c-0.609,0.594-1.609,0.92-2.385,0.711l-2.533,2.486 c1.803,1.781,4.732,1.789,6.545,0.02l4.52-4.41C32.34,10.396,32.346,7.519,30.543,5.74z"></path><path d="M13.975,21.894c0.215,0.773-0.129,1.773-0.752,2.381l-2.689,2.627c-0.922,0.9-2.414,0.895-3.332-0.012l-2.498-2.461 c-0.916-0.906-0.91-2.379,0.012-3.275l2.691-2.627c0.656-0.637,1.598-0.961,2.42-0.689l2.594-2.57 c-1.836-1.811-4.824-1.82-6.668-0.02l-4.363,4.26c-1.846,1.803-1.855,4.734-0.02,6.549l4.154,4.107 c1.834,1.809,4.82,1.818,6.668,0.018l4.363-4.26c1.844-1.805,1.852-4.734,0.02-6.547L13.975,21.894z"></path><path d="M11.139,20.722c0.611,0.617,1.611,0.623,2.234,0.008l7.455-7.416c0.621-0.617,0.625-1.615,0.008-2.234 c-0.613-0.615-1.611-0.619-2.23-0.006l-7.457,7.414C10.529,19.103,10.525,20.101,11.139,20.722z"></path></g></svg></a>TESTNET</h3>
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
