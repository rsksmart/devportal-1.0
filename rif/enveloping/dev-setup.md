---
layout: rsk
title: RIF Enveloping - Setup
tags: rif, enveloping, rsk, envelope, gas station network, gsn, setup
---

Below are the basic requirements needed to use the enveloping service:

1. **Typescript:** One of the main programming languages in the project is `typescript`. Here are the instructions for [installing typescript](https://www.typescriptlang.org/#installation).
2. **Yarn:** We use `yarn` version `v1.22.0` for package management. Installation instructions at [Yarn's site](https://yarnpkg.com/getting-started/install). Check the installation by running `yarn version`.
3. **Node & NPM:** We use `Node` version `v12.18.3`.
Check the [Installation guide](https://nodejs.org/en/). Check if node is installed by running `node -v`.
The `Node package manager` or `NPM` we use for managing node packages is NPM version `6.14.6`.
4. **NPX and Truffle:** An important tool we use for interacting with the blockchain is `Truffle` version `v5.0.33`.
Check out the [installation guide](https://www.trufflesuite.com/truffle).
We run all truffle commands with the prefix `npx`. This is to execute node packages using the project's version of `NPM`.
Checking the installation by running `npx truffle version`
The configuration file is `truffle.js`. Please see [Truffle's documentation](https://www.trufflesuite.com/docs) for details about this file and how to use it.
5. **Docker:** We recommend following the official documentation for installing Docker and keeping it updated.
You need to install `docker` and `docker-compose`

## Running on macOS

To run the project using Docker on a Mac, please follow these steps or the scripts and web apps will not work.

- Patch `readlink` The startup scripts assume that GNU's `readlink` command is available. But MacOS ships with BSD's `readlink`, which is incompatible with GNU's version. So we must patch `readlink`. This can be done using [Homebrew](https://brew.sh/) as follows:

```homebrew
brew install coreutils
ln -s /usr/local/bin/greadlink /usr/local/bin/readlink
```

After this step, you must make sure that your `PATH` variable gives priority to `/usr/local/bin` over `/usr/bin`. You can check this with `which readlink`, which should output `/usr/local/bin/readlink`.

Alternatively, try executing `readlink -f`, if it works you're good to go.
