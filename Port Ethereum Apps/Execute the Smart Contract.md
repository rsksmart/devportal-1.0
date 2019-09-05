---
layout: rsk
title: Port Ethereum Apps -  Step3
---

## Step 3 : Execute the Smart Contract

Once the deployment is successful. We can call smart contract methods directly in truffle console.

**Check Account Balance**

Now type the following command into truffle console.
```
EIP20.deployed().then((instance=>instance.balanceOf("0xa07982385a16f0C7a9eEbAD5F44d2093A2856997")))
```
EIP20 is the name of our contract. This command will print out the balance of account address 0xa07982385a16f0C7a9eEbAD5F44d2093A2856997 as a big number. To see it as an integer, change the command to 
```
EIP20.deployed().then((instance=>instance.balanceOf("0xa07982385a16f0C7a9eEbAD5F44d2093A2856997").then(b=>b.toNumber())))
``` 

**Transfer Token Directly Between Two Accounts**

Now use the following command to transfer 1 token from the minter account to another account
```shell
EIP20.deployed().then((instance=>instance.transfer("0x7dadb9d442cfe7fc75fd472d63afc16934d7aa44", 1)))
```
After its success execution, check the minter account's balance again to see that it has changed.
```
EIP20.deployed().then((instance=>instance.balanceOf("0xa07982385a16f0C7a9eEbAD5F44d2093A2856997").then(b=>b.toNumber())))
``` 
