---
menu_order: 300
menu_title: Test Smart Contract
layout: rsk
title: 'Test Smart Contract'
description: ''
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, blockchain
---

### Testing the Contract

#### Installing Testing Dependencies Mocha and Chai

Before writing tests for your token contract, ensure that you have the required testing dependencies installed in your project.

```shell
npm install --save-dev mocha chai@4.2.0
```

Mocha is a feature-rich JavaScript test framework running on Node.js, making asynchronous testing simple and fun. Chai is an assertion library for Node and the browser that can be delightfully paired with any JavaScript testing framework.

#### Create the Test Directory

If your project doesn't have a test directory yet, create one. In your project's root directory, run mkdir test in the terminal or command prompt. This is where you will store all your test files.

```shell
mkdir test
```

#### Create a New Test File

Create a new file for testing your token contract inside the test directory. For instance, name it **MyToken.test.js**.
Write tests for your token contract in this file using Mocha and Chai. Here's a basic test example:

```js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  it("Should deploy MyToken and assign the total supply to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(1000);
    await myToken.deployed();

    expect((await myToken.totalSupply()).toString()).to.equal('1000');
    expect((await myToken.balanceOf(owner.address)).toString()).to.equal('1000');
  });
});
```

#### Run the Tests

To execute your tests, run npx hardhat test in your project's root directory. This will run your written tests, confirming that your contract operates as intended.

```shell
npx hardhat test
```

You should get a response like below:

By following these steps, you'll have the necessary testing frameworks installed and be well-prepared to write effective tests for your smart contract.
