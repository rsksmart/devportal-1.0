---
layout: rsk
title: "Advanced operations - RNS User guide"
description: "How to change the controller of the domain, change the resolver of the domain, add a record, update a record, remove a record, enable reverse resolution lookups, disable reverse resolution lookups"
tags: rns, guide, rns-user-guide
---

This are the advanced operations you can perform with the RNS manager:

- Change the controller of the domain
- Resolver
    - Change the resolver of the domain
    - Content field
        - Add content record
        - Update content record
        - Remove content record
- Enable reverse resolution lookups

To active the advanced mode:

![](/rif/rns/guide/images/PHOxh2E.png)

More operations are listed in the [basic operations guide](/rif/rns/guide/operations/).

## Change the controller of the domain

The controller of the domain is who can change resource record contents on it. It can be the authorative owner or not. For a reference about the authroative owner read [transfer domain section](/rif/rns/guide/operations/#transfer-your-domain).

> In 'Your addresses' view

1. Click in the button to edit the the controller of your domain.

    ![](/rif/rns/guide/images/oLAHoXz.png)

2. Input the address you want to set as the controller and click 'Change'.

    ![](/rif/rns/guide/images/wrJU3AY.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed. This can take a minute.

## Resolver

The resolver is the component that provides de name of its resources. Al resource recrods are stored on it.

This operations are performed in 'Resolver' view.

### Change the resolver of the domain

1. Click in the button to edit the the resolver of your domain.

    ![](/rif/rns/guide/images/ATDRLiU.png)

2. Input the address you want to set as the resolver and click 'Change'.

    ![](/rif/rns/guide/images/NKafXx4.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed. This can take a minute.

#### Add a record

1. Choose desired option for the record type to add in 'Add recrods' section and fill with the desired content. Then click on 'Add'.

    ![](/rif/rns/guide/images/SkwVC6X.png)

2. Submit the transaction.

3. Wait until the transaction is confirmed. This can take a minute.

#### Update a record

1. Click in the button to edit the desired record.

    ![](/rif/rns/guide/images/1PRJT9e.png)


2. Input the new value you want to set and click 'Change'.

    ![](/rif/rns/guide/images/EehT2FM.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed. This can take a minute.

#### Remove a record

1. Click in the button to delete the the desired record.

    ![](/rif/rns/guide/images/k3W65Xr.png)

2. Click on 'Delete'

    ![](/rif/rns/guide/images/YS6t3cG.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed. This can take a minute.

## Reverse

Reverse lookups are used to find the domain name of an address, the other way round. It is an optional feature.

## Enable reverse resolution lookups


1. Click in the button to edit the reverse.

    ![](/rif/rns/guide/images/fBlwVLo.png)

2. Input your domain and click on 'Change'.

    ![](/rif/rns/guide/images/Off77FM.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed. This can take a minute.


### Disable reverse resolution lookups

Do the same as in [Enable reverse resolution lookups](#enable-reverse-resolution-lookups) and set an empty string.
