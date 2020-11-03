---
layout: rsk
title: RIF Token
tags: rif, token, erc677
description: "Information about the RIF token, where to obtain it, how to transfer it, and technical details on its token standard"
---

The RIF Token allows any token holder to consume the services that are compatible with the [RIF architecture](/rif/).

## RIF (RIF Token in Mainnet)

<table class="table">
  <tbody>
    <tr>
      <td scope="row">Token Name</td>
      <td><a href="https://coinmarketcap.com/currencies/rsk-infrastructure-framework/" target="_blank">RIF</a></td>
    </tr>
    <tr>
      <td scope="row">Total Supply</td>
      <td>1,000,000,000 RIF</td>
    </tr>
    <tr>
      <td scope="row">Contract Address</td>
      <td><a href="http://explorer.rsk.co/address/0x2acc95758f8b5f583470ba265eb685a8f45fc9d5" target="_blank">0x2acc95758f8b5f583470ba265eb685a8f45fc9d5</a></td>
    </tr>
    <tr>
      <td scope="row">Contract Type</td>
      <td>ERC677</td>
    </tr>
    <tr>
      <td scope="row">How to get</td>
      <td>
        <ul>
            <li><a href="#exchanges" target="_blank">Exchanges</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td scope="row">Logo</td>
      <td>
        <img src="/assets/img/rif/rif-logo.png" style="border: 2px solid black; width: 200px; height: 200px; background: white;" />
        <a href="/assets/img/rif/rif-logo.png" target="_blank">rif-logo.png</a>
      </td>
    </tr>
  </tbody>
</table>

## tRIF (RIF Token in Testnet)

<table class="table">
  <tbody>
    <tr>
      <td scope="row">Token Name</td>
      <td>tRIF</td>
    </tr>
    <tr>
      <td scope="row">Total Supply</td>
      <td>1,000,000,000 tRIF</td>
    </tr>
    <tr>
      <td scope="row">Contract Testnet Address</td>
      <td><a href="http://explorer.testnet.rsk.co/address/0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE" target="_blank">0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE</a></td>
    </tr>
    <tr>
      <td scope="row">Contract Type</td>
      <td>ERC677</td>
    </tr>
    <tr>
      <td scope="row">How to get</td>
      <td>
        <ul>
            <li><a href="https://faucet.rifos.org/" target="_blank">Faucet</a></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

## Wallets

See [supported wallets](/wallet/use/).

## Exchanges

<div class="owl-carousel owl-theme">
  <div class="item" style="width: 275px;">
    <div class="item">
      <a href="https://www.bitfinex.com/" rel="nofollow noopener noreferrer" target="_blank">
        <img src="https://www.rifos.org/assets/img/exchanges/bitfinex-1.png" alt="bitfinex" class="img-fluid usecase-logo">
      </a>
    </div>
  </div>
  <div class="item" style="width: 275px;">
  <div class="item">
    <a href="https://www.coinbene.com/" rel="nofollow noopener noreferrer" target="_blank">
      <img src="https://www.rifos.org/assets/img/exchanges/coinbene-blue.png" alt="coinbene" class="img-fluid usecase-logo">
    </a>
    </div>
  </div>
  <div class="item" style="width: 275px;">
    <div class="item">
      <a href="https://www.cashierest.com/" rel="nofollow noopener noreferrer" target="_blank">
        <img src="https://www.rifos.org/assets/img/exchanges/cachierest.png" alt="cachierest" class="img-fluid usecase-logo">
      </a>
    </div>
  </div>
  <div class="item" style="width: 275px;">
    <div class="item">
      <a href="https://www.hotbit.io/" rel="nofollow noopener noreferrer" target="_blank">
        <img src="https://www.rifos.org/assets/img/exchanges/hotbit.png" alt="Hotbit" class="img-fluid usecase-logo">
      </a>
    </div>
  </div>
  <div class="item" style="width: 275px;">
    <div class="item">
      <a href="https://www.mxc.com/" rel="nofollow noopener noreferrer" target="_blank">
        <img src="https://www.rifos.org/assets/img/exchanges/MXC.png" alt="MXC" class="img-fluid usecase-logo">
      </a>
    </div>
  </div>
  <div class="item" style="width: 275px;">
    <div class="item">
      <a href="https://www.kucoin.com/" rel="nofollow noopener noreferrer" target="_blank">
        <img src="https://www.rifos.org/assets/img/exchanges/logo_kucoin.png" alt="kucoin" class="img-fluid usecase-logo">
      </a>
    </div>
  </div>
  <div class="item" style="width: 275px;">
    <div class="item">
      <a href="https://www.coinall.com/" rel="nofollow noopener noreferrer" target="_blank">
        <img src="https://www.rifos.org/assets/img/exchanges/logo_coinall.png" alt="Coinall" class="img-fluid usecase-logo">
      </a>
    </div>
  </div>
  <div class="item" style="width: 275px;">
    <div class="item">
      <a href="https://www.bithumb.pro/" rel="nofollow noopener noreferrer" target="_blank">
        <img src="https://www.rifos.org/assets/img/exchanges/Bithumb-Global-LOGO_black.png" alt="Bithumb-Global" class="img-fluid usecase-logo">
      </a>
    </div>
  </div>
  <div class="item" style="width: 275px;">
    <div class="item">
      <a href="https://www.liquid.com/buy-bitcoin/" rel="nofollow noopener noreferrer" target="_blank">
        <img src="https://www.rifos.org/assets/img/exchanges/LiquidLogo.jpg" alt="Liquid" class="img-fluid usecase-logo">
      </a>
    </div>
  </div>
</div>

## Technical information

### ERC677 token standard

An [ERC20](https://github.com/ethereum/EIPs/issues/20)
token transaction between a regular/non-contract address and contract are two different transactions: You should call `approve` on the token contract and then call `transferFrom` on the other contract when you want to deposit your tokens into it.

[ERC677](https://github.com/ethereum/EIPs/issues/677)
simplifies this requirement and allows using the same transfer function. ERC677 tokens can be sent by calling `transfer` function on the token contract with no difference if the receiver is a contract or a wallet address, since there is a new way to notify the receiving contract of the transfer.

An ERC677 token transfer will be the same as an ERC20 transfer. On the other hand, if the receiver is a contract, then the ERC677 token contract will try to call `tokenFallback` function on receiver contract. If there is no `tokenFallback` function on receiver contract, the transaction will fail.

### RIF transfer methods

- Approve and transfer:
    ```js
    function approve(address _spender, uint256 _value) public returns (bool)
    function transfer(address _to, uint256 _value) public returns (bool)
    ```

- Transfer and call:
    ```js
    function transfer(address _to, uint256 _value, bytes data)
    ```

    **Parameters**
    - `_to: address`: Contract address.
    - `_value: uint256`: Amount of RIF tokens to send.
    - `data: bytes`: 4-byte signature of the function to be executed, followed by the function parameters to be executed with encoded as a byte array.
