---
menu_order: 1300
menu_title: Setup
section_title: Developer Reference
title: RIF Wallet App - Developer Reference Guide
description: 'RIF Wallet is an open source smart contract wallet which enables businesses to create and deploy fully customizable on-chain wallets'
tags: rif-wallet, rif, rootstock, wallet, smart contracts
layout: rsk
render_features: 'collapsible'
---

The developer reference documentation is intended for developers looking to build and deploy a fully programmable wallet compatible with Bitcoin and Rootstock networks. 

In this section, we will cover:
 
* [Prerequisites](#prerequisites) needed to run the RIF Wallet App
* [How to install the tools](#installing-the-tools)
* [Deploying a wallet](#deploying-a-wallet)

## Prerequisites

To run the RIF Wallet Application, you need to set up your development environment, follow the steps below to install the necessary components. 

* Node (v16+). See the Nodejs documentation for instructions on how to setup your node environment.
* Yarn
    * Install the dependecies using yarn. This will also run the postinstall script that shims the missing packages: yarn
    * The postinstall script runs the `rn-nodeify` package which adds packages that are native to the browser but not to react native.
    * For iOS you need to run the additional installation steps: `cd ios` and then `pod install`
* Watchman 
* Ruby (2.7.6+)
    To install Ruby, use the Ruby Version Manager.
* Cocoapods
* Xcode
* IOS Simulator
* Flipper (Optional)
    Flipper is a platform for debugging iOS, Android and React Native apps.  You can install flipper for your OS by visiting the [Flipper Website](https://fbflipper.com/).

> Note: Some of these deps have been bundled into a script for your convenience, please see the starter kit section (coming soon) for installation instructions or use the Sandbox environment (coming soon).

## Main Dependencies
* React (v18)
* React Native (v0.70). 
    * See [official instructions](https://reactnative.dev/docs/environment-setup)
    * Use the 'React Native CLI Quickstart' tabs not the 'Expo' tabs.
    * Follow the instructions explicitly as a small deviation can cause it to fail.
* Ethers (v5.4)
* Bitcoinjs-lib (v6.0)
* [RIF Wallet Libs](https://github.com/rsksmart/rif-wallet-libs)

> - To use the RIF Wallet Libs, see section on [using the Libraries](/rif/wallet/dev-reference/rif-wallet-libs/).
> - If you already have these prerequisites set up in your environment, you can skip to section on [Installing the tools](/rif/wallet/dev-reference/index#installing-the-tools) for more instructions.

## Installation and Setup Instructions

If you would like to skip this step above, go ahead and follow the steps starting from clone the repos.

### Clone the repos

To set up the RIF Wallet App, we need to clone the following repositories.

* Clone the [RIF Wallet Repo](https://github.com/rsksmart/rif-wallet)
* Run [Backend Server](https://github.com/rsksmart/rif-wallet-services) locally or [connect to an instance](/rif/wallet/dev-reference/getting-started#connect-to-an-instance).

### Installing the tools

#### Operating Systems

[](#top "collapsible")
- Android
  > For android, ensure to install the following: Node, Watchman, JDK 11(Java development kit), Android Studio, Android SDK, and [Configure ANDROID_SDK_ROOT](#configuring-android_sdk_root). See the [setup instructions](https://reactnative.dev/docs/0.70/environment-setup?platform=android)
- IOS
   > - For IOS, you will need to install node, watchman, Ruby, Xcode, Xcode Command Line Tools, CocoaPods, IOS Simulator. See a detailed setup instructions in the [React Native Documentation](https://reactnative.dev/docs/environment-setup?platform=ios)
   > - Using Android, see [setup instructions](https://reactnative.dev/docs/environment-setup?os=macos&platform=android&guide=native)

#### Xcode

Depending on your operating system, for Mac users, the easiest way to download and install [Xcode](https://developer.apple.com/xcode/resources/) is via the [Mac App Store](https://developer.apple.com/xcode/resources/). For other platforms, the easiest way is to install the [Android Studio](https://developer.android.com/) Development Tool.

See the [Troubleshooting](#troubleshooting) section, for information on how to resolve some issues.

#### React

Ensure you have react (v18.0) and above already installed. To install react, use the command below or follow the instructions in the [official react documentation](https://react.dev/learn/installation) to install react.

```javascript
npm install -g create-react-app
```

#### React Native

We will need to install Node (16+), Yarn, Watchman, Ruby(2.7.6+), [Cocoapods](https://guides.cocoapods.org/using/getting-started.html), Xcode (Via Mac App Store), and IOS Simulator. 

> See the [React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup?guide=native) instructions, and follow the steps in the official documentation to install react native.

### Android Studio Setup

For Android setup, you will need Node, the React Native command line interface, a JDK, and Android Studio. 

> See the [Android Setup Instructions page](https://reactnative.dev/docs/0.70/environment-setup?os=linux&platform=android). 

![Android Studio](/assets/img/rif-wallet/android-studio-setup-banner.png)

**Installing Android SDK 12 (S)**

1. To install this version, open Android Studio, click on the "Configure" button and select "SDK Manager".
2. Select SDK Platforms and make sure that the following options are selected and installed.
![Android SDK Platforms](/assets/img/rif-wallet/android-sdk-platforms.png)
3. Select SDK Tools and make sure that the 31.0.0 option is selected
![Android SDK Tools](/assets/img/rif-wallet/android-select-sdk-tools.png)
4. Finally, click "Apply" to download and install the Android SDK and the related build tools.

##### Configuring ANDROID_SDK_ROOT
The React Native tools require some environment variables to be set up in order to build apps with native code.

Add the following lines to your `$HOME/.bash_profile or $HOME/.bashrc` (if you are using zsh then ~/.zprofile or ~/.zshrc) config file:

```shell
export ANDROID_SDK_ROOT=$HOME/Library/Android/Sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

### Installing Emulator

To install Emulator, see the guide in [Create and manage virtual devices](https://developer.android.com/studio/run/managing-avds.html).

## Ethersjs:

To install Ethers, follow these steps in the [Ethersjs official documentation](https://docs.ethers.org/v5/getting-started/#installing) or use the command below.

```javascript
npm install --save ethers
```

## Fees

See [Fees](/rif/wallet/overview#fees)

## Deploying a wallet

To send a token out of the RIF Wallet, the user is required to deploy their wallet. 

> Note that initial deployment of the wallet is **FREE** for end users and has been subsidized by IOV Labs. The wallet cannot be redeployed after deployment. See section on [deploying a wallet](/rif/wallet/user-guide/deploy-a-wallet/) for how to deploy the RIF Wallet. 