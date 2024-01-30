---
# menu_order: 3200
menu_title: Truffle Boxes Prerequisites
layout: rsk
title: Truffle boxes prerequisites
tags: tutorial, rsk, truffle, truffle-box 
description: "How to install and configure the prerequisites to use any RSK Truffle box on RSK networks."
render_features: "custom-terminals"
---

> Sunsetting Truffle: Truffle has been sunsetted, see [Consensys Announcement](https://consensys.io/blog/consensys-announces-the-sunset-of-truffle-and-ganache-and-new-hardhat). Rootstock will no longer support Truffle and encourage immediate migration to [Hardhat](/tools/hardhat/).

Before you use a Truffle box, you need to have Truffle and other useful tools installed in your computer.
In this tutorial, I will show you step-by-step on how to install and configure the prerequisites to use any RSK Truffle box on RSK networks.

# Overview

Here is a summary of the steps we will take in this tutorial:

1. POSIX compliant shell
2. Curl
3. Node.js and NPM (Node Package Manager)
4. Code editor: Visual Studio Code (VSCode) or any other editor of your choice
5. Truffle
6. Create a wallet mnemonic

## POSIX compliant shell

The **Portable Operating System Interface (POSIX)** is a family of standards specified by the IEEE Computer Society for maintaining compatibility between operating systems. POSIX defines the application programming interface (API), along with command line shells and utility interfaces, for software compatibility with variants of Unix and other operating systems.
Source: [Wikipedia](https://en.wikipedia.org/wiki/POSIX)

* Mac OSX and Linux distributions: Use the standard terminal
* Windows: If you use the standard `cmd` terminal, or PowerShell, the commands here may not work.
  Consider installing [Git for Windows](https://gitforwindows.org/), which comes with Git Bash bundled.
  Here is a [tutorial on installing and using Git Bash](https://www.atlassian.com/git/tutorials/git-bash).

## cURL

This is a system command that is likely already installed on your system,
which allows you to make network requests, such as HTTP requests,
from your command line.

If `curl --version` displays an error,
then [download curl](https://curl.haxx.se/download.html).

In Windows:

```windows-command-prompt
C:\>curl --version
curl 7.55.1 (Windows) libcurl/7.55.1 WinSSL
Release-Date: [unreleased]
Protocols: dict file ftp ftps http https imap imaps pop3 pop3s smtp smtps telnet tftp
Features: AsynchDNS IPv6 Largefile SSPI Kerberos SPNEGO NTLM SSL

C:\>
```

## Node.js and NPM

Another dependency is NPM, which comes bundled with Node.js.

To check if you have node already installed, enter this command into your terminal:

```shell
node --version
npm --version
```

```windows-command-prompt
C:\>node --version
v10.16.3

C:\>npm --version
v6.9.0

C:\>
```

If there's no output like the one above, go to [Node.js](https://nodejs.org/en/) install.

Note that NPM is usually installed together with Node.js, so after installing Node.js, there's no need to install it separately.

If you want to have more than one version installed,
the most fuss-free way to install and manage multiple versions of `node` on your computer is [nvm](https://github.com/nvm-sh/nvm).

## Code editor

We need some software that is able to edit text files.
Preferably one that has support for syntax highlighting for both Solidity and Javascript.

[VS Code](https://code.visualstudio.com/) is a good choice if you don't already have one.

### Visual Studio Code (VS Code)

In this tutorial, we will use VS Code to create our project.

Go to [VS Code download](https://code.visualstudio.com/download) if you would like to use it too.

Verify if your VS Code installation was successful by typing the following command into the terminal:

```shell
code -v
```

```windows-command-prompt
C:\>code -v
1.45.1
5763d909d5f12fe19f215cbfdd29a91c0fa9208a
x64

C:\>
```

## Truffle

[Truffle](https://www.trufflesuite.com/truffle) is a popular development framework with a mission to make smart contract development easier for developers. Amongst its features, it has a smart contract lifecycle management, scriptable deployment & migrations, automated contract testing and simple network management.

It also makes developing on RSK easier, with the ability to configure custom networks for RSK.

To install Truffle, input the command below into the terminal and press `enter` at your project location:

```shell
npm install -g truffle
```

```windows-command-prompt
C:\>npm install -g truffle
C:\Program Files\nodejs\truffle -> C:\Program Files\nodejs\node_modules\truffle\build\cli.bundled.js

> truffle@5.1.28 postinstall C:\Program Files\nodejs\node_modules\truffle
> node ./scripts/postinstall.js

- Fetching solc version list from solc-bin. Attempt #1
+ truffle@5.1.28
updated 1 package in 11.679s

C:\>
```

When the installation is finished, close the terminal, open it again and check the Truffle version:

```shell
truffle version
```

```windows-command-prompt
C:\>truffle version
Truffle v5.1.28 (core: 5.1.28)
Solidity v0.5.16 (solc-js)
Node v10.16.3
Web3.js v1.2.1

C:\>
```

# Create a wallet mnemonic

To use testnet, we need tRBTC and an address to store them.
The best way is to create a wallet from a mnemonic, using the pattern defined at [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)

There are a few ways to do this.

One is to create using a web wallet, 
such as [Metamask](https://metamask.io/).
This wallet generates the mnemonic for you.

### iancoleman.io/bip39

Another way is using this web app:

[iancoleman.io/bip39](https://iancoleman.io/bip39/)

> Note: In this tutorial, the method used to store the mnemonic is not recommended to be used for any 'real' wallet because it's not secure enough to generate a private key in a website, however we will use this here for learning purposes, and because we're using the Testnet, so no real amounts are at stake.

In the `Generate a random mnemonic` field, select `12 words` and click on the `generate` button.

![Generate a random mnemonic](/assets/img/kb/truffle-boxes-prerequisites/image-05.png)

The result appears in the `BIP39 Mnemonic` field.
They should be 12 random words like the words in the image:

![BIP39 Mnemonic](/assets/img/kb/truffle-boxes-prerequisites/image-06.png)

My mnemonic is:

```
energy knife ice mouse merge track cram brown decorate atom rule virus
```

Copy these 12 words, we'll use it later.

RSK Networks have their own derivation path. Learn more about [account based RSK addresses](/rsk/architecture/account-based/ "Account based RSK addresses - RSK developers portal").
