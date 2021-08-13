---
layout: rsk
tags: rlogin, express-did-auth, auth, rif, rif-identity, libraries, DID, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

## Express DID Auth - a challenge-response authentication model based in DIDs

This package is an implementation of the [DID Auth protocol](../../../specs/did-auth). It is designed to be easely integrated to any Express application.

Main features:

- Automatically set up the needed endpoints to fullfil the full protocol specification (signup, auth, refresh token and logout)
- Provides with an auth middleware to protect the desired business related endpoints
- Allows to decide where to send the tokens (cookies, `Authorization` header or request body for _refresh token_)
- Extensibility: it allows to add any specific business logic over the authentication/signup methods
- Deterministic challenge generation
- Limit requests per did per timeslot

### Usage

#### Install
```
npm i @rsksmart/express-did-auth
```

#### Plug and play

This is the simplest approach. Just need to provide an express `app` and the desired configuration for the package and it will create the [needed endpoints](#endpoints) on your behalf.

```typescript
import express from 'express'
import setupApp, { ExpressDidAuthConfig } from '@rsksmart/express-did-auth'

const config: ExpressDidAuthConfig = {
  // your config
}

const app = express()

const authMiddleware = setupApp(config)(app)

app.get('/not-protected', function (req, res) {
  res.send('This endpoint is not authenticating')
})

app.get('/protected', authMiddleware, function (req, res) {
  res.send('This endpoint is authenticating')
})

const port = process.env.PORT || 5000

app.listen(port, () => logger.info(`My express API with did-auth running in ${port}`))
```

#### Configure

All the configuration should be placed in just one object of type `ExpressDidAuthConfig`. That object may contain the following fields:

_REQUIRED_

`challengeSecret: string`: the secret that will be used to generate the deterministic challenge. See [how we create deterministic challenges](../../../specs/did-auth#how-to-calculate-a-deterministic-challenge)

`serviceUrl: string`: will be used as the [`audience`](https://tools.ietf.org/html/rfc7519#section-4.1.3) of all the JWTs expected or emitted by this package. Should be a URI that identifies your service in the context where it is run

`serviceDid: string`: the did controlled by the servie. Will be used to sign JWTs.

`serviceSigner: Signer`: the signing function associated to the `serviceDid`. MUST implement `ES256K` algorithm, please find an example [here](https://github.com/decentralized-identity/did-jwt/blob/c91d38cdd06635b418250048e329c509eab1e6d6/docs/guides/index.md#simplesigner)

_OPTIONAL_

`useCookies: boolean`: determines if the _access token_ and _refresh token_ are saved in cookies or are returned in the body of the response. If `true`, the tokens will be extracted from the cookies. See [how to send tokens](../../../specs/did-auth#how-to-send-tokens) for more information. Please check out this [note about using cookies](#note-about-cookies) if turning on this feature. _Default: false_

`allowMultipleSessions: boolean`: if `useCookies` is `true`, then this flag allow the user to maintain multiple sessions for different dids in the same browser. In order to do that, the user must add the `x-logged-did` header in each request with the desired value, so the service will now which cookie to recover for each request. Please check out this [note about using cookies](#note-about-cookies) if turning on this feature. _Default: false_

`requestSignupPath: string`: the request signup endpoint route. _Default: `/request-signup`_

`signupPath: string`: the signup endpoint route. _Default: `/signup`_

`requestAuthPath: string`: the request auth endpoint route. _Default: `/request-auth`_

`authPath: string`: the auth endpoint route. _Default: `/auth`_

`logoutPath: string`: the logout endpoint route. _Default: `/logout`_

`refreshTokenPath: string`: the refresh token endpoint route. _Default: `/refresh-token`_

`challengeExpirationTimeInSeconds: number`: the max expiration time for the generated challenge when requesting signup or auth. MUST be provided in `seconds`. _Default: `300` (5 minutes)_

`maxRequestsPerTimeSlot: number`: the max amount of requests per did per timeslot. _Default: `20`_

`timeSlotInSeconds: number`: the amount of `seconds` that need to elapse before resetting the request counter. _Default: `600` (10 minutes)_

`userSessionDurationInHours: number`: the validity of each _refresh token_ in hours. _Default: `168` (one week)_

`rpcUrl: string`: rpc url used to [resolve](https://github.com/decentralized-identity/ethr-did-resolver) Ethr DID identities. _If not provided, will resolve using both RSK Mainnet and Testnet networks._

`networkName: string`: network name used to [resolve](https://github.com/decentralized-identity/ethr-did-resolver) Ethr DID identities. _If not provided, will resolve using both RSK Mainnet and Testnet networks._

`registry: string`: [DID Registry](https://github.com/uport-project/ethr-did-registry) address used to resolve Ethr DID identities. _Default: `0xdca7ef03e98e0dc2b855be647c39abe984fcf21b`_

`loginMessageHeader: string`: the message header that is expected to be received when the user signs the login message, it will be used to recover the signer against the received message. _If not provided, the expected message will be just `URL: <service url>\nVerification code: <expected challenge>`, without any header before the `URL`_

`accessTokenExpirationTimeInSeconds: number`: the validity in `seconds` of each _access token_. Remember that it should be short because the long validity is for the _refresh token_. _Default: `600` (10 minutes)_

`authenticationBusinessLogic: AuthenticationBusinessLogic`: the business logic to execute when a DID tries to log in. Will be executed each time the `/auth` endpoint is invoked with a valid signature. If it throws an error, the error message will be returned as part of an HTTP 401 response. _If not present, no business logic will be executed._

`requiredCredentials: string[]`: array of [Verifiable Credential](https://www.w3.org/TR/vc-data-model/) schemas that will be requested as part of the signup process. _If neither `requiredCredentials` and `requiredClaims` are present, no `sdr` will be requested when a user signs up._

`requiredClaims: Claim[]`: array of [Claims](../../../specs/did-auth#request) that will be requested as part of the signup process. _If neither `requiredCredentials` and `requiredClaims` are present, no `sdr` will be requested when a user signs up._

`signupBusinessLogic: SignupBusinessLogic`: the business logic to execute when a DID tries to sign up. It receives the required [`sdr`](../../../specs/did-auth#selective-disclosure) as part of the payload. Will be executed each time the `/signup` endpoint is invoked with a valid signature. If it throws an error, the error message will be returned as part of an HTTP 401 response. Should be used to validate the `sdr` against the business needings and/or to save users in any storage for future authentication validation. _If not present, no business logic will be executed._

### Included artifacts

#### Endpoints

##### GET `/request-signup/:did`

Expects the user `did` in the `params` of the request.
Returns an HTTP 200 with a JSON containing `{ challenge, sdr? }` in the `body` of the response.
The `sdr` will be present if the service requires it to register (sign up) the user. See more information in the [sign up protocol](../../../specs/did-auth#sign-up).

Possible error messages:
- `INVALID_DID` (HTTP 401)

##### POST `/signup`

Expects the signed `challenge` and `sdr` (if needed) response in the `body` of the request as `{ response }`.
If using cookies, sets the cookies in the service and returns just an HTTP 200 with no content.
If not using cookies, returns an HTTP 200 with a JSON containing `{ accessToken, refreshToken }`.

Possible error messages (all HTTP 401):
- `NO_RESPONSE` if `response` is empty or does not exist
- `INVALID_CHALLENGE` if the JWT verification fails or the received challenge is invalid
- `UNAUTHORIZED_USER` if `signupBusinessLogic` does not validate the user
- If the `signupBusinessLogic` throws an error, it will be sent to the client as well.

##### GET `/request-auth/:did`: `{ challenge }`

Expects the user `did` in the `params` of the requests.
Returns an HTTP 200 with a JSON containing `{ challenge }` in the `body` of the response.

Possible error messages:
- `INVALID_DID` (HTTP 401)

##### POST `/auth `

Expects the signed `challenge` response in the `body` of the request as `{ response }`.
If using cookies, sets the cookies in the service and returns just an HTTP 200 with no content to the client.
If not using cookies, returns an HTTP 200 with a JSON containing `{ accessToken, refreshToken }`.

Possible error messages (all HTTP 401):
- `NO_RESPONSE` if `response` is empty or does not exist
- `INVALID_CHALLENGE` if the JWT verification fails or the received challenge is invalid
- `UNAUTHORIZED_USER` if `authenticationBusinessLogic` does not validate the user
- If the `authenticationBusinessLogic` throws an error, it will be sent to the client as well.

##### POST `/refresh-token`

If using cookies, will get the _refresh token_ from a cookie.
If not, expects the _refresh token_ in the `body` of the request as `{ refreshToken }`.
Validates user session and:
- If using cookies, sets the new tokens cookies in the service and returns just an HTTP 200 to the client.
- If not using cookies, returns an HTTP 200 with a JSON containing the new tokens: `{ accessToken, refreshToken }`.

Possible error messages (all HTTP 401):
- `NO_REFRESH_TOKEN` if `refreshToken` could not be extracted from the cookies nor the body
- `INVALID_OR_EXPIRED_SESSION` if invalid _refresh token_ or expired session

##### POST `/logout`

This is a protected endpoint, so the [auth middleware](#auth-middleware) is executed before.

It invalidates the current user session and returns an HTTP 200 with no content.

It has not own validations, so the error messages it may respond with comes from the [middleware](#auth-middleware).

#### Auth Middleware

Authenticates requests by checking the _access token_.
If using cookies, will get it from a cookie.
If not, expects the _access token_ in the `Authorization` header of the request with the DID Auth scheme (`DIDAuth ${accessToken}`).
It validates the extracted token and if it fullfils the protocol needs, it authenticates the request by injecting the user did in the `request` object so it is available to be used by the endpoint. The `did` will be injected under `req.user`.

Possible error messages (all HTTP 401):
- `INVALID_HEADER` if not using cookies and the _access token_ header does not follow the `DIDAuth` scheme
- `NO_ACCESS_TOKEN` if _access token_ could not be extracted from the cookies nor the `Authorization` header
- `EXPIRED_ACCESS_TOKEN` if the _access token_ has expired
- `INVALID_ACCESS_TOKEN` if the _access token_ `nbf` time is greater than current time

### Note about cookies

In order to prevent [CSRF](https://en.wikipedia.org/wiki/Cross-site_request_forgery) attacks we've decided to use [csurf](https://www.npmjs.com/package/csurf) package.
It adds a token in the header of each response that should be sent back in the next request. It can be found under the key `x-csrf-token`. If the token is not added in the next request, the service will return a `503 Forbidden` response.

### Run for development

The service source code is hosted in Github, so please refer directly to the [README](https://github.com/rsksmart/rif-identity.js/tree/develop/packages/express-did-auth) and check there the detailed guide to install and test the service locally.
