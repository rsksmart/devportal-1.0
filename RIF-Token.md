---
layout: rns
title: RIF Token
---

RIF Name Service (RNS) implements the RIF Directory Protocol (RDP) which recommends the usage of the RIF Token to stake at name auctions and also paying for name maintenance rent.

To interact with RNS, it's important to understand the nature of the RIF Token.


<table class="table">
  <tbody>
    <tr>
      <td scope="row">Token Name</td>
      <td>RIF</td>
    </tr>
    <tr>
      <td scope="row">Total Supply</td>
      <td>1,000,000,000 tRIF</td>
    </tr>
    <tr>
      <td scope="row">Contract Address</td>
      <td><a href="http://explorer.rsk.co/address/0x2acc95758f8b5f583470ba265eb685a8f45fc9d5" target="_blank">0x2acc95758f8b5f583470ba265eb685a8f45fc9d5</a></td>
    </tr>
    <tr>
      <td scope="row">Contract Type</td>
      <td>ERC677</td>
    </tr>
  </tbody>
</table>

> <a href="/RNS-Testnet#trif">Testnet version</a>

## ERC677 token standard

An ERC20 token transaction between a regular/non-contract address and contract are two different transactions: You should call approve on the token contract and then call transferFrom on the other contract when you want to deposit your tokens into it.

ERC677 simplifies this requirement and allows using the same transfer function. ERC677 tokens can be sent by calling transfer function on the token contract with no difference if the receiver is a contract or a wallet address, since there is a new way to notify the receive contract of the transfer.

An ERC677 token transfer will be the same as an ERC20 transfer. On the other hand, if the receiver is a contract, then the ERC677 token contract will try to call `tokenFallback` function on receiver contract. If there is no `tokenFallback` function on receiver contract, the transaction will fail.

## RIF transfer methods

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

As explained in the [Registrar](/Architecture/Registrar) section, both **bid submission** and **rent payment** can be executed through the ERC677 transfer methods.
