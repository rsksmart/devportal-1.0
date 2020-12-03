---
layout: rsk
---

# Police officers app - QR-scanner-like mobile application (Android)

The Police officers app is a mobile application that can be used to scan credentials presented on QR codes.

Read the [running guide](../run) to run the whole project or [browse the open-source repo](https://github.com/rsksmart/rif-identity-ui/tree/holder-v0.1.2/apps/W3CVerifier) to run locally (please use tag `holder-v0.1.2`)

Take a look at the [Figma prototype](https://www.figma.com/proto/KFwPTkCesIMlnutNDqJQLD/Gibraltar-Identity?node-id=274%3A2&scaling=min-zoom)

### specifications

- User interface: the app displays a list of credentials that were verified and the verification status (accepted/rejected) of each. It also displays a button that prompts a QR scanner which is used to scan the holder’s QR. After the scan, the status of the verification and the credential details are displayed.
- Communication: the app does not need to communicate with the issuer application. All the necessary information to authenticate and verify the credential is shared in the QR. To verify the issuer identity it stores the issuer public key and performs cryptographic verification with signatures shared with the credential.

## Features

- Verify presentations displayed from [the citizens app](../holder-app) via QR code
- List the historical scanned presentations with verification success indicator
