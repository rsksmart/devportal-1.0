---
layout: rsk
title: RIF Relay Develop
tags: rif, enveloping, envelope, relay, user, guide, develop
permalink: /guides/rif-relay/develop/
---


## Initializing the project

To use Relay, follow these steps to build the project.

## Project structure

The project has on-chain and off-chain components.

- The `contracts` directory in the root directory, contains all the smart contracts involved in RIF Relay.
    - These can be compiled with `yarn prepare`. The changes will be reflected in the `build/contracts`.
    - If a new contract is created, it is important to add it to `migrations/2_deploy_contracts.js` for deploying it.
    - The solidity version used currently is `^0.6.12`.
- The `src` directory contains the off-chain components such as `cli`, `relayclient` and `relayserver`. Everything here is coded in `typescript`.
    - To compile these typescript files, use `yarn tsc`. The changes will appear in the `dist` directory.
- The `jsrelay` directory contains files for running a Relay Server. See here for more details.
- `test` contains the test suite. See section below to learn how to test Relay.

## Testing

When adding new tests, we should compile them first (with `yarn tsc`) before running them.

- To run all the tests:

`./run-tests.sh`

Note: The script will start an RSK node in regtest mode and then run all the tests. So it takes some time to run the tests. You need to have `curl` in order to run it.

- To run a specific test:

Once the project is built, we can test it with truffle
`yarn generate && npx truffle test --network rsk test/Flows.test.ts` (with [truffle](https://www.trufflesuite.com/))


## Committing changes

To contribute to the project, create a branch with the name of the new feature you are implementing (e.g. `gas-optimization`). When you commit to git, a hook is executed. The hook executes a linter and all the tests.

## Troubleshooting

<a id="c07"></a>

Common errors when testing

#### Running a test throws the Error: Cannot find module 'directory-to-the-project/relay/rsknode/test/Flows.test.ts'

Ensure that you are in the project's root directory and that the test's name has no typos

#### Running Flows.test.ts test throws the error: http://localhost:8090 => Error: local view call to 'relayCall()' reverted: view call to 'relayCall'..

Stop the running node and delete the db used by the node.

#### Running some test and one of them throws: Error: listen EADDRINUSE: address already in use :::8090

The relay server running in the background. Run the bash file `scripts/kill-relay-server.sh`
