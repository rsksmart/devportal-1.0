---
layout: rsk
title: Frequently Asked Questions
tags: knowledgebase, rsk, faqs, help, support
description: "Welcome to RSK and RIF Knowledge-base; Explore our faqs section"
---

## RSK, RIF and IOV Orgs

[FAQs](https://www.rsk.co/faqs)


### Please explain the IOV, RSK, RIF branding structure. Are RIF and RSK going to become one organization?


 IOV Labs operates as a purpose driven organization focused on promoting and developing the next generation of open blockchain-based infrastructure that will enable worldwide financial inclusion and bridge the gap between this nascent technology and mass adoption and is the organization behind RSK and RIF platforms.

 For more information visit: [IOV Labs](
 https://iovlabs.org/)

## General RSK tech questions
### RSK fundamentals:


### What is RSK?


 RSK is the first general purpose smart contract platform secured by the Bitcoin Network.



### What is a smart contract?


 Smart contracts are contracts whose terms are encoded in computer language instead of legal language. Smart contracts can be executed by a computing network such as RSK, so that the terms of the contracts are automatically enforced by a protocol that all nodes in the network follow.

 A smart contract can be fully autonomous if all the objects referred (such as currency, payments, obligations, property titles, assets, licenses) have a digital representation in the platform. When there is no such digital representation for an object, a smart contract can also refer to itself and react to changes in its state through special gateway nodes called oracles that provide external information to the blockchain. A smart contract also has access to time with minute precision, so time-restricted conditions can be represented.

 A few examples of smart contracts are:

 Micro-lending
 Distributed voting systems
 Machine to machine payments
 Decentralized exchanges
 Asset tokenization
 Supply chain tracking
 Loyalty and rewards
 Micro-insurance
 Crowdfunding
 Property registry
 Escrow services
 Transparent public tenders
 Remittances



### What is the current state of the project?


RSK MainNet network was released in early January 2018. The latest major version is called Wasabi.

Live statistics about the entire RSK network is available at [RSK Stats](https://stats.rsk.co/) 
All the necessary source code can be found at our GitHub repository: [RSKSmart on Github](https://github.com/rsksmart)
All the project information, including a getting started guide, can be found on the [RSK & RIF Developer Portal]( https://developers.rsk.co/)

For latest news and updates, check out [RSK Blog]( https://blog.rsk.co/) 

### Do you have any plans to add support for smart contract programming languages other than Solidity?


Currently RSK supports all the opcodes and precompile contracts of Ethereum, and therefore it can support any language that compiles to the EVM. This includes Solidity, Julia, and new or experimental programming languages such as Vyper. 

### Any progress with Drivechain proposal(s)?

The first drivechain proposal was created by us in 2016 and presented to the Bitcoin mailing list for evaluation (see https://github.com/rsksmart/bips/blob/master/BIP-R10.md). Those were turbulent times for the Bitcoin community, as the different subgroups were fighting either to increase the block size or to add SegWit. In that context, it was very difficult to achieve consensus about sidechain integration. Later in 2018, we renewed our efforts with an improved proposal (see https://github.com/rsksmart/bips/blob/master/BIP-R11.md) presented at Building on Bitcoin 2018 (https://www.youtube.com/watch?time_continue=10289&v=Cpid31c6HZc).

 We think that the ecosystem has to mature for trust-minimized Bitcoin sidechains to flourish.



### Is RSK centralised, federated, or decentralised?

The RSK blockchain is highly  decentralised. It is its own blockchain which is merge-mined with Bitcoin, and has a hashpower that is second only to Bitcoin. As such, we believe it to be the most secure and censorship resistant smart contract platform; and the second most secure blockchain platform. Refer to https://stats.rsk.co/ for the live value of the RSK hash rate.
The conversion between Bitcoin (BTC) and Smart Bitcoin (R-BTC) is accomplished through a 2-way peg mechanism. This 2-way peg was bootstrapped using a federation of nodes managing a Bitcoin multisignature, however, RSK has transitioned its federation to a Powpeg. A Powpeg is a multi-signature management system where participants' nodes have no direct access or control over private keys. Keys are controlled by tamper-proof HSMs. These HSMs internally run lightweight RSK nodes which obey commands originating from an RSK smart-contract called the Bridge that orchestrate peg-outs. Only when such commands are confirmed by thousands of blocks produced by the mining network does the HSM proceed to sign peg-out requests. The Powpeg is a new security protection layered on top of the previous federation. It is unique in the crypto ecosystem and radically reduces the attack surface for the most frequent security breaches. The strategy consensuated by the RSK community for increasing the security of the peg is based on defense-in-depth: adding more security layers on top of existing ones, protecting the system from the failure of any of them. The ultimate goal is the complete decentralisation of the peg.
Refer to https://developers.rsk.co/rsk/architecture/security/ for the details around the security model of the 2-way peg.

### How does RSK plan to be a reference in terms of smart contracts?


 RSK is the most secure smart contracts platform in the world. Security has been and will continue to be one of our key competitive advantages and we will keep working at it. Secondly, scalability which is one of the obstacles for blockchain mass adoption has been and will be one of our key strategic objectives. While independent groups are porting Ethereum scaling solutions to RSK, The IOVLabs  innovation  & research lab is working on layer 1 proposals to increase its transaction capacity, such as transaction compression, and signature aggregation. On top of this, the RIF payments protocols, such as the RIF Lumino Network also contributes towards.



### Can you talk about how RSK is approaching node diversity? How many nodes does a healthy protocol need?


 The question has never been about the number of nodes but more about the diversity and independence of those nodes. A few hundred independent RSK nodes is enough to serve a global cryptocurrency network at this stage, but we must not feel confident by that metric. Our objective is that full nodes are run by a diverse set of individuals, organizations and companies. That is the true meaning of decentralization: don’t trust, verify yourself. IOVLabs innovation and research area has developed several decentralized incentivizations mechanisms that may one day be integrated into full nodes.  Also, we’ve put great effort to reduce the resource consumption of full nodes, such as the [Unitrie proposal]( https://www.rsk.co/noticia/towards-higher-onchain-scalability-with-the-unitrie/) so that individuals can run nodes in standard laptops. Finally, we proposed a new technique for light clients (see https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP45.md), to onboard those users running nodes in mobile phones. Summarizing, we’re making sure that the network remains healthy and decentralized in the future, both in node quantity and quality.



### Should dApps set up their own nodes?


 During the development process, public nodes can be used (https://nodes.rsk.co).  DApps in production environments are recommended to run their own infrastructure.



### What incentives does a project have to be developed on RSK?


 The main reasons why developers choose RSK Smart Contract Network over other networks are security and scalability.

 RSK is the most secure smart contracts platform. For up to the minute hashing power stats you could visit https://stats.rsk.co/

 RSK has less onchain activity than Ethereum, which is something you would expect for a blockchain that is one year and a half old. Therefore the blockchain is much smaller than Ethereum. However, prior to the 1.0.0 release the RSK blockchain could grow as fast as Ethereum for equal transaction volumes. Now the blockchain state is ten times smaller. For example, the last world-state consumes no more than 50 MB. The current Ethereum state consumes about 130 GB. That’s 2600 times more.

 More information about the Unitrie in [Towards Higher Onchain Scalability with Unitrie]( https://www.rsk.co/noticia/towards-higher-onchain-scalability-with-the-unitrie/)

 From the perspective of programming capabilities RSK Network is on par with Ethereum as both natively support Solidity Smart Contracts and the same APIs. These levels of compatibility make it seamless for developers to port their Dapps to the RSK Network and leverage on their acquired abilities / knowledge.

 From a perspective of security, RSK Network is protected by over 40% of the Bitcoin Network computing power and uses the same hashing mechanism as Bitcoin which is the safest decentralized network in the world. Although other security models like EOS’ DPoS or Ethereum’s PoW based on general purpose hardware might bring some benefits, none of those networks have been battle tested; neither have they held as much value in custody, compared to the Bitcoin Network.

 RSK combines the best of Bitcoin and Ethereum under a single platform.



## RBTC and RIF Tokens

**RIF token** info including support wallets and exchanges at https://www.rifos.org/rif-token/



## RBTC info


### Where can I get SmartBitcoins (RBTC)?


 SmartBitcoins, identified with the RBTC ticker are pegged 1 : 1 to BTC (1 RBTC = 1 BTC).



### What are the wallets that support Smart Bitcoin (RBTC)?


 RSK is currently supported in Ledger, Dscent and Trezor hardware wallets. More info: https://www.rsk.co/smart-bitcoin-rbtc/.



### Why is RBTC listed in exchanges?


 We listed RBTC in exchanges to make it easier for less technical users to get access to it. As I said, it takes almost a day to transfer BTC to RBTC using the peg. Users at least need small amounts of RBTC to pay for transaction fees, required for smart contract execution. We expect more demand for RBTC as more users start using the platform.



### What hardware wallets support RSK ?


 RSK is currently supported in Ledger, D’scent and Trezor hardware wallets. More info: https://developers.rsk.co/wallet/use/ 



### What’s the difference between RIF token and RBTC?


 RSK Infrastructure Framework Open Standard (RIF OS) is a suite of open and decentralized infrastructure protocols that enable faster, easier and scalable development of distributed applications (dApps) within a unified environment. RIF OS includes support for decentralized, third-party, off-chain payment networks; a set of APIs for seamless and secure communications between decentralized applications; and easy-to-use interfaces for developers. Access and payment for RIF OS services are based on the RIF Token, which allows developers to access the suite of services built on top of RIF protocols such as Identity, Payments, Gateways, Storage and Communications including third party-developed infrastructure services, and any other apps that might be deployed on RIF’s framework that agrees to accept RIF Tokens as a means of accessing / consuming the service or app. RBTC is the native token of the RSK Live Mainnet and is pegged 1:1 to BTC. It’s used as gas to pay for Smart Contract execution in the same way as ETH is used as gas for Ethereum. Technical users can obtain in a decentralized way by converting to and from BTC by using the bridge between the Bitcoin and RSK protocols. Less technical users can obtain RBTC from supporting exchanges like Huobi and Bitfinex among others. In order to use the RSK and all of the applications that run on RSK and RIF OS.



### How exactly does the 2-way peg work for RBTC? Is it a Smart Contract? Do exchanges deal with this in real time? Can end-users also interact with this smart-contract directly, without having to go through an exchange? If so, how? If not, why not?


 RSK native currency, smartBitcoin (RBTC), is tethered to bitcoin 1 to 1 so the only way to create RBTC is by sending BTC (“or peg-in”) to a multisig address in the Bitcoin blockchain that is managed by the RSK Powpeg. The bitcoins that arrive at that address get locked, and a proof of that transfer (SPV proof) is fed to a special smart contract on the RSK blockchain called the Bridge contract. Currently, the RSK Federation is doing this process of communicating new transfers to the Bridge contract but this process is fully decentralized and anyone can feed this information to the contract. Once the bridge contract gets this proof it sends the equivalent amount of RBTC to what was received in BTC to an RSK address that corresponds to the BTC address that started the process on the Bitcoin blockchain. With that, the crossing from Bitcoin to RSK is finished in a fully decentralized / trust minimized way.

 Lets see what happens when we want to go back to Bitcoin. To redeem RBTC for BTC (or “peg-out”) first you have to send the RBTC to a special address of the Bridge on the RSK Blockchain but since Bitcoin cannot verify transactions on a secondary blockchain because its scripting capabilities are limited on purpose to reduce its surface of attack, we need the RSK Powpeg to assist in the signing of the release transaction on the Bitcoin side. So as the RSK Powpeg nodes acknowledge and validate that a new BTC release transaction was created, they sign it. The main difference between a federation and RSK’s powpeg is that Powpeg nodes run a Hardware Security Module (HSM) so RSK Powpeg  nodes do not have access to the private keys and therefore, even if they collude,  they cannot steal the funds in the peg. The highest damage they can do is to unplug the HSM and stall the peg. There is a community proposal to add a 6-month time-locked transfer of the peg funds to a backup multisig to protect from a generalized Powpeg malfunction. Internally, when the Bridge contract commands a peg-out, the peg-out transaction is given  to the HSM, and the HSM validates the validity based on cumulative proof of work and then signs it. When enough signatures from HSMs are collected (remember that the BTC address is a multisig address so it needs M of N signatures to release the funds) then the BTCs are sent to the BTC address specified in the peg-out request.

Since 2016, the RSK community has been working on an extension of the Bitcoin protocol called Drivechain, that would enable even higher decentralization and security for the peg-out process.

 The peg-in process takes around 15 hours (100 Bitcoin blocks) to avoid losing funds due to a reorganization of either blockchain. The peg-out process has an even longer delay of 4000 RSK blocks (about 33 hours) for maximum security.

Due to the technical nature of using the peg, the friction created by the waiting period, many exchanges offer RBTC so developers and users can easily access it. Also a number of fast coin-swap solutions, such as Coinswap enable fast transfers for low amounts without registration.

 For more information you could read this in depth article by our Chief Scientist, Sergio Lerner on Sidechains in general and RSK 2 way peg in particular: https://www.rsk.co/noticia/sidechains-drivechains-and-rsk-2-way-peg-design/.



### Is there a correlation between BTC addresses and RSK addresses despite them looking like ETH addresses?


 RSK addresses are similar to Ethereum addresses. To avoid situations where users mistakenly send funds to Ethereum addresses or vice versa, we’ve implemented an address checksum mechanism that distinguishes between chains. This is currently in use by many Ethereum-like networks. Although this is not enforced in the node itself, it’s important to consider it at the client level (e.g.: wallets). The checksum mechanism is described in the following RSKIP: https://github.com/rsksmart/RSKIPs/blob/master/IPs/RSKIP60.md.



### Is there going to be an easier (more automatic) way to convert from BTC to RBTC, without going through an exchange?


 The native mechanism for transferring bitcoins to RSK (“peg-in”) and vice versa (“peg-out”) is provided by the 2-Way Peg. In practice, when a user pegs-in, the user funds are locked in the Bitcoin blockchain and the same amount of BTC is unlocked in the RSK blockchain. When a user requests a peg-out the bitcoins on RSK get locked in the RSK blockchain and the same amount of BTC  is unlocked in the Bitcoin blockchain. A security protocol ensures that the same bitcoins cannot be unlocked on both blockchains at the same time. This requires transaction finality, and that’s the reason the peg required hundreds of block confirmations for transactions that unlock bitcoins.

 Since not every user is willing to wait for the required number of block confirmations, exchanges offer a faster mechanism of getting BTC/RBTC, while charging users with exchanges fees.

 This blog post explains in detail: [RSK’s 2-Way Peg design](https://blog.rsk.co/noticia/sidechains-drivechains-and-rsk-2-way-peg-design/)

Additionally, more information about how to use the 2-Way Peg mechanism can be found here: https://developers.rsk.co/rsk/rbtc/conversion/ 



### How does the RIFtoken accrue value?


 We understand people can use bitcoins on RSK to pay for the 3rd party services on the RSK network, hence RIFtoken feels somewhat unnecessary.

 While the RSK Live Mainnet requires - and will always require -  Smart Contract execution to be paid in bitcoin, maintaining full incentive alignment with the Bitcoin Ecosystem, RIF OS Protocols aim to create and off-chain layer of infrastructure that initially is built on top of the RSK Ecosystem but will be integrated in the future with other Smart Contract enabled platforms.
In order to do so, it is important to have a token that is neutral to any of those networks and for which price is defined in connection with the supply and demand of infrastructure services regardless of the particular price of the native cryptocurrency of the network (RBTC, ETH, EOS, etc). From a user perspective it doesn't pose any additional friction as we expect that in the near future DEXs (Decentralized Exchanges) will provide instant conversion between the native currencies of the Networks where RIF OS Protocols are integrated and RIF Token. The portability of the RIF Token will create economies of scale and strengthen the antifragility of the Decentralized Ecosystem as a whole bringing the Internet of Value one step closer to realization. The main reason is that we envision RIF OS, in the long term, as a unified Marketplace for off-chain infrastructure services that can be consumed by every Smart Contract enabled crypto-economy (i.e. RSK, Ethereum, EOS). In that context having a portable / neutral token is a benefit.



### Does using RSK still require getting added to a whitelist?

There is no whitelisting process anymore.  The RSK blockchain is completely permissionless.. We implemented a whitelisting process during the bootstrapping phase until we were sure that it was secure enough to open to the general public.



### Is RIF really necessary for the construction of RSK? Why issue RIF tokens? Why not use RBTC uniformly?


 RSK Infrastructure Framework Open Standard (RIF OS) is a suite of open and decentralized infrastructure protocols that enable faster, easier and scalable development of distributed applications (dApps) within a unified environment. RIF OS includes support for decentralized, third-party, off-chain payment networks; a set of APIs for seamless and secure communications between decentralized applications; and easy-to-use interfaces for developers. Access and payment for RIF OS services are based on the RIF Token, which allows developers to access the suite of services built on top of RSK Infrastructure Framework protocols such as Identity, Payments, Gateways, Storage and Communications including third party-developed infrastructure services, and any other apps that might be deployed on RIF’s framework that agrees to accept RIF Tokens as a means of accessing / consuming the service or app. RBTC is the native token of the RSK Live Mainnet and is pegged 1:1 to BTC. It’s used as gas to pay for Smart Contract execution in the same way as ETH is used as gas for Ethereum. Technical users can obtain in a decentralized way by converting to and from BTC by using the bridge between the Bitcoin and RSK protocols. Less technical users can obtain RBTC from supporting exchanges like Huobi and Bitfinex among others in order to use the RSK and all of the applications that run on RSK (including RIFOS once it launches).

 While the RSK Live Mainnet requires, -and will always do-, Smart Contract execution to be paid in smartBitcoins (RBTC) maintaining full incentive alignment with the Bitcoin Ecosystem, RIF OS Protocols aim to create and off-chain layer of infrastructure that initially is built on top of the RSK Ecosystem but will be integrated in the future with other Smart Contract enabled platforms like Ethereum & EOS. In order to do so, it’s important to have a token that is neutral to any of those networks and for which price is defined in connection with the offer and demand of infrastructure services regardless of the particular price of the native cryptocurrency of the network (RBTC, ETH, EOS, etc). From a user’s perspective, it doesn’t pose any additional friction as we expect that in the near future DEXs (Decentralized Exchanges) will provide instant conversion between the native currencies of the Networks where RIF OS Protocols are integrated and RIF Token. The portability of the RIF Token will create economies of scale and strengthen the antifragility of the Decentralized Ecosystem as a whole bringing the Internet of Value one step closer to realization. The main reason is that we envision RIF OS, in the long term, as a unified Marketplace for off-chain infrastructure services that can be consumed by every Smart Contract enabled crypto-economy (i.e. RSK, Ethereum, EOS). In that context, having a portable / neutral token is a must.



## Consensus
### What consensus protocol does RSK use?


 Merge-mining is a protocol that allows miners to mine on both RSK and the Bitcoin blockchains at the same time with exactly the same hardware and with no performance penalty. Therefore merge-miners can earn rewards on both blockchains. RSK has improved several open-source mining-pool software to enable merge-mining. Currently more than 40% of Bitcoin hashrate is merge-mining RSK, making RSK the most secure Turing-complete smart-contract platform in the world in terms of cumulative energy spent to secure it  The RSK community is evaluating the upgrade to a recently developed variant of merge-mining called Strong Fork-aware Merge-Mining (SFAMM) that can increase the cumulative energy spent to secure RSK to 100% of Bitcoin’s hashrate.



### What is the DECOR+ protocol?


 In the Bitcoin network, when two or more miners have solved blocks at equal height, there is a conflict of interests. Each competing miner wants his block to be selected by the remaining miners as the best-chain tip. All the remaining honest miners and users would prefer that everyone chooses the same block tip, because this reduces the block reversal probability. DECOR+ sets the right economic incentives for a convergent choice, without requiring further interaction between miners. The conflict is resolved so that:



- The resolution is agreed by all parties (consensus) when all parties have access to the same blockchain state of information within a time bound (synchronous).
- If the system is partially synchronous, the conflict is resolved as in Nakamoto Consensus.
- The resolution maximizes all miner’s revenue when the conflicting block revenue (fees) is much higher than the average.
- The resolution reduces the power of the miners to censor other blocks or transactions when the conflicting block has a reward close to the average.
- Resolving the conflict takes negligible time

### Is RSK secure from selfish mining?


 DECOR+, plus the “sticky” rule make RSK consensus protocol incentive-compatible (that miners gain nothing from withholding blocks) assuming that transaction fees are stable, and there are no off-chain payments or bribes to miners.




## RIF technology
### What exactly is the value proposition of RIF?


 Is it a matter of utility, and if so, what exactly is that utility? If a token was useful for selling coins that couldn’t be sold with RBTC alone.

 This question has two sides as RIF is both a set of protocol standards and a token. RIF OS (RSK Infrastructure Framework Open Standard) is a suite of open decentralized infrastructure protocols that rely on blockchain based smart contracts to enable faster, easier and scalable development of distributed applications (dApps).

 The initial protocols include Directory (a naming service protocol), Payments (an offchain payment protocol), Data (a data storage and streaming protocol), Communications (a secure routing, session and encrypted communications protocol) and Gateways (an interoperability protocol that includes cross chain transfers and oracling services). The standards also define interfaces that can be implemented as APIs and libraries that abstract and simplify the use of decentralized infrastructure (both blockchain and P2P) for any developer even if they don’t know inner workings or low level functioning of decentralized protocols.

 This suite of protocols aim to solve the major problems that stop decentralized blockchain networks (ie: Bitcoin, RSK, Ethereum, etc.) from reaching mass adoption. From our point of view, the two main impediments are sustainable scaling (onchain scaling is possible but leads to higher maintenance cost for validation nodes and therefore to centralization) and developer usability (it can take several months for developers to learn how to use the technology and even mastering the tech, it’s very inefficient to build decentralized apps for the lack of a higher level protocol and reusable components).

 Following the guidelines of RIF OS, a series of blockchain based P2P platforms are being built being RNS, an implementation of RIF Directory on RSK, the first to be launched. RIF Lumino, the first implementation of RIF Payments, is soon to be launched as well and during 2019, the first version of full stack will be available. Now let’s talk about the utility of the RIF token within the RIF OS ecosystem.
 The first and obvious use is to access all the services provided in the RIF OS ecosystem. To comply with the RSK Infrastructure Framework, providers have to at least accept RIF tokens in exchange for their services. On top of that, certain protocols use RIF token as the collateral that all service providers need to stake in order to offer services on the RIF Marketplace. This is key given the decentralized nature of these platforms, without an embed insurance mechanism, it would be impossible to ensure quality of service to the end users. Additionally, on some protocols the ratio between the collateral and the amount of contracts a service provider has will be used to dynamically distribute new service contracts among registered providers.

 We also envision that in the not so distant future, other uses of the RIF token will arise surrounding the RIF marketplace. Two of the most relevant ones are the use of RIF token as collateral for the issuance of counterparty risk-free stable assets (ie: RIFUSD, RIFARS, etc) which can be used to denominate service prices in stable assets and the use of RIF token to settle transactions between RIF Payment Hubs without assets in common or sufficient liquidity.

 We envision RIF OS in the long term, as a unified Marketplace for off-chain infrastructure services that can be consumed by every major Smart Contract enabled crypto-economy so although the RIF Token was initially created on the RSK Network, in the future it will be portable to other platforms like Ethereum or EOS. This will create economies of scale and strengthen the antifragility of the Decentralized Ecosystem as a whole, bringing our vision of the Internet of Value one step closer to realization.



### Are you considering implementing some solution related to decentralized identities as a service in RIF?


 Yes. Together with the RIF Wallet library RIF Identity is one of the most important components of RIF OS. It provides the basics to anchor identities on the RSK Network and later sign and exchange event attestations that later can be used to build reputational models. We are in talks with the top experts in this field (Sovrin, uPort and others) to define a joint standard.

 Also we have a working relationship with Microsoft who is part of the ID2020 endeavor and we're partnering with the NGO Bitcoin Argentina, the Inter-American Development Bank and Accenture (another ID2020 member) to create and implement the first inclusive financial ecosystem built around reputational identity in the slums of Buenos Aires.



### Could you explain something about storage services?


#### It would be like IPFS? Will it use IPFS or some other similar and already working solution?

 IOV Labs is working to have a unified API for storing and retrieving files, and support several storage networks. This is the RSK Data Storage protocol. For a first network provider, we looked at the existing solutions (Swarm, IPFS, Storj, Sia...) and decided to base it on Swarm and IPFS. Most of these protocols implement a variation of following: a file uploaded is split into chunks and distributed in the network. When the file is requested, all the chunks are retrieved and assembled. Each node participating in this network is keeping track of data stored/provided for payment purposes. Of course RSK Data Storage will integrate with other RIF services like RNS to retrieve named files and allow mutability or RSK Payments for incentivisation. And in the future we’ll foster the integration of all successful storage networks under the same RSK Storage API and UI, so the user may be able to switch between storage network backends just by selecting the provider from a list, or even store a single file on several networks at the same time.

 There was a mention on twitter a while back about possibly implementing Chainlink as an answer to your Oracles. https://twitter.com/mwill_crypto/status/1064731255374147586



## RIF Name Service
### Can I register a domain in RNS and then sell it in a secondary market ?


 Anyone that registers a domain in RNS can sell the domain directly or using a third party secondary market.
 
### Care to go into detail about what RNS is all about?

 RIF Name Service (RNS) was designed to make the user experience more friendly by providing an architecture which enables the identification of blockchain addresses by human-readable names or aliases. It can be used to identify other personal resources, such as payment or communication addresses.

 Centralizing the access to multiple resources associated with a human-readable name, improves the blockchain platform user experience. Along with the “ease of use” by adding a name resolution service, or “alias”, the probability of errors is significantly reduced. As resource names may change over time, the system needs to be flexible to support frequent changes. Up until now, RIF Name Service only supported addresses built on the RSK Network but currently, users can manage multiple types of coins and assets.

 For more information about RNS visit https://www.rifos.org/rif-name-service/



## Wallets
### How can I recover my token from my jaxx wallet which was the only one that had RSK addresses, when the RSK faucet existed?


 Although it doesn’t happen very often, we periodically do planned fresh restarts of the RSK Testnet blockchain. This means that all account balances go to zero. A Testnet reset has been recently executed, so there is no way to recover Testnet funds once this is done. RSK Faucet still exists and you can get [Testnet RBTCs]( https://faucet.testnet.rsk.co/) and also [Testnet RIF - tRIF](https://faucet.rifos.org/).



### Any news about the IOV wallet as part of RIF libraries? Was this the one announced recently joint with mellow?


 Mellow wallet is under development but not yet available.


## Lumino
### Lumino general information


https://developers.rsk.co/rif/lumino/

### What are your plans for bringing Lumino to the general public?


 The RIF Lumino network is already available to the general public. (for more information visit: https://developers.rsk.co/rif/lumino/)

 Having said this, making Lumino a user-friendly internet of value is one of RIF's main priorities. For that reason, Lumino has already been integrated with the RIF Naming Service (RNS) which simplifies significantly the usability for non-technical users.

 Also we are currently working on the Lumino light-client and Development libraries to facilitate the integrations with wallets and exchanges.

 The IOV Labs team is also working on developing solutions for banks and organizations willing to use RIF Lumino for their business needs.



### What are the various KPIs of the lumino network: blocks per second, time to finality, tps and cost per transaction? Can people build on Lumino already? Which projects are building on top of it?


 The number of transactions per second that Luminio can achieve depends mainly on the actual network topology and the amount of coins participants lock in their channels. Also, from the tech perspective, the bandwidth and latency of the computers participating in the network are also key for providing a responsive system. Additionally, the capabilities of the network will depend on the network usage patterns of its users. It seems that there are still too many unknowns. However we can simulate certain expected patterns from small networks to larger and larger networks and get useful metrics about the network growth and number of successful payments, the payments settlement times, and the average costs. Taking into account the merging of the scalability improvement proposals already developed by RSK Labs for RSK, the obtained metrics show us that Lumino can scale to 60M active users without problems, with costs and response times that are competitive with other payment networks. To scale more, we see resource bottlenecks that would need to be addressed.

 There are several projects integrating their wallets and solutions with Lumino which will be announced once ready in the following months.



### How can I join the Lumino network?


 If you want to be part of the network, the Lumino repository is open and in the repository you can find instructions about node configuration and management.



### Now that Lumino is working, what’s the next step?


 We are working on new RIF Payments components to be launched soon as well as RIF Storage Protocol. By the end of the year we plan to count with a full suite of RIF OS services that will showcase how the full stack will work together.



## Federation
### What is the Federation?


 The RSK platform has been launched with a federation of well-known and respected community members (blockchain companies with high security standards) (the Federation). Each member is identified by a public key. The conditions to become a Federation member have been established, including security policies, backup procedures and legal requirements.



### What is the role of the Federation? How is it valuable?


 Currently the Federation only role is to secure the two-way-peg. In the future, they may provide additional services to the network. Some of the services that have shown to be valuable to the community are:



- Two-way peg with Bitcoin
- Two-way pegs with other cryptocurrencies
- Oracling services
- Checkpointing services

Bitcoin does not support smart contracts nor native opcodes to validate external SPV proofs. Part of the 2-Way Peg system in RSK requires trust on a set of notaries. In RSK, the notaries that protect the locked funds are the members of the Federation. The Federation members are respected community actors, such as important blockchain companies, and they also have the technical ability to maintain a secure network node. A requirement for being part of the Federation, is the ability to audit the proper behaviour of the software that powers the node, especially regarding the correctness of the component that decides on releasing BTC funds. For all of these reasons, we are not planning to move away from the Federation.



### Is it realistic to hope that RSK will move away from federation mode in mid-term future?


 The RSK platform has been launched with a Federation of well-known and respected community members (blockchain companies with high security standards). Each member is identified by a public key. The conditions to become a Federation member have been established, including security policies, backup procedures and legal requirements.

 Currently the Federation only role is to secure the two-way-peg. In the future, they may provide additional services to the network. Some of the services that have shown to be valuable to the community are:


- Two-way peg with Bitcoin
- Two-way pegs with other cryptocurrencies
- Oracling services
- Checkpointing services

Bitcoin does not support smart contracts nor native opcodes to validate external SPV proofs. Part of the 2-Way Peg system in RSK requires trust on a set of notaries. In RSK, the notaries that protect the locked funds are the members of the Federation. The Federation members are respected community actors, such as important blockchain companies, and they also have the technical ability to maintain a secure network node. A requirement for being part of the Federation, is the ability to audit the proper behaviour of the software that powers the node, specially regarding the correctness of the component that decides on releasing BTC funds. For all of these reasons, we are not planning to move away from the Federation.



### When does the team or the federation decide to issue more BTC?


 The Federation has no means of “issuing more BTC”. Transferring BTC to the RSK platform is an open process. In the beginning of RSK, we set some limits on the number of Bitcoins that can be transferred to RSK until the network leaves the Beta Stage and almost all restrictions will be lifted as soon as we reach about 51% of Bitcoin hashrate on merge-mining.



### What is the 2-Way peg service that the Federation provides?


 Bitcoin does not support smart contracts nor native opcodes to validate external SPV proofs. Part of the 2-Way Peg system in RSK requires trust on a set of notaries. In RSK, the notaries that protect the locked funds are the members of the Federation. The Federation members are respected community actors, such as important blockchain companies, and they also have the technical ability to maintain a secure network node. A requirement for being part of the Federation is the ability to audit the proper behaviour of the software that powers the node, specially regarding the correctness of the component that decides on releasing BTC funds.



## Mining
### What is merged mining?


https://developers.rsk.co/rsk/architecture/mining/


### How secure is RSK merge-mining?


 RSK merge-mining is as secure as Bitcoin mining, but assumes a stronger property from SHA256, which is “freestart collision security” of at least 100 bits. This is because the RSK network uses a property of the Merkle–Damgård construction to compress the size of the SPV proof.



### What are the incentives for miners to merge-mine RSK?


 Miners earn 80% percentage of the transaction fees from every RSK block they mine. These incentives will become more and more attractive while the RSK platform drives adoption, and the number of transactions in the network increases. Since merge mining RSK does not require any additional cost to the one required to mine Bitcoin, RSK provides an additional revenue stream for the Bitcoin miners using the same hardware and electricity. More information about RSK merge mining can be found here: [Merged Mining Is Here To Stay](https://www.rsk.co/noticia/rsk-bitcoin-merge-mining-is-here-to-stay/).

 We are currently looking for other ways to incentivize all RSK key players -including mining pools- to better align incentives while the network is bootstrapped. We’ll keep the community posted on any update about this.



### Is there a step-by-step guide for mining and node configuration?


 Some upcoming mining blog posts are currently being written, and we expect to have them released in the following couple of weeks. In the meanwhile, this is a list of useful links for users willing to understand more about merged mining and setting up mining nodes:

[What is merged mining](https://developers.rsk.co/rsk/architecture/mining/)

[Configure an RSK node to be used from a merged mining pool](https://github.com/rsksmart/rskj/wiki/)



### Is there any incentive to run a Lumino or RSK node for non-miners?


 By running an RSK node, you not only check the validity of your own transactions, but also that the rules of the system cannot be changed by any minority group. Therefore, it’s in RSK users best interest to run full nodes of their own. Having said that, we’ve designed -and we’re currently under development the first decentralized system for proving you’re a full node, so in the future we’ll be able to incentivize full nodes (see our Devcon3 presentation on Proof of Unique Blockchain storage). This technology will allow the economic reward of full nodes in the future which could be used to reward RSK and Lumino full nodes.



### Does RSK mining consume more electricity ?


 Merge-mining is a process by which Bitcoin miners can mine both Bitcoin and RSK at the same time, with the same hardware and consuming the same electricity. RSK merge-mining uses the same cryptographic hash function as Bitcoin (SHA256).



## Scalability
### How many transactions per second are allowed today on RSK?


 The number of transactions per second executable on the RSK platform is determined by the block gas limit and the average block rate. The current average block rate is one block every 30 seconds. At each mined block, the miner can vote to increase the block gas limit. Currently the block gas limit is 6.8M gas units per block. A simple RBTC transaction consumes 21K gas, so the RSK platform can execute 11 transactions per second today. This limit could increase in the future as there are several improvement proposals that lower the resources required to process transactions on the RSK network.

 For example, RSKIP04 enables parallel processing of transactions. If the proposal is accepted by the community, the block gas limit could easily double.

 Both the LTCP protocol, as described in the white-paper and in RSKIP53, and the shrinking-chain scaling technique could result in a ten-fold reduction in the amount of space required.

 If these proposals are accepted by the community, transaction speeds could be expected to reach 100 transactions per second.



### How many transactions per second will the RSK Network withstand?


 Beta releases of improved RSK nodes have been tested to accommodate 100 tx/s without incident. As the technology improves, transactions per second may similarly increase. The goal of RSK Labs is to reach up to 20,000 tx/sec using its Lumino technology, which is a second layer off-chain payment network that will be embedded on RSK’s reference node in the following release.



### What is the transaction confirmation time?


 On average, the network currently generates a block every 30 seconds. Miners can reduce the average block time to 15 seconds by optimizing their merge-mining operations. Applications should wait at least 12 confirmations to accept a payment, which corresponds to an average delay of 6 minutes.



### Is the RSK network compatible with the Ethereum network?


 The RSK network is highly compatible with the Ethereum network at various different layers: the execution virtual machine (EVM), the javascript programming interface (web3), node interprocess connectivity (JSON-RPC), and the smart-contract programming languages (Solidity).

 RSKVM is highly compatible with the EVM, but the RSKVM offers additional features not present in the EVM. To make use of these improvements, some changes to the smart contract source code are required. Furthermore, the RSKVM has specific precompiled contracts that provide the bridging functionality with Bitcoin. Approximately once a year, the Ethereum community performs a hard-fork to add new functionality. The RSK community has, in the past, incorporated these changes through corresponding hard forks on the RSK network. These trends are expected to continue in the future.



## Security
### How is the RSK blockchain secured?


 The RSK blockchain is secured by merge-mining, with some additional security measures. The RSK blockchain is mined by the Bitcoin miners, which are part of the largest and most reliable blockchain network in the world. Currently, more than 35% percent of the Bitcoin hash rate is simultaneously merge-mining RSK. On top of this, RSK Labs has published a RSKIP that proposes a solution where a set of notaries (some of the most renowned and trusted Bitcoin companies) will be able to provide an extra layer of security by issuing checkpoint notifications on the RSK blockchain. RSK nodes are not forced to follow the checkpoints, but can use this information to detect network-wide attacks and enter a safe mode. This subsystem sacrifices liveness(?) to increase safety, and can be compared to Bitcoin’s original alert system. In the case of RSK, the system is federated, rather than centralized, as in the case of the Bitcoin network.



### What is the 2-Way Peg?


 The 2-Way peg is said to be a method to transfer BTC into RBTC and vice-versa. In practice, when BTC is exchanged for RBTC, no currency is “transferred” between the two blockchains. There is no single transaction that does the job. This is because Bitcoin miners cannot verify the authenticity of balances on another blockchain. When a user intends to convert BTC to RBTC, some BTC are locked in the Bitcoin blockchain and the same amount of RBTC is unlocked in the RSK blockchain. When RBTC needs to be converted back into BTC, the RBTC gets locked again in the RSK blockchain and the same amount of BTC is unlocked in the Bitcoin blockchain. A security protocol ensures that the same Bitcoins cannot be unlocked on both blockchains at the same time. This requires transaction finality, and that’s the reason the peg required hundreds of block confirmations for transactions that unlock BTC or RBTC.



### How does the peg work?


 When a Bitcoin user wants to use the 2-Way Peg, he sends a transaction to a multisig wallet whose funds are secured by the Federation. The same public key associated with the source bitcoins in this transaction is used on the RSK chain to control the Smart Bitcoins. This means that the private key that controlled the Bitcoins in the Bitcoin blockchain can be used to control an account on the RSK chain. Although both public and private keys are similar, each blockchain encodes the address in a different format. This means that the addresses on both blockchains are different.



### How does RSK secure the funds locked in the peg?


 Currently the funds in the peg are secured by a threshold signature managed by the Federation. At least 51% percent of the Federation members signatures are required to transfer bitcoins out of the peg wallet. The process to unlock bitcoins is controlled by a smart contract running in the RSK blockchain. All coordination actions are open for every user to see.

 The original RSK roadmap proposed to add drive-chain support to enhance the security of the funds in the peg. This requires a Bitcoin soft-fork, which may or may not occur. RSK Labs created a BIP and working code to implement this drive-chain in Bitcoin. If Bitcoin soft-forks to support the drivechain BIP RSK proposed, unlocking funds from the peg will also require 51% percent acknowledgement by the merge-mining hashing power. With the hybrid Federation/drivechain proposed by RSK Labs, both the majority of federation members and the merge-miners must acknowledge a release transaction, increasing the overall security of the peg.



### How is the RSK blockchain secured from double-spend attacks?


 The RSK blockchain is secured by proof-of-work based on the SHA256D algorithm like Bitcoin. If all the RSK miners collude, they can censor one or all of RSK transactions but they cannot steal RBTC or Bitcoins.



### How does the security of the RSK network compare to Bitcoin?


 The security of the RSK network will depend on the amount of merge-mining engagement and the number and quality (security compliance) of the Federation members. More than 40% of the Bitcoin miners are currently merge-mining RSK (as of Dec-2018) and another 30% are planning to merge-mine in the future, so there is an expectation that more than 51% of Bitcoin miners will be securing the RSK network soon. Furthermore, the RSK network could theoretically reach a higher hash rate than Bitcoin, by combining merge-mining hash rates from other bitcoin clones.



### How do confirmations on the Bitcoin blockchain compare to confirmations on the RSK blockchain? Are 6 confirmations on the RSK platform sufficient for a transaction to be considered confirmed?


 A recent paper established that in the context of transaction reversal probability, 6 Bitcoin confirmations (average 1 hour) would be equivalent to approximately 12 RSK confirmations (average 6 minutes). While Bitcoin has the concept of 0-confirmations (the transaction has been broadcast without Replace-by-fee), there is no similar concept in RSK. The fastest real confirmation in RSK is “1.5” confirmations, or 1 confirmation plus 5 seconds without a block reversal, or an average of 35 seconds.



### Is RSK secure from users using blockchain resources (CPU, bandwidth, storage) for free?


 The RSK “gas system” prevents an attacker from creating, spreading and including resource-intensive transactions in blocks without paying the associated fees. Every resource, including CPU, bandwidth and storage is accounted for by consumption of an amount of gas. Every block has a gas limit, so the resources a block can consume are limited, making a resource exhaustion attack ineffective.



### Is RSK secure from miners abusing the gas system to cheaply acquire resources as in Ethereum?


 In Ethereum a miner can include transactions specifying zero gas price, thus acquiring persistent contract state memory almost for free (if no transaction backlog). In RSK a high percentage of the transaction fees go into a reward pool for future miners, a small fraction of the transaction fees are burned and there is a minimum gas price negotiated by the miners. Therefore, rogue miners cannot get platform resources at no cost.



### What are the differences between a Bitcoin address and an RSK address?


 An RSK address is an identifier of 40 hexadecimal characters while the Bitcoin address is an identifier of 26-35 alphanumeric characters.

 https://www.rsk.co/faqs/?cat=security



## Adoption/Use Cases
For use cases informations go to [Use Cases](https://www.rsk.co/Use-cases)

## Competitors
### How does rootstock compare with similar bitcoin sidechain projects?


 There are only two other Bitcoin sidechain projects that are currently active: Liquid and Truthcoin’s drivechain. Liquid is a federated sidechain, somehow similar to RSK. Liquid aims to be an inter-exchange settlement network linking together cryptocurrency exchanges, enabling faster Bitcoin transactions. It’s optimized for a single use case. RSK is much more generic and programmable, having stateful smart-contracts. Also RSK is highly compatible with Ethereum applications, libraries and toolchains. It has a large ecosystem and trained developers. Liquid applications currently depend on a single library provided by Blockstream, and has a niche ecosystem.

 Another key difference is that Liquid uses its Federation for block consensus, while RSK uses merge-mining, and currently it has about 40% of Bitcoin’s hashrate. Therefore RSK has actual “thermodynamic” security. Anyone can participate in RSK merge-mining, so anyone can receive transaction fees.

 Regarding onchain transaction throughput, RSK can achieve a higher volume than Liquid because essentially RSK’s payment transactions are smaller than Liquid’s. However, currently the transaction throughput in RSK is limited by its miners, which can increase or decrease the block gas limit. In following RSK network upgrades we may see the two important developments implemented: the LTCP protocol (see RSKIP53) and parallel transaction processing (see RSKIP04). These improvements together enable 30x transaction throughput increase in RSK. Another key difference between RSK and Liquid is that the RSK peg is open. It can be used by individual users without going through an exchange, and a KYC process. However, the fastest way to get RBTC is still exchanging BTC at a crypto exchange, because it takes a day to transfer bitcoins to RSK using the peg. In terms of Federation security, Liquid uses a 11-out-of-15 multisig with a 2-of-3 time-locked emergency spend, and RSK uses a 8-out-of-15 multisig, so each sidechain has different traseofs between availability and security.

 Truthcoin’s drivechain is only running as a testnet because it requires a Bitcoin soft-fork to run on mainnet, so it’s not really a project one can build applications for now. However we share with Truthcoin the long term vision that sidechains should move from the federated model to a more decentralized one.



### How does RSK compete with Lightning Network?


 First, Lightning would be more comparable to RIF Lumino Payments on top of RSK than to RSK itself. Having clarified that, we don’t see Lightning as a competitor but as a complement. With dual Lightning / Lumino nodes, people will be able to do atomic swaps of bitcoins for smartBitcoins greatly simplifying the use of the RSK Network.

 On the other hand, Lightning is bitcoin only at the moment while RIF Lumino Payments will enable offchain payments for any token living on the RSK Network. Imagine the potential of having instant payments of stable assets tethered to fiat currency fully integrated with Bitcoin and costing a fraction of a cent. That can create the perfect playground for FinTechs all over the world and will enable competition on the financial system in a whole new level.



### Ethereum is going to change a lot in the next couple of years. What do you think about Ethereum 2.0 and especially about their plans to use eWASM instead of EVM. What is RSK's strategy?


 I think supporting an improved VM is a good long term strategy, not because Ethereum (or any blockchain) should be a “world-computer” (it shouldn't) but because certain cryptographic primitives that are cornerstones of more scalable and private 2nd layer payment protocols need more onchain processing than what the EVM can provide. EVM should remain either interpreted or transpiled for backwards compatibility.

 EWASM aims to be a consensus-enforced and resource-accounted deterministic WASM JIT compiler, and that’s a difficult thing to do. The design is still being modified, it needs peer review, a clear specification and several security audits. EWASM is still far away from reaching a beta-state milestone.

 RSK strategy detailed in its foundational whitepaper was to provide EVM compatibility while implementing a java bytecode based VM, with dynamic transpiling of EVM codes into java bytecodes. We researched and developed our prototype VM, but when RSK launched Ethereum-compatibility was the top priority, so the new VM was postponed. Meanwhile, the AION team did a great job and launched their java-based AVM, which is in production state. Now we’re evaluating the possibility to propose to the RSK community using the AVM as the new VM, and we may collaborate with the AION team in standardizing the AVM.



### Can you compare ethereum and RSK blockchain size? I mean is the RSK chain growing at the same speed as Ethereum? (if there would be same transaction amount)


 RSK has less onchain activity than Ethereum, which is something you would expect for a blockchain that is one year and a half old. Therefore the blockchain is much smaller than Ethereum. However, prior to the 1.0.0 release the RSK blockchain could grow as fast as Ethereum for equal transaction volumes. With the advent of the Unitrie, which is part of the 1.0.0 release, the blockchain state is ten times smaller. For example, the last world-state consumes no more than 50 Mbytes. The current Ethereum state consumes about 130 GB. That’s 2600 times more.



### How do you think RSK would compare against other projects like ETH or IOTA?


 Ethereum is RSK’s closest relative. It’s proof of work based, as RSK, and it shares a similar virtual machine and application interface. There are however key differences.

 From the economic point of view, Ethereum has a native speculative token, Ether, and network effects are currently pushing for Bitcoin to become a single strong cryptocurrency that can serve as a store of value for the ecosystem. If this trend of market consolidation continues, the value of Ether may degrade.

 Also, Ethereum is a generic smart-contract layer tailored for dApps having their own tokens. These dApps can only grow to be used by millions by removing the friction imposed by Ether as an intermediate token. This force in the community will push Ethereum (and any other smart-contract platform) to a dynamic where transactions are paid in tokens, and users connect to third party relayers that receive micro-payments in tokens to pay the transaction gas in ether for them, something known as de-facto economic abstraction. Therefore the value of ether may be in jeopardy. While smart contract staking is an opposed force, some of the largest Ethereum projects, like MakerDAO, are now allowing staking in tokens, so ether is also losing the exclusivity as a staking mechanism. RSK, on the contrary, uses Bitcoin as its native token, and does not need to incentivize its users to hoard the coin.

 Finally, Ethereum is rebuilding itself as a PoS blockchain, mainly because it has reached its end-of-life in terms of scaling capacity. The migration to Ethereum 2.0 carries an enormous technical risk, and the migration, if successful, will take several years. Meanwhile, its user base will strive to run applications in a costly environment that has already priced-out standard PCs as full nodes. RSK has a different scaling plan that is based on the conservative expansion of its onchain layer using compression and aggregation techniques, together with better resource allocation using storage rent. This layer will be ideal for 2nd layer scaling solutions, and we are encouraging these developments on our platform. There are many teams working on 2nd layer networks who need a stable onchain layer that they can rely on today and tomorrow.

 IOTA tries to solve the consensus centralization problem by making every user a miner that provides proof-of-work embedded in their transactions, and these little proofs in mass secure the past transactions of the ledger. Therefore, IOTA security depends heavily on its continuous use as a payment mechanism. Decentralization is a noble goal but more important is having a solid strategy to achieve it. Satoshi created a positive feedback loop when he added a block subsidy to the blockchain. On the contrary, IOTA has an unsolved bootstrapping problem. It could not bootstrap even adding a centralized coordinator during years. It could not achieve a minimum level of thermodynamic security. Recently, they implemented a completely new consensus protocol to fix this. Maybe it works, but analyzing the project technical track record I wouldn’t count on it. Anyway, from the technical point of view, the use of partial order consensus precludes the “tangle” to be used for stateful smart contracts, so it has limited functionality. Finally, using PoW in every transaction precluded the possibility of SPV-based public verifiability, like FlyClient or NiPowPow methods, as you need all transactions to verify the blockchain proof-of-work.



### Is it actually a bad idea to remain compatible with Ethereum?


 The people at IOHK are working on KEVM type of sidechains. They promote that with the K framework it's much easier to formally verify correctness of smart contract code. Now, when Ethereum 2.0 anyway will go out of EVM, maybe it's a good idea not to try to be 100% compatible with them and implement changes which may make EVM type of blockchains be better than Ethereum implementation. What’s your take?

 IOHK is working on IELE, a virtual machine which facilitates formal verification. It’s still an ongoing work, but it has the benefit that it integrates with the LLVM Compiler toolchain. The AVM enables a vast ecosystem of existing Java libraries and tools. EWASM has the benefit of being the language of choice by web browsers, so it will be fast. And I can continue giving the pros and cons of each VM at the opcode level. But it’s clearly too early to pick a winner!

 RSK is here for the long term. It was created to use the best available technology, and that technology may not come from the RSK development team, but from other teams. It means that if we see there is traction and a community that builds solutions around IELE or AVM or EWASM, we may also propose integrating it into RSK. I’m not scared of having several VMs running on a node. They are easy to encapsulate. But I suppose that in 20 years there will be only one preferred VM, and the rest VM bytecodes will be transpiled into it.



### When can we expect Integration with LTC ?


 We created the RSK-LTC working group, with members of the RSK and Litecoin community, to evaluate the possibility of proposing a bridge between the two platforms. However, there is no finalized community proposal or reference code for integrating a Litecoin bridge in RSK at this moment.



## San Francisco Innovation Studio and Ecosystem Fund
Visit the links beow for information about the fund and innovation studio


 https://hackernoon.com/why-we-created-a-fund-and-an-innovation-studio-dedicated-to-bitcoin-82f2bed7b04b

 https://iovlabs.org/press/first-blockchain-innovation-and-development-studio-for-bitcoin-rsk-rif-os-opens-in-san-francisco.html



### What's the status of the Blockchain Innovation and Development Studio in San Francisco?


 The SF Innovation Studio was officially launched in early June 2019 and is currently focused on developing some much-needed tools for developers, including the developers website. In August we demoed a Ganache integration at Trufflecon, and we will soon launch our own set of web3 libraries. In addition, we will soon launch an open-sourced wallet based on these libraries.

 In parallel to this, the studio engages with developers and startups to work collaboratively on innovative tools and dApps that can bring value to the RSK ecosystem. We also work closely with the Ecosystem Fund, which is run from the same office as the Studio in SF. If you want to contact us, feel free to drop us a line at studio@rsk.co.