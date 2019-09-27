---
layout: rsk
title: RPC
---

For this , it is supposed that you have an RSK node running. Be sure your node has enabled personal module in the config file. Method personal.newAccount will be used.

** It's NOT recommended to use RPC personal module on MainNet. Use it only for testing purposes (on TestNet or RegTest).**

There are two simple ways to call RPC methods:

## Using RSK console
There's a interactive console that allows you to send commands to an RSK node, it's just a node.js application that can be downloaded from <a href="https://github.com/rsksmart/utilities/tree/master/console" target="_blank">here</a>.

From the command line, execute node console.js -server HOST:PORT. If everything worked as expected, you should see the RSK command prompt displayed. Run this command with a passphrase that you choose as parameter:

```
RSK > web3.personal.newAccount("passphrase")
```
** Don't forget this passphrase! **

This command generates a new private key and stores it in the key store directory. The key file is encrypted with the given passphrase. Finally, it returns the address of the new account.

You can fetch the existing accounts by running any of this two commands:

```
RSK > web3.personal.listAccounts
RSK > web3.eth.accounts
```
Now, you get an RSK account ready to be used!

## Using JSON RPC
JSON-RPC is a remote procedure call protocol encoded in JSON. We are going to use curl to send the HTTP requests. You can use any other tools, like Postman.

Run this command with the passphrase you chose before as parameter and replace with your node URL (used http://localhost:4444 as an example):

```
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_newAccount","params":["password"],"id":1}' --header "Content-Type:application/json" http://localhost:4444
```
This command generates a new private key and stores it in the key store directory. The key file is encrypted with the given passphrase. It returns the address of the new account. As an example:

```
{"jsonrpc":"2.0","id":1,"result":"0x66248b177197a75501eb999356f811aabd37f38f"}
```

You can fetch the existing accounts by running any of this two commands:
```
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}' --header "Content-Type:application/json" http://localhost:4444
```
```
curl -X POST --data '{"jsonrpc":"2.0","method":"personal_listAccounts","params":[],"id":1}' --header "Content-Type:application/json" http://localhost:4444
```
