---
layout: rsk
title: Lumino Explorer API
---

## Pre requisites

1. Access to a synched RSK node. You can do this in a variety of ways:
   * [Run your own node](/rsk/node/install) on Testnet or Mainnet
   * [Compile and run a RSK node locally](/rsk/node/contribute)
2. Mongo Database Server (Version 3.6.x)
3. Java 8 (Lastest Release)
4. Maven (Version 3.6.x)
5. RSK valid account

## Build RIF Lumino Explorer API from code

1. Get the code by cloning [the repo](https://github.com/rsksmart/lumino-explorer/)
2. Go to the path you downloaded or cloned Lumino Explorer's code (let's call this path `$RIF_LUMINO_EXPLORER_PATH` and define `$RIF_LUMINO_EXPLORER_API_PATH=$RIF_LUMINO_EXPLORER_PATH/lumino-explorer-api`)
3. Go to `$RIF_LUMINO_EXPLORER_API_PATH/src/main/resources` and edit `application.properties`, setting the Token Network Registry address as the `lumino.contract.tokenNetworkRegistry` property. 
4. Set the `lumino.explorer.api.account.file` property to the JSON file of your RSK account. Example: `lumino.explorer.api.account.file=UTC--2019-04-19T15-07-00.568000000Z--034000b5f2862d114e4b3474f79fc64aad0cb742.json`

5. Set the `lumino.explorer.api.account.password` property to the password of your account. Example: `lumino.explorer.api.account.paassword=3XhLXn[(Tub6'~Qe`

6. Install project dependencies running the following command inside the `RIF_LUMINO_EXPLORER_API_PATH` directory:

```bash
mvn install
```

## Set Up Mongo Database

 1. Go to `$RIF_LUMINO_EXPLORER_API_PATH/src/main/resources/database`

 2. Run the following command when the mongodb server is installed on the local machine:

```user:~/mongo lumino-explorer-api-database-setup.js```

If an error is showed, you must execute the following script, specifying a host, port and authentication credentials

```user:~/mongo --host <hostname> -u <username> -p <password> lumino-explorer-api-database-setup.js```

Example:

```user:~/mongo --host 10.10.7.161:27017 -u mongodb -p mongodb lumino-explorer-api-database-setup.js```

 3. After you run mongo shell command, you will be presented with the following message:

```bash
MongoDB shell version $MONGO_SERVER_VERSION
connecting to: mongodb:$MONGO_HOST:$MONGO_PORT
MongoDB server version: $MONGO_SERVER_VERSION
Switched to db lumino_explorer
Creating a new collection with name event_job_metadata
WriteResult({ "nInserted" : 1 })
New  database with name lumino_explorer is created succesfully
The collections into database are:
event_job_metadata
The count of elements into my event_job_metadata is :
1
All is done, Now you can run the lumino-explorer-api
Bye
```


## Start your RIF Lumino Explorer API

1. Go to `$RIF_LUMINO_EXPLORER_API_PATH`
2. Run the following command:

```bash
 mvn spring-boot:run
```

 3. Now you can check if the API is running, going to http://localhost:8080. These are the default host and port if you run it locally.

## Additional help

The following sections are created using Ubuntu 18.04.2 LTS

### Install Maven

(source: [https://linuxize.com/post/how-to-install-apache-maven-on-ubuntu-18-04](https://linuxize.com/post/how-to-install-apache-maven-on-ubuntu-18-04/))

Start by updating the package index:

```bash
$ sudo apt update 
```

Next, install Maven by typing the following command:

```bash
$ sudo apt install maven
```

Verify the installation by running the `mvn -version` command:

```bash
$ mvn -version
```
The output should look something like this:

```bash
output
Apache Maven $MAVEN_VERSION
Maven home: $YOUR_MAVEN_HOME
Java version: $JAVA_VERSION
Java home: $JAVA_HOME
Default locale: $YOUR_LOCALE
OS name: $YOUR_OS_VERSION
```

## Useful Links

* [RIF Lumino Network documentation](https://www.rifos.org/rif-lumino-network/)
* [http://explorer.lumino.rifos.org/](http://explorer.lumino.rifos.org/)
* [RIF Lumino Contracts](https://github.com/rsksmart/lumino-contracts) 
* [RIF Lumino Web](https://github.com/rsksmart/lumino-web) 
* [RIF Lumino Network](https://github.com/rsksmart/lumino) 
