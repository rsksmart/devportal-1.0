---
layout: rsk
title: Using Remix and Metamask with RSK testnet
---

## Using Remix and Metamask with RSK testnet

RSK's virtual machine implementation is compatible with the Ethereum EVM,
we can also use many of Ethereum's developer tools.

In this tutorial I will show you step by step how to use Remix and Metamask, which was builded to Ethereum blockchain, to create and deploy a simple smart contract at RSK testnet network.

### Requirements

- Metamask
- Remix

### Metamask

Metamask is a kind of web wallet which facilitates transactions using yours accounts.
It can be used with RSK networks too.
It has versions for several browsers, like Chrome, Firefox, Opera and Brave.

Go to [metamask.io](https://metamask.io/) and install it.

Create an account.

Write down your seed phrase, or mnemonic, or backup phrase (all these terms mean the same), with 12 words. This is used to recover your account, in case you lose your password.

The seed phrase is the most important thing in a wallet / account!

### Remix

Remix is an online web tool. It is an IDE (Integrated Development Environment) used to write, compile, deploy and debug Solidity code. Can be connected with Metamask and used to deploy smart contracts to both the RSK Testnet and Mainnet.

Can be accessed at [remix.ethereum.org](https://remix.ethereum.org/)


### Connect MetaMask to RSK testnet

- Go to networks 
- Custom RPC

![networks - custom RPC](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-01.png)

- Network Name

RSK Testnet

- New RPC URL

[https://public-node.testnet.rsk.co](https://public-node.testnet.rsk.co)

- ChainID (optional)

31

- Symbol (optional)

R-BTC

- Block Explorer URL (optional)

https://explorer.testnet.rsk.co/


![RSK Testnet configuration](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-02.png)

After configurate it, select the RSK Tesnet network.


### TestNet Faucet

You can get some RSK coins for Testnet at [faucet.testnet.rsk.co](https://faucet.testnet.rsk.co/)

Copy your address from Metamask

![Copy address from Metamask](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-03.png)

Fill your wallet address and pass the CAPTCHA.

Wait a few seconds...

![Wait a few seconds](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-04.png)

![Received some R-BTCs](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-05.png)

You can see the transaction hash, this is my example:

[https://explorer.testnet.rsk.co/tx/0xf63c45dabd52e0b44f4cf15825985e9ddfe790b4323a88a3531f762a417f9011](https://explorer.testnet.rsk.co/tx/0xf63c45dabd52e0b44f4cf15825985e9ddfe790b4323a88a3531f762a417f9011)

Now I have 0.05 RBTC!

![R-BTCs at Metamask wallet](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-06.png)


# Remix

Go to 

[remix.ethereum.org](http://remix.ethereum.org/)

In the home / welcome page, choose environment `Solidity`.

![Remix environment Solidity](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-08.png)

# Remix Connect RSK Testnet

With the RSK network selected at Metamask...

At Remix, on the left side, locate the button `Deploy and run transactions`. 
For now it is the 4th button

![Deploy and run transactions](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-09.png)

At Environment, choose `Injected Web3`

![Injected Web3](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-10.png)

Injected Web3 connects Remix with active account in Metamask

![Injected Web3 - ChainID 31](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-11.png)

ChainID 31 was defined at RSK Testnet custom network in Metamask.
# Create a smart contract

Click at second button on the left side - file explorer 

![file explorer](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-12.png)

Click at + create a new file

![create a new file](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-13.png)

File name: SimpleStorage.sol

![SimpleStorage.sol](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-14.png)

Copy this example:

```shell
pragma solidity >=0.4.0 <0.7.0;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
```

And paste it here:
![SimpleStorage.sol](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-15.png)


### SimpleStorage.sol

This smart contract have:

* A variable storedData to store a number
* A function get() to return the number stored at variable storedData
* A function set() to change the number stored at variable storedData

### Compile a smart contract 

In the 3rd button at left side click on Solidity compiler

![Compile smart contract](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-16.png)

It is useful to enable auto-compile

![enable auto-compile](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-17.png)

![enable auto-compile](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-18.png)

For now click in the button Compile SimpleStorage.sol

![Compile SimpleStorage.sol](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-19.png)

Check the green sign at 3th button with the message compilation successful

![compilation successful](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-20.png)

### Deploy a smart contract at RSK testnet

In the left side panel, go to the button `Deploy and run transactions`. Actually, it is the 4th button.

![Deploy and run transactions](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-21.png)

For now we have only one smart contract, so it is automatically select at dropbox

![SimpleStorage.sol](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-22.png)

Click in the button `Deploy`.

It will open a Metamask popup window, to confirm the transaction to create the smart contract SimpleStorage.sol

![Deploy](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-23.png)

Click on confirm.

At bottom right, we can check the message: `creation of SimpleStorage pending...`

![creation of SimpleStorage pending](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-24.png)


![transaction confirmed](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-25.png)

Once it is confirmed, we can check it

![check the transaction](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-26.png)

Click at transaction line or debug button (at right side) to see more details of transaction:

![transaction details](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-27.png)

Copy the transaction hash to verify at blockchain explorer

![transaction hash](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-28.png)

![transaction hash copied](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-29.png)

Is this example, the transaction hash is: 

0x419c4b17ec0bf59568d9b5f5c7f0e4678039f52b9c644c2914ccd0bd2bb331da


### RSK Explorer

The RSK explorer is the blockchain explorer to RSK transactions. We will use the testnet explorer:

[explorer.testnet.rsk.co](https://explorer.testnet.rsk.co/)

![explorer](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-30.png)

Past the transaction hash at search field, in the top of screen

![search](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-31.png)

![search transaction](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-32.png)

This is the result:

![transaction result](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-33.png)

You can verify my example at link:

[https://explorer.testnet.rsk.co/tx/0x419c4b17ec0bf59568d9b5f5c7f0e4678039f52b9c644c2914ccd0bd2bb331da](https://explorer.testnet.rsk.co/tx/0x419c4b17ec0bf59568d9b5f5c7f0e4678039f52b9c644c2914ccd0bd2bb331da)

### Interact with the smart contract 

When a smart contract is deployed with Remix, we can see it in the left panel in deploy and run transactions:

![deployed contracts](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-34.png)

Click on > to expand SimpleStorage:

![SimpleStorage](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-35.png)

These are the same functions we created in our smart contract!

The orange buttons are functions which will change some information at blockchain, we call it change states. This kind of function spent gas to use it.

The blue buttons are functions which only read functions and it does not change anything on blockchain network. We do not need gas to use it.

### Get

First of all, we will check the value stored at deploy.

Click in the button get

![get](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-36.png)

We do not have any value stored, because we do not define anything at the moment when we deployed.

At bottom right, we can check that it was a call to `SimpleStorage.get()` function:

![transaction get](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-37.png)

## Set

Put a value in the field at the right side of the set button, and click on the button

![value to set](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-38.png)

It will open a Metamask popup window, to confirm the transaction to store a value.

![confirm transaction](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-39.png)

Click in confirm

At bottom right, we can verify that the transaction is pending, waiting confirmation at blockchain:

![transaction status](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-40.png)

After a few seconds, Metamask will show when the transaction is mined!

![transaction mined](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-41.png)

At bottom right, we have the transaction’s details

![transaction details](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-42.png)

You can copy the transaction hash and verify at RSK explorer too:

[https://explorer.testnet.rsk.co/tx/0xb9f4d73e7555d2b3cdf516f2d3044daa58669f7324cb957f2b83da21a6c89b4b](https://explorer.testnet.rsk.co/tx/0xb9f4d73e7555d2b3cdf516f2d3044daa58669f7324cb957f2b83da21a6c89b4b)

![explorer](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-43.png)


### Get (again)

Now we have the value 2020 saved, and we can check it

Click in the button get

![get](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-44.png)

And the value is correct!

### Transactions in Metamask

It is possible to verify all transactions in metamask

![Metamask transactions](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-45.png)

![Metamask transactions](/assets/img/tutorials/remix-and-metamask-with-rsk-testnet/image-46.png)

# Final considerations

Have you thought before that it is so easy to use Remix and Metamask creating a smart contract which can be used at Ethereum ou RSK network?

I showed to you how we can use some tools which was builded to Ethereum blockchain, and it is great to realize that they can be used at RSK network. 

Our goal is to join forces and give options to people who believe in smart contracts based both Ethereum, but also believe in the Bitcoin power, through RSK network.

I hope this tutorial "Using Remix and Metamask with RSK testnet" has been helpful and I'd appreciate any of your feedback. Share it if you like it :)
