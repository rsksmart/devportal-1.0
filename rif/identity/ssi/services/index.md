---
layout: rsk
title: "Services - Self-Sovereign Identity - RIF Identity"
tags: rif-identity, rif-id, ssi, self-sovereign-identity
---

## Services

RIF Self-Sovereign Identity solution provides four main services to interact with:

- Issuer Back Office - lists all pending credentials and grant/deny each of them
- Credential Requests - handles all credential requests and emits credentials if they have been granted before
- Data vault - IPFS pinner/unpinner service and puts/gets/deletes stuff in a centralized key-value DB
- [Convey](convey-service) - uploads files to IPFS and caches/serves those cached files
