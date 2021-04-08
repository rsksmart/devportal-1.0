---
layout: rsk
title: Command Line Interface
tags: rsk, rskj, node, cli
description: "Command Line Interface for RSK"
collection_order: 2405
permalink: /rsk/node/configure/cli/
render_features: 'custom-terminals'
---

Most of the configurable options or settings for RSKj are available
in "config". See [config reference](../reference/) for more details.

However, a list of command line flags are also available:

## Network related

The following CLI flags determine which network the RSK node will connect to.

- `--main`:
  Indicates that the configuration for the RSK Mainnet (public network) should be used.
- `--testnet`:
  Indicates that the configuration for the RSK Testnet (public network) should be used.
- `--regtest`:
  Indicates that the configuration for the RSK Regtest (localhost network) should be used.

Only one of these three CLI flags should be specified.

When none of these are specified, RSK Mainnet is used by default.

## Database related

The RSK node stores transactions, blocks,
and other blockchain state on disk.
This is known as the *Blockchain Database*.

- `--reset`:
  Indicates that the block database should be erased, and should start from scratch,
  i.e. from genesis block.
  This is typically expected to be used when connecting to RSK Regtest,
  or in select debugging scenarios.
- `--import`:
  Indicates that the block database should be imported from an external source.
  This is typically expected to be used when connecting to RSK Testnet or RSK Mainnet,
  and when a reduction in "initial sync time" is desired.

## Configuration related

- `--verify-config`:
  Indicates that the configuration file used by this run of the RSK node
  should be validated.
  By default this step is always performed.
- `--print-system-info`:
  Indicates that the system information of the computer that the RSK node
  is running on should be output.
  By default, this is always output.
- `--skip-java-check`:
  Indicates that the detection of the version of
  the Java Virtual Machine that the RSK node is running in is supported.
  By default, this check is always performed, to ensure that the RSK node is running
  in a compatible environment.
- `-base-path`: 
  Specifies the base path `NodeCliOption` to enhance the block replay tool user experience.

## Reference implementation

See the definition of the CLI flags in the RSKj codebase:
[`NodeCliFlags` in `NodeCliFlags.java`](https://github.com/rsksmart/rskj/blob/master/rskj-core/src/main/java/co/rsk/config/NodeCliFlags.java)
