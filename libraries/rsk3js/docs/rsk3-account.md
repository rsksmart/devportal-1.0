---
layout: rsk
title: rsk3.js
tags: libraries, rsk, rsk3js, javascript, web3js
---



rsk3.account
=================

The `rsk3.account` contains functions to generate Ethereum accounts
and sign transactions and data.

Note

This package got NOT audited until now. Take precautions to clear memory
properly, store the private keys safely, and test transaction receiving
and sending functionality properly before using in production!

``` javascript
import {Accounts} from '@rsksmart/rsk3-accounts';

// Passing in the eth or rsk3 package is necessary to allow retrieving chainId, gasPrice and nonce automatically
// for accounts.signTransaction().
const accounts = new Accounts('ws://localhost:8546', null, options);
```

------------------------------------------------------------------------

create
------

``` javascript
rsk3.account.create([entropy]);
```

Generates an account object with private key and public key. It\'s
different from
`rsk3.personal.newAccount()` which creates an account over the network on the node via an
RPC call.

### Parameters

1.  `entropy` - `String` (optional): A random string to increase
    entropy. If given it should be at least 32 characters. If none is
    given a random string will be generated using
    `randomhex`.

### Returns

`Object` - The account object with the following structure:
 -   `address` - `string`: The account address.
 -   `privateKey` - `string`: The accounts private key. This should
     never be shared or stored unencrypted in localstorage! Also make
     sure to `null` the memory after usage.
 -   `signTransaction(tx [, callback])` - `Function`: The function to
     sign transactions. See
     `rsk3.account.signTransaction()` for more.
 -   `sign(data)` - `Function`: The function to sign transactions. See
     `rsk3.account.sign()` for more.

### Example

``` javascript
rsk3.account.create();
> {
    address: "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01",
    privateKey: "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709",
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}

rsk3.account.create('2435@#@#@±±±±!!!!678543213456764321§34567543213456785432134567');
> {
    address: "0xF2CD2AA0c7926743B1D4310b2BC984a0a453c3d4",
    privateKey: "0xd7325de5c2c1cf0009fac77d3d04a9c004b038883446b065871bc3e831dcd098",
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}

rsk3.account.create(rsk3.utils.randomHex(32));
> {
    address: "0xe78150FaCD36E8EB00291e251424a0515AA1FF05",
    privateKey: "0xcc505ee6067fba3f6fc2050643379e190e087aeffe5d958ab9f2f3ed3800fa4e",
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}
```

------------------------------------------------------------------------

privateKeyToAccount
-------------------

``` javascript
rsk3.account.privateKeyToAccount(privateKey);
```

Creates an account object from a private key.

### Parameters

1.  `privateKey` - `String`: The private key hex string beginning with
    `0x`.

### Returns

`Object` - The account object with the
`structure seen here`.

### Example

``` javascript
rsk3.account.privateKeyToAccount('0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709');
> {
    address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
    privateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709',
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}
```

------------------------------------------------------------------------

signTransaction
---------------

``` javascript
rsk3.account.signTransaction(tx, privateKey [, callback]);
```

Signs an Ethereum transaction with a given private key.

### Parameters

1.
    `tx` - `Object`: The transaction\'s properties object as follows:

    :   -   `nonce` - `String`: (optional) The nonce to use when signing
            this transaction. Default will use
            `rsk3.getTransactionCount()`.
        -   `chainId` - `String`: (optional) The chain id to use when
            signing this transaction. Default will use
            `rsk3.net.getId()`.
        -   `to` - `String`: (optional) The receiver of the transaction,
            can be empty when deploying a contract.
        -   `data` - `String`: (optional) The call data of the
            transaction, can be empty for simple value transfers.
        -   `value` - `String`: (optional) The value of the transaction
            in wei.
        -   `gasPrice` - `String`: (optional) The gas price set by this
            transaction, if empty, it will use
            `rsk3.gasPrice()`
        -   `gas` - `String`: The gas provided by the transaction.

2.  `privateKey` - `String`: The private key to sign with.
3.  `callback` - `Function`: (optional) Optional callback, returns an
    error object as first parameter and the result as second.

### Returns

`Promise` returning `Object`: The signed data RLP encoded transaction, or if `returnSignature` is `true` the signature values as follows:

:   -   `messageHash` - `String`: The hash of the given message.
    -   `r` - `String`: First 32 bytes of the signature
    -   `s` - `String`: Next 32 bytes of the signature
    -   `v` - `String`: Recovery value + 27
    -   `rawTransaction` - `String`: The RLP encoded transaction, ready
        to be send using
        `rsk3.sendSignedTransaction`.
    -   `transactionHash` - `String`: The transaction hash for the RLP
        encoded transaction.

### Example

``` javascript
rsk3.account.signTransaction({
    to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
    value: '1000000000',
    gas: 2000000
}, '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318')
.then(console.log);
> {
    messageHash: '0x88cfbd7e51c7a40540b233cf68b62ad1df3e92462f1c6018d6d67eae0f3b08f5',
    v: '0x25',
    r: '0xc9cf86333bcb065d140032ecaab5d9281bde80f21b9687b3e94161de42d51895',
    s: '0x727a108a0b8d101465414033c3f705a9c7b826e596766046ee1183dbc8aeaa68',
    rawTransaction: '0xf869808504e3b29200831e848094f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008025a0c9cf86333bcb065d140032ecaab5d9281bde80f21b9687b3e94161de42d51895a0727a108a0b8d101465414033c3f705a9c7b826e596766046ee1183dbc8aeaa68',
    transactionHash: '0xde8db924885b0803d2edc335f745b2b8750c8848744905684c20b987443a9593'
}

rsk3.account.signTransaction({
    to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
    value: '1000000000',
    gas: 2000000,
    gasPrice: '234567897654321',
    nonce: 0,
    chainId: 1
}, '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318')
.then(console.log);
> {
    messageHash: '0x6893a6ee8df79b0f5d64a180cd1ef35d030f3e296a5361cf04d02ce720d32ec5',
    r: '0x9ebb6ca057a0535d6186462bc0b465b561c94a295bdb0621fc19208ab149a9c',
    s: '0x440ffd775ce91a833ab410777204d5341a6f9fa91216a6f3ee2c051fea6a0428',
    v: '0x25',
    rawTransaction: '0xf86a8086d55698372431831e848094f0109fc8df283027b6285cc889f5aa624eac1f55843b9aca008025a009ebb6ca057a0535d6186462bc0b465b561c94a295bdb0621fc19208ab149a9ca0440ffd775ce91a833ab410777204d5341a6f9fa91216a6f3ee2c051fea6a0428',
    transactionHash: '0xd8f64a42b57be0d565f385378db2f6bf324ce14a594afc05de90436e9ce01f60'
}
```

------------------------------------------------------------------------

recoverTransaction
------------------

``` javascript
rsk3.account.recoverTransaction(rawTransaction);
```

Recovers the Ethereum address which was used to sign the given RLP
encoded transaction.

### Parameters

1.  `signature` - `String`: The RLP encoded transaction.

### Returns

`String`: The Ethereum address used to sign this transaction.

### Example

``` javascript
rsk3.account.recoverTransaction('0xf86180808401ef364594f0109fc8df283027b6285cc889f5aa624eac1f5580801ca031573280d608f75137e33fc14655f097867d691d5c4c44ebe5ae186070ac3d5ea0524410802cdc025034daefcdfa08e7d2ee3f0b9d9ae184b2001fe0aff07603d9');
> "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55"
```

------------------------------------------------------------------------

hashMessage
-----------

``` javascript
rsk3.account.hashMessage(message);
```

Hashes the given message to be passed
`rsk3.account.recover()` function. The data will be UTF-8 HEX decoded and enveloped
as follows:
`"\x19Ethereum Signed Message:\n" + message.length + message` and hashed
using keccak256.

### Parameters

1.  `message` - `String`: A message to hash, if its HEX it will be UTF8
    decoded before.

### Returns

`String`: The hashed message

### Example

``` javascript
rsk3.account.hashMessage("Hello World")
> "0xa1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2"

// the below results in the same hash
rsk3.account.hashMessage(rsk3.utils.utf8ToHex("Hello World"))
> "0xa1de988600a42c4b4ab089b619297c17d53cffae5d5120d82d8a92d0bb3b78f2"
```

------------------------------------------------------------------------

sign
----

``` javascript
rsk3.account.sign(data, privateKey);
```

Signs arbitrary data. This data is before UTF-8 HEX decoded and
enveloped as follows:
`"\x19Ethereum Signed Message:\n" + message.length + message`.

### Parameters

1.  `data` - `String`: The data to sign. If its a string it will be
2.  `privateKey` - `String`: The private key to sign with.

### Returns

`Object`: The signed data RLP encoded signature, or if `returnSignature` is `true` the signature values as follows:

:   -   `message` - `String`: The the given message.
    -   `messageHash` - `String`: The hash of the given message.
    -   `r` - `String`: First 32 bytes of the signature
    -   `s` - `String`: Next 32 bytes of the signature
    -   `v` - `String`: Recovery value + 27

### Example

``` javascript
rsk3.account.sign('Some data', '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318');
> {
    message: 'Some data',
    messageHash: '0x1da44b586eb0729ff70a73c326926f6ed5a25f5b056e7f47fbc6e58d86871655',
    v: '0x1c',
    r: '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd',
    s: '0x6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a029',
    signature: '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a0291c'
}
```

------------------------------------------------------------------------

recover
-------

``` javascript
rsk3.account.recover(signatureObject);
rsk3.account.recover(message, signature [, preFixed]);
rsk3.account.recover(message, v, r, s [, preFixed]);
```

Recovers the Ethereum address which was used to sign the given data.

### Parameters

1.

    `message|signatureObject` - `String|Object`: Either signed message or hash, or the signature object as following values:

    :   -   `messageHash` - `String`: The hash of the given message
            already prefixed with
            `"\x19Ethereum Signed Message:\n" + message.length + message`.
        -   `r` - `String`: First 32 bytes of the signature
        -   `s` - `String`: Next 32 bytes of the signature
        -   `v` - `String`: Recovery value + 27

2.  `signature` - `String`: The raw RLP encoded signature, OR parameter
    2-4 as v, r, s values.
3.  `preFixed` - `Boolean` (optional, default: `false`): If the last
    parameter is `true`, the given message will NOT automatically be
    prefixed with
    `"\x19Ethereum Signed Message:\n" + message.length + message`, and
    assumed to be already prefixed.

### Returns

`String`: The Ethereum address used to sign this data.

### Example

``` javascript
rsk3.account.recover({
    messageHash: '0x1da44b586eb0729ff70a73c326926f6ed5a25f5b056e7f47fbc6e58d86871655',
    v: '0x1c',
    r: '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd',
    s: '0x6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a029'
})
> "0x2c7536E3605D9C16a7a3D7b1898e529396a65c23"

// message, signature
rsk3.account.recover('Some data', '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a0291c');
> "0x2c7536E3605D9C16a7a3D7b1898e529396a65c23"

// message, v, r, s
rsk3.account.recover('Some data', '0x1c', '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd', '0x6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a029');
> "0x2c7536E3605D9C16a7a3D7b1898e529396a65c23"
```

------------------------------------------------------------------------

encrypt
-------

``` javascript
rsk3.account.encrypt(privateKey, password);
```

Encrypts a private key to the rsk3 keystore v3 standard.

### Parameters

1.  `privateKey` - `String`: The private key to encrypt.
2.  `password` - `String`: The password used for encryption.

### Returns

`Object`: The encrypted keystore v3 JSON.

### Example

``` javascript
rsk3.account.encrypt('0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318', 'test!')
> {
    version: 3,
    id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
    address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
    crypto: {
        ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
        cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
            dklen: 32,
            salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10',
            n: 262144,
            r: 8,
            p: 1
        },
        mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
    }
}
```

------------------------------------------------------------------------

decrypt
-------

``` javascript
rsk3.account.decrypt(keystoreJsonV3, password);
```

Decrypts a keystore v3 JSON, and creates the account.

### Parameters

1.  `keystoreJsonV3` - `String`: The encrypted keystore v3 JSON.
2.  `password` - `String`: The password used for encryption.

### Returns

`Object`: The decrypted account.

### Example

``` javascript
rsk3.account.decrypt({
    version: 3,
    id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
    address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
    crypto: {
        ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
        cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
            dklen: 32,
            salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10',
            n: 262144,
            r: 8,
            p: 1
        },
        mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
    }
}, 'test!');
> {
    address: "0x2c7536E3605D9C16a7a3D7b1898e529396a65c23",
    privateKey: "0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318",
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}
```

wallet
------

``` javascript
rsk3.account.wallet;
```

Contains an in memory wallet with multiple accounts. These accounts can
be used when using
`rsk3.sendTransaction()`.

### Example

``` javascript
rsk3.account.wallet;
> Wallet {
    0: {...}, // account by index
    "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55": {...},  // same account by address
    "0xf0109fc8df283027b6285cc889f5aa624eac1f55": {...},  // same account by address lowercase
    1: {...},
    "0xD0122fC8DF283027b6285cc889F5aA624EaC1d23": {...},
    "0xd0122fc8df283027b6285cc889f5aa624eac1d23": {...},

    add: function(){},
    remove: function(){},
    save: function(){},
    load: function(){},
    clear: function(){},

    length: 2,
}
```

------------------------------------------------------------------------

wallet.create
-------------

``` javascript
rsk3.account.wallet.create(numberOfAccounts [, entropy]);
```

Generates one or more accounts in the wallet. If wallets already exist
they will not be overridden.

### Parameters

1.  `numberOfAccounts` - `Number`: Number of accounts to create. Leave
    empty to create an empty wallet.
2.  `entropy` - `String` (optional): A string with random characters as
    additional entropy when generating accounts. If given it should be
    at least 32 characters.

### Returns

`Object`: The wallet object.

### Example

``` javascript
rsk3.account.wallet.create(2, '54674321§3456764321§345674321§3453647544±±±§±±±!!!43534534534534');
> Wallet {
    0: {...},
    "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55": {...},
    "0xf0109fc8df283027b6285cc889f5aa624eac1f55": {...},
    ...
}
```

------------------------------------------------------------------------

wallet.add
----------

``` javascript
rsk3.account.wallet.add(account);
```

Adds an account using a private key or account object to the wallet.

### Parameters

1.  `account` - `String|Object`: A private key or account object created
    with
    `rsk3.account.create()`.

### Returns

`Object`: The added account.

### Example

``` javascript
rsk3.account.wallet.add('0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318');
> {
    index: 0,
    address: '0x2c7536E3605D9C16a7a3D7b1898e529396a65c23',
    privateKey: '0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318',
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}

rsk3.account.wallet.add({
    privateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709',
    address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01'
});
> {
    index: 0,
    address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
    privateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709',
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}
```

------------------------------------------------------------------------

wallet.remove
-------------

``` javascript
rsk3.account.wallet.remove(account);
```

Removes an account from the wallet.

### Parameters

1.  `account` - `String|Number`: The account address, or index in the
    wallet.

### Returns

`Boolean`: `true` if the wallet was removed. `false` if it couldn\'t be
found.

### Example

``` javascript
rsk3.account.wallet;
> Wallet {
    0: {...},
    "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55": {...}
    1: {...},
    "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01": {...}
    ...
}

rsk3.account.wallet.remove('0xF0109fC8DF283027b6285cc889F5aA624EaC1F55');
> true

rsk3.account.wallet.remove(3);
> false
```

------------------------------------------------------------------------

wallet.clear
------------

``` javascript
rsk3.account.wallet.clear();
```

Securely empties the wallet and removes all its accounts.

### Parameters

none

### Returns

`Object`: The wallet object.

### Example

``` javascript
rsk3.account.wallet.clear();
> Wallet {
    add: function(){},
    remove: function(){},
    save: function(){},
    load: function(){},
    clear: function(){},

    length: 0
}
```

------------------------------------------------------------------------

wallet.encrypt
--------------

``` javascript
rsk3.account.wallet.encrypt(password);
```

Encrypts all wallet accounts to an array of encrypted keystore v3
objects.

### Parameters

1.  `password` - `String`: The password which will be used for
    encryption.

### Returns

`Array`: The encrypted keystore v3.

### Example

``` javascript
rsk3.account.wallet.encrypt('test');
> [ { version: 3,
    id: 'dcf8ab05-a314-4e37-b972-bf9b86f91372',
    address: '06f702337909c06c82b09b7a22f0a2f0855d1f68',
    crypto:
     { ciphertext: '0de804dc63940820f6b3334e5a4bfc8214e27fb30bb7e9b7b74b25cd7eb5c604',
       cipherparams: [Object],
       cipher: 'aes-128-ctr',
       kdf: 'scrypt',
       kdfparams: [Object],
       mac: 'b2aac1485bd6ee1928665642bf8eae9ddfbc039c3a673658933d320bac6952e3' } },
  { version: 3,
    id: '9e1c7d24-b919-4428-b10e-0f3ef79f7cf0',
    address: 'b5d89661b59a9af0b34f58d19138baa2de48baaf',
    crypto:
     { ciphertext: 'd705ebed2a136d9e4db7e5ae70ed1f69d6a57370d5fbe06281eb07615f404410',
       cipherparams: [Object],
       cipher: 'aes-128-ctr',
       kdf: 'scrypt',
       kdfparams: [Object],
       mac: 'af9eca5eb01b0f70e909f824f0e7cdb90c350a802f04a9f6afe056602b92272b' } }
]
```

------------------------------------------------------------------------

wallet.decrypt
--------------

``` javascript
rsk3.account.wallet.decrypt(keystoreArray, password);
```

Decrypts keystore v3 objects.

### Parameters

1.  `keystoreArray` - `Array`: The encrypted keystore v3 objects to
    decrypt.
2.  `password` - `String`: The password which will be used for
    encryption.

### Returns

`Object`: The wallet object.

### Example

``` javascript
rsk3.account.wallet.decrypt([
  { version: 3,
  id: '83191a81-aaca-451f-b63d-0c5f3b849289',
  address: '06f702337909c06c82b09b7a22f0a2f0855d1f68',
  crypto:
   { ciphertext: '7d34deae112841fba86e3e6cf08f5398dda323a8e4d29332621534e2c4069e8d',
     cipherparams: { iv: '497f4d26997a84d570778eae874b2333' },
     cipher: 'aes-128-ctr',
     kdf: 'scrypt',
     kdfparams:
      { dklen: 32,
        salt: '208dd732a27aa4803bb760228dff18515d5313fd085bbce60594a3919ae2d88d',
        n: 262144,
        r: 8,
        p: 1 },
     mac: '0062a853de302513c57bfe3108ab493733034bf3cb313326f42cf26ea2619cf9' } },
   { version: 3,
  id: '7d6b91fa-3611-407b-b16b-396efb28f97e',
  address: 'b5d89661b59a9af0b34f58d19138baa2de48baaf',
  crypto:
   { ciphertext: 'cb9712d1982ff89f571fa5dbef447f14b7e5f142232bd2a913aac833730eeb43',
     cipherparams: { iv: '8cccb91cb84e435437f7282ec2ffd2db' },
     cipher: 'aes-128-ctr',
     kdf: 'scrypt',
     kdfparams:
      { dklen: 32,
        salt: '08ba6736363c5586434cd5b895e6fe41ea7db4785bd9b901dedce77a1514e8b8',
        n: 262144,
        r: 8,
        p: 1 },
     mac: 'd2eb068b37e2df55f56fa97a2bf4f55e072bef0dd703bfd917717d9dc54510f0' } }
], 'test');
> Wallet {
    0: {...},
    1: {...},
    "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55": {...},
    "0xD0122fC8DF283027b6285cc889F5aA624EaC1d23": {...}
    ...
}
```

------------------------------------------------------------------------

wallet.save
-----------

``` javascript
rsk3.account.wallet.save(password [, keyName]);
```

Stores the wallet encrypted and as string in local storage.

Note

Browser only.

### Parameters

1.  `password` - `String`: The password to encrypt the wallet.
2.  `keyName` - `String`: (optional) The key used for the local storage
    position, defaults to `"rsk3js_wallet"`.

### Returns

`Boolean`

### Example

``` javascript
rsk3.account.wallet.save('test#!$');
> true
```

------------------------------------------------------------------------

wallet.load
-----------

``` javascript
rsk3.account.wallet.load(password [, keyName]);
```

Loads a wallet from local storage and decrypts it.

Note

Browser only.

### Parameters

1.  `password` - `String`: The password to decrypt the wallet.
2.  `keyName` - `String`: (optional) The key used for the localstorage
    position, defaults to `"rsk3js_wallet"`.

### Returns

`Object`: The wallet object.

### Example

``` javascript
rsk3.account.wallet.load('test#!$', 'myWalletKey');
> Wallet {
    0: {...},
    1: {...},
    "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55": {...},
    "0xD0122fC8DF283027b6285cc889F5aA624EaC1d23": {...}
    ...
}
```
