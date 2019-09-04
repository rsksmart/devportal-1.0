---
layout: rsk
title: Deploy Solidity Code as RSK Smart Contract
---
## Step 2 : Deploy Solidity Code as RSK Smart Contract

<style>
  img{
    margin:0 auto;
    width:80%;
  }
</style>

We are going to deploy the example smart contract on to RSK Testnet.


#### Testnet and Faucet
First we need to obtain an account on RSK Testnet and get some free RSK token from the testnet Faucet. 

**Create new Account with MetaMask**
1. Open MetaMask Chrome extension
1. In the network options, choose custom RPC
1. Enter RSK Testnet as the Network Name
1. Enter https://public-node.testnet.rsk.co as the RPC URL
1. Enter RBTC as SymbolPut and Save
1. Copy the account address

![Configurate MetaMask for RSK TestNet](../dist/images/metamask-testnet.png)

**Get free token**
Visit the [faucet website](https://faucet.testnet.rsk.co/) to gain some free RSK token for Testnet

Enter the account address from MetaMask and wait several minutes for MetaMask to refresh the new balance.

![Testnet Faucet](../dist/images/testnet-faucet.png)


#### Truffle Configuration
Now edit the truffle-config.js to be same as the following. It directs Truffle to connect to the public Testnet node.

```
var HDWalletProvider = require('truffle-hdwallet-provider')

var mnemonic = 'thing tuition ranch ... YOUR MNEMONIC'
var publicNode = 'https://public-node.testnet.rsk.co:443'

module.exports = {
  networks: {
    rskTestnet: {
      provider: () =>
        new HDWalletProvider(mnemonic, publicNode),
      network_id: '*',
      gas: 2500000,
      gasPrice: 183000
    }
  },
  compilers : {
     solc: {
      version: "0.4.24",
      evmVersion: "byzantium"
     }
  }
}
```


#### Compile and Deploy
Run the following commands in Terminal to compile and deploy the contracts.

```
truffle console --network rskTestnet
truffle compile
truffle migrate 
```

