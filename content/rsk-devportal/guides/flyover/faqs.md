---
menu_title: FAQs
title: "Flyover Protocol Documentation | Frequently Asked Questions"
description: "Welcome to the flyover documentation, learn about the flyover architecture, how to get started and integrate the flyover protocol into your project."
tags: flyover, powpeg, peg-in, peg-out, 2way-peg, bridge, rbtc, btc, testnet, mainnet, guide, setup, integrate, use, faqs
layout: rsk
---

Here, you can find a list of frequently asked questions (FAQs) about the Flyover Protocol.

**Q: How are the PowPeg (2 way peg) and the flyover related?**
> A: Flyover is a protocol to perform fast peg-ins. The 2wp-app is a tool that enables easy use of the PowPeg protocol. Soon, the flyover peg-in will be integrated into the 2wp-app. In the future it may also include peg-outs.

**Q: What type of Bitcoin addresses does the flyover support?**

> A: The answer depends on which address we refer to.
The Flyover protocol accepts transfers to RSK from any kind of Bitcoin wallet, including those using segwit and taproot addresses.

**Q: What is the difference between liquidity provider and liquider provider server?**

> A: The liquidity provider (LP) is in charge of making an RSK call on behalf of the user (or a wallet service). A liquidity provider server (LPS) is a server that runs a local Liquidity Provider node and allows a connection from remote users over HTTP. LP are configured into the LPS. The LPS interacts with the [LBC](/guides/flyover/design-architecture#liquidity-bridge-contract-lbc) which provides liquidity for users.