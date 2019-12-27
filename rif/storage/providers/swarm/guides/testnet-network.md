---
layout: rsk
title: Connecting to testnet Swarm network
---

# RIF Storage testnet launch
Ever since the [launch](https://www.iovlabs.org/press/partnership-between-swarm-and-rsk-infrastructure-framework-rif-to-develop-a-breakthrough-storage-solution.html) of the RIF Storage team, we have been working hard to make the vision of a decentralized internet a reality. Last week, during [laBITconf](https://www.labitconf.com/), IOV-labs officially launched the RIF-Storage testnet; an important milestone towards a decentralized internet!
In this blog post, we give you some background to how we achieved this milestone; in the end, we explain to you how to connect and download from RIF Storage!

## What is the RIF Storage testnet
The RIF Storage testnet allows developers and end-users to get a feeling with how it is to interact with a decentralized storage protocol. For now, RIF Storage is integrated with [Swarm](https://swarm.ethereum.org/). On top of this, we are also integrating with [IPFS](https://ipfs.io/) (more to be announced soon!) and we are developing the specifications for the [gateways](https://www.rifos.org/gateways), [marketplaces](https://www.rifos.org/marketplace) and [pinning services](https://docs.ipfs.io/guides/concepts/pinning/)
A crucial difference between the testnet, just launched by us, and the official Swarm testnet is the usage of the RIF Token to incentivize bandwidth accounting in the RIF Storage testnet. Ultimately, the vision of both Swarm and RIF is to support multiple currencies under the same network, but until that vision becomes a reality we want to give developers in the RIF ecosystem the opportunity to try out the user experience of RIF Storage, using the RIF (test) token. 


## History and our contribution
IOV Labs [announced](https://www.rifos.org/blog/rif-storage-the-first-chunks/) some time ago a partnership with Swarm.  Since that time, the RIF storage team has formed the incentives track within Swarm and we have worked hard to implement the Swarm Accounting protocol (read more [here](https://www.rifos.org/blog/rif-storage-the-first-chunks/)). While the launch of the testnet is an important milestone, it does not signal that we are done; currently, the incentives track is working on persistent storage (via pinning and postage lottery) and a market mechanism for the network to decide on a price for the bandwidth accounting. 

## Hands-on
Be one of the first to interact with the Swarm testnet and download a special surprise!

### Gateway
TLDR; RIF Storage is operating a gateway service, so you can interact with Swarm without running the software yourself. Please navigate [here](https://swarm.rifgateways.org/) and verify that you can upload a file and download it from there.

### Components
- Swarm
  - Local node connects to the testnet bootnode
- RSKj
  - Local instance of the RSKj blockchain described below
- RNS
  - Used as an alternative to content hashes, similar to ens but for rsk domains.

### Download Swarm
- Get the latest release of Swarm [here](https://swarm.ethereum.org/downloads) (any release above 0.5.5, checksum: 0f3debd195b01505e59d246515dd57b5). Note: edge binaries are only available for Linux.

- Unpack the binaries (e.g. `tar -xvf swarm-.(...)tar.gz`)
- Make the binary executable: `cd` into the `swarm` folder and execute `chmod +x swarm`

### Fund your RSK account:
Since the RIF Storage network is incentivized, you will need both tRIF and tRBTC to interact with the network. tRIF to pay for your bandwidth costs in the network (the proceedings will go to the nodes hosting and forwarding the files your request) and tRBTC to pay for the transaction costs in RSK.

Get the coins on any address via the faucets:
- tRBTC: https://faucet.rsk.co/
- tRIF: https://faucet.rifos.org/

Make note of the address that has the coins, you need it for the next step.

### Start the RSKj deamon
To interact with Swarm, you need a connection to a blockchain backend. Please head to the [RSKj WIKI](https://github.com/rsksmart/rskj/wiki) and follow the steps to install, compile and run an RSK node locally. Be sure to switch to the RSK TestNet (instructions to switch [here](https://github.com/rsksmart/rskj/wiki/Switching-networks)).

It will take some time for your node to synchronize with the network (+- 8 hours). You can verify that you are synched by requesting the current blockheight of your node:
`curl -H"Content-type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' 127.0.0.1:4444` and comparing the answer to the blockheight mentioned at the [official explorer](https://explorer.testnet.rsk.co/).

### Start Swarm
**Do not attempt this step without a fully synched RSKj node!**

Run the command:
`./swarm --swap --swap-chequebook-factory 0x7EFa429447180c491aD1BB0b481D90534B74A3f6 --bzznetworkid 5 --bzzaccount <your account here> --swap-backend-url http://localhost:4444 --ws --wsaddr=0.0.0.0 --bootnodes enode://846c424961adc146d54861bdf1eb6015e6908b689fd12d01c61307fffc848c22e514f5c898dc9243fbb17aa80750b556772599d84fe86a4b715f40ebc4c049bf@3.136.239.137:30399 --wsapi=accounting,bzz,swap,admin --wsport 8546 --wsorigins='*' --tracing --rns-api=99a12be4C89CbF6CFD11d1F2c029904a7B644368@https://public-node.rsk.co`

### Upload
To upload a file, run: `./swarm up <name_of_file>` from your command line. After completion, you will get the `swarm hash` reference to your file
Alternatively, navigate to `http://localhost:8500` in your browser and use the graphical user interface to upload your file.

### Download
To download a file, run: `curl http://localhost:8500/bzz:/<swarm_hash_or_RNS>/<file_name>` from the command line. Alternatively, navigate to `http://localhost:8500` in your browser and use the graphical user interface, or paste `http://localhost:8500/bzz:/<swarm_hash_or_RNS>/<file_name>` directly in the address bar of your browser. 

#### Surprise!
We promised you a surprise at the beginning of this tutorial... If you come this far, please download the file with hash `9c8335dbcdadb5c853fa82177afbca3f3b26ade6763eb3c99dbfec7ad3e95823` (or RNS: `anthem.rsk`) and name `Bitcoin_Anthem_Oflow_Show.mp3`. Enjoy listening!
[Bitcoin Anthem](https://swarm.rifgateways.org/bzz:/anthem.rsk/Bitcoin_Anthem_Oflow_Show.mp3)

_Guide based on [RIF Storage testnet launch](https://hackmd.io/yZLFmgdSRDCMEpBXCiBeBA?view) by Rinke Hendriksen._
