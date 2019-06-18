---
layout: rns
title: RNS Testnet
---

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
      <td scope="row"><a href="/Architecture/Registry">Registry</a></td>
      <td><a href="http://explorer.testnet.rsk.co/address/0x83355fcb41acbe3919e4ff73ecffc07a3147b7e8" target="_blank">0x83355fcb41acbe3919e4ff73ecffc07a3147b7e8</a></td>
    </tr>
    <tr>
      <td scope="row"><a href="/Architecture/Registrar">Registrar</a></td>
      <td><a href="http://explorer.testnet.rsk.co/address/0xb0cf0517302acf52f967d0342827ff9c01d353f2" target="_blank">0xb0cf0517302acf52f967d0342827ff9c01d353f2</a></td>
    </tr>
    <tr>
      <td scope="row"><a href="/Architecture/RSKResolver">RSK Resolver</a></td>
      <td><a href="http://explorer.testnet.rsk.co/address/0xf1143e2797bef4f8bd6059605e8134686efaa355" target="_blank">0xf1143e2797bef4f8bd6059605e8134686efaa355</a></td>
    </tr>
    <tr>
      <td scope="row"><a href="/Architecture/MultiCryptoResolver">Multi-crypto Resolver</a></td>
      <td><a href="http://explorer.testnet.rsk.co/address/0x5c10db6fc2876fc61f67629770301c70562b1d13" target="_blank">0x5c10db6fc2876fc61f67629770301c70562b1d13</a></td>
    </tr>
  </tbody>
</table>

## FCFS variant


<table class="table">
  <tbody>
    <tr>
      <td scope="row"><a href="/Architecture/Registry">Registry</a></td>
      <td><a href="http://explorer.testnet.rsk.co/address/0xc1f9b554f9764a8b9db5d30d99c0a99ccf30b895" target="_blank">0xc1f9b554f9764a8b9db5d30d99c0a99ccf30b895</a></td>
    </tr>
    <tr>
      <td scope="row"><a href="/Architecture/Registrar">Registrar</a></td>
      <td>
        <a href="http://explorer.testnet.rsk.co/address/0xb39103ddb46edb1d64a26e9958c7cf458dbc4023" target="_blank">0xb39103ddb46edb1d64a26e9958c7cf458dbc4023</a>
        (<a href="/Architecture/TestnetFCFSRegistrar.json">ABI</a>)
      </td>
    </tr>
    <tr>
      <td scope="row"><a href="/Architecture/RSKResolver">RSK Resolver</a></td>
      <td><a href="http://explorer.testnet.rsk.co/address/0x40669137f90206bb3533358ebbd0f1910c39238a" target="_blank">0x40669137f90206bb3533358ebbd0f1910c39238a</a></td>
    </tr>
    <tr>
      <td scope="row"><a href="/Architecture/MultiCryptoResolver">Multi-crypto Resolver</a></td>
      <td><a href="http://explorer.testnet.rsk.co/address/0xee2bc6bc30d552bf638e5a9f7b499b00886fe327" target="_blank">0xee2bc6bc30d552bf638e5a9f7b499b00886fe327</a></td>
    </tr>
  </tbody>
</table>

## tRIF

<table class="table">
  <tbody>
    <tr>
      <td scope="row">Token Name</td>
      <td>tRIF</td>
    </tr>
    <tr>
      <td scope="row">Total Supply</td>
      <td>1,000,000,000 tRIF</td>
    </tr>
    <tr>
      <td scope="row">Contract Testnet Address</td>
      <td><a href="http://explorer.testnet.rsk.co/address/0xd8c5adcac8d465c5a2d0772b86788e014ddec516" target="_blank">0xd8c5adcac8d465c5a2d0772b86788e014ddec516</a></td>
    </tr>
    <tr>
      <td scope="row">Contract Type</td>
      <td>ERC677</td>
    </tr>
  </tbody>
</table>

Get tRIF tokens to interact with RNS Testnet variants from the [tRIF faucet](https://faucet.rifos.org).
