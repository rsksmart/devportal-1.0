---
layout: rsk
title: Running Swarm for the first time
---

## Check the `swarm` command is in the PATH

Verify this with `which swarm`.

If the `swarm` command cannot be found, you can [add the Swarm binary route to your PATH](https://unix.stackexchange.com/questions/26047/how-to-correctly-add-a-path-to-path) for easier access.

Alternatively, you will need to use `$GOPATH/bin/swarm` instead.

## Execute the `swarm` command

To boot up Swarm for the first time simply execute:

```sh
swarm
```

## Add a `Geth` account

You will need account to use one. When running

You will be prompted to create a geth account.

In case you need to create a Geth account, do the following:

```sh
$GOPATH/bin/geth account new
```

Verify that Swarm boots up correctly (replace the account address with your own).

```sh
$GOPATH/src/github.com/ethersphere/swarm/build/bin/swarm --bzzaccount 0x2f1cd699b0bf461dcfbf0098ad8f5587b038f0f1
```

## Interacting with the client

After this, the Swarm local web server endpoint should be accessible through your browser, by default at `http://localhost:8500`.
