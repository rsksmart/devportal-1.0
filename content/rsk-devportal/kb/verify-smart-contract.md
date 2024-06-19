---
# menu_order: 1800
menu_title: Verify Smart Contracts
title: 'Verify and Deploy Smart Contracts on RSK Block Explorer | Rootstock (RSK)'
description: 'Learn how to verify a smart contract using the RSK Block Explorer'
tags: knowledge-base, rskj, rsk, node, blockchain, developers, block-explorer
layout: 'rsk'
---

Smart contracts are a means to execute code and store data on a blockchain.
To understand how smart contracts work, read [What is a Smart Contract?](https://developers.rsk.co/guides/full-stack-dapp-on-rsk/part1-overview/#what-is-a-smart-contract)

Source code verification provides **transparency** for users interacting with smart contracts. By uploading the source code, a block explorer will match the compiled code with that on the blockchain. 

Once verified, a smart contract or token contract's source code becomes publicly **visible** and thus independently verifiable. This creates transparency and trust.
It also makes it more convenient for other developers to interact with your smart contracts.

In this tutorial, we will verify a smart contract, using the following steps:

1. Connect metamask to RSK Explorer
2. Get tRBTC using the RSK faucet
3. Use remix compile and deploy the Smart Contract at RSK testnet
4. Verify the Smart Contract on the RSK Explorer

## Getting started

To connect Metamask to RSK Testnet, compile and deploy a smart contract, follow the steps in [Using remix and metamask with RSK Testnet](https://developers.rsk.co/tutorials/ethereum-devs/remix-and-metamask-with-rsk-testnet/)

As mentioned in the steps above, this is the smart contract below we will compile and deploy, it is called `SimpleStorage.sol` which has:

- A variable `storedData` to store a number
- A function `get()` to return the number stored at variable `storedData`
- A function `set()` to change the number stored at variable `storedData`

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Contract {
     uint public x;

     constructor (uint _x)public{
        x = _x;
    }

    function increment() external {
        x++;
    }

    function add(uint one) external view returns(uint){
        // return the state variable
        return x + one;
    }
}
```

**Prepare the compiler settings in Remix**

In Remix, ensure that the compiler setting used for the contract is same as the one in Remix. In this tutorial, we used version `0.8.7` of the Solidity compiler, `solc`. 

You do this by clicking on the solidity icon by the left navigation in remix, and selecting the compiler version, this looks something like: `0.8.7+commit.e28d00a7` in the dropdown menu.

![Compiler settings](/assets/img/kb/verify-smart-contract/compiler-settings.png)

> Note that the exact version of the compiler,
> plus the other details here are critical during verification.
> We'll use this later.

## Verifying the smart contract

Upon contract creation, you will receive an address to check a pending transaction. Visit the [RSK Explorer](https://explorer.testnet.rsk.co/) and paste the transaction hash into the search field.

In this article, we'll use the transaction hash:
`0x843c7fc61ef2d678b36bb6662f610426a60ca484443231c3347c1896e03dfd49` 

![Tx Hash](/assets/img/kb/verify-smart-contract/tx-hash.png)

To verify the smart contract, we need to locate the contract address, to do this, scroll down to find the contract address.

![Show contract address](/assets/img/kb/verify-smart-contract/show-contract-address.png)

Click on this address to open up the contract details.

![Contract details](/assets/img/kb/verify-smart-contract/contract-details.png)

Click on `Code`

![Code view](/assets/img/kb/verify-smart-contract/code-view.png)

This shows the bytecode for the contract.

If another developer sees this,
they are unlikely to be able to interact with your smart contract,
as this is **not human readable**.
Let's improve this by performing verification.

> Smart contract code is usually written in a high level programming language such as Solidity.
> This code gets compiled to something called the bytecode which gets deployed to the RSK blockchain.
> The nodes that comprise the RSK blockchain network execute this bytecode.
> What is actually stored on the blockchain is **not** the original code written in Solidity,
> but rather this compiler output.

Click on `Verify Contract`

![Verify contract](/assets/img/kb/verify-smart-contract/verify-contract.png)

Fill in the details below, enter contract name, upload the source file called `SimpleStorage.sol`.

![Verify contract details](/assets/img/kb/verify-smart-contract/verify-contract-details.png)

Check that the compiler version matches the version selected in remix, as shown in the images below;

![Compiler settings - remix](/assets/img/kb/verify-smart-contract/compiler-settings-remix.png)

![Compiler settings - explorer](/assets/img/kb/verify-smart-contract/compiler-settings-explorer.png)

Fill other info, such as constructor arguments, libraries, and EVM encoded arguments (if available).

> Note that the `SimpleStorage.sol` smart contract
> does not have any constructor arguments, so this is left blank.

Click on `Verify`.

![Verify contract button](/assets/img/kb/verify-smart-contract/verify-contract-button.png)

![Verification in progress](/assets/img/kb/verify-smart-contract/verification-in-progress.png)

Contract successfully verified.

![Successful verification prompt](/assets/img/kb/verify-smart-contract/verification-successful.png)

Once contract is successfully verified, click on "go to contract page". You'll notice a checkmark is now present beside **Code** which wasn't there previously.

![Code checkmark](/assets/img/kb/verify-smart-contract/code-checkmark.png)

You can click on it to see more details of the contract.

![Contract details](/assets/img/kb/verify-smart-contract/contract-details2.png)

You'll also be able to see the compiler settings.

![Compilation settings](/assets/img/kb/verify-smart-contract/compilation-settings.png)

Congratulations, you have successfully verified a smart contract on the RSK Block Explorer. To see a live example check out the one used in this article:
[`0x111b836d63e507a45dee556b10aa17ef16d423ae`](https://explorer.testnet.rsk.co/address/0x111b836d63e507a45dee556b10aa17ef16d423ae?__ctab=Code).

----
## Resources

- [Verify Smart Contracts with SolidityScan](https://blog.rootstock.io/noticia/rootstock-guide-to-verifying-smart-contracts-with-solidityscan/)
- [Tools](/tools/)
- [Verify Smart Contracts using Hardhat Verify Plugin for Rootstock](/kb/hardhat-verify-plugin/)