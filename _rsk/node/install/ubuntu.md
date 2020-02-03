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

You can also download the RskJ Ubuntu Package for Orchid 0.6.2 and install it with the `dpkg` command. Follow this [download link](https://launchpad.net/~rsksmart/+archive/ubuntu/rskj/+packages) to download the matching package for your ubuntu system.

```shell
# first install openjdk-8-jre or oracle-java8-installer
sudo apt-get install openjdk-8-jre

# download the RskJ pacakge and find the file rskj_0.6.2~yourUbuntuVersionName_amd64.deb

# run this command in the same directory as the deb file above
dpkg -i rskj_0.6.2~yourUbuntuVersionName_amd64.deb
```

We recommend that you check that the SHA256 hash of the downloaded package file matches, prior to installation:

* `rskj_1.2.1~bionic_amd64.deb`: `1217a52028eff87feef3d46baab9c8be7a7d37811b43646c679f1373b0be4ff0`
* `rskj_1.2.1_bionic_i386.deb`: `7b31c2cce78e1b43bad4ca0f1de5757bc0454a855e499abe3effdb4388e79c1f`
* `rskj_1.2.1_trusty_amd64.deb`: `0c638ca45c98ef7e2b767fab46624f25c22f0505c917e11e374be1f2b0d93923`
* `rskj_1.2.1_trusty_i386.deb`: `1e56f1d360aaa5ef4e654db53c672a46c626532d9089b52c194ae57d7df73c54`
* `rskj_1.2.1_xenial_amd64.deb`: `d2151daf3d22df58280e44b7e41a82e8a05753c81d8d2304b5121921f44494fa`
* `rskj_1.2.1_xenial_i386.deb`: `de37059219adc93d82b9ce811ba819163fddc9ab767bb499f75f919e3d00ed2b`

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
