---
layout: rsk
title: Security model
---

## Security Model

A sidechain is an independent blockchain whose native currency is pegged to the value of another blockchain currency automatically by using proofs of payment. There is a two-way peg when two currencies can be exchanged freely, automatically, and without incurring in a price negotiation. In RSK, the Smart Bitcoin (RBTC) is two-way pegged to the BTC.

In practice, when BTC are exchanged for RBTC, no currency is “transferred” between blockchains in a single transaction. When a transfer occurs, some BTCs are locked in Bitcoin and the same amount of RBTC is unlocked in RSK. When RBTC needs to be converted back into BTC, the RBTC get locked again in RSK and the same amount of BTC are unlocked in Bitcoin.


Fully trust-minimized and third-party-free two-way pegs can be created if two platforms have Turing-complete smart-contracts. But since Bitcoin does not currently support smart-contracts nor native opcodes to validate external SPV proofs, part of the two-way peg system in RSK requires trust on a set of a semi-trusted third-party (STTP), that we collectively call the Federation. No single STTP can control the locked BTCs, but only a majority of them has the ability to release BTC funds. Each STTP has a key to protect the BTC that are locked, and upcon receiving commands from the RSK blockchain, it unlocks the BTC that need to be transferred back into Bitcoin. Note that if a user transfers BTC into RBTC and back, they will normally not receive bitcoins that are directly connected by UTXOs with the original BTC sent. Therefore, do not lock RBTC for specific users, but for the whole RSK network.


The locking and unlocking of funds is done by the Federation without any human intervention. A requirement for being part of the Federation is the ability to audit the proper behavior of the software that powers the node, especially regarding the correctness of the component that decides on releasing BTC funds. RSK Labs developed a firmware for a Hardware Security Module (HSM) that STTPs can use, in order to provide maximum security for their private keys and, in the future, to be able to enforce a transaction validation protocol to further improve security.


As of January 2019, the RSK Federation comprises 15 well-known, and highly-secure notaries. Leading Blockchain companies currently integrate the RSK Federation and participate in an autonomous protocol to securely lock Bitcoins. In exchange for their work, Federation members are awarded 1% of the transaction fees generated on RSK, in order to cover the hardware and maintenance costs. There is an automated process to modify the composition of the federation. Each federation member can either accept or reject a composition change. The process, which is infrequent, is commanded by a smart-contract, so it’s open to the public. The protocol has a consensus enforced delay of one week until the change is activated. This allows users to transfer the Bitcoins back to the Bitcoin network in case they do not trust the new Federation composition.


If Bitcoin adds special opcodes or extensibility to validate SPV proofs as a hard-fork, and once the new system is proven to be secure and trust-free, the Federation role as STTPs will no longer be necessary, and the RSK community may implement the changes to adapt RSK to the trust-free system. The RSK community have also proposed a drivechain BIP, which enables miners to participate in the securing of the Bitcoins in the peg, and decreases the trust required on the STTPs even more.