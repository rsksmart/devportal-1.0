---
layout: preso
permalink: "/webinars/202006-004/slides/"
title: How to Upload a Website on RIF Storage
tags: rif, swarm, dweb
description: "DWeb - How to Upload a Website on RIF Storage"
---

# How to Upload a Website on RIF Storage

[Rinke Hendriksen](https://twitter.com/hendriksenrinke)

[Brendan Graetz](http://bguiz.com/)

2020/06/10

[developers.rsk.co/webinars/202006-004/slides](/webinars/202006-004/slides/)

---

This works best as a hands-on session.

(so get your computers ready!)

---

## [developers.rsk.co/webinars](/webinars/)

[50+ past events](/webinars/#calendar-past)

---NOTE

For those of you joining us in this webinar for the first time,
we would like to highlight that this is just one of a very large series of webinars, that is over 50 and counting at the moment.

Lots of great educational material out there already,
so check out developers.rsk.co for all the details.

---

## Us

- Rinke
- Brendan

---SUB

### Brendan

- Dev 🥑
- Singapore 🇸🇬
- Granjero de mariposas
  🥚→🌿→🐛→💤→🦋→🥚
- Compostador urbano
  🍜→♻️→🌱
- Estudiante español

---NOTE

- Ya lo he estado aprendiendo durante màs de doscientos días en Dúolingo
- Estoy practicando mi español ahora mismo 😃 but that's all the Spanish you're going to get from me today!

---

### Rinke

- Swarm product owner & researcher
- Hilversum 🇳🇱
- // TODO Rinke

---NOTE

TODO Rinke

---SUB

## DWeb

- Decentralised web
    - Immutable
    - Censorship resistant
    - Permissionless
- Domain name + storage

---NOTE

Rinke
TODO

---

## RNS

- RIF Name Service
- Decentralised DNS
- (upcoming webinars)

---NOTE

Rinke
TODO

---

## Swarm

- Decentralised storage
- Decentralised content distribution
- Some possible use cases:
    - Web pages, databases, media streams
- "Unstoppable storage"

---NOTE

Rinke
TODO

---

## Bee

- [github.com/ethersphere/bee](https://github.com/ethersphere/bee)
- Greenfield reimplementation of Swarm
    - devp2p → libp2p
- 👀 for announcements

---NOTE

Rinke
TODO

---

## RIF Storage

- [developers.rsk.co/rif/storage](/rif/storage/)
- Unified IPFS + Swarm
- Built-in economic incentives
    - RIF token

---NOTE

Rinke
TODO

Mention RIF Publish release in the upcoming weeks?

---

## Set up

- A [POSIX](https://en.wikipedia.org/wiki/POSIX)-compliant terminal
- [`git`](https://git-scm.com/)
- [`curl`](https://curl.haxx.se/)
- [`jq`](https://stedolan.github.io/jq/) (optional)
- [NodeJs](https://nodejs.org/en/) (optional)

---NOTE

POSIX compliant terminal:

- Recommended option for Linux/ Mac: Default/ built in terminal
- Recommended option for Windows: [Git Bash](https://gitforwindows.org/)

NodeJs:

- optional, only needed to preview site using a centralised HTTP server
- Recommended install method for Linux/ Mac: [`nvm`](https://github.com/nvm-sh/nvm)
- Recommended install method for Windows: [Official installer](https://nodejs.org/en/)

---

## Hands-on

[developers.rsk.co/tutorials/dweb/first-swarm-website](/tutorials/dweb/first-swarm-website/)

---NOTE

Brendan

Now we are about to start our hand-on section of today's webinar.
Time to start up your fire up your terminals and code editors!

- Brendan: Installs Swarm, opens code editor and uploads website (with html and image).
- Brendan: Then kicks the ball to Rinke, shares hash.
- Rinke takes over screen and downloads website.
- Rinke views website on localhost.
- Rinke: Here comes a bit of theory, explaining what has been happening on the background (peer-to-peer).
- Rinke: Then edits the website and uploads it again. Gives hash to Brendan and Brendan takes over again :)
- Brendan: View Rinke's hash on loclalost
- Brendan: View Rinke's hash on swarm gateway
- Brendan: Ask audience to share their hashes in the chat

---

## Your demos!

Share your `bzz:/` URLs in the chat!

---NOTE

Brendan & Rinke to show each others' demos

- Encourage audience to share your own Swarm hashes
- Instructions on how to convert from localhost to swarm gateway

---

## We're back!

Questions?

---NOTE

Brendan

That was the demo!

Did anyone have any questions before we wrap up?

---

## Advanced

- DWeb technology is cutting edge
- Cutting edge → Edge cases

---NOTE

So before we wrap up, I would just like to mention,
very briefly, some advanced topics.
These are good to know, and aren't intended as part of this webinar.
Instead these are things that are good to know.

One thing to take note of is that while Swarm is at the cutting edge of the decentralised web,
the DWeb is still very much in its infancy.
So there are a bunch of edge cases that still need ironing out. Here are a couple of them.

---SUB

Brendan

- [Transforming links](https://github.com/rsksmart/rsksmart.github.io/blob/768be3be60f14eba780f1ac118694de8bf2aaa54/_plugins/custom_links.rb)

---NOTE

When you upload a website onto decentralised storage,
it's address is going to be a hash.
You cannot know ahead of time what the URL will be,
since it contains said hash.
(Unless you solely use the decentralised DNS, and do not use the hash at all.)

This means that while it is customary to use absolute links, that is those starting with a `/` in regular web development, this can break your site.
So I say to that, "¿por que no los dos?"
have your cake an eat it too.

The RSK dev portal is a static site built using Jekyll.
In preparation for uploading it to the DWeb on Swarm,
I have created a custom Jekyll plugin that
takes all such absolute links and transforms them to their relative forms, such that they will work without knowing the hash ahead of time.

---SUB

- [`bzz-web:/`](https://github.com/bguiz/bzz-web)

---NOTE

Brendan

The site that we created today works as an excellent example, under demo conditions, because it has relatively few files,
and their paths do not overlap in certain ways that trip up the way in which the actual filenames to be served are resolved, which we may be accustomed to, such as trailing `/`-es and auto-appending `index.html`.

As such, in order for this to work with a fairly complex website such as the RSK DevPortal, I created a simple proxy server to augement the standard `bzz:/` protocol server that ships with swarm.

---

## Roadmap

- // TODO Rinke

---NOTE

Rinke

---

## Resources

- // TODO Rinke

---NOTE

Rinke

---

## Where to go from here?

- Update the contents of your website on Swarm
- View your website through multiple gateways (not just localhost)
- Register a decentralised domain name for your website on Swarm
  - After this, update website contents and point domain at new version
- Dual deployment of your website on both swarm and a centralised web server

---NOTE

What we have done today is not all there is for a decentralised web!
There are a number of other topics to cover,
and we will be sure to let you know when we run the next sessions on these topics!

---

## Fin

Thank you!

[developers.rsk.co/webinars](/webinars/)

---NOTE

Thanks to everyone for attending!

Be sure to check out developers.rsk.co/webinars for more sessions on RSK and RIF!
