---
layout: rsk
title: Configure
tags: rsk, rskj, node, config
description: "Setting your own config preferences, when using the Java command, Ubuntu, Azure, AWS, or Docker"
collection_order: 2400
permalink: /rsk/node/configure/
render_features: 'custom-terminals'
---

## Command Line Interface

The RSK node can be started with different
[CLI flags](./cli/).

## Setting your own config preferences

It is a bit different if:

- [You are using Ubuntu, Azure, AWS or Docker](#using-ubuntu-azure-aws-or-docker)
- [You are using the `java` command](#using-java-command)

&hellip; to run the node.

> Remember:
> You need to **restart** the node if you've changed any configuration option.

### Using Ubuntu, Azure, AWS or Docker

Your node's config file is in `/etc/rsk`.
Default configurations are defined there and they are the same as [these ones](https://github.com/rsksmart/artifacts/tree/master/rskj-ubuntu-installer/config).

You should edit the config related with the network you are using (`mainnet.conf`, `testnet.conf`, `regtest.conf`).
Check [here](/rsk/node/configure/reference) all the configuration options you could change.

### Using Windows

For other operating systems, including Windows, please use the `-Drsk.conf.file` option as specified below.


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

### Using RocksDb (Experimental)

By default, RSKj runs using [LevelDB](https://dbdb.io/db/leveldb).
There is an option to use an alternate storage option,
[RocksDB](http://rocksdb.org/), instead.
The RocksDb option was introduced to enable higher performance
within the RSKj nodes.

[RocksDB](http://rocksdb.org/) is a persistent key-value store for fast storage environments
RocksDB is an embeddable persistent key-value store for fast storage.

[GET STARTED](http://rocksdb.org/docs/getting-started.html).

Adventages (taken from source):
* RocksDB uses a log structured database engine, written entirely in C++, for maximum performance. Keys and values are just arbitrarily-sized byte streams.
* RocksDB is optimized for fast, low latency storage such as flash drives and high-speed disk drives. RocksDB exploits the full potential of high read/write rates offered by flash or RAM.
* RocksDB is adaptable to different workloads. From database storage engines such as [MyRocks](https://github.com/facebook/mysql-5.6) to [application data caching](http://techblog.netflix.com/2016/05/application-data-caching-using-ssds.html) to embedded workloads, RocksDB can be used for a variety of data needs.
* RocksDB provides basic operations such as opening and closing a database, reading and writing to more advanced operations such as merging and compaction filters.
### How to use RocksDb

Modify the relevant RSKj config file (`*.conf`) file
and set the property `keyvalue.datasource=rocksdb`.

The `keyvalue.datasource` property in the config
may only be either `rocksdb` or `leveldb`.

If you wish to switch between the different storage options,
for example from `leveldb` to `rocksdb` or vice versa, 
you must **restart** the node with the import option.

The following sample command show how to do this when
the RSKj node was previously running the default (`leveldb`),
and wants to run with `rocksdb` next.
Note the use of the `--import` flag, which resets and re-imports the database.

* `java -Dkeyvalue.datasource=rocksdb -jar ./rskj-core/build/libs/rskj-core-*-all.jar --testnet --import`

**Warning:** This feature is considered experimental, do not use in production.

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
