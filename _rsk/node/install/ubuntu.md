---
layout: rsk
title: Setup node on Ubuntu
collection_order: 2322
---

Make sure your system meets the [minimum requirements](../requirements/) before installing RSK nodes on it.

## Install via Ubuntu Package Manager

The easiest way to install and run a RSK node on Ubuntu is to do it through Ubuntu Package Manager.

Type the commands below to install RskJ on Ubuntu using our PPAs for Ubuntu.

The installed repo public key Fingerprint is `5EED 9995 C84A 49BC 02D4 F507 DF10 691F 518C 7BEA`. Also, the public key could be found in document [Ubuntu Key Server](https://keyserver.ubuntu.com/).

```shell
$ sudo add-apt-repository ppa:rsksmart/rskj
$ sudo apt-get update
$ sudo apt-get install rskj
```

During the installation, you will be asked to accept the terms and confirm the network.

<img alt="" class="setup-node-ubuntu" src="/assets/img/ubuntu/ubuntu1.png">

Choose Yes and Enter to accept the license to continue

<img alt="choose mainnet" class="setup-node-ubuntu" src="/assets/img/ubuntu/ubuntu2.png">

Choose `mainnet` and press `Enter` to continue

## Install via Direct Downloads

You can also download the RskJ Ubuntu Package for Wasabi 1.3.0 and install it with the `dpkg` command. Follow this [download link](https://launchpad.net/~rsksmart/+archive/ubuntu/rskj/+packages) to download the matching package for your Ubuntu system.

```shell
# First install openjdk-8-jre or oracle-java8-installer
sudo apt-get install openjdk-8-jre

# Download the RskJ package from the given link 

# Run this command in the same directory as the deb downloaded file 
sudo dpkg -i rskj_1.3.0~yourUbuntuVersionName_amd64.deb
```

We recommend that you check that the SHA256 hash of the downloaded package file matches, prior to installation:

* `rskj_1.3.0~bionic_amd64.deb`: `57851fda0efe790ce0f45daebc0d7e51b022c82afed4be576d9f02e4d912ae0f`
* `rskj_1.3.0_bionic_i386.deb`: `ba68f39d0a09306949417de2271254cdb74cbbfd424951ef0c6dd94f4e649e6c`
* `rskj_1.3.0_trusty_amd64.deb`: `e9e60115fe5d98b8216829817d7b2068ae5eea89fdaa0cbcb3510b3499ca9cee`
* `rskj_1.3.0_trusty_i386.deb`: `9186e450fd3aff33278500b97a9b0886ba2403c10a94e9d654d7d75fde15c45b`
* `rskj_1.3.0_xenial_amd64.deb`: `4eddb44be7011b97a49a4f500bb20867234967c18a9f6bc117390021a2963338`
* `rskj_1.3.0_xenial_i386.deb`: `bf443f3efbb8dcc2da6154ca35ac29942d726fd936f8727aaf942e11449e6801`

## After installation

By default, the node connects to Mainnet. To change the network choice (Mainnet/ Testnet/ Regtest), refer to the instructions in [switching networks](/rsk/node/configure/switch-network). To change configurations for the node, refer to the instructions in [RSK Node Configuration](/rsk/node/configure).

The installer will configure your node in the following paths:

* `/etc/rsk`: the directory where the config files will be placed.
* `/usr/share/rsk`: the directory where the RskJ JAR will be placed.
* `/var/lib/rsk/database`: the directory where the database will be stored.
* `/var/log/rsk`: the directory where the logs will be stored.

<img alt="path" class="setup-node-ubuntu" src="/assets/img/ubuntu/ubuntu3.png">

### Start/Stop the Node

After installation, you can use the following commands to manage your node.

**To start the node:**

```shell
sudo service rsk start
```

**To stop the node:**

```shell
sudo service rsk stop
```

**To restart the node:**

```shell
sudo service rsk restart
```

**To check the status of the node service:**

```shell
sudo service rsk status
```

<img alt="scripts" class="setup-node-ubuntu" src="/assets/img/ubuntu/ubuntu4.png">

## Video

<div class="video-container">
  <iframe width="949" height="534" src="https://www.youtube-nocookie.com/embed/eW9UF2aJQgs?cc_load_policy=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
