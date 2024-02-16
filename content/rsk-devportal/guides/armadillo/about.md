---
menu_order: 500
menu_title: About
layout: rsk
title: 'Armadillo - About'
description: 'The guardian of RSK'
tags: armadillo, guard, security, guides, bitcoin, rsk, peer-to-peer, merged-mining, blockchain
---


## Armadillo Workflow

![Armadillo Workflow](/assets/img/guides/armadillo/armadillo-workflow.png)

![Armadillo Workflow 2](/assets/img/guides/armadillo/armadillo-workflow-1.png)

## Armadillo Infrastructure

The Armadillo’s universe is composed of 3 microservices.
1. **Monitor**: Is in charge of creating a snapshot of the RSK mainchain that includes forks detected. To accomplish that it consumes data from an RSK node and a BTC API.
2. **API**: Offers digested data collected by the monitor in a number of endpoints.
3. **Canary**: Is in charge of looking into every fork and triggering alarms whenever necessary with different severities.

## User Facing Information

### API

Armadillo API exposes all data collected by the Monitor with a single method.

```shell
host:port/blockchain/{n}
```

Where `{n}` is the number of WB backwards to the last WB detected in the Armadillo mainchain.

The response will contain an object which includes:

- Fork data information: This data will be an array of forks found between the last WB detected to the n number of the WB detected ordered by height.
This information could be empty or not and depends on if Armadillo detected any abnormality between those heights.

- Armadillo mainchain data: is a “portion” of RSK blockchain with BTC information appended where it corresponds.
In other words, there will be an array of items where every item contains information of a corresponding RSK block plus the WB information if it corresponds to the given RSK block height.

Suppose, as an example, that n = 2 and the last WB detected in the Armadillo mainchain is in the BTC height 632787.
Then going backwards from that height,
armadillo detected in mainchain the last WBs: 632787, 632785, 632783, 632775 ….

Then the response JSON would be like this:

```js
    data: {
        mainchain: Array(Item),
        forks: Array(Fork),
    },
    // message: "Get mainchain and forks in the last 3 BTC blocks"
    // success: true
```

The Mainchain object will contain a list of items from 632783 WB height to 632787,
and between those heights are going to be other items with no WB link but with RSK block information.
Then the JSON Item looks like:

```js
    btcInfo:{
        guessedMiner: "F2Pool",
        hash: "00000000000...8945d8db4",
        height: 632788,
    },
    //rskInfo: RSKBlock
```

`BtcInfo` contains WB info, when it exists.
All items between these WB’s will have btcInfo  as null.

`forks` array has Fork objects which looks like:

```js
    rskHeightLastTagFound: 2287169,
    btcHeightLastTagFound: 632786,
    mainchainRangeWhereForkCouldHaveStarted: {
        startBlock: RskBlock,
        endBlock: RskBlock
    },
    firstDetected: ForkDetectionDataObject,
    items: Array(ForkItem),
```

**Explanation of each field:**

- `rskHeightLastTagFound` is the last RSK block’s height in the fork.
- `btcHeightLastTagFound` is the last BTC block’s height in the fork.
- `mainchainRangeWhereForkCouldHaveStarted` is the probable range where the fork could have started. The object is a range because there is no way to calculate the exact RSK mainchain point where the fork started.
- `firstDetected` is a WB detection data and was the data which triggered armadillo and the opening of a new fork.
- `items` is a list of items that represent the fork. All these items follow their own CPV path.

`items` array has forkItems which looks like

```js
    btcInfo: {
        height: 632786,
        hash: "00000000...a12c93eb439",
        guessedMiner: "BTC.com"
    },

    rskForkInfo: {
        forkDetectionData: ForkDetectionDataObject,
        rskBestBlockHeight: 2409851
    },
    time: "Tue Jun 02 2020 17:49:26 GMT-0300 (-03)"
```

**Explanation of each field:**
- `btcInfo` is the WB detected by armadillo.
- `rskForkInfo` is an object with
    -  `forkDetectionData` is the RSKTag information found in BTC block
    - `rskBestBlockHeight` is the RSK’s best block height at the moment that WB was found.
- `time` is the time where the WB was found.
