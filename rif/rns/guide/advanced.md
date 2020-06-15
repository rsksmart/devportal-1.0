---
layout: rsk
title: "Advanced operations - RNS User guide"
description: "How to change the controller of the domain, change the resolver of the domain, add a record, update a record, remove a record, enable reverse resolution lookups, disable reverse resolution lookups"
tags: rns, guide, rns-user-guide
---

# Advanced operations

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

![](https://i.imgur.com/PHOxh2E.png)

More operations are listed in the [basic operations guide](/rif/rns/guide/operations/).

## Change the controller of the domain

The controller of the domain is who can change resource record contents on it. It can be the authorative owner or not. For a reference about the authroative owner read [transfer domain section](/rif/rns/guide/operations/#transfer-your-domain).

> In 'Your addresses' view

1. Click in the button to edit the the controller of your domain.

    ![](https://i.imgur.com/oLAHoXz.png)

2. Input the address you want to set as the controller and click 'Change'.

    ![](https://i.imgur.com/wrJU3AY.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed. This can take a minute.

## Resolver

The resolver is the component that provides de name of its resources. Al resource recrods are stored on it.

This operations are performed in 'Resolver' view.

### Change the resolver of the domain

1. Click in the button to edit the the resolver of your domain.

    ![](https://i.imgur.com/ATDRLiU.png)

2. Input the address you want to set as the resolver and click 'Change'.

    ![](https://i.imgur.com/NKafXx4.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed. This can take a minute.

#### Add a record

1. Choose desired option for the record type to add in 'Add recrods' section and fill with the desired content. Then click on 'Add'.

    ![](https://i.imgur.com/SkwVC6X.png)

2. Submit the transaction.

3. Wait until the transaction is confirmed. This can take a minute.

#### Update a record

1. Click in the button to edit the desired record.

    ![](https://i.imgur.com/1PRJT9e.png)


2. Input the new value you want to set and click 'Change'.

    ![](https://i.imgur.com/EehT2FM.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed. This can take a minute.

#### Remove a record

1. Click in the button to delete the the desired record.

    ![](https://i.imgur.com/k3W65Xr.png)

2. Click on 'Delete'

    ![](https://i.imgur.com/YS6t3cG.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed. This can take a minute.

## Reverse

Reverse lookups are used to find the domain name of an address, the other way round. It is an optional feature.

## Enable reverse resolution lookups


1. Click in the button to edit the reverse.

    ![](https://i.imgur.com/fBlwVLo.png)

2. Input your domain and click on 'Change'.

    ![](https://i.imgur.com/Off77FM.png)

3. Submit the transaction.

4. Wait until the transaction is confirmed. This can take a minute.


### Disable reverse resolution lookups

Do the same as in [Enable reverse resolution lookups](#enable-reverse-resolution-lookups) and set an empty string.
