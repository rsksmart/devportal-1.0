---
layout: rsk
title: rsk3.js
tags: libraries, rsk, rsk3js, javascript, web3js
---

# rsk3.js - RSK Javascript API

## Installation

```shell
npm install rsk3
```

## Usage

```javascript
import Rsk3 from 'rsk3';

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
import Rsk3 from 'rsk3';
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

## Note

The majority of code in packages are similar to those with the same name in Web3.js, and will be upgraded in sync with Web3.js
