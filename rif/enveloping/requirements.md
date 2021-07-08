---
layout: rsk
title: RIF Enveloping - Requirements
tags: rif, enveloping, rsk, envelope, gas station network, gsn, requirements
---

### RSK Node

You need to have a running RSK node version [PAPYRUS-2.2.0](https://github.com/rsksmart/rskj/releases) or higher.

### Yarn

We use `yarn` version `v1.22.0` for package management. 

Installation instructions at Yarn's [site](https://yarnpkg.com/getting-started/install). Check the install by running `yarn version`.

### Node & NPM

We use `Node` version `v12.18.3`.

Installation instructions at Node's [site](https://nodejs.org/en/). Check the install by running `node -v`.

### Npx & Truffle

An important tool we use for interacting with the blockchain is `Truffle` version `v5.0.33`.

You can follow the installation guide in the official [site](https://www.trufflesuite.com/truffle).

We run all truffle commands with the prefix `npx`. This is to execute node packages using the project's version.

Checking the install by running `npx truffle version`.

The configuration file is `truffle.js`. Please see Truffle's documentation for details about this file and how to use it.

### Docker

We recommend following the official [documentation](https://docs.docker.com/get-docker/) for installing Docker and keeping it updated.

You'll need to install both `docker` as well as `docker-compose`.

#### Running on macOS
To run the project using Docker on a Mac, please follow these steps or the scripts and web apps will not work. 

- Patch `readlink`
The startup scripts assume that GNU's `readlink` command is available. But MacOS ships with BSD's `readlink`, which is incompatible with GNU's version. So we must patch `readlink`. This can be done using [Homebrew](https://brew.sh/) as follows:

```
brew install coreutils
ln -s /usr/local/bin/greadlink /usr/local/bin/readlink
```

After this step, you must make sure that your `PATH` variable gives priority to `/usr/local/bin` over `/usr/bin`. You can check this with `which readlink`, which should output `/usr/local/bin/readlink`. Alternatively try executing `readlink -f .`, if it works you're ok.
