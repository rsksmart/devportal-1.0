---
layout: rsk
title: Interface Registry
---

Simple Summary
The ERC1820 standard defines a universal registry smart contract where any address (contract or regular account) can register which interface it supports and which smart contract is responsible for its implementation.

Description
This standard defines a registry where smart contracts and regular accounts can publish which functionality they implement---either directly or through a proxy contract.

Anyone can query this registry to ask if a specific address implements a given interface and which smart contract handles its implementation.

This registry MAY be deployed on any chain and shares the same address on all chains.

Interfaces with zeroes (0) as the last 28 bytes are considered ERC165 interfaces, and this registry SHALL forward the call to the contract to see if it implements the interface.

This contract also acts as an ERC165 cache to reduce gas consumption.

Motivation
ERC1820 allows contracts to register interface and query the registry, avoiding miss communications that may result in the loss of funds.
For example on ERC-20 a mistake burns the tokens
Though the ERC-20 token is well-documented and well-implemented overall, the ERC-20 token standard has a bug. This bug has burnt tokens worth millions of US dollars. With the transfer function, you can only send tokens to the EOA account. If you use the “transfer” function, you will see a successful transaction, but the contract will never receive the tokens. This burns the tokens forever, and it can’t be retrieved. By using the wrong function, several users have lost their tokens for good!
The ERC777 solves this problem using ERC1820 and its ERC20 compatible


Links and Information
This is the original EIP
https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1820.md

We have deployed the ERC1820 contract on mainnet
https://explorer.rsk.co/address/0x1820a4b7618bde71dce8cdc73aab6c95905fad24

and testnet
https://explorer.testnet.rsk.co/address/0x1820a4b7618bde71dce8cdc73aab6c95905fad24

The RSKIP is:
https://github.com/rsksmart/RSKIPs/pull/148

Example of other networks implementing it:
https://forum.poa.network/t/just-deployed-the-erc1820-registry-on-xdai/2777

Comparisons between ERC20 and ERC777:
https://hackernoon.com/erc777-is-the-new-token-standard-replacing-the-erc20-fd6319c3b13
https://101blockchains.com/erc20-vs-erc223-vs-erc777/
