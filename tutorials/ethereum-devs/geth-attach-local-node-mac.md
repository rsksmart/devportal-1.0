---
layout: rsk
title: Using geth to attach to a RSK local node for Mac Users
tags: tutorial, rsk, geth, ethereum
description: "How to use the Ethereum client Geth to attach to an RSK local node (regtest) and run JSON-RPC commands on a Mac"
---

RSK's virtual machine implementation is compatible with the Ethereum virtual machine (EVM), which enables us to make use of many Ethereum developer tools.

In this tutorial I will show you step-by-step how to use the Ethereum client Geth to attach to an RSK local node (which is called regtest) and run a few JSON-RPC commands.
We do this to establish that the local node is running.

Here is the [equivalent step-by-step tutorial for Windows users](/tutorials/ethereum-devs/geth-attach-local-node/ "Using geth to attach to a RSK local node").

## Overview

We will do these steps:

1. Install the requirements: Java SDK, RSK local node and Geth;
2. Do a Geth attach;
3. Check if the node is running;
4. Know some useful functions;
5. Learn how to interact with accounts: list, create;
6. Transfer funds between accounts.

## Webinar

We have run a
[webinar](/webinars/#event-id-202004-001 "Run your own local RSK node with Geth attached")
in which we run through this tutorial:

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/apcD6bcSWpw?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

The same webinar is also available in
[Español](https://www.youtube.com/watch?v=1Zs2m5z_S9g)
and [Português](https://www.youtube.com/watch?v=z5AiHy0mC8U).

Check out our [other webinars](/webinars).

## Requirements

- Java JDK
- RSK local node
- Geth

### Installing Java JDK

First check if you already have Java installed:

```shell
java -version
```

Go to [Java Download](https://java.com/en/download/mac_download.jsp) if you need to install it:

![Java Download](/assets/img/tutorials/geth-attach-local-node/image-24.png)

Alternatively, you could install Java using shell commands via SDKman:

```shell
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk list java  | grep "8\." to get a filtered list of available java versions
sdk install java 8.0.242.j9-adpt
sdk install java 11.0.6.j9-adpt
sdk use java 8.0.242.j9-adpt
java -version
```

### Installing RSK local Node

There are several different ways to set up a RSK node. Here we will download and run the file from bash.


#### Download and Verify RSKj 2.0.1
Find the [Releases page](https://github.com/rsksmart/rskj/releases/tag/PAPYRUS-2.0.1)

To download and verify RSKj:

```shell
cd ~/code/rsk
mkdir rskj-node
cd rskj-node
curl \
  -L \
  https://github.com/rsksmart/rskj/releases/download/PAPYRUS-2.0.1/rskj-core-2.0.1-PAPYRUS-all.jar \
  > ./rskj-core-2.0.1-PAPYRUS-all.jar
curl \
  -L \
  https://github.com/rsksmart/rskj/releases/download/PAPYRUS-2.0.1/SHA256SUMS.asc \
  > ./rskj-core-2.0.1-PAPYRUS-all.SHA256SUMS.asc
shasum rskj-core-2.0.1-PAPYRUS-all.jar
# 43149abce0a737341a0b063f2016a1e73dae19b8af8f2e54657326ac8eedc8a0  rskj-core-2.0.1-PAPYRUS-all.jar
grep "rskj-core" rskj-core-2.0.1-PAPYRUS-all.SHA256SUMS.asc
# 43149abce0a737341a0b063f2016a1e73dae19b8af8f2e54657326ac8eedc8a0 rskj-core/build/libs/rskj-core-2.0.1-PAPYRUS-all.jar
```

The curl commands download a binary which is the RSKj executable, as well as a plain text file containing the checksum for the JAR file. The subsequent `shasum` (or `sha256sum` depending on your *NIX variety), and `grep` are used to verify that the checksum recorded as part of the release process does indeed match the computed checksum of the file that was downloaded.

Note that verifying the checksum is not the only form of verification of the RSKj binary. There are [more detailed instructions](/rsk/node/security-chain/ "Verify authenticity of RSKj source code and its binary dependencies") available on how to do this.

#### Run RSKj

To run the node:

```shell
java -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start --regtest
```

Leave running, and open new terminal

(Replace `<PATH-TO-THE-RSKJ-JAR>` with your path to the JAR file).

> To locate the full path, run `pwd` on current working directory on bash

```shell
java -cp ./rskj-core-2.0.1-PAPYRUS-all.jar co.rsk.Start --regtest
```

If you do not have any output after running the command, this usually means that the node is running successfully. We will confirm this in the next step.

![Run local node](/assets/img/tutorials/geth-attach-local-node/image-25.png)

**Important:**

> Do not close this bash window. The node is running here, and if you close, you will stop it.

### Check if the node is running using cURL

Open a new bash window.

Issue a request to the node's RPC HTTP server. This is an example using cURL:

```shell
curl \
  localhost:4444/1.1.0/ \
  -X POST \
  -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

The response should look similar to:

```shell
{"jsonrpc":"2.0","id":1,"result":"0x25d6"}
```

The result property is the number of the latest block that has been synced. Note that this value is in hexadecimal, so the output above indicates that the current block number is 9686.

To get more information about this process:
[Setup RSKj with Java](/rsk/node/install/java/)

If you encounter any problems, check if your system meets the [minimum requirements](/rsk/node/install/requirements/).

There are other ways to install a RSK node, in other supported platforms: [Installing RSKj](/rsk/node/install/)

### Installing Geth
[Download](https://geth.ethereum.org/downloads/) and install [Geth](https://geth.ethereum.org/).

![Geth download page](/assets/img/tutorials/geth-attach-local-node/image-04.png)

Choose the default installer for Mac

> or run the below commands on bash to install geth:

```shell
mkdir -p ~/code/ethereum/geth-node
cd ~/code/ethereum/geth-node
curl \
  -L \
  https://gethstore.blob.core.windows.net/builds/geth-alltools-darwin-amd64-1.9.12-b6f1c8dc.tar.gz
  > geth-alltools-darwin-amd64-1.9.12-b6f1c8dc.tar.gz

tar -xf geth-alltools-darwin-amd64-1.9.12-b6f1c8dc.tar.gz

cd geth-alltools-darwin-amd64-1.9.12-b6f1c8dc

ls -l
# -rw-r--r--  1 owanate  staff     32397 Mar 16 13:51 COPYING
# -rwxr-xr-x  1 owanate  staff  21440268 Mar 16 13:53 abigen
# -rwxr-xr-x  1 owanate  staff  21145484 Mar 16 13:53 bootnode
# -rwxr-xr-x  1 owanate  staff  32761972 Mar 16 13:53 clef
# -rwxr-xr-x  1 owanate  staff  20844132 Mar 16 13:53 evm
# -rwxr-xr-x  1 owanate  staff  35009108 Mar 16 13:53 geth
# -rwxr-xr-x  1 owanate  staff  14693948 Mar 16 13:53 puppeth
# -rwxr-xr-x  1 owanate  staff   3446104 Mar 16 13:53 rlpdump
# -rwxr-xr-x  1 owanate  staff  26705564 Mar 16 13:53 wnode

./geth version
# Version: 1.9.12-stable
```

In this link, you have more information about how to install Geth:
[geth.ethereum.org/docs/install-and-build/installing-geth](https://geth.ethereum.org/docs/install-and-build/installing-geth)


## Connect geth to RSKj

This procedure is only for a node running in your machine or any in a network that you are allowed. Geth attach gives you full control of the remote instance, so do not expect someone else to  give you such access to their machine.

```shell
./geth attach http://127.0.0.1:4444
# Welcome to the Geth JavaScript console!
# instance: RskJ/2.0.1/Mac OS X/Java1.8/PAPYRUS-36f480d
# coinbase: 0xec4ddeb4380ad69b3e509baad9f158cdf4e4681d
#at block: 4448 (Fri Apr 03 2020 11:30:13 GMT+0100 (WAT))
# modules: debug:1.0 eth:1.0 evm:1.0 net:1.0 personal:1.0 rpc:1.0 rsk:1.0 sco:1.0 #trace:1.0 txpool:1.0 web3:1.0
```

We are running geth to attach (connect) to RSK local node. The address `http://127.0.0.1` connects to your own computer (localhost). The local node has the HTTP-RPC server enabled and listening at port `4444`, and this is what we connect to.

### Supported RPC methods

There is a list with all RPC methods enabled on RSK nodes here:
[RSK JSON-RPC](/rsk/node/architecture/json-rpc/)

For more information  about RPC methods, check the Ethereum website, but remember that not all of them are implemented on RSK nodes:

- [geth.ethereum.org/docs/rpc/server](https://geth.ethereum.org/docs/rpc/server)
- [github.com/ethereum/wiki/wiki/JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC)

# Check if the node is running


### Check block number
> Shows the last block number

```shell
> eth.blockNumber
# 4585
> eth.blockNumber
# 4634
```

Every time you run it, you will get a higher number, because the node is mining blocks.

## Useful functions

I will show some RPC methods which are useful for understanding how things work.

## Useful eth functions

### eth.blockNumber
Shows the last block number

```js
eth.blockNumber
# 5032
```

### gasPrice

On a local node, we expect the gas price to be 0.

```shell
> eth.gasPrice
# 0
```

### net.version

This is the network ID.

```shell
> net.version
# “33”
```

### net.peerCount

```shell
> net.peerCount
# 0
```

This indicates you are alone on this network.

## Accounts

### Personal

List all things related to accounts in your local node.

```shell
> personal
```

### List Accounts

List the accounts in your local node:

```shell
> personal.listAccounts
# [“0xcd2a3d9f938e13cd947ec05abc7fe734df8dd826", "0x7986b3df570230288501eea3d890bd66948c9b79", "0x0a3aa774752ec2042c46548456c094a76c7f3a79", "0xcf7cdbbb5f7ba79d3ffe74a0bba13fc0295f6036", "0x39b12c05e8503356e3a7df0b7b33efa4c054c409", "0xc354d97642faa06781b76ffb6786f72cd7746c97", "0xdebe71e1de41fc77c44df4b6db940026e31b0e71", "0x7857288e171c6159c5576d1bd9ac40c0c48a771c", "0xa4dea4d5c954f5fd9e87f0e9752911e83a3d18b3", "0x09a1eda29f664ac8f68106f6567276df0c65d859", "0xec4ddeb4380ad69b3e509baad9f158cdf4e4681d"] #
```

There are other commands which do the same thing, such as:

```shell
> eth.accounts
```

### Check total number of accounts

```shell
> personal.listAccounts.length
# 11
```

### Create account

It is possible to create new accounts:

```shell
> personal.newAccount('mypasswd')
# "0x8a0e79a725b9d2e3fa34fd5ccdb3214fba458d07"
```

You need to save or remember the password as it is used to encrypt your private key on disk.

In the example above, the password is `mypasswd`.

### Assign the new account to a variable called myNewAccount
> This is optional

```shell
> myNewAccount = '0x8a0e79a725b9d2e3fa34fd5ccdb3214fba458d07'
# "0x8a0e79a725b9d2e3fa34fd5ccdb3214fba458d07"
```

### Check total number of accounts again

```shell
> personal.listAccounts.length
# 12
```

### Balances

To retrieve the balance of an account, per example, `account[1]`:

```shell
> eth.getBalance(eth.accounts[1])
# 1e+30
```
We get a big number because the result is denominated in wei. We can convert to Ether:

### Balance in Ether

```shell
> web3.fromWei(eth.getBalance(eth.accounts[1]), 'ether')
# 1000000000000
```
On a local node, the pre-configured accounts are funded with a lot of “money”! On the RSK network, this is called `R-BTC`. So I have 1.000.000.000.000 = One trillion of R-BTC!


### Balance of a specific account

I would like to check the newly created account (`0x8a0e79a725b9d2e3fa34fd5ccdb3214fba458d07`):

```shell
> web3.fromWei(eth.getBalance(myNewAccount), 'ether')
# 0
```

## Transfer R-BTC

I have one trillion R-BTC in account 1 and nothing on the new account. I'd like to transfer 300 billion R-BTC from account 1 to the new account:

```shell
> eth.sendTransaction({ from: eth.accounts[1], to: myNewAccount, value: web3.toWei(300000000000, 'ether')
# "0x9e1e49528d687e7414ce7832bafa776ed387a84b504deb9a648c923ec5d756ba"
```

### Check Balance of account 1

```shell
> web3.fromWei(eth.getBalance(eth.accounts[1]), 'ether')
# 700000000000
```

### Check Balance of new account

```shell
> web3.fromWei(eth.getBalance(myNewAccount), 'ether')
# 300000000000
```

## Geth exit

To exit the geth console:

```shell
> exit
```

## Final considerations

Did you think that it would be so easy to use Geth, an Ethereum client, to interact with an RSK local node?

We can do more things using Geth, such as [deploy a smart contract on an RSK local node using Geth and Remix](/tutorials/ethereum-devs/geth-attach-deploy-smart-contract/).

Our goal is to join forces and give options to people who believe in smart contracts based on Ethereum, and also believe in the power of Bitcoin, through RSK.

I hope this tutorial has been helpful and I'd appreciate your feedback. Share it if you like it!
