---
# menu_order: 300
menu_title: Step 3 - Edit Smart Contract
layout: rsk
title: Quick Start - Step 3
tags: quick-start, solidity
description: 'quick start - smart contracts, solidity'
---

> Sunsetting Truffle: Truffle has been sunsetted, see [Consensys Announcement](https://consensys.io/blog/consensys-announces-the-sunset-of-truffle-and-ganache-and-new-hardhat). Rootstock will no longer support and encourage immediate migration to [Hardhat](/tools/hardhat/).

# Step 3 : Edit Smart Contract

In this tutorial, we have two sample smart contracts available to experiment with.

- `Coin.sol`: A minimal token contract
- `EIP20.sol`: An implementation of [EIP20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md) tokens provided by [ConsenSys](https://github.com/ConsenSys/Tokens)

## Locate the Smart Contract files for an EIP20 Coin

Navigate to `truffle/contracts/eip20`, and observe that there are two Solidity files in this directory: `EIP20Interface.sol` and `EIP20.sol`

```shell
cd truffle/contracts/eip20
ls
```

## Understand the Smart Contract Files

`EIP20Interface.sol` defines the required functions for the ERC20 base standard.

```solidity
/// @param _owner The address from which the balance will be retrieved
/// @return The balance
function balanceOf(address _owner) public view returns (uint256 balance);
```

```solidity
/// @notice send `_value` token to `_to` from `msg.sender`
/// @param _to The address of the recipient
/// @param _value The amount of token to be transferred
/// @return Whether the transfer was successful or not
function transfer(address _to, uint256 _value) public returns (bool success);
```

`EIP20.sol` provides implementations of the functions declared in `EIP20Interface.sol`.
Here are the implementation of the two functions that we looked at in the interface.

```javascript
function balanceOf(address _owner) public view returns (uint256 balance) {
    return balances[_owner];
}
```

```javascript
function transfer(address _to, uint256 _value) public       returns (bool success) {
    require(balances[msg.sender] >= _value);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
    return true;
}
```

## Edit the EIP20 Token Name

At the top of the `EIP20.sol` token contract, the constructor function defined inputs for:
Initial amount, token name, decimal unit, and token symbol.
You can customize these parameters to create your own token.

```solidity
function EIP20(
    uint256 _initialAmount,
    string _tokenName,
    uint8 _decimalUnits,
    string _tokenSymbol
) public {
    balances[msg.sender] = _initialAmount;               // Give the creator all initial tokens
    totalSupply = _initialAmount;                        // Update total supply
    name = _tokenName;                                   // Set the name for display purposes
    decimals = _decimalUnits;                            // Amount of decimals for display purposes
    symbol = _tokenSymbol;                               // Set the symbol for display purposes
    emit Transfer(msg.sender, msg.sender, 0);
    emit Approval(msg.sender, msg.sender, 0);
}
```

To set those values, open `3_deploy_tokens.js` in folder `truffle/migrations/`. This is a migration script that controls the deployment of smart contracts. We will talk more about migrations in next step. The contents of the file should look like this.

```javascript
const EIP20 = artifacts.require('./EIP20.sol');

module.exports = (deployer) => {
  deployer.deploy(EIP20, 10000, 'Simon Bucks', 1, 'SBX');
};
```

Now let's change the name to something you like, e.g. Flower Token.
We are now ready to deploy this contract,
which will generate 10000 of our own Flower Tokens!

```javascript
module.exports = (deployer) => {
  deployer.deploy(EIP20, 10000, 'Flower Token', 1, 'FLT');
};
```
