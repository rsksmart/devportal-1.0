---
menu_title: Deploy Smart Contracts
layout: rsk
title: Deploy Smart Contracts using Truffle & Granache | Rootstock (RSK)
description: "Learn how to develop and deploy smart contracts in RSK"
tags: rif, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

<style>
  img.deploy-smart-contract-img{
    margin:0 auto;
    width: 80%;
  }
</style>

## Developing Smart Contracts in RSK

### 1. Prepare the environment

* Install Solidity compile from [this link](https://solidity.readthedocs.io/en/develop/#available-solidity-integrations).
* Install Truffle and Ganache [here](https://www.trufflesuite.com/).

### 2. Introduce usage of the truffle

Truffle is a development environment, testing framework and asset pipeline for blockchains. In this step we are going to learn the basics.

Using Truffle, we can compile Solidity Smart Contracts, deploy them to a blockchain using JavaScript, create a JavaScript test suite and interact with the contracts through the integrated console.

```shell
truffle init # Creates an empty truffle project
truffle unbox package # Clones an existing Truffle packaged project
truffle develop # Starts truffle in-memory blockchain
truffle compile # Compiles Smart Contracts
truffle migrate # Deploys Smart Contracts to the configured blockchain
truffle console # Starts a web3 console
```

### 3. Create a new Truffle project

* Create a new folder 
  ```shell
  mkdir simple-storage
  cd simple-storage
  ```
* Initialize a Truffle project.
  ```shell
  truffle init
  ```

If you see the following result on the terminal, this step is successful.

```shell
✔ Preparing to download
✔ Downloading
✔ Cleaning up temporary files
✔ Setting up box

Unbox successful. Sweet!

Commands:

  Compile:        truffle compile
  Migrate:        truffle migrate
  Test contracts: truffle test
```

You will see the following initial folders and files:

![Truffle Init](/assets/img/kb/deploy-smart-contract/deploy-smart-contract1.png)

* **./contracts:** All our smart contracts will be stored in this folder.
* **./migrations:** Deployment scripts will be stored in this folder.
* **./test:** Test scripts will be stored in this folder.
* **./truffle-config:** This is Truffle’s configuration file. We’ll be able to configure networks to interact with here.

### 4. Run a blockchain locally

```shell
truffle develop
```

You can see a list of available accounts that are already created and ready to use; you can also see the port (9545) where the blockchain is running. This is an in-memory blockchain, which means that no other peers are going to connect and interact with it automatically. It's just for testing purposes.

```shell
Truffle Develop started at http://127.0.0.1:9545/

Accounts:
(0) 0x3519d79c362a02edcbe4d7f13187c1fee774d934
(1) 0xdeab7981aeb00f1397565fb8282b9a4cdc0e49cb
(2) 0xc0c660c7e87687c18c6a61b7d322b3e3292a8c87
(3) 0x55095c5ad2bddbab818a4d19d49a853f88188e01
(4) 0x3beb95ceac255c44e5232ae9675739af4d37a5df
(5) 0xb80059fb40e75d72187233bb211ded0a6faee604
(6) 0x6db162131720f31323df82d53facc72a1300a671
(7) 0x086ac009443380c960bcfc1acc7abefca8d61aa8
(8) 0xf1472c9b9c67f8ebbe36dc7a64a8a977baf07f1f
(9) 0x52c1467bfbf645a51b8b33095287d11f48040e61

Private Keys:
(0) 3e4aa5d7d14a7da9c65d1d943d3776a90fd4bb03eb324ce5bc351391e42c4943
(1) 3e8c77ba2be0518be7533aafab65a20cc206ee24b78e13102dc25b3617b29605
(2) cf3f4429f95203831200e8ca1690b98f333740e72444a70cc56def1aa6a29d79
(3) 3748d0f6d9a02bef510e37e9a93479e83126dde1a508b3e3888eaf75979c5d34
(4) 26770e83b224ccfb98b7105000460b08c4e9815b2e8c625b7b3fd5b66c45ac17
(5) 730a4663999e8c2c632890ec05d799caf7ee2588ea70b9314e52d1357442ec7b
(6) ca80bad8a8b8ffb6dbb7c7a238582ab6a50b4f52d5dd3f8411e87135492e9fb1
(7) b981983317e708ff8efba2bbde7cf94ec63ff9ef52913cb8a4b20bcaa5b17c07
(8) efc7639193993509f69af6aea0f85ab0e91e628df2bbdec860a8fbcfb51fbab5
(9) 83936481d2e2231f143171ab03f839ea0a7c16cd84d5c43c6ac53b2e1a58f77b

Mnemonic: confirm era sheriff slice demand situate walk option winter open penalty light

⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
Ensure you do not use it on production blockchains, or else you risk losing funds.
```

> **Do not close this console! All data is deleted when closed!**

To connect to a blockchain network we should configure Truffle to use our node RPC endpoint. We are going to do this later.

### 5. Create your first contract

In VSCode create a file named `SimpleStorage.sol` under the contracts folder:

Now, you can see the new SimpleStorage.sol file in the contracts folder:

![SimpleStorage.sol](/assets/img/kb/deploy-smart-contract/deploy-smart-contract2.png)

Enter the following code below into the `SimpleStorage.sol` file just created:

```solidity
pragma solidity ^0.5.0;

contract SimpleStorage {
    address private deployer;
    uint private storedData;

    constructor() public {
        deployer = msg.sender;
    }

    function set(uint n) public {
        if(msg.sender == deployer)
            storedData = n;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
```

### 6. Deploy it to the blockchain

Now, we must include the contract in the deployment scripts. These scripts are found in the Migrations folder.

Then we create a new migration file in the Migrations folder. We can name it 2_simple_storage.js. 

We write these codes as below:

```javascript
var SimpleStorage = artifacts.require("./contracts/SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
```

These deployment JavaScript files are run to deploy contracts once they are compiled.

To compile the contracts, in the Truffle console, run this command:

```shell
truffle(develop)> compile
```

```shell
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SimpleStorage.sol
> Artifacts written to /Users/${user}/Documents/Projects/RSK/TutorialPractice/simple-storage/build/contracts
> Compiled successfully using:
   - solc: 0.5.12+commit.7709ece9.Emscripten.clang

truffle(develop)> 
```

Solidity compiler compiles all .sol files in the contracts folder in the project. This compilation is saved in .json files in the build folder. Have a look at this file. We can find a field called bytecode. This bytecode is the data that will be stored in the blockchain and it's the contract program.

Finally, we are going to deploy our contracts to our local network:

```shell
truffle(develop)> migrate
```

Terminal will output some details as below:

```shell
2_simple_storage.js
===================

   Deploying 'SimpleStorage'
   -------------------------
   > transaction hash:    0x960ac7ad822ee59a9ec1dfbd0ee2b4b2fabf680811a948cd38f1a254cff16717
   > Blocks: 0            Seconds: 0
   > contract address:    0x91497Ae01bB0aF42c55865C539C36570d2b798De
   > block number:        3
   > block timestamp:     1591264008
   > account:             0x3519D79C362a02EDcBe4D7F13187c1FEE774D934
   > balance:             99.99229186
   > gas used:            154923
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00309846 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00309846 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.00686812 ETH


truffle(develop)> compile

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

```

Now, our smart contract is in the blockchain!

### 7.Interact with smart contracts

The Truffle console is a basic JavaScript pipeline that implements most  simple blockchain development functionalities.

Let's get an instance of our contract! In migrations, we defined a name for our contract instance: **SimpleStorage**. This name is the one declared in Migrations. We are going to get this instance and interact with it.

1. Get an instance of the SimpleStorage contract.
  ```shell
  truffle(develop)> var SimpleStorage
  undefined
  truffle(develop)> SimpleStorage.deployed().then(instance => simpleStorage = instance)
  ```
  Now simpleStorage variable contains an instance of the previously deployed contract:

2. Call the `get()` method to get the storage in the contract.
  ```shell
  truffle(develop)> (await simpleStorage.get()).toNumber()
  # This method does not modify the storage of the contract, so no funds are spent calling it.
  ```
3. Now we are going to modify the storage. To modify a contract's storage we must pay with gas. This gas is discounted from the account balance.
  ```shell
  truffle(develop)> simpleStorage.set(10)
  ```
  Have a look at the response.
  ```javascript
  truffle(develop)> simpleStorage.set(10)
  {
  tx: '0x162bed0f69474e6940000766cedda227b9dd71daef6a5783c4473bfdab64b2c3',
  receipt: {
    transactionHash: '0x162bed0f69474e6940000766cedda227b9dd71daef6a5783c4473bfdab64b2c3',
    transactionIndex: 0,
    blockHash: '0x8b83f278937688af41e4301bbce2a90c777669e09094862b9cabb83e25e3ffad',
    blockNumber: 5,
    from: '0x3519d79c362a02edcbe4d7f13187c1fee774d934',
    to: '0x91497ae01bb0af42c55865c539c36570d2b798de',
    gasUsed: 41957,
    cumulativeGasUsed: 41957,
    contractAddress: null,
    logs: [],
    status: true,
    logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    v: '0x1c',
    r: '0x4ff960dbfea8e031bf05c1410b953720a8c038a9e3d6d4c6887765384d5084be',
    s: '0x43d6133578698508d4adceef9976a2affd0e9c0f7a8b7061bdb40f4c810f2236',
    rawLogs: []
  },
  logs: []
}
  ```
  The transaction generates a receipt. This is the data the blockchain generates to a transaction.

4. To confirm that it was executed, we can run Step 2 again and see that the storage has changed.

### 8. Smart contract on RSK

#### 8.1 Get an RSK account

> To create our wallet we are going to use this web app: [https://iancoleman.io/bip39/](https://iancoleman.io/bip39/). **This may not be used for any 'real' wallet; it's not a secure way to generate a private key!** We are going to use it just for learning the basics.

1. In the 'Generate a random mnemonic' field, we select 12 words and generate it. 
2. Then tap on 'Generate'. 
3. The result appears in the BIP39 Mnemonic field. They should be 12 random words like the words in the image:

![Generate Random Mnemonic](/assets/img/kb/deploy-smart-contract/deploy-smart-contract3.png)

#### 8.2 Create a .secret file

In the terminal, inside the project folder, create a file named `.secret`.

Do you remember your mnemonic? Paste your mnemonic in this file and save it.

#### 8.3 Connect Truffle to RSK public network

> To connect to RSK, we are going to modify the Truffle configuration. We are going to use a provider that allows us to connect to any network but unlocking an account locally. We are going to use [@truffle/hdwallet-provider](https://github.com/trufflesuite/truffle-hdwallet-provider).(Node >= 7.6)

```shell
npm install @truffle/hdwallet-provider
```

> Open truffle-config.js file in your Truffle project and overwrite it with the following code:

```javascript
const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
if (!mnemonic || mnemonic.split(' ').length !== 12) {
  throw new Error('unable to retrieve mnemonic from .secret');
}

module.exports = {
  networks: {
  },
  compilers: {
    solc: {
    }
  }
}
```

The **hdwallet-provider** allows us to connect to any network by unlocking an account locally, including the RSK networks.

Also we are loading the mnemonic stored in file .secret, and saving it at variable mnemonic.

#### Configure Truffle to connect to RSK Testnet node

In the truffle-config.js file, include this configuration at network section:

```javascript
development: {
      host: "127.0.0.1",
      port: 4444,
      network_id: "*"
    },
```

#### Get the Current Gas Price of testnet
Get the current gas price of the testnet network, and save to .gas-price-testnet.json.

In your project folder, run this cURL command:

```terminal
curl https://public-node.testnet.rsk.co/ -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}' > .gas-price-testnet.json
```

You should receive a response similar to the following in the file:

```terminal
{"jsonrpc":"2.0","id":1,"result":"0x3c14dc3"}
```

The result value is presented in hexadecimal.

Modify the truffle-config file again to use the updated gas price. After mnemonic part, include this:

```javascript
const gasPriceTestnetRaw = fs.readFileSync(".gas-price-testnet.json").toString().trim();
const gasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result, 16);
if (typeof gasPriceTestnet !== 'number' || isNaN(gasPriceTestnet)) {
  throw new Error('unable to retrieve network gas price from .gas-price-testnet.json');
}
console.log("Gas price Testnet: " + gasPriceTestnet);
```

#### Configure truffle to connect to RSK Testnet
In the `truffle-config.js` file, include this configuration at network section:

```javascript
testnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://public-node.testnet.rsk.co/'),
      network_id: 31,
      gasPrice: Math.floor(gasPriceTestnet * 1.1),
      networkCheckTimeout: 1e9
    },
```

#### Truffle config with local and testnet RSK networks
This is the final `truffle-config.js` file with configurations for both networks:

```javascript
const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
if (!mnemonic || mnemonic.split(' ').length !== 12) {
  throw new Error('unable to retrieve mnemonic from .secret');
}

const gasPriceTestnetRaw = fs.readFileSync(".gas-price-testnet.json").toString().trim();
const gasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result, 16);
if (typeof gasPriceTestnet !== 'number' || isNaN(gasPriceTestnet)) {
  throw new Error('unable to retrieve network gas price from .gas-price-testnet.json');
}
console.log("Gas price Testnet: " + gasPriceTestnet);

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 4444,
      network_id: "*"
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://public-node.testnet.rsk.co/'),
      network_id: 31,
      gasPrice: Math.floor(gasPriceTestnet * 1.1),
      networkCheckTimeout: 1e9
    },
  },
  compilers: {
    solc: {
    }
  }
}
```


To check our connection let's open a Truffle console:

```shell
truffle console --network testnet
# Gas price Testnet: 63000003
```
Next, enter the following command in the truffle testnet console:

```shell
truffle(testnet)> web3.eth.getBlockNumber((err,res)=>console.log(res))
# 904502
# 904502
```

> Why not `web3.eth.blockNumber`? When we use providers to connect to a node, we must do it asynchronously!
Do not close this console. We are going to use it in the next steps.

#### 8.4 Get funds on RSK account

> What is our address? Let's type this in our console to know what address was unlocked with our mnemonic:

```shell
truffle(testnet)> web3.currentProvider.wallets
```

> Output:

```javascript
{
  '0x6c9959b1614dce487d47c08ecae21532fcd595dc': Wallet {
    _privKey: <Buffer 8c 99 02 5f d4 8a df b9 2e 54 0b 36 6d 82 24 39 6e 64 9f ec b5 9d 1b bb 56 f2 6f 82 3f 53 a0 6a>,
    _pubKey: <Buffer 4a ae 9b e0 33 51 1d 0a 08 ce ef 6a 1d 6f 9d 79 ae ca d0 3f 88 60 fb 75 63 34 ce c2 88 3d 6a 5a 81 80 f3 2e a5 8f 1a 28 35 7e c9 18 30 c9 c5 ad 6e 9c ... 14 more bytes>
  },
  '0x204de62d571320fbeb786e4d700ed97e714b9814': Wallet {
    _privKey: <Buffer c7 54 4f 99 e7 f5 ce 24 05 c4 a7 ef 6c f3 96 15 50 db 2c 4c 53 da 9b b8 77 3e d5 c2 78 5f 7b a6>,
    _pubKey: <Buffer 96 e7 90 bc bb 29 20 6d da fa d2 53 9c 6e 8a 40 28 4a 8a a4 04 6e 02 df 3f 98 02 cc 7c d6 0e 3a 1c 79 89 1d 18 61 33 04 41 a8 ed 5a a7 73 6a 88 ad 68 ... 14 more bytes>}}
```

> The previously mentioned configuration having been used, only one wallet should be available. Let's save it in a variable in our console. We are going to use it soon.

```shell
truffle(testnet)> var account = Object.keys(web3.currentProvider.wallets)[0]
undefined
truffle(testnet)> account
'0x6c9959b1614dce487d47c08ecae21532fcd595dc'
```

> We mentioned before that RSK Testnet is a free network. To get funds to use in this network, we are going to use a faucet. A faucet is commonly a site where you enter your address and it automatically sends you some testnet funds for testing. Let's go to RSK Faucet: [https://faucet.testnet.rsk.co](https://faucet.testnet.rsk.co).

![Faucet Image](/assets/img/kb/deploy-smart-contract/deploy-smart-contracts.png)

> Steps of usage:

1. Enter the address we got earlier 
2. Enter the Enter check code 
3. Submit form

![Get Test RBTCs](/assets/img/kb/deploy-smart-contract/deploy-smart-contracts-1.png)

> Congratulations, you've got the balance for testing.

![Test RBTCs](/assets/img/kb/deploy-smart-contract/deploy-smart-contract6.png)

> Now, let's check our balance in the console:

```js
truffle(testnet)> web3.eth.getBalance(account, (err, res) => console.log(res))
50000000000000000
'50000000000000000'
```

#### 8.4 Deploy and interact

To deploy the contracts, we are going to follow the same steps we made in our local network, but this time there will be a little delay because we are publishing the contracts to a public network!

**Step 1:**

```javascript
truffle(testnet)> compile 
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SimpleStorage.sol
> Artifacts written to /Users/${user}/Documents/Projects/RSK/TutorialPractice/simple-storage/build/contracts
> Compiled successfully using:
   - solc: 0.5.12+commit.7709ece9.Emscripten.clang
```

> Note: Please make sure the build folder is clean. If not, the following will be output and the file will not be compiled:

```shell
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.
```

**Step 2:**

```shell
truffle(rsk)> migrate --reset
```

> Deployment may delay a little bit.

If everything is ok, you will see the following output:

```javascript
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'testnet'
> Network id:      31
> Block gas limit: 0x67c280


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xfb883b37983f71cd16a49940f3e737453c72f6806183f977c4472d512d0f278b
   > Blocks: 2            Seconds: 50
   > contract address:    0xC72E36ca1672612b55820387CA11565e6209fDD5
   > block number:        904754
   > block timestamp:     1591276462
   > account:             0x6C9959B1614dcE487d47C08eCAE21532FcD595dc
   > balance:             0.049906812008765888
   > gas used:            188483
   > gas price:           0.069300003 gwei
   > value sent:          0 ETH
   > total cost:          0.000013061872465449 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000013061872465449 ETH


2_simple_storage.js
===================

   Deploying 'SimpleStorage'
   -------------------------
   > transaction hash:    0xc3b616a335e8de988126b26f5c5fc1e4763be1461c858bbbc687d6f05c6e8142
   > Blocks: 2            Seconds: 46
   > contract address:    0x10396F375Bd50c9a0eA1E3d4790739A4B30B2640
   > block number:        904757
   > block timestamp:     1591276599
   > account:             0x6C9959B1614dcE487d47C08eCAE21532FcD595dc
   > balance:             0.049893165174975116
   > gas used:            154923
   > gas price:           0.069300003 gwei
   > value sent:          0 ETH
   > total cost:          0.000010736164364769 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000010736164364769 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.000023798036830218 ETH
```

> Once the contract is deployed we can use the deployed() method as we did in the private blockchain. To see the interaction with the contract we can access it via [RSK Testnet explorer](https://explorer.testnet.rsk.co/) and search using the contract address, transaction hash or block number. All interactions with our contract will appear in the explorer!

![Testnet Explorer](/assets/img/kb/deploy-smart-contract/deploy-smart-contract7.png)

![Testnet Explorer](/assets/img/kb/deploy-smart-contract/deploy-smart-contract8.png)