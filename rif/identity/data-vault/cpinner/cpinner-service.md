---
title: Data vault - Centralized pinner provider service
layout: rif-identity
---

## Data vault - Centralized IPFS pinner service

A Centralized Data Vault service compatible with RIF Data Vault standard interface. It stores content in an IPFS node associated to a given DID and key.

It is a centralized pinner because it provides a centralized service that maps the necessary metadata (ie: user did and key) associated to the IPFS cids so it can be accessed seamlessly.

Main features:
- API for storing, updating and deleting, accessible only proving DID control - uses [DID Auth](/rif/identity/ssi/specs/did-auth)
- Open API for retrieving data - **It is strongly recommended to encrypt the content saved in IPFS using this package.**

It is an API designed using [IPFS Centralized Pinner Provider](/rif/identity/data-vault/cpinner/cpinner-provider)

It has three layers:
- HTTP layer: exposes a simple HTTP REST API to interact with from any web client.
- Service provider layer: an internal interface that abstracts the way the content is stored.
- File system layer: defines where and how the metadata is stored.

### Usage

The IPFS Centralized pinner service is designed to let users store content for free. That content is pinned into IPFS.

Content is stored in `did -> key -> content[]` dictionary. Content with a same `key` can be accessed all together.

This service implements the [DID Auth protocol](/rif/identity/ssi/specs/did-auth) to protect the API.

#### API

The API is divided in two. Content modifications need [authenticated requests using DID Auth](/rif/identity/ssi/specs/did-auth). It is strongly recommended that the content is encrypted when uploaded. This enables the accessing API to be open to anybody.

##### GET /content/:did/:key

Get all the `content` (with its `id`) associated to the given `did` and `key`

Returns: an HTTP 200 with an array of objects containing `{ id: string, content: string }` representing the associated content. Will be empty if no content found.

##### GET /keys/:did

Get all the `keys` associated to the logged `did`

Returns: an HTTP 200 with an array of strings representing the associated keys. Will be empty if no keys found.

##### POST /content/:key

Uploads new `content` to IPFS associated to the given `key` and the logged `did`

Expects: an object `{ content: 'the content' }` in the `body` of the request.

Returns: an HTTP 201 with an object `{ id }` containing the IPFS correspondant cid.

##### PUT /content/:key/:id

Swaps existing `content` associated to the given `key`, `id` and the logged `did`.

The `id` is OPTIONAL. If present, it will replace just the `content` that matches both `key` and `id`.
If the `id` is not sent, the entire `content` associated to the given `key` is replaced.

If the `key` or `id` do not exist, it will create the new `key` and associate the given `content` to that.
Update `contents` of a given `key`.

Expects: an object `{ content: 'the content' }` in the `body` of the request.

Returns: an HTTP 200 with an object `{ id }` containing the IPFS correspondant cid.

##### DELETE /content/:key/:id

Deletes the `content` associated to the given `key`, `id` and the logged `did`.

The `id` is OPTIONAL. If present, it will delete just the `content` that matches both `key` and `id`.
If the `id` is not sent, the entire `content` associated to the given `key` will be deleted.

Returns: an HTTP 200 with no `content`.

### Run for development

Check out [`ipfs-cpinner-client` in the `rif-data-vault` repo](https://github.com/rsksmart/rif-data-vault/tree/master/modules/ipfs-cpinner-client).
