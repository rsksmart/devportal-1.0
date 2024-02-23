---
# menu_order: 400
menu_title: Config Truffle for RSK
title: 'How to configure Truffle to connect to RSK'
description: 'using the new provider.pollingInterval and deploymentPollingInterval options in truffle-config.js'
tags: knowledge-base, truffle, rsk, javascript
layout: 'rsk'
---

> Sunsetting Truffle: Truffle has been sunsetted, see [Consensys Announcement](https://consensys.io/blog/consensys-announces-the-sunset-of-truffle-and-ganache-and-new-hardhat). Rootstock will no longer support Truffle and encourage immediate migration to [Hardhat](/tools/hardhat/).

Understanding Truffle's default configuration values (based on Ethereum), in particular surrounding polling intervals; and using 2 relatively new config options allows one to configure Truffle to better connect to an RSK node.

## Public Nodes

When connecting to **public nodes**, it is crucial to understand that you are interacting with the nodes indirectly. Each RPC request goes through a series of hops through other infrastructure, such as, authentication gateways, load balancers, rate limiters, et cetera. Each of these other layers contains its own logic that may be more restrictive than the node itself.

> You may opt to work around this by running your own node on `localhost`.

## Ethereum Defaults

Truffle's default configuration is optimised for the Ethereum network. However, some of these values are incompatible with the RSK network, and needs to be overridden accordingly. Remember, that while RSK is compatible with Ethereum both at the RPC level and at the VM level; its internal implementation can be quite different.

The main difference lies in the relationship between block interval and polling interval.

The **block interval** is the duration of time between a block being added to the blockchain and the next one being added. Note that all transactions must be in a block in order to be added to the blockchain (AKA "has been mined").

- RSK's block interval is currently approximately 30 seconds, whereas
- Ethereum's block interval is currently approximately 15 seconds.

Client applications, such as decentralised applications, or in this case Truffle (a developer tool), need to periodically check if blocks, and therefore transactions, that have been submitted have since been added to the blockchain. The polling interval is the duration of time between one such check and the next.

It thus makes sense to optimise the efficiency of the client application by configuring a polling interval that is commensurate with the anticipated block interval. Drawing upon the concept of [critical frequency](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem#Critical_frequency) (in Nyquist–Shannon sampling theorem), it makes sense to pick a 15 second polling interval when anticipating a 30 second block interval from RSK. Manual testing appears to indicate that this works well.

> Note that Truffle's default is a 4 second polling for an anticipated 15 second block interval on Ethereum. This is still "allowed", as critical frequency as that specifies the upper bound of the sampling to be half. Configuration values should be picked carefully by weighing the pros and cons of performance against resource intensity.

Note that Truffle's implementation has 2 separate polling intervals:

- One for `provider.pollingInterval`, which is for "regular" usage, and
- Another for `deploymentPollingInterval`, which is used exclusively for deployments (`truffle migrate`)

These configuration options were originally not implemented, and were set to hard coded defaults. These were added specifically to be able to support networks with a different block interval! See:

- [Adding `provider.pollingInterval`](https://twitter.com/DAppsDev/status/1324929409158012929 "DApps Dev Club's tweet about adding provider.pollingInterval")
- [Adding `deploymentPollingInterval`](https://twitter.com/DAppsDev/status/1328695467081756673 "DApps Dev Club's tweet about adding deploymentPollingInterval")

## Configuring Truffle

With all the above in mind, let's see how to implement this in a Truffle project.

In your `truffle-config.js` file:

(1) Set a variable `testnetSeedPhrase` to contain a valid BIP-39 mnemonic phrase

(2) Set a variable `gasPriceTestnet` to contain the gas price you wish to use denominated in Wei.

(3) In the exported `config` object, set the value of `config.networks.testnet` to be the following.

```truffle
testnet: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: testnetSeedPhrase,
        },
        providerOrUrl: 'https://public-node.testnet.rsk.co/',
        derivationPath: "m/44'/37310'/0'/0/",
        // Higher polling interval to check for blocks less frequently
        pollingInterval: 15e3,
      }),
      // Ref: http://developers.rsk.co/rsk/architecture/account-based/#chainid
      network_id: 31,
      gasPrice: gasPriceTestnet,
      networkCheckTimeout: 1e6,
      timeoutBlocks: 100,
      // Higher polling interval to check for blocks less frequently
      // during deployment
      deploymentPollingInterval: 15e3,
    },
```

(4) Now you can run `truffle` sub-commands with this network selected, for example:

```truffle
truffle migrate --network testnet
```

**NOTE:** You may have noticed that the config contains a `derivationPath` value of `m/44'/37310'/0'/0/`. This is indeed the appropriate
[derivation path for RSK Testnet](/rsk/architecture/account-based/#derivation-path-info).
However, if you are using this to develop a DApp, and using Metamask with the same mnemonic seed phrase, Metamask does not derive the same set of addresses. This is because the derivation path is hardcoded to use Ethereum's default value, and does not yet allow customisation.
If this is the case, the workaround is to use Ethereum's derivation path in Truffle instead, and thus this part of the config should change to `m/44'/60'/0'/0/`.

----

Originally written and published by [DApps Dev Club](https://dappsdev.org/blog/2021-02-24-how-to-configure-truffle-to-connect-to-rsk/)
