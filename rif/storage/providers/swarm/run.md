---
layout: rsk
title: Running Swarm for the first time
tags: rif, rif-storage, ipfs, swarm, storage, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

## 1. Check the `swarm` command is in the PATH

Verify this with `which swarm`.

If the `swarm` command cannot be found, you can [add the Swarm binary route to your PATH](https://unix.stackexchange.com/questions/26047/how-to-correctly-add-a-path-to-path) for easier access.

Alternatively, you will need to use `$GOPATH/bin/swarm` instead, assuming you are <a href="/rif/storage/providers/swarm/install#compile-from-source-code">compiling directly from the source code</a>.

## 2. Execute the `swarm` command

To boot up Swarm for the first time simply execute:

```sh
swarm
```

## 3. Specify a private key

You will need a private key (sometimes referred to as _account_) to use Swarm. This can either:

- be specified by the `bzzaccount` [flag](https://swarm-guide.readthedocs.io/en/latest/node_operator.html#general-configuration-parameters) (if the account already exists)
- be created through a Swarm prompt (if not specified)

Note that after used once, an account will continue to be used by default if not specified the next time.

## 4. Verify the client is running

If Swarm was started successfully, the local web server endpoint should be accessible through your browser, by default at `http://localhost:8500`.

This web interface will allow you to upload and download files manually.

In contrast, the terminal in which `swarm` was executed will allow you to take a look at log outputs and relevant execution messages, as well as errors.

## 5. CLI interaction

The terminal can be used to interact with Swarm once the system is up and running. The 2 most basic commands are:

- `up`
  - e.g. `swarm up dog.png`
  - the output will look something like `858ce596aedec06c4d31d983dcc8a0df404b3c925600a8a9ac0332cc296b7883`. This is (in essence) the content hash for the uploaded file, which can then be used to retrieve it.
- `down`
  - e.g. `swarm down bzz://858ce596aedec06c4d31d983dcc8a0df404b3c925600a8a9ac0332cc296b7883`
  - if successful, there will be no output, and the corresponding file according to this hash will be placed in the current directory.

You can find a list of commands [here](https://swarm-guide.readthedocs.io/en/latest/dapp_developer/upload_cli.html#reference-table).
