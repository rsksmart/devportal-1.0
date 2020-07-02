---
layout: preso
permalink: "/webinars/202007-005/slides/"
title: Testing Smart Contracts with Truffle
tags: rsk, solidity, truffle, test, mocha, slides
description: "RSK - Testing Smart Contracts with Truffle"
backgroundImage: "/assets/img/preso/preso-rsk-slide-body.png"
---

<!-- .slide: data-background="/assets/img/preso/preso-rsk-slide-title.png" -->

---

# Testing Smart Contracts with Truffle

[Brendan Graetz](http://bguiz.com/)

[Dulce Villarreal](https://twitter.com/Dulce_vird)

2020/07/08

[developers.rsk.co/webinars/202007-005/slides](/webinars/202007-005/slides/)

NOTE:

`Brendan`

---

This works best as a hands-on session.

(so get your computers ready!)

NOTE:

`Brendan`

Please note that this webinar has been designed primarily as a hands on session.
You may choose to simply watch or observe,
but you will probably get the most out of this if
you follow along!

---

<!-- .slide: data-background="/assets/img/preso/webinars-page-screenshot.png" -->

<!-- .element: style="background-color: #ffffffb0;" -->
### [developers.rsk.co/webinars](/webinars/)
[50+ past events](/webinars/#calendar-past)

NOTE:

`Brendan`

For those of you joining us in this webinar for the first time,
we would like to highlight that this is just one of a very large series of webinars,
that is over 50 and counting at the moment.

Lots of great educational material out there already,
so check out developers.rsk.co for all the details.

---

## Us

- Dulce
- Brendan

NOTE:

`Dulce`

----

### Dulce

- // TODO Dulce

NOTE:

`Dulce`

----

### Brendan

- Dev 🥑
- Singapore 🇸🇬
- Granjero de mariposas
  🥚→🌿→🐛→💤→🦋
- Compostador urbano
  🍜→♻️→🌱
- Estudiante español

NOTE:

`Brendan`

- Ya he estado aprendiendo por más de doscientos días en Dúolingo
- Estoy practicando mi español ahora mismo 😃 but that's all the Spanish you're going to get from me today!

---

## Testing JS

- **None** of these:
  - Smart contracts, Solidity, DApps
- **Instead**:
  - Only Javascript

NOTE:

`Brendan`

The title of this webinar is testing smart contracts with Truffle.
But we will not start with any of those things at all.
Instead we'll focus solely on Javascript.
After we have done out first hands on,
you will see why!

---

## Testing JS: Objectives

- What is testing?
- Software engineering principles - Why test?
- Writing tests in JS using Mocha

NOTE:

`Brendan`

We have a few learning objectives here today.
We'll start with what testing is, and why we need to do it.
Subsequently, we will write tests in Mocha using Javascript.

---

## Mocha

- A test runner for JS
- Can execute "spec" files either in browser, or in NodeJs
- Executes tests, outputs reports

NOTE:

`Brendan`

- Mocha is a test runner for Javascript that can run either in the browser or in NodeJs
- Today, we'll be using NodeJs only
- The main task of a test runner is to execute tests and generate a report
- But before we get there, we first need to understand some terms: implementation, specification, and then we can loop back to the test runner

----

### Implementation

- Code that you write
- Executes when the program is being used
- You are *implementing* the *features* of your software
- `impl`

NOTE:

`Brendan`

- Implementations form the actual parts of the code that perform the functionality of your program or application

----

### Specification

- **Also** code that you write
- Does **not** execute when the program is being used
- Instead it executes the implementation
- You are *specifying* the *features* of your software
- `spec`

NOTE:

`Brendan`

- Specifications are similar to implementation because they are also code
- However they are not executed by the user of your programm or application, instead the specifications run the implmentations in certain pre-defined ways

----

### Test runner

- A developer **tool**
- **runner** `═exec⟹` **specification** `═exec⟹` **implementation**
- **runner** `═observes⟹` **behaviour** `═produces⟹` **report**
- Mocha

NOTE:

`Brendan`

- a test runner is sometimes also referred to as a test framework
- mocha is the test runner which we will be using today
- what it does its it executes your specs, which in turn execute your impls, while it watches the execution, recording which specs pass and which ones fail, outputting a report at the end.

----

### More theory

- [Unit](https://en.wikipedia.org/wiki/Unit_testing)/
  [Integration](https://en.wikipedia.org/wiki/Integration_testing)/
  [Acceptance](https://en.wikipedia.org/wiki/Acceptance_testing)
- [Black box](https://en.wikipedia.org/wiki/Black-box_testing)/
  [White box](https://en.wikipedia.org/wiki/White-box_testing)
- [Code coverage](https://en.wikipedia.org/wiki/Code_coverage)

NOTE:

`Brendan`

- there is a lot more to testing than what we have just covered
- so that we don't go over time, here we simply have links to a lot of material on wikipedia,
  which define various testing related terminology
  which you're encouraged to read after this webinar
- for now, we have covered the basics required to do our hands on with pure javascript, and then move on to testing solidity

---

## Testing JS: Hands-on

[dappsdev.org/hands-on/mocha-intro](https://dappsdev.org/hands-on/mocha-intro/)

NOTE:

`Brendan`

- Alright, now we're going to do a Javascript testing hands-on.
- Please follow the link above and it will take you to a workshop from DApps Dev Club created for a session which I ran last year.
- Instead of me presenting and doing the demo at the same time, I'm going to ask Dulce to do this,
- (swap over screen share)
- We won't be doing this entire exercise, when we get to the "version control with git" section, we'll skip right down to about the halfway mark, all the way to the heading "write some code"

`Dulce`

- (follow the instructions)
- (swap screenshare back)

----

## Right/wrong impl/spec

![DApps Dev Club - Implementation Specification Correctness Quadrants](/webinars/202007-005/dapps-dev-club-implementation-specification-correctness-quadrants.png) <!-- .element: style="max-width: 50%; max-height: 50%;" -->

NOTE:

`Brendan`

- Now that we have executed `npm run test`,
  we have completed writing a correct implementation,
  and a correct specification
- That's the best combination to have, but you cannot know that for sure
- The remainder of this hands-on exercise will take you through various commbinations of right and wrong impls, and right and wrong specs,
  which result in false positives, et cetera
- However, we won't be doing this in today's session in light of time - you are of course encouraged to do this in your own time!

---

## Testing Solidity

NOTE:

`Brendan`

---

## Testing Solidity: Hands-on

NOTE:

`Brendan`

---

## Fin

Thank you!

[developers.rsk.co/webinars](/webinars/)

[gitter.im/rsksmart/getting-started](https://gitter.im/rsksmart/getting-started/)

NOTE:

`Brendan`

Thanks to everyone for attending!

Be sure to check out developers.rsk.co/webinars for more sessions on RSK and RIF!

If you have any questions, please reach out to us at developers [at] iovlabs.org or the gitter link here.

Thank you!

---

<!-- .slide: data-background="/assets/img/preso/preso-rsk-slide-fin.png" -->
