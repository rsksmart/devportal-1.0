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
<ul>
    <li>
        A) Contract addresses deployed on RSK
        <ul>
            <li>
                Developers interacting with the RSK networks can use the address of the contracts already deployed
                <ul>
                    <li>
                        <h3>MAINNET</h3>
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
                        <h3>TESTNET</h3>
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
        </ul>  
    </li>
    <li>
        B) Create a SafeFactory instance
        <ul class="snippet__parameters snippet__parameters--lightgreen border-bottom-0">
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
        </ul>
        <div class="snippet__code snippet__code--lightgreen border-top-0">
            <pre>
                <code>
import { EthersSafeFactory } from '@gnosis.pm/safe-core-sdk'

const safeFactory = new EthersSafeFactory(
    signer,
    proxyFactoryAddress,
    safeSingletonAddress
)
                </code>
            </pre>
        </div>
        <blockquote class="mt-3">
            <p>If you are working on RSK networks, you can use the contracts already deployed on <a href="#mainnet">MAINNET</a> OR <a href="#testnet">TESTNET</a>.</p>
        </blockquote>
    </li>
    <li>
        C) Create a Safe
        <ul class="snippet__parameters snippet__parameters--lightgreen border-bottom-0">
            <li>
                <strong>Parameters</strong>
                <ul>
                    <li>
                        <code class="highlighter-rouge">owners: str[]</code> - list of owner addresses
                    </li>
                    <li>
                        <code class="highlighter-rouge">threshold: number</code> - the minimum number of owner approvals required to execute a safe transaction.
                    </li>
                </ul>
            </li>
        </ul>
        <div class="snippet__code snippet__code--lightgreen border-top-0">
            <pre>
                <code>
const safeSdk = await safeFactory.createSafe({
    owners: ['0x1234...', '0xabcd...', '0x0987...'],
    threshold: 2
})
                </code>
            </pre>
        </div> 
    </li>
</ul>

For further information on how to set up a safe account and how to choose the right parameters, please refer to the [official guidelines](https://help.gnosis-safe.io/en/articles/4772567-what-gnosis-safe-setup-should-i-use).

## UI

Please refer to the official [Gnosis Safe guide](https://help.gnosis-safe.io/en/articles/3876461-create-a-gnosis-safe-account)
