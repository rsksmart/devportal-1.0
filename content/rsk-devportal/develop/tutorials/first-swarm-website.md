---
menu_order: 500
menu_title: First DWebsite on Swarm
layout: rsk
title: How to deploy your first decentralised website on Swarm
tags: tutorial, rif, swarm, website, dweb
description: "How to deploy a decentralised website using Swarm"
---

## Getting started

Before we begin,
you will need the following things set up on your system:

- A [POSIX](https://en.wikipedia.org/wiki/POSIX)-compliant terminal
  - Recommended option for Linux/ Mac: Default/ built in terminal
  - Recommended option for Windows: [Git Bash](https://gitforwindows.org/)
- [`git`](https://git-scm.com/)
- [`curl`](https://curl.haxx.se/)
- [`jq`](https://stedolan.github.io/jq/)
  - optional, only needed for pretty-print
- [NodeJs](https://nodejs.org/en/)
  - optional, only needed to preview site using a centralised HTTP server
  - Recommended install method for Linux/ Mac: [`nvm`](https://github.com/nvm-sh/nvm)
  - Recommended install method for Windows: [Official installer](https://nodejs.org/en/)

Clone the demo git repo, and `cd` into its folder.

```shell
git clone git@github.com:bguiz/workshop-rif-first-swarm-website.git
cd workshop-rif-first-swarm-website

```

## Preview of end goal

Start a HTTP server of your choice,
and serve the `dist` folder at port `7500`.

```shell
npx http-server -c-1 -p 7500 ./dist/
```

```text
Starting up http-server, serving ./dist/
Available on:
  http://127.0.0.1:7500
  http://192.168.50.43:7500
Hit CTRL-C to stop the server

```

Visit [http://localhost:7500/](http://localhost:7500/)

This is our target or end goal -
let's accomplish the same thing
using a decentralised storage technology:
[Swarm](https://swarm-guide.readthedocs.io/en/latest/).

## Installing Swarm

The easiest way to install Swarm is via its pre-compiled releases.
There are also instructions for
[compiling the source yourself instead](https://developers.rsk.co/rif/storage/providers/swarm/install/).

Visit [swarm.ethereum.org/downloads](https://swarm.ethereum.org/downloads/)
and select the appropriate package to install for your system.
This page should automatically select and highlight the right one for you (in bold).

Example commands on Linux.

```shell
curl https://ethswarm.blob.core.windows.net/builds/swarm-linux-amd64-0.5.7-5ccfd995.tar.gz > swarm-linux-amd64-0.5.7-5ccfd995.tar.gz
tar -zxvf swarm-linux-amd64-0.5.7-5ccfd995.tar.gz
mkdir -p ${HOME}/swarm/bin
mv swarm-linux-amd64-0.5.7-5ccfd995/swarm ${HOME}/swarm/bin
echo 'export PATH=$PATH:${HOME}/swarm/bin' >> ~/.bashrc
```
Mac OSX or Windows (with a POSIX-compliant shell such as git bash)
should be pretty similar.

Close this shell and open up a new one,
as we'll need the updated `PATH` environment variable.

Let's check that we have got a working binary.

```shell
swarm version
```

```text
Swarm
Version: 0.5.8-unstable
Git Commit: 6faff7fcb6f25c706e75d8d3c8945c4231663b93
Go Version: go1.14.3
OS: linux

```

Next, let's start swarm.

```shell
swarm
```

```text
INFO [05-19|15:03:36.058] Maximum peer count                       ETH=50 LES=0 total=50
INFO [05-19|15:03:36.059] You don't have an account yet. Creating one...
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Unlocking swarm account 0xD1bCFFf13f996247d8A84a37bC7b32436B40c62F [1/3]
Passphrase:
```

> Note that Swarm is a service which uses peer to peer networking.
> Your computer is one node of many connected to this same network,
> and talking to this same protocol.
> Therefore, the very first time that you start up Swarm on your computer,
> you will be prompted to create an account,
> which will be used to uniquely identify this particular node -
> that is what the password is for.

```text
INFO [05-19|15:03:53.009] Starting peer-to-peer node               instance=swarm/v0.5.8-6faff7fc/linux-amd64/go1.14.3
INFO [05-19|15:03:53.065] New local node record                    seq=1 id=0f1272cb73bcf1ba ip=127.0.0.1 udp=30399 tcp=30399
INFO [05-19|15:03:53.065] Updated bzz local addr                   oaddr=5c31b4c2924e4689554b80893c663833de5852b32f090969860739dbdb1a69c0 uaddr=enode://d18081c0f7bf09c021d519e0d8351473def7a408820bffabc62bf2e878fd2ff84df3b46407ab347d632dfbec4f13cd7635ea2ee4c8fdace17c442ae032615d48@127.0.0.1:30399
INFO [05-19|15:03:53.065] Starting bzz service
INFO [05-19|15:03:53.065] Starting hive                            baseaddr=5c31b4c2
INFO [05-19|15:03:53.066] Detected an existing store. trying to load peers
INFO [05-19|15:03:53.066] hive 5c31b4c2: no persisted peers found
INFO [05-19|15:03:53.066] Swarm network started                    bzzaddr=5c31b4c2924e4689554b80893c663833de5852b32f090969860739dbdb1a69c0
INFO [05-19|15:03:53.066] bzzeth starting...
INFO [05-19|15:03:53.066] Starting outbox
INFO [05-19|15:03:53.066] Started P2P networking                   self=enode://d18081c0f7bf09c021d519e0d8351473def7a408820bffabc62bf2e878fd2ff84df3b46407ab347d632dfbec4f13cd7635ea2ee4c8fdace17c442ae032615d48@127.0.0.1:30399
INFO [05-19|15:03:53.066] Started Pss
INFO [05-19|15:03:53.066] Loaded EC keys                           pubkey=04fbdbfa2ee4034122e076512e390f8348cf1d2dd3a249f8f49ff5178e917cd18dccfc42cea2a2e906f25d7cb88b61b205a73b0bb2b07d43de0ca6c2708a0dc058 secp256=02fbdbfa2ee4034122e076512e390f8348cf1d2dd3a249f8f49ff5178e917cd18d
INFO [05-19|15:03:53.066] starting bzz-retrieve
INFO [05-19|15:03:53.066] Starting Swarm HTTP proxy                port=8500
INFO [05-19|15:03:53.068] Mapped network port                      proto=tcp extport=30399 intport=30399 interface=NAT-PMP(192.168.50.1)
INFO [05-19|15:03:53.069] IPC endpoint opened                      url=/home/bguiz/.ethereum/bzzd.ipc
INFO [05-19|15:03:53.070] Mapped network port                      proto=udp extport=30399 intport=30399 interface=NAT-PMP(192.168.50.1)
INFO [05-19|15:03:53.248] New local node record                    seq=2 id=0f1272cb73bcf1ba ip=172.23.144.94 udp=30399 tcp=30399
ERROR[05-19|15:04:06.517] batch has timed out                      peer=3de6224e3c9c430f:656e6f64653a2f2f ruid=3716585580
```

Now visit [http://localhost:8500](http://localhost:8500) and you will see a web user interface
for downloading and uploading files.
Have a play around with this if you like,
otherwise jump back into your terminal.

You should see output similar to this related to serving up the front end.

```text
INFO [05-19|15:08:08.421] created ruid for request                 ruid=ffcc6158   method=GET url=/
INFO [05-19|15:08:08.421] respondHTML                              ruid=ffcc6158   code=200
INFO [05-19|15:08:08.422] request served                           ruid=ffcc6158   code=200 time=570.234µs
INFO [05-19|15:08:08.453] created ruid for request                 ruid=d89959fa   method=GET url=/favicon.ico
INFO [05-19|15:08:08.453] request served                           ruid=d89959fa   code=200 time=41.936µs
```

## Upload a website to Swarm

Remember how we used a standard (centralised) HTTP server earlier on
to serve up the `dist` folder?
Well, let's serve up that same `dist` folder,
this time using Swarm, which is decentralised.

Open up a new terminal window and enter the following `swarm up` command.

```shell
swarm --defaultpath ./dist/index.html --manifest=true --recursive up ./dist
```

```text
37dc50f16176901ff7a18dc815432f1144f93f2f26f7c794d17d6ec81f8810a8
```

Note the following:

- `--defaultpath`
  identifies the "first" file to be loaded when this folder is loaded.
  In this example, we're following the web browser convention of `index.html`.
- `--recursive`
  means that we want to upload a folder full of files,
  as opposed to uploading a single file.
  This is necessary for a website since it is (almost always)
  comprised of multiple files.
- `--manifest=true`
  means that we want to upload a manifest (file identifying a group of files).
  Since we're uploading a folder (see `--recursive`),
  we do need a manifest.
  > Note that this is default, but we're being explicit for demo purposes.

The hash resulting from the upload is output,
in my case it was
`37dc50f16176901ff7a18dc815432f1144f93f2f26f7c794d17d6ec81f8810a8`.

## Understanding the Swarm manifest

Let's use that hash to download the manifest like so,
making use of `curl`.

```shell
curl -s http://localhost:8500/bzz-raw:/37dc50f16176901ff7a18dc815432f1144f93f2f26f7c794d17d6ec81f8810a8 | jq
```

```json
{
  "entries": [
    {
      "hash": "635447daad3b80bc2e205367e36d754b82f1745d22db5011c8e555e40b187b35",
      "path": "css/styles.css",
      "contentType": "text/css; charset=utf-8",
      "mode": 436,
      "size": 45,
      "mod_time": "2020-05-19T15:23:16+08:00"
    },
    {
      "hash": "7ad69261097980d8e4c4296d2579b958feb4563d7c69a87475ea61f626e1227a",
      "path": "i",
      "contentType": "application/bzz-manifest+json",
      "mod_time": "0001-01-01T00:00:00Z"
    },
    {
      "hash": "02d47eba9b51da786d345d1219c167cb66de756af330c3c12968f825172ac0c2",
      "contentType": "text/html; charset=utf-8",
      "mode": 436,
      "size": 558,
      "mod_time": "2020-05-19T15:24:19+08:00"
    }
  ]
}

```

> Note that the `curl` output has been piped through `jq`
> to "pretty print" the JSON.
> If you do not have `jq` installed on your system,
> just skip the pipe.
> The output will be the same, just a little bit harder to read.

The manifest file simply gives us some metadata about what we uploaded.

The first entry, for `css/styles.css` is almost self-explanatory,
it states the path of the file,
and the hash that it is stored at.
Let's try accessing just this file alone by its hash:

```shell
curl -s http://localhost:8500/bzz:/7ad69261097980d8e4c4296d2579b958feb4563d7c69a87475ea61f626e1227a | jq
```

```css
.circles {
  width: 500px;
  height: 400px;
}
```

The second entry is a little bit more difficult to grok.
To figure out what is going on here,
we have to know how `swarm up` handles a folder (`--recursive`).
It builds a [trie](https://en.wikipedia.org/wiki/Trie) of all of the file paths,
and creates a recursive set of manifests from those.
... so what this manifest entry states is that
there are **multiple paths** starting with `i`,
and the hash for the **nested manifest** for any files under those paths.
Let's try drilling down one more level using the hash of the nested manifest:

```shell
curl -s http://localhost:8500/bzz-raw:/7ad69261097980d8e4c4296d2579b958feb4563d7c69a87475ea61f626e1227a | jq
```

```json
{
  "entries": [
    {
      "hash": "1e5602f91d0f24eb2c4a0612729258b8aec23da782dc6f6c90cbcbb200d77068",
      "path": "mg/circles1.svg",
      "contentType": "image/svg+xml",
      "mode": 436,
      "size": 677,
      "mod_time": "2020-05-19T15:19:01+08:00"
    },
    {
      "hash": "02d47eba9b51da786d345d1219c167cb66de756af330c3c12968f825172ac0c2",
      "path": "ndex.html",
      "contentType": "text/html; charset=utf-8",
      "mode": 436,
      "size": 558,
      "mod_time": "2020-05-19T15:24:19+08:00"
    }
  ]
}

```

... and now we finally have the hashes for all of the files in our site.
I shall use the stylistic output format of the
[UNIX `tree` command](https://en.wikipedia.org/wiki/Tree_(command))
to illustrate Swarm's trie.

```text
"/"
├── "css/styles.css"
├── "i"
│   └── "mg/circles1.svg"
│   └── "ndex.html"
└── ""
```

It is kind of similar to a the way an operating system represents
folders and files are arranged on a disk,
except that it uses common string prefixes to determine where the splits are.
This becomes apparent when we compare/ contrast that
with the output of an actual `tree` command.
We can see how the Swarm trie maps to the directory structure:

```shell
tree dist
```

```text
dist
├── css
│   └── styles.css
├── img
│   └── circles1.svg
└── index.html

2 directories, 3 files
```

Let's augment the same structure above with the hashes required to obtain each file:

```text
"/": 37dc50f16176901ff7a18dc815432f1144f93f2f26f7c794d17d6ec81f8810a8
├── "css/styles.css": 7ad69261097980d8e4c4296d2579b958feb4563d7c69a87475ea61f626e1227a
├── "i"
│   └── "mg/circles1.svg": 1e5602f91d0f24eb2c4a0612729258b8aec23da782dc6f6c90cbcbb200d77068
│   └── "ndex.html": 02d47eba9b51da786d345d1219c167cb66de756af330c3c12968f825172ac0c2
└── "" : 02d47eba9b51da786d345d1219c167cb66de756af330c3c12968f825172ac0c2
```

If you have been paying keen attention, you may have noticed that
the path for `/` and `/index.html` have the exact same hash.
This means that if you visit either
`bzz:/${HASH}/` or `bzz:/${HASH}/index.html`
you will get the same page!

Pretty neat huh?

## Download files from Swarm to disk

So far we have downloaded and inspected individual files from Swarm.
We do have the option of downloading the entire site if we want to.

To do that, we'll use the `swarm down` command:

```shell
mkdir swarm-down-copy
swarm down --recursive bzz:/37dc50f16176901ff7a18dc815432f1144f93f2f26f7c794d17d6ec81f8810a8 ./swarm-down-copy
tree swarm-down-copy/
```

```text
swarm-down-copy/
├── css
│   └── styles.css
├── img
│   └── circles1.svg
└── index.html

2 directories, 3 files
```

Now, inspect the files, they should be the same.
Want to really makes sure they are **identical**?
Enter the following commands.

```shell
cat ./dist/{index.html,img/circles1.svg,css/styles.css} | sha256sum
```

```text
3521ac76a1f61cd3ace92d4e3e672c62eb0183688faf6ba2c4efdd9bf5d23991  -
```

```shell
cat ./swarm-down-copy/{index.html,img/circles1.svg,css/styles.css} | sha256sum
```

```text
3521ac76a1f61cd3ace92d4e3e672c62eb0183688faf6ba2c4efdd9bf5d23991  -
```

Observe that their hashes are the same, demonstrating that they are indeed the same files.

## Surf the DWeb!

Finally let's bring this home by visiting the website in Swarm.
We're surfing the **decentralised web**!

Visit [http://localhost:8500/bzz:/37dc50f16176901ff7a18dc815432f1144f93f2f26f7c794d17d6ec81f8810a8/](http://localhost:8500/bzz:/37dc50f16176901ff7a18dc815432f1144f93f2f26f7c794d17d6ec81f8810a8/)

You should see the website load,
and it should look the same as the one served on [http://localhost:7500/](http://localhost:7500/)

## Mission accomplished

Now you have a website uploaded onto, and served from Swarm,
which is identical to the one that you have served using a centralised HTTP server.

Where to go from here?

- Update the contents of your website on Swarm
- View your website through multiple gateways (not just localhost)
- Register a decentralised domain name for your website on Swarm
  - After this, update website contents and point domain at new version
- Dual deployment of your website on both swarm and a centralised web server
