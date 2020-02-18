---
layout: rsk
title: RNS JS Library - Error knowledge base
tags: rns, javascript
---

|Code | Message | Description |
|--- | --- | ---|
|KB001|No addr resolution set|The given domain has a resolver, but the resolution has not been set|
|KB002|No addr resolution|The given domain has a resolver, but it does not support [addr](/rif/rns/architecture/Resolver/#addr) interface|
|KB003|No resolver|The given domain doesn't have a resolver set|
|KB004|Library not composed|Thrown when trying to accesses `rns.contracts` before executing `rns.compose()`|
|KB005|No contract addresses provided|Thrown when constructing lib on a local/custom RNS environment and contract addresses are not provided|
|KB006|No chain address resolution|The given domain has a resolver, but the resolution for the given chain has not been set|
|KB007|No chain address resolution set|The given domain has a resolver, but it does not support [chainAddr](/rif/rns/architecture/MultiCryptoResolver) interface|
|KB008|Search only domains|-|
|KB009|Search only `.rsk` domains|-|
|KB010|Invalid domain, must be alphanumeric and lower case|-|
|KB011|Invalid label, must be alphanumeric and lower case|-|
|KB012|The given domain does not exist|-|
|KB013|No name resolution|The given address has a reverse resolver, but it does not support [name](/rif/rns/architecture/NameResolver#name) interface|
|KB014|No reverse resolution set|The given address has not the reverse resolution set|
