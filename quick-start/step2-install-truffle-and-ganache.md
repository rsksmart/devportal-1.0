---
layout: rsk
title: Quick Start - Step 2
---
## Step 2 : Install Truffle and Ganache

Truffle and Ganache provides a development environment, test framework, and asset pipeline for blockchains. 

#### Install Truffle

Navigate to the `truffle` directory within the tutorial, and install its dependencies.

```shell
cd <tutorial-root>/truffle
npm install
```

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

Note that the value for `privateKey` has been hardcoded into the config file. This is something that you would **not** do normally. As this is a tutorial, and we are not on the main net, however, this is OK.

#### Install Ganache

Navigate to the `ganache` directory within the tutorial, and install its dependencies.

```shell
cd <tutorial-root>/ganache
npm install
```

For Ubuntu, you may see an error in the terminal: `Gtk-Message: Failed to load module "canberra-gtk-module"`
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

#### More on Truffle and Ganache

To learn more about Truffle's commands, visit their [official website](https://www.trufflesuite.com/docs/truffle/overview).

----

[Previous](../step1-install-rsk-local-node)
|
[Next](../step3-edit-smart-contract)
