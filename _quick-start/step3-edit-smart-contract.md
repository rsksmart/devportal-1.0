---
layout: rsk
title: Quick Start - Step 3
tags: quick-start, solidity
description: 'quick start - smart contracts, solidity'
collection_order: 30
---

# Step 3 : Edit Smart Contract

In the previous step we setup tools for building and deploying smart contracts on a local test blockchain. Let's now use these for playing ...
In this tutorial, we have two sample smart contracts available to experiment with.

- `Coin.sol`: A minimal token contract
- `ERC20.sol`: An implementation of [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md) tokens provided by [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/erc20)

## Locate the Smart Contract files for an ERC20 Coin

Navigate to `truffle/contracts/erc20`, and observe that there are two Solidity files in this directory: `IERC20.sol` and `ERC20.sol`

```shell
$ cd <tutorial-root>/truffle/contracts/erc20
$ ls
ERC20.sol  IERC20.sol
$ 
```

## Understand the Smart Contract Files

Note that EIP stands for 'Ethereum Improvement Proposal' and ERC stands for 'Ethereum Request for Comments'. Then both are the referring the same specifcation, the former is the issue and a fix proposal, the later is a 'Standard' proposal for this fix.

[`IERC20.sol`](https://raw.githubusercontent.com/rsksmart/truffle-integration/staging/truffle/contracts/erc20/IERC20.sol) defines the interface (the required functions to implement) for the ERC20 based standard token.

```solidity
pragma solidity ^0.4.24;

/**
 * @title ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/20
 */
interface IERC20 {
  function totalSupply() external view returns (uint256);

  function balanceOf(address who) external view returns (uint256);

  function allowance(address owner, address spender)
    external view returns (uint256);

  function transfer(address to, uint256 value) external returns (bool);

  function approve(address spender, uint256 value)
    external returns (bool);

  function transferFrom(address from, address to, uint256 value)
    external returns (bool);

  event Transfer(
    address indexed from,
    address indexed to,
    uint256 value
  );

  event Approval(
    address indexed owner,
    address indexed spender,
    uint256 value
  );
}
```

[`ERC20.sol`](https://raw.githubusercontent.com/rsksmart/truffle-integration/staging/truffle/contracts/erc20/ERC20.sol) provides implementations of the functions declared in [`IERC20.sol`](https://raw.githubusercontent.com/rsksmart/truffle-integration/staging/truffle/contracts/erc20/IERC20.sol).
Here are the implementation of the two functions that we looked at in the interface.

```solidity
pragma solidity ^0.4.24;

import "./IERC20.sol";
import "../../math/SafeMath.sol";

/**
 * @title Standard ERC20 token
 *
 * @dev Implementation of the basic standard token.
 * https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
 * Originally based on code by FirstBlood: https://github.com/Firstbloodio/token/blob/master/smart_contract/FirstBloodToken.sol
 */
contract ERC20 is IERC20 {
  using SafeMath for uint256;

  mapping (address => uint256) private _balances;

  mapping (address => mapping (address => uint256)) private _allowed;

  uint256 private _totalSupply;

  /**
  * @dev Total number of tokens in existence
  */
  function totalSupply() public view returns (uint256) {
    return _totalSupply;
  }

  /**
  * @dev Gets the balance of the specified address.
  * @param owner The address to query the balance of.
  * @return An uint256 representing the amount owned by the passed address.
  */
  function balanceOf(address owner) public view returns (uint256) {
    return _balances[owner];
  }

 ...
 ...
    // Should https://github.com/OpenZeppelin/zeppelin-solidity/issues/707 be accepted,
    // this function needs to emit an event with the updated approval.
    _allowed[account][msg.sender] = _allowed[account][msg.sender].sub(
      amount);
    _burn(account, amount);
  }
}
```

## Edit the ERC20 Token Name

At the top of the `ERC20.sol` token contract, the constructor defined inputs for:
Token name and token symbol.
You can customize these parameters to create your own token.

```solidity
    /**
     * @dev Sets the values for {name} and {symbol}.
     *
     * The default value of {decimals} is 18. To select a different value for
     * {decimals} you should overload it.
     *
     * All two of these values are immutable: they can only be set once during
     * construction.
     */
    constructor (string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }
```

To set those values, open `3_deploy_tokens.js` in folder `truffle/migrations/`. This is a migration script that controls the deployment of smart contracts. We will talk more about migrations in next step. The contents of the file should look like this.

```javascript
onst ERC20 = artifacts.require('./tokens/ERC20.sol');

module.exports = (deployer) => {
  deployer.deploy(ERC20, 'Simon Bucks', 'SBX');
};
```

Now let's change the name to something you like, e.g. Flower Token.
We are now ready to deploy this contract,
which will generate 10000 of our own Flower Tokens!

```javascript
module.exports = (deployer) => {
  deployer.deploy(ERC20, 'Flower Token', 'FLT');
};
```
