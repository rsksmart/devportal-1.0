---
layout: rsk
title: Quick Start - Step 3
---
## Step 3 : Edit Smart Contract


In this tutorial, we have two sample smart contracts available for experiments. 

- Coin.sol a minimal token contract
- EIP20.sol an implementation of [EIP20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md) tokens provided by [ConsenSys](https://github.com/ConsenSys/Tokens)

#### Locate the Smart Contract files for an EIP20 Coin
- Navigate to under /truffle/contracts/eip20
```shell
cd truffle/contracts/eip20
ls
```
There are two .sol files in this directory: EIP20Interface.sol and EIP20.sol

#### Understand the Smart Contracts Files
EIP20Interface.sol defines the required functions for the ERC20 base standard.

``` javascript
/// @param _owner The address from which the balance will be retrieved
/// @return The balance
function balanceOf(address _owner) public view returns (uint256 balance);
```
``` javascript
/// @notice send `_value` token to `_to` from `msg.sender`
/// @param _to The address of the recipient
/// @param _value The amount of token to be transferred
/// @return Whether the transfer was successful or not
function transfer(address _to, uint256 _value) public returns (bool success);
```

EIP20.sol provides the implementation for the functions declared in EIP20Interface.sol

``` javascript
function balanceOf(address _owner) public view returns (uint256 balance) {
    return balances[_owner];
}

```
``` javascript
function transfer(address _to, uint256 _value) public       returns (bool success) {
    require(balances[msg.sender] >= _value);
    balances[msg.sender] -= _value;
    balances[_to] += _value;
    emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
    return true;
}
```

#### Edit the EIP20 Token Name
At the top of the EIP20.sol token contract, the constructor function has input of initial amount, token name, decimal unit, and token symbol. You can customize these paramsters to create your own token.

```javascript
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

To set those values, open 3_deploy_tokens.js in folder truffle/migrations/. This is a migration script that controls the deployment of smart constrcts. We will talk more about migrations in next step. The file content looks like this. 

``` javascript
const EIP20 = artifacts.require('./EIP20.sol');

module.exports = (deployer) => {
  deployer.deploy(EIP20, 10000, 'Simon Bucks', 1, 'SBX');
};

```

Now let's change the name to something you like, e.g. Flower Token. And we are ready to deploy this contract to generate our own 10000 Flower Tokens!
```javascript
module.exports = (deployer) => {
  deployer.deploy(EIP20, 10000, 'Flower Token', 1, 'FLT');
};
```


