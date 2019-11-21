---
layout: rsk
title: Installing Swarm
---

# 1. Prerequisites

## 1.1 Git
To install `git`, follow the instructions [here](https://git-scm.com/downloads).

## 1.2 Golang
To install `go`, follow the instructions [here](https://golang.org/doc/install).

### 1.2.1 Set up Go environmnet
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

## 1.3 Geth
To install `Geth`, follow the instructions [here](https://geth.ethereum.org/docs/install-and-build/installing-geth).

# 2. Create the Swarm binaries

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

------

_Guide based on [Swarm for Node-Operators: Installation and Updates](https://swarm-guide.readthedocs.io/en/latest/node_operator.html#installation-and-updates), by the Swarm team._