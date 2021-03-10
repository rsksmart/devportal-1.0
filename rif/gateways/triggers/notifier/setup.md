---
layout: rsk
title: RIF Notifier Setup and Install
tags: rif, notifier, setup, install
---

This page provides a guide for developers to setup and install the RIF Notifier project.

### Contents:

1. [Installation](#installation-guide)
   1. [Prerequisites](#prerequisites)
   2. [Automatic Installation](#automatic-installation-steps)
   3. [Manual Installation](#manual-installation-steps)
   4. [Docker Installation](#docker-installation-steps)
2. [Usage Guide](#usage-guide)
    1. [Preconditions](#preconditions)
    2. [Start the application](#start-the-application)

## Installation guide

## Setup

### Prerequisites

#### 1. RSK Blockchain (Mainnet)

The first requirement is an RSK node which can be run using the **JAR file** method. Use the latest RSKj version available and have it sync with mainnet.

This node should be accessible through `localhost:4444`. For more information on how to achieve this, please consult the [_Setup node on Java_ section on the Developer Portal](https://developers.rsk.co/rsk/node/install/java/).

#### 2. git

The latest version of the `git` client can be installed through:

```shell
sudo apt update
sudo apt install git
```

**Note:** for [docker installation](#docker-installation-steps) the following steps are not required.

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
### Automatic Installation steps

1. Ensure [prerequisites](#prerequisites) are met.

2. Run bin/install.sh with 3 parameters as below, this will clone the rif-notifier repo from github and create the mysql user notifier_user with
required permissions
```
bin/install.sh <database root user> <database root password> <notifier_user password>
```
The third parameter is the password for user ```notifier_user``` which will be created by this script

3. Run the command ```cd rif-notifier``` and open ```config.json``` file from the ```rif-notifier``` folder. Set the ```dbpassword``` property to the password you just entered in previous step for ```notifier_user_password```

4. Navigate to [usage guide](#usage-guide) to learn more about how to run and use the application.

### Manual Installation steps

1. Pick a directory for all the RIF Notifier code to reside in. From now on this will be called `rif-notifier`, but replace it with your own.
2. Clone the RIF Notifier git project into its directory doing:

```shell
git clone https://github.com/rsksmart/rif-notifier rif-notifier
```
Stay on the `master` branch.

. Create the RIF Notifier database and configure its access. This is done by first opening the MySQL prompt by executing:

```shell
sudo mysql
```

Then, pick a name for the RIF Notifier database to be used. From now on this will be called `rif_notifier`, but replace it with your own.

Create the schema by entering:

```mysql
CREATE DATABASE rif_notifier;
```

in the `mysql` prompt.

Now pick a username and password for the database to be accessed with. From now on these will be called `notifier_user` and `notifier_db_password`, but replace them with your own.

To have these set up in the MySQL database first do:

```mysql
CREATE USER 'notifier_user'@'localhost' IDENTIFIED BY 'notifier_db_password';
```

in the `mysql` prompt. Then grant this user all permissions on the schema by doing:

```mysql
GRANT ALL PRIVILEGES ON rif_notifier.* TO 'notifier_user'@'localhost';
```

and then exit the `mysql` terminal by entering `exit`.

Restart the MySQL service by executing:

```shell
sudo /etc/init.d/mysql restart
```


### Docker Installation Steps

1. Make sure you have docker installed in your machine. If not, download from https://www.docker.com/products/docker-desktop
2. Open a terminal.
3. Install git and rsk blockchain by following the steps in [prerequisites](#prerequisites).
4. Clone this repo using `git clone https://github.com/rsksmart/rif-notifier rif-notifier` and switch to the rif-notifier directory by using command `cd rif-notifier`
5. Edit `config-docker.json` to update the `rskendpoint` to point to the rsk blockchain endpoint. In case you are running locally, set the endpoint to `http://host.docker.internal:4444` Update other required properties in the same file, see [`config.json`](#start-the-application)
6. Modify `subscription-plan.json` under src/main/resources to provide the subscription plan details. See [create subscription plans](../subscription-plans#create-subscription-plans) to change or add new subscription plans. To use the example provided, leave the file unchanged.
7. Run `docker-compose up --build`  This command will build the mysql, and rif-notifier docker images and run it.
8. Once the containers are fully running, test it by using following command `curl -k http://localhost:8080/getSubscriptionPlans`. And that's it, congrats! you should see a response with the json of subscription plans. In case the response is empty, use `docker-compose restart` command to restart the container.
9. Subsequently to stop and start the docker containers use `docker-compose stop` and to start use `docker-compose start`

---

## Execution
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

### Start the application

First modify the `config.json` file to setup the rsk blockchain and database properties. Note: the comments should be removed in the actual json. The below are example values for each json property.

```json
{
	"serverport":"8080",  // server port to start the server on

	"dbhost":"localhost",  //database host name
	"dbname":"rif_notifier",  //database name
	"dbuser":"notifier_user",  //database user with privileges
	"dbpassword":"##password##",  //database password

	"rskendpoint":"http://localhost:7545",  //rsk blockchain endpoint
	"blockconfirmationcount":"20",  // number of blocks to wait for confirmation
	"smartcontractaddress":"0xC2Cd3835d36510dc065d0f8991785DAA70a601a4",  // smart contract address for payments
	"tokennetworkregistry":"0xFEC354973ca22697BC5Cd1E7F372609574e2AfcA",
	"multichaincontract":"0xFEC354973ca22697BC5Cd1E7F372609574e2AfcA",

	"provideraddress":"0x882bf23c4a7E73cA96AF14CACfA2CC006F6781A9",  // provider address
	"providerprivatekey":"b1ed36c7f7e02edeaacfd7b485cc857e3051e94a73195a6c96c88dd74d22744a", //provider privatekey without hex prefix

	"notificationpreferences":"API,EMAIL",  // supported notifications comma separated

	"acceptedcurrencies":"RIF,RBTC"  // supported currencies comma separated
}
```

To run the RIF Notifier start a terminal in `rif-notifier` directory and run:


Then run the command `bin/subscriptionplans.sh`  to create the subscription plans. Refer to [create subscription plans](../subscription-plans#create-subscription-plans) and [update subscription plans](../subscription-plans#update-subscription-plans)

#### Run the application

Run the command `bin/run.sh` to start rif-notifier.
