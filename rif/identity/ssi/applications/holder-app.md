---
layout: rsk
title: "Holder - Applications - Self-Sovereign Identity - RIF Identity"
tags: rif-identity, rif-id, ssi, self-sovereign-identity
---

# Holder App

The holder app is a wallet that can be used to store the declarative details and credentials of its users. Built-in React Native it can be packaged for both IOS and Android, however, Android is the only officially supported platform.

Its features and visual components are developed for future support of a UI library enabling seamless access to SSI basic user information

## Features

- Creates an Identity based on a 12 seed mnemonic.
- Internationalization - currently Spanish and English support, it is easy to extend to new languages.
- Saves declarative details about the user and backs them up in the [data vault](../../../data-vault). These details are shared when the user requests credentials.
- Requests credentials to issuer service, and hold request information until the issuer approves or denies the request (following [this protocol](../../specs/credential-requests)).
- Saves received Credentials in its internal database and then backs them up in the data vault.
- Creates Presentations of Verifiable Credentials to share with the Verifier app.

Read [this document](../../specs) to learn more about how Self-sovereign identity is designed.

## Flow + Screenshots

### Creating an account, mnemonic and adding declarative details

- User starts the app and clicks 'Get Started'
- They create a PIN for the app that will lock it when they navigate to a different app
- They will be asked to create an Identity from a 12-word mnemonic
- The User enters their declarative details

![Create an account](../../../assets/img/ssi/applications/holder-app/create-account.jpg)

### Request a credential

- To request a credential, the user clicks the center (+) button and chooses the type of credential they want
- They verify the information they will share with the issuer.
- After submitting, they need to wait for the issuer to approve or reject the credential.
- When approved, the credential is saved into the Data Vault and appears blue on the home screen.

![Requesting a credential](../../../assets/img/ssi/applications/holder-app/request-credential.jpg)

### Credential Details and Presentation

- The user can click on the credential to see information shared with the issuer.
- A presentation of the verifiable credential can be created.

![Details](../../../assets/img/ssi/applications/holder-app/credential-display.jpg)

## Extend (things that could be added in the future)

Extending this application will require input from the parties wishing to issuer credentials. For example, what fields should be requested and what types of credentials are offered can be customized inside the application. A few known features are the following:

- Send Verifiable Credentials as declarative details when requesting a credential
- Add the ability to request credentials from multiple issuers
- Add images/photo as a declarative detail
- Send the image of the user in the presentation
- Translate strings into additional languages.

## Run

### Setting up a Local Environment

Refer to [Setting up the development environment](https://reactnative.dev/docs/environment-setup) from the official docs on setting up your environment. Use the instructions under React Native CLI Quickstart, NOT Expo.

### Install dependencies
```
yarn
```

### Modify Config

The Holder Application uses a .json file for configuration variables. .env files were not a good solution as the app had to be reset and the cache cleared when a change needed to be made. The initial configuration file can be found at `/src/config` and contains the following variables:

```json
{
  "ISSUER_ENDPOINT": "",
  "ISSUER_DID": "",
  "IPFS_GATEWAY_ENDPOINT": "",
  "DATA_VAULT_ENDPOINT": "",
  "RSK_NODE": "",
  "CONVEY_URL": "",
  "CONVEY_DID": ""
}
```

The user can change any of these variables in the advanced settings screen. Once they are set there, this file is ignored until the app is reset.

### Nodify

The Holder app runs React Native which requires packages only found in Node.js. As such, multiple packages are replaced using [`rn-nodify`](https://openbase.io/js/rn-nodeify/documentation). These are installed after the initial yarn command. There are two additional patches that need to be made after the installation process.

#### Modify app-root-path:

Navigate to:
```
/node_modules/app-root-path/browser-shim.js
```
Remove or comment out line 3:
```
// exports.path = require('path').dirname(require.main.filename);
```

#### Modify react-native-os:
Navigate to:
```
node_modules\react-native-os\android\src\main\java\com\peel\react\RNOSModule.java
```

Remove or comment out line 31:
```
//  @Override
```

### Run for Android

Connect an Android device to the computer or start an emulator.

```
yarn android
```

For Development, the following commands are helpful in clearing the cache:

```
./android/gradlew --clean
yarn start --reset-cache
```

## Build Production Version

Make sure `/src/config.json` contains the initial paths and DIDs.

```
cd android
./gradlew assembly-release
```
