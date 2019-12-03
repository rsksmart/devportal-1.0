---
layout: rsk
title: Migrate a name
---

To renew you domain's expiration, migrate your domain!

Any name that has been registered using the [Auction Model](Register-a-name-auction) contract should be migrated to the new [renovation model](Renew-a-name). From now on, every new domain registered under `.rsk` top level domain will be managed by the [RSKOwner](https://github.com/rnsdomains/rns-rskregistrar/blob/master/contracts/RSKOwner.sol) contract. This contract is in charge of domain expirations.

Once you migrated your name, follow [this](Renew-a-name) guide to renew your domain's expiration.

<div class="alert alert-warning">
    If a name is not migrated before expiration, you will lose the domain ownership. In that case, you will be prompted to <a href="/rif/rns/operation/Register-a-name">register</a> your domain again.
</div>

## How to migrate a name?

Login to the [RNS Manager](https://beta.manager.rns.rifos.org/admin). You will see the following alert in the admin tab if your name has not been migrated yet.

<img src="/assets/img/rns/migrate-button.png" class="img-fluid" alt="migrate-button" />

Click on "migrate", sign the transaction, and you're done!

