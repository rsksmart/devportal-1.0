---
layout: rsk
---

## The MVP - Acknowledgements

Most of the acknowledgements about bad-use, bugs or features to be upgraded are found in each repo's issues.

The applications, services and libraries were audited. This is the report:

_We identified the following areas for the improvement of RIF Identity security, we recommend prioritizing the fixes for issues 1 and 2:_

1. Holder app: Mnemonic and private key are [stored on the local database without encryption](https://github.com/rsksmart/rif-identity-ui/blob/develop/apps/IdentityApp/src/daf/dafSetup.ts#L32), currently it's using a 'dummybox' with a hardcoded secret that does not encrypt at all. Consider using [this library](https://www.google.com/url?q=https://www.npmjs.com/package/react-native-keychain&source=gmail&ust=1607113160532000&usg=AFQjCNF17phew-5RaIRABlvhadtwbiTBPg) to store the secrets and to avoid implementing your own cryptographic functions.
2. The authentication flow in express-did-auth allows relay attacks, this means that, for example: the Convey service can force the client (mobile app) to sign a challenge for the credential request service or vice versa. Currently, the client includes the server's DID as subject (JWT sub) on the challenge response. However, this subject is not verified on the server when [processing the challenge response](https://github.com/rsksmart/rif-identity-services/blob/2788d68216806a116beddb133d9f5dd531de61a3/packages/express-did-auth/src/index.js).  The [getAuthToken()](https://github.com/rsksmart/rif-identity-services/blob/2788d68216806a116beddb133d9f5dd531de61a3/packages/express-did-auth/src/index.js#L78) must verify that the subject included on the challenge response matches the DID of the service.
3. Holder app: Deprecated [crypto library](https://github.com/rsksmart/rif-identity-ui/blob/develop/apps/IdentityApp/src/daf/AESSecretBox.ts) uses a static IV to encrypt the presentation (vp) before uploading it to Convey. This means that if two presentations begin with the same values, the encryption will result in the same cipher text on the first 16 bytes. In this case, the presentations begins with a different timestamp (iss/exp) which mitigates the issue. However, if this function is used to encrypt another data in the future, it would leak information that could allow further attacks.
4. Revocation of credentials is not possible, the user interface on the Issuer app, it displays the option but is not implemented on the backend yet.
5. Issuer app: When a credential is "revoked" the backoffice user can change the status of it to "granted" again. The user interface does not allow this, however it's possible to change the status from "revoked" to "granted" sending [direct requests](https://github.com/rsksmart/rif-identity-services/blob/2788d68216806a116beddb133d9f5dd531de61a3/services/issuer/src/services/backOffice.ts#L52) to the server.
6. Holder app: Screen capture is permitted, users could take a screenshot of the mnemonic phrase and increase the risk of compromise as it will be stored on the photo gallery and cloud backups. Consider this example [library](https://github.com/hawkup/react-native-prevent-screenshot-poc).
7. Holder app: Remove the screen [PIN lock logged to console](https://github.com/rsksmart/rif-identity-ui/blob/5f2809f739c0143cd9305a388de28589f86a3df5/apps/IdentityApp/src/features/pin/operations.ts#L44).
