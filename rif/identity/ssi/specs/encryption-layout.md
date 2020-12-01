---
layout: rif-identity
---

# Encryption layout

### Storing and recovering encrypted information

This protocol allows each persona of a RIA to use secret-key cryptography to encrypt and decrypt information needing only the the mnemonic phrase.

This protocol is based on [uPort DAF Secret Box implementation](https://github.com/uport-project/daf/blob/master/packages/daf-libsodium/src/secret-box.ts) using [Libsodium authenticated encryption](https://libsodium.gitbook.io/doc/secret-key_cryptography/secretbox).

> Please make use of [this section](../../../definitions) for core concept definitions

The protocol for encryption is:

- Private key calculation
  1. Let the nonce `i` be the nonce index of the persona derivation count ([see persona creation protocol](../identity-layout/#obtain-a-new-persona))
  2. From the RIA seed derive the same nonce, using BIP-44{% include rif-id-ref.html id="9" %} `change = 1` - for example, RSK would use `m/44'/137'/0'/1/i`
  3. Get the private key of the derived account
- Data encryption
  4. Create a random nonce `n` to use for encrypting
  5. Let `cyph` be the Libsodium authenticated encryption of data
- Use `n+cyph` as the cyphertext. It can be used to recover the information using just the mnemonic

### The authenticated encryption operation

- Encrypts a message with a key and a nonce to keep it confidential
- Computes an authentication tag. This tag is used to make sure that the message hasn't been tampered with before decrypting it.

A single key is used both to encrypt/authenticate and verify/decrypt messages.

The nonce doesn't have to be confidential, but it should never ever be reused with the same key.

### uPort implementation

```typescript
async encrypt(message: string): Promise<string> {
  await sodium.ready
  const nonce = sodium.randombytes_buf(sodium.crypto_secretbox_NONCEBYTES)
  const cipherText = sodium.crypto_secretbox_easy(message, nonce, sodium.from_hex(this.secretKey))
  return sodium.to_hex(new Uint8Array([...nonce, ...cipherText]))
}

async decrypt(encryptedMessageHex: string): Promise<string> {
  await sodium.ready
  const cipherTextWithNonce = sodium.from_hex(encryptedMessageHex)
  const nonce = cipherTextWithNonce.slice(0, sodium.crypto_secretbox_NONCEBYTES)
  const cipherText = cipherTextWithNonce.slice(sodium.crypto_secretbox_NONCEBYTES)
  return sodium.to_string(
    sodium.crypto_secretbox_open_easy(cipherText, nonce, sodium.from_hex(this.secretKey)),
  )
}
```

## Implementations

_WIP_
