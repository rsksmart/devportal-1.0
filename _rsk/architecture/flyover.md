---
menu-title: Flyover Protocol
title: Flyover Protocol Documentation | Overview
description: "Welcome to the flyover documentation, learn about the flyover architecture, how to get started and integrate the flyover protocol into your project."
tags: flyover, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, guide, setup, integrate
menu_order: 800
layout: rsk
---

![Flyover-banner](/assets/img/guides/flyover/rootstock-peg-in-out.gif)

The Flyover protocol performs fast [peg-ins](/guides/flyover/glossary/). It provides a new feature to transfer BTC from Bitcoin directly to a smart contract or [EOA](/guides/flyover/glossary/) in RSK faster than the regular peg-in protocol. See the [PowPeg](https://developers.rsk.co/rsk/architecture/powpeg/) documentation. 

For general information about the Flyover Protocol, design and architecture, how to [get started](/guides/flyover/get-started/) on Testnet, please refer to the [table of contents](#table-of-contents) section.

The Flyover protocol allows a user to transfer BTC from Bitcoin to RSK and vice versa in a fast and efficient way, this implies that a third party takes the risk to advance the payment on behalf of the user.

The outstanding feature of the Flyover system is that it does not give any third party custody of the transferred funds. This is an outstanding security guarantee to the user.

### Key Points

- The only true way to move BTC to RBTC or vice versa is PowPeg. This is accomplished at the protocol level of RSK, no 3rd parties or intermediaries are required.
- For various security reasons however, the PowPeg needs a significant time delay during the conversion.
- To allow for greater velocity of the transfer of cryptocurrencies between Bitcoin and RSK networks a 3rd party or intermediary is needed to "advance" the funds to the user in a short period of time while waiting for the PowPeg.
- Services that do this already exist (example: [Liquality](/solutions/liquality/)). However, they are based on proprietary methodologies and require trust in a centralised service.
- Flyover provides a framework to accomplish the same outcome, but without having to place trust in a proprietary methodology or a centralised service, by providing a new open decentralised protocol.
- The flyover protocol relies on a Liquidity Provider (LP), Liquidity Bridge Contract (LBC) and the Bridge itself.
- Wallets that integrate the flyover protocol will allow a user to specify a contract address and the `data` that needs to be executed on RSK, and by negotiating with a [Liquidity Provider](/guides/flyover/design-architecture/#liquidity-provider-lp), the user gets a bitcoin address to send the funds. The user wallet can also verify that the bitcoin address received is controlled by the Powpeg, and not by anyone else.
- If the LP does not fulfill its duty of advancing the payment on time, the user can hand over the quote to another third party who can take the role of the faulty LP and collect its reward. This way, the fallback mechanism still enables the user to receive the RBTC in RSK, even without prior RBTC balance to execute RSK transactions.

### Benefits

- Enhances the usability of the peg-in protocol. 
- Enables users to get RBTC faster
- Enables users to execute smart contracts by sending BTC to a specific PowPeg Address
- Allows the flyover protocol to truly add value to the community.

## Table of Contents

<div class="container the-stack">
<div class="row rif_blue_text">
  <div class="row rif_blue_text">
    <div class="col">
      <div class="rns-index-box">
        <a href="/guides/flyover/get-started/">Get Started</a>
        <br />
        <br />
        <p>Learn how to use the Flyover Protocol on Testnet.</p>
      </div>
    </div>
    <div class="col">
      <div class="rns-index-box">
        <a href="/guides/flyover/faqs/">FAQs</a>
        <br />
        <br />
        <p>See frequently asked questions about the Flyover Protocol</p>
      </div>
    </div>
  </div>
  <div class="row rif_blue_text">
    <div class="col">
      <div class="rns-index-box">
        <a href="/guides/flyover/design-architecture/" >Design and Architecture</a>
        <br />
        <br />
        <p>See the design, architecture, flow diagrams and operations available on the Flyover Protocol.</p>
      </div>
    </div>
    <div class="col">
      <div class="rns-index-box">
        <a href="/guides/flyover/tools/">Tools</a>
        <br />
        <br />
        <p>See tools available on the Flyover Protocol</p>
      </div>
    </div>
  </div>
  <div class="row rif_blue_text">
    <div class="col">
      <div class="rns-index-box">
        <a href="/guides/flyover/glossary/">Glossary</a>
        <br />
        <br />
        <p>See a list of words and their explanations.</p>
      </div>
    </div>
</div>