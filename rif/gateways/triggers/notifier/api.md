---
layout: rsk
title: RIF Notifier API
tags: rif, notifier, api
---

You can access the RIF notifier REST api through the available endpoints. The available endpoints can be accessed through swagger using the link http://localhost:8080/swagger-ui.html

Below is a summary of the available endpoints.

Contents

1. [Get Subscription Plans](#get-subscription-plans)
2. [Subscribe to Plan](#subscribe-to-plan)
3. [Renew Subscription](#renew-subscription)
4. [Subscription and Renewal Response](#subscription-and-renewal-response)
5. [Other available endpoints](#other-available-endpoints)
	1. [Retrieve notifications](#getting-notifications)
	2. [Get subscriptions](#get-subscriptions)
	3. [Get Lumino tokens](#get-lumino-tokens)
	4. [Subscribe to specific open channel](#subscribe-to-specific-open-channel)
	5. [Subscribe to close channel](#subscribe-to-close-channel)
	6. [Subscribe to all open channels](#subscribe-to-all-lumino-open-channels)
	7. [Get chain addresses events](#get-rns-events)
6. [Health Check](#health-check)

### **Get Subscription Plans**

The endpoint http://localhost:8080/getSubscriptionPlans can be used to get a list of subscription plans along with the accepted currencies and the price in each currency. Optionally `activePlans=true` parameter can be sent to retrieve only the active subscription plans.



### **Subscribe to Plan**
Run the command ```notifier-cons-cli subscribe``` to subscribe to a plan

### **Renew Subscription**
Run the command ```notifier-cons-cli renew``` to renew existing subscription

### **Subscription and Renewal response**
As part of the subscription and renewal response a `hash` of the subscription along with the `signature` is returned. The `hash` can be used to identify a subscription. 

**Api key**  
An api key is also generated as part of the response, which can be used to perform [get subscriptions](#get-subscriptions) and [get notifications](#getting-notifications) operations

### **Subscription and Renewal response**
As part of the subscription and renewal response a `hash` of the subscription along with the `signature` is returned. The `hash` can be used to identify a subscription.

###### Getting notifications

When you're subscribed to topics, and a event is triggered the notifier will be processing the data, and saving it so you can access to that.

```
GET Request: http://localhost:8080/getNotifications
Header param:
	key: apiKey
	value: API_KEY
Query params:
	idTopic [Optional]: The notifications will be filtered with this param, so it brings only the idTopics associated with each, you can send lots of ids, separating each with commas: 12,15,21
	fromId [Optional]: Each notification has an id, you can make a greater than by providing this param
	lastRows [Optional]: With this param you can set how many notifications will the notifier return. MAX is setted in applications.properties at 1000, so this number need to less than that
```

###### Other available endpoints

###### Get Subscriptions

```
GET Request: http://localhost:8080/getSubscriptions
 or
GET Request: http://localhost:8080/getSubscriptions/hash1,hash2...
Header param: 
    Header param: 
	key: userAddress
	value: USER_ADDRESS
	key: apiKey
	value: API_KEY 
	Request param:
	name: subscriptionHash
	value: SUBSCRIPTION_HASH
Short description: Gets all the subscriptions or subscriptions for provided hashes. More detailed subscription info will be returned for users with valid api key.
```

Return example:

```json
{
    "message": "OK",
    "data": "SEE JSON BELOW",
    "status": "OK"
}
```

```json
{
   "id":0,
   "activeSince":"2020-00-00 00:00:00.0",
   "active":true,
   "userAddress":"MY_ADDRESS",
   "type":{
      "id":0,
      "notifications":2147483647
   },
   "state":"PAYED",
   "topics":[
   ],
   "notificationPreferences":[
   ],
   "notificationBalance":2147483647
}
```

###### Get Lumino tokens

```
GET Request: http://localhost:8080/getLuminoTokens
Header param:
	key: apiKey
	value: API_KEY
Short description: Brings an array of Token Network Address for the tokens registered in the blockchain, it can be used in other endpoints to subscribe to OpenChannels for the token or Close Channel events.
```

Return example:

```json
{
    "message": "OK",
    "data": ["0x386d436aAaDB7a14904B754695A9a79d3E1D521E"],
    "status": "OK"
}
```

###### Subscribe to specific open channel

```
GET Request: http://localhost:8080/subscribeToOpenChannel
Header param:
	key: apiKey
	value: API_KEY
Query params:
	token [Required]: Token network id for the token that you want to listen to open channel events
	participantone [Optional]: Address participant 1 of the channel
	participanttwo [Optional]: Address participant 2 of the channel
Short description: The notifier will listen to the events for the specified token.
```

Return example:

```json
{
    "message": "OK",
    "data": "{\"topicId\": 0}",
    "status": "OK"
}
```

###### Subscribe to close channel

```
GET Request: http://localhost:8080/subscribeToCloseChannel
Header param:
	key: apiKey
	value: API_KEY
Query params:
	token [Required]: Token network id for the token that you want to listen to open channel events
	closingParticipant [Optional]: Address of the participant who closes the channel
	channelidentifier [Optional]: Id of the channel
Short description: Similar to subscribeToOpenChannel, but for close channel event.
```

Return example:

```json
{
    "message": "OK",
    "data": "{\"topicId\": 0}",
    "status": "OK"
}
```

###### Subscribe to all Lumino open channels

```
GET Request: http://localhost:8080/subscribeToLuminoOpenChannels
Header param:
	key: apiKey
	value: API_KEY
Query params:
	closingParticipant [Optional]: Address of the participant who closes the channel
	channelidentifier [Optional]: Id of the channel
Short description: This endpoint subscribes you to all tokens, and returns an array of topic id, each topic will represent a event for each token. Also this endpoint accepts params for participantone and participanttwo, if sent, will filter all the topics.
```

Return example:

```json
{
    "message": "OK",
    "data": "{\"topicId\": 0}",
    "status": "OK"
}
```

###### Get RNS events

```
GET Request: http://localhost:8080/getRnsEvents
Header param:
	key: apiKey
	value: API_KEY
Query params:
	nodehash [Optional]: Hashed name of the owner of the chain address
	eventName [Optional]: "ChainAddrChanged" for all types of chain address or "AddrChanged" to RSK Chain addresses events
Short description: From this endpoint you can bring the events emmited by the chain addresses set.
```

Return example:

```json
{
    "message": "OK",
    "data": [
        {
            "id": 772,
            "nodehash": "0x5f0169581c8d8a20ced1dc6f11c6e72485191e6a6a8fcc833692b4b966c63ab5",
            "eventName": "ChainAddrChanged",
            "chain": "0x80000132",
            "address": "0xC9dB73F54D43479b1a67DB2284bCFed17b0A13c2",
            "rowhashcode": 762164261,
            "block": 9976
        },
	{
            "id": 921,
            "nodehash": "0x55343d1b4bf30f6cde61752100e8d7d4061b87424e1697697e9e8ac23970ef04",
            "eventName": "AddrChanged",
            "chain": "0x80000089",
            "address": "0xad12408d680504719756cc4969eec9f302335c44",
            "rowhashcode": 210602843,
            "block": 1087198
        }
    ],
    "status": "OK"
}
```

## Health Check

Health check provides a way to ensure that the rif-notifier service is
fully functional. The following url is used for health check

```
http://localhost:8080/actuator/health
```

A sample response is given below. status property in json is either UP or DOWN. The response json
also provides more details on individual services. The status for each individual
service is UP, DOWN or disabled. When a notification service is not provided by the provider
through the `notifier.services.enabled` configuration property, the status of the
service is shown as disabled.

```json
{
    "status": "UP",
    "details": {
        "mail": {
            "status": "disabled",
            "details": {
                "service": "service is not enabled in configuration"
            }
        },
        "RSK": {
            "status": "UP"
        },
        "SMS": {
            "status": "disabled",
            "details": {
                "service": "service is not enabled in configuration"
            }
        },
        "db": {
            "status": "UP",
            "details": {
                "database": "MySQL",
                "hello": 1
            }
        },
        "diskSpace": {
            "status": "UP",
            "details": {
                "total": 119824367616,
                "free": 21785624576,
                "threshold": 10485760
            }
        }
    }
}
```
