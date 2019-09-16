---
layout: rsk
title: Wallet API
---
## What is it for?
THe RSK Key Management System library is to assist developers to easily interact with the RSK blockchain and its ecosystem. The goal is to build a general-purpose library around the core functionalities of the RSK blockchain.

## Feature Highlights
* Keep your private keys in your client, safe and sound
* Import and export JSON wallets 
* Import and export BIP 39 mnemonic phrases (12 word backup phrases) and HD Wallets 
* Meta-classes create JavaScript objects from any contract ABI, including ABIv2 and Human-Readable ABI
* Connect to RSK nodes over JSON-RPC
* Complete functionality for all your RSK needs
* Comprehensive documentation
* Large collection of test cases which are maintained and added to
* Fully Open Sourced

## 3 Layer Architecture
The RSK Key Management System library is built with a 3 layer architecture. 
* The Base Layer enableds wallet(private keys) to be stored in secure enclave and hardware device. It also provides ways to store, protect, access and recovery wallets.
* The Middle Layer provides API Interpreter for all typical actions, including transactions, smart contract operations, sign/verify messages, as well as common utilities. The Middle Layer sends request to base layer for verification and signing.
* The Top Layer provides API Interfaces to popular programming languages (JS, Python, etc) and also connects to provider handlers.

<div><img width="100%" src="https://files.readme.io/2581075-1.png"/></div>

#### RSK Key Management Base Layer Architecture
<div><img width="100%" src="https://files.readme.io/a97a16b-2.png"/></div>

The RSK Key Management base layer consists of a secure environment with the protocol and processes for accessing the RSK Wallet for: private key seed generation, key storage, protection, import, export, and recovery, in addition to key signing and signature verification. The base layer is directly accessed through the Middle and indirectly through the Top Layer.

It will extend itself in the future to support multiple hardware wallets used for a single multi-signature keyset, for example the creation of 2of3 multisig keysets using 3 ledger wallets. 

It will also extend itself in the future to support key derivation for various RSK/RIF services offered, including Single Sign-on, RNS, Encryption & Private communication and so on.

#### RSK Key Management Mid Layer Architecture
<div><img width="100%" src="https://files.readme.io/a6d3214-3.png"/></div>

The RSK Key Management Mid Layer role in key management is to be the gatekeeper of knowledge and interaction with the Base Layer for processing requests, events and actions that require signature verification, signing, transaction, smart contract operation, along with requesting  storage, importing, and recovery of keys. It also provides modules for ABI (Application Binary Interface) Coding for working with smart contracts, along with Utilities which allow for a range of common functions required for dapps, processing input from users and formatting data.

The API Interpreter provides an interface between the Base and Top Layers to communicate requests and return their outputs seamlessly, enabling top layer dapps, browsers and applications to interact with the processes. 

###### Wallet Processes & Mid Layer API’s
* New Wallet
    * Import
        * fromEncryptedJson
        * fromMnemonic
            * BIP-039+BIP-044 wallet derived path using a wordlist
    * Export
* Connect (provider)
* getBalance

###### Transaction 
* getTransactionCount
* estimateGas
* sendTransaction

###### Signing

* Developers want users to sign messages using solidity validation, client code to sign a message, client **code** to call solidity validation. Ref on Security for Signing and Verifying Signatures: https://dzone.com/articles/signing-and-verifying-ethereum-signatures
	
* signMessage (message)

* sign (transaction)
    * to, gasLimit, gasPrice, nonce, data, value, chainId
    * Nonces: Signed messages should contain a nonce of some kind to mitigate against replay attacks.

* Ecrecover (based on https://github.com/sogoiii/ecrecover-example) 
    * Solidity provides a globally available method ecrecover that returns an address. If the return address is the same as the signer, then the signature is real.
    * recoverAddr(bytes32 msgHash, uint8 v, bytes32 r, bytes32 s
        * returns (address)
    * isSigned(address _addr, bytes32 msgHash, uint8 v, bytes32 r, bytes32 s) returns (bool)
        * return ecrecover(msgHash, v, r, s) == _addr;

* SigningKey
    * SigningKey(priv Key)
        * Create a new SigningKey and compute corresponding pubkey & address
    * Address
    * privateKey
    * publicKey
    * signDigest (messageDigest)
    * ComputeSharedSecret
        * Compute ECDH shared secret from the keys pKey and publicOrPrivateKey (good practice: hash this value before using it as a key)
* Prototyping
    * address
    * privateKey
    * provider
    * mnemonic
    * mnemonic-path (mnemonic path for a wallet)

###### Contract Operators
* Create & Deploy a Contract
* Connect to Existing Contracts
* View existing contract details
* Contract Event Filters
* Overrides
* Event Emitters (Naming, Objects, Configuration)
* Types (Bytes, Integers, Strings, Structs)
* Filtering Events
* Application Binary Interface (ABI)

###### Utilities
* Addresses
* Arrayish
* Big Numbers
* Byte32 Strings
* Constants
* Cryptographic Functions
    * Elliptic Curve, Hash Functions & Helpers, Key Derivation, Random, Solidity
* Strings
* Hex Strings (eg. toHex)
* UTF-8 Strings
* Transactions: Serialize a transaction & Parse a serialized transaction


###### ABI Coder
* Create ABI Coder & Interface 
    * encode & decode 
* Interface (abi)
    * Return new instance and populate properties with ABI constructor, methods and events.  The abi can be a JSON string or parsed JSON object.
* deployFunction
* Events
    * An object of all the events available in the ABI
* Functions 
    * An object of all the functions available in the ABI

###### RSK Key Management Top Layer Architecture

<div><img width="100%" src="https://files.readme.io/632fe47-4.png"/></div>

The RSK Key Management Top Layer provides Account Management interfaces, API interfaces (Python, JS) and Provider handler to interact with RSK provider networks (Local, Public, and 3rd party operated).

* Account Manager
* API Interfaces
    * Javascript Top level interfaces (Below are some starters, more TBD)

Function  | Description
--------- |  ----------
create_wallet | Create a wallet with a label & master encrypted passphrase choose between using a hardware wallet, generating keystore file or a mnemonic phrase. <br><br>Example:<br>`create_wallet myWallet_label -pass (prompted to enter password)` <br>`create_wallet myWallet_label -mnemonic “.... ….”`
set_wallet_label | Sets the local wallet label to a new label.<br><br>Usage:<br> `set_wallet_label myWallet myDeveloperWallet`
import_wallet | Import existing wallet’s accounts as a new Wallet using a private key or encrypted JSON keystore<br><br>Usage:<br> `import_wallet MyWallet1 -json mywallet1.json NewEncryptedPass (prompted to enter the old encrypted password)`
recover_wallet_mnemonic | **Recover** a wallet using a mnemonic phrase
create_new_account | Example:<br> `create_new_account MyWallet1 [label_new_account]`<br><br>Output: <br>`New account created 0x……. with label Account1 for wallet MyWallet1`
export | Export the keyset for a wallet
get_dev_coins [RIF or RBTC] | Quickly get rBTC or RIF testnet funds from faucets. (Only works if you are connected to RSK-Testnet. )<br><br>Usage: <br>`get_dev_coins RIF MyWallet1 Account1`<br>Output: `Account1 in MyWallet1 has received 100 RIF tokens`
contract_create | Creates a new contract instance with all methods and events defined in the interface <br><br>Usage:<br>`contract_create(Interface, address, options)`
contract_method | Create a transaction object for a method that can be called, sent, estimated
ttcontract_event_subscribe_once | Subscribes to an event only once
contract_event_subscribe | Subscribes to an event
contract_allevents | Receives all events from this smart contract, or filter events.
contract_pastevents | Gets past events for this contract.
view_accounts | Show accounts for existing wallet using a variety of methods [ hardware, web3, private key, keystore, mnemonic]<br><br>Usage:<br>`view_accounts MyWallet1 <encrypted_passphrase>`
get_balance | Get balance of accounts in a wallet, or specify a specific account <br><br>Usage:<br>`get_balance MyWallet1` or `get_balance MyWallet1 0xAccountInfo`
pay, payment | to, amount, account from, fee
paytomany | Pay to many
signMsg, signTx | Signing of messages or transactions<br><br>Usage:<br>`signTx(tx, privatekey, callback)`
check_tx_status | Check the transaction status of a txID
build_tx | build_tx (account, amount, gas, nonce, gasPrice, data)
send_tx | Sends a signed transaction<br><br>Usage:<br>`sendtx(0x + hex_string)`

Additional Considerations:
Crowdfunding 
Batch Payments
Additional Multicurrency Addresses

The above example interfaces aim at being sufficient to allow a developer to connect to a provider, create or import a wallet, build a smart contract, receive faucet tokens, sign a transaction, and send a transaction, which would in effect deploy the contract. These can be expanded upon and should be.

#### Additional tools:
* python-rsk library
* Provider Handlers
    * These handlers ease the connection process and data passing between the RSK Public or local node networks and the mid and base layer processes.

#### RSK Providers
The RSK Providers are the Networks themselves, consisting of node operators, federation members and miners that support the operation of the RSK networks. It also includes locally run nodes, public nodes, test networks, explorers, 3rd party wallets, and faucets.
