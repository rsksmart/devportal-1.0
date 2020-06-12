---
layout: rsk
title: MetaMask
---

For MetaMask installation, please <a href="https://metamask.io/" target="_blank">visit here</a>.

## Connect with MetaMask

1. Open MetaMask extension.

2. In the network selector (top right corner), choose Custom RPC.

  <div style="text-align:center"><img class="metamask-screenshot" src="/assets/img/metamask/metamask.png"></div>

3. Fill with these values to connect to RSK Mainnet or Testnet

  <table class="table">
  <thead>
    <tr>
      <th scope="col">Field</th>
      <th scope="col">RSK Mainnet</th>
      <th scope="col">RSK Testnet</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Network Name</td>
      <td>RSK Mainnet</td>
      <td>RSK Testnet</td>
    </tr>
    <tr>
      <td>RPC URL</td>
      <td>https://public-node.rsk.co</td>
      <td>https://public-node.testnet.rsk.co</td>
    </tr>
    <tr>
      <td>ChainID</td>
      <td>30</td>
      <td>31</td>
    </tr>
    <tr>
      <td>Symbol</td>
      <td>R-BTC</td>
      <td>tR-BTC</td>
    </tr>
    <tr>
      <td>Block explorer URL</td>
      <td><a href="https://explorer.rsk.co" target="_blank">https://explorer.rsk.co</a></td>
      <td><a href="https://explorer.testnet.rsk.co" target="_blank">https://explorer.testnet.rsk.co</a></td>
    </tr>
  </tbody>
  </table>

Now MetaMask is ready to use with RSK!

## Now what?

Try RSK in the testnet
- [Get test R-BTC](https://faucet.rsk.co)
- [Get test RIF tokens](https://faucet.rifos.org)

## Disclaimer

- Currency may be displayed as ETH. They are actually R-BTC.
- This tutorial uses [RSK public nodes](/rsk/public-nodes). You can connect to another node by changing the RPC URL
- The node must have CORS enabled. It can be fully enabled using `'*'`.
  - Please review the [configuration file reference](/rsk/node/configure).
