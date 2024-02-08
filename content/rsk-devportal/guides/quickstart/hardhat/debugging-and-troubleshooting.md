---
menu_order: 700
menu_title: Debugging and Troubleshooting
layout: rsk
title: 'Debugging and Troubleshooting Tips'
description: 'Learn about some potential issues you can run into and tips on how to resolve them'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, rootstock, blockchain
---

Common issues and solutions in Rootstock and Hardhat development.

<table>
    <tr>
   <td> <b>Issue</b>

   </td>
   <td> <b>Solution</b>

   </td>
  </tr>
  <tr>
   <td>Setup and Configuration Issues

   </td>
   <td>Double-check environment variables and configuration files for correctness.

   </td>
  </tr>
  <tr>
   <td>Compilation Errors

   </td>
   <td>Review Solidity code for syntax errors. Verify the correct Solidity version in the configuration file.

   </td>
  </tr>
  <tr>
   <td>Connection Issues

   </td>
   <td>Ensure correct network URL and settings. Maintain a stable internet connection.

   </td>
  </tr>
  <tr>
   <td>Deployment Failures

   </td>
   <td>Verify deployment script configuration, account, gas price, and funds.

   </td>
  </tr>
  <tr>
   <td>Truffle Compatibility Issues

   </td>
   <td>Adjust Hardhat configurations when migrating from Truffle.

   </td>
  </tr>
  <tr>
   <td>Testing Issues

   </td>
   <td>Review test scripts for logical errors. Ensure the right testing libraries and versions.

   </td>
  </tr>
  <tr>
   <td>Debugging Smart Contracts

   </td>
   <td>Use Hardhat's debugging tools. Utilize external tools like etherscan.

   </td>
  </tr>
  <tr>
   <td>Gas Estimation Errors

   </td>
   <td>Be cautious with gas-intensive operations. Adjust the gas limit or optimize code when needed.

   </td>
  </tr>
  <tr>
   <td>Version Compatibility

   </td>
   <td>Keep dependencies up-to-date and compatible.

   </td>
  </tr>
  <tr>
   <td>Community Resources

   </td>
   <td>Seek help from online forums, developer communities, and social media platforms like Reddit and GitHub.

   </td>
  </tr>
</table>

## Web3 Development Tools and Libraries

These tools are specifically tailored for Web3 development, and they can simplify the integration of blockchain functionaity into web interfaces. Here are a few recommended tools and libraries that are popular in the Web3 space, along with brief descriptions:

### RainbowKit
[RainbowKit](https://www.rainbowkit.com/) is a React library offering a comprehensive wallet connection solution. It provides a beautiful, easy-to-use wallet connection interface that supports multiple wallets and networks.

**Why Use It:** 

RainbowKit is great for projects where you want a seamless and user-friendly wallet connection experience. It's easy to integrate and manage, especially in React-based applications.

### Web3Modal

[Web3Modal](https://web3modal.com/) is a JavaScript library that provides a simple, unified wallet connection modal for Web3 applications. It supports various wallet providers and can be used with different Web3 libraries.

**Why Use It:** 

If you need to start using React or want a framework-agnostic wallet connection solution, Web3Modal is an excellent choice. It’s customizable and works well with both web3.js and ethers.js.

### Wagmi

[Wagmi](https://wagmi.sh/) is a React Hooks for Ethereum set that simplifies interactions with ethers.js. It provides hooks for wallet connection, contract interaction, balances, and more.

**Why Use It:** 

For React developers who prefer a hooks-based approach, Wagmi offers an elegant way to integrate Ethereum functionality. It makes managing state and blockchain interactions more intuitive.

### Moralis

[Moralis](https://moralis.io/) is a fully managed backend platform for Web3 and blockchain applications. It offers a suite of tools for authentication, real-time databases, cloud functions, and syncing blockchain data.

**Why Use It:** 

Moralis can be a time-saver to build a more comprehensive application with backend support. It handles much of the backend complexity and lets you focus on front-end development.

## Exploring Alternative Testing Approaches and Frameworks

In addition to Mocha and Chai, you can use several other frameworks and approaches in your Hardhat project. Each has its unique features and benefits.

### Jest - A Delightful JavaScript Testing Framework

[Jest](https://jestjs.io/) is popular for its delightful syntax and focus on simplicity. It works well for testing both frontend and backend JavaScript applications.

### Waffle - Ethereum Smart Contract Testing Library

[Waffle](https://getwaffle.io/) is a library for writing and testing smart contracts. It is often used with ethers.js and is known for its fluent syntax.
