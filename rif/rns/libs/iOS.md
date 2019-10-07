---
layout: rsk
title: iOS Library
---

Implementation for resolvers for the RIF Name Service, available for iOS.

## Installation

RNS is available through CocoaPods. To install it, simpy add the following line to your Podfile:

```
pod "Rns"
```

## How to use

You will need access to a running rsk node that can made calls to the JSON-RPC. For this we have our public nodes available for you, that are already configured in our `Info.plist` file. 

You can just create your resolver with the default constructor if you are going to use mainnet.

```swift
 let resolver = new RnsResolver();
```

Or you can use another constructor if you want to use a personal node.

```swift
let resolver = new RnsResolver(nodeDir: "http://your.node.org", publicResolverAddress:"RSK_ADDRES_TO_YOUR_RESOLVER");
```

Then you can start using your resolver. 

## Sample app

Download the code of the [RNS iOS sample app](https://github.com/rnsdomains/rns-ios-sampleapp).
