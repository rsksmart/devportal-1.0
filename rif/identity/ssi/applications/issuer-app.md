---
layout: rsk
---

# Issuer App

The Issuer App is a React application that handles the back office tasks of issuing and rejecting credential requests. It is built to be connected to any Request Credential Service Server (that is API compatible with [RIF Identity issuer service](../../services)), and login happens with a username and password.

### Features

- Login using HTTP Basic Auth with username and password
- View list of received credential requests and request content
- Issue and Deny Verifiable Credentials

### Screenshots

#### Login Screen

![Login Screen](../../../assets/img/ssi/applications/issuer-app/sign-in.jpg)

#### Credential List

![Credential List](../../../assets/img/ssi/applications/issuer-app/credential-list.jpg)

### Extend

The issuer app has a lot of potential for future development including:
- Adding back-office claims to credentials
- User management
- Revoking credentials
- Managing credential templates/types
- History

### Run locally:

The issuer application can connect to any credential server so there is no need to set environment variables. 

```
yarn
yarn start
```

### Run for development

```
yarn
yarn build
```

### Links

- [Github Repo](https://github.com/rsksmart/rif-identity-ui/tree/develop/apps/issuer-app) - the repo is part of the larger SSI UI repository.
