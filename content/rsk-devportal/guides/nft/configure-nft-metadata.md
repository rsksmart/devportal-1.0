---
menu_order: 300
menu_title: Configure NFT Metadata
title: 'Configure NFT metadata | Write and Deploy an NFT project on the Rootstock Testnet'
description: 'Learn about NFTs, create, connect, and deploy to the Rootstock Blockchain.'
tags: NFTs, tutorial, overview, guides, tokens, web3, bitcoin, rsk, rootstock, peer-to-peer, blockchain, nft, ERC-721, smart-contract, hardhat, ethersjs, ipfs, metamask, testnet, pinata
layout: 'rsk'
---

## Configure the metadata for your NFT using Pinata

To get our `tokenURI` parameter, that should resolve to a JSON document describing our NFT's metadata which will include properties such as name, description, image, and other attributes, we would need to set up [Pinata](https://app.pinata.cloud/), a convenient IPFS API and toolkit, to store our NFT asset and metadata.

To simply put, a `tokenURI` on an NFT is a unique identifier of what the token "looks" like. A URI could be an API call over HTTPS, an IPFS hash, or anything else that is unique.

If you don’t have a Pinata account, sign up for a [free account here](https://app.pinata.cloud/) and complete the steps to verify your email.

Once you’ve created an account:

* Navigate to the “Files” page and click the blue "Upload" button at the top-left of the page.
* Upload two cat images to Pinata — this will be the image asset for your NFTs. Feel free to name the asset whatever you wish
* After you upload, you'll see the file info in the table on the "Files" page. You'll also see a CID column. You can copy the CID by clicking the copy button next to it. You can view your upload at: `https://gateway.pinata.cloud/ipfs/<CID>`.

    
Now, let's create and upload two other files to pinata, each containing details of two cats in JSON format. 
    
In your root directory, make a new folder called nft- metadata and add the following json codes:
    
File one is named `doerak.json`
    
```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "European short hair"
    },
    {
      "trait_type": "Parent",
      "value": "Gino Osahon"
    }
  ],
  "description": "Doerak. Gray & white kitty",
  "image": "ipfs://QmX7P1aswXLKLPd7RqbtwrNGD9CzGjvNFKmdEhWtBmoyiS",
  "name": "Doerak"
}
```
    
File two is called `luna.json`
    
```json
{
  "attributes": [
    {
      "trait_type": "Breed",
      "value": "European short hair"
    },
    {
      "trait_type": "Parent",
      "value": "Alex Shenshin"
    }
  ],
  "description": "Luna. Ginger kitty",
  "image": "ipfs://QmZZfJcrppaRiq5dWtC6zpnGZRNoVwdyh69VoA89xGW5Yt",
  "name": "Luna"
}
```
 
Feel free to change the data in the json. You can remove or add to the attributes section. Most importantly, make sure the image field points to the location of your IPFS image. 

Once you’re done editing the JSON file, save it and upload it to Pinata, following the same steps we did for uploading the image.
    
### Generate a seed phrase
    
In your root directory, create a file called `secret.json` and add your seed phrase.

Seed phrases are a human-readable version of your private keys. You can sign transactions and recover lost accounts using part of your mnemonic phrase. Mnemonic or seed phrases can range from 12 - 24 words depending on the blockchain ecosystem you are dealing with. Any app can generate its mnemonic phrase for security purposes.

```json
{
  "mnemonic": "please put your twelve words long mnemonic phrase to this string now"
}
```

To interact with the Rootstock blockchain, you need an account, which consists of a private key, a public key, and an address.

BIP-39 is a technical standard that allows the generation of multiple accounts from a set of dictionary words, plus a derivation path.
Many software libraries and wallet software implement this technical standard, including both ethers.js and MetaMask, which we'll be using in this tutorial.
Note that seed phrases should be treated as securely as private keys, so do not use the one in this tutorial on Rootstock Mainner - the usage here is sufficient for use on Rootstock Testnet only.
    
### Hardhat Configuration

Let's explain the `hardhat.config.js` file, the configuration file is always executed on startup before anything else happens, and it has two main tasks. You can define a task as a [JavaScript async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) with some associated metadata.
This metadata is used by Hardhat to automate tasks, or as asynchronous JavaScript functions that get access to the Hardhat Runtime Environment, which exposes its configuration and parameters.

    
```javascript 
task('deploy', 'Deploys smart contract to a blockchain').setAction(async () => {
  const meowContractFactory = await ethers.getContractFactory('Meow');
  const meowNft = await meowContractFactory.deploy();
  await meowNft.deployed();
  console.log(
    `Meow NFT deployed to: ${meowNft.address}\nCopy this address and paste to the 'mint' task in 'hardhat.config.js'`,
  );
});
```

When the `deploy` task is called, hardhat will deploy your smart contract to the Rootstock Blockchain. The function takes two metadata, and the second line `const meowContractFactory = await ethers.getContractFactory('Meow');` gets a `contractFactory` of the compiled source code. 

`ContractFactory` in `ethers.js` is an abstraction used to deploy new smart contracts, so `Meow` here is a factory for instances of our Meow contract.

The line `const meowNft = await meowContractFactory.deploy();` sends a deploy transaction, and the next line `await meowNft.deployed();` waits for the transaction to be mined. The last line in the deploy task uses `console.log` print logging message that says NFT has been deployed to the contract variable `address`.
    
```javascript
task('mint', 'Mint new NFT collectibles').setAction(async () => {
  const deployedAddress = '0xE360F4BFb74A1B2B1d102f40BE6c7D0f5C9d12C8';
  const newCIDsToMint = [
    'QmaXZxVGYcCY36seYTVuGeY9mWchC1WjMscV1FLNfZsM3f',
    'QmR5mspowKw6B68QPSuYE9SGH1A6gPKxjdVRokhAZZh4LD',
  ];
  const api = (await ethers.getContractFactory('Meow')).interface;
  const [signer] = await ethers.getSigners();
  const meowNft = new ethers.Contract(deployedAddress, api, signer);
  async function mintSequentially() {
    const cid = newCIDsToMint.shift();
    if (cid) {
      const tx = await meowNft.mintNFT(signer.address, `ipfs://${cid}`);
      const receipt = await tx.wait();
      const { tokenId } = receipt.events[0].args;
      console.log(`Minted NFT ${deployedAddress} #${tokenId}`);
      await mintSequentially();
    }
  }
  await mintSequentially();
});
```
    
Task `mint` when called will mint a new NFT. The line `const deployedAddress = '0xE360F4BFb74A1B2B1d102f40BE6c7D0f5C9d12C8';` takes the address where the smart contract source code was deployed to in the `deploy` task. This means that you need to first run the deploy task, then copy the address of the deployed source code and then assign it here to the deployedAddress constant.
    
The below lines contain the IPFS content identifier (CIDs) obtained from Pinata.

```javascript
const newCIDsToMint = [
    'QmaXZxVGYcCY36seYTVuGeY9mWchC1WjMscV1FLNfZsM3f',
    'QmR5mspowKw6B68QPSuYE9SGH1A6gPKxjdVRokhAZZh4LD',
]; 
``` 

The lines below get the smart contract application programming interface, get the deployers account information, and instantiates the smart contract representation object.
    
```javascript
  const api = (await ethers.getContractFactory('Meow')).interface;
  const [signer] = await ethers.getSigners();
  const meowNft = new ethers.Contract(deployedAddress, api, signer);
```

The below `mintSequentially` function mints all items from the `newCIDsToMint` array one after another. The statement `const cid = newCIDsToMint.shift();` removes the first CID from the `newCIDsToMint` array, if the array is already empty (minted all items). The `if` statement is called, if there are still items to be minted, it calls the smart contracts `mintNFT` function thereby initiating a transaction. It then waits for the transaction to be mined, gets the transaction receipt, extracts the ID of the newly minted NFT from the transfer event emitted by the smart contract, and recursively calls itself until the `newCIDsToMint` array is empty. 
    
```javascript 
async function mintSequentially() {
    const cid = newCIDsToMint.shift();
    if (cid) {
      const tx = await meowNft.mintNFT(signer.address, `ipfs://${cid}`);
      const receipt = await tx.wait();
      const { tokenId } = receipt.events[0].args;
      console.log(`Minted NFT ${deployedAddress} #${tokenId}`);
      await mintSequentially();
    }
  }
```
The module.export section has already been explained in the [JSON-RPC base networks](https://developers.rsk.co/kb/hardhat-setup-on-rsk/#24-json-rpc-based-networks) section of the "How to set up a Hardhat project for Rootstock Testnet " tutorial referred to in this article.
    
### Complete Config File

Your final configuration file should now look like this:
    
```javascript
/* eslint-disable no-undef */
require('@nomiclabs/hardhat-waffle');

const { mnemonic } = require('./.secret.json');

task('deploy', 'Deploys smart contract to a blockchain').setAction(async () => {
  const meowContractFactory = await ethers.getContractFactory('Meow');
  const meowNft = await meowContractFactory.deploy();
  await meowNft.deployed();
  console.log(
    `Meow NFT deployed to: ${meowNft.address}\nCopy this address and paste to the 'mint' task in 'hardhat.config.js'`,
  );
});
    
task('mint', 'Mint new NFT collectibles').setAction(async () => {
  const deployedAddress = '0xE360F4BFb74A1B2B1d102f40BE6c7D0f5C9d12C8';
  const newCIDsToMint = [
    'QmaXZxVGYcCY36seYTVuGeY9mWchC1WjMscV1FLNfZsM3f',
    'QmR5mspowKw6B68QPSuYE9SGH1A6gPKxjdVRokhAZZh4LD',
  ];
  const api = (await ethers.getContractFactory('Meow')).interface;
  const [signer] = await ethers.getSigners();
  const meowNft = new ethers.Contract(deployedAddress, api, signer);
  async function mintSequentially() {
    const cid = newCIDsToMint.shift();
    if (cid) {
      const tx = await meowNft.mintNFT(signer.address, `ipfs://${cid}`);
      const receipt = await tx.wait();
      const { tokenId } = receipt.events[0].args;
      console.log(`Minted NFT ${deployedAddress} #${tokenId}`);
      await mintSequentially();
    }
  }
  await mintSequentially();
});

module.exports = {
  solidity: '0.8.12',
  defaultNetwork: 'rsktestnet',
  networks: {
    hardhat: {},
    rsktestnet: {
      chainId: 31,
      url: 'https://public-node.testnet.rsk.co/',
      accounts: {
        mnemonic,
        path: "m/44'/60'/0'/0",
      },
    },
  },
};
```

## Next

Be sure to check out our next article in this series,
about how to create your NFT smart contract, [Create NFT Smart Contract](/guides/nft/create-smart-contract/)

----

If you would like to delve deeper, here are some resources and tools that we recommend.

**Resources**

- [Visit Rootstock Github Repo](https://github.com/rsksmart/devportal) 
- [Rootstock Global Discord Community](https://rootstock.io/discord)
- [Rootstock Youtube](https://www.youtube.com/channel/UCYQSvSaqX8Q-XMbQmUG0yJg)