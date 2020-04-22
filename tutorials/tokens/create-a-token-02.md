---
layout: rsk
title: Create a token - other approach
tags: tutorial, rsk, token, openzeppelin, erc20, truffle 
description: "Other approach to create a token using Truffle and Open Zeppelin smart contracts at RSK testnet"
---
## Preparing the environment

**Install truffle**

Truffle is a development environment, testing framework and asset pipeline for blockchains.

```shell
npm install -g truffle
```

## Initialize a Truffle project

**1. create a new folder, my folder name is token**

```shell
mkdir token
cd token
```

**2. Initialize a Truffle project.**

```shell
truffle init
```

If you see the following result on the terminal, this step is successful:

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
Then you can see the file structure like this:

```
├── contracts
│ └── Migrations.sol
├── migrations
│ └── 1_initial_migration.js
├── test
└── truffle-config.js
```

In my editor,it shows like this:
<div style="text-align:center"><img src="/assets/img/tutorials/create-a-token-02/create-token2.png"></div>

* **./contracts:** All our smart contracts will be stored in this folder.
* **./migrations:** Deployment scripts will be stored in this folder.
* **./test:** Test scripts will be stored in this folder.
* **./truffle-config:** This is Truffle’s configuration file. We’ll be able to configure networks to interact with here.

**3. Initialize a npm project.**

```shell
npm init -y
```

<div style="text-align:center"><img src="/assets/img/tutorials/create-a-token-02/create-token1.png"></div>

**4. Install openzeppelin-solidity.**

> These libraries will install not only the main libraries of our token but also libraries for ownership, safe math and many other facilities. It’s worth mentioning that these libraries have been reviewed to accomplish high standards of security so contracts that depend on them are less susceptible to hacking when used correctly.

Inside the folder, we import the [libraries from OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-solidity) with

```shell
 npm install openzeppelin-solidity@1.12.0
```

The version 1.12.0 is what we need.

**5. Install @truffle/hdwallet-provider.**

>To connect to RSK, we are going to modify the Truffle configuration. We are going to use a provider that allows us to connect to any network but unlocking an account locally. We are going to use [@truffle/hdwallet-provider](https://github.com/trufflesuite/@truffle/hdwallet-provider).(Node >= 7.6)

```shell
  npm install @truffle/hdwallet-provider
```

**6. Create an RSK account**

> To create our wallet we are going to use this web app: [https://iancoleman.io/bip39/](https://iancoleman.io/bip39/). This may not be used for any 'real' wallet; it's not a secure way to generate a private key! We are going to use it just for learning the basics.

* 6.1 Generate a random mnemonic:
  * 6.1.1 In the 'Generate a random mnemonic' field, we select 12 words andgenerate it.
  * 6.1.2 Then tap on 'Generate'.
  * 6.1.3 The result appears in the BIP39 Mnemonic field. They should be 12 random words like the words in the image:

<div style="text-align:center"><img style="margin:0 auto" src="/assets/img/tutorials/create-a-token-02/create-token3.png"></div>

* 6.2 Create an account:

  * 6.2.1 Open truffle-config.js file in your Truffle project and overwrite it with the following code:
    ```javascript
      var HDWalletProvider = require('@truffle/hdwallet-provider')
      var mnemonic = 'rocket fault regular ... YOUR MNEMONIC';// 12 key words we generated before
      var publicNode = 'https://public-node.testnet.rsk.co:443';
      module.exports = {
        networks: {
          testnet: {
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
  * 6.2.2 To check our connection let's open a Truffle console:
    ```javascript
    truffle console --network testnet
    truffle(testnet)>
    ```
    > What we are doing is telling truffle to connect to RSK public test node, and having control of your recently created account.
  * 6.2.3 To get our address, Let's type this in our console to know what address was unlocked with our mnemonic:
    ```shell
    truffle(testnet)> var account = Object.keys(web3.currentProvider.wallets)[0]
    undefined
    truffle(testnet)> account
    '0xf08f6c2eac2183dfc0a5910c58c186496f32498d'
    ```
    This string in the last line is our address.
  * 6.3 To get funds to use in this network.
    > We mentioned before that RSK Testnet is a free network. To get funds to use in this network, we are going to use a faucet. A faucet is commonly a site where you enter your address and it automatically sends you some testnet funds for testing. Let's go to RSK Faucet: [https://faucet.testnet.rsk.co](https://faucet.testnet.rsk.co).
    <div style="text-align:center"><img style="margin:0 auto" src="/assets/img/tutorials/create-a-token-02/create-token4.png"></div>

Steps of usage:

* 6.3.1 Enter the address we got earlier.
* 6.3.2 Enter the Enter check code.
* 6.3.3 Submit form.
  <div style="text-align:center"><img style="margin:0 auto" src="/assets/img/tutorials/create-a-token-02/create-token5.png"></div>
* 6.3.4 Finally it will show us a successful page.
  <div style="text-align:center"><img src="/assets/img/tutorials/create-a-token-02/create-token6.png"></div>
* 6.3.5 Now, let's check our balance in the console.
  Run this command in our truffle console:
  ```javascript
  truffle(testnet)> web3.eth.getBalance(account, (err, res) => console.log(res))
  ```
  The string displayed on my terminal is the funds I got:
  ```javascript
  '999969677083000'
  ```

**7. Create a simple Token**

* 7.1 Write code about contract.
  * 7.1.1 Create a file named 'YourNewTokens.sol'
  * 7.1.2 Write the codes below into the file we created reccently.
    ```javascript
    pragma solidity ^0.4.17;
    import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
    import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

    contract YourNewToken is StandardToken, Ownable {
      string public name = 'CoinFabrik';
      string public symbol = 'CF';
      uint8 public decimals = 18;
      uint public INITIAL_SUPPLY = 1000;

      string Owner;

      event Yes(string);
      event No(string);

      constructor() public {
        totalSupply_ = INITIAL_SUPPLY * (10**uint(decimals));
        balances[msg.sender] = totalSupply_;
      }

      function setON(string _n) public onlyOwner returns (bool) {
        Owner = _n;
        return true;
      }

      function getON() public view returns (string) {
        return Owner;
      }

      function () public payable {
        if (msg.value > 0) {
          emit Yes('Thanks for donating R-BTC! :)');
        } else {
          emit No('Error 404: Function not found :P');
        }
      }
      function destroy() public onlyOwner {
        selfdestruct(owner);
      }
    }
    ```

**8. Let me explain the above code.**

* 8.1 define the compiler version of solidity.
  ```javascript
  pragma solidity ^0.4.17;
  ```
* 8.2 we can import a library XXX.sol to our contract like this.
  ```javascript
  import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';
  import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
  ```
  To create our ERC20 Token, we will import 2 libraries from that repository: the StandardToken.sol, which has the main functionality of a Token and already imports a bunch of libraries more by itself such as SafeMath.sol, and Ownable.sol. These allows us to set owner control over functions in contracts.
* 8.3 To inherit the libraries attributes and functions, we simply define our contract as a StandardToken and as Ownable using the “is” keyword in this way.
  ```javascript
    contract YourNewToken is StandardToken, Ownable { }
  ```
  After that, we have all the functions from those libraries and from their imported upward libraries.
* 8.4 Next, we define the Token’s name as YourNewToken, its symbol, 18 decimals for the precision of the Token (the standard in Ethereum-like networks, giving us the possibility to use Ether conversion functions of web3) and the initial supply of tokens to 1000 like this:
  ```java
    string public name = 'YourNewToken';
    string public symbol = 'YNT';
    uint8 public decimals = 18;
    uint public INITIAL_SUPPLY = 1000;
  ```
* 8.5 We are also going to create another string, a non-public variable not relevant to the Token functionality, to show the usage of the Ownable library properties, which allows only the creator to interact with some designated functions. We’ll see that later
  ```java
  string Owner;
  ```
* 8.6 With our parameters already defined, now it’s time to assign them to the Token variables through the constructor function. Up to now, the constructor function was defined as a function which had the same name as the contract, but from now on, there will be a function called **“constructor()”** already defined which will replace the older method. The Solidity compiler will warn you if you call the constructor like before.
  ```java
  constructor() public {
    totalSupply_ = INITIAL_SUPPLY * (10**uint(decimals));
    balances[msg.sender] = totalSupply_;
  }
  ```
    * 8.6.1 The number of the INITIAL_SUPPLY times the precision of the decimals will be assigned to the totalSupply_ of the BasicToken contract with
      ```java
        totalSupply_ = INITIAL_SUPPLY * (10**uint(decimals));
      ```
    * 8.6.2 And deposit them in the creator’s account:
      ```java
        balances[msg.sender] = totalSupply_;
      ```
* 8.7 With this, we have a simple and standard Token ready to be used but, as we said, we are going to add some functionalities using the Ownable contract. First, we will define a couple of functions: one that modifies the state of our non-public variable, but only if you have owner permissions, and the other one, that returns the message of the string. The definitions are the following:
  ```java
    function setON(string _n) public onlyOwner returns (bool) {
      Owner = _n;
      return true;
    }
    function getON() public view returns (string) {
      return Owner;
    }
  ```
  * Both are public, so anyone can try to call them, but for the first one, only the owner’s address won’t cause a revert. If you are the owner and the function is called, the string is saved in our variable Owner (with capital letters) and it will also return a true value that we can check in the transaction.
  * Since the Owner variable isn’t public and doesn’t have a Getter, we need a function that returns the value of the variable without changing the state of the blockchain. This is the second function.
* 8.8 We will also create a fallback function that emits an event if someone wrongly calls our contract
  ```java
    function () public payable {
        if (msg.value > 0) {
          emit Yes('Thanks for donating R-BTC! :)');
        } else {
          emit No('Error 404: Function not found :P');
        }
    }
  ```
* 8.9 Finally, we add a destroyable capability to the contract in which the owner is the only one who can execute it.

  ```java
    function destroy() public onlyOwner {
        selfdestruct(owner);
    }
  ```

**9. Creating the Migration**

* 9.1 Create a file named 2_deploy_token.js in **~/token/migrations**
  <div style="text-align:center"><img src="/assets/img/tutorials/create-a-token-02/create-token7.png"></div>
* 9.2 The code should look like:
  ```javascript
    var YourNewToken = artifacts.require("./YourNewToken.sol");
    module.exports = function(deployer) {
      deployer.deploy(YourNewToken);
    };
  ```

**10.Deploy contract**

* 10.1 We compile our contract with the command below in the truffle console:
    ```javascript
      truffle(testnet)> compile
    ```
  Output:
    ```shell
    Compiling your contracts...
    ===========================
    > Compiling ./contracts/Migrations.sol
    > Compiling ./contracts/YourNewTokens.sol
    > Compiling openzeppelin-solidity/contracts/math/SafeMath.sol
    > Compiling openzeppelin-solidity/contracts/ownership/Ownable.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC20/BasicToken.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC20/ERC20.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol
    > Artifacts written to /Users/huangxu/Project/RIL-DOCS/Smart Contract/build/contracts
    > Compiled successfully using:
      - solc: 0.4.24+commit.e67f0147.Emscripten.clang
    ```
* 10.2 Then we migrate our contract with
    ```javascript
      truffle(testnet)> migrate --reset
    ```
  Output:
    ```shell
    Using network 'testnet'.

    Running migration: 1_initial_migration.js
      Deploying Migrations...
      ... 0xf00d4ecf2b5752022384f7609fe991aa72dda00a0167a974e8c69864844ae270
      Migrations: 0x1dc2550023bc8858a7e5521292356a3d42cdcbe9
    Saving successful migration to network...
      ... 0x3e759e8ff8a7b8e47a441481fa5573ccf502b83f3d591ad3047e622af0f9169e
    Saving artifacts...
    Running migration: 2_deploy_token.js
      Deploying YourNewToken...
      ... 0x300c8bb1e434e2aa4b13dcc76087d42fcbe0cb953989ca53a336c59298716433
      YourNewToken: 0xc341678c01bcffa4f7362b2fceb23fbfd33373ea
    Saving successful migration to network...
      ... 0x71771f7ee5d4e251e386979122bdda8728fa519d95a054572751bb10d40eb8c5
    Saving artifacts...
    ```
* 10.3 We can execute both commands in one line with
  ```shell
  truffle(testnet)> migrate --all --reset
  ```
  > The migration contract will be deployed first. Truffle gives us the transaction hashes of each operation, so we can check for details or logs later. Here is the complete output that I’ve received.
* 10.4 To see the interaction with the contract we can access it via [RSK Testnet explorer](https://explorer.testnet.rsk.co/). All interactions with our contract will appear in the explorer!
  <div style="text-align:center"><img style="margin:0 auto" src="/assets/img/tutorials/create-a-token-02/create-token8.png"></div>
  <div style="text-align:center"><img style="margin:0 auto" src="/assets/img/tutorials/create-a-token-02/create-token9.png"></div>
