---
menu_order: 300
menu_title: Running the wallet
title: Running the wallet
description: 'RIF Wallet is an open source smart contract wallet which enables businesses to create and deploy fully customizable on-chain wallets'
tags: rif-wallet, rif, rootstock, wallet, smart contracts
layout: rsk
---

To start the smart wallet, ensure you are connected to the server locally by following the steps in [Running with Local Services](/rif/wallet/dev-reference/getting-started.md). Follow the steps below or see the [setup instructions](/rif/wallet/).

## Step 1: Open the RIF Wallet repo on your code editor

## Step 2: View config file

The RIF Wallet environment is configured via the following files:

```shell
.env
.env.local
.env.local.android
```

## Step 3: Setup environment

* To setup your environment, use the [official instructions](https://reactnative.dev/docs/environment-setup). 
* Use the 'React Native CLI Quickstart' tabs NOT the 'Expo' tabs. 
* Follow the instructions explicitly as a small deviation can cause it to fail.

## Step 4: Install the dependencies using yarn

This will also run the post-install scripts that shims the missing packages: `yarn`.

For iOS you need to run the additional installation steps: 

```shell
cd ios
pod install
```

> - The postinstall script runs the `rn-nodeify` package which adds packages that are native to the browser except react native.

## Step 6: Install pod

For iOS you need to run the additional installation steps below;

```shell
cd ios
pod install
```

## Step 7: Run the app using the desired platform

### For IOS

To run the app in testnet:

```javascript
yarn ios
```

Run the app locally:
> Note: Running the app locally means you’re only connecting to the RIF Wallet backend server locally and NOT running the app locally.

```javascript
yarn ios:local
```

> Note: You can also run the app with `yarn:ios`

### For Android

To run the app in testnet:

```javascript
yarn:android
```

To run the app locally:

```javascript
yarn android:local
```

You should see the following in your terminal:

```javascript
    yarn ios:local

    yarn run v1.22.19
    ...
    info Found Xcode workspace "rifWallet.xcworkspace"
    info Launching iPhone 14 (iOS 16.4)
    info Building (using "xcodebuild -workspace rifWallet.xcworkspace -configuration Debug -scheme rifWallet -destination id=333FFAA3-D662-491F-8D46-BCF4AD5C713C")
    ⠇ Building the app
```

_Note: Ensure the RIF Wallet services is running on port 3000._

Run the app again using `yarn ios:local`, and now you should successfully build the application. Now you can start modifying and building the app to suit your needs.

![RIF Wallet Local Start Screen](/assets/img/rif-wallet/rif-wallet-local-start-screen.png)

<div class="image-container">
    <img src="/assets/img/rif-wallet/rif-wallet-xcode.png"  title="RIF Wallet on XCode" />
</div>

> Note: To reload the application, press  the R key on your keyboard. 
Additionally, you can debug your application, by installing the [flipper desktop app](https://fbflipper.com/) for debugging or see the [troubleshooting guide](/rif/wallet/dev-reference/troubleshooting/) for how to solve some of the encountered errors.

See how to use the libraries in [Using the Libraries](/rif/wallet/dev-reference/rif-wallet-libs/). For development purposes, ensure to switch to a test environment. See [Switch networks](/rif/wallet/user-guide/switch-networks/) for more information.
