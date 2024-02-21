---
menu_order: 600
menu_title: Integrate with Front-end Applications
layout: rsk
title: 'Integrate with Front-end Applications'
description: 'Learn how to integrate your Rootstock smart contract with front-end applications'
tags: quick-start, getting-started, guide, how-to, bitcoin, rsk, rootstock, blockchain
render_features: 'collapsible'
---

Creating a user-friendly web interface for smart contracts on the Rootstock network can enhance user interaction. Here, we'll focus on using `ethers.js`, a popular Ethereum library, for connecting your smart contracts to a web front-end.

### Project Setup

1. Navigate to the `frontend` directory in the `MyToken` project:
    ```shell
    cd frontend
    ```

2. In the frontend directory:
    - Initialize a Node.js Project
      ```shell
      npm init -y
      ```

    - Install ethers.js
      ```shell
      npm install http-server
      ```

### Create HTML File

[](#top "collapsible")
- Update HTML File
    - In the frontend directory, open the `index.html` file:
      - [`index.html` initial state](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/master/frontend/index.html)
      - Copy the code snipet below and paste it in your html file:
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
- Import Ethers
   - To import the Ethers library to interact with the wallet to the network, copy the code snipet below and paste it in the `<head>` section of your html file:
      ```html
        <script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js"></script>
      ```
- Create HTML elements inside the body
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
- Import javascript file
  - Finally, to import the javascript library that we will create in a further step, copy the code snipet below and paste it in the `<body>` section of your html file::
    ```html
      <script src="app.js"></script>
    ```

Your `index.html` file should now look like the [`index.html` file](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/feat/complete/frontend/index.html) on GitHub.

### Create JavaScript Functions

[](#top "collapsible")
- Create basic javascript function
  1. In the frontend directory, open the `app.js` file.
      - `app.js` initial state and paste the [JavaScript content](https://github.com/rsksmart/rootstock-quick-start-guide/blob/master/frontend/app.js)
  2. Create the function to wait until the DOM is loaded, instance the HTML elements (buttons and divs), and declare some variables:
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
- Add a function that fetches the ABI and stores it in a variable
    ```js
      async function fetchABI() {
        // Place the token file generated after compiling the contracts
        const response = await fetch('MyToken.json');
        const data = await response.json();
        contractABI = data.abi;
      }
    ```
- Add a function that checks the wallet is connected to the Rootstock network
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
- Call the fetchABI function that loads the ABI and connects the wallet to the network
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
- Add a function responding to the click event on the get balance button.
    ```js
        // Get Balance Button
        getBalanceButton.addEventListener('click', async function () {
          if (myTokenContract) {
            const balance = await myTokenContract.balanceOf(account);
            walletBalanceDiv.innerHTML = `MyToken Balance: ${balance} MTK`;
          }
        });
    ```

Your javascript file should now look like the [`app.js` file](https://raw.githubusercontent.com/rsksmart/rootstock-quick-start-guide/feat/complete/frontend/app.js) on GitHub.

### Run the frontend

Finally, execute a local web server to test the HTML file using the following command:
```shell
npx http-server
```

Navigate to the URL [http://127.0.0.1:8080](http://127.0.0.1:8080) to test the code in the browser and you should get a result similar to the image below:
![Smart Contract Frontend](/assets/img/guides/quickstart/hardhat/frontend.png)