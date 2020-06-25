---
layout: rsk
title: Ensure security chain of RskJ source code
tags: rsk, rskj, node, security, verification
description: "All the different ways what you can verify RSKj: Release signing key, fingerprint of the public key, SHA256SUMS.asc, binary dependencies, secure environment script"
collection_order: 2500
permalink: /rsk/node/security-chain/
render_features: 'custom-terminals'
---

# Verify authenticity of RSKj source code and its binary dependencies

The authenticity of the source code must be verified by checking the signature of the release tags in the official Git repository. The authenticity of the binary dependencies is verified by Gradle after following the steps below to install the necessary plugins.

## Download RSK Release Signing Key public key

For Linux based OS (Ubuntu for example), it's recommended to install `curl` and `gnupg-curl` in order to download the key through HTTPS.
We recommend using GPG v1 to download the public key because GPG v2 encounters problems when connecting to HTTPS key servers. You can also download the key using curl, wget or a web browser but always check the fingerprint before importing it.

[](#top "multiple-terminals")
- Linux, Mac OSX
  ```bash
  $ gpg --keyserver https://secchannel.rsk.co/release.asc --recv-keys 5DECF4415E3B8FA4
  gpg: requesting key 5E3B8FA4 from https server secchannel.rsk.co
  gpg: key 5E3B8FA4: public key "RSK Release Signing Key <support@rsk.co>"      imported
  gpg: Total number processed: 1
  gpg:               imported: 1  (RSA: 1)
  ```

## Verify the fingerprint of the public key

[](#top "multiple-terminals")
- Linux, Mac OSX
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

The file`SHA256SUMS.asc` is signed with RSK public key and includes SHA256 hashes of the files necessary to start the build process.

[](#top "multiple-terminals")
- Linux, Mac OSX
  ```bash
  $ gpg --verify SHA256SUMS.asc
  gpg: Signature made mar 16 may 2017 16:47:56 ART
  gpg:                using RSA key 0x67D06695A44DCC86
  gpg: Good signature from "RSK Release Signing Key <support@rsk.co>" [ultimate]
  Primary key fingerprint: 1A92 D894 2171 AFA9 51A8  5736 5DEC F441 5E3B 8FA4
      Subkey fingerprint: D135 DDC0 B54D 6EF3 5901  52DF 67D0 6695 A44D CC86
  ```

*Note:* Learn more about [key management](https://www.gnupg.org/gph/en/manual/x334.html) here.

## Verification of binary dependencies

The authenticity of the script `configure.sh` is checked using the `sha256sum` command and the signed `SHA256SUM.asc` file. The script is used to download and check the authenticity of the Gradle Wrapper and Gradle Witness plugins. After these plugins are installed, the authenticity of the rest of the binary dependencies is checked by Gradle.

Linux - Windows (bash console)

[](#top "multiple-terminals")
- Linux
  ```bash
  $ sha256sum --check SHA256SUMS.asc
  configure.sh: OK
  sha256sum: WARNING: 19 lines are improperly formatted
  ```
- Mac OSX
  ```bash
  $ shasum --check SHA256SUMS.asc
  configure.sh: OK
  sha256sum: WARNING: 19 lines are improperly formatted
  ```

## Run configure script to configure secure environment

[](#top "multiple-terminals")
- Linux, Mac OSX
  ```bash
  $ ./configure.sh
  ```
