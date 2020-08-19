---
layout: rsk
title: "RSK Workshop: Smart Contract Testing using OpenZeppelin CLI"
tags: rsk, workshop, solidity, testing, openzeppelin, oz-cli
description: Look at smart contracts through the lens of state and state transitions, and learn how to test solidity smart contracts using the OpenZeppelin CLI"
---

## Pre-requisites

Prior to commencing this tutorial,
please ensure that you have installed the following
RSK workshop pre-requisites on your system:

- [POSIX compliant shell](https://github.com/bguiz/workshop-rsk-prereqs/blob/master/walkthru.md#posix-compliant-shell)
- [NodeJs](https://github.com/bguiz/workshop-rsk-prereqs/blob/master/walkthru.md#nodejs)
- [OpenZeppelin CLI](https://github.com/bguiz/workshop-rsk-prereqs/blob/master/walkthru.md#openzeppelin-cli)
- [Java](https://github.com/bguiz/workshop-rsk-prereqs/blob/master/walkthru.md#java)
- [curl](https://github.com/bguiz/workshop-rsk-prereqs/blob/master/walkthru.md#curl)
- [Code editor](https://github.com/bguiz/workshop-rsk-prereqs/blob/master/walkthru.md#code-editor)
- [RSKj](https://github.com/bguiz/workshop-rsk-prereqs/blob/master/walkthru.md#rskj)

## Project setup

Use `git` to make a copy of this repo,
and use `npm` to install dependencies.

```shell
git clone git@github.com:bguiz/workshop-rsk-smart-contract-testing-ozcli.git
cd workshop-rsk-smart-contract-testing-ozcli
npm install
```

Then open up this directory in your code editor.

## Explore the files

If you happen to have `tree` installed,
you can use that to view the directory structure using the following command.

```shell
$ tree -aI 'node_modules|*.md|package*.json|.git*'
.
├── contracts
│   └── Cars.sol
├── networks.js
├── .openzeppelin
│   └── project.json
├── scripts
│   ├── clean.sh
│   └── setup.sh
└── test
    └── Cars.spec.js

4 directories, 6 files

```

(Otherwise use your choice of GUI to explore this folder.)

Observe that we have the following files:

- `.openzeppelin/project.json`:
  OZ CLI has already been pre-configured to work with the structure
  for this project.
- `networks.js`:
  OZ CLI has already been pre-configured to connect to your choice of
  RSK Regtest, RSK Testnet, or RSK Mainnet.
- `scripts/clean.sh` and `scripts/setup.sh`:
  These are custom scripts which generate keys and configuration that
  will be used by OZ CLI when connecting to RSK networks.
- `contracts/Cars.sol`:
  This is the smart contract.
  The solidity file is the implementation, and has been completed for you.
  - If you are familiar will Truffle, you may notice that there is no
    corresponding deployment script (also known as migration contract)
  - OZ ClI takes a different approach, instead persisting migration
    status within JSON files within the `.openzeppelin` directory.
- `test/Cars.spec.js`
  This is the specification, and is only partially complete.
  This workshop is focused on completing the specification.

Ensure that you have a copy of RSKj running in Regtest locally,
and then run the set up script:

```shell
bash ./scripts/setup.sh
```

This will set up the RSK specific files for this project
which are specific to you at this time.
Observe the output in your terminal for more details.

## Implementation

Look at `contracts/Cars.sol`.

We have a smart contract implementation
that involves manipulating several car objects.

```solidity
pragma solidity ^0.5.0;

contract Cars {

    enum CarStatus { driving, parked }

    event CarHonk (uint256 indexed fromCar, uint256 indexed atCar);

    struct Car {
        bytes3 colour;
        uint8 doors;
        uint256 distance;
        uint16 lat;
        uint16 lon;
        CarStatus status;
        address owner;
    }

    uint256 public numCars = 0;
    mapping(uint256 => Car) public cars;

    constructor() public {}

    function addCar(
        bytes3 colour,
        uint8 doors,
        uint256 distance,
        uint16 lat,
        uint16 lon
    ) public payable returns(uint256 carId) {
        require(msg.value > 0.1 ether,
          "You need at least 0.1 ETH to get a car");
        carId = ++numCars;
        Car memory newCar = Car(
            colour,
            doors,
            distance,
            lat,
            lon,
            CarStatus.parked,
            msg.sender
        );
        cars[carId] = newCar;
    }

    modifier onlyCarOwner(uint256 carId) {
        require(cars[carId].owner == msg.sender,
            "you need to own this car");
        _;
    }

    modifier onlyCarStatus(uint256 carId, CarStatus expectedStatus) {
        require(cars[carId].status == expectedStatus,
            "car is not in the required status");
        _;
    }

    function driveCar(uint256 carId)
        public
        onlyCarOwner(carId)
        onlyCarStatus(carId, CarStatus.parked)
    {
        cars[carId].status = CarStatus.driving;
    }

    function parkCar(uint256 carId, uint16 lat, uint16 lon)
        public
        onlyCarOwner(carId)
        onlyCarStatus(carId, CarStatus.driving)
    {
        cars[carId].status = CarStatus.parked;
        cars[carId].lat = lat;
        cars[carId].lon = lon;
    }

    function honkCar(uint256 carId, uint256 otherCarId)
        public
        onlyCarOwner(carId)
    {
        require(cars[otherCarId].owner != address(0x00),
          "other car must exist");
        uint256 timeOfDay = (getTime() % 86400);
        require(timeOfDay >= 21600,
            "cannot honk between midnight and 6am"
        );
        emit CarHonk(carId, otherCarId);
    }

    function getTime() internal view returns (uint256) {
        // current block timestamp as seconds since unix epoch
        // ref: https://solidity.readthedocs.io/en/v0.5.7/units-and-global-variables.html#block-and-transaction-properties
        return block.timestamp;
    }
}

```

We are not really concerned about how to write this implementation
for this workshop, but we do need to know what the implementation does
in order to be able to write tests for it.

## Specification, incomplete

Look at `test/Cars.spec.js`.

Here, we have an incomplete specification.
We obtain the `Cars` smart contract
defined in our implementation earlier,
using `contract.fromArtifact()`.
This is OZ CLI's analogue of using NodeJs `require()`
to obtain the implementation when testing Javascript using Mocha.
Those of you familiar with Truffle might recognise this
as being the equivalent of `artifacts.require()`.

Unlike Truffle, where we make use of `contract` blocks to group tests,
in OZ CLI tests, we use `describe` blocks to group our tests;
exactly as how we would do so when using Mocha.
We can do this because OZ CLI's test environment -
`@openzeppelin/test-environment` -
enables us to access the list of `accounts` up-front.
Thus there is no need to obtain the `accounts` via
the `describe` block's callback function.


```javascript
const { accounts, contract } = require('@openzeppelin/test-environment');
const assert = require('assert');
const web3 = require('web3');

const BN = web3.utils.BN;

const Cars = contract.fromArtifact('Cars');

describe('Cars - initial state', () => {
  const [owner] = accounts;

  let instance;

  before(async () => {
    instance = await Cars.new({ from: owner });
  });

  it('Initialised with zero cars', async () => {
    const initialNumCars =
      await instance.numCars.call();

    // TODO perform assertions
  });
});

describe('Cars - state transitions', () => {
  const [owner] = accounts;

  let instance;

  before(async () => {
    instance = await Cars.new({ from: owner });
  });

  it('Adds a new car', async () => {
    // preview the return value without modifying the state
    // ... (redacted for brevity) ...

    // TODO perform the assertions
  });

});

describe('Cars - events', () => {
  const [owner] = accounts;

  let instance;

  before(async () => {
    instance = await Cars.new({ from: owner });

    // set up contract with relevant initial state
    // ... (redacted for brevity) ...

    // just a sanity check, we do not really need to do assertions
    // within the set up, as this should be for "known working state"
    // only
    // ... (redacted for brevity) ...
  });

  it('Honks a car at another car', async () => {
    // perform the state transition
    // ... (redacted for brevity) ...

    // TODO perform assertions
  });

  it('Honking a car that you do not own is not allowed', async () => {
    // perform the state transition
    // ... (redacted for brevity) ...

    // TODO perform assertions
  });

});


```

Note that we have several instances of `// ... (redacted for brevity) ...`
as comments. In these cases, there is test code set up
and already available in the demo repo,
but it has been omitted here to keep this document short.
The intent here is to show the overall structure.
These parts indicate code that performs the steps within the test specifications.
When writing specifications for your smart contracts,
you will need to do this from scratch,
but for the sake of demonstration it is already there in full.

Note that we have four occurrences of `// TODO perform assertions` in the test code,
and in this workshop we will be writing those assertions.

Also note that within the `contract` block for `'Cars - events'`,
we have a `before` block.
This is used to set up the state of the contract by adding a couple of
car objects,
because these particular tests only make sense if there
already are car objects stored within the smart contract.
This has already been done for you,
so that you may focus on writing the tests.



## Initial test run

At this point, we are all set to let Truffle Test, our test runner,
do its thing, which will execute out specification,
which in turn will execute our implementation.

```shell
npm run test
```

You should see output similar to the following:

```shell
$ npm run test

> workshop-rsk-smart-contract-testing-ozcli@0.0.0 test /home/bguiz/code/rsk/workshop-rsk-smart-contract-testing-ozcli
> oz compile && mocha --exit --recursive ./test/**/*.spec.js

✓ Compiled contracts with solc 0.5.17 (commit.d19bba13)


  Cars - initial state
    ✓ Initialised with zero cars

  Cars - state transitions
    ✓ Adds a new car (124ms)

  Cars - events
    ✓ Honks a car at another car
    ✓ Honking a car that you do not own is not allowed (44ms)


  4 passing (608ms)

```

Great! Our test runner (OZ CLI test) has run successfully! 🎉 🎉 🎉

Our test runner has done the above,
listening for which tests have passed or failed,
and if there were any errors thrown.

However, note that since we have **four** tests in our specification,
and they are indeed interacting with the smart contract (implementation),
but none of them are performing any assertions,
so we don't know whether the implementation is correct or not.

That means that it is time to write our first assertions!

## Writing a test for initial state

Edit `test/Cars.spec.js`.

Replace the line that says `// TODO perform assertions`
with an assertion.
It should now look like this:

```javascript
  it('Initialised with zero cars', async () => {
    const initialNumCars =
      await instance.numCars.call();

    assert.equal(initialNumCars.toString(), '0');
  });
```

This test is grouped within a `contract` block.
When there are multiple tests within the same `contract` block,
the state of the smart contract
is not reset between one test and the next.
However, when there are multiple tests in different `describe` blocks,
the state of the smart contract
is indeed reset between one `describe` block and the next,
as we are doing this explicitly by setting up a new `instance` variable in each one.

For those accustomed to working with Truffle,
this is analogous to doing `const instance = await Cars.deployed();`
within **each** `it` block.
In OZ CLI, instead of doing this, we use the method described above.
This might take a bit of getting used to,
but is indeed exactly how one would do this
in "regular" Javascript testing with Mocha.

In this case, this is the first (and only) `it` block within this `describe` block,
so it is perfect for testing the initial state of the smart contract.

The line `const initialNumCars = await instance.numCars.call();`
retrieves the value of the `numCars` variable in the smart contract.

The line `assert.equal(initialNumCars.toString(), '0');`
passes the test if this value is zero,
and fails the test if this value is anything other than zero.

## Test run for initial state

Now we are going to let OZ CLI Test, our test runner,
do its thing again.

This time we have a test defined in our specification,
so when mocha executes our specification,
it will indeed execute out implementation in turn.

(Previously, when we had zero tests,
the implementation was not executed at all.)

Run OZ CLI Test.

```shell
npm run test
```

You should see some output similar to the following

```shell
$ npm run test

> workshop-rsk-smart-contract-testing-ozcli@0.0.0 test /home/bguiz/code/rsk/workshop-rsk-smart-contract-testing-ozcli
> oz compile && mocha --exit --recursive ./test/**/*.spec.js

Nothing to compile, all contracts are up to date.


  Cars - initial state
    ✓ Initialised with zero cars (59ms)

  Cars - state transitions
    ✓ Adds a new car (122ms)

  Cars - events
    ✓ Honks a car at another car
    ✓ Honking a car that you do not own is not allowed (45ms)


  4 passing (693ms)

```

Great! 🎉 🎉 🎉

OZ CLI Test, our test runner has worked as promised,
listening for which tests have passed or failed,
and if there were any errors thrown.
This time we have verification not only that
our implementation has been executed,
but also that it is correct
(at least according to how we have written our tests).

The output is almost identical to the output before,
except that it takes a (marginally) longer time to execute.
The main thing that we need to look out for here is
whether we have gone from having 4 tests passing to less than 4 tests passing,
which would indicate that there is either
a problem with our specification (a false negative),
or a problem with our implementation (a true negative).

Testing the initial state of a smart contract is the simplest possible
type of test we can write.
Now let's move on to **more complex tests** for state transitions and events.

## Writing a test for state transition

Edit `test/Cars.spec.js`.

Replace the two lines that say `// TODO perform assertions`
with assertions.
It should now look like this:

```javascript
  it('Adds a new car', async () => {
    // preview the return value without modifying the state
    const returnValue =
      await instance.addCar.call(
        '0xff00ff', // colour: purple
        new BN(4), // doors: 4
        new BN(0), // distance: 0
        new BN(0), // lat: 0
        new BN(0), // lon: 0
        {
          from: accounts[1],
          value: web3.utils.toWei('0.11', 'ether'),
        },
      );
    assert.equal(returnValue.toString(), '1');

    // perform the state transition
    const tx =
      await instance.addCar(
        '0xff00ff', // colour: purple
        new BN(4), // doors: 4
        new BN(0), // distance: 0
        new BN(0), // lat: 0
        new BN(0), // lon: 0
        {
          from: accounts[1],
          value: web3.utils.toWei('0.11', 'ether'),
        },
      );

    // retrieve the updated state
    const numCars =
      await instance.numCars.call();
    const car1 =
      await instance.cars.call(new BN(1));

    // perform the assertions
    assert.equal(numCars.toString(), '1');

    assert.equal(car1.colour, '0xff00ff');
    assert.equal(car1.doors.toString(), '4');
    assert.equal(car1.distance.toString(), '0');
    assert.equal(car1.lat.toString(), '0');
    assert.equal(car1.lon.toString(), '0');
    assert.equal(car1.status.toString(), '1'); // parked
    assert.equal(car1.owner, accounts[1]);
  });
```


The line `const returnValue = await instance.addCar.call(/* ... */);`
retrieves the return value of the `addCar` function.
Some participants in this workshop may have noticed something
that is perhaps a little strange:

- `addCar` is a function that causes a state transition,
  as it updates the values stored in the smart contract.
  In fact it has neither the `view` nor `pure` function modifiers.
- In our smart contract invocation, we are executing `.addCar.call()`
  and not `.addCar()`.

Usually we use `.call()` when invoking `view` or `pure` functions,
so why are we using `.call()` here on a function which
explicitly causes a state transition?

The answer to that is not exactly straightforward:
We are doing so to "emulate" what the return value
of this particular call to the smart contract would be, **without**
actually causing the state transition.
Think of this as "previewing" the function invocation.
The reason we need to do this is because if it were a true function invocation
that resulted in a state transition on the smart contract,
we don't have access to the return value.

The line `assert.equal(returnValue.toString(), '1');` is the first assertion,
and will fail this test if the new `carId` is any value other than one.

The line `const tx = await instance.addCar(/* ... */);`
is where the actual state transition occurs.
This is a "true" invocation of the `addCar` function,
unlike the previous "preview" invocation of the `addCar` function.
When this line has been executed, a transaction has been added to a block,
and that block to the blockchain.
This test, and any other test that involves a smart contract state transition,
will be significantly slower than tests that do not,
such as the one that we wrote earlier for the initial state.

The lines `const numCars = await instance.numCars.call();`
and `const car1 = await instance.cars.call(new BN(1));`
retrieve the new/ updated state from the smart contract.

The remaining lines are many `assert.equal()` statements,
which will fail this test is the new/ updated state does not match the expected values.

## Test run for state transition

Now we are going to run our tests again.

This time we have two tests.

Run Truffle Test.

```shell
npm run test
```

You should see output similar to the following

```shell
$ npm run test

> workshop-rsk-smart-contract-testing-ozcli@0.0.0 test /home/bguiz/code/rsk/workshop-rsk-smart-contract-testing-ozcli
> oz compile && mocha --exit --recursive ./test/**/*.spec.js

Nothing to compile, all contracts are up to date.


  Cars - initial state
    ✓ Initialised with zero cars

  Cars - state transitions
    ✓ Adds a new car (176ms)

  Cars - events
    ✓ Honks a car at another car
    ✓ Honking a car that you do not own is not allowed (45ms)


  4 passing (654ms)

```

All four tests continue passing. Great! 🎉 🎉 🎉

Again, the main thing that we are looking out for here is
that the tests continue passing.
If one of the tests began to fail,
we know that there is either a problem with the implementation (a true negative),
or a problem with our specification (a false negative).

## Test run with false negative for state transition

If you are feeling in an exploratory mood,
you can try the following out:

Replace `assert.equal(car1.colour, '0xff00ff');`,
the on of the assertions in this test,
with `assert.equal(car1.colour, '0xff00aa');`.

Run the tests again, using `npm run test`.

Observe that the output indicates an assertion error:

```shell
i$ npm run test

> workshop-rsk-smart-contract-testing-ozcli@0.0.0 test /home/bguiz/code/rsk/workshop-rsk-smart-contract-testing-ozcli
> oz compile && mocha --exit --recursive ./test/**/*.spec.js

Nothing to compile, all contracts are up to date.


  Cars - initial state
    ✓ Initialised with zero cars

  Cars - state transitions
    1) Adds a new car

  Cars - events
    ✓ Honks a car at another car (42ms)
    ✓ Honking a car that you do not own is not allowed (46ms)


  3 passing (740ms)
  1 failing

  1) Cars - state transitions
       Adds a new car:

      AssertionError [ERR_ASSERTION]: '0xff00ff' == '0xff00aa'
      + expected - actual

      -0xff00ff
      +0xff00aa

      at Context.<anonymous> (test/Cars.spec.js:74:12)
      at processTicksAndRejections (internal/process/task_queues.js:97:5)



npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! workshop-rsk-smart-contract-testing-ozcli@0.0.0 test: `oz compile && mocha --exit --recursive ./test/**/*.spec.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the workshop-rsk-smart-contract-testing-ozcli@0.0.0 test script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

```

Of course in this case, we were expecting it,
and already know that the problem lies in the specification,
in particular, an incorrect assertion.

However, in a real (non-demo) scenario, when we encounter this,
we would know that we have encountered a test failure,
and would require investigation to determine whether this was due to
a problem in the implementation,
causing a true negative;
or conversely whether there was a problem with the specification,
causing a false negative.

If you have chosen to do this additional step,
do remember to revert the change before continuing
with the rest of this workshop.

## Writing a test for events

Edit `test/Cars.spec.js`.

As mentioned previously, this `contract` block contains
a `before` block which sets up the smart contract instance
to contain two cars prior to running any tests.
This has been done for you, so you may skim over it,
and get right to writing some tests.

Replace the first line that says `// TODO perform assertions`
with assertions.
The `it` block should now look like this:

```javascript
  it('Honks a car at another car', async () => {
    // perform the state transition
    const tx =
      await instance.honkCar(
        2,
        1,
        {
          // account #2 owns car #2
          from: accounts[2],
        },
      );

      // inspect the transaction & perform assertions on the logs
      const { logs } = tx;
      assert.ok(Array.isArray(logs));
      assert.equal(logs.length, 1);

      const log = logs[0];
      assert.equal(log.event, 'CarHonk');
      assert.equal(log.args.fromCar.toString(), '2');
      assert.equal(log.args.atCar.toString(), '1');
  });
```

In our previous test, where we invoked `addCar`,
we did not use the return value (`tx`)
in the remainder of the test.
In this test, we will.

The line `const tx = await instance.honkCar(/* ... */);`
invokes the `honkCar` function,
and saves the transaction in `tx`.

The next three lines, beginning with `const { logs } = tx;`,
extract `tx.logs`.
The assertion statements will fail this test if
there is no `tx.logs` array,
or if it has a number of logs that is anything other than one.

> Note that in RSK, transaction logs are generated when
> an event is emitted within that transaction.
> This is equivalent to the behaviour of transaction logs in Ethereum.

The next four lines, beginning with `const log = logs[0];`,
extract the first (and only) event from this transaction.
The assertion statements will fail this test is the
event is not of the expected type or contain unexpected parameters.

So far, in each `describe` block we have had only one test,
but this time we'll be doing something different,
with two tests sharing the same `describe` block.

Replace the second line that says `// TODO perform assertions`
with assertions.

```javascript
  it('Honking a car that you do not own is not allowed', async () => {
    // perform the state transition
    let tx;
    let err;
    try {
      tx =
        await instance.honkCar(
          2,
          1,
          {
            // account #3 does not own any cars, only account #1 and #2 do
            from: accounts[3],
          },
        );
    } catch (ex) {
      err = ex;
    }

    // should not get a result, but an error should have been thrown
    assert.ok(err);
    assert.ok(!tx);
  });
```

The line `const tx = await instance.honkCar(/* ... */);`
is similar to the `honkCar` invocation from before.
However, if you take a look at the parameters,
you will notice that we attempt to operate a car
using an account that does not own it.

Also, unlike the invocation in the previous test,
this statement has been surrounded by a `try ... catch` block,
because we are expecting this invocation to throw an error.

> Note that in the implementation, `contracts/Cars.sol`,
> the `honkCar(carId,otherCarId)` function has a function modifier
> for `onlyCarOwner(carId)`, which contains this statement:
> `require(cars[carId].owner == msg.sender, "you need to own this car");`.
> The purpose of this is that only a car's owner is allowed to honk it.

Thus far, all of our tests have been "happy path" cases,
where the smart contract functions are always called in the expected way.
These tests ensure that the smart contract behaves as it is supposed to,
when those interacting with it do the "right thing".

However, external behaviour is something that is **not**
within the locus of our control,
and therefore by definition we need to ensure that our smart contract
is able to handle these "failure path" cases too.
In this case our implementation appears to have handled it,
and we are writing a test within the specification to verify the handling.

The final two lines, `assert.ok(err);` and `assert.ok(!tx);`,
will fail this test if the `honkCar` invocation succeeded,
when it was not supposed.
Remember: We are **not** testing the "happy path" here.
Instead we are testing the "failure path".

## Test run for events

Now we are going to run our tests again.

This time we have four tests.

Run Truffle Test.

```shell
npm run test
```

You should see output similar to the following

```shell
$ npm run test

> workshop-rsk-smart-contract-testing-ozcli@0.0.0 test /home/bguiz/code/rsk/workshop-rsk-smart-contract-testing-ozcli
> oz compile && mocha --exit --recursive ./test/**/*.spec.js

Nothing to compile, all contracts are up to date.


  Cars - initial state
    ✓ Initialised with zero cars

  Cars - state transitions
    ✓ Adds a new car (124ms)

  Cars - events
    ✓ Honks a car at another car
    ✓ Honking a car that you do not own is not allowed (87ms)


  4 passing (718ms)

```

All four are still passing. Great! 🎉 🎉 🎉

## Conclusion

We have now created specifications for testing initial state,
state transitions, and events in a smart contract written in Solidity.

We have also configure the OpenZeppelin CLI to connect to RSK networks,
and used it as a test runner to execute our specifications.

## Going further

We have now completed this workshop.
Congratulations on making it to the end! 🎉 🎉 🎉

There is a lot more to explore with regards to Smart contract testing.

For example, you may have noticed that in the
implementation for `honkCar()`,
we have commented out a `require()` statement
that verifies the value of `getTime()`.
Writing a robust specification for this implementation is seemingly not possible,
as it behaves differently depending on the time of day it is run.
Mocking is a testing technique that will enable us to
replace one (or sometimes more) functions within a smart contract
in order to be able to test it in particular ways,
and will help in this case.

Check out
[DApps Dev Club's Mocking Solidity for Tests](https://dappsdev.org/hands-on/testing/solidity-mocks/)
if you would like to try out **smart contract mocking** as a continuation of this tutorial.
(This workshop is a modified and shortened version from that original.)

