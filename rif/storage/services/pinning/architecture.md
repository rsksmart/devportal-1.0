---
layout: rsk
title: Architecture
---

![](/assets/img/rif-storage/pinner_architecture.png)

The main high-level components are:

- **RIF Marketplace UI** - the main web UI where all transactions originate.
- **Cache** - a cache that stores the state of the Smart Contract in an easy-readable format and does some basic preprocessing on it.
- **Pinning Service** - a service running on Provider's machine connected to IPFS node which orchestrates the pinning mechanism.
- **Smart Contract** - a place where the state is stored and managed. This is the "origin of truth".
- **RIF Storage.js** - a library that can abstract away lot of magic happening in order to file be pinned.

## Data Sources

Data Source is an abstract entity that defines the data that should be stored under an Agreement. There might be different mechanisms on how files should be retrieved, updated and removed.

<table>
  <thead>
    <tr>
      <td>Data Source</td>
      <td>Mutability</td>
      <td>Description</td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>IPFS Source</td>
      <td> Immutable</td>
      <td>The basic immutable source that relies on IPFS and its CID (like `/ipfs/QmHash`). There is no need to listen on mutations</td>
    </tr>
    <tr>
      <td>Contract Source</td>
      <td>Mutable</td>
      <td>A mutable source where mutations are handled by a smart contract that updates the references. The Smart Contract will have to implement a given interface.</td>
    </tr>
    <tr>
      <td>RNS Source</td>
      <td>Mutable</td>
      <td>A mutable source where mutations are handled by updating RNS domain to point to different IPFS hashes.</td>
    </tr>
    <tr>
      <td>IPNS Source</td>
      <td>Mutable</td>
      <td>IPNS is a mutable source native to the IPFS ecosystem. Has address in format `/ipns/<hash>`.
      We need to research on how updates are announced, but it is possible.</td>
    </tr>
    <tr>
      <td>Single Owner Chunk Source</td>
      <td>Mutable</td>
      <td>Mutable source based on Bee Single Owner Chunks.</td>
    </tr>
  </tbody>
</table>
