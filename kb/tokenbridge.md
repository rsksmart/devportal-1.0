---
title: 'RSK Token Bridge Troubleshooting Guide'
description: 'Having issues crossing your tokens on the token bridge? See the troubleshooting guide for help.'
tags: knowledge-base, tokenbridge, blockchain, developers, tokens
layout: 'rsk'
---

See the [Token Bridge FAQs](https://developers.rsk.co/tools/tokenbridge/faq/)

Visit the [Mainnet Token Bridge](https://tokenbridge.rsk.co/) or the [Testnet Token Bridge](https://testnet.tokenbridge.rsk.co/)

1 - **More than 24 hours and I didn't get my funds**

**Network:** ETH to RSK

**When:** Current Block - Transaction Block Number < 5760

**Answer:** 24 hours is an approximation, it's not fixed. Wait some time until 5760 blocks have past since the transaction block number, plus 5 minutes. 


2 - **More than 24 hours and I didn't get my funds**

**Network:** ETH to RSK

**When:** Current Block - Transaction Block Number > 5760

**Answer:**  Look in [https://explorer.rsk.co/](https://explorer.rsk.co/) the SAME ADDRESS used to send the transaction on the other network. If you don't see the correct balance in the tokens tab, please share your Transaction Hash.

3 - **More than 24 hours and I didn't get my funds**

**Network:** RSK to ETH

**When:** Current Block - Transaction Block Number < 2880

**Answer:**  24 hours is an approximation, it's not fixed. Wait until 2880 blocks have past since the transaction block number, plus 5 minutes.

4 - **More than 24 hours and I didn't get my funds**

**Network:** RSK to ETH

**When:** Current Block - Transaction Block Number > 2880

**Answer:**  Look in [https://etherscan.io/](https://etherscan.io/) the SAME ADDRESS used to send the transaction on the other network. If you don't see the correct token balance, please share your Transaction Hash. Ethereum network can get congested and transaction may take longer than usual if this happens.

5 - **I don't see my funds in Liquality after using the Token Bridge**

**Network:** ETH to RSK

**When:** always

**Answer:**  RSK has a derivation path (m/44’/137’/0’/0) different than ethereum(m/44’/60’/0’/0), Liquality respect this convention. Copy your mnemonic or private key and use Metamask and add RSK as custom network, to get the same address than ethereum.

6 - **I don't see my funds in Liquality after using the Token Bridge**

**Network:** RSK to ETH

**When:** always

**Answer:**  RSK has a derivation path (m/44’/137’/0’/0) different than ethereum(m/44’/60’/0’/0), Liquality respect this convention. Copy your mnemonic or private key and use My Ether Wallet or My Crypto with derivation path m/44’/137’/0’/0 to get the same address than RSK.

7 - **I don't see my funds in Nifty Wallet after using the Token Bridge**

**Network:** ETH to RSK

**When:** always

**Answer:**  RSK has a derivation path (m/44’/137’/0’/0) different than ethereum(m/44’/60’/0’/0),  Nifty Wallet respect this convention. Add RSK as Custom RPC, to get the same address than ethereum, see [https://developers.rsk.co/tutorials/resolve-nifty-issue/](https://developers.rsk.co/tutorials/resolve-nifty-issue/).

8 - **I don't see my funds in Nifty Wallet after using the Token Bridge**

**Network:** RSK to ETH

**When:** always

**Answer:**  RSK has a derivation path (m/44’/137’/0’/0) different than ethereum(m/44’/60’/0’/0), Nifty Wallet respect this convention. Copy your mnemonic or private key and use My Ether Wallet or My Crypto with derivation path m/44’/137’/0’/0 to get the same address than RSK.

9 - **Does it take 24 hours? can be less time?**

**Network:** Both

**When:** always

**Answer:**  This is for security messures. 24 hours is an aproximation, it's not the exact time. We are working to reduce this time on version 2.

10 - **Can't I choose the address??**

**Network:** Both

**When:** always

**Answer:**  Currenlty it uses the same address  that send the transaction. You'll be able to send to another address in version 2.

11 - **Metamask threw an error**

**Network:** ETH

**When:** always

**Answer:**  This is usually a timeout as the Transaction was not mined on the time expected by Metamask. This does not mean that transaction can still be mined. Please share your Tx Hash to corroborate.

12 - **I don't see my transaction on the Token Bridge list**

**Network:** Both

**When:** always

**Answer:**  The list is stored in local cache, so it's not shared across devices, and its earesed if you clear your browser cookies and temporary files. If this is not the reason why it's not there please let us know. You can be sure than if the transaction is mined the tokens will cross no mather what the list says.