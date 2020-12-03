---
layout: rsk
---

## Convey service - Public transport layer for JWTs using IPFS

Large contents don't fit in QR codes so this service is designed to receive an encrypted file, store it in IPFS and also store the file in memory. It returns the cid of the stored file and a convey-uri that indicates that this kind of files should be gotten from a convey service implementation

Read the [running guide](../../run) to run the whole project or [browse the open-source repo](https://github.com/rsksmart/rif-identity-services/tree/v0.1.0/services/convey) to run locally (please use tag `v0.1.0`)

Find the protocol specification [here](../../../specs/convey-service).

### Main flows

The Convey service has been built to act as a content relayer in front of IPFS. Let's imagine that _Bob_ wants to share a JWT with _Alice_ through a QR code. If the content is too large, it will not fit in a QR code, so there is where the Convey service acts. It allows to transport and caché files that can be accessed via HTTPS, and provides a tiny URL that can fit in any QR code. The service exposes two main endpoints: POST and GET files. Please refer to the protocol description [here](../../../specs/convey-service) for more details about it.

#### Authentication flow

1. _Bob_ [requests to login](#post-request-auth) to the _**Convey service**_ by sending it's [DID](https://w3c.github.io/did-core/)
2. The _**Convey service**_ responds with a challenge
3. _Bob_ signs a VC with that challenge and send it to the _**Convey service**_ to [authenticate](#post-auth)
4. _**Convey service**_ verifies the received challenge and validates that the signer is the same that _Bob_ provided in _step 1_. If it is ok, it responds with an authentication token
5. _Bob_ saves that authentication token to be used on each interaction with the _**Convey service**_

See the [DID Authentication](../../../specs/did-auth) protocol for more details.

_Example_

```javascript
import axios from 'axios'
import { createVerifiableCredentialJwt } from 'did-jwt-vc'
import RSKEthrDID from '@rsksmart/ethr-did'

const identity = new RSKEthrDID({ 
    address: '0xDe9D2B98E1c23E2765c06C5057723a6c1c453147',
    privateKey: '2f86e57652ee906707d4415105228b4fda7b1b900cfd0871cd5d17277ad084b8'
})

axios.post(`${serviceUrl}/request-auth`, { did: identity.did })
  .then(res => res.status === 200 && !!res.data && res.data.challenge)
  .then(challenge => createVerifiableCredentialJwt({
      vc: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiableCredential'],
        credentialSubject: {
          claims: [
            { claimType: 'challenge', claimValue: challenge }
          ]
        }
      }
    }, identity))
  .then(jwt => axios.post(`${serviceUrl}/auth`, { jwt }))
  .then(res => res.status === 200 && !!res.data && res.data.token)
```

#### Post and share content

1. _Bob_ does the [authentication flow](#authentication-flow)
2. _Bob_ [posts](#post-file) some content (ideally [encrypted](../../../specs/encryption-layout)) to the _**Convey service**_
3. _**Convey service**_ puts it in IPFS and store its CID (associated to the original file) in memory. It responds with the [CID](https://docs.ipfs.io/concepts/content-addressing/) of the saved content and the convey formatted uri (see the [protocol](../../../specs/convey-service))
4. _Bob_ builds a QR code with the received convey formatted uri (and the encryption key in case the content needs to be decrypted) with the format `convey://{CID}#{key}`

_Example_

```javascript
import axios from 'axios'

const content = 'myLargeContent'
const { encrypted, encriptionKey } = encrypt(content)

login()
  .then(token => axios.post(`${serviceUrl}/file`, { file: encrypted }, { headers: { 'Authorization': token }))
  .then(res => res.status === 200 && !!res.data && res.data)
  .then({ cid, url } => generateQr(`${url}#${encriptionKey}`))
```

#### Receive shared content

1. _Alice_ does the [authentication flow](#authentication-flow)
2. _Alice_ scans the QR and receive the convey formatted uri
3. _Alice_ gets the CID and encryption key (if provided) from the received uri and builds and HTTP url as the following: `http://{conveyService}/file/{CID}`
4. _Alice_ tries to [get](#get-file) the content from the _**Convey service**_
5. If found, the _**Convey service**_ will return a JSON with the file. If not found,
  6. the _**Convey service**_ will return an HTTP 404.
  7. _Alice_ will get the file from the IPFS Gateway (`https://{ipfsGateway}/ipfs/{CID}`)
7. The content is encrypted, _Alice_ decrypts it with the key and gets the original file

_Example_

```javascript
import axios from 'axios'

const qrContent = `convey://${cid}#${ecKey}`

const index = 'convey://'.length
const identifier = uri.substring(index)
const [cid, encryptionKey] = identifier.split('#')

login()
  .then(token => axios.get(`${serviceUrl}/file/${cid}`, { headers: { 'Authorization': token }))
  .then(res => res.status === 200 && !!res.data && res.data.file)
  .then(file => decrypt(file, encryptionKey))
  .then(content => console.log(`Decrypted content: ${content}`))
```

### API

#### Authentication

This service uses a simplified version of [`DID Auth protocol`](../../../specs/did-auth)

##### POST /request-auth

Generates a random 64 bytes challenge that is associated to the received DID.
It is part of the implementation of the [DID Authentication](../../../specs/did-auth) protocol

_Parameter_

- `did` - `string` DID that will be associated with the generated challenge.

_Returns_

```javascript
{ challenge: generatedChallenge }
```

_Example with [`Axios`](http://npmjs.com/axios)_

```javascript
import axios from 'axios'

const did = 'did:ethr:rsk:testnet:0x....1234'

axios.post(`${serviceUrl}/request-auth`, { did })
    .then(res => res.status === 200 && !!res.data && res.data.challenge)
    .then(challenge => console.log(`The challenge is: ${challenge}`))
```

##### POST /auth

Verifies challenge and did of the received VC, if it is ok, it emits another VC and responds with the JWT representation of it. It will act as the authentication token.
It is part of the implementation of the [DID Authentication](../../../specs/did-auth) protocol.

_Parameter_

- `jwt` - `jwt` representation of a VC signed by the client with the received challenge. That VC should be signed by the DID sent before and follow this format:
```
vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      claims: [
        { claimType: 'challenge', claimValue: RECEIVED_CHALLENGE }
      ]
    }
  }
```

_Returns_

```javascript
{ token: generatedToken }
```

_Example with [`Axios`](http://npmjs.com/axios) and [`did-jwt-vc`]()_

```javascript
import axios from 'axios'
import { createVerifiableCredentialJwt } from 'did-jwt-vc'

const jwt = await createVerifiableCredentialJwt({
  vc: {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential'],
    credentialSubject: {
      claims: [
        { claimType: 'challenge', claimValue: theReceivedChallenge }
      ]
    }
  }
}, identity) // this identity should be associated to the did sent in /request_auth

axios.post(`${serviceUrl}/auth`, { jwt }))
    .then(res => res.status === 200 && !!res.data && res.data.token)
    .then(token => console.log(`The authentication token is: ${token}`))
```

#### Convey files

Use this API to send and receive files using the convey

##### POST /file

It stores the file in IPFS and then saves in the service memory the original content associated to its IPFS hash (cid)

_Parameter_

- `file` - string content to be saved

_Returns_

```javascript
{
  url: `convey://${cid}`,
  cid: generatedCid
}
```

_Example with [`Axios`](http://npmjs.com/axios)_

```javascript
import axios from 'axios'

const content = 'myLargeContent'
const { encrypted, encriptionKey } = encrypt(content)

const token = thePreviouslyReceivedToken

axios.post(`${serviceUrl}/file`, { file: encrypted }, { headers: { 'Authorization': token }))
    .then(res => res.status === 200 && !!res.data && res.data)
    .then({ cid, url } => console.log(`The Convey uri: ${url}. The CID: ${cid}`))
```

##### GET /file

It looks for the given CID in the service memory and responds with it in case it is found. If not, returns an HTTP 404.

_Parameter_

- `cid` - CID of the desired content

_Returns_

```javascript
{
  file: retrievedFileFromMemory
}
```

_Example with [`Axios`](http://npmjs.com/axios)_

```javascript
import axios from 'axios'

const token = thePreviouslyReceivedToken
const cid = theOneGottenFromTheQr

axios.get(`${serviceUrl}/file/${cid}`, { headers: { 'Authorization': token }))
    .then(res => res.status === 200 && !!res.data && res.data.file)
    .then(file => console.log(`The retrieved file is: ${file}.`))
```

### Possible extensions

- Limit the amount of time the content is saved in memory
- Limit file size

### Run for development

The service source code is hosted in Github, so please refer directly to the [README](https://github.com/rsksmart/rif-identity-services/tree/develop/services/convey) and check there the detailed guide to install and test the service locally or with a Docker container.
