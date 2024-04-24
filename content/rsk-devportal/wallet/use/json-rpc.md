---
layout: rsk
title: Using JSON-RPC - remote procedure call protocol | Rootstock (RSK)
tags: json-rpc, rif, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

In order to use JSON-RPC, you should have an RSK node running. Additionally, ensure that your node has enabled the `personal` module in the config file, as the `personal.newAccount` method will be used.

> It's **not** recommended to use RPC personal module on Mainnet. Use it only for testing purposes (on Testnet or Regtest).

There are two simple ways to call RPC methods:

## Using RSK console

There's a interactive console that allows you to send commands to an RSK node, which is a node.js application that can be downloaded from <a href="https://github.com/rsksmart/utilities/tree/master/console" target="_blank">here</a>.

From the command line, execute `node console.js -server HOST:PORT`. If everything worked as expected, you should see the RSK command prompt displayed. Run this command with a passphrase that you choose as parameter:

```shell
RSK > web3.personal.newAccount("passphrase")
```

> Don't forget this passphrase!

This command generates a new private key and stores it in the key store directory. The key file is encrypted with the given passphrase. Finally, it returns the address of the new account.

You can fetch the existing accounts by running any of this two commands:

```shell
RSK > web3.personal.listAccounts
RSK > web3.eth.accounts
```

Now, you get an RSK account ready for use!

## Using JSON RPC

JSON-RPC is a remote procedure call protocol encoded in JSON. We are going to use curl to send the HTTP requests. You may use any other tool, such as Postman.

Run this command with the passphrase you chose earlier as a parameter and replace with your node URL (for example, `http://localhost:4444`):

```shell
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_newAccount","params":["password"],"id":1}' --header "Content-Type:application/json" http://localhost:4444
```

This command generates a new private key and stores it in the key store directory. The key file is encrypted with the given passphrase. It returns the address of the new account. For example:

```json
{"jsonrpc":"2.0","id":1,"result":"0x66248b177197a75501eb999356f811aabd37f38f"}
```

You can fetch the existing accounts by running either of these two commands:

```shell
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' --header "Content-Type:application/json" http://localhost:4444
```

```shell
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_listAccounts","params":[],"id":1}' --header "Content-Type:application/json" http://localhost:4444
```
