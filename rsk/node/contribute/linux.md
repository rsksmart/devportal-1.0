---
layout: rsk
title: Linux
---

Here you have the steps to compile and run an RSK node on Linux.

This page is organized in this way:

- [Pre-requisites](#pre-requisites)

- [Get the source code](#get-the-source-code)

- [Ensure the security chain](#ensure-the-security-chain)

- [Get external dependencies](#get-external-dependencies)

- [Compiling and running the node](#compiling-and-running-the-node)

## Pre-requisites
First of all, you will need to install:


|Dependency        | Details|
|------------- |-------------|
|[Git for Linux](https://git-scm.com/download/linux)| Download this Git command line tool|
|[Java 8 JDK](http://www.webupd8.org/2012/09/install-oracle-java-8-in-ubuntu-via-ppa.html) | Follow the steps to install Java. To check if installation went correctly, check the version with command: `java-version`. Then, as admin, modify `/etc/enviroment` adding `JAVA_HOME="/usr/lib/jvm/java-8-oracle"`|
|[IntelliJ IDEA Community](https://www.jetbrains.com/idea/download/#section=linux)| Install this Java IDE |

## Get the source code 
Using the installed command-line tool Git, you need to retrieve (or clone) the RskJ Github source code from [here](https://github.com/rsksmart/rskj).

Run these commands on Git command line:
```
git clone --recursive https://github.com/rsksmart/rskj.git
cd rskj
git checkout tags/WASABI-1.0.2 -b WASABI-1.0.2
```
*Note:* it is better to download the code into a short path.


## Ensure the security chain
[Ensure the security chain](/rsk/node/contribute/verify) of the downloaded source code.


## Get external dependencies
Before you can launch IntelliJ IDEA, there is an important step.
Browse in your RskJ cloned directory and then launch `configure.sh` with the following terminal command:
`./configure.sh`.
This will download and set important components (e.g. Gradle Wrapper). 


## Compiling and running the node
Now, you can launch IntelliJ IDEA:
in a terminal, and from the folder you extracted the `tar.gz`, go into `idea/bin/`.
Then, type the following command to load the script:
```
./idea/sh
```
When IntelliJ IDEA is launched you should have a window with different choices.
- Choose *Import project*.
- Browse in the RskJ downloaded code the file `rskj\build.gradle` and select it. Click *NEXT*.
- Within the dialog select *Use default gradle wrapper* and then click *Finish*.
*Keep IntelliJ IDEA opened*.

![img](/assets/img/rsk/howToInstallAndRun/IdeaRskJWelcome.png)

### IDEA Build/Run configuration

We need to create a new configuration profile to run the node from IDEA.
That can be done by clicking on *Run* -> *Edit Configurations* or as shown in the following picture:

![img](/assets/img/rsk/howToInstallAndRun/EditConfigs.png)

Then set the options as shown below:

![img](/assets/img/rsk/howToInstallAndRun/AddNewConfig.png)

- Main Class: `co.rsk.Start`
- Working directory: `/path-to-code/rskJ`
- Use classpath of module: `rskj-core_main`
- JRE need to be set as: `Default (1.8 - SDK of 'rsk-core_main' module)`

### Running the node

We are ready to run the node using IDEA, just press the *Start* (green arrow) button at the right of the configuration we've just created.

![img](/assets/img/rsk/howToInstallAndRun/Run.png)

If everything is OK you should see the debug information like that:

![img](/assets/img/rsk/howToInstallAndRun/Running.png)

And yes! Congratulations! Now you're running a local RSK node :)

You're joined to MainNet by default. 

If you want to switch the network, add:
- For TestNet: `--testnet`
- For RegTest: `--regtest`

Inside the field `Program Arguments` in your run configuration.

## Any problems?
We hope our [troubleshooting section](/rsk/node/troubleshooting) can help you!