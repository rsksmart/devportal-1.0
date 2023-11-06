---
menu_order: 600
menu_title: Advanced operations
layout: rsk
title: "Advanced operations - RNS User guide"
description: "How to change the controller of the domain, change the resolver of the domain, add a record, update a record, remove a record, enable reverse resolution lookups, disable reverse resolution lookups"
tags: rns, guide, rns-user-guide
---

These are the advanced operations you can perform with the RNS manager:

- Change the controller of the domain
- Resolver
    - Change the resolver of the domain
    - Content field
        - Add content record
        - Update content record
        - Remove content record
- Enable reverse resolution lookups

To activate the advanced mode:

![advanced operations - Advanced mode](/rif/rns/guide/images/advanced-operations-advanced-mode.png)

More operations are listed in the [basic operations guide](/rif/rns/guide/operations/).

## Change the controller of the domain

The controller of the domain can change resource record contents on it. It can be the authorized owner or not. For a reference about the authorized owner read the [transfer domain section](/rif/rns/guide/operations/#transfer-your-domain).

> In 'Your addresses' view

1. Click on the button to edit the controller of your domain.

    ![advanced operations - Edit Controller](/rif/rns/guide/images/advanced-operations-edit-controller.png)

2. Input the address you want to set as the controller and click 'Change'.

    ![advanced operations - Change address](/rif/rns/guide/images/advanced-operations-change-address.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed, this can take a minute.

## Resolver

The resolver is the component that provides the name of its resources. All resource records are stored on it.

These operations are performed in the 'Resolver' view.

### Change the resolver of the domain

1. Click on the button to edit the resolver of your domain.

    ![advanced operations - Edit Resolver](/rif/rns/guide/images/advanced-operations-edit-resolver.png)

2. Input the address you want to set as the resolver and click 'Change'.

    ![advanced operations - Set Resolver](/rif/rns/guide/images/advanced-operations-set-resolver.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed, this can take a minute.

#### Add a record

1. Choose the desired option for the record type to add in the 'Add records' section and fill in the desired content. Then click on 'Add'.

    ![advanced operations - Add records](/rif/rns/guide/images/advanced-operations-add-records.png)

2. Submit the transaction.

3. Wait until the transaction is confirmed, this can take a minute.

#### Update a record

1. Click in the button to edit the desired record.

    ![advanced operations - Update records](/rif/rns/guide/images/advanced-operations-update-records.png)


2. Input the new value you want to set and click 'Change'.

    ![advanced operations - Input value](/rif/rns/guide/images/advanced-operations-input-value.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed, this can take a minute.

#### Remove a record

1. Click on the button to delete the desired record.

    ![advanced operations - Remove records](/rif/rns/guide/images/advanced-operations-remove-records.png)

2. Click on 'Delete'

    ![advanced operations - Delete records](/rif/rns/guide/images/advanced-operations-delete-records.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed, this can take a minute.

## Reverse

Reverse lookups are used to find the domain name of an address, the other way round, It is an optional feature.

## Enable reverse resolution lookups


1. Click in the button to edit the reverse.

    ![advanced operations - Edit reverse lookups](/rif/rns/guide/images/advanced-operations-edit-reverse-lookups.png)

2. Input your domain and click on 'Change'.

    ![advanced operations - Change domain](/rif/rns/guide/images/advanced-operations-change-domain.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed. This can take a minute.


### Disable reverse resolution lookups

To disable reverse resolution lookup, follow the same instructions in [Enable reverse resolution lookups](#enable-reverse-resolution-lookups) and set an empty string.

----

[Contact us on the Rootstock community Discord](https://rootstock.io/discord) |
[Github](https://github.com/rnsdomains) |
[Register Domain](https://manager.rns.rifos.org/search)
