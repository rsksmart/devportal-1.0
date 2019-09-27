---
layout: rsk
title: Interact with Smart Contract
---

## Interaction with the Contract

#### Syntax Simplification
With the address given by Truffle’s migration, and with the ABI of the contract, we create an instance of it so the syntaxis is easier for handling the functions. To do this, after we deployed it, we write

```js
  truffle(rsk)> var cfToken = web3.eth.contract(CoinFabrikToken.abi).at(CoinFabrikToken.address)
```

In case the contract was already deployed, and knowing its address and ABI, we can just simply do

```js
truffle(rsk)> var cfToken = web3.eth.contract(‘Contract_ABI’).at(‘Contract_ADDRESS’)
```

Where **Contract_ABI** is the compressed in-one-line ABI and **Contract_ADDRESS** doesn’t need explanation.

 have created 2 accounts before, and now we rename them for convenience

 ```js
  truffle(rsk)> var acc0 = web3.eth.accounts[0]
  truffle(rsk)> var acc1 = web3.eth.accounts[1]
 ```

**acc0** is the one that deployed the contract. Acc0 was added to the truffle.js and node.conf configuration files.


#### Ownership Control
We will first test the ownership function of our contract using the library that we’ve discussed.

If we call the **getON** function from any account, given that it’s public and hasn’t any ownership issues, we get

```js
truffle(rsk)> cfToken.getON()
''
```

Now, the **setON** function has an ownership property. Any transaction made from a different account will be dismissed. We see for instance, that trying to sign the contract with my name from acc1 will not change its value.

```js
truffle(rsk)> cfToken.setON('Andres Bachfischer', {from: acc1})
0x5f115190b60238240bedf36d1c5bb69a443a0f8ee971b0fc40fe5ca9c727d47c
```

<div style="text-align:center"><img width="80%" src="https://files.readme.io/4079e31-token5.png"></div>


With the transaction’s hash we see that the returned value was false and the function was not executed properly. Calling the **getON** function again, we see that the variable didn’t change its value.

Signing now the same transaction but from the owner’s account **acc0**, we get a status ‘0x01’ and the function is correctly executed.

```js
truffle(rsk)> cfToken.setON('Andres Bachfischer', {from: acc0})
0x0c894fa7e5369573fb14addeaed4cd9d5b6cd1425cb4eeeae16cb4e1fa8e0364
```


<div style="text-align:center"><img width="80%" src="https://files.readme.io/0639492-token6.png"></div>



Calling again the function getON, we see that the ownership library worked as we hoped it would.

```js
  truffle(rsk)> cfToken.getON()
```

<div style="text-align:center"><img width="50%" src="https://files.readme.io/220ac09-token7.png"></div>

**Ownable.sol** also has a function that allows us to change the owner of the contract to another address. We’ll not use it. Nevertheless, its usage is the following

```js
truffle(rsk)> cfToken.transferOwnership(acc1, {from: acc0}) 
```

With that, **acc1** would be the new owner of the contract.

Let’s move on to the Token.

#### Token operations

The first thing we do is to check if the balances of the Token were correctly assigned in the creation of the contract.

We check our balances on each account like this:

```js
web3.fromWei(cfToken.balanceOf(acc0).toString(10)) // = ‘1000’
web3.fromWei(cfToken.balanceOf(acc1).toString(10)) // = ‘0’
```
So we can see that all the tokens were correctly assigned to our initial account.

The first transaction that we’ll be doing is transferring some tokens to the second account, acc1, three times.

To do so for the first transaction

```js
truffle(rsk)> cfToken.transfer(acc1, web3.toWei(88.8), {from: acc0})
0xd45437b777f1430e7cec57bd80b261ce8f87bf8a3f9a113fecd20563403c4d9c
```

<div style="text-align:center"><img width="80%" src="https://files.readme.io/a94633a-token8.png"></div>

```js
truffle(rsk)> web3.fromWei(cfToken.balanceOf(acc0).toString(10)) // = '733.6'
truffle(rsk)> web3.fromWei(cfToken.balanceOf(acc1).toString(10)) // = '266.4'
```

<div style="text-align:center"><img width="50%" src="https://files.readme.io/7390a1b-token9.png"></div>

We see that tokens taken from our deployment account were the same amount as the ones received in the **acc1** .

With the **StandardToken** contract we also get allowances permissions to spend tokens on behalf of a certain account, in this case, **acc1**. If we want to do this before getting the approval, the transaction will fail (status ‘0x00’)

```js
truffle(rsk)> cfToken.transferFrom(acc1, acc0, web3.toWei(5), {from: acc0})
0x5cee7cf60849283a0088d71483a606ba2101b500e13f972abada4f75781596bf
```


<div style="text-align:center"><img width="80%" src="https://files.readme.io/88d30a7-token10.png"></div>

After checking that **acc0** is not allowed to send from **acc1**
```
truffle(rsk)> web3.fromWei(cfToken.allowance(acc1, acc0, {from: acc0}).toString(10)) // = '0'
```
We authorize **acc0** to spend 10 tokens in the name of **acc1**, from a transaction made by **acc1**
```js
truffle(rsk)> cfToken.approve(acc0, web3.toWei(10), {from: acc1})
0x6e1a202f4ca7f43dfb28034952d54a572993b986a55857790aa51854afbc1fb4
```

<div style="text-align:center"><img width="80%" src="https://files.readme.io/91f23ca-token11.png"></div>


In the output log, we see that the function was completed successfully with true and the log shows the amount allowed to **acc0** for spending. Checking with allowance
```js
truffle(rsk)> web3.fromWei(cfToken.allowance(acc1, acc0, {from: acc0}).toString(10)) // = '10'
```

<div style="text-align:center"><img width="80%" src="https://files.readme.io/f6c7e7a-token12.png"></div>

Now if we execute again the spending transaction
```js
truffle(rsk)> cfToken.transferFrom(acc1, acc0, web3.toWei(5), {from: acc0})
0x41f750eabb6e0d3ab576aac0333b0d337ca61808aae1eeafa9d8e2a0b81b979b
```
we get a successful transaction with status ‘0x01’.

<div style="text-align:center"><img width="80%" src="https://files.readme.io/d7274e1-token13.png"></div>

Checking the balances again
```js
truffle(rsk)> web3.fromWei(cfToken.balanceOf(acc0).toString(10)) // = '738.6'
truffle(rsk)> web3.fromWei(cfToken.balanceOf(acc1).toString(10)) // = '261.4'
```


<div style="text-align:center"><img width="50%" src="https://files.readme.io/73b88cb-token14.png"></div>

Lastly, if we sign a transaction calling a function that’s not available, our fallback function will be called. Signing a transaction like
```js
truffle(rsk)> web3.eth.sendTransaction({from: acc0, to: cfToken.address})
0x4106a287fc60669bf9682a73ec4c457b094c086ec7408a5dea95d200688c4ee9
```

<div style="text-align:center"><img width="80%" src="https://files.readme.io/4cb5d07-token15.png"></div>

Will return us a log whose data represents the string “Error 404: Function not found” in hex

( '0x00...00204572726f72203430343a2046756e6374696f6e206e6f7420666f756e64203a50').

Our last function, that we are not going to execute for obvious reasons, is the suicide function. We need the contract not to be destroyed in order to show the transactions. To call it, the owner should do
```js
truffle(rsk)> cfToken.destroy({from: acc0})
```