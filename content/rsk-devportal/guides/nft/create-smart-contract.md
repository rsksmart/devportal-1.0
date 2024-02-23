---
menu_order: 400
menu_title: Create Smart Contract
title: 'Create a Smart Contract | Write and Deploy an NFT project on the Rootstock Testnet'
description: 'Learn about NFTs, create, connect, and deploy to the Rootstock Blockchain.'
tags: NFTs, tutorial, overview, guides, tokens, web3, bitcoin, rsk, rootstock, peer-to-peer, blockchain, nft, ERC-721, smart-contract, hardhat, ethersjs, ipfs, metamask, testnet, pinata
layout: 'rsk'
---

## Create your NFT Smart Contract
     
In your root directory, start by creating a new directory called contracts and create a file inside the directory called `Meow.sol`.
    
```solidity
mkdir contracts
touch contracts/Meow.sol
code contracts/Meow.sol
``` 

Below is our NFT smart contract code, which is based on the OpenZeppelin library’s ERC-721 implementation. Copy and paste the contents below into your `Meow.sol` file.
    
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// using OpenZeppelin libraries
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Meow is ERC721URIStorage, Ownable {
    /** 
    From the `Counters` docs:
    Provides counters that can only be incremented, decremented or reset. 
    This can be used e.g. to track the number
    of elements in a mapping, issuing ERC721 ids, or counting request ids.
    Include with `using Counters for Counters.Counter;` 
    */

    using Counters for Counters.Counter;
    // tracks the number of minted NFTs
    Counters.Counter private _tokenIds;

    // calling ERC721 constructor
    constructor() ERC721("Meow NFT", "MEO") {}

    // mints new NFTs. Can be called only by the deployer (s/c owner)
    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        // increment counter
        _tokenIds.increment();
        // get new NFT id
        uint256 newItemId = _tokenIds.current();
        // call internal ERC721 mint function
        _mint(recipient, newItemId);
        // write token URI to newly minted NFT
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
```

We are inheriting classes from the OpenZeppelin contracts library, in the command line run `npm install @openzeppelin/contracts` to install the library into our folder.
    
So, what does this code do exactly? Let’s break it down, line-by-line.
    
```solidity
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
```
    
At the top of our smart contract, we import three [OpenZeppelin](https://www.openzeppelin.com/) smart contract classes and one extension:
    
* `@openzeppelin/contracts/token/ERC721/ERC721.sol` contains the implementation of the ERC-721 standard, which our NFT smart contract will inherit. To be a valid NFT, your smart contract must implement all the methods of the ERC-721 standard. To learn more about the inherited ERC-721 functions, [see the full ERC-721 specification](https://eips.ethereum.org/EIPS/eip-721).

* `@openzeppelin/contracts/utils/Counters.sol` provides counters that can only be incremented or decremented by one. Our smart contract uses a counter to keep track of the total number of NFTs minted and set the unique ID on our new NFT. (Each NFT minted using a smart contract must be assigned a unique ID—here our unique ID is just determined by the total number of NFTs in existence. For example, the first NFT we mint with our smart contract has an ID of `1`, our second NFT has an ID of `2`, etc.)

* `@openzeppelin/contracts/access/Ownable.sol` sets up [access control](https://docs.openzeppelin.com/contracts/3.x/access-control) on our smart contract, so only the owner of the smart contract (you) can mint NFTs. Note that including access control is entirely a preference. If you'd like anyone to be able to mint an NFT using your smart contract, remove the word `Ownable` on line 10 and `onlyOwner` on line 17.
    
* `@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol` - This is a more flexible but more expensive way of storing metadata.
    
```solidity
    using Counters for Counters.Counter;
    // tracks the number of minted NFTs
    Counters.Counter private _tokenIds;

    // calling ERC721 constructor
    constructor() ERC721("Meow NFT", "MEO") {}
```
    
After our import statements, we have our custom NFT smart contract, which is surprisingly short — it only contains a counter, a constructor, and single function! This is thanks to our inherited OpenZeppelin contracts, which implement most of the methods we need to create an NFT, such as `ownerOf` which returns the owner of the NFT, and `transferFrom`, which transfers ownership of the NFT from one account to another.
    
In our ERC-721 constructor, you’ll notice we passed 2 strings, `Meow-NFT`, and `MEO`. The first variable is the smart contract’s name, and the second is its symbol. You can name each of these variables whatever you wish!

```solidity 
    
// mints new NFTs. Can be called only by the deployer (s/c owner)
    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        // increment counter
        _tokenIds.increment();
        // get new NFT id
        uint256 newItemId = _tokenIds.current();
        // call internal ERC721 mint function
        _mint(recipient, newItemId);
        // write token URI to newly minted NFT
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
```

Finally, we have our function `mintNFT(address recipient, string memory tokenURI)` that allows us to mint an NFT! You'll notice this function takes in two variables:
    
* `address recipient` specifies the address that will receive your freshly minted NFT

* `string memory tokenURI` is a string that should resolve to a JSON document that describes the NFT's metadata. An NFT's metadata is really what brings it to life, allowing it to have configurable properties, such as a name, description, image, and other attributes.
    
`mintNFT` calls some methods from the inherited ERC-721 library, and ultimately returns a number that represents the ID of the freshly minted NFT.

## Next

Be sure to check out our next article in this series,
about how to deploy your NFT smart contract on Rootstock, [Deploy NFT Smart Contract on Rootstock](/guides/nft/deploy-nft-on-rsk/)

----

If you would like to delve deeper, here are some resources and tools that we recommend.

**Resources**

- [Visit Our Developers Portal](https://github.com/rsksmart/devportal) 
- [Rootstock Global Discord Community](https://rootstock.io/discord)
- [Rootstock](https://www.youtube.com/channel/UCYQSvSaqX8Q-XMbQmUG0yJg)
