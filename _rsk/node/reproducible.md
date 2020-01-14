---
layout: rsk
title: Reproducible Build
collection_order: 2500
permalink: /rsk/node/reproducible/
---

Gradle building
===============	

*Setup instructions for gradle build in docker container.*	

This is a deterministic build process used to build RSK node JAR file. It provides a way to be reasonable sure that the JAR is built from GitHub RskJ repository. It also makes sure that the same tested dependencies are used and statically built into the executable.	

It's strongly suggested to follow the steps by yourself to avoid any kind of contamination in the process.	

Table of Contents	
-----------------	
- [Install Docker](#install-docker)	
- [Build the environment docker container](#build-container)	
- [Run Build](#run-build)	
- [Check Results](#check-results)	

Install Docker	
--------------	
Depending on your OS, you can install Docker following the official Docker guide:	

- [Mac](https://docs.docker.com/docker-for-mac/install/)	
- [Windows](https://docs.docker.com/docker-for-windows/install/)	
- [Ubuntu](https://docs.docker.com/engine/installation/linux/ubuntu/)	
- [CentOS](https://docs.docker.com/engine/installation/linux/centos/)	
- [Fedora](https://docs.docker.com/engine/installation/linux/fedora/)	
- [Debian](https://docs.docker.com/engine/installation/linux/debian/)	
- [Others](https://docs.docker.com/engine/installation/#platform-support-matrix)	

Build Container	
---------------	
Create a ```Dockerfile``` to setup the build environment	

```Dockerfile	
FROM ubuntu:16.04	
RUN apt-get update -y && \	
    apt-get install -y git curl gnupg-curl openjdk-8-jdk && \	
    rm -rf /var/lib/apt/lists/* && \	
    apt-get autoremove -y && \	
    apt-get clean	
RUN gpg --keyserver https://secchannel.rsk.co/release.asc --recv-keys 1A92D8942171AFA951A857365DECF4415E3B8FA4	
RUN gpg --finger 1A92D8942171AFA951A857365DECF4415E3B8FA4	
RUN git clone --single-branch --depth 1 --branch WASABI-1.2.0 https://github.com/rsksmart/rskj.git /code/rskj	
WORKDIR /code/rskj	
RUN gpg --verify SHA256SUMS.asc	
RUN sha256sum --check SHA256SUMS.asc	
RUN ./configure.sh	
RUN ./gradlew clean build -x test	
```	

If you are not familiar with Docker or the ```Dockerfile``` format: what this does is use the Ubuntu 16.04 base image and install ```git```, ```curl```, ```gnupg-curl``` and ```openjdk-8-jdk```, required for building RSK node.	


Run build	
---------	

To create a reproducible build, run:	

```bash	
sudo docker build -t rskj-wasabi-1.2.0-reproducible .	
```	

This may take several minutes to complete. What is done is:	
- Place in the RskJ repository root because we need Gradle and the project.	
- Runs the [secure chain verification process](/rsk/node/security-chain/).	
- Compile a reproducible RskJ node.	
- `./gradlew clean build -x test` builds without running tests.	


To obtain SHA-256 checksums, run the following command:	

```bash	
sudo docker run --rm rskj-wasabi-1.2.0-reproducible sha256sum /code/rskj/rskj-core/build/libs/rskj-core-1.2.0-WASABI-all.jar /code/rskj/rskj-core/build/libs/rskj-core-1.2.0-WASABI-sources.jar /code/rskj/rskj-core/build/libs/rskj-core-1.2.0-WASABI.jar /code/rskj/rskj-core/build/libs/rskj-core-1.2.0-WASABI.pom	
```	

Check Results	
-------------	
After running the build process, a JAR file will be created in ```/code/rskj-core/build/libs/```, into the docker container.	

You can check the SHA256 sum of the result file and compare it to the one published by RSK for that version.	
```bash	
e3901dd011ee798559ee965186a4a54fdb2233acfd73bbe2e3164f66d821e661  rskj-core/build/libs/rskj-core-1.2.0-WASABI-all.jar
7176ab053ca10479095c66415807a29b801f2004505ae7b6fde1fb212802cfac  rskj-core/build/libs/rskj-core-1.2.0-WASABI-sources.jar
0093793bbbcaf3ed9c5dead91b7dd5f36305a9d8f65413f7f03cdb995b9330ce  rskj-core/build/libs/rskj-core-1.2.0-WASABI.jar
cd4b595eaa5b6f60de6e9fd368e37bc09bec20f2dec572849d7fed53ae7ca390  rskj-core/build/libs/rskj-core-1.2.0-WASABI.pom
```	

For SHA256 sum of older versions check the [releases page](https://github.com/rsksmart/rskj/releases).	

If you check inside the JAR file, you will find that the dates of the files are the same as the version commit you are using.