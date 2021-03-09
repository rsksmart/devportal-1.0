---
layout: rsk
title: Migrate from auction model
---

Any name that has been registered using the [Auction Model](/rif/rns/operations/register-auction-deprecated) contract should be migrated to the new [registration model](/rif/rns/operations/register).

1. Login to the [RNS Manager](https://beta.manager.rns.rifos.org/admin).
2. You will see the following alert in the admin tab if your name has not been migrated yet.
    ![migrate-button](/assets/img/rns/migrate-button.png)
3. Click on "migrate", sign the transaction, and you're done!

<hr />

To renew you domain's rent time, migrate your domain!

From now on, every new domain registered under `.rsk` top level domain will be managed by the [RSKOwner](https://github.com/rnsdomains/rns-rskregistrar/blob/master/contracts/RSKOwner.sol) contract. This contract is in charge of domain expirations.

Once you have migrated your name, follow [this](/rif/rns/operations/renew) guide to renew your domain's expiration.

<div class="alert alert-warning">
    If a name is not migrated before expiration, you will lose the domain ownership. In that case, you will be prompted to [register](/rif/rns/operations/Register-a-name) your domain again.
</div>
