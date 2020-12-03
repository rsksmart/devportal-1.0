---
layout: rsk
---

<div class="alert alert-danger">
  This is a proof-od-concept implementation of the RIF Data Vault. The current implementation documentation can be found [here](../../../data-vault)
</div>

## Data Vault - user-centric cloud storage service

A Data vault First approach. This service uses an IPFS node to pin files.

After the store process the holder can verify the file was uploaded accessing to IPFS. When a recovery is required, the server will response all the CIDs of the files that were ever stored by the DID, the DID holder can then retrieve the files from IPFS. To maintain this flow a local DB maps DIDs to CIDs.

> Alert: anyone in possession of a DID can used the server to upload files, now it has just file-size restrictions

Read the [running guide](../run) to run the whole project or [browse the open-source repo](https://github.com/rsksmart/rif-identity-services/tree/v0.1.0/services/data-vault) to run locally (please use tag `v0.1.0`)
