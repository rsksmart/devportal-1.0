---
layout: rsk
title: Setup node on Ubuntu
---

<style>
  img.setup-node-ubuntu{
    margin:0 auto;
    width:80%;
  }
</style>
> Minimum Requirement
Make sure your system meet the [Minimum Requirement](https://github.com/rsksmart/rskj/wiki/Node-Minimum-Requirements) before installing the RSK nodes on it.  

## Install RSK node via Ubuntu Package

The easiest way to install and run a RSK node on Ubuntu is to do it through Ubuntu Package. By default, the node connects to MainNet.  To change the network choice, follow the instructions on [Switching Networks](https://github.com/rsksmart/rskj/wiki/Switching-networks). To change other configuration of the node, please refer to the instructions on [RSK Node Configuration](https://github.com/rsksmart/rskj/wiki/RSK-node-configuration).

### Install via PPA

Type the commands below to install RskJ on Ubuntu using our PPAs for Ubuntu. 

The installed repo public key Fingerprint is 5EED 9995 C84A 49BC 02D4 F507 DF10 691F 518C 7BEA. Also, the public key could be found in document [Ubuntu Key Server](https://keyserver.ubuntu.com/).

```shell
$ sudo add-apt-repository ppa:rsksmart/rskj
$ sudo apt-get update
$ sudo apt-get install rskj
```

During the installation, you will be asked to accept the terms and confirm the network.   

<img alt="" class="setup-node-ubuntu" src="https://files.readme.io/302140d-Screen_Shot_2019-06-04_at_1.11.27_PM.png">

Choose Yes and Enter to accept the license to continue

<img alt="choose mainnet" class="setup-node-ubuntu" src="https://files.readme.io/53d7723-Screen_Shot_2019-06-04_at_1.11.54_PM.png">

Choose Mainnet and Enter to continue



### Install via Direct Downloads

You can also download the RskJ Ubuntu Package for Orchid 0.6.2 and install it with command dpkg. Follow this [download link](https://launchpad.net/~rsksmart/+archive/ubuntu/rskj/+packages) to download the matched package for your ubuntu system.

```shell
# first install openjdk-8-jre or oracle-java8-installer
sudo apt-get install openjdk-8-jre

# download the RskJ pacakge and find the file rskj_0.6.2~yourUbuntuVersionName_amd64.deb

# run this command in the same directory as the deb file above
dpkg -i rskj_0.6.2~yourUbuntuVersionName_amd64.deb
```


Before installation, you are recommended to check the SHA256 of the downloaded package file.

```
5482fa4261d70756f5944fa907a9d73e2a13884d97d57aef2e553854d905ff16  rskj_0.6.2_bionic_amd64.deb
68d4ce155f8171f7ad4d5a35bed7b566329f53945dadc2f6312f19f46c5d1ed1  rskj_0.6.2_bionic_i386.deb
b5caa06e53774c7b1a2c5e3a54ecdfc2621fc37a597d16de7ac0a02afa6fb93b  rskj_0.6.2_trusty_amd64.deb
fa9d10f1e902f300a98406f9575ac4e0d6172c9500384e417cf3c1157b7aadfb  rskj_0.6.2_trusty_i386.deb
5eece84721d8d03179e5f3d17403b8c289c0fd6f33f5fafcef06103d5952ff2d  rskj_0.6.2_xenial_amd64.deb
088182552ac5ea063ed2a1f4f47942a3d55fc29e29c87dc73d0c7bf9c3bf2171  rskj_0.6.2_xenial_i386.deb
```

### After installation

The installer will configure your node in the following paths:

  *   /etc/rsk: the directory where the config files will be placed.
  *   /usr/share/rsk: the directory where the RskJ JAR will be placed.
  *   /var/lib/rsk/database: the directory where the database will be stored.
  *   /var/log/rsk: the directory where the logs will be stored.

<img alt="path" class="setup-node-ubuntu" src="https://files.readme.io/01c77ce-Screen_Shot_2019-06-04_at_1.14.31_PM.png">

### Start/Stop the Node

After installation, you can use the following commands to manage your node.

**To start the node:**
```shell
sudo service rsk start
```


**To stop the node: **
```shell
sudo service rsk stop
```

**To restart the node: **
```shell
sudo service rsk restart
```

**To check the status of the node service:**
```shell
sudo service rsk status
```
<img alt="scripts" class="setup-node-ubuntu" src="https://files.readme.io/67dd7bd-Screen_Shot_2019-06-04_at_1.13.05_PM.png">
