---
layout: rsk
title: rsk3.js
tags: libraries, rsk, rsk3js, javascript, web3js
---

# rsk3.js - RSK Javascript API

## Installation

```shell
npm install @rsksmart/rsk3
```

## Usage

```javascript
import Rsk3 from '@rsksmart/rsk3';

// Create a Rsk3 instance
const rsk3Instance = new Rsk3('http://localhost:4444');

// Get gas estimate
const gas = await rsk3Instance.estimateGas(txObject);
console.log('gas', gas);
> 5940000

// Get balance of a RSK address
const balance = await rsk3Instance.getBalance(address);
console.log('balance', balance);
> 200000000000000

// Send a signed transaction

// Methods in Rsk3.utils can be used without Rsk3 instantiation, for example
Rsk3.utils.isAddress('0xCd2a3D9f938e13Cd947EC05aBc7fE734df8dD826');
> true
```

## Example

This example shows a complete code snippet to construct and send a transaction with Rsk3.

```javascript
import Rsk3 from '@rsksmart/rsk3';
const rsk3 = new Rsk3('http://localhost:4444');
const publicKey = '';
const privateKey = '';
const toAddress = '';

const accountInfo = await rsk3.accounts.privateKeyToAccount(privateKey);
const nonce = await rsk3.getTransactionCount(publicKey);
const chainId = await rsk3.net.getId();
const gasPrice = await rsk3.getGasPrice();

// 1. Construct rawTransaction object to get gas estimate; note that estimateGas's parameter object can not include chainId
const value = new BigNumber(10).exponentiatedBy(15); // 10^15 wei

const rawTransaction = {
    from: publicKey,
    to: toAddress,
    value: Rsk3.utils.toHex(value.toNumber()),
    nonce: Rsk3.utils.toHex(nonce),
    gasPrice,
    data: '',
};

const gas = await rsk3.estimateGas(rawTransaction);

// 2. Add both chainId and gas to rawTransaction object
_.extend(rawTransaction, { chainId, gas });

// 3. Sign the rawTransaction with a specific private key
const signedTransaction = await accountInfo.signTransaction(rawTransaction, privateKey);

// 4. Send the signed transaction and use event emitter to capture response
await new Promise((resolve, reject) => {
    rsk3.sendSignedTransaction(signedTransaction.rawTransaction)
    .on('transactionHash', (hash) => {
        console.log('Get Transaction Hash: unconfirmed.', hash);
        return resolve();
    })
    .on('receipt', (receipt) => {
        console.log('receipt', receipt);
        return resolve();
    })
    .on('confirmation', (confirmationNumber, receipt) => {
        console.log('Get Transaction Hash: confirmation No.: ', confirmationNumber, ', receipt', receipt);
        return resolve();
    })
    .on('error', (error) => {
        console.error('error', error);
        return reject();
    });
});
```

## Commands

Install all dependencies for `npm run bootstrap`

```shell
npm run bootstrap
```

If you encounter an error:
"Maximum call stack size exceeded", you may wish to use
[`yarn`](https://yarnpkg.com/)
for the bootstrap process:

```shell
npm run bootstrap-yarn
```

Examine formatting of source code using `eslint`

```shell
npm run lint
```

Run all tests

```shell
npm run test
```

Remove all the `node_modules` folders in all modules

```shell
npm run clean
```

## Testing

Testing is done using `jest`. The configuration file `jest.config.js` and `jest.preprocessor.js` apply to tests in all packages.

To run all tests, under the root run

1. `npm run bootstrap`
1. `npm run test` OR `npm run test:coverage`

To run single package tests, under the root run

1. `npm run bootstrap`
1. `npx lerna run --scope package_name test`

## Formatting

Code Formatting is done using `eslint`. `.eslintrc.json` under root configures formatting rules for the whole project, and `.eslintignore` file exclude files watched by eslint.

## Release process

Decide on the new version number,
in this example we shall use `12.34.56`.

Check out a release branch to prepare a pull request:

```shell
git checkout -b proj/release-12.34.56

```

This command uses lerna to bump the version number in all of the packages:

```shell
npm run release

```

```text
? Select a new version (currently 12.34.55) Patch (12.34.56)

Changes:
 - @rsksmart/rsk3-abi: 12.34.55 => 12.34.56
 - @rsksmart/rsk3-account: 12.34.55 => 12.34.56
 - @rsksmart/rsk3-contract: 12.34.55 => 12.34.56
 - @rsksmart/rsk3-net: 12.34.55 => 12.34.56
 - @rsksmart/rsk3-personal: 12.34.55 => 12.34.56
 - @rsksmart/rsk3-utils: 12.34.55 => 12.34.56
 - @rsksmart/rsk3: 12.34.55 => 12.34.56

? Are you sure you want to create these versions? Yes
```

> Note that if you do not see **all** of the packages listed here,
> you will **fail the version check** in subsequent steps,
> as it requires that all packages have the same version number.
> So enter "no" in the prompt above.
> In order to work around this behaviour of lerna,
> edit any file in `rsk3-utils`, for example `packages/rsk3-utils/src/index.js`
> to introduce a diff, then run the above command again.
> After this command is completed, undo the change made in `rsk3-utils`.

```shell
$ git status
On branch proj/release-12.34.56
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   lerna.json
        modified:   package-lock.json
        modified:   package.json
        modified:   packages/rsk3-abi/package-lock.json
        modified:   packages/rsk3-abi/package.json
        modified:   packages/rsk3-account/package-lock.json
        modified:   packages/rsk3-account/package.json
        modified:   packages/rsk3-contract/package-lock.json
        modified:   packages/rsk3-contract/package.json
        modified:   packages/rsk3-net/package-lock.json
        modified:   packages/rsk3-net/package.json
        modified:   packages/rsk3-personal/package-lock.json
        modified:   packages/rsk3-personal/package.json
        modified:   packages/rsk3-utils/package-lock.json
        modified:   packages/rsk3-utils/package.json
        modified:   packages/rsk3/package-lock.json
        modified:   packages/rsk3/package.json

```

Add, commit, tag, and push:

```shell
git add -p
git commit -m "proj: release v12.34.56"
git push origin proj/release-12.34.56

```

Create a pull request, get it reviewed, and merge to master

Create a tag for the new version number:

```shell
git fetch origin master:master
git checkout master
git tag v12.34.56 -m v12.34.56
git push origin --tags

```

Publish new versions of all the packages on npm:

```shell
npm run publish

```

## Note

The majority of code in packages are similar to those with the same name in Web3.js, and will be upgraded in sync with Web3.js

## Audit

An independant security audit details can be found here: [/docs/auditreport.pdf](https://github.com/rsksmart/rsk3.js/blob/master/docs/auditreport.pdf)
