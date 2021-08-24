---
layout: rsk
tags: rif, rif-identity, libraries, infrastructure, mobile, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

## Citizens App - wallet-like mobile application (Android)

The Citizens app is a wallet that can be used to store the declarative details and credentials of its users. Built-in React Native it can be packaged for both iOS and Android, however, Android is the only officially supported platform.

Read the [running guide](../../run) to run the whole project or [browse the open-source repo](https://github.com/rsksmart/rif-identity-ui/tree/holder-v0.1.2/apps/IdentityApp) to run locally (please use tag `holder-v0.1.2`)

Take a look at the [Figma prototype](https://www.figma.com/proto/KFwPTkCesIMlnutNDqJQLD/Gibraltar-Identity?node-id=0%3A1&scaling=scale-down)

## Specifications

- Identity creation: the app will ask the user to backup a 12-word phrase. It is used to create cryptographic keys that will be used to sign credentials, encrypt communications, and encrypt credential backup files. The cryptographic keys derive on a W3C compliant DID representation of the identity,
- Setup: the app requires a 4-word PIN creation on application first start, then the user is prompted to fill some required personal information. This information fill-up process and the 12-words phrase backup is required just before the first credential is requested. It also allows to restore application contents with the 12-words phrase.
- Language: framework capable of adding languages seamless, including English and Spanish translations
- User interface:
  - Access: the app is locked each time it is closed and enabled when open after the user inputs the PIN
  - Acquire credential: it allows to request a credential once personal information is filled and phrase was confirmed copied, it asks the user to accept sharing the fields that are required to issue the credential, it sends the request to the issuer app and waits for approval.
  - View credentials: the user can view the credential content and an icon indicating if the credential is valid or not. It can also view the details of the credential, including all the fields and the entity that signed it.
  - Present credentials: the user can click a QR signal found beside the credential display. By clicking on this QR the citizen will be able to share with the officer all the information required and a valid cryptographic signature that will allow for verification process.
  - Backup: is automatic, user has no interaction with backup process unless a problem is detected. In that case it is prompted to share the error with the developer team.
  - Features: It also allows the user to edit personal information, view the backup phrase, and change the PIN.
- Persistence: the application must store all the information in a local database, that will be deleted only if the application is deleted.
- Backup: the backup service (described below) will provide an interface for the citizen app to save files containing credentials into a persistent public database, and to recover that files when the app is initialized with restore backup mode. The backup process requires cryptographic authentication methods, also described below.
- Communications: the application connects to the issuer app and backup service via HTTPS. A cryptographic key sharing protocol is implemented to ensure security and privacy in each message.

## Features

- Creates an Identity based on a 12 seed mnemonic.
- Internationalization - currently Spanish and English support, it is easy to extend to new languages.
- Saves declarative details about the user and backs them up in the [data vault](/rif/identity/data-vault). These details are shared when the user requests credentials.
- Requests credentials to issuer service, and hold request information until the issuer approves or denies the request (following [this protocol](../../../specs/credential-requests)).
- Saves received Credentials in its internal database and then backs them up in the data vault.
- Creates Presentations of Verifiable Credentials to share with the Verifier app.

Read [this document](../../../specs) to learn more about how Self-sovereign identity is designed.

## Flow + Screenshots

### Creating an account, mnemonic and adding declarative details

- User starts the app and clicks 'Get Started'
- They create a PIN for the app that will lock it when they navigate to a different app
- They will be asked to create an Identity from a 12-word mnemonic
- The User enters their declarative details

![Create an account](../../assets/img/applications/holder-app/create-account.jpg)

### Request a credential

- To request a credential, the user clicks the center (+) button and chooses the type of credential they want
- They verify the information they will share with the issuer.
- After submitting, they need to wait for the issuer to approve or reject the credential.
- When approved, the credential is saved into the Data Vault and appears blue on the home screen.

![Requesting a credential](../../assets/img/applications/holder-app/request-credential.jpg)

### Credential Details and Presentation

- The user can click on the credential to see information shared with the issuer.
- A presentation of the verifiable credential can be created.

![Details](../../assets/img/applications/holder-app/credential-display.jpg)

## Extend (things that could be added in the future)

Extending this application will require input from the parties wishing to issuer credentials. For example, what fields should be requested and what types of credentials are offered can be customized inside the application. A few known features are the following:

- Send Verifiable Credentials as declarative details when requesting a credential
- Add the ability to request credentials from multiple issuers
- Add images/photo as a declarative detail
- Send the image of the user in the presentation
- Translate strings into additional languages.
