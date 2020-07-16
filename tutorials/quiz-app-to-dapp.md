---
layout: rsk
title: "RSK Workshop: Quiz App to dApp"
tags: rsk, workshop, solidity,javascript, swarm
description: "App to dApp using RSK smart Contract and Swarm decentralize storage."
---
# App to dApp using RSK smart Contract and Swarm decentralize storage.

by Dev Advocate Dulce Villarreal


## Table of content

* [Pre-requisites](#Pre-requisites)
* [Objectives](#Objectives)
* [Run the app](#Run-the-app)
  * [Clone this repo](#Clone-this-repo)
  * [Install dependencies](#Install-dependencies)
  * [Run the project](#Run-the-project)
* [App to dApp](#App-to-dApp)
* [Run swarm](#Run-swarm)
  * [Getting the questions from swarm](#Getting-the-questions-from-swarm)
  * [Init truffle](#Init-truffle)
  * [Specify the soldity compiler version](#Specify-the-soldity-compiler-version)
  * [Create a contract](#Create-a-contract)
  * [Get the gas price](#Get-the-gas-price)
  * [Config truffle](#Config-truffle)
  * [Add the testnet rsk network](#Add-the-testnet-rsk-network)
  * [Run migrations](#Run-migrations)
* [Modify the front end](#Modify-the-front-end)
  * [Adding web3.js](#Adding-web3.js)
  * [Getting the questions Second part](#Getting-the-questions-Second-part)
  * [Modify the front end](#Modify-the-front-end)
  * [Last step!](#Last-step!)


## Pre-requisites or Set up

Before we begin,
you will need the following things set up on your system:

0. The basics

- Terminal:
- A [POSIX](https://en.wikipedia.org/wiki/POSIX)-compliant terminal
  - Recommended option for Linux/ Mac: Default/ built in terminal. I'm using ["Oh My ZSH!"](https://ohmyz.sh/)
  - Recommended option for Windows: [Git Bash](https://gitforwindows.org/) Here's a [great tutorial](https://www.atlassian.com/git/tutorials/git-bash) on installing and using Git Bash.
- [`git`](https://git-scm.com/)
- [`curl`](https://curl.haxx.se/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [NodeJs](https://nodejs.org/en/)
  - optional, only needed to preview site using a centralised HTTP server
  - Recommended install method for Linux/ Mac: [`nvm`](https://github.com/nvm-sh/nvm)
  - Recommended install method for Windows: [Official installer](https://nodejs.org/en/)

1. Install wallet browser
  1.1 [Nifty Chrome extension](https://chrome.google.com/webstore/detail/nifty-wallet/jbdaocneiiinmjbjlgalhcelgbejmnid?hl=en) 
  1.2 [Metamask instructions](https://developers.rsk.co/tutorials/ethereum-devs/remix-and-metamask-with-rsk-testnet/)

2. Get some tokens in the [RSK faucet](https://faucet.rsk.co/)


3. Truffle.

To install truffle, enter the following commands in your terminal;

```bash=
$ npm install -g truffle
```

4. Install an add-on to enable CORS.
- In Mozilla use [Cors Everywhere](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/)
- In Chrome use [Allow CORS](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)

5. Swarm

## Installing Swarm

The easiest way to install Swarm is via its pre-compiled releases.
There are also instructions for
[compiling the source yourself instead](https://developers.rsk.co/rif/storage/providers/swarm/install/).

Visit [swarm.ethereum.org/downloads](https://swarm.ethereum.org/downloads/)
and select the appropriate package to install for your system.
This page should automatically select and highlight the right one for you (in bold).

Example commands on Linux.

```shell
curl https://ethswarm.blob.core.windows.net/builds/swarm-linux-amd64-0.5.7-5ccfd995.tar.gz > swarm-linux-amd64-0.5.7-5ccfd995.tar.gz
tar -zxvf swarm-linux-amd64-0.5.7-5ccfd995.tar.gz
mkdir -p ${HOME}/swarm/bin
mv swarm-linux-amd64-0.5.7-5ccfd995/swarm ${HOME}/swarm/bin
echo 'export PATH=$PATH:${HOME}/swarm/bin' >> ~/.zshrc
```
If you have bashrc terminal you must remplace ~/.zshrc for ~/.bashrc. 

Mac OSX or Windows (with a POSIX-compliant shell such as git bash)
should be pretty similar.

Close this shell and open up a new one,
as we'll need the updated `PATH` environment variable.

Let's check that we have got a working binary.

```shell
swarm version
```

```text
Swarm
Version: 0.5.8-unstable
Git Commit: 6faff7fcb6f25c706e75d8d3c8945c4231663b93
Go Version: go1.14.3
OS: linux

```

Next, let's start swarm.

```shell
swarm
```

```text
INFO [05-19|15:03:36.058] Maximum peer count                       ETH=50 LES=0 total=50
INFO [05-19|15:03:36.059] You don't have an account yet. Creating one...
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Unlocking swarm account 0xD1bCFFf13f996247d8A84a37bC7b32436B40c62F [1/3]
Passphrase:
```

> Note that Swarm is a service which uses peer to peer networking.
> Your computer is one node of many connected to this same network,
> and talking to this same protocol.
> Therefore, the very first time that you start up Swarm on your computer,
> you will be prompted to create an account,
> which will be used to uniquely identify this particular node -
> that is what the password is for.

```text
INFO [05-19|15:03:53.009] Starting peer-to-peer node               instance=swarm/v0.5.8-6faff7fc/linux-amd64/go1.14.3
INFO [05-19|15:03:53.065] New local node record                    seq=1 id=0f1272cb73bcf1ba ip=127.0.0.1 udp=30399 tcp=30399
INFO [05-19|15:03:53.065] Updated bzz local addr                   oaddr=5c31b4c2924e4689554b80893c663833de5852b32f090969860739dbdb1a69c0 uaddr=enode://d18081c0f7bf09c021d519e0d8351473def7a408820bffabc62bf2e878fd2ff84df3b46407ab347d632dfbec4f13cd7635ea2ee4c8fdace17c442ae032615d48@127.0.0.1:30399
INFO [05-19|15:03:53.065] Starting bzz service
INFO [05-19|15:03:53.065] Starting hive                            baseaddr=5c31b4c2
INFO [05-19|15:03:53.066] Detected an existing store. trying to load peers
INFO [05-19|15:03:53.066] hive 5c31b4c2: no persisted peers found
INFO [05-19|15:03:53.066] Swarm network started                    bzzaddr=5c31b4c2924e4689554b80893c663833de5852b32f090969860739dbdb1a69c0
INFO [05-19|15:03:53.066] bzzeth starting...
INFO [05-19|15:03:53.066] Starting outbox
INFO [05-19|15:03:53.066] Started P2P networking                   self=enode://d18081c0f7bf09c021d519e0d8351473def7a408820bffabc62bf2e878fd2ff84df3b46407ab347d632dfbec4f13cd7635ea2ee4c8fdace17c442ae032615d48@127.0.0.1:30399
INFO [05-19|15:03:53.066] Started Pss
INFO [05-19|15:03:53.066] Loaded EC keys                           pubkey=04fbdbfa2ee4034122e076512e390f8348cf1d2dd3a249f8f49ff5178e917cd18dccfc42cea2a2e906f25d7cb88b61b205a73b0bb2b07d43de0ca6c2708a0dc058 secp256=02fbdbfa2ee4034122e076512e390f8348cf1d2dd3a249f8f49ff5178e917cd18d
INFO [05-19|15:03:53.066] starting bzz-retrieve
INFO [05-19|15:03:53.066] Starting Swarm HTTP proxy                port=8500
INFO [05-19|15:03:53.068] Mapped network port                      proto=tcp extport=30399 intport=30399 interface=NAT-PMP(192.168.50.1)
INFO [05-19|15:03:53.069] IPC endpoint opened                      url=/home/bguiz/.ethereum/bzzd.ipc
INFO [05-19|15:03:53.070] Mapped network port                      proto=udp extport=30399 intport=30399 interface=NAT-PMP(192.168.50.1)
INFO [05-19|15:03:53.248] New local node record                    seq=2 id=0f1272cb73bcf1ba ip=172.23.144.94 udp=30399 tcp=30399
ERROR[05-19|15:04:06.517] batch has timed out                      peer=3de6224e3c9c430f:656e6f64653a2f2f ruid=3716585580
```

Now visit [http://localhost:8500](http://localhost:8500) and you will see a web user interface
for downloading and uploading files.
Have a play around with this if you like,
otherwise jump back into your terminal.

You should see output similar to this related to serving up the front end.

```text
INFO [05-19|15:08:08.421] created ruid for request                 ruid=ffcc6158   method=GET url=/
INFO [05-19|15:08:08.421] respondHTML                              ruid=ffcc6158   code=200
INFO [05-19|15:08:08.422] request served                           ruid=ffcc6158   code=200 time=570.234µs
INFO [05-19|15:08:08.453] created ruid for request                 ruid=d89959fa   method=GET url=/favicon.ico
INFO [05-19|15:08:08.453] request served                           ruid=d89959fa   code=200 time=41.936µs
```






## Objectives

- Use your JS portfolio to create a web3 and blockchain portafolio by reusing old apps and transforming to dApps.
- Learn smart contracts and decentralize storage.
- Create a fun dApp.



## Run the app

In order to run the simple JS app, follow the next instructions:

### Clone repo

Clone this repo, using the commands below;

```bash=
$ git clone https://github.com/rsksmart/quiz-dapp
$ cd quiz-dapp
```

### Install dependencies

```bash=
$ npm install
```

### Run the project

```bash=
$ npm run start
```

It should open a new tab in your browser.

Note the questions are stored in the `questions.json` file.

### Secuence diagram

![Diagrama de secuencia](/images/secuenceDiagram.png?raw=true)

## App to dApp

It's time to convert your simple plain JS app to an dApp!


### Run swarm

Run swarm in a new terminal and don't close it.

```bash=
$ swarm
```

Open a new terminal and upload your questions to swarm decentralized storage. When completed, swarm returns a hash.

```bash=
$ cd js
$ swarm --defaultpath questions.json up questions.json

# 54347e7150fdfa881f56d9845976b6d541930e60a16d6f5cd6877a6c3df31827
```

Copy the hash returned and get the file info:

```bash=
$ curl -s http://localhost:8500/bzz-raw:/54347e7150fdfa881f56d9845976b6d541930e60a16d6f5cd6877a6c3df31827 | jq

{
  "entries": [
    {
      "hash": "809b82283b3d0c3459fde4340ecb6a7a297b1d25e6cab6084d21257ba29e82c2",
      "contentType": "application/json",
      "mode": 436,
      "size": 2014,
      "mod_time": "2020-06-23T03:40:25-05:00"
    }
  ]
}

```

You can verify the file content by sending a request to this new hash

```bash=
curl -s http://localhost:8500/bzz-raw:/809b82283b3d0c3459fde4340ecb6a7a297b1d25e6cab6084d21257ba29e82c2 | jq

{
  "questions": [
    {
      "id": 1,
      "question": " ...? ",
      "nextId": 2,
      "previousId": null,
      
      ...
```

### Get the questions from swarm

**Important:** You need to get CORS disabled!

Add the new data source in `app.js`:

Before:

```javascript=
mounted: () {
    axios.get('js/questions.json')
    ...
}

```

After: 

```javascript=
mounted: () {
    axios.get('http://localhost:8500/bzz-raw:/809b82283b3d0c3459fde4340ecb6a7a297b1d25e6cab6084d21257ba29e82c2')
}

```

Your data source is not static anymore. Your quiz application is now loading its data from a  decentralised file store. 
**Congratulations, your app is on its way to becoming a DApp!**

### Initialize truffle

Change your directory and initialize truffle using the commands below;

```bash=
$ cd ..
$ truffle init
```

It will create the `contract` folder, `migrations`, and `truffle-config.js` file.

Note: if you don't have truffle installed, you can install it using the command below:

```bash=
$ npm install -g truffle
```

### Specify the solidity compiler version

In the `truffle-config.js` file, in the `compilers` section, we need to change the solidity compiler version

```javascript=
compilers: {
    solc: {
      version: "^0.4.14",    // Just change this line
    }
  }
```

### Create a contract

In the `contracts` folder, create a new file named `Quiz.sol`.

Copy and paste the following code in your editor:

```
pragma solidity ^0.4.14;

contract Quiz {
    address public owner;
    uint8[4] rightAnswers = [2, 3, 1, 4];
    address[] public players;
    uint8[] public playerHits;
    string public questions;

    event AnswerEvent(uint8 hitsCounter);

    constructor() public {
        owner = msg.sender;
    }

    function getPlayerHits() public view returns (uint8[] memory) {
        return playerHits;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function answerQuestions (uint8[] playerAnswers) public returns (uint8) {
        uint8 hits;

        for (uint i = 0; i < playerAnswers.length; i++) {
            if (playerAnswers[i] == rightAnswers[i]) {
                hits++;
            }
        }
        players.push(msg.sender);
        playerHits.push(hits);

        emit AnswerEvent(hits);

        return hits;
    }
}

```

Now, in the terminal run the `compile` command

```bash=
truffle compile
```

### Get the gas price

Get and save the gas price from `testnet`:

```bash=
$ curl https://public-node.testnet.rsk.co/2.0.1/ -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' > .gas-price-testnet.json

$ ls -al 
```

This command will create a new file named `.gas-price-testnet.json` with the gas price from `testnet` and can be verified with the command `ls -al`


### Config truffle

Install the Wallet Provider and `dotenv` dependency:

```bash=
npm install @truffle/hdwallet-provider dotenv --save
```

Create a new file named `.env` in the root directory of your project and write your mnemonic on it.

```bash=
$ touch .env
```

```
A_MNEMONIC='your twelve words mnemonic ...' 
```

Remember: Don't share or deploy your mnemonic never!

You should add the `.env` file to your `.gitignore` file.

```bash=
echo ".env" >> .gitignore
```

Open your `truffle-config.js` file and add the following lines at the beginning of the file:

```javascript=
const fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

const A_MNEMONIC = process.env.A_MNEMONIC;

const gasPriceTestnetRaw = fs.readFileSync(".gas-price-testnet.json").toString().trim();
const gasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result, 16);
if (typeof gasPriceTestnet !== 'number' || isNaN(gasPriceTestnet)) {
  throw new Error('unable to retrieve network gas price from .gas-price-testnet.json');
}

console.log(gasPriceTestnet);
```


### Add the testnet rsk network

In the same `truffle-config.js` in the `networks` section, add the testnet configuration:

```javascript=
testnet: {
      provider: () => new HDWalletProvider(A_MNEMONIC, 'https://public-node.testnet.rsk.co/2.0.1/'),
      network_id: 31,
      gasPrice: Math.floor(gasPriceTestnet * 1.1),
      networkCheckTimeout: 1e9
    },
```

You can test your connection by running the following commands in your terminal

```bash=
$ truffle console --network testnet
65000000
truffle(testnet)> 
```

### Run migrations

Add a new file named `2_deploy_contracts.js`.
```bash=
$ touch migrations/2_deploy_contracts.js
```

Then open `2_deploy_contracts.js` and write the following code:

```javascript=
var Quiz = artifacts.require('Quiz');

module.exports = function (deployer) {
  deployer.deploy(Quiz)
}

```

Run the migrations:

If you are in the truffle console then just write `migrate`:

```bash=
truffle(testnet)> migrate
```
Otherwise 

```bash=
$ truffle migrate --network testnet
```

### Result of migrations

You should see something similar to the following output in your terminal.

```bash=
$ truffle(testnet)> migrate

Compiling your contracts...
===========================
✔ Fetching solc version list from solc-bin. Attempt #1
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/Quiz.sol
✔ Fetching solc version list from solc-bin. Attempt #1
> Artifacts written to /home/dulce/dev/rsk/appjs2dapp-workshop-rsk-dulce/build/contracts
> Compiled successfully using:
   - solc: 0.4.26+commit.4563c3fc.Emscripten.clang

Starting migrations...
======================
> Network name:    'testnet'
> Network id:      31
> Block gas limit: 6800000 (0x67c280)

1_initial_migration.js
======================
   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x544c68d0a8b13d6a2471a3baa8c5358c052475749c183a79ac04d34913b8b7a5
   > Blocks: 0            Seconds: 21
   > contract address:    0x9BD85b119C9F0b491ef3D1AbD8d99C4C360896f3
   > block number:        957437
   > block timestamp:     1592959920
   > account:             0x8FCC0638F6F20cE2C468c7a7a2eA84b1cf6Cb1eE
   > balance:             2.750087998627249784
   > gas used:            196887 (0x30117)
   > gas price:           0.0715 gwei
   > value sent:          0 ETH
   > total cost:          0.0000140774205 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.0000140774205 ETH

2_deploy_contracts.js
=====================
   Deploying 'Quiz'
   ----------------
   > transaction hash:    0xb8b6917afe56551b0ba2b0e937b574c21ddbf7cdc4662101100e21d6db847922
   > Blocks: 1            Seconds: 39
   > contract address:    0xF9F201aE6e34d8B4CC60f998413a161eF5FE65AF
   > block number:        957440
   > block timestamp:     1592960035
   > account:             0x8FCC0638F6F20cE2C468c7a7a2eA84b1cf6Cb1eE
   > balance:             2.750029175577249784
   > gas used:            780714 (0xbe9aa)
   > gas price:           0.0715 gwei
   > value sent:          0 ETH
   > total cost:          0.000055821051 ETH

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:      0.000055821051 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.0000698984715 ETH
```

Exit from truffle console with `Ctrl + C` or typing `.exit`


## Modify the front end

### Adding web3.js

In `index.html`, before the rest of the scripts, we are going to add the following:
Generally all the scripts are included in the open and closed tag`</body>`

```htmlembedded=
<script src="js/truffle-contract.js"></script> 
```

Then, include the `web3` CDN just before the `js/app.js` script tag

```htmlembedded=
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
<script src="js/app.js"></script>
```

The order of the scripts will be:

1. `truffle-contract.js` <- truffle contracts library
2. `vue.js` <- Vue CDN library
3. `bulma-steps.min.js` <- Bulma steps (used to render the questions in a step by step form).
4. `axios.min.js` <- The axios library. (used to get the questions data from DS).
5. `web3.min.js` <- Web3 library
6. `app.js` <- our app script

```htmlmixed=
<script src="js/truffle-contract.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bulma-steps@2.2.1/dist/js/bulma-steps.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
  <script src="js/app.js"></script>
```

### Replace mounted method content

In the `app.js` file, clear the `mounted` method and add this new lines:

```javascript=
mounted () {
    this.initWeb3()
      .then(() => {
        console.log('App initialized')
      })
},
```

### Replace the method section

Replace the `method` section

```javascript=
methods: {
    // get the questions from swarm !!!
    async initWeb3() {
      await axios.get('http://localhost:8500/bzz-raw:/07f1112168025f4c309b652fb364b9ea126728e7b0959338b0bf9f5187d474d0')
        .then(response => {
          this.questions = response.data.questions
        })

      if (window.ethereum) {
        this.web3Provider = window.ethereum
        try {
          // request account access
          await window.ethereum.enable()
        } catch (error) {
          console.error("user denied account access")
        }
      } else if (window.web3) {
        this.web3Provider = window.web3.currentProvider
      } else {
        this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
      }
      // Inicialized web3 !!!
      web3 = new Web3(this.web3Provider)

      return this.initContract()
    },
    //Load the compiled contract information -> Quiz.json
    initContract: function (params) {
      return axios.get('../build/contracts/Quiz.json')
        .then(response => {
          const QuizArtifact = response.data
          this.contracts.Quiz = TruffleContract(QuizArtifact)
          // Set the provider for our contract
          this.contracts.Quiz.setProvider(this.web3Provider)
        })
    },
    selectOption: function (evt) {
      if (evt) {
        document.querySelectorAll('div.answer').forEach(element => {
          element.classList.remove('answer') // disable css hover effect
        })
        const element = evt.target
        const answer = element.dataset.i + 1
        const index =  parseInt(element.dataset.index) + 1
        
        const question = this.getQuestion(index)
        this.answers.push(answer)

        this.counter++

        if (this.counter === this.questions.length) {
          // show modal and return
          document.querySelector('div.modal').classList.add('is-active')
        }

        setTimeout(function () {
          // trigger click event on <a> next button
          document.querySelector('a[data-nav="next"]').click()
          document.querySelectorAll('div.option-box').forEach(element => {
            element.classList.add('answer') // enable css hover effect
          })
        }, 500) // Wait one second after answer each question.
      }
    },
    sendQuestions: function () {
      const contract = this.contracts.Quiz
      web3.eth.getAccounts((error, accounts) => {
        if (error) {
          console.error(error)
        }

        const account = accounts[0]

        this.contracts.Quiz.deployed()
          .then(instance => {
            const quizInstance = instance

            return quizInstance.answerQuestions(this.answers, { from: account })
          })
          .then(result => {
            document.querySelector('div.modal').classList.remove('is-active')
          })
          .catch(err => {
            console.error(err)
          })
        
        
      })
    },
    //method that return the question by index
    getQuestion: function (index) {
      for (let i = 0; i < this.questions.length; i++) {
        if (index === this.questions[i].id) {
          return this.questions[i]
        }
      }
      return false
    }
  }
```
 
 
 # Last step!
 
Now reload your app in a browser, and interact with it.

## Congratulations, your app is not interacting with a smart contract, and your app is decentralised!