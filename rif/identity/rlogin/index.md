---
layout: rsk
---

## rLogin - where web3 meets SSI

rLogin is a tool that allows the developers to connect their users with both blockchain functionalities and self-sovereign identity (SSI) models seamlessly, giving the user the power of data privacy and portability.


**Quick start! Jump to [rLogin docs](/rif/identity/rlogin/libraries/modal) to install the front end tool**

You may also want to see

- [current integrations](/rif/identity/rlogin/integrations) as a reference,
- some [sample apps](/rif/identity/rlogin/samples) to try it on your own,
- or follow this [series of articles](https://hackernoon.com/rlogin-the-new-authentication-libraries-for-blockchain-based-apps-h619330z) as a guide

After integrating rLogin you achieve:

- a back-end authenticating users by their wallet addressed - their Decentralized Identifiers
- a registration model capable of requesting users for data stored in its user-centric cloud storage, the [Data Vault](/rif/identity/data-vault)
- a front-end capable of interacting with any wallet that the user chooses, with a pre-designed user experience for registration and login
- compatibility with a unified platform where the user can control their identity and information, the [RIF Identity Manager](/rif/identity/manager)

![rlogin-architecture-simple](/rif/identity/rlogin/assets/rlogin-architecture-simple.png)

### State of the art

We identify there are two types of decentralized applications: applications with a back-end and applications without a back-end. Applications without a backend interact directly with the blockchain, and probably with some public service (eg: RNS). Backend applications need a type of authentication that confirms the users are in control of their wallet (thus, their private keys) at the time of use (eg: Money on Chain). We call this the web 3.0.

There are web 2.0 applications, where confidence in the authenticity of users relies on services provided by third parties, such as [Google Authentication](https://developers.google.com/identity). These applications require that the user log in to their account in a third party service. This third party service shares the user's private information, giving the application the necessary information to authenticate the user. The information is in control of the third-party, which can use it arbitrarily to gain future access.

Today's decentralized apps have no way of requiring private user information in a unified way. Nor is there any platform that allows an application to obtain reliable proof that a user was authenticated by a third party service without having to communicate with it.

![identity-30](/rif/identity/rlogin/assets/identity-30.png)

### Design & Architecture

The rLogin design consists of 4 core modules:

- A back-end authentication library
- A cloud storage service where users can store their credentials
- A standard interface for Verifiable Credentials enabling data portability
- A client library combining authentication against back-end using user's wallet and store credentials

[Read more](/rif/identity/rlogin/architecture)

![rlogin-architecture](/rif/identity/rlogin/assets/rlogin-architecture.jpg)

### Libraries

{% include rif-id/rlogin-libraries.md %}

### Integrate

{% include rif-id/rlogin-integrate.html %}

---

- [Integrate](/rif/identity/rlogin/integrate/)
- [Integrations](/rif/identity/rlogin/integrations/)
- [Design & architecture](/rif/identity/rlogin/architecture/)
- [Libraries](/rif/identity/rlogin/libraries/)
  - [rLogin modal (client side)](/rif/identity/rlogin/libraries/modal/)
  - [DID Auth (server side)](/rif/identity/rlogin/libraries/express-did-auth/)
  - [Verifiable Credential schemas (communication)](/rif/identity/rlogin/libraries/vc-json-schemas/)
- [Develop](/rif/identity/rlogin/develop/)
