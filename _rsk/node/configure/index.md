---
layout: rsk
title: Configure
collection_order: 2400
permalink: /rsk/node/configure/
---

## Setting your own config preferences

It is a bit different if:

- [You are using Ubuntu, Azure, AWS or Docker](#using-ubuntu-azure-aws-or-docker)
- [You are using the `java` command](#using-java-command)

&hellip; to run the node.

> Remember:
> You need to **restart** the node if you've changed any configuration option

### Using Ubuntu, Azure, AWS or Docker

Your node's config file is in `/etc/rsk`.
Default configurations are defined there and they are the same as [these ones](https://github.com/rsksmart/artifacts/tree/master/rskj-ubuntu-installer/config).

You should edit the config related with the network you are using (`mainnet.conf`, `testnet.conf`, `regtest.conf`).
Check [here](Configuration-file-reference) all the configuration options you could change.


### Using `java` command

#### 1. Create a `.conf` file

You can create a file with the configuration options that you want to replace from the default.
Default configurations are defined [here](https://github.com/rsksmart/rskj/tree/master/rskj-core/src/main/resources/config).

The extension of the file must be `.conf`.
Check [here](/rsk/node/configure/reference/) for all the configuration option.

As an example, if you want to change the default `database directory`, your config file should only contain:

``` conf
database {
    dir = /new/path/for/database
    reset = false
}
```

#### 2. Specify your config file path

To apply your configuration options, you need to set your own config file's path when you run your node.

This can be done in two ways:

- Running the node with de `java` command, add `-Drsk.conf.file=path/to/your/file.conf`
- Compiling the node with IntelliJ, add to VM options: `-Drsk.conf.file=path/to/your/file.conf`
