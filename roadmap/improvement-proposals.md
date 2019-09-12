---
layout: rsk
title: Improvement Proposals
---

## RSKIP - RSK Improvement Proposals


The RSK roadmap has been established by the RSK community. During the first years of RSK development, RSK Labs had an active role building the reference implementation. After RSK was launched, RSK Labs continued to be highly involved with the community by improving the codebase and proposing improvements through the RSKIP proposal repository system. The repository helps the community members to coordinate discussions, rejection, acceptance and deployment over multiple codebases. The amount of improvement proposals is vast. 

For more details please reference [RSKIP Github](https://github.com/rsksmart/RSKIPs)


#### RSKIP status terms

* **Draft** - an RSKIP that is open for consideration
* **Accepted** - an RSKIP that is planned for immediate adoption in the reference client, i.e. expected to be included in the next reference client release.
* **Adopted** - an RSKIP that has been adopted in a previous reference client relese.
* **Deferred** - an RSKIP that is not being considered for immediate adoption in the reference client. May be reconsidered in the future for a subsequent release of the reference client.
* **Rejected** - an RSKIP that was rejected

#### RSKIP purpose terms

* **Sca** - an RSKIP that improves scalability
* **Usa** - an RSKIP that improves usability
* **Fair** - an RSKIP that has improves fairness
* **Sec** - an RSKIP that that improves security
* **ST** - an RSKIP that proposes a standard track

#### Layer

* **Core** - Core, consensus related
* **Node** - Related to node manager interfaces, such as RPC
* **UI** - User Interface
* **2nd** - 2nd layer proteocols, such as off-chain payment channels
* **Net** - related to p2p networking
* **DApp** - Dapp application interfaces

#### Implementation Complexity
1. Minimal
2. Medium
3. High

#### Here is a list of some recent key proposals as of June 2019:

Nr | Title | Creation Date | Author | Pur | Layer | C | Status
-- | ----- | ------------- | ------ | --- | ----- | - | ------
115 | Removal of Unused Headers from the Bridge Contract | 2019 | SDL | Sca | Core | 2 | Draft
116 | Failure of SSTORE on Low-Gas Recursive CALLs | 2019 | SDL | Sec,Sca,Usa | Core | 1 | Draft
119 | Precompiled contract for inspecting block headers | 2019 | DM | Usa | Core | 1 | Draft
120 | Shifting opcodes | 2019 | SMS | Sca | Core | 1 | Adopted
123 | Multikey federation members | 2019 | AM | Sca, Sec | Core | 2 | Draft
135 | Managing BridgeMaster Federation Members | 25-NOV-16 | SDL | Sca | Core | 2 | Draft
