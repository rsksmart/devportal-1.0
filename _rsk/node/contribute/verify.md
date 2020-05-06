---
layout: rsk
title: Verify authenticity of RskJ source code and its binary dependencies
tags: rsk, rskj, node, contribute, verify, checksum, sha, gpg, fingerprint
description: "Using release signing public key, GPG fingerprints, and SHA checksums to verify the RSKj release and its binary dependencies."
collection_order: 2550
---

The authenticity of the source code must be verified by checking the signature of the release tags in the official Git repository. The authenticity of the binary dependencies is verified by Gradle after following the steps below to install the necessary plugins.

## Download RSK Release Signing Key public key

For Linux based OS (Ubuntu for example) it's recommended to install `curl` and `gnupg-curl` in order to download the key through HTTPS.
We recommend using GPG v1 to download the public key because GPG v2 has problems with connecting to HTTPS key servers. You can also download the key using curl, wget or a web browser but always check the fingerprint before importing it.

``` bash
$ gpg --keyserver https://secchannel.rsk.co/release.asc --recv-keys 5DECF4415E3B8FA4
gpg: requesting key 5E3B8FA4 from https server secchannel.rsk.co
gpg: key 5E3B8FA4: public key "RSK Release Signing Key <support@rsk.co>" imported
gpg: Total number processed: 1
gpg:               imported: 1  (RSA: 1)
```

## Verify the fingerprint of the public key

``` bash
$ gpg --finger 5DECF4415E3B8FA4
pub   4096R/5E3B8FA4 2017-05-16 [expires: 2022-05-15]
      Key fingerprint = 1A92 D894 2171 AFA9 51A8  5736 5DEC F441 5E3B 8FA4
uid                  RSK Release Signing Key <support@rsk.co>
sub   4096R/A44DCC86 2017-05-16 [expires: 2022-05-15]
sub   4096R/5E488E87 2017-05-16 [expires: 2022-05-15]
sub   4096R/9FC3E7C2 2017-05-16 [expires: 2022-05-15]
```

## Verify the signature of SHA256SUMS.asc

The file `SHA256SUMS.asc` is signed with RSK public key and includes SHA256 hashes of the files necessary to start the build process.

```bash
$ gpg --verify SHA256SUMS.asc
gpg: Signature made mar 16 may 2017 16:47:56 ART
gpg:                using RSA key 0x67D06695A44DCC86
gpg: Good signature from "RSK Release Signing Key <support@rsk.co>" [ultimate]
Primary key fingerprint: 1A92 D894 2171 AFA9 51A8  5736 5DEC F441 5E3B 8FA4
     Subkey fingerprint: D135 DDC0 B54D 6EF3 5901  52DF 67D0 6695 A44D CC86
```
*Note:* You can read [this page](https://www.gnupg.org/gph/en/manual/x334.html) to find out more about key management.

## Verification of binary dependencies

The authenticity of the script `configure.sh` is checked using the `sha256sum` command and the signed `SHA256SUM.asc` file. The script is used to download and check the authenticity of the Gradle Wrapper and Gradle Witness plugins. After these plugins are installed, the authenticity of the rest of the binary dependencies is checked by Gradle.

Linux or Windows (bash console)

```bash
$ sha256sum --check SHA256SUMS.asc
configure.sh: OK
sha256sum: WARNING: 19 lines are improperly formatted
```

Mac

```bash
$ shasum --check SHA256SUMS.asc
configure.sh: OK
sha256sum: WARNING: 19 lines are improperly formatted
```

*Note:* If you are collaborating on this project with Git, it might produce unexpected results because of the way it is configured to handle line endings. Check out [this article](https://help.github.com/articles/dealing-with-line-endings/#platform-windows) on how to solve the problem.

## Run configure script to configure secure environment

```bash
./configure.sh
```
