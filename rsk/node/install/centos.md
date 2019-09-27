---
layout: rsk
title: Setup node on CentOS
---
## Install RSK node in CentOS Distribution


Using the scripts below to install and run a RSK node on CentOS. By default, the node connects to MainNet.  To change the network choice, follow the instructions on [Switching Networks](https://github.com/rsksmart/rskj/wiki/Switching-networks). To change other configuration of the node, please refer to the instructions on [RSK Node Configuration](https://github.com/rsksmart/rskj/wiki/RSK-node-configuration).


```shell
#!/bin/bash
## Basic Steps to setup your CentOS environment and RSKJ Node.

## Install JAVA and WGET
sudo yum install java-1.8.0-openjdk epel-release wget jq -y

## ADD RSK User & Group
sudo adduser rsk

## Create APP Directories
sudo mkdir /var/lib/rsk
sudo mkdir /var/log/rsk
sudo mkdir /etc/rsk
sudo mkdir /usr/share/rsk
sudo chown rsk:rsk /var/log/rsk/
sudo chown rsk:rsk /var/lib/rsk/

## Download Latest RSK Release
wget -q -nv -O- https://api.github.com/repos/rsksmart/rskj/releases/latest 2>/dev/null |  jq -r '.assets[]' |grep browser |cut -d ":" -f 2,3 |tr -d \" |sudo wget -qi - -O /usr/share/rsk/rsk.jar

## Download RSK Config files.

sudo wget https://raw.githubusercontent.com/rsksmart/artifacts/master/rskj-ubuntu-installer/config/testnet.conf -O /etc/rsk/testnet.conf
sudo wget https://raw.githubusercontent.com/rsksmart/artifacts/master/rskj-ubuntu-installer/config/mainnet.conf -O /etc/rsk/mainnet.conf
sudo wget https://raw.githubusercontent.com/rsksmart/artifacts/master/rskj-ubuntu-installer/config/regtest.conf -O /etc/rsk/regtest.conf
sudo wget https://raw.githubusercontent.com/rsksmart/artifacts/master/rskj-ubuntu-installer/config/logback.xml -O /etc/rsk/logback.xml

## Set Default RSK Network

sudo ln -s /etc/rsk/mainnet.conf /etc/rsk/node.conf
### sudo ln -s /etc/rsk/testnet.conf /etc/rsk/node.conf
### sudo ln -s /etc/rsk/regtest.conf /etc/rsk/node.conf

## Create RSK systemd Service

cat << EOF | sudo tee /etc/systemd/system/rsk.service
[Unit]
Description=RSK Node

[Service]
LimitNOFILE=500000
Type=simple
ExecStart=/usr/bin/java -Dlogback.configurationFile=/etc/rsk/logback.xml -Drsk.conf.file=/etc/rsk/node.conf -cp /usr/share/rsk/rsk.jar co.rsk.Start 2>&1 &
ExecStop=/bin/kill -9 $(/bin/ps -U rsk -o pid h)
PIDFile=/var/run/rsk.pid
User=rsk

[Install]
WantedBy=multi-user.target
EOF

## Enable RSK Service
sudo systemctl enable rsk.service

## Start RSK node
sudo service rsk start

```