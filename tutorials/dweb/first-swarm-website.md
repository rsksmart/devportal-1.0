---
layout: rsk
title: How to deploy your first decentralised website on Swarm
tags: tutorial, rif, swarm, website, dweb
description: "How to deploy a decentralised website using Swarm"
---

## Getting started

Clone the demo git repo, and `cd` into its folder.

```shell
git clone git@github.com:bguiz/workshop-rif-first-swarm-website.git
cd workshop-rif-first-swarm-website

```

## Preview of end goal

Start a HTTP server of your choice,
and serve the `dist` folder at port `7500`.

```shell
$ npx http-server -c-1 -p 7500 ./dist/
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

Assuming that you already have `go` set up,
and the `GOPATH` environment variable set up

```shell
$ mkdir -p ${GOPATH}/src/github.com/ethersphere/
```

```shell
$ time git clone https://github.com/ethersphere/swarm ${GOPATH}/src/github.com/ethersphere/swarm
Cloning into 'swarm'...
remote: Enumerating objects: 98, done.
remote: Counting objects: 100% (98/98), done.
remote: Compressing objects: 100% (76/76), done.
remote: Total 104188 (delta 44), reused 68 (delta 22), pack-reused 104090
Receiving objects: 100% (104188/104188), 147.60 MiB | 599.00 KiB/s, done.
Resolving deltas: 100% (72558/72558), done.

real	4m17.379s
user	0m16.389s
sys	0m3.820s
```

Oof!
Over four minutes just for a git clone?
... but it's going to be worth it!

Let's compile the Swarm binary:

```shell
$ make swarm
build/env.sh go run build/ci.go install ./cmd/swarm
>>> /snap/go/5759/bin/go install -ldflags -X main.gitCommit=6faff7fcb6f25c706e75d8d3c8945c4231663b93 -v -trimpath ./cmd/swarm
internal/race
math/bits
unicode
unicode/utf8
runtime/internal/sys
internal/cpu
runtime/internal/atomic
sync/atomic
runtime/internal/math
runtime/cgo
crypto/internal/subtle
crypto/subtle
unicode/utf16
encoding
internal/testlog
internal/nettrace
container/list
vendor/golang.org/x/crypto/cryptobyte/asn1
vendor/golang.org/x/crypto/internal/subtle
golang.org/x/net/html/atom
internal/bytealg
math
golang.org/x/text/encoding/internal/identifier
golang.org/x/text/internal/utf8internal
golang.org/x/crypto/curve25519
runtime
container/ring
github.com/robertkrimen/otto/registry
github.com/ethereum/go-ethereum/internal/web3ext
github.com/uber/jaeger-client-go/internal/baggage
github.com/uber/jaeger-client-go/internal/throttler
github.com/VividCortex/ewma
github.com/vbauerster/mpb/internal
internal/reflectlite
sync
golang.org/x/sync/syncmap
golang.org/x/sync/singleflight
internal/singleflight
math/rand
errors
sort
io
internal/oserror
strconv
vendor/golang.org/x/net/dns/dnsmessage
github.com/ethersphere/swarm/network/bitvector
github.com/hashicorp/golang-lru/simplelru
github.com/ethereum/go-ethereum/common/bitutil
syscall
container/heap
golang.org/x/text/internal/tag
bytes
strings
hash
crypto/internal/randutil
github.com/ethereum/go-ethereum/ethdb
text/tabwriter
reflect
crypto
hash/crc32
crypto/hmac
github.com/steakknife/hamming
crypto/rc4
bufio
golang.org/x/crypto/pbkdf2
vendor/golang.org/x/crypto/hkdf
path
regexp/syntax
vendor/golang.org/x/text/transform
golang.org/x/crypto/ripemd160
github.com/syndtr/goleveldb/leveldb/comparer
golang.org/x/text/transform
html
github.com/influxdata/influxdb/pkg/escape
internal/syscall/unix
time
internal/syscall/execenv
github.com/ethereum/go-ethereum/common/fdlimit
gopkg.in/sourcemap.v1/base64vlq
golang.org/x/text/encoding
golang.org/x/text/runes
github.com/robertkrimen/otto/token
github.com/ethersphere/swarm/network/resourceusestats
regexp
golang.org/x/text/encoding/internal
github.com/ethersphere/swarm/api/http/langos
hash/fnv
golang.org/x/text/encoding/korean
golang.org/x/text/encoding/japanese
golang.org/x/text/encoding/charmap
golang.org/x/text/encoding/simplifiedchinese
internal/fmtsort
encoding/binary
internal/poll
context
github.com/aristanetworks/goarista/monotime
golang.org/x/net/context
golang.org/x/text/encoding/traditionalchinese
golang.org/x/text/encoding/unicode
os
crypto/cipher
crypto/sha512
encoding/base64
golang.org/x/crypto/sha3
github.com/ethereum/go-ethereum/common/mclock
golang.org/x/sys/unix
crypto/sha256
github.com/ethereum/go-ethereum/common/prque
fmt
path/filepath
crypto/aes
net
runtime/debug
crypto/md5
io/ioutil
crypto/sha1
golang.org/x/crypto/scrypt
crypto/des
crypto/ed25519/internal/edwards25519
encoding/pem
os/user
math/big
encoding/hex
encoding/json
database/sql/driver
log
github.com/go-stack/stack
compress/flate
encoding/gob
github.com/allegro/bigcache/queue
github.com/ethereum/go-ethereum/event
github.com/allegro/bigcache
github.com/deckarep/golang-set
compress/gzip
github.com/rjeczalik/notify
runtime/pprof
flag
crypto/elliptic
encoding/asn1
crypto/rand
github.com/ethereum/go-ethereum/common/hexutil
github.com/ethereum/go-ethereum/common/math
github.com/ethereum/go-ethereum/rlp
github.com/steakknife/bloomfilter
github.com/hashicorp/golang-lru
github.com/ethereum/go-ethereum/common
crypto/ed25519
crypto/rsa
crypto/dsa
crypto/x509/pkix
crypto/ecdsa
github.com/ethereum/go-ethereum/crypto/secp256k1
vendor/golang.org/x/crypto/cryptobyte
net/url
vendor/golang.org/x/crypto/chacha20
vendor/golang.org/x/crypto/poly1305
vendor/golang.org/x/sys/cpu
vendor/golang.org/x/crypto/curve25519
vendor/golang.org/x/text/unicode/bidi
vendor/golang.org/x/text/unicode/norm
vendor/golang.org/x/crypto/chacha20poly1305
vendor/golang.org/x/net/http2/hpack
mime
vendor/golang.org/x/text/secure/bidirule
mime/quotedprintable
net/http/internal
github.com/edsrzf/mmap-go
github.com/syndtr/goleveldb/leveldb/util
github.com/syndtr/goleveldb/leveldb/storage
github.com/golang/snappy
vendor/golang.org/x/net/idna
archive/tar
github.com/elastic/gosigar
github.com/syndtr/goleveldb/leveldb/cache
github.com/syndtr/goleveldb/leveldb/filter
github.com/ethereum/go-ethereum/ethdb/memorydb
github.com/syndtr/goleveldb/leveldb/errors
encoding/csv
github.com/mattn/go-runewidth
github.com/syndtr/goleveldb/leveldb/iterator
github.com/syndtr/goleveldb/leveldb/journal
github.com/syndtr/goleveldb/leveldb/opt
github.com/pkg/errors
golang.org/x/sys/cpu
github.com/olekukonko/tablewriter
github.com/howeyc/fsnotify
encoding/xml
github.com/syndtr/goleveldb/leveldb/memdb
github.com/syndtr/goleveldb/leveldb/table
log/syslog
github.com/pborman/uuid
github.com/ethereum/go-ethereum/p2p/netutil
crypto/x509
net/textproto
github.com/ethereum/go-ethereum/log
vendor/golang.org/x/net/http/httpproxy
github.com/syndtr/goleveldb/leveldb
github.com/prometheus/tsdb/fileutil
github.com/ethereum/go-ethereum/crypto/bn256/cloudflare
github.com/oschwald/maxminddb-golang
vendor/golang.org/x/net/http/httpguts
github.com/ethereum/go-ethereum/metrics
mime/multipart
github.com/ethereum/go-ethereum/p2p/enr
crypto/tls
github.com/huin/goupnp/scpd
golang.org/x/net/html
golang.org/x/text/internal/language
github.com/jackpal/go-nat-pmp
github.com/ethereum/go-ethereum/crypto/bn256
github.com/mohae/deepcopy
github.com/davecgh/go-spew/spew
github.com/gballet/go-libpcsclite
github.com/status-im/keycard-go/derivationpath
golang.org/x/text/internal/language/compact
github.com/ethereum/go-ethereum/ethdb/leveldb
github.com/wsddn/go-ecdh
golang.org/x/text/unicode/norm
golang.org/x/text/language
github.com/tyler-smith/go-bip39/wordlists
github.com/golang/protobuf/proto
github.com/karalabe/usb
github.com/ethereum/go-ethereum/signer/storage
github.com/tyler-smith/go-bip39
golang.org/x/crypto/ssh/terminal
net/http/httptrace
go/token
golang.org/x/text/encoding/htmlindex
text/template/parse
github.com/ethereum/go-ethereum/eth/tracers/internal/tracers
net/http
go/scanner
golang.org/x/net/html/charset
gopkg.in/olebedev/go-duktape.v3
github.com/fjl/memsize
go/ast
text/template
github.com/mattn/go-isatty
github.com/mattn/go-colorable
go/parser
github.com/golang/protobuf/protoc-gen-go/descriptor
go/printer
html/template
gopkg.in/urfave/cli.v1
github.com/ethereum/go-ethereum/accounts/usbwallet/trezor
go/format
runtime/trace
github.com/ethereum/go-ethereum/les/flowcontrol
github.com/graph-gophers/graphql-go/errors
text/scanner
github.com/graph-gophers/graphql-go/log
github.com/opentracing/opentracing-go/log
github.com/influxdata/influxdb/models
os/signal
github.com/ethereum/go-ethereum/internal/jsre/deps
github.com/graph-gophers/graphql-go/internal/common
github.com/fatih/color
github.com/gorilla/websocket
github.com/rs/xhandler
github.com/apilayer/freegeoip
github.com/huin/goupnp/httpu
github.com/huin/goupnp/soap
github.com/rs/cors
golang.org/x/net/websocket
github.com/huin/goupnp/ssdp
expvar
github.com/ethereum/go-ethereum/metrics/prometheus
github.com/ethereum/go-ethereum/rpc
github.com/fjl/memsize/memsizeui
github.com/huin/goupnp
github.com/ethereum/go-ethereum/metrics/exp
net/http/pprof
github.com/graph-gophers/graphql-go/internal/schema
github.com/graph-gophers/graphql-go/internal/query
github.com/huin/goupnp/dcps/internetgateway1
github.com/huin/goupnp/dcps/internetgateway2
github.com/ethereum/go-ethereum/internal/debug
github.com/graph-gophers/graphql-go/internal/exec/packer
github.com/graph-gophers/graphql-go/introspection
github.com/opentracing/opentracing-go
github.com/graph-gophers/graphql-go/internal/validation
github.com/graph-gophers/graphql-go/internal/exec/resolvable
github.com/opentracing/opentracing-go/ext
github.com/ethereum/go-ethereum/p2p/nat
github.com/influxdata/influxdb/client
github.com/graph-gophers/graphql-go/trace
github.com/graph-gophers/graphql-go/internal/exec/selected
gopkg.in/sourcemap.v1
github.com/robertkrimen/otto/dbg
github.com/graph-gophers/graphql-go/internal/exec
github.com/robertkrimen/otto/file
github.com/ethereum/go-ethereum/metrics/influxdb
github.com/robertkrimen/otto/ast
github.com/peterh/liner
github.com/ethersphere/swarm/sctx
github.com/ethersphere/swarm/spancontext
github.com/graph-gophers/graphql-go
github.com/ethersphere/swarm/log
github.com/ethersphere/swarm/chunk
github.com/robertkrimen/otto/parser
github.com/ethersphere/swarm/network/capability
github.com/ethersphere/swarm/network/pubsubchannel
github.com/graph-gophers/graphql-go/relay
github.com/uber/jaeger-client-go/internal/spanlog
github.com/uber/jaeger-client-go/log
github.com/uber/jaeger-client-go/thrift
github.com/codahale/hdrhistogram
github.com/ethersphere/swarm/pot
github.com/ethersphere/swarm/state
github.com/robertkrimen/otto
github.com/uber/jaeger-lib/metrics
github.com/ethersphere/swarm/version
github.com/ethersphere/swarm/network/stream/intervals
github.com/ethersphere/swarm/network/timeouts
github.com/ethersphere/swarm/file
github.com/ethersphere/swarm/storage/encryption
github.com/ethersphere/swarm/shed
github.com/ethersphere/swarm/bmt
github.com/uber/jaeger-client-go/thrift-gen/jaeger
github.com/uber/jaeger-client-go/thrift-gen/sampling
github.com/uber/jaeger-client-go/thrift-gen/zipkincore
github.com/uber/jaeger-client-go/thrift-gen/baggage
github.com/ethersphere/swarm/storage/mock
golang.org/x/sync/errgroup
github.com/uber/jaeger-client-go/thrift-gen/agent
github.com/tilinna/clock
github.com/ethersphere/swarm/storage/localstore
github.com/ethersphere/swarm/storage/feed/lookup
github.com/uber/jaeger-client-go/utils
github.com/ethersphere/swarm/swap/int256
github.com/ethersphere/swarm/pss/internal/ticker
github.com/ethersphere/swarm/pss/internal/ttlset
github.com/uber/jaeger-client-go
net/http/httptest
testing
os/exec
github.com/caarlos0/env
bazil.org/fuse
github.com/rnsdomains/rns-go-lib/config
net/http/cookiejar
github.com/ethersphere/swarm/internal/debug
github.com/ethersphere/swarm/metrics/influxdb
github.com/uber/jaeger-client-go/internal/baggage/remote
github.com/ethereum/go-ethereum/internal/jsre
github.com/uber/jaeger-client-go/internal/throttler/remote
github.com/uber/jaeger-client-go/rpcmetrics
github.com/ethersphere/swarm/storage/mock/rpc
github.com/naoina/go-stringutil
github.com/naoina/toml/ast
github.com/uber/jaeger-client-go/config
github.com/vbauerster/mpb/cwriter
github.com/vbauerster/mpb/decor
bazil.org/fuse/fuseutil
github.com/naoina/toml
bazil.org/fuse/fs
github.com/ethersphere/swarm/tracing
github.com/vbauerster/mpb
github.com/ethereum/go-ethereum/crypto
github.com/ethereum/go-ethereum/crypto/ecies
github.com/ethereum/go-ethereum/p2p/enode
github.com/ethereum/go-ethereum/trie
github.com/ethereum/go-ethereum/accounts/abi
github.com/ethereum/go-ethereum/p2p/discv5
github.com/rnsdomains/rns-go-lib/utils
github.com/ethereum/go-ethereum/params
github.com/ethersphere/swarm/pss/crypto
github.com/ethereum/go-ethereum/core/types
github.com/ethereum/go-ethereum/p2p/discover
github.com/ethereum/go-ethereum
github.com/ethereum/go-ethereum/core/bloombits
github.com/ethereum/go-ethereum/core/state
github.com/ethereum/go-ethereum/core/rawdb
github.com/ethereum/go-ethereum/core/vm
github.com/ethereum/go-ethereum/p2p
github.com/ethereum/go-ethereum/accounts
github.com/ethereum/go-ethereum/ethclient
github.com/ethereum/go-ethereum/accounts/scwallet
github.com/ethereum/go-ethereum/accounts/usbwallet
github.com/ethereum/go-ethereum/accounts/keystore
github.com/ethereum/go-ethereum/consensus
github.com/ethereum/go-ethereum/consensus/misc
github.com/ethereum/go-ethereum/eth/fetcher
github.com/ethereum/go-ethereum/consensus/clique
github.com/ethereum/go-ethereum/consensus/ethash
github.com/ethereum/go-ethereum/dashboard
github.com/ethereum/go-ethereum/whisper/whisperv6
github.com/ethereum/go-ethereum/console
github.com/ethereum/go-ethereum/core
github.com/ethersphere/swarm/p2p/protocols
github.com/ethersphere/swarm/network
github.com/ethersphere/swarm/storage
github.com/ethereum/go-ethereum/core/forkid
github.com/ethereum/go-ethereum/eth/filters
github.com/ethereum/go-ethereum/light
github.com/ethereum/go-ethereum/eth/downloader
github.com/ethersphere/swarm/pss/message
github.com/ethersphere/swarm/pushsync
github.com/ethersphere/swarm/storage/feed
github.com/ethersphere/swarm/pss/outbox
github.com/ethersphere/swarm/pss
github.com/ethereum/go-ethereum/miner
github.com/ethereum/go-ethereum/internal/ethapi
github.com/ethereum/go-ethereum/eth/gasprice
github.com/ethereum/go-ethereum/graphql
github.com/ethereum/go-ethereum/signer/core
github.com/ethereum/go-ethereum/accounts/external
github.com/ethereum/go-ethereum/node
github.com/ethereum/go-ethereum/accounts/abi/bind
github.com/ethereum/go-ethereum/contracts/checkpointoracle/contract
github.com/ethersphere/swarm/contracts/ens/fallback_contract
github.com/ethersphere/swarm/contracts/ens/contract
github.com/ethersphere/swarm/swap/chain
github.com/ethersphere/go-sw3/contracts-v0-2-0/erc20simpleswap
github.com/ethersphere/go-sw3/contracts-v0-2-0/simpleswapfactory
github.com/ethersphere/swarm/network/stream
github.com/ethersphere/swarm/bzzeth
github.com/ethereum/go-ethereum/contracts/checkpointoracle
github.com/rnsdomains/rns-go-lib/resolver/multi_chain_resolver
github.com/ethersphere/swarm/contracts/ens
github.com/rnsdomains/rns-go-lib/resolver
github.com/ethersphere/swarm/contracts/swap
github.com/ethersphere/swarm/swap
github.com/ethersphere/swarm/network/retrieval
github.com/ethersphere/swarm/api
github.com/ethersphere/swarm/storage/pin
github.com/ethersphere/swarm/fuse
github.com/ethersphere/swarm/api/http
github.com/ethersphere/swarm
github.com/ethersphere/swarm/api/client
github.com/ethereum/go-ethereum/eth/tracers
github.com/ethereum/go-ethereum/eth
github.com/ethereum/go-ethereum/les
github.com/ethereum/go-ethereum/ethstats
github.com/ethereum/go-ethereum/cmd/utils
github.com/ethersphere/swarm/internal/flags
github.com/ethersphere/swarm/metrics
github.com/ethersphere/swarm/cmd/swarm
Done building.
Run "/home/bguiz/go/src/github.com/ethersphere/swarm/build/bin/swarm" to launch swarm.

```

Lots and **lots** of output, but it's mostly stuff we do not care about.
The main thing we want is that final line,
which tells you where the `swarm` binary is located.

> Note: The `make swarm` command should have symlinked this location to
> `${GOPATH}/bin/swarm`, but it didn't on my set up.
> So I have to enter the absolute path to the `swarm` binary each time.
> Alternatively, I could have added
> `/home/bguiz/go/src/github.com/ethersphere/swarm/build/bin` to
> my `PATH` environment variable.

Let's check that we have got a working binary.

```shell
$ /home/bguiz/go/src/github.com/ethersphere/swarm/build/bin/swarm version
Swarm
Version: 0.5.8-unstable
Git Commit: 6faff7fcb6f25c706e75d8d3c8945c4231663b93
Go Version: go1.14.3
OS: linux

```

Next, let's start swarm.

```shell
$ /home/bguiz/go/src/github.com/ethersphere/swarm/build/bin/swarm
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

```shell
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

```shell
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
$ /home/bguiz/go/src/github.com/ethersphere/swarm/build/bin/swarm --defaultpath ./dist/index.html --manifest=true --recursive up ./dist
37dc50f16176901ff7a18dc815432f1144f93f2f26f7c794d17d6ec81f8810a8
```

Note the following:

- `--defaultpath`
  identifies the "first" file to be loaded when this folder is loaded.
  We're following the web browser convention of `index.html` here.
- `--recursive`
  means that we want to upload a folder full of files,
  as opposed to uploading a single file.
  This is necessary for a webiste since it is (almost always)
  comprised of multiple files.
- `--manifest=true`
  means that we want to upload a manifest (file identifying a group of files).
  Since we're uploading a folder (see `--recursive`),
  we do need a manifest.
  > Note that this is default, but we're being explicit for demo purposes.

The hash resulting from the upload is output,
in my case it was
`37dc50f16176901ff7a18dc815432f1144f93f2f26f7c794d17d6ec81f8810a8`.

Let's use that hash to download the manifest like so,
making use of `curl`.

```shell
$ curl -s http://localhost:8500/bzz-raw:/37dc50f16176901ff7a18dc815432f1144f93f2f26f7c794d17d6ec81f8810a8 | jq
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

Note that the `curl` output has been piped through `jq`
to "pretty print" the JSON.
If you do not have `jq` on your system,
just skip the pipe.
The output will be the same, just a bit harder to read.

The manifest file simply gives us some metadata about what we uploaded.
Let's actually get and view the files that we want.
To do that, let's use the `swarm down` command:

```shell
$ mkdir swarm-down-copy
$ /home/bguiz/go/src/github.com/ethersphere/swarm/build/bin/swarm down --recursive bzz:/37dc50f16176901ff7a18dc815432f1144f93f2f26f7c794d17d6ec81f8810a8 ./swarm-down-copy
$ tree swarm-down-copy/
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
Enter the following commands and observe that their hashes are the same

```shell
cat ./dist/{index.html,img/circles1.svg,css/styles.css} | sha256sum
3521ac76a1f61cd3ace92d4e3e672c62eb0183688faf6ba2c4efdd9bf5d23991  -
$ cat ./swarm-down-copy/{index.html,img/circles1.svg,css/styles.css} | sha256sum
3521ac76a1f61cd3ace92d4e3e672c62eb0183688faf6ba2c4efdd9bf5d23991  -
```

Finally let's bring this home by visiting the website in Swarm.

Visit [http://localhost:8500/bzz:/37dc50f16176901ff7a18dc815432f1144f93f2f26f7c794d17d6ec81f8810a8/](http://localhost:8500/bzz:/37dc50f16176901ff7a18dc815432f1144f93f2f26f7c794d17d6ec81f8810a8/)

You should see the website load,
and it should look the same as the one served on [http://localhost:7500/](http://localhost:7500/)

## Mission accomplished

Now you have a website uploaded onto, and served from Swarm,
which is identical to the one that you have served using a centralised HTTP server.

Where to go from here?

- Update the contents of your website on Swarm
- Propagate your Swarm website to other nodes
- Register a decentralised domain name for your website on Swarm
  - After this, update webiste contents and point domain at new version
- Dual deployment of your website on both swarm and a centralised web server
