---
layout: rsk
title: RNS Integration guidelines
---

RIF Name Service (RNS) is a decentralized service that allows users to have a readable domain in any blockchain. It can be used to identify other personal resources, such as payment, ID, storage or communication addresses.

In other words, RIF Name Service (RNS) is the phonebook of the blockchain. Humans access information online through domain names, like alice.rsk or bob.rsk. Wallets interact through the blockchain protocol using addresses. RNS translates domain names to addresses so users can send funds and interact with dapps and people using this domain names.

In order to accomplish that, you should integrate this service to your dApp or wallet. Is really simple! Just need to add our RNS Javascript package to your project and let magic occurs.

Just to provide a simple example, let's try to send funds from one wallet to another. So, instead of asking the user to write a non friendly blockchain address, let's allow him/her to enter just a domain.

![](https://i.imgur.com/eO4FG1s.png)

RNS will be in charge of translating that domain to an actual blockchain address.

```javascript
const transferToDomain = async (domain) => {
    const address = await rns.addr(domain);

    return transferTo(address);
}
```

We are pretty sure that the provided example is not enough for all your needings, so let's go deeper on integration.

## Quick start

{% include rns-register.html %}

<div class="container the-stack">
  <div class="row has-unique-col rif_blue_text">
    <div class="col">
      <a href="integrate-addr-resolution">Use domains instead of long hexadecimal addresses</a>
    </div>
  </div>
  {% include rns-integrate-dapp-wallet.html %}
</div>

_This guides explain how to integrate with RNS within your JavaScript app._

### Basic setup

_Install [`Web3.js`](https://www.npmjs.com/package/web3) and [`@rsksmart/rns`](https://www.npmjs.com/package/@rsksmart/rns)_

```
npm i web3 @rsksmart/rns
```

> _This was tested with Node v10.15.1 - npm v6.13.6 - yarn v1.17.3._
>
> _This should work in most of Node environemnts. In case something goes wrong try activating v10.15.1 with [nvm](https://github.com/nvm-sh/nvm)_

<div class="container the-stack">
  {% include rns-integrate-dapp-wallet.html %}
</div>

RNS JavaScript library related links:
- Read the [docs](https://developers.rsk.co/rif/rns/libs/javascript)
- Collaborate in [Github](https://github.com/rnsdomains/rns-js)
- Contact us via [Gitter](https://gitter.im/rsksmart/rif-name-service)
