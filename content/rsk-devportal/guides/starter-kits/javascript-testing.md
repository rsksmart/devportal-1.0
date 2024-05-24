---
menu_title: Javascript Testing Kits
layout: rsk
title: "Rootstock Workshop: Javascript Testing"
tags: rsk, workshop, javascript, testing, mocha
description: "Learn about implementations and specifications, and use mocha as a test runner in this hands-on workshop"
---

## Pre-requisites

Prior to commencing this tutorial,
please ensure that you have installed the following
RSK workshop pre-requisites on your system:

- [POSIX compliant shell](https://github.com/bguiz/workshop-rsk-prereqs/blob/master/walkthru.md#posix-compliant-shell)
- [NodeJs](https://github.com/bguiz/workshop-rsk-prereqs/blob/master/walkthru.md#nodejs)
- [Code editor](https://github.com/bguiz/workshop-rsk-prereqs/blob/master/walkthru.md#code-editor)

## Project setup

Use `git` to make a copy of this repo,
and use `npm` to install dependencies.

```shell
git clone git@github.com:bguiz/workshop-rsk-js-testing.git
cd workshop-rsk-js-testing
npm install
```

Then open up this directory in your code editor.

## Explore the files

If you happen to have `tree` installed,
you can use that to view the directory structure using the following command.

```shell
$ tree -I node_modules
.
├── feature1.js
├── feature1.spec.js
├── package.json
├── package-lock.json
├── README.md
└── walkthru.md

0 directories, 6 files
```

(Otherwise use your choice of GUI to explore this folder.)

Observe that we have a flat directory structure.
Apart from the two markdown files (`*.md`),
and the two JSON files (`*.json`),
we see that we have two Javascript files (`*.js`).

- `feature1.js` is the implementation,
  and has been completed for you
- `feature1.spec.js` is the specification,
  and is only partially complete.
  This workshop is focused on completing the specification.

## Implementation

Look at `feature1.js`.

We have a very simple implementation,
which consists of a single function named `add`,
which returns the sums of its two parameters.

```javascript
// system under test: feature1

function add(x, y) {
  return x + y + 1; // NOTE intentional bug
}

module.exports = {
  add,
};

```

## Specification, incomplete

Look at `feature1.spec.js`.

Here, we have an incomplete specification.
We obtain the `add` function
defined in our implementation from earlier,
using `require()`.

We also make use of `describe` blocks to group
the tests that will form our specification.

```javascript
// tests for: feature1

const assert = require('assert');

const { add } = require('./feature1.js');

describe('feature1', () => {

  describe('add', () => {

    // tests go here

  });

});

```

## Initial test run

At this point, we are all set to let Mocha, our test runner,
do its thing, which will execute our specification,
which in turn will execute our implementation.

```shell
npm run test
```

You should see output similar to the following:

```shell
$ npm run test

> workshop-rsk-js-testing@0.0.0 test /home/bguiz/code/rsk/workshop-rsk-js-testing
> mocha './**/*.spec.js'



  0 passing (0ms)

```

Great! Our test runner (Mocha) has run successfully! 🎉 🎉 🎉

Our test runner has done the above,
listening for which tests have passed or failed,
and if there were any errors thrown.
However, note that since we have **zero** tests in our specification,
the implementation has not been executed at all.

That means that it is time to write our first test!

## Writing your first test

Edit `feature1.spec.js`.

Replace the line that says `// tests go here` with the following code.

```javascript
    it('works with specific values', () => {
      // specific known values
      const result = add(1, 2);
      assert.equal(result, 3);
    });
```

We make use of an `it` block to define a test.

This test happens to grouped by the `describe` blocks.
When there are multiple tests, the point of grouping them will become apparent.

## Subsequent test run

Now we are all set to let Mocha, our test runner,
do its thing again.

This time we have a test defined in our specification,
so when mocha executes our specification,
it will indeed execute our implementation in turn.

(Previously, when we had zero tests,
the implementation was not executed at all.)

### True negative

Run Mocha.

```shell
npm run test
```

You should see output similar to the following:

```shell
$ npm t

> workshop-rsk-js-testing@0.0.0 test /home/bguiz/code/rsk/workshop-rsk-js-testing
> mocha './**/*.spec.js'



  feature1
    add
      1) works with specific values


  0 passing (7ms)
  1 failing

  1) feature1
       add
         works with specific values:

      AssertionError [ERR_ASSERTION]: 4 == 3
      + expected - actual

      -4
      +3

      at Context.<anonymous> (feature1.spec.js:14:14)
      at processImmediate (internal/timers.js:456:21)



npm ERR! Test failed.  See above for more details.
```

Great! 🎉 🎉 🎉

Mocha, our test runner has worked as expected,
listening for which tests have passed or failed,
and if there were any errors thrown.
This time we have verified that
our implementation has not only been executed,
but also that it is **incorrect**.

At first glance, this might seem like a bad thing on the surface,
there is actually a positive element to it -
we have specifications that have picked up on
a problem in the implementation.
This is a **true negative** -
an incorrect implementation with a correct specification.

### Fix implementation

Edit `feature1.js` to fix the bug in our implementation.

It should now look like this:

```javascript
function add(x, y) {
  return x + y;
}
```

### True positive

Now that we think that the bug has been fixed,
let us verify that using our updated specification.

```shell
npm run test
```

You should see output similar to the following:

```shell
$ npm run test

> workshop-rsk-js-testing@0.0.0 test /home/bguiz/code/rsk/workshop-rsk-js-testing
> mocha './**/*.spec.js'



  feature1
    add
      ✓ works with specific values


  1 passing (2ms)

```

Great! 🎉 🎉 🎉

Mocha, our test runner has worked as promised,
listening for which tests have passed or failed,
and if there were any errors thrown.
This time we have verified that
our implementation has not only been executed,
but also that it is **correct**,
at least according to how we have written our tests.
This is a **true positive**. -
a correct implementation with a correct specification.

## Going further

We have now completed this workshop.
Congratulations on making it to the end! 🎉 🎉 🎉

There is a lot more to explore with regards to Javascript testing.
For example there are bugs in the above implementation,
which were not picked up by our specification,
due to a lack of tests for various scenarios.
Therefore we have a **false positive** on our hands.

It is also possible for us to have **false negatives**.
Ideally, we should aim to write our specifications such that
only **true negatives** and **true positives** are possible.
Of course, also write our implementations such that
only **true positives** are the only results that eventuate.

Check out
[DApps Dev Club's Javascript Testing Hands-on](https://dappsdev.org/hands-on/mocha-intro/)
if you would like to explore the **extended version** of this tutorial.
(This workshop is a partial extract from that original.)
