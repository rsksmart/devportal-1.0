---
layout: rsk
title: Installing Swarm
---

To install Swarm, you can download the latest binaries or—alternatively—compile them directly from the source code.

---

# • Download the binaries (recommended)

Pre-compiled binaries for Linux, macOS and Windows are available to download from [the Swarm official homepage](https://swarm-gateways.net/bzz:/swarm.eth/downloads/).

---

# • Compile from source code

## Prerequisites

### 1. Git

To install `git`, follow the instructions [here](https://git-scm.com/downloads).

### 2. Golang

To install `go`, follow the instructions [here](https://golang.org/doc/install).

#### 2.1 Set up Go environmnet

Make sure the `GOPATH` environment variable is set:

```shell
echo 'export GOPATH=$HOME/go' >> ~/.bashrc
echo 'export PATH=$GOPATH/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

Create the `$HOME/go` directory if it doesn't exist:

```shell
mkdir $HOME/go
```

Verify this step was successful through `echo $GOPATH`.

## Create the Swarm binaries

If needed, create the directory for the project:

```sh
mkdir -p $GOPATH/src/github.com/ethersphere
```

Clone the repo:

```sh
cd $GOPATH/src/github.com/ethersphere/ &&
git clone https://github.com/ethersphere/swarm
```

Compile the Swarm binaries:

```sh
cd $GOPATH/src/github.com/ethersphere/swarm &&
make swarm
```

Check the Swarm version:

```sh
cd $GOPATH/src/github.com/ethersphere/swarm/build/bin/ &&
./swarm version
```

## Updating & Reinstalling

To update the Swarm client simply download the newest source code and recompile.

---

_Guide based on [Swarm for Node-Operators: Installation and Updates](https://swarm-guide.readthedocs.io/en/latest/node_operator.html#installation-and-updates), by the Swarm team._
