---
menu_title: The Convey service
title: The Convey service
# menu_order: 600
layout: rsk
tags: rif, rif-identity, libraries, DID, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

# Convey service

### Transport content that does not fit into a QR code

A very common functionality nowadays is to allow the user to present their credentials using QR codes. Verifiable credentials can use much space and make the code unable to be displayed on phone screens or scanned by cameras. With that motivation, this protocol is designed to allow transporting a message between two parties, with a third party in the form of a relayer.

Alice: wants to share a file with Bob showing a QR code  
Bob: wants to read the file using a QR code scanner  
Convey service: cachés and publishes files into IPFS  

Send a message:

1. Alice encrypts (symmetric) the file and saves the secret key
2. Alice sends the encrypted file to the Convey service
3. The Convey service receives the file and stores it in IPFS, cachés a copy, and sends the CID (content identifier) of the file to _Alice_
4. Alice receives the CID and verifies it, comparing with the expected CID
5. Alice gets CID and shares a QR with Bob containing the uri `convey://v1/QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A#secretKey`
6. Alice shows a QR code for this URI

Resolve a message:

1. Bob scans the QR and gets the URI. Bob received the encrypted file's CID and the decryption key.
2. Bob resolves the URI and gets the encrypted file
    ```
    If the Convey service is known by Bob
        Bob requests file to the Convey service
        If Convey service responses the file content
            Bob has the encrypted file => done.
    Bob requests file to IPFS
    If IPFS responses the file content
        Bob has the encrypted file => done.
    Otherwise
        Bob could not find the file => reject.
    ```
3. Bob compares the encrypted file CID with the received CID
4. Bob decrypts the encrypted file with the received key

> Alice and Bob must know what encryption algorithm was used to encrypt the file

Remarks:

- CIDs are hashes of files. Sharing the CID results in message **integrity**.
- QR codes are scanned by proximity. Sharing an encryption key via QR is **secure** and messages can be considered **private**.

Future versions might:

- Use different storage providers
- Enable to share more than one file at the same time
