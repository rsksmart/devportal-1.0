---
layout: rsk
title: Quick Start - Step 2
collection_order: 20
---

# Step 2 : Install Truffle and Ganache

Truffle and Ganache provides a development environment, test framework, and asset pipeline for blockchains.

## Clone the tutorial project

Before we begin, let's make a copy of the project
which we will use for the remainder of this tutorial.

The tutorial project files can be downloaded from
[github.com/rsksmart/truffle-integration](https://github.com/rsksmart/truffle-integration).

```shell
git clone https://github.com/rsksmart/truffle-integration
cd truffle-integration

```

## Install Truffle

Navigate to the `truffle` directory within the tutorial, and install its dependencies.

```shell
cd <tutorial-root>/truffle
npm install
```

Let us verify that we have the correct version of truffle running.

```shell
npx truffle version
```

This should output a version that matches the version number for truffle specified
in `<tutorial-root>/truffle/package.json`.

Note that we use `npx truffle` instead of `truffle` to ensure that the version installed within this directory is used,
not a globally installed copy of truffle.

### Truffle Network Configuration

Open the `truffle-config.js` file in the truffle directory. Locate the following part under `networks`.
This part tells Truffle how to connect to our RegNet node.

```javascript
module.exports = {
    // ...
    networks: {
        //...
        regtest: {
            provider: new PrivateKeyProvider(privateKey,  "http://127.0.0.1:4444"),
            host: "127.0.0.1",
            port: 4444,
            network_id: 33,
        }
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

```javascript
truffle(regtest)>
```

Note that the `--network` parameter identifies which network we should connect to,
and look for the options related to that within the `truffle-config.js` file.
We can verify this by entering the following command:

```javascript
web3.eth.net.getId()
33
```

Ensure that the output is `33`, which is the network ID of the regtest node.

Enter the command below to exit the REPL.

```shell
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
npm start
```

Ganache is a GUI app, and starting it in this manner makes DevTools available.

![Ganache with DevTools](/dist/images/ganache-with-devtools.png)

## More on Truffle and Ganache

To learn more about Truffle's commands, visit their [official website](https://www.trufflesuite.com/docs/truffle/overview).
