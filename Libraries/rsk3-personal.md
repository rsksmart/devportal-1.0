---
layout: rsk
title: rsk3-personal
---

rsk3.personal
=================

The `rsk3-personal` package allows you to interact with the Rsk
node\'s accounts.

Note

Many of these functions send sensitive information, like password. Never
call these functions over a unsecured Websocket or HTTP provider, as
your password will be sent in plain text!

``` javascript
import {Personal} from 'rsk3-personal';

const personal = new Personal('ws://some.local-or-remote.node:8546', null, options);


// -> rsk3.personal
```

------------------------------------------------------------------------

options
-------

A Rsk3 module does provide several options for configuring the
transaction confirmation worklfow or for defining default values. These
are the currently available option properties on a Rsk3 module:

### Module Options

`defaultAccount`

`defaultBlock`

`defaultGas`

`defaultGasPrice`

`transactionBlockTimeout`

`transactionConfirmationBlocks`

`transactionPollingTimeout`

`transactionSigner`

### Example

``` javascript
import {Rsk3} from 'rsk3';

const options = {
    defaultAccount: '0x0',
    defaultBlock: 'latest',
    defaultGas: 1,
    defaultGasPrice: 0,
    transactionBlockTimeout: 50,
    transactionConfirmationBlocks: 24,
    transactionPollingTimeout: 480,
    transactionSigner: new CustomTransactionSigner()
}

const rsk3 = new Rsk3('http://localhost:8545', null, options);
```

------------------------------------------------------------------------

defaultBlock
------------

``` javascript
rsk3.defaultBlock
...
```

The default block is used for all methods which have a block parameter.
You can override it by passing the block parameter if a block is
required.

Example:

-   `rsk3.getBalance()`
-   `rsk3.getCode()`
-   `rsk3.getTransactionCount()`
-   `rsk3.getStorageAt()`
-   `rsk3.call()`
-   `new rsk3.Contract() -> myContract.methods.myMethod().call()`

### Returns

The `defaultBlock` property can return the following values:

-   `Number`: A block number
-   `"genesis"` - `String`: The genesis block
-   `"latest"` - `String`: The latest block (current head of the
    blockchain)
-   `"pending"` - `String`: The currently mined block (including pending
    transactions)

Default is `"latest"`

------------------------------------------------------------------------

defaultAccount
--------------

``` javascript
rsk3.defaultAccount
...
```

This default address is used as the default `"from"` property, if no
`"from"` property is specified.

### Returns

`String` - 20 Bytes: Any Rsk address. You need to have the private
key for that address in your node or keystore. (Default is `undefined`)

------------------------------------------------------------------------

defaultGasPrice
---------------

``` javascript
rsk3.defaultGasPrice
...
```

The default gas price which will be used for a request.

### Returns

`string|number`: The current value of the defaultGasPrice property.

------------------------------------------------------------------------

defaultGas
----------

``` javascript
rsk3.defaultGas
...
```

The default gas which will be used for a request.

### Returns

`string|number`: The current value of the defaultGas property.

------------------------------------------------------------------------

transactionBlockTimeout
----

``` javascript
rsk3.transactionBlockTimeout
...
```

The `transactionBlockTimeout` will be used over a socket based
connection. This option does define the amount of new blocks it should
wait until the first confirmation happens. This means the PromiEvent
rejects with a timeout error when the timeout got exceeded.

### Returns

`number`: The current value of transactionBlockTimeout

------------------------------------------------------------------------

transactionConfirmationBlocks
----

``` javascript
rsk3.transactionConfirmationBlocks
...
```

This defines the number of blocks it requires until a transaction will
be handled as confirmed.

### Returns

`number`: The current value of transactionConfirmationBlocks

------------------------------------------------------------------------

transactionPollingTimeout
-----

``` javascript
rsk3.transactionPollingTimeout
...
```

The `transactionPollingTimeout` will be used over a HTTP connection.
This option does define the amount of polls (each second) it should wait
until the first confirmation happens.

### Returns

`number`: The current value of transactionPollingTimeout

------------------------------------------------------------------------

transactionSigner
-----------------

``` javascript
rsk3.transactionSigner
...
```

The `transactionSigner` property does provide us the possibility to
customize the signing process of the `Eth` module and the related
sub-modules.

The interface of a `TransactionSigner`:

``` javascript
interface TransactionSigner {
    sign(txObject: Transaction): Promise<SignedTransaction>
}

interface SignedTransaction {
    messageHash: string,
    v: string,
    r: string,
    s: string,
    rawTransaction: string
}
```

### Returns

`TransactionSigner`: A JavaScript class of type TransactionSigner.

------------------------------------------------------------------------

setProvider
-----------

``` javascript
rsk3.setProvider(myProvider)
...
```

Will change the provider for its module.


### Parameters

1.  `Object|String` - `provider`: a valid provider
2.  `Net` - `net`: (optional) the node.js Net package. This is only
    required for the IPC provider.

### Returns

`Boolean`



providers
---------

``` javascript
Rsk3.providers
...
```

Contains the current available providers.

### Value

`Object` with the following providers:

> -   `Object` - `HttpProvider`: The HTTP provider is **deprecated**, as
>     it won\'t work for subscriptions.
> -   `Object` - `WebsocketProvider`: The Websocket provider is the
>     standard for usage in legacy browsers.
> -   `Object` - `IpcProvider`: The IPC provider is used node.js dapps
>     when running a local node. Gives the most secure connection.


givenProvider
-------------

``` javascript
rsk3.givenProvider
...
```

When using rsk3.js in an Rsk compatible browser, it will set with
the current native provider by that browser. Will return the given
provider by the (browser) environment, otherwise `null`.

### Returns

`Object`: The given provider set or `false`.

------------------------------------------------------------------------

currentProvider
---------------

``` javascript
rsk3.currentProvider
...
```

Will return the current provider.

### Returns

`Object`: The current provider set.

------------------------------------------------------------------------

BatchRequest
------------

``` javascript
new rsk3.BatchRequest()
...
```

Class to create and execute batch requests.

### Parameters

none

### Returns

`Object`: With the following methods:

> -   `add(request)`: To add a request object to the batch call.
> -   `execute()`: Will execute the batch request.


------------------------------------------------------------------------

newAccount
---------
``` javascript
rsk3.personal.newAccount(password, [callback])
```

Create a new account on the node that Rsk3 is connected to with its
provider. The RPC method used is `personal_newAccount`. It differs from
`rsk3.accounts.create()` where the key pair is created only on client and it\'s up to
the developer to manage it.

Note

Never call this function over a unsecured Websocket or HTTP provider, as
your password will be send in plain text!


### Parameters

1.  `password` - `String`: The password to encrypt this account with.

### Returns

`Promise<string>` - The address of the newly created account.

### Example

``` javascript
rsk3.personal.newAccount('!@superpassword')
.then(console.log);
> '0x1234567891011121314151617181920212223456'
```

------------------------------------------------------------------------

sign
----

``` javascript
rsk3.personal.sign(dataToSign, address, password [, callback])
```

Signs data using a specific account. This data is before UTF-8 HEX
decoded and enveloped as follows:
`"\x19Ethereum Signed Message:\n" + message.length + message`.

Note

Sending your account password over an unsecured HTTP RPC connection is
highly unsecure.

### Parameters

1.  `String` - Data to sign. If String it will be converted using
    `rsk3.utils.utf8ToHex`
2.  `String` - Address to sign data with.
3.  `String` - The password of the account to sign data with.
4.  `Function` - (optional) Optional callback, returns an error object
    as first parameter and the result as second.

### Returns

`Promise<string>` - The signature.

### Example

``` javascript
rsk3.personal.sign("Hello world", "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "test password!")
.then(console.log);
> "0x30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400"

// the below is the same
rsk3.personal.sign(rsk3.utils.utf8ToHex("Hello world"), "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "test password!")
.then(console.log);
> "0x30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400"
```

------------------------------------------------------------------------

ecRecover
---------

``` javascript
rsk3.personal.ecRecover(dataThatWasSigned, signature [, callback])
```

Recovers the account that signed the data.

### Parameters

1.  `String` - Data that was signed. If String it will be converted
    using `rsk3.utils.utf8ToHex`
2.  `String` - The signature.
3.  `Function` - (optional) Optional callback, returns an error object
    as first parameter and the result as second.

### Returns

`Promise<string>` - The account.

### Example

``` javascript
rsk3.personal.ecRecover("Hello world", "0x30755ed65396facf86c53e6217c52b4daebe72aa4941d89635409de4c9c7f9466d4e9aaec7977f05e923889b33c0d0dd27d7226b6e6f56ce737465c5cfd04be400").then(console.log);
> "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe"
```

------------------------------------------------------------------------

signTransaction
---------------

``` javascript
rsk3.personal.signTransaction(transaction, password [, callback])
```

Signs a transaction. This account needs to be unlocked.

Note

Sending your account password over an unsecured HTTP RPC connection is
highly unsecure.

### Parameters

1.  `Object` - The transaction data to sign
    `rsk3.sendTransaction()` for more.
2.  `String` - The password of the `from` account, to sign the
    transaction with.
3.  `Function` - (optional) Optional callback, returns an error object
    as first parameter and the result as second.

### Returns

`Promise<Object>` - The RLP encoded transaction. The `raw` property can
be used to send the transaction using
`rsk3.sendSignedTransaction`

### Example

``` javascript
rsk3.signTransaction({
    from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
    gasPrice: "20000000000",
    gas: "21000",
    to: '0x3535353535353535353535353535353535353535',
    value: "1000000000000000000",
    data: ""
}, 'MyPassword!').then(console.log);
> {
    raw: '0xf86c808504a817c800825208943535353535353535353535353535353535353535880de0b6b3a76400008025a04f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88da07e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
    tx: {
        nonce: '0x0',
        gasPrice: '0x4a817c800',
        gas: '0x5208',
        to: '0x3535353535353535353535353535353535353535',
        value: '0xde0b6b3a7640000',
        input: '0x',
        v: '0x25',
        r: '0x4f4c17305743700648bc4f6cd3038ec6f6af0df73e31757007b7f59df7bee88d',
        s: '0x7e1941b264348e80c78c4027afc65a87b0a5e43e86742b8ca0823584c6788fd0',
        hash: '0xda3be87732110de6c1354c83770aae630ede9ac308d9f7b399ecfba23d923384'
    }
}
```

------------------------------------------------------------------------

sendTransaction
---------------

``` javascript
rsk3.personal.sendTransaction(transactionOptions, password [, callback])
```

This method sends a transaction over the management API.

Note

Sending your account password over an unsecured HTTP RPC connection is
highly unsecure.


### Parameters

1.  `Object` - The transaction options
2.  `String` - The passphrase for the current account
3.  `Function` - (optional) Optional callback, returns an error object
    as first parameter and the result as second.

### Returns

`Promise<string>` - The transaction hash.

### Example

``` javascript
rsk3.sendTransaction({
    from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
    gasPrice: "20000000000",
    gas: "21000",
    to: '0x3535353535353535353535353535353535353535',
    value: "1000000000000000000",
    data: ""
}, 'MyPassword!').then(console.log);
> '0xda3be87732110de6c1354c83770aae630ede9ac308d9f7b399ecfba23d923384'
```

------------------------------------------------------------------------

unlockAccount
-------------

``` javascript
rsk3.personal.unlockAccount(address, password, unlockDuraction [, callback])
```

Unlocks the given account.

Note

Sending your account password over an unsecured HTTP RPC connection is
highly unsecure.

### Parameters

1.  `address` - `String`: The account address.
2.  `password` - `String` - The password of the account.
3.  `unlockDuration` - `Number` - The duration for the account to remain
    unlocked.
4.  `Function` - (optional) Optional callback, returns an error object
    as first parameter and the result as second.

### Returns

`Promise<boolean>` - True if the account got unlocked successful
otherwise false.

### Example

``` javascript
rsk3.personal.unlockAccount("0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "test password!", 600)
.then(console.log('Account unlocked!'));
> "Account unlocked!"
```

------------------------------------------------------------------------

lockAccount
-----------

``` javascript
rsk3.personal.lockAccount(address [, callback])
```

Locks the given account.

Note

Sending your account password over an unsecured HTTP RPC connection is
highly unsecure.

### Parameters

1.  `address` - `String`: The account address.
2.  `Function` - (optional) Optional callback, returns an error object
    as first parameter and the result as second.

### Returns

`Promise<boolean>`

### Example

``` javascript
rsk3.personal.lockAccount("0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe")
.then(console.log('Account locked!'));
> "Account locked!"
```

------------------------------------------------------------------------

getAccounts
-----------

``` javascript
rsk3.personal.getAccounts([callback])
```

Returns a list of accounts the node controls by using the provider and
calling the RPC method `personal_listAccounts`. Using
`rsk3.accounts.create()` will not add accounts into this list. For that use
`rsk3.personal.newAccount()`

The results are the same as
`rsk3.getAccounts()`
except that calls the RPC method `eth_accounts`.

### Returns

`Promise<Array>` - An array of addresses controlled by node.

### Example

``` javascript
rsk3.personal.getAccounts()
.then(console.log);
> ["0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", "0xDCc6960376d6C6dEa93647383FfB245CfCed97Cf"]
```

------------------------------------------------------------------------

importRawKey
------------

``` javascript
rsk3.personal.importRawKey(privateKey, password)
```

Imports the given private key into the key store, encrypting it with the
passphrase.

Returns the address of the new account.

Note

Sending your account password over an unsecured HTTP RPC connection is
highly unsecure.

### Parameters

1.  `privateKey` - `String` - An unencrypted private key (hex string).
2.  `password` - `String` - The password of the account.

### Returns

`Promise<string>` - The address of the account.

### Example

``` javascript
rsk3.personal.importRawKey("cd3376bb711cb332ee3fb2ca04c6a8b9f70c316fcdf7a1f44ef4c7999483295e", "password1234")
.then(console.log);
> "0x8f337bf484b2fc75e4b0436645dcc226ee2ac531"
```

------------------------------------------------------------------------
