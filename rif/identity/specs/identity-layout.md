---
layout: rsk
---

# Identity layout

### Create and recover identities

As described [here](../../specs/#multi-identity-model) RIF Identity proposes a standard model to enable users store one single secret and obtain multiple public and not associated identities.

Technically, a user is going to save a seed that the wallets will use to create different private keys in a deterministic way. If all the wallets follow the same algorithm to create accounts, any wallet could correctly recover which accounts have been used before.

> Please make use of [this section](../../../definitions) for core concept definitions

So, any user can hold a mnemonic phrase to access their RIF Identity account, and from that account obtain different public Personas.

## Protocols

This article specifies how a wallet should:
- Represent an identity identifier
- Create a new RIA, and obtain the first persona - for new users
- Obtain a new persona - for users that already have a RIA
- Recover all the used personas - for users that already had a RIA when accessing first time to the wallet

> This specification assumes the RIA is used in one single wallet at the same time.

### Represent an identity identifier

Each persona has a public identity identifier. The identifier is used in different protocols such us identity delegation and message authentication. This public identifier is derived from a private key as follows:

1. Let the private key be Secp2556k1 private key
2. Get the Ethereum address of the private key

  > For a given private key (`pr`), the Ethereum address (`A(pr)`) (a 160-bit value) to which it corresponds is defined as the rightmost 160-bits of the Keccak hash of the corresponding ECDSA public key: `A(pr) = [96:255]KEC(ECDSAPUBKEY(pr))`{% include rif-id-ref.html id="8" %}

3. The DID for RSK (Mainnet) is `did:ethr:rsk:A(pr)`, and for RSK Testnet `did:ethr:rsk:testnet:A(pr)`

  > Checksum encoding in the address is not required but must be validated if received


### Create a new RIA, and obtain the first persona

For new users

1. Create a new BIP-39{% include rif-id-ref.html id="4" %} compliant mnemonic phrase - for security reasons we recommend to use at least 12 words
3. Calculate seed from mnemonic phrase
4. Use calculated seed as entropy to create an HD Key following BIP-32{% include rif-id-ref.html id="5" %}
5. Get an HD Key from a derivation path respecting RSKIP-57{% include rif-id-ref.html id="6" %} - RSK MainNet is	`m/44'/137'/0'/0/n` with `n` a nonce to obtain different accounts.
6. Use `n=0` private key as the first persona private key
7. Memoize the last nonce used is `0`

### Obtain a new persona

For users that already have a RIA

1. Let `k` be the last memoized last nonce
2. Obtain the private key using `n=k+1` in the HD Key derived in 5. of identity creation
3. Memoize the last nonce used is `k+1`

### Recover all the used personas

For users that already had a RIA when accessing first time to the wallet.

This protocol is based on BIP-44{% include rif-id-ref.html id="9" %} account discovery, the difference is that the accounts are marked as used also querying information that is not transactions.

1. Follow steps 3. to 5. of _create new RIA_ protocol
2. Let `i` be 0
2. Derive a persona using `n=i`
3. Memoize this persona
4. If the persona was not used, use this persona as the next to be used as new one and the previously derived marked as already used
5. If not, let `i` be `i+1` and go to step 3.

The exact way to detect if an account was used or not is not yet designed. As a first approach we recommend to check if the account has made or received blockchain transactions or crypto-assets. Also check known private or public services that can be used to decide on this.

## Data flow diagrams

![wallet setup](../../../assets/img/ssi/06_wallet_setup.png)

![persona detection](../../../assets/img/ssi/07_persona_detection.png)

## Implementations

- Create mnemonic phrases and get derived seed: [`@rsksmart/rif-id-mnemonic`](https://github.com/rsksmart/rif-identity.js/tree/develop/packages/rif-id-mnemoinc)
- Get HD Key with RSK and RSK Testnet DID from a seed: [`@rsksmart/rif-id-ethr-did`](https://github.com/rsksmart/rif-identity.js/tree/develop/packages/rif-id-ethr-did)
- Derivation memoization: [`@rsksmart/rif-id-daf`](https://github.com/rsksmart/rif-identity.js/tree/develop/packages/rif-id-daf)
