---
layout: rsk
title: RIF Notifier Setup and Install
tags: rif, notifier, setup, install
---

This page provides a guide for developers to setup and install the RIF Notifier project.

### Contents:
1. [Installation Guide](#installation-guide)
	* [Docker Installation](#installation-guide)
   		* [Prerequisites for docker installation](#prerequisites-for-docker-installation)
   		* [Docker Installation](#docker-installation-steps)
	* [Local Installation](#installation-guide)
   		* [Prerequisites for local installation](#prerequisites-for-local-installation)
   		* [Local Installation](#local-installation-steps)
2. [Usage Guide](#usage-guide)   
    1. [Preconditions](#preconditions)
    2. [Notifier Provider CLI](#notifier-provider-cli)
    3. [Notifier Consumer CLI](#notifier-consumer-cli)
    4. [Start the application](#start-the-application)

## Installation guide
RIF Notifier can be installed to run locally or in a docker container. Local installation can be performed by following the steps in [Local Installation](#local-installation-steps). To run rif-notifier in a docker container, follow the instructions in [Docker Installation Steps](#docker-installation-steps).
## Setup

### Prerequisites for docker installation
#### 1. Docker
Make sure you have docker installed in your machine. If not, download from https://www.docker.com/products/docker-desktop
#### 2. git
The latest version of the `git` client can be installed through:
```shell
sudo apt update
sudo apt install git
```

### Docker Installation Steps

* Open a terminal.

* Install git by following the steps in [prerequisites for docker installation](#prerequisites-for-docker-installation).

* Clone this repo using `git clone https://github.com/rsksmart/rif-notifier rif-notifier` and switch to the rif-notifier directory by using command `cd rif-notifier`
  
* Install notifier provider cli by following steps in [notifier provider cli](#notifier-provider-cli)

* Copy `config-docker-template.json` to `config-docker.json`
  
* Set the `dbpassword` environment variable for mysql docker container. Set the same password to rif-notifier by running command `notifier-prov-cli dockerconfigure --dbpassword`.

* Run `notifier-prov-cli dockerconfigure` to configure the required properties to run RIF notifier docker instance.

* Run the command `notifier-prov-cli dockerbuild`  This command will build the mysql, and rif-notifier docker images and run it. Wait for the server to start until you see message started application in x(seconds).

* Run the command `notifier-prov-cli create subscriptionplan --docker` to create subscription plans.

* Once the containers are fully running, test it by using following command `curl -k http://localhost:8080/getSubscriptionPlans`. And that's it, congrats! you should see a response with the json of subscription plans.

* Subsequently to stop and start the docker containers use `notifier-prov-cli dockerstop` and `notifier-prov-cli dockerstart`


### Prerequisites for local installation
#### 1. git
The latest version of the `git` client can be installed through:

```shell
sudo apt update
sudo apt install git
```
#### 2. RSK Blockchain (Mainnet)
The next requirement is an RSK node which can be run using the **JAR file** method. Use the latest RSKj version avaiable and have it sync with mainnet.

This node should be accessible through `localhost:4444`. For more information on how to achieve this, please consult the [_Setup node on Java_ section on the Developer Portal](https://developers.rsk.co/rsk/node/install/java/).


#### 3. MySQL
The latest version of the `mysql-server` database can be installed through:

```shell
sudo apt update
sudo apt install mysql-server
```

Then, run the installer by executing:

```shell
sudo mysql_secure_installation
```

This will take you through a series of prompts where you can configure your MySQL installation.

##### 3.1 Verification
You can verify the MySQL service is running by executing:

```shell
sudo service mysql status
```

You can verify the port used by the MySQL is of the expected value `3306` by executing:

```shell
sudo netstat -tlnp | grep mysql
```

`netstat` can be installed through `sudo apt install net-tools`.

#### 4. Maven
The latest version of maven can be installed through:

```shell
sudo apt install maven
```



### Local Installation Steps

The steps in this section will help you configure mysql database in local environment.

1. Ensure [prerequisites for local installation](#prerequisites-for-local-installation) are met.
   
2. Run the script bin/install.sh with 3 parameters as below, this will create the mysql user notifier_user with required permissions
```
bin/install.sh <database root user> <database root password> <notifier_user password>
```
The third parameter is the password for user ```notifier_user``` which will be created by this script



---

## Update
To update an already installed RIF Notifier follow these steps:
1. Stop the RIF Notifier process.
2. Navigate to the `rif-notifier` directory and pull the latest code by executing `git pull`. The `master` branch should still be used.
3. Start the RIF Notifier by running the command `notifier-prov-cli start`.


## Usage guide
### Preconditions

RIF Notifier uses `eth_getLogs` rpc to get the information about events, therefore the RSK node must respond in a reasonable
timeframe (< 30s)

Since the `eth_getLogs` result is cached, it will take a long time for this call to finish the first time it is executed after the RSK node is started. This will happen each time the RSK node boots.
After this, each call should be finished in a reasonable time.

Use this curl to test the `eth_getLogs` response:
```
curl -X POST http://localhost:4444 -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"address":"0xde2D53e8d0E673A4b1D9054cE83091777F2fd8Ce","fromBlock":"0x0","toBlock":"latest"}],"id":74}'
```

## Notifier Provider CLI

Notifier Provider CLI is a command line tool to configure and run the rif-notifier. 

To install and use notifier provider cli see https://github.com/rsksmart/rif-notifier/notifier-prov-cli

## Notifier Consumer CLI

Notifier Consumer CLI is a command line tool for RIF-Notifier consumers to perform operations like subscribe to a plan, renew a subscription, and list user subscriptions.

To install and use notifier consumer cli see https://github.com/rsksmart/rif-notifier/notifier-cons-cli 

### Start the application

Use `notifier-prov-cli start` to start the rif notifier locally, or `notifier-prov-cli dockerstart` to start rif notifier  docker instance
