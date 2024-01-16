---
menu_order: 600
menu_title: Troubleshooting
title: Common Errors and Troubleshooting
description: 'RIF Wallet is an open source smart contract wallet which enables businesses to create and deploy fully customizable on-chain wallets'
tags: rif-wallet, rif, rootstock, wallet, smart contracts
layout: rsk
render_features: 'collapsible'
---

Here are some errors and how to troubleshoot them:

[](#top "collapsible")
- When you encounter errors running the app
    > - Run `yarn clean:ios` or `yarn clean:android`. 
    > - This will clear the cache and reinstall the native dependecies. 
- When running the iOS command, if you get the error `Could not delete [...]/build' because it was not created by the build system`. 
    > - Delete the build folder manually.
- Error: You have not agreed to the Xcode license. 
    > - Please resolve this by running the command below:
    ```
        sudo xcodebuild -license accept
    ```
    > - Add your system password and click enter. If it doesn’t show any errors then you have agreed to the license.
- Error: command not found: yarn
    > - Solution: If you get the above error, ensure that you’re using the recommended node version in your code editor. To confirm this, enter the command below into the terminal:
    ```javascript
        node -v
    ```
    > - If you previously installed yarn with Homebrew. Enter the command below in your terminal to reinstall yarn. 
    ```shell=
        brew reinstall yarn
    ```
- Error: zsh: command not found: pod
    > To fix the above error, ensure Cocoapods is installed by following the steps in [Cocoapods Guides](https://guides.cocoapods.org/using/getting-started.html) or enter the commands below in your terminal;
    ```shell=
        cd ..
        gem install cocoapods
        bundle install
        cd ios
        pod install
    ```
    > - Note: This can take a while to install;
    > -     The response should look like this:
        ```
        ...
        Generating Pods project
        Setting REACT_NATIVE build settings
        Setting CLANG_CXX_LANGUAGE_STANDARD to c++17 on ${user}/swallet/ios/rifWallet.xcodeproj
        Pod install took 1388 [s] to run
        Integrating client project
        Pod installation complete! There are 80 dependencies from the Podfile and 87 total pods installed.
        ```
- Error: "Your session has expired. Please log in."
    ```shell=
    Error Domain=DVTPortalServiceErrorDomain Code=1100 "Your session has expired. Please log in." UserInfo={payload={ Requested but did not find extension point with identifier Xcode.InterfaceBuilderBuildSupport.PlatformDefinition
    info Installing " ${user}/Library/Developer/Xcode/DerivedData/rifWallet-bqottdlrtstkufgidrxcfpiupnsr/Build/Products/Debug-iphonesimulator/rifWallet.app"
    info Launching "co.rsk.rifwallet.test"
    success Successfully launched the app on the simulator
    Done in 593.27s.
    ```
    > - If you get this error, ensure you’re logged into Apple by opening `Xcode -> Settings -> Accounts -> Select the user related to the project -> Manage Certificates` and then press the "+" button on the bottom left to update the certificate.
- Error:  “Unexpected token '?'”
    > - If you encounter the error below, use the fix options below:
    ```shell=
    Node found at: /Users/${user}/.nvm/versions/node/v12.18.2/bin/node
    /Users/${user}/Documents/RSK/swallet/node_modules/@react-native-community/cli/build/index.js:156
        cmd.option(opt.name, opt.description ?? '', opt.parse || (val => val), typeof opt.default === 'function' ? opt.default(rest[0]) : opt.default);
    SyntaxError: Unexpected token '?'
    ```
    > - The above error is a problem with your node version, ensure your default node version is set to use node v16+. To fix this, we will add v16+ to our source file: .zshrc so the build can use this version of node when running
    > - Execute the following commands;
    > - Open the terminal, ensure you’re in the home directory. Copy and paste the following commands into the terminal
    ```shell=
    nano .zshrc
    ```
    > - Write your current node version to zshrc.
    ```shell=
    nvm use v16.18.0
    ```
    > - Write a file by clicking `^O`.
    > - Then Click Enter:
    > - ![RIF Wallet on bash](/assets/img/rif-wallet/rif-wallet-bash.png)
    > - Exit terminal using ^X on Mac
    > - To ensure VSCode terminal recognizes this new version of node, type the following into your VSCode terminal. The source reloads the commands in the `.zshrc` file.
    ```shell=
    source ~/.zshrc

    Now using node v16.18.0 (npm v8.19.2)
    ```
- Error: revert Token contract not allowed
    > - This is related to the `tokenContract` used to pay for the relayed transaction. Ensure token used for tx is on the list of added tokens in RIF Relay.