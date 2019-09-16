---
layout: rsk
title: Port Ethereum Apps -  Step1
---
## Step 1 : Import Existing Code


Smart contracts for RSK are written using Solidity (a Javascript like programming language) and are fully compatible with Ethereum Smart Contracts, so you can migrate your existing Ethereum Smart Contract to RSK Smart without doing any changes.


#### Sodility and Editor
If you are new to Solidity, you can learn through a good introduction here [solidity doc](https://solidity.readthedocs.io/en/v0.5.11/).

You can edit Sodility using any text edtor but it is a good idea to use more advanced tools, the folling is a list of some of them:

- Visual Studio Code
- Atom
- Sublime

#### Truffle Framework
There is an open source tool called Truffle that facilitates development a lot since it allows you to connect to your local RSK Smart node and call the compiler, run unit tests and publish your contracts in a very easy way. We have an example project showing the usage of Truffle and Ganache with a local RSK node [here](https://github.com/rsksmart/truffle-integration).

In this tutorial, we will use Truffle for compiling and publishing your smart contracts. 

Run the following commands to install truffle on your local machine
```shell
npm install -g truffle
```

Then create a new folder and create an empty project
```shell
mkdir rsk-truffle-example
cd rsk-truffle-example
truffle init
```
The init command will create 3 folders and a configuration file for this project. The solidity files are in the contracts folder.

#### Copy Etherieum Contract Code
In this tutorial, we are going to use the token contract code from [Consensys/Token] (https://github.com/ConsenSys/Tokens) as the example.

Now create two files named EIP20.sol and 

EIP20Interface.sol content:
```
pragma solidity ^0.4.21;


contract EIP20Interface {
    /* This is a slight change to the ERC20 base standard.
    function totalSupply() constant returns (uint256 supply);
    is replaced with:
    uint256 public totalSupply;
    This automatically creates a getter function for the totalSupply.
    This is moved to the base contract since public getter functions are not
    currently recognised as an implementation of the matching abstract
    function by the compiler.
    */
    /// total amount of tokens
    uint256 public totalSupply;

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) public view returns (uint256 balance);

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) public returns (bool success);

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);

    /// @notice `msg.sender` approves `_spender` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of tokens to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint256 _value) public returns (bool success);

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) public view returns (uint256 remaining);

    // solhint-disable-next-line no-simple-event-func-name
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}
```


EIP20.sol content:
```
pragma solidity ^0.4.21;

import "./EIP20Interface.sol";


contract EIP20 is EIP20Interface {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show.
    string public symbol;                 //An identifier: eg SBX

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

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}
```

We also need to create a migration script in the migration folder. 
migrations/2_deploy_tokens.js
```
const EIP20 = artifacts.require('./EIP20.sol');

module.exports = (deployer) => {
  deployer.deploy(EIP20, 10000, 'Simon Bucks', 1, 'SBX');
};
```