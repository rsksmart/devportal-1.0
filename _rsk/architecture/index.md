---
title: Turing complete
tags: rsk, rvm, evm, virtual machine
description: "The RSK virtual machine is compatible with Ethereum Virtual machine at an opcode level."
collection_order: 3
menu_title: Turing complete
menu_order: 1
---

RSK virtual machine (RVM) is the core of the Smart Contract platform. Smart Contracts are executed by all network full nodes. The result of the execution of a Smart Contract can be the processing of inter-contract messages, creating monetary transactions and changing the state of contract-persistent memory. The RVM is compatible with EVM at the op-code level, allowing Ethereum contracts to run flawlessly on RSK.

Currently, the VM is executed by interpretation. In a future network upgrade, the RSK community is aiming to improve the VM performance substantially. One proposal is to emulate the EVM by dynamically retargeting EVM opcodes to a subset of Java-like bytecode, and a security-hardened and memory restricted Java-like VM will become the new VM (RVM2). This may bring RSK code execution to a performance close to native code.

Main features:

* Independent virtual machine, that is highly compatible with EVM at the opcode level
* Run Ethereum DApps with the security of the Bitcoin network
* Performance improvement pipeline documented in numerous RSKIPs created by the RSK community
  * See [RSK Improvement Proposals](https://github.com/rsksmart/RSKIPs)
