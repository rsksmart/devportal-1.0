---
# menu_order: 200
menu_title: Step 2 - Install Truffle & Ganache
layout: rsk
title: Quick Start - Step 2
tags: quick-start, truffle, ganache
description: 'quick start - tutorial project, install truffle, install ganache'
---

> Sunsetting Truffle: Truffle has been sunsetted, see [Consensys Announcement](https://consensys.io/blog/consensys-announces-the-sunset-of-truffle-and-ganache-and-new-hardhat). Rootstock will no longer support and encourage immediate migration to [Hardhat](/tools/hardhat/).

# Step 2 : Install Truffle and Ganache

What we achieved in step 1 was to launch a local RSKj node on a Regtest network.
Be sure to keep it running because instead of issuing manual JSON-RPC requests,
we are now going to use some a more advanced developer tool,
the [Truffle Suite](https://www.trufflesuite.com/).
Truffle and Ganache provides a development environment, test framework, and asset pipeline for blockchains.

## Clone the tutorial project

Before we begin, let's make a copy of the project
which we will use for the remainder of this tutorial.

The tutorial project files can be downloaded from
[github.com/rsksmart/truffle-integration](https://github.com/rsksmart/truffle-integration).

```shell
git clone --recursive https://github.com/rsksmart/truffle-integration
cd truffle-integration

```

## Install Truffle

Navigate to the `truffle` directory within the tutorial, install npm-check-updates, update dependencies versions and install them.

```shell
cd <tutorial-root>/truffle
npm i npm-check-updates
npm install
```

Let us verify that we have the correct version of truffle running.

```shell
npx truffle version
```

This should output a version that matches the version number for truffle specified
in `<tutorial-root>/truffle/package.json`.

Note that we use `npx truffle` instead of `truffle` to ensure that the version installed within this directory is used,
and not a globally installed copy of truffle.

### Truffle Network Configuration

Open the `truffle-config.js` file in the truffle directory. Locate the following part under `networks`.
This part tells Truffle how to connect to our Regtest node.

```javascript
module.exports = {
  // ...
  networks: {
    //...
    regtest: {
      provider: new PrivateKeyProvider(privateKey, 'http://127.0.0.1:4444'),
      host: '127.0.0.1',
      port: 4444,
      network_id: 33,
    },
    //...
  },
  // ...
};
```

Note that the value for `privateKey` has been hard coded into the config file.
This is something that you would **not** do normally.
As this is a tutorial, and we are not on the main net, this is OK.

### Truffle Console

Truffle console is a basic interactive console connecting to a node.
We will be using it to connect to our regtest node running locally.

Type the following command into a terminal.

```shell
npx truffle console --network regtest
```

This will open a [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)
in your terminal, in which you can type in commands to interact with
the node that you have connected to, using the `web3.js` API.

```text
truffle(regtest)>
```

Note that the `--network` parameter identifies which network we should connect to,
and look for the options related to that within the `truffle-config.js` file.
We can verify this by entering the following command:

```nodejs-repl
web3.eth.net.getId()
33
```

Ensure that the output is `33`, which is the network ID of the regtest node.

Enter the command below to exit the REPL.

```nodejs-repl
.exit
```

## Install Ganache

Navigate to the `ganache` directory within the tutorial, and install its dependencies.

```shell
cd <tutorial-root>/ganache
npm install
```

On Ubuntu, you may see an error in the terminal: `Gtk-Message: Failed to load module "canberra-gtk-module"`
To fix this, install the required GTK modules which also needs to be installed.

```shell
sudo apt install libcanberra-gtk-module libcanberra-gtk3-module
```

Start Ganache.

```shell
npm run dev
```

Ganache is a GUI app.

![Ganache](/dist/images/ganache.png)

## More on Truffle and Ganache

To learn more about Truffle's commands, visit their [official website](https://www.trufflesuite.com/docs/truffle/overview).
