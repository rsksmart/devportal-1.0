---
title: 'RSK Token Bridge Troubleshooting Guide'
description: 'Having issues crossing your tokens on the token bridge? See the troubleshooting guide for help.'
tags: knowledge-base, tokenbridge, blockchain, developers, tokens
layout: 'rsk'
render_features: 'rsk-token-bridge-support'
---

See the [Token Bridge FAQs](https://developers.rsk.co/tools/tokenbridge/faq/)

Visit the [Mainnet Token Bridge](https://tokenbridge.rsk.co/) or the [Testnet Token Bridge](https://testnet.tokenbridge.rsk.co/)

<div class="rsk-token-bridge-support">
  <div class="rsk-token-bridge-support-input-area">
    <div>
      <label>Transaction Hash</label>
      <br />
      <input name="txHash" id="rsk-token-bridge-support-txHash" type="text" />
    </div>
    <div>
      <label>Crossing from</label>
      <br />
      <select name="fromNetwork" id="rsk-token-bridge-support-fromNetwork">
        <option value="ethereum-mainnet">Ethereum to RSK</option>
        <option value="rsk-mainnet">RSK to Ethereum</option>
      </select>
    </div>
    <div>
      <label>Wallet</label>
      <br />
      <select name="walletName" id="rsk-token-bridge-support-walletName">
        <option value="metamask">MetaMask</option>
        <option value="nifty">Nifty</option>
        <option value="liquality">Liquality</option>
      </select>
    </div>
    <div>
      <button id="rsk-token-bridge-support-check-button">Check &hellip;</button>
    </div>
  </div>
  <div class="rsk-token-bridge-support-output-area">
  </div>
</div>

> Note that what follows below are generic troubleshooting queries.
> To see more specific information, use the form above.

1 - **Transferred tokens from Ethereum, and after 24 hours have not received tokens on RSK**

**Network:** ETH to RSK

**When:** Current Block - Transaction Block Number < 5760

**Answer:** 24 hours is an approximation, it is not fixed. Wait until 5760 blocks have past since the transaction block number, plus 5 minutes.

2 - **Transferred tokens from Ethereum, and after 24 hours have not received tokens on RSK**

**Network:** ETH to RSK

**When:** Current Block - Transaction Block Number > 5760

**Answer:**  Look in the [RSK Explorer](https://explorer.rsk.co/) at the SAME ADDRESS on RSK. If you do not see the correct balance in the tokens tab, please share your Transaction Hash in the **#tokenbridge** channel on RSK Open slack (go to [Open Slack Community](https://developers.rsk.co/slack) to join.

3 - **Transferred tokens from RSK, and after 24 hours have not received tokens on Ethereum**

**Network:** RSK to ETH

**When:** Current Block - Transaction Block Number < 2880

**Answer:**  24 hours is an approximation, it is not fixed. Wait until 5760 blocks have past since the transaction block number, plus 5 minutes.

4 - **Transferred tokens from RSK, and after 24 hours have not received tokens on Ethereum**

**Network:** RSK to ETH

**When:** Current Block - Transaction Block Number > 2880

**Answer:**  Look in [Etherscan](https://etherscan.io/) at the SAME ADDRESS on RSK. If you do not see the correct balance in the tokens tab, please share your Transaction Hash in the **#tokenbridge** channel on RSK Open slack (go to [Open Slack Community](https://developers.rsk.co/slack) to join).

5 - **Transferred tokens from Ethereum to RSK, but do not see them in Liquality**

**Network:** ETH to RSK

**When:** always

**Answer:**  RSK has a different derivation path (m/44’/137’/0’/0) from Ethereum (m/44’/60’/0’/0). Liquality respects this convention. Copy your mnemonic or private key and use Metamask and add RSK as custom network, to get the same address as ethereum.

6 - **Transferred tokens from RSK to Ethereum, but do not see them in Liquality**

**Network:** RSK to ETH

**When:** always

**Answer:**  RSK has a different derivation path (m/44’/137’/0’/0) from Ethereum (m/44’/60’/0’/0). Liquality respects this convention. Copy your mnemonic or private key and use My Ether Wallet or My Crypto with the RSK derivation path m/44’/137’/0’/0 to get the same address as RSK.

7 - **Transferred tokens from Ethereum to RSK, but do not see them in Nifty**

**Network:** ETH to RSK

**When:** always

**Answer:**  RSK has a different derivation path (m/44’/137’/0’/0) from Ethereum (m/44’/60’/0’/0). Nifty respects this convention. In Nifty, add RSK as Custom RPC, to get the same address as ethereum, see: [Resolve Nifty Issue](https://developers.rsk.co/tutorials/resolve-nifty-issue/).

8 - **Transferred tokens from RSK to Ethereum, but do not see them in Nifty**

**Network:** RSK to ETH

**When:** always

**Answer:**  RSK has a different derivation path (m/44’/137’/0’/0) from Ethereum (m/44’/60’/0’/0). Nifty respects this convention. Copy your mnemonic or private key and use My Ether Wallet or My Crypto with the RSK derivation path m/44’/137’/0’/0 to get the same address as RSK.

9 - **Why does it take 24 hours? Can it be faster?**

**Network:** Both

**When:** always

**Answer:**  This is for security measures. 24 hours is an approximation, it is not exact. We are working to reduce this time in the next version.

10 - **Why can't I choose the address?**

**Network:** Both

**When:** always

**Answer:**  Currently, it uses the token bridge always sends tokens to the same address on the other blockchain network, and so the sender and the receiver will always have the same address. You will have the option to send to another address in the next version.

11 - **Metamask threw an error**

**Network:** ETH

**When:** always

**Answer:**  This is usually a timeout as the Transaction was not mined on the time expected by Metamask. This does not mean that transaction has not been mined. Please share your Transaction Hash in the **#tokenbridge** channel on RSK Open slack (go to [Open Slack Community](https://developers.rsk.co/slack) to join).

12 - **I don't see my transaction on the Token Bridge list**

**Network:** Both

**When:** always

**Answer:**  The list is stored in local cache, so it’s not shared across devices, and its erased if you clear your browser cookies and temporary files. You can be sure than if the transaction is mined the tokens will cross no matter what the list says. If this is not the reason why it is not there please let us know in the #tokenbridge channel on RSK Open slack (go to [Open Slack Community](https://developers.rsk.co/slack) to join).

13 - **I used the Sovryn Token Bridge**

If you have used `bridge.sovryn.app`,
note that this is **not** the same as the RSK Token Bridge.
To get support, please ask on the
[Sovryn discord group](https://discord.com/channels/729675474665603133/813119624098611260).

14 - **I sent RSK tokens to an Ethereum address**

Note that if you have tokens on the RSK network, such as RIF or RDOC,
including "crossed" tokens such as rUSDT or rDAI,
you **should not** send them to an Ethereum address in a regular transaction.
This **does not** work!
Instead you should use the RSK Token Bridge to cross the tokens
from one blockchain to the other.

If you have done this already,
and sent the tokens to an address that **is not** under your control -
where you **do not have** the private key or the seed phrase -
then you have **burnt** the tokens, and they are not recoverable.
If you have done this already,
and sent the tokens to an address that **is** not under your control -
where you **do have** the private key or the seed phrase -
then you have it may be possible to recover your tokens.
