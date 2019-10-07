---
layout: rsk
title: Deploy Smart Contract
---

<style>
  img.deploy-smart-contract-img{
    margin:0 auto;
    width: 80%;
  }
</style>

## Developing Smart Contracts in RSK


#### 1. Prepare the environment
* Install Solidity compile from [this link](https://solidity.readthedocs.io/en/develop/#available-solidity-integrations).
* Install Truffle and Ganache [here](https://www.trufflesuite.com/).

>Truffle is a development environment, testing framework and asset pipeline for blockchains. 
Ganache is a personal blockchain you can use to deploy contracts, develop your applications, and run tests.

#### 2. Introduce usage of the truffle
Truffle is a development environment, testing framework and asset pipeline for blockchains. In this step we are going to learn the basics.

Using Truffle, we can compile Solidity Smart Contracts, deploy them to a blockchain using JavaScript, create a JavaScript test suite and interact with the contracts through the integrated console.

```
truffle init # Creates an empty truffle project
truffle unbox package # Clones an existing Truffle packaged project
truffle develop # Starts truffle in-memory blockchain
truffle compile # Compiles Smart Contracts
truffle migrate # Deploys Smart Contracts to the configured blockchain
truffle console # Starts a web3 console
```

#### 3. Create a new Truffle project

* Create a new folder 
```shell
mkdir simple-storage
cd simple-storage
truffle init
```
* Initialize a Truffle project.
```shell
truffle init
```
If you see the following result on the terminal, this step is successful.

```
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

This is shown in my editor:
<img class="deploy-smart-contract-img" src="https://files.readme.io/36d06eb-truffle-1.png">

* **./contracts:** All our smart contracts will be stored in this folder.
* **./migrations:** Deployment scripts will be stored in this folder.
* **./test:** Test scripts will be stored in this folder.
* **./truffle-config:** This is Truffle’s configuration file. We’ll be able to configure networks to interact with here.

#### 4. Run a blockchain locally

```shell
truffle develop
```


You can see a list of available accounts that are already created and ready to use; you can also see the port (9545) where the blockchain is running. This is an in-memory blockchain, which means that no other peers are going to connect and interact with it automatically. It's just for testing purposes.

```shell
Truffle Develop started at http://127.0.0.1:9545/

Accounts:
(0) 0xb837f8e08a0582d40ac632906d45c089e421c3d2
(1) 0x603aed64ca34f6749547ccc5f63241b15bf83c65
(2) 0xea018f39c44c05188ccb916a2e98030e47f24d13
(3) 0x1f3c5e719b1bbf6d02b46e90e579f93878efeeb5
(4) 0xfb4ba2d0bde6d326214fb87b547657867cf86486
(5) 0x34748138a9ff335843fad142103c2e6c786507d1
(6) 0xc8e8c761d85c972ff8f08b38af50da26616549aa
(7) 0xbcb7e6dd3f1967dcc0530b4f91c2abdc33e47b89
(8) 0x1df83e0c4ffca4be573bb53e36108c85ef5f2a72
(9) 0x0ccfcda6703dd112765ded666ee5b374eb9af0ef

Private Keys:
(0) 714efac1672e54ac92a9c3d7fd0ede615a1a3d67940141f651c865c9fdf8a1b5
(1) 4d4e6e4af17c594db05408d7bc57bf879bb24831ff608c5b348ff1f791f066e4
(2) 94a7dde10356ff9ab8847f9f0fb8c0dd384ae39fbf978b70ae2b6826187a3ec5
(3) 1643f36d4cc67122908f57f35381c8c20f33b44191889f0be918666cceff1013
(4) 569225d5a9e77188ddd8031c5e2a9d1e666d039a8161eec70b4ac24f22ee5182
(5) 26b648fad394391cf913a97a26031b0e063fe21f4271d51d3a19f94462ce0298
(6) 3d710683d909cac4c3ba6e734f2562536e8d9abe7d42ded7f48d31dbcf648451
(7) 0b99400dde58a4beba436848349a71fdd95f9bd61dab0a24ae0d8e675fabca5f
(8) 550fc919aa9786535d4ee20caff1deababc900e6ad2749e94bd1f3d64c9d5549
(9) 22be4e16a0fc59241706511c4bcb61402590ce9053068d73708823e9c185bbbb

Mnemonic: praise artist olive cat anxiety crawl garden always horror burden nuclear sweet

⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
Ensure you do not use it on production blockchains, or else you risk losing funds.

truffle(develop)>
```

>**Do not close this console! All data is deleted when closed!**
To connect to a blockchain network we should configure Truffle to use our node RPC endpoint. We are going to do this later.

#### 5. Create your first contract

In Truffle development console execute this command to scaffold a new contract:

```shell
truffle(develop)> create contract SimpleStorage
```

Now, you can see the new SimpleStorage.sol file in the contracts folder:

<img class="deploy-smart-contract-img" src="https://files.readme.io/d1d815f-truffle-4.png"> 

In this file, we are going to code these lines:
```java
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

#### 6. Deploy it to the blockchain

Now, we must include the contract in the deployment scripts. These scripts are found in the Migrations folder.

Then we create a new migration file. We can name it 2_simple_storage.js. 


We write these codes as below:

```js
var SimpleStorage = artifacts.require("./SimpleStorage.sol");

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
> Compiling ./contracts/SimpleStorage.sol
> Artifacts written to /Users/huangxu/Project/test-contrast/build/contracts
> Compiled successfully using:
   - solc: 0.5.8+commit.23d335f2.Emscripten.clang

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
   > transaction hash:    0x52241c35862f25370d3b6661c71f03604c136fd74309f2293320b1f251410f2d
   > Blocks: 0            Seconds: 0
   > contract address:    0x159535cd09d0afEf39534B75B6cE1809b90789CD
   > block number:        3
   > block timestamp:     1560935070
   > account:             0xb837f8E08A0582d40Ac632906D45c089e421c3D2
   > balance:             99.99088018
   > gas used:            152575
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0030515 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0030515 ETH


Summary
=======
> Total deployments:   1
> Final cost:          0.0030515 ETH

truffle(develop)> compile

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

```
Now, our smart contract is in the blockchain!




#### 7.Interact with smart contracts

The Truffle console is a basic JavaScript pipeline that implements most  simple blockchain development functionalities.

Let's get an instance of our contract! In migrations, we defined a name for our contract instance: **SimpleStorage**. This name is the one declared in Migrations. We are going to get this instance and interact with it.

1. Get an instance of the SimpleStorage contract.

```shell
truffle(develop)> var SimpleStorage
undefined
truffle(develop)> SimpleStorage.deployed().then(instance => simpleStorage = instance)
```

Now simpleStorage variable contains an instance of the previously deployed contract:

2. Call get() method to get the storage in the contract.
```shell
truffle(development)> simpleStorage.get()
truffle(develop)> simpleStorage.get()
<BN: 0>
truffle(develop)> simpleStorage.get().then(bn => bn.toNumber())
0
```

This method does not modify the storage of the contract, so no funds are spent calling it.

3. Now we are going to modify the storage. To modify a contract's storage we must pay with gas. This gas is discounted from the account balance.
```shell
truffle(develop)> simpleStorage.set(10)
```

Have a look at the response.

```js
truffle(develop)> simpleStorage.set(10)
{ tx:
   '0xa05ef4e8fbb601cddfc084ba5c4aca06507bd00a7aa31d5ae26f8b4a2147538e',
  receipt:
   { transactionHash:
      '0xa05ef4e8fbb601cddfc084ba5c4aca06507bd00a7aa31d5ae26f8b4a2147538e',
     transactionIndex: 0,
     blockHash:
      '0xb99937be8b6d8208cc663dff19a045422e78bcdeed8ae276e86fb56e57c8cfd9',
     blockNumber: 5,
     from: '0xb837f8e08a0582d40ac632906d45c089e421c3d2',
     to: '0x159535cd09d0afef39534b75b6ce1809b90789cd',
     gasUsed: 41957,
     cumulativeGasUsed: 41957,
     contractAddress: null,
     logs: [],
     status: true,
     logsBloom:
      '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
     v: '0x1c',
     r:
      '0xb614f48e69e63a5228f6547321e43afb798a42c77a4812bc20fc1af99dfa8be9',
     s:
      '0x3bf9e53b64baa6e8d52e8028e3db3c2f99b2be585359ed190652f8023b4cb437',
     rawLogs: [] },
  logs: [] }

```

The transaction generates a receipt. This is the answer the blockchain generates to a transaction.

4. To confirm that it was executed, we can run Step 2 again and see that the storage has changed.

#### 8. Smart contract on RSK
8.1 Get an RSK account

>To create our wallet we are going to use this web app: https://iancoleman.io/bip39/. **This may not be used for any 'real' wallet; it's not a secure way to generate a private key!** We are going to use it just for learning the basics.
1. In the 'Generate a random mnemonic' field, we select 12 words and generate it. 
2. Then tap on 'Generate'. 
3. The result appears in the BIP39 Mnemonic field. They should be 12 random words like the words in the image:
<img class="deploy-smart-contract-img" src="https://files.readme.io/3670eb8-truffle-12.png">

8.2 Connect Truffle to RSK public node

>To connect to RSK, we are going to modify the Truffle configuration. We are going to use a provider that allows us to connect to any network but unlocking an account locally. We are going to use [truffle-hdwallet-provider](https://github.com/trufflesuite/truffle-hdwallet-provider).(Node >= 7.6)
```
    npm install truffle-hdwallet-provider
```

>Open truffle-config.js file in your Truffle project and overwrite it with the following code:
```
var HDWalletProvider = require('truffle-hdwallet-provider')
var mnemonic = 'rocket fault regular ... YOUR MNEMONIC';// 12 key words we generated before
var publicNode = 'https://public-node.testnet.rsk.co:443';
module.exports = {
  networks: {
    rsk: {
      provider: () =>
        new HDWalletProvider(mnemonic, publicNode),
      network_id: '*',
      gas: 2500000,
      gasPrice: 183000
    }
  },
  compilers : {
     solc: {
       version: "0.5.0",
       evmVersion: "byzantium"
     }
  }
}
```

>What we are doing is telling truffle to connect to RSK public node, and having control of your recently created account. "GasPrice" is the price we pay for fees to the network, and "gas" is the maximum gas we allow to spend on a transaction. The values are default used for RSK network. If we set these values wrongly, transactions may not be mined or waste too many funds.
To check our connection let's open a Truffle console:
```shell
truffle console --network rsk
truffle(rsk)> web3.eth.getBlockNumber((err, res) => console.log(res))
```

>Output:
```shell
truffle(rsk)> web3.eth.getBlockNumber((err,res)=>console.log(res))
655215
655215
```

>Why not **web3.eth.blockNumber**? When we use providers to connect to a node, we must do it asynchronously!
Do not close this console. We are going to use it in the next steps.

8.3 Get funds on RSK account

>What is our address? Let's type this in our console to know what address was unlocked with our mnemonic:
```shell
truffle(rsk)> web3.currentProvider.wallets
```

>Output:
```js
{ '0xf08f6c2eac2183dfc0a5910c58c186496f32498d':
   p {
     _privKey:
      Buffer 92 c2 63 53 05 ad a8 d4 61 b9 ff 6f 37 12 d2 fa 53 c8 a6 02 29 91 9b d6 d3 3e 89 55 a4 02 b9 70,
     _pubKey:
      Buffer f0 b5 45 f3 9e 4e 4b 5b b0 fd 54 c5 dc cb d6 74 fc 9b 2f 5e d7 e1 50 3e 00 8a d3 d8 f5 95 83 cf 02 cf 11 25 c7 21 1b 56 2a fa 63 62 5a 9e 8f 7d 42 ef ...  } }
```

>The previously mentioned configuration having been used, only one wallet should be available. Let's save it in a variable in our console. We are going to use it soon.
```shell
truffle(rsk)> var account = Object.keys(web3.currentProvider.wallets)[0]
undefined
truffle(rsk)> account
'0xf08f6c2eac2183dfc0a5910c58c186496f32498d'
```

>We mentioned before that RSK TestNet is a free network. To get funds to use in this network, we are going to use a faucet. A faucet is commonly a site where you enter your address and it automatically sends you some testnet funds for testing. Let's go to RSK Faucet: https://faucet.testnet.rsk.co.
<img class="deploy-smart-contract-img" src="https://files.readme.io/7d28c33-get-balance-faucet.png">

>Steps of usage:
1. Enter the address we got earlier 
2. Enter the Enter check code 
3. Submit form
>
<img class="deploy-smart-contract-img" src="https://files.readme.io/34161e4-get-balance-faucet2.png"> 

>Congratulations, you get the balance for testing.
<img class="deploy-smart-contract-img" src="https://files.readme.io/27e29ce-get-balance-from-faucet.png"> 

>Now, let's check our balance in the console:
```js
truffle(rsk)> web3.eth.getBalance(account, (err, res) => console.log(res))
999969677083000
'999969677083000'
```

8.4 Deploy and interact

To deploy the contracts, we are going to follow the same steps we made in our local network, but this time it should delay a little bit more because we are publishing them to a public network!

**Step 1:**
```js
truffle(rsk)> compile -all
Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SimpleStorage.sol
> Artifacts written to /Users/huangxu/Project/test-contrast/build/contracts
> Compiled successfully using:
   - solc: 0.5.0+commit.1d4f565a.Emscripten.clang
```
>Note: Please make sure the build folder is clean. If not, the following will be output and the file will not be compiled:
```shell
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.
```
**Step 2:**
```shell
truffle(rsk)> migrate --reset
```

>Deployment may delay a little bit.
If everything is ok, you will see the following output:
```js
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.
Starting migrations...
======================
> Network name:    'rsk'
> Network id:      31
> Block gas limit: 0x67c280
1_initial_migration.js
======================
   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x2df2adf812bde74e8b4db1658441e337992a87b20b200d0b30d3bd4d4a8db2cb
   > Blocks: 2            Seconds: 84
   > contract address:    0x27365a439d71E389154175F3c84C6f1E34cc2f3C
   > block number:        655395
   > block timestamp:     1561007105
   > account:             0xF08f6c2Eac2183DfC0a5910C58c186496f32498D
   > balance:             0.000999917550631
   > gas used:            284844
   > gas price:           0.000183 gwei
   > value sent:          0 ETH
   > total cost:          0.000000052126452 ETH
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000000052126452 ETH
2_simple_storage.js
===================
   Deploying 'SimpleStorage'
   -------------------------
   > transaction hash:    0xad292ede26df2e43c7938651c147c0199375fb9d3038a8ad22e99fea71ffc423
   > Blocks: 3            Seconds: 85
   > contract address:    0x89dEed0dDDb72e282F52478ba21c562B556a4851
   > block number:        655399
   > block timestamp:     1561007260
   > account:             0xF08f6c2Eac2183DfC0a5910C58c186496f32498D
   > balance:             0.000999879535492
   > gas used:            165699
   > gas price:           0.000183 gwei
   > value sent:          0 ETH
   > total cost:          0.000000030322917 ETH
   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:     0.000000030322917 ETH
Summary
=======
> Total deployments:   2
> Final cost:          0.000000082449369 ETH
```

>Once the contract is deployed we can use the deployed() method as we did in the private blockchain. To see the interaction with the contract we can access it via [RSK Testnet explorer](https://explorer.testnet.rsk.co/). All interactions with our contract will appear in the explorer!
<img class="deploy-smart-contract-img" src="https://files.readme.io/21f88b0-check-on-explorer-1.png"> 
<img class="deploy-smart-contract-img" src="https://files.readme.io/4365ef7-check-on-explorer.png">