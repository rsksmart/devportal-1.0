---
layout: rsk
title: Using geth attach to a RSK local node
tags: tutorial, rsk, geth
description: "How to use the Ethereum client Geth to attach to a RSK local node (regtest) and run JSON-RPC commands."
---

RSK's virtual machine implementation is compatible with the Ethereum virtual machine (EVM), which enables us to make use of many Ethereum developer tools.

In this tutorial I will show you step by step how to use the Ethereum client Geth to attach to a RSK local node (which is called regtest) and run a few JSON-RPC commands. 
We do this to establish that the local node is running.

## Overview

We will do this steps:

1. Install the requirements: Java SDK, RSK local node and Geth;
2. Do a Geth attach;
3. Check if the node is running;
4. Know some useful functions;
5. Learn how to interact with accounts: list, create;
6. Transfer funds between accounts.

## Requirements

- Java JDK
- RSK local node
- Geth

### Installing Java JDK

First check if you already have Java installed:

```shell
java -version
```

Go to [Java Download](https://www.java.com/en/download/) if you need to install it:

![Java Download](/assets/img/tutorials/geth-attach-local-node/image-01.png)

### Installing RSK local Node

There are several different ways to set up a RSK node. Here we will download and run a JAR file, and run it using the Java SDK that has been installed.

#### Download 

Go to the [releases page](https://github.com/rsksmart/rskj/releases) and click on the most recent to download it.

You need to click on the JAR file, in the end of the post about the lastest release. 
It's name should be `rskj-core-*.jar`:

![Download last RSK release](/assets/img/tutorials/geth-attach-local-node/image-02.png)

#### Run 

To run the node:

```shell
java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --regtest
```

(Replace <PATH-TO-THE-RSKJ-JAR> with your path to the JAR file). 
I am using a Windows OS and I saved the file at C:\RSK\node, so for me the full path is  `C:\RSK\node\rskj-core-1.3.0-WASABI-all.jar`

The commands required to  run the RSK node are:

#### On Windows
```shell
java -cp C:\RSK\node\rskj-core-1.3.0-WASABI-all.jar co.rsk.Start --regtest
```

#### On Linux and Mac
```shell
java -cp C:/RSK/node/rskj-core-1.3.0-WASABI-all.jar co.rsk.Start --regtest
```

If you do not have any output after running the command, this usually means that the node is running successfully. We will confirm this in the next step.

![Run local node](/assets/img/tutorials/geth-attach-local-node/image-03.png)

**Important:**

> Do not close this terminal / console window. The node is running here, and if you close, you will stop it.

### Check if the node is running (curl)

Open a new terminal window. 

Issue a request to the node's RPC HTTP server. This is an example using cURL:

```shell
curl localhost:4444/1.1.0/ -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

The response should look similar to:

```shell
{"jsonrpc":"2.0","id":1,"result":"0xfc0"}
```

, where the result property is the number of the latest block that has been synced. Note that this value is in hexadecimal, so the output above indicates that the current block number is 4032.

To get more information about this process: 

[https://developers.rsk.co/rsk/node/install/java/](https://developers.rsk.co/rsk/node/install/java/)

If you had any problem, check if  your system meets the [minimum requirements](https://developers.rsk.co/rsk/node/install/requirements/).

There are other ways to install a RSK node, in other supported platforms: [https://developers.rsk.co/rsk/node/install/](https://developers.rsk.co/rsk/node/install/)

### Installing Geth

[Download](https://geth.ethereum.org/downloads/) and install [Geth](https://geth.ethereum.org/).

![Geth download page](/assets/img/tutorials/geth-attach-local-node/image-04.png)

Do the installation with all default options. 
> You do not need to install Developer tools.

![Geth install](/assets/img/tutorials/geth-attach-local-node/image-05.png)

> This tutorial was made using version 1.9.12, I recommend using this version.

At terminal, run this command to check the version, if it runs and returns a version, it is ok:

```shell
geth version
```

![geth version](/assets/img/tutorials/geth-attach-local-node/image-06.png)


In this link you have more information about how to install Geth: 
[https://geth.ethereum.org/docs/install-and-build/installing-geth](https://geth.ethereum.org/docs/install-and-build/installing-geth)

## Geth attach

This procedure is only for a node running in your machine or any in a network that you are allowed. Geth attach gives you full control of the remote instance, so do not expect someone else to  give you such access to their machine.

```shell
geth attach http://127.0.0.1:4444
```

![image alt text](/assets/img/tutorials/geth-attach-local-node/image-07.png)

We are running geth to attach (connect) to RSK local node. The address `http://127.0.0.1` connects to your own computer (localhost). The local node has the HTTP-RPC server enabled and listening at port `4444`, and this is what we connect to.

### Supported RPC methods

There is a list with all RPC methods enabled on RSK nodes here:

[https://developers.rsk.co/rsk/node/architecture/json-rpc/](https://developers.rsk.co/rsk/node/architecture/json-rpc/)

For more information  about RPC methods, check the Ethereum website, but remember that not all of them are implemented on RSK nodes: 

- [https://geth.ethereum.org/docs/rpc/server](https://geth.ethereum.org/docs/rpc/server)

- [https://github.com/ethereum/wiki/wiki/JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC)

## Check if the node is running

### Check block number

```js
eth.blockNumber
```

![eth.blockNumber](/assets/img/tutorials/geth-attach-local-node/image-08.png)

Every time you run it, you will get a higher number, because the node is mining blocks.

## Tips and tricks

### Copy and Paste in Windows terminals

In the Geth console, to paste something which you copied from another place, you need to use:

- Right Button
- Right Arrow

Do not press the keys at the same time, but rather in sequence: first `Right Button`, then `Right Arrow`.


### List commands

A small trick to see the list of initial commands. Type 2 spaces then hit TAB twice. You will get:

![Geth list commands](/assets/img/tutorials/geth-attach-local-node/image-09.png)

## Useful functions

I will show some RPC methods which are useful for understanding how things work.

## Useful eth functions

### eth.blockNumber

Shows the last block number

```js
eth.getBlockNumber
```

![eth.getBlockNumber](/assets/img/tutorials/geth-attach-local-node/image-10.png)

### gasPrice

On a local node, we expect the gas price to be 0.

```js
eth.gasPrice
```

![eth.gasPrice](/assets/img/tutorials/geth-attach-local-node/image-11.png)

## Useful net functions 

### net.version

```js
net.version
```

This is the network ID.

![net.version](/assets/img/tutorials/geth-attach-local-node/image-12.png)

### net.peerCount

```js
net.peerCount
```

![net.peerCount](/assets/img/tutorials/geth-attach-local-node/image-13.png)

You are alone on this network.

## Accounts

### Personal

List all things related to accounts in your local node.

```js
personal
```

RSK is pre configured with some accounts:

![Personal](/assets/img/tutorials/geth-attach-local-node/image-14.png)

### List Accounts

You can only list the accounts:

```js
personal.listAccounts
```

![personal.listAccounts](/assets/img/tutorials/geth-attach-local-node/image-15.png)

There are another command to do the same thing:

```js
eth.accounts
```

![eth.accounts](/assets/img/tutorials/geth-attach-local-node/image-16.png)

### Create account

Also it is possible to create new accounts:

```js
personal.newAccount("mypasswd")
```

You need to save or remember the password as it is used to encrypt your private key on disk.

In the example, the password is `"mypasswd"`.

![personal.newAccount](/assets/img/tutorials/geth-attach-local-node/image-17.png)

My new account is 
`0xf6e443fd1c869c6a25d18a9866f3a6c7f8dfb703`

### Balances

To retrieve the balance of an account, per example, `account[1]`:

```js
eth.getBalance(eth.accounts[1])
```

![eth.getBalance](/assets/img/tutorials/geth-attach-local-node/image-18.png)

We get a big number because the result is denominated in wei. We can convert to Ether:

```js
web3.fromWei(eth.getBalance(eth.accounts[1]),"ether")
```

![balance in ethers](/assets/img/tutorials/geth-attach-local-node/image-19.png)

On a local node, the pre-configured accounts are funded with a lot of “money”! On the RSK network, this is called `R-BTC`. So I have 1.000.000.000.000 = One trillion of R-BTC!

### Balance of a specific account

I would like to check the account (`0xf6e443fd1c869c6a25d18a9866f3a6c7f8dfb703`) that I created before:

```js
web3.fromWei(eth.getBalance("0xf6e443fd1c869c6a25d18a9866f3a6c7f8dfb703"),"ether")
```

![Balance of a specific account](/assets/img/tutorials/geth-attach-local-node/image-20.png)

I do not have any funds on my account, so the next step is to transfer some R-BTC to it.

## Transfer R-BTC

I have one trillion R-BTC at account 1 and nothing at the new account. I'd like to transfer 300 billion R-BTC from account 1 to the new account:

```js
eth.sendTransaction({from:eth.accounts[1], to:"0xf6e443fd1c869c6a25d18a9866f3a6c7f8dfb703", value: web3.toWei(300000000000, "ether")})
```

![Transfer](/assets/img/tutorials/geth-attach-local-node/image-21.png)

Perfect! I got a transaction hash. This means that my transaction was sent to Blockchain and it will be in a block in a few seconds.

Now I will check the balance of the accounts new and account[1]:

```js
web3.fromWei(eth.getBalance(eth.accounts[1]),"ether")

web3.fromWei(eth.getBalance("0xf6e443fd1c869c6a25d18a9866f3a6c7f8dfb703"),"ether")
```

And the result is:

![Balances after transfer](/assets/img/tutorials/geth-attach-local-node/image-22.png)

Great! The new account has 300 billion R-BTC and account[1] has 700 billion R-BTC.

## Geth exit 

To exit the geth console: 

```js
exit
```

![exit](/assets/img/tutorials/geth-attach-local-node/image-23.png)

## Final considerations

Did you think that it would be so easy to use Geth, an Ethereum client, to interact with an RSK local node? 

We can do more things using Geth, such as [deploy a smart contract at RSK local node using Geth and Remix](https://developers.rsk.co/tutorials/geth-attach-deploy-smart-contract/).

Our goal is to join forces and give options to people who believe in smart contracts based on Ethereum, and also believe in the power of Bitcoin, through RSK.

I hope this tutorial has been helpful and I'd appreciate your feedback. Share it if you like it :)
