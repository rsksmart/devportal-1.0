---
menu_title: Front End
layout: rsk
title: Full Stack dApp Guide on Rootstock - Part 3 | Rootstock (RSK)
description: 'Build a complete full stack decentralized application on Rootstock, from front-end to smart contracts'
tags: the-complete-full-stack-dapp-guide, full-stack, dapp, tutorial, overview, front-end, guides, smart-contracts, web3, bitcoin, rsk, Rootstock, peer-to-peer, dapp-examples, blockchain
---

This is the third part of the series
on [building a **complete full stack dApp on Rootstock**](/guides/full-stack-dapp-on-rsk/).

In this article, we’ll go through how to develop
a simple voting app user interface using HTML and Javascript
for our dApp that we started building in
[The Complete Full Stack dApp Guide on Rootstock - Part 1: Overview](/guides/full-stack-dapp-on-rsk/part1-overview/) and
[The Complete Full Stack dApp Guide on Rootstock - Part 2: Smart Contract](/guides/full-stack-dapp-on-rsk/part3-front-end/) guides.

## 1. Client Folder

In this tutorial, a starting point for our front end application has already been included. This folder contains the following items as shown in the image below.

![Client Folder](/assets/img/guides/complete-full-stack-dapp/ClientFolder.png)

## 2. Package.json

The `package.json` is a JSON file that exists at the root of this project folder. It holds information used to manage the project's dependencies, scripts, version, and a whole lot more.

```json
{
  "name": "workshop-rsk-full-stack-dapp",
  "version": "0.0.0",
  "description": "RSK Workshop for Full Stack DApp",
  "main": "truffle-config.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "build": "webpack --config ./webpack.config.js --mode development --output ./dist/main.js",
    "dev": "webpack-dev-server --config ./webpack.config.js --mode production --output ./dist/main.js",
    "test": "truffle test --network regtest"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/bguiz/workshop-rsk-smart-contract-testing-truffle.git"
  },
  "keywords": [
    "rsk",
    "testing",
    "workshop",
    "truffle"
  ],
  "author": "bguiz",
  "license": "GPL-3.0",
  "bugs": {
    "url": "https://github.com/bguiz/workshop-rsk-smart-contract-testing-truffle/issues"
  },
  "homepage": "https://github.com/bguiz/workshop-rsk-smart-contract-testing-truffle#readme",
  "dependencies": {
    "web3": "1.2.11"
  },
  "devDependencies": {
    "@truffle/hdwallet-provider": "1.0.35",
    "mnemonics": "1.1.3",
    "copy-webpack-plugin": "6.1.0",
    "webpack": "4.44.1",
    "webpack-cli": "3.3.12",
    "webpack-dev-server": "3.11.0"
  }
}

```

## 3. dApp.js

The JS portion of our dApp is placed at `./client/dapp.js`
nd the full source code can be found in the
[The Complete Full Stack dApp on Rootstock repo](https://github.com/bguiz/workshop-rsk-full-stack-dapp).

In order for the `dapp.js` file to work,
we would need to use a browser with
a [Web3](https://web3js.readthedocs.io/en/v1.2.11/)-enabled browser extension.
We suggest [Metamask](https://metamask.io) and the [Liquality Wallet](https://chrome.google.com/webstore/detail/liquality-wallet/kpfopkelmapcoipemfendmdcghnegimn).

> Note: The Nifty browser wallet has been discontinued. See the [Nifty Wallet)](https://developers.rsk.co/wallet/use/nifty) page for more information.

```javascript
import Web3 from 'web3';
import electionArtefact from '../build/contracts/Election.json';

import utils from './utils.js';

document.addEventListener('DOMContentLoaded', onDocumentLoad);

function onDocumentLoad() {
  DApp.init();
}

const DApp = {
  web3: null,
  contracts: {},
  accounts: [],

  init: function() {
    return DApp.initWeb3();
  },

  initWeb3: async function () {
    // TODO implementation code
  },

  updateAccounts: async function(accounts) {
    // TODO implementation code
  },

  initContract: async function() {
    // TODO implementation code
  },

  render: async function() {
    // TODO implementation code
  },

  renderVotes: async function() {
    // TODO implementation code
  },

  onVoteSubmitClick: async function(ev) {
    // TODO implementation code
  },
};
```

### 3.1. Initialise Web3

Let's implement the `DApp.initWeb3` function.
[Diff file for change](https://github.com/bguiz/workshop-rsk-full-stack-dapp/commit/ac22a27.diff).
It should now look like this:

```javascript
  initWeb3: async function () {
    if (typeof window.ethereum !== 'undefined') {
      // New web3 provider
      // As per EIP1102 and EIP1193
      // Ref: https://eips.ethereum.org/EIPS/eip-1102
      // Ref: https://eips.ethereum.org/EIPS/eip-1193
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        // Accounts now exposed, use them
        DApp.updateAccounts(accounts);

        // Opt out of refresh page on network change
        // Ref: https://docs.metamask.io/guide/ethereum-provider.html#properties
        ethereum.autoRefreshOnNetworkChange = false;

        // When user changes to another account,
        // trigger necessary updates within DApp
        window.ethereum.on('accountsChanged', DApp.updateAccounts);
      } catch (error) {
        // User denied account access
        console.error('User denied web3 access');
        return;
      }
      DApp.web3 = new Web3(window.ethereum);
    }
    else if (window.web3) {
      // Deprecated web3 provider
      DApp.web3 = new Web3(web3.currentProvider);
      // no need to ask for permission
    }
    // No web3 provider
    else {
      console.error('No web3 provider detected');
      return;
    }
    return DApp.initContract();
  },
```

This code takes the **Web3 provider** injected into the browser,
`window.ethereum`, and constructs a **Web3 instance** from it,
using the `web3.js` library.
Note that the process of doing this has changed relatively recently.
A more detailed explanation can be found in
[**How to init a DApp with web3.js using MetaMask 8**](https://dappsdev.org/blog/2020-10-05-how-to-init-a-dapp-with-web3-js-using-metamask-8/ "How to init a DApp with web3.js using MetaMask 8 in a manner that is compliant with both EIP1102 and EIP1193, and moves away from deprecated Web3 provider APIs - DApps Dev Club").

### 3.2. Update accounts

Let's implement the `DApp.updateAccounts` function.
[Diff file for change](https://github.com/bguiz/workshop-rsk-full-stack-dapp/commit/b8fcc15.diff).
It should now look like this:

```javascript
  updateAccounts: async function(accounts) {
    const firstUpdate = !(DApp.accounts && DApp.accounts[0]);
    DApp.accounts = accounts || await DApp.web3.eth.getAccounts();
    console.log('updateAccounts', accounts[0]);
    if (!firstUpdate) {
      DApp.render();
    }
  },
```

The user is free to change which account they wish to use to
interact with the DApp with at any time.
Each time they do so, the initialised **Web3 instance**
will emit an `accountsChanged` event.

> We have already set up the listener for this
> within `DApp.initWeb3` above:
>
> ```javascript
>         // When user changes to another account,
>         // trigger necessary updates within DApp
>         window.ethereum.on('accountsChanged', DApp.updateAccounts);
> ```

This `DApp.updateAccounts` is the function subscribed to that event.
What we're instructing it to do here is to re-render the DApp
each time the user switches accounts.
Note that we will implement `DApp.render` shortly.

### 3.3. Initialise smart contract

Let's implement the `DApp.initContract` function.
[Diff file for change](https://github.com/bguiz/workshop-rsk-full-stack-dapp/commit/e770236.diff).
It should now look like this:

```javascript
  initContract: async function() {
    let networkId = await DApp.web3.eth.net.getId();
    console.log('networkId', networkId);

    let deployedNetwork = electionArtefact.networks[networkId];
    if (!deployedNetwork) {
      console.error('No contract deployed on the network that you are connected. Please switch networks.');
      return;
    }
    console.log('deployedNetwork', deployedNetwork);

    DApp.contracts.Election = new DApp.web3.eth.Contract(
      electionArtefact.abi,
      deployedNetwork.address,
    );
    console.log('Election', DApp.contracts.Election);

    return DApp.render();
  },
```

> We have instructed this function to be called within
> `DApp.initWeb3` above, so it will be called as soon as we have
> a Web3 instance.
>
> ```javascript
>     return DApp.initContract();
> ```

This function detected which network we are connected to.

> Note that in this context you may see network ID and
> chain ID used interchangeably.

It subsequently checks if there is a contract deployed on this network -
according to the build artefacts -
then constructs a new **Web3 contract** instance.
This object, is stored as `DApp.contracts.Election`, and is important:
It is our primary conduit of interaction between
the front end Javascript application we're creating right now,
and the smart contract deployed and executed on the blockchain network.

### 3.4. Render main area

Let's implement the `DApp.render` function.
[Diff file for change](https://github.com/bguiz/workshop-rsk-full-stack-dapp/commit/ebc9407.diff).
It should now look like this:

```javascript
  render: async function() {
    const loader = document.querySelector('#loader');
    const content = document.querySelector('#content');
    utils.elShow(loader);
    utils.elHide(content);

    const voteEl = document.querySelector('#vote');
    voteEl.removeEventListener('click', DApp.onVoteSubmitClick);
    voteEl.addEventListener('click', DApp.onVoteSubmitClick);

    // Load account data
    document.querySelector('#account').textContent =
      `Your account ${ DApp.accounts[0] }`;

    return DApp.renderVotes();
  },
```

Here we're doing some basic set up such as toggling visibility
to hide the content area and show the spinner;
set up the event listener on the vote button;
and display the user account.

### 3.5. Render votes

Let's implement the `DApp.renderVotes` function.
[Diff file for change](https://github.com/bguiz/workshop-rsk-full-stack-dapp/commit/4a6862f.diff).
It should now look like this:

```javascript
  renderVotes: async function() {
    const electionInstance = DApp.contracts.Election;

    // Load contract data
    const candidatesCount = await electionInstance.methods.candidatesCount().call();
    const getCandidatePromises = [];
    for (let idx = 1; idx <= candidatesCount; ++idx) {
      getCandidatePromises.push(
        electionInstance.methods.candidates(idx).call(),
      );
    }
    const candidates = (await Promise.all(getCandidatePromises))
      .map(
        ({ id, name, voteCount }) => ({ id, name, voteCount }),
      );
    console.log(candidates);

    // Render live results
    utils.elHide(loader);
    utils.elShow(content);
    let candidateResultsHtml = '';
    let candidateSelectHtml = '';
    candidates.forEach((candidate) => {
      const { id, name, voteCount } = candidate;
      candidateResultsHtml +=
        `<tr><td>${id}</td><td>${name}</td><td>${voteCount}</td></tr>`;
      candidateSelectHtml +=
        `<option value="${id}">${name}</option>`;
    });
    const candidatesSelectEl =
      document.querySelector('#candidatesSelect');
    candidatesSelectEl.innerHTML = candidateSelectHtml;
    const candidateResultsEl =
      document.querySelector('#candidatesResults');
    candidateResultsEl.innerHTML = candidateResultsHtml;

    // Determine whether to display ballot to this account
    const currentAccountHasVoted =
      await electionInstance.methods
        .voters(DApp.accounts[0]).call();
    console.log('currentAccountHasVoted', currentAccountHasVoted);
    const ballotEl = document.querySelector('#ballot');
    if (currentAccountHasVoted) {
      utils.elHide(ballotEl);
    } else {
      utils.elShow(ballotEl);
    }
  },
```

This function is the most verbose one in the front end application,
as it does many things:

1. Queries the smart contract for the number of candidates:
   - `electionInstance.methods.candidatesCount().call()`
2. Queries the smart contract for details about each of the candidates:
   - `electionInstance.methods.candidates(idx).call()`
3. Constructs a HTML table to display the candidate data just retrieves.
4. Queries the smart contract for whether the current account has voted:
   - `electionInstance.methods.voters(DApp.accounts[0]).call()`
5. Toggles the visibility of the ballot (vote button),
   depending on whether the current account has voted.
   - The same account cannot vote more than once,
     and this is already enforced by the smart contract,
     so why display a "futile" option to the user in this DApp?
     Instead, we only show the vote button to a user
     when they are allowed to vote!

> You may be wondering why `DApp.render` and `DApp.renderVotes`
> have been split up into two separate functions.
> Why not simply do all the rendering in a single function.
> One can do that of course, but immediately after a vote is cast,
> there is no need to update the entire application,
> and instead we only need to update the area with the vote counts.
> If you are using a client-side framework,
> this is usually done opaquely within the framework itself.
> Since we aren't using a framework,
> it is up to the developer to decide which parts to render, and when.

### 3.6. Handle vote submissions

Let's implement the `DApp.onVoteSubmitClick` function.
[Diff file for change](https://github.com/bguiz/workshop-rsk-full-stack-dapp/commit/001623c.diff).
It should now look like this:

```javascript
  onVoteSubmitClick: async function(ev) {
    ev.preventDefault();

    const electionInstance = DApp.contracts.Election;
    const candidateId =
      document.querySelector('#candidatesSelect').value;
    try {
      const loader = document.querySelector('#loader');
      const content = document.querySelector('#content');
      utils.elShow(loader);
      utils.elHide(content);
      await electionInstance.methods
        .vote(candidateId).send({ from: DApp.accounts[0] });
    } catch (ex) {
      console.error(ex);
    }

    return DApp.renderVotes();
  },
};
```

> We have already set up the listener for this
> within `DApp.render` above:
>
> ```javascript
    voteEl.addEventListener('click', DApp.onVoteSubmitClick);
> ```

When the user clicks on the vote button, this function is called.
It obtains the candidate ID selected by the user,
and invoked the `vote` function on the smart contract:
`electionInstance.methods.vote(candidateId).send({ from: DApp.accounts[0] })`.

> Note that previously, our interactions with the smart contract
> were queries; those were read-only operations.
> Thus the function invocations were like:
> `electionInstance.methods.METHOD_NAME().call()`.
>
> Here, the interaction is a command (not a query);
> That is, it (potentially) modifies the state of the smart contract.
> Thus the function invocation is a different format:
> `electionInstance.methods.METHOD_NAME().send()`.
>
> Notice that we have `.call()` for queries,
> and `.send()` for commands.

### Completed version

We have completed the code for front end of our DApp!

View the [complete version of `client/dapps.js`](https://github.com/bguiz/workshop-rsk-full-stack-dapp/blob/feat/complete-a/client/dapp.js).

Next, let's run our DApp and interact with it in our browser!

## 4. Start the front end web server

Now we need to start a local web server to host our dApp.
The local web server is provided by the `webpack-dev-server` package that we defined in `package.json` earlier.

Open a new terminal in same project directory.

Enter the command below:

```shell
npm run dev
```

Output:

```shell
> workshop-rsk-full-stack-dapp@0.0.0 dev /Users/owanate/Documents/Projects/TutorialPractice/workshop-rsk-full-stack-dapp
> webpack-dev-server --config ./webpack.config.js --mode production --output ./dist/main.js

ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from /Users/owanate/Documents/Projects/TutorialPractice/workshop-rsk-full-stack-dapp/dist
```

## 4.1. Connect to Metamask

1. Configure [Rootstock Testnet](https://developers.rsk.co/wallet/use/metamask/)
   in your metamask wallet
2. Click on import using account seed phrase.
   ![Rootstock full stack dApp - Metamask](/assets/img/guides/complete-full-stack-dapp/Metamask.png)
3. Insert Mnemonic phrase generated in `.testnet.seed-phrse`.
   ![Rootstock full stack dApp - Metamask2](/assets/img/guides/complete-full-stack-dapp/MetamaskSeedPhrase.png)
4. Insert password
5. Click on Restore
   ![Rootstock full stack dApp - Metamask3](/assets/img/guides/complete-full-stack-dapp/MetamaskRestore.png)
6. View imported account with testnet funds
   ![Rootstock full stack dapp](/assets/img/guides/complete-full-stack-dapp/MetamaskTestFunds.png)

> Reload the browser to ensure the green button showing connected is active.

Congratulations👏👏!
The dApp can now communicate with the Rootstock network!!!

To view the dApp live, go to your browser, enter `localhost:8080`
into the address bar.
Try voting and adding other functions to the smart contract.

![Election dApp - gif](/assets/img/guides/complete-full-stack-dapp/full stack dApp on RSK.gif)

Thank you for completing the full stack dApp guide on Rootstock🤝!

View the entire code for the [Complete Full Stack dApp repo](https://github.com/bguiz/workshop-rsk-full-stack-dapp/tree/feat/complete-a)

## Further Reading

- [Solidity Documentation](https://solidity.readthedocs.io/en/v0.7.1/index.html)
- [Deploy A Smart Contract](https://developers.rsk.co/tutorials/deploy-smart-contracts/)
- [Create Your First Frontend](https://developers.rsk.co/tutorials/frontend/first-frontend-web3-injected/)

----

[Rootstock Github](https://github.com/rsksmart/devportal) |
[Contact us on our community Discord](https://rootstock.io/discord) 