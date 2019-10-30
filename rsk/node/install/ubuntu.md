---
layout: rsk
title: Setup node on Ubuntu
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

* `rskj_0.6.2_bionic_amd64.deb`: `5482fa4261d70756f5944fa907a9d73e2a13884d97d57aef2e553854d905ff16`
* `rskj_0.6.2_bionic_i386.deb`: `68d4ce155f8171f7ad4d5a35bed7b566329f53945dadc2f6312f19f46c5d1ed1`
* `rskj_0.6.2_trusty_amd64.deb`: `b5caa06e53774c7b1a2c5e3a54ecdfc2621fc37a597d16de7ac0a02afa6fb93b`
* `rskj_0.6.2_trusty_i386.deb`: `fa9d10f1e902f300a98406f9575ac4e0d6172c9500384e417cf3c1157b7aadfb`
* `rskj_0.6.2_xenial_amd64.deb`: `5eece84721d8d03179e5f3d17403b8c289c0fd6f33f5fafcef06103d5952ff2d`
* `rskj_0.6.2_xenial_i386.deb`: `088182552ac5ea063ed2a1f4f47942a3d55fc29e29c87dc73d0c7bf9c3bf2171`

## After installation

By default, the node connects to MainNet. To change the network choice (MainNet/ TestNet/ RegTest), refer to the instructions in [switching networks](https://github.com/rsksmart/rskj/wiki/Switching-networks). To change configurations for the node, refer to the instructions in [RSK Node Configuration](https://github.com/rsksmart/rskj/wiki/RSK-node-configuration).

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
