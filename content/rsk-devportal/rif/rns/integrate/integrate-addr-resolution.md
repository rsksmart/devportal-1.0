---
menu_order: 200
menu_title: Quick Start
layout: rsk
title: Use domains instead of long hexa addresses
tags: rif, rns, rif-name-service, integrate, resolver, node, sdk, libraries, infrastructure, protocols, mvp, design, rbtc, defi, decentralized, quick-start, guides, tutorial, networks, dapps, tools, rootstock, rsk, ethereum, smart-contracts, install, get-started, how-to, mainnet, testnet, contracts, wallets, web3, crypto
---

This is a demonstration of how to get the address of a domain. We are going to do it in a React app.

## Requirements

- [Node](https://nodejs.org)
- [npm](https://npmjs.org)
- [yarn](https://yarnpkg.com/)
- [create-react-app](https://create-react-app.dev/)

## Recipe

1. Create a new react app

    ```
    create-react-app rns-addr-sample-app
    cd rns-addr-sample-app
    ```

2. Install `@rsksmart/rns` and `web3`.

    ```
    yarn add web3 @rsksmart/rns
    ```

3. Update your `App.js` file

    ```javascript
    import React, { Component } from 'react';
    import Web3 from 'web3';
    import RNS from '@rsksmart/rns';

    export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            domain: '',
            getting: false,
            addr: null,
            error: null,
        };

        this.handleDomainChange = this.handleDomainChange.bind(this);
        this.getAddress = this.getAddress.bind(this);
    }

    handleDomainChange(event) {
        this.setState({ domain: event.target.value, addr: null, error: null });
    }

    getAddress() {
        const { domain } = this.state;

        this.setState({ getting: true, addr: null, error: null  });

        const web3 = new Web3('https://rpc.mainnet.rootstock.io/API_KEY') // or 'https://rpc.testnet.rootstock.io'
        const rns = new RNS(web3);

        rns.addr(domain)
        .then(addr => this.setState({ addr, getting: false }))
        .catch(error => this.setState({ error, getting: false }));
    }

    render() {
        const { domain, getting, addr, error } = this.state;

        return (
        <div>
            <input type="text" onChange={this.handleDomainChange} value={domain} />
            <button onClick={this.getAddress}>get address</button>
            {getting && '...'}
            {addr && <label>{addr}</label>}
            {error && <label>Error: {error.message} - Read more on {error.ref}</label>}
        </div>
        );
    }
    };
    ```

> Replace `"API_KEY"` with the api key that you have created for this App. For information on how to create an api key, see [How to get started with RPC API](/tools/rpc-api/).

4. Start the app

    ```
    yarn start
    ```

## Result

![](/assets/img/rns/get_addr_sample.png)

Try the app in [rnsdomains.github.io/rns-addr-sample-app](https://rnsdomains.github.io/rns-addr-sample-app).

Repository: [github.com/rnsdomains/rns-addr-sample-app](https://github.com/rnsdomains/rns-addr-sample-app).

<div class="container the-stack">
  {% include rns-integrate-dapp-wallet.html %}
</div>
