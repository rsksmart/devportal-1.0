---
menu_order: 600
menu_title: Integrate with Front-end Applications
layout: rsk
title: 'Integrate with Front-end Applications'
description: 'Learn how to integrate your Rootstock smart contract with front-end applications'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, blockchain
---
## Connecting Smart Contracts with Web Interfaces Using Ethers.js

Creating a user-friendly web interface for smart contracts on the Rootstock network can significantly enhance user interaction. Here, we'll focus on using ethers.js, a popular Ethereum library, for connecting your smart contracts to a web front-end.

## Project Setup and File Creation for Rootstock Network

### Create a New Project Folder:

Make a new folder for your Rootstock project: mkdir frontend, and navigate into it

```shell
mkdir frontend
cd frontend
```

### Initialize a Node.js Project:

```shell
npm init -y
```

### Install ethers.js:

```shell
npm install http-server
```

## Creating HTML and JavaScript Files for Rootstock Smart Contract Interaction

### Create an HTML File:

1. Create an HTML file with name index.html.
2. Write the basic HTML structure.

    ```html
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Web3 App with Ethers.js</title>
    </head>

    <body>
    </body>

    </html>
    ```

### Import Ethers:

- Import the Ethers library to interact with the wallet to the network.

```html
  <script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"></script>
```

### Create HTML elements inside the body

1. Create a button to trigger the function for connecting the wallet.
2. Create a button to trigger the function to get balance.
3. Create a div element to show the answer for the address connected.
4. Create a div element to show the answer for wallet balance.

    ```html
    <body>
      <div>
        <h1>Connect to Rootstock Network</h1>
        <button id="connectButton">Connect Wallet</button>
        <button id="getBalanceButton" disabled>Get MTK Balance</button>
        <div id="walletAddress"></div>
        <div id="walletBalance"></div>
      </div>
    </body>
    ```

5. Finally, import the javascript library that we will create in a further step

    ```html
      <script src="app.js"></script>
    </body>
    ```

### Create a JavaScript File:

1. Create a JavaScript file with the name `index.js`.
2. Create the function to wait until the DOM is loaded, instance the HTML elements (buttons and divs), and declare some variables

    ```js
    document.addEventListener('DOMContentLoaded', function () {
      const connectButton = document.getElementById('connectButton');
      const getBalanceButton = document.getElementById('getBalanceButton');
      const walletAddressDiv = document.getElementById('walletAddress');
      const walletBalanceDiv = document.getElementById('walletBalance');

      let provider, account, myTokenContract;
      let contractABI = [];
      // Replace with your contract's address
      const contractAddress = '0xa6fb392538BaC56e03a900BFDE22e76C05fb5122';
    });
    ```

3. Add a function that fetches the ABI and stores it in a variable.

    ```js
      async function fetchABI() {
        // Place the token file generated after compiling the contracts
        const response = await fetch('MyToken.json');
        const data = await response.json();
        contractABI = data.abi;
      }
    ```

4. Add a function that checks the wallet is connected to the Rootstock network.

    ```js
      async function checkNetwork() {
        const networkId = await window.ethereum.request({ method: 'net_version' });
        if ((networkId === "30") || (networkId === "31")) {
          return true;
        } else {
          return false;
        }
      }
    ```

5. Call the fetchABI function that loads the ABI and connects the wallet to the network

    ```js
      fetchABI().then(() => {
        // Connect button
        connectButton.addEventListener('click', async function () {
          const correctNetwork = await checkNetwork();
          if (!correctNetwork) {
            alert('Select the Rootstock Network on the Metamask wallet');
            return
          }
          if (typeof window.ethereum !== 'undefined') {
            try {
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              account = accounts[0];
              walletAddressDiv.innerHTML = `Connected account: ${account}`;
              provider = new ethers.providers.Web3Provider(window.ethereum);
              signer = provider.getSigner();
              myTokenContract = new ethers.Contract(contractAddress, contractABI, signer);
              getBalanceButton.disabled = false;
            } catch (error) {
              console.error("Error connecting to MetaMask", error);
              walletAddressDiv.innerHTML = `Error: ${error.message}`;
            }
          } else {
            walletAddressDiv.innerHTML = 'Please install MetaMask!';
          }
        })});
    ```

6. Add a function responding to the click event on the get balance button.

    ```js
        // Get Balance Button
        getBalanceButton.addEventListener('click', async function () {
          if (myTokenContract) {
            const balance = await myTokenContract.balanceOf(account);
            walletBalanceDiv.innerHTML = `MyToken Balance: ${balance} MTK`;
          }
        });
    ```

    The complete code of the javascript file should look like:

    ```js
    document.addEventListener('DOMContentLoaded', function () {
      const connectButton = document.getElementById('connectButton');
      const getBalanceButton = document.getElementById('getBalanceButton');
      const walletAddressDiv = document.getElementById('walletAddress');
      const walletBalanceDiv = document.getElementById('walletBalance');

      let provider, account, myTokenContract;
      let contractABI = [];
      // Replace with your contract's address
      const contractAddress = '0xa6fb392538BaC56e03a900BFDE22e76C05fb5122';

      async function fetchABI() {
        // Place the token file generated after compiling the contracts
        const response = await fetch('MyToken.json');
        const data = await response.json();
        contractABI = data.abi;
      }

      async function checkNetwork() {
        const networkId = await window.ethereum.request({ method: 'net_version' });
        if ((networkId === "30") || (networkId === "31")) {
          return true;
        } else {
          return false;
        }
      }

      fetchABI().then(() => {
        // Connect button
        connectButton.addEventListener('click', async function () {
          const correctNetwork = await checkNetwork();
          if (!correctNetwork) {
            alert('Select the Rootstock Network on the Metamask wallet');
            return
          }
          if (typeof window.ethereum !== 'undefined') {
            try {
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              account = accounts[0];
              walletAddressDiv.innerHTML = `Connected account: ${account}`;
              provider = new ethers.providers.Web3Provider(window.ethereum);
              signer = provider.getSigner();
              myTokenContract = new ethers.Contract(contractAddress, contractABI, signer);
              getBalanceButton.disabled = false;
            } catch (error) {
              console.error("Error connecting to MetaMask", error);
              walletAddressDiv.innerHTML = `Error: ${error.message}`;
            }
          } else {
            walletAddressDiv.innerHTML = 'Please install MetaMask!';
          }
        });

        // Get Balance Button
        getBalanceButton.addEventListener('click', async function () {
          if (myTokenContract) {
            const balance = await myTokenContract.balanceOf(account);
            walletBalanceDiv.innerHTML = `MyToken Balance: ${balance} MTK`;
          }
        });
      });
    });
    ```

## Running the frontend:

Finally, we execute a local web server to test the HTML file using the command.

```shell
npx http-server
```

Navigate to the URL [http://127.0.0.1:8080](http://127.0.0.1:8080) to test the code in the browser and you should get a result similar to the image below:

![Smart Contract Frontend](/assets/img/guides/quickstart/getting-started/frontend.png)

**Github Commit:** To examine the completed code for this section and compare your work, visit our GitHub repository: [View Commit](https://github.com/jesus-iov/rootstock-quick-start-guide/commit/1e61250ba40c31c5b01869e365fc57bec495457f). This link directs you to the specific commit with the updates made in this section.
