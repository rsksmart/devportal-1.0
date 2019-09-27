---
layout: rsk
title: Quick Start - Step 5
---
## Step 4 : Run Smart Contracts

Once the smart contract has been deployed successfully. We can use Truffle console to execute its methods.

#### Enter Truffle Console Mode
Truffle console is a basic interactive console connecting to our local node. Type the following command into a terminal.
```shell
truffle console --network regtest
```
Note the --network regtest parameter tells Truffle to connect to our local RegNet node.


#### Check Balance of Our EIP20 Token
Now type the following command into truffle console.
```
EIP20.deployed().then((instance=>instance.balanceOf("0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826")))
```
EIP20 is the name of our contract. This command will print out the balance of account address 0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826 as a big number. To see it as an integer, change the command to 
```
EIP20.deployed().then((instance=>instance.balanceOf("0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826").then(b=>b.toNumber())))
``` 

#### Transfer Token Directly Between Two Accounts
Now use the following command to transfer 1 token from the minter account to another account
```shell
EIP20.deployed().then((instance=>instance.transfer("0x7986b3DF570230288501EEa3D890bd66948C9B79", 1)))
```
After its success execution, check the minter account's balance again to see that it has changed.
```
EIP20.deployed().then((instance=>instance.balanceOf("0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826").then(b=>b.toNumber())))
``` 

#### Spend Token with Allowance
1. Approve another account for certain allowance to spend
```
EIP20.deployed().then((instance=>instance.approve("0x7986b3DF570230288501EEa3D890bd66948C9B79", 10)))
```
2. Check the allowance is indeed existing 
```
EIP20.deployed().then((instance=>instance.allowance("0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826","0x7986b3DF570230288501EEa3D890bd66948C9B79")))
```
3. Open another truffle console with the other account
```
truffle console --network regtestAccountTwo
```
4. Execute this token transfer from the new console. It successes because it has gained allowance from the minter.
```
EIP20.deployed().then((instance=>instance.transferFrom("0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826", "0x7986b3DF570230288501EEa3D890bd66948C9B79",3)))
```

