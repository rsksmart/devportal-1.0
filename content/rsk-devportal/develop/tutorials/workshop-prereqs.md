---
menu_order: 400
menu_title: Setup for workshops
layout: rsk
title: "Rootstock Workshop Prerequisite"
tags: rootstock, workshop, pre-requisites
description: "Several Rootstock workshops have common pre-requisites that you will need to have set up or configured on your system before proceeding. Here are some detailed instructions on how to prepare ahead of your next workshop."
---
Welcome to the Rootstock Workshop Prerequisite! Whether you're here to dive into the world of Rootstock tools for the first time or to ensure you have all the necessary setup before advancing your existing projects, you're in the right place. This page is your guide to starting, outlining all the prerequisites needed to install and use any Rootstock tool effectively.

We aim to make your preparation process as smooth as possible, ensuring everything is in place to work efficiently and easily. We've compiled essential information to kickstart your journey from system requirements and software dependencies to preliminary knowledge and resources.

So, let's get you set up and ready to explore the full potential of Rootstock tools.

## Operating system

To get started developing on Rootock, you need a modern operating system such as Windows, macOS, or Linux.

## POSIX compliant shell/command line interface

- **MacOSX and Linux distributions:** Use the standard terminal
- **Windows:** If you use the standard `cmd` terminal, or PowerShell, the commands here may not work. Consider installing [Git for Windows](https://gitforwindows.org/), which comes with Git Bash bundled. Here's a great [tutorial on installing and using Git Bash](https://www.atlassian.com/git/tutorials/git-bash).

## cURL

cURL is a command line tool that enables data exchange between a device and a server through a terminal.

- Run `curl --version` to confirm it's already installed on your computer. If not, [download cURL from the project website](https://curl.haxx.se/download.html).

## Code editor

To make it quick and easy to create and edit project files, you need a code editor—preferably one that has support for syntax highlighting for both Solidity and Javascript

- [VS Code](https://code.visualstudio.com) is a good choice if you don't already have one

## NodeJs

- The most fuss-free way to install and manage multiple versions of `node` on your computer is the [Node Version Manager (NVM)](https://github.com/nvm-sh/nvm). You can install it by following the guide on the [project repository](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating).
- This tutorial requires NodeJs version 12 or later. You can switch to this using the following command:

```shell
nvm install 12
nvm use 12
```

## Hardhat

- [Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started) is at the heart of creating blockchain projects on the Rootstock platform.

Install Hardhat in your project using the following command:

```shell
npm install --save-dev hardhat
```

## Java

To run the Rootstock blockchain node using RSKj, you will need Java 8. 

* Run `java -version` to check if you already have it installed. If you get an error message, or the command displays a version other than `1.8`, you will need to install it.

There are a variety of ways you can install this specific version of Java, but SDKman is one which allows you to install and switch between multiple versions as needed:

```shell
curl -s "https://get.sdkman.io/" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
# to get a filtered list of available java versions
sdk list java  | grep "8\."
# copy one of the options listed for use below, e.g. 8.0.242.j9-adpt

# install the version of java copied above
# (replace accordingly)
sdk install java 8.0.242.j9-adpt

# show installed versions, and switch to the selected one
# (replace accordingly)
sdk list java | grep installed
sdk use java 8.0.242.j9-adpt
java -version

```

## OpenZeppelin CLI

OpenZepplin allows you to develop and manage, secure, and audit the end-to-end lifecycle of decentralized applications.
Install the tool using the following command:

```shell
npm install @openzeppelin/cli
```

## RSKj

RSKj is the java implementation of the Rootstock network that allows you to run a Rootstock node locally.

This will provide you with a localhost-only network, for fast testing, called Regtest.
The same node also can connect to permissionless decentralised networks of peer nodes also running RSKj - Testnet and Mainnet.

For this part, open up a new shell, as you will need to leave the RSKj process running in the background while you continue with other tasks in the foreground.

```shell
mkdir -p ~/code/rsk/rskj-node
cd ~/code/rsk/rskj-node
curl \
  -L \
  https://github.com/rsksmart/rskj/releases/download/FINGERROOT-5.3.0/rskj-core-5.3.0-FINGERROOT-all.jar \
  > ./rskj-core-5.3.0-FINGERROOT-all.jar
sha256sum rskj-core-5.3.0-FINGERROOT-all.jar
# 556132bb0423f0ca0a101704d56daad17eaa124d4f88cf97ced8ca7ebcddb0b2 rskj-core-5.3.0-FINGERROOT-all.jar
```

> Note: When installing and running the RSKj node, it is always a good idea to verify that your copy is legitimate.
> [Full instructions](https://developers.rsk.co/rsk/node/contribute/verify/ "Verify authenticity of RskJ source code and its binary dependencies") on how to do this.

For the purposes of this workshop, we will run RSKj on Regtest.

```shell
java -cp rskj-core-5.2.0-FINGERROOT-all.jar  -Drpc.providers.web.cors=* co.rsk.Start --regtest
```

If you see no output - that is a good thing:
Its output is directed to a log file.

> Note the flag provided above: `-Drpc.providers.web.cors=*`
> This disables cross origin resource sharing protection, effectively allowing any web page to access it.
> As we want to make JSON-RPC requests from a browser, such as a DApp, we need this flag.

> Note that if you see an error similar to the following, you will need to clear your Regtest data directory from an older version of RSKj.
>
> ```
> A block header must have 16/17 elements or 19/20 including merged-mining fields but it had 19
> ```
>
> To do so, simply delete the `.rsk/regtest` directory within your home directory, using the following command.
>
> ```shell
> rm -rf ~/.rsk/regtest/
> ```

Leave this **running** in an open shell, and switch back to your original shell for the rest of this workshop.

Back in your original shell, it is a good idea to verify that you are able to successfully make JSON-RPC requests before proceeding.

```shell
curl \
  http://localhost:4444/ \
  -s -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

If this command fails, it is likely that the Regtest node running locally (running on your own computer) is not working properly.
You should see a response similar to the following:

```json
{"jsonrpc":"2.0","id":1,"result":"0x2246e"}
```

Now let's do the same thing, but this time, instead of connecting to something running locally, we connect to the [RSK Testnet](https://stats.testnet.rsk.co/).
You can run your own RSK Testnet node using the same RSKj used earlier, or you can simply connect to public node.
The latter option requires no setup, and that is what we'll be doing:

```shell
curl \
  https://public-node.testnet.rsk.co/ \
  -s -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

You should see a response similar to the following:

```json
{"jsonrpc":"2.0","id":1,"result":"0xca035"}
```

> If this command fails, it is likely that your connection to Rootstock's public node is impeded in some way, and you should identify and relax any restrictive network firewall or proxy rules.

The `result` property is the number of the latest block that has been synced.
Note that this value (`0xca035`) is the block number in hexadecimal (base 16), so the output above indicates that the current block number is `827445` in decimal (base 10).
This should match the "Best Block" field in the [Rootstock Testnet Stats](https://stats.testnet.rsk.co/) site.

![](img/stats-testnet-block-number.png)
