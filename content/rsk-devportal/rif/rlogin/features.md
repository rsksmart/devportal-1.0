---
menu_order: 200
menu_title: Features
layout: rsk
title: rLogin - features
tags: rlogin, rif, rif-identity, web3, react, frontend, dapp, metamask, ledger, trezor, dcent, liquality, portis
description: rLogin - features - a list of features and how to use them
---

Get the most from rLogin!

### Trigger the modal

You can trigger different pop ups after the user has logged in

#### Show the wallet information

```typescript
rLogin.showWalletInfo()
```

#### Show the change network

```typescript
rLogin.showChangeNetwork()
```

> Listen to the network changes in the provider with `provider.on('networkChanged', (netId) => {})` as per the standard

### i18n

rLogin includes 7 languages by default.

> To add more languages see `src/i18n.ts`


Restrict supported languages:

```typescript
const rLogin = new RLogin({
    // ...
    supportedLanguages: ['en', 'es']
})
```

### Listeners

Listen to different user events

#### Listen to language changes

```typescript
rLogin.on('languageChanged', (language) => {})
```

#### Listen to theme changes

```typescript
rLogin.on('themeChanged', (theme) => {})
```

### Responses

Get deep info from the rLogin response

```typescript
rLogin.connect().then(({
    provider, // the web3 provider
    disconnect, // the logout function
    selectedLanguage,
    selectedTheme,
    dataVault // Data Vault client already set-up
              // for permissioned mode
}) => {})
```

#### Dark/light

The tool has a customizable dark/light mode.

See `src/theme.ts` and configure

```typescript
const rLogin = new RLogin({
    // ...
    customThemes: { /* { ... } */ }
})
```

### Customizable CSS

You can modifty any of the elements inside the pop-up using CSS. Find the component you want to alter and get its class name from `src/constants/cssSelectors.ts`
