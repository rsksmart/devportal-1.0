---
menu_order: 300
menu_title: PowPeg
layout: rsk
title: 'PowPeg: 1-to-1 peg between BTC and RBTC'
description: 'Learn about the PowPeg architecture and how Rootstock maintains a 1:1 peg of RBTC with BTC'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, powpeg
---

The second point of contact is the [Powpeg](/rsk/architecture/powpeg/).
This component connects both networks to allow the transfer of bitcoins to Rootstock,
thereby allowing developers to interact with smart contracts.
They pay gas using the same bitcoin, the smart bitcoin.

<div class="sprite-transform-animation-wrapper rsk-peg">
  <div class="sprite-transform-animation rsk-peg"></div>
</div>

To do so, you send bitcoin to a special address,
where they are locked in the bitcoin network.
Next, in the same address over in the Rootstock network,
that same bitcoin is released to the user for use in the Rootstock network.
This is called peg-in.
You can do the reverse operation called peg-out,
by sending your bitcoin to a special address in the Rootstock network,
and receiving your bitcoin back in the bitcoin network.