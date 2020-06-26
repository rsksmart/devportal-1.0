---
layout: rsk
title: Configure
tags: rsk, rskj, node, config
description: "Setting your own config preferences, when using the Java command, Ubuntu, Azure, AWS, or Docker"
collection_order: 2400
permalink: /rsk/node/configure/
render_features: 'custom-terminals'
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
Check [here](/rsk/node/configure/reference) all the configuration options you could change.


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

- Running the node with the `java` command, add `-Drsk.conf.file=path/to/your/file.conf`
- Compiling the node with IntelliJ, add to VM options: `-Drsk.conf.file=path/to/your/file.conf`

### Troubleshooting

#### UDP port already in use

If you see the following error message,
it means that RSKj is unable to bind to a particular port number,
because prior to this, another process has already bound to the same port number.

```
Exception in thread "UDPServer" co.rsk.net.discovery.PeerDiscoveryException: Discovery can't be started.
        at co.rsk.net.discovery.UDPServer$1.run(UDPServer.java:65)
Caused by: java.net.BindException: Address already in use: bind
```

To rectify this,
change the value of `peer.port` in the config file,
or add a `peer.port` flag to the command when you start RSKj.


[](#top "multiple-terminals")
- Linux, Mac OSX
  ```shell
  $ java -Dpeer.port=50505 -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
  ```
- Windows
  ```windows-command-prompt
  C:\> java -Dpeer.port=50505 -cp <PATH-TO-THE-RSKJ-JAR> co.rsk.Start
  ```
