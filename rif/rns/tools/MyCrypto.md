---
layout: rsk
title: MyCrypto
tags: rif, rns, rif-name-service, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

MyCrypto is an open-source, client-side tool for generating ether wallets, handling ERC-20 tokens, and interacting with the blockchain more easily.

There are two platforms to access MyCrypto, both with almost the same functionalities: the web app and the desktop app. There are more ways to access a wallet via desktop app, for example using a mnemonic or a private key.

MyCrypto has a _Contracts_ tab, where you can find some existing contracts loads, and other contracts can be instanced. We are going to use this functionality to get a domain on RNS registry.

There are two ways to access a contract:
- If the contract is listed, just select it and access to it
- Otherwise you may need the contract address and the ABI (interface), which is given [here] for all mentioned contracts.

## Register a domain

A domain is composed by a label and the .rsk suffix (top level domain). For example: `nakamoto.rsk`, where `nakamoto` is the label.

When `sha3` or `namehash` evaluations are asked, go [here]() to interact with the tools and get the requested value.

When `sha3` is asked for a label, you **should not** evaluate it with .rsk suffix. But when asked for `namehash` you **must** add .rsk suffix.

**Remember:** 1 RIF token equals to 10^18 = 1000000000000000000 RIFi. Any time a token value is required you have to express it in **RIFi**. For example: 2.5 tokens = 2500000000000000000

1. Access MyCrypto contracts tab
    Do it via [web](https://mycrypto.com) or download the [desktop app](https://downloads.mycrypto.com). You can do it [getting the code](https://github.com/MyCryptoHQ/MyCrypto) too.
    Got to _Contracts_ tab.

2. Get bid data for a name
    In Registrar contract, in _Read / Write Contract_ select `shaBid` function. Complete with the following:
    - `hash`: the sha3 hash of the label you want to bid to (without .rsk suffix).
    - `owner`: owner's address, case winning the auction.
    - `value`: amount of RIFi token to bid.
    - `salt`: any number.

    Save the result (a hex value), and `value` and `salt` values!

3. Create the bid
    In Registrar contract, select `newBid` function. Complete with the following:
    - `sealedBid`: the result obtained in step 2.
    - `tokenQuantity`: the same token value set in step.

    Send the transaction and wait until confirmed.

    After this step, it is necessary to wait until revealing bid time starts. Bid time lasts 3 (three) days.

4. Create the bid

    There are two ways to create a bid. Since the RIF Token is ERC677 compliant, which is ERC20 compatible, we can use both flows, the ERC20 `approve` and then call or the `approveAndCall` method provided by the ERC677 interface.

    **ERC20**
    In the RIF Token contract, select the `approve` method. Complete the parameters:
    - `spender`: the Registrar address
    - `value`: the same token value set in step 2

    Once the transaction is confirmed. In Registrar contract, select `newBid` function. Complete with the following:
    - `sealedBid`: the result obtained in step 3.
    - `tokenQuantity`: the same amount approved before.

    **ERC677**
    In the RIF Token contract, select the `approveAndCall` method. Complete the parameters:
    - `to`: the Registrar address
    - `value`: the same token value set in step 2
    - `data`: the text "0x1413151f" (signature of the `newBidWithToken` method) followed by the result from step 2 **without** the initial "0x"

    Send the transaction and wait until confirmed.

    After this step, it is necessary to wait until revealing bid time starts. Bid time lasts 3 (three) days.

5. Unseal the bid
    In Registrar contract select `unsealBid` function and fill with the following parameters:
    - `_hash`: sha3 of the label.
    - `_value`: step 3. `value`.
    - `_salt`: step 3. `salt`.

    Send transaction and wait until confirmed.

    After this step, it is necessary to wait until revealing bid time ends. This time lasts 2 (two) days.

    Past this 2 days, the owner of the account is owner of the domain!

6. Finalize the auction:

    In case of winning the auction, in Registrar contract  select `finalizeAction` function and fill with the following parameter:
        - `_hash`: sha3 of the label.

    Send transaction and wait until confirmed.

7. Set a resolver for the domain

    In Registry contract, select `setResolver` function. Set parameters:
    - `node`: the namehash of the domain you want to bid to.
    - `resolverAddress`: the Resolver contract address, used in step 2.

    Send transaction and wait until confirmed.

8. In the Resolver contract access `setAddr` function. Set parameters:

    - `node`: step 7. namehash result.
    - `addrValue`: the address that will resolve the domain label.

    Send transaction and wait until confirmed.


**Verification:**

From Resolver contract, access to `addr` function. Set parameters:
    - `node`: the result of applying `namehash` function.

Read the result and check it is equal to the address set in step 9.

### Alternatives:

Have a look at [RIF Token](/rif/token) section

## Registring a subdomain

A subdomain is conformed by a label preiexed to a full domain, separated by a '.'. For example: `satoshi.nakamoto.rsk`, where `satoshi` is the subdomain label.

To register a subdomain you must do it form the domain's owner account.

1. In Registry contract access to `setSubnodeOwner` function. Set parameters:
    - `node`: the namehash of the domain (including .rsk).
    - `label`: sha3 of the subdomain label to register.
    - `ownerAddress`: the address that will own this subdomain.

    Send transaction and wait until confirmed.

2. Select `setResolver` function. Set parameters:
    - `node`: the namehash of the domain.
    - `resolverAddress`: the Resolver contract address.

    Send transaction and wait until confirmed.

3. Select `setAddr` function. Set parameters:
    - `node`: the namehash of the domain.
    - `addrValue`: the address that will resolve the subdomain label.

    Send transaction and wait until confirmed.

**Verification:**

From Resolver contract, access to `addr` function. Set parameters:
    - `node`: the namehash of the domain.

Check if the result is equal to the address set in step 3.


## Renewing domain rent

after 9 months of auction's end (`finalizeAuction`) , within the next 3 months, the domain owner should renew the rent of that name.

1. In Registrar contract access `entries` function. Set parameters:
    - `_hash`: sha3 of the domain label.

Read the result and copy/save `address` result. This is the address of your deed contract.

2. Just as in the bid creation, there are two ways of paying rent.

    **ERC20**
    In the RIF Token contract, select the `approve` method. Complete the parameters:
    - `spender`: the Registrar address.
    - `value`: 1 token.

    In the Registrar contract, select `payRentWithToken`. Set parameters:
    - `_from`: the deed address, got from step 1.
    - `_rent`: 1 token.
    - `_hash`: sha3 of the domain label.

    **ERC677**
    In the RIF Token contract, select the `approveAndCall` method. Complete the parameters:
    - `to`: the Registrar address
    - `value`: the same token value set in step 2
    - `data`: the text "0xe1ac9915" (signature of the `payRentWithToken` method) followed by the sha3 of the domain label **without** the initial "0x"

    Send the transaction and wait until confirmed.
