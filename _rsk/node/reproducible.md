---
layout: rsk
title: Reproducible Build
tags: rsk, node, compile, reproducible, checksum
description: "A deterministic build process used to build RSK node JAR file. Provides a way to be reasonable sure that the JAR is built from GitHub RSKj repository. Makes sure that the same tested dependencies are used and statically built into the executable."
collection_order: 2600
permalink: /rsk/node/reproducible/
render_features: 'custom-terminals'
---

Gradle building
===============

*Setup instructions for gradle build in docker container.*

This is a deterministic build process used to build RSK node JAR file. It provides a way to be reasonable sure that the JAR is built from GitHub Rskj repository. It also makes sure that the same tested dependencies are used and statically built into the executable.

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

[](#top "multiple-terminals")
- Linux
  ```shell
FROM ubuntu:16.04
RUN apt-get update -y && \
    apt-get install -y git curl gnupg-curl openjdk-8-jdk && \
    rm -rf /var/lib/apt/lists/* && \
    apt-get autoremove -y && \
    apt-get clean
RUN gpg --keyserver https://secchannel.rsk.co/release.asc --recv-keys 1A92D8942171AFA951A857365DECF4415E3B8FA4
RUN gpg --finger 1A92D8942171AFA951A857365DECF4415E3B8FA4
RUN git clone --single-branch --depth 1 --branch HOP-4.2.0 https://github.com/rsksmart/rskj.git /code/rskj
RUN git clone https://github.com/rsksmart/reproducible-builds 
RUN CP /Users/{$USER}/reproducible-builds/rskj/4.2.0-hop/Dockerfile  /Users/{$USER}/code/rskj
WORKDIR /code/rskj
RUN gpg --verify SHA256SUMS.asc
RUN sha256sum --check SHA256SUMS.asc
RUN ./configure.sh
RUN ./gradlew clean build -x test
  ```
- Mac OSX
 ```terminal
brew update && \
brew install git gnupg openjdk@8 && \
    rm -rf /var/lib/apt/lists/* && \
    brew autoremove && \
    brew cleanup
RUN gpg --keyserver https://secchannel.rsk.co/release.asc --recv-keys 1A92D8942171AFA951A857365DECF4415E3B8FA4
RUN gpg --finger 1A92D8942171AFA951A857365DECF4415E3B8FA4
RUN git clone --single-branch --depth 1 --branch HOP-4.2.0 https://github.com/rsksmart/rskj.git ./code/rskj
RUN git clone https://github.com/rsksmart/reproducible-builds 
RUN CP /Users/{$USER}/reproducible-builds/rskj/4.2.0-hop/Dockerfile  /Users/{$USER}/code/rskj
RUN CD /code/rskj
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
sudo docker build -t rskj-hop-4.2.0-reproducible .
```

This may take several minutes to complete. What is done is:
- Place in the RSKj repository root because we need Gradle and the project.
- Runs the [secure chain verification process](/rsk/node/security-chain/).
- Compile a reproducible RSKj node.
- `./gradlew clean build -x test` builds without running tests.


To obtain SHA-256 checksums, run the following command:

```bash
sudo docker run --rm rskj-hop-4.2.0-reproducible sha256sum /code/rskj/rskj-core/build/libs/rskj-core-4.2.0-HOP-all.jar /code/rskj/rskj-core/build/libs/rskj-core-4.2.0-HOP-sources.jar /code/rskj/rskj-core/build/libs/rskj-core-4.2.0-HOP.jar /code/rskj/rskj-core/build/libs/rskj-core-4.2.0-HOP.pom
```

Check Results
-------------
After running the build process, a JAR file will be created in ```/code/rskj-core/build/libs/```, into the docker container.

You can check the SHA256 sum of the result file and compare it to the one published by RSK for that version.

```bash
556132bb0423f0ca0a101704d56daad17eaa124d4f88cf97ced8ca7ebcddb0b2 rskj-core-4.2.0-HOP-all.jar
e0544eaea2068f3ec9a99628f82b0163fc31d7be5282c925e34797e74982f826  rskj-core/build/libs/rskj-core-4.2.0-HOP-sources.jar
42b0f44d0c612506ed39e186ffd8790fe5f775ee6bcd7d7189e01b0b9439c06d  rskj-core/build/libs/rskj-core-4.2.0-HOP.jar
9160b4e02eef885afc672005a33e10ced8e4b9a7792039faf7f7a86880c165b0  rskj-core/build/libs/rskj-core-4.2.0-HOP.pom
```

For SHA256 sum of older versions check the [releases page](https://github.com/rsksmart/rskj/releases).

If you check inside the JAR file, you will find that the dates of the files are the same as the version commit you are using.
