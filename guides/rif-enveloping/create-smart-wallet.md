---
layout: rsk
title: Creating a Smart Wallet
tags: rif, enveloping, rsk, gas station network, gsn, defi, develop
---

## Deploy a Smart Wallet

As mentioned before, the moment we need to use the Enveloping system, we have to deploy a Smart Wallet (SW).

1.  **Use your address to deploy a Smart Wallet (SW)**
    ```typescript
      const trxData: EnvelopingTransactionDetails = {
        from: ownerEOA.address,
        to: customLogic,
        data: logicData,
        tokenRecipient: paymaster,
        tokenContract: token.address,
        tokenAmount: '10',
        factory: factory.address,
        recoverer: recoverer,
        index: walletIndex.toString(),
        paymaster: paymaster
      }

      const txHash = relayProvider.deploySmartWallet(trxData)
    ```

2.  **Get your SW address**
    ```typescript
    const swAddress = rProvider.calculateSmartWalletAddress(
    factory.address,gaslessAccount.address, recoverer, customLogic, walletIndex, bytecodeHash)
    //Using the same parameters as when SW was created.
    ```