---
layout: rsk
title: Creating a Smart Wallet
tags: rif, enveloping, rsk, gas station network, gsn, defi, develop
---

## Create a Smart Wallet

As mentioned before, the moment we need to use the Enveloping system, we have to deploy a Smart Wallet (SW).

1. **Use your address to deploy a Smart Wallet (SW)**
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

2. **Get your SW address**
```typescript
const swAddress = rProvider.calculateSmartWalletAddress(
factory.address,gaslessAccount.address, recoverer, customLogic, walletIndex, bytecodeHash)
//Using the same parameters as when SW was created.
```

## Changelog

### V2

* In V2 the Relay Hub contract doesn't receive payments, the payment for the service (in tokens) is paid directly to the worker relaying the transaction on behalf of the user.
* Paymaster verifications are now done off-chain to optimize gas costs, thus the paymasters are now called Verifiers and they are not part of the on-chain relay flow nor they handle payments at all.
* Gas cost optimization
* Security issues fixed.
