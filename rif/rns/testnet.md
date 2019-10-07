---
layout: rsk
title: RNS Testnet
---

<div class="fade alert alert-warning show">UPDATED INFO: on Friday, July 5th 2019, 12:00 PM (GMT) the RSK testnet was reseted. <a href="https://www.rsk.co/noticia/announcement-upcoming-rsk-testnet-reset-and-wasabi-rollout-plan/">Learn more about this</a>. This page now shows the information of the solution on the reseted network.</div>

To test application integrations, we've deployed two variants of RNS contracts in the [RSK Testnet](https://explorer.testnet.rsk.co), an [auction registrar](#auction-variant) (a clone of mainnet), and a [First Come First Served](#fcfs-variant) variant, both connected with the [tRIF token](#trif).


## Variant periods


<table class="table">
  <thead>
    <tr>
      <th scope="col">Period</th>
      <th scope="col">Auction variant</th>
      <th scope="col">FIFS variant</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Bid</th>
      <td>3 days</td>
      <td>N/A</td>
    </tr>
    <tr>
      <th scope="row">Unseal</th>
      <td>2 days</td>
      <td>N/A</td>
    </tr>
    <tr>
      <th scope="row">Late unseal</th>
      <td>15 days</td>
      <td>N/A</td>
    </tr>
    <tr>
      <th scope="row">Renew</th>
      <td>3 months</td>
      <td>3 days</td>
    </tr>
    <tr>
      <th scope="row">Domain validity</th>
      <td>1 year</td>
      <td>7 days</td>
    </tr>
  </tbody>
</table>


## Auction variant

<table class="table">
  <tbody>
    <tr>
      <td scope="row"><a href="/rif/rns/architecture/Registry">Registry</a></td>
      <td><a href="http://explorer.testnet.rsk.co/address/0xe0ba8a9ff14a7dfeab227a4f685b08a1084f4ad1" target="_blank">0xe0ba8a9ff14a7dfeab227a4f685b08a1084f4ad1</a></td>
    </tr>
    <tr>
      <td scope="row"><a href="/rif/rns/architecture/Registrar">Registrar</a></td>
      <td><a href="http://explorer.testnet.rsk.co/address/0x8cd41103edcf309714e771cd0c01f1e2b09f4842" target="_blank">0x8cd41103edcf309714e771cd0c01f1e2b09f4842</a></td>
    </tr>
    <tr>
      <td scope="row"><a href="/rif/rns/architecture/RSKResolver">RSK Resolver</a></td>
      <td><a href="http://explorer.testnet.rsk.co/address/0x480fee7506db34dde84cfec85057a6bd96b38e1b" target="_blank">0x480fee7506db34dde84cfec85057a6bd96b38e1b</a></td>
    </tr>
    <tr>
      <td scope="row"><a href="/rif/rns/architecture/MultiCryptoResolver">Multi-crypto Resolver</a></td>
      <td><a href="http://explorer.testnet.rsk.co/address/0x4e88e8253d4a4f023103d2941458ccb2333db62f" target="_blank">0x4e88e8253d4a4f023103d2941458ccb2333db62f</a></td>
    </tr>
  </tbody>
</table>

## FCFS variant


<table class="table">
  <tbody>
    <tr>
      <td scope="row">Registration cost</td>
      <td>1 tRIF (fixed, <a href="/rif/token">more about RIF Token</a>)</td>
    </tr>
    <tr>
      <td scope="row">Registration tool</td>
      <td><a href="https://testnet.rns.rifos.org" target="_blank">FIFS registrar client</a></td>
    </tr>
    <tr>
      <td scope="row"><a href="/rif/rns/architecture/Registry">Registry</a></td>
      <td><a href="http://explorer.testnet.rsk.co/address/0xeff983147ae97758c04f65ac7dee7c7cacf48ba2" target="_blank">0xeff983147ae97758c04f65ac7dee7c7cacf48ba2</a></td>
    </tr>
    <tr>
      <td scope="row"><a href="/rif/rns/architecture/Registrar">Registrar</a></td>
      <td>
        <a href="http://explorer.testnet.rsk.co/address/0x92e0e035fbc120f268c1438051fb5b8c24d43641" target="_blank">0x92e0e035fbc120f268c1438051fb5b8c24d43641</a>
        (<a href="/rif/rns/architecture/TestnetFCFSRegistrar.json">ABI</a>)
      </td>
    </tr>
    <tr>
      <td scope="row"><a href="/rif/rns/architecture/RSKResolver">RSK Resolver</a></td>
      <td><a href="http://explorer.testnet.rsk.co/address/0xa1190a76aea568300c512f3ee6e05e504da1797f" target="_blank">0xa1190a76aea568300c512f3ee6e05e504da1797f</a></td>
    </tr>
    <tr>
      <td scope="row"><a href="/rif/rns/architecture/MultiCryptoResolver">Multi-crypto Resolver</a></td>
      <td><a href="http://explorer.testnet.rsk.co/address/0xc52dde9af11185e13ecc516dc337a29b6f16d821" target="_blank">0xc52dde9af11185e13ecc516dc337a29b6f16d821</a></td>
    </tr>
  </tbody>
</table>


