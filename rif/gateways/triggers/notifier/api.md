---
layout: rsk
title: RIF Notifier API 
tags: rif, notifier, api
---

You can access the RIF notifier REST api thru the available endpoints. The available endpoints can be accessed thru swagger using the link http://localhost:8080/swagger-ui.html

Below is a summary of the available endpoints.

Contents


1. [Get Subscription Plans](#get-subscription-plans)
2. [Subscribe to Plan](#subscribe-to-plan)
3. [Renew Subscription](#renew-subscription)
4. [Subscription and Renewal Response](#subscription-and-renewal-response)
5. [Other available endpoints](#other-available-endpoints)   
	1. [Retrieve notifications](#getting-notifications)
	2. [Unsubscribe from topic](#unsubscribing-from-a-topic)
	3. [Save notification Preference](#save-notification-preference)
	4. [Remove notification Preference](#remove-notification-preference)
	5. [Get subscription info](#get-subscription-info)
	6. [Get Lumino tokens](#get-lumino-tokens)
	7. [Subscribe to specific open channel](#subscribe-to-specific-open-channel)
	8. [Subscribe to close channel](#subscribe-to-close-channel)
	9. [Subscribe to all open channels](#subscribe-to-all-lumino-open-channels)
	10. [Get chain addresses events](#get-rns-events)
6. [Health Check](#health-check)

### **Get Subscription Plans**
The endpoint http://localhost:8080/getSubscriptionPlans can be used to get a list of subscription plans along with the accepted currencies and the price in each currency. Optionally ```activePlans=true``` parameter can be sent to retrieve only the active subscription plans.

### **Subscribe to Plan**

Users can create a subscription to a given plan by providing their user address and plan id along with topic details and the notification preferences.

The endpoint http://localhost:8080/subscribeToPlan can be used to create a new subscription. A sample json that can be sent in the request body is provided under ```src/main/resources/subscription-batch-example.json```. Modify the json to provide your own topics and preferences. More information on how to specify the topic subsection can be found at [topic json](#topic-json)

```currency``` in json should be one of the currencies accepted by the provider, and allowed in the plan.

```price``` should be same price as in subscription plan for the given currency 

One or more ```notificationPreferences``` can be specified 
```notificationService``` currently supported are ```API, EMAIL and SMS```. For more information on notificationPreferences subsection refer to [notification preference json body](#notification-preference-json-body)

### **Renew Subscription**

Users can renew a subscription to a given plan by providing their user address and plan id along with topic details and the notification preferences. The renewal json is same as [subscribe to plan](#subscribe-to-plan) json. However, previousSubscriptionHash has to be sent along with the request. The previous subscription cannot be in ```PENDING``` state.
 
The endpoint http://localhost:8080/renewSubscription?previousSubscriptionHash can be used to create a new subscription. ```previousSubscriptionHash``` parameter must be sent as a request parameter. 

### **Subscription and Renewal response**
As part of the subscription and renewal response a ```hash``` of the subscription along with the ```signature``` is returned. The ```hash``` can be used to identify a subscription. 

**Api key**  
An api key is also generated as part of the response, which can be used to perform [get subscription info](#get-subscription-info) and [get notifications](#getting-notifications) operations

-------------------

###### **Topic Json**

```json
{
    "type": "CONTRACT_EVENT", 
    "topicParams": [{
            "type": "CONTRACT_ADDRESS",
            "value": "0xf4af6e52b1bcbbe31d1332eb32d463fb10bded27"
        },
        {
            "type": "EVENT_NAME",
            "value": "LogSellArticle"
        },
        {
            "type": "EVENT_PARAM",
            "value": "seller",
            "order": 0,
            "valueType": "Address",
            "indexed": 1
        },
        {
            "type": "EVENT_PARAM",
            "value": "article",
            "order": 1,
            "valueType": "Utf8String",
            "indexed": 0,
            "filter": "iphone x"
        },
        {
            "type": "EVENT_PARAM",
            "value": "price",
            "order": 2,
            "valueType": "Uint256",
            "indexed": 0,
            "filter": "1000"
        }
    ]
}
```

#### **Notes of Topic Json structure**

Event type (First param of the json structure), this can be type of: `CONTRACT_EVENT, NEW_TRANSACTIONS, NEW_BLOCK`. It'll indicate the notifier what type of event you want to listen in the blockchain

When you want to listen to a certain contract event in the blockchain, you need to indicate type: `CONTRACT_EVENT` type, some needed params are required for this type of event:

-CONTRACT_ADDRESS param like the described before, this will indicate to the notifier that this param is the address to be listened. *It is required.

-EVENT_NAME param, this will be used to check that the name of the contract event is the same as the blockchain when it's called. *It is required.

-EVENT_PARAM, here you will need to indicate an order as described by the contract signature, please indicate when a param is indexed also. The valueType need to be a web3 accepted type. Not required, in case the event doest have one, dont send this.

--EVENT_PARAM is composed of some attributes, "value" indicates the name of the event parameter, "order" is for the order of the param that appears in the event, this will be used to filter the data. "valueType" is used to create the event listener in rif-notification, so it needs to be a valid web3 type, "indexed" is used to indicate if the param is indexed, default value is 0, and we add a "filter" param, so you can use it to filtering the data you want to retrieve from the event.

For others types, you only need to send the Type without Params.

As an example for `NEW_BLOCKS` or `NEW_TRANSACTIONS`

```json
{
    "type": "NEW_BLOCK", 
}
```
Or
```json
{
    "type": "NEW_TRANSACTION", 
}
```

Return example: 

```json
{
    "message": "OK",
    "data": "{\"topicId\": 1}",
    "status": "OK"
}
```
You can store that topicId for later get the notifications for that particular event

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


###### Unsubscribing from a Topic

```
POST Request: http://localhost:8080/unsubscribeFromTopic?idTopic=ID_TOPIC
Header param: 
	key: apiKey
	value: API_KEY 
```

###### Save Notification Preference
Notification Preference allows to save a type of notification to send for all blockchain notifications. The different types of notifiction preference available are SMS, EMAIL and API. 
A notification preference is usually associated to a user and topic id. When no topic id is provided a default topic id 0 is used, and set as default notification preference when no
preference found for given user and topic id.
```
POST Request: http://localhost:8080/saveNotificationPreference
Header param:
    key: apiKey
    value: API_KEY
```
###### **Notification Preference Json Body:**
```
        {
          "notificationService":"API",
          "destination":"http://host/notify",
          "idTopic":"0",
          "destinationParams":{
              "apiKey":"test",
              "username":"test",
              "password":"test"
            }
        }
```
Email Json Body:
```
        {
                "notificationService":"EMAIL",
                "destination":"123456@abc.com;123@abc.com", /*(multiple email addresses separated by semi-colon)*/ 
                "idTopic":"11",
        }
```
Sms Json Body:
```
        {
               "notificationService":"SMS",
                "destination":"+191725245555", /* in exact format, +(country code)(phone number)*/
                "idTopic":"10",
        }     
```

###### Remove Notification Preference
Removes a given notification preference
```
POST Request: http://localhost:8080/removeNotificationPreference
Header param:
    key: apiKey
    value: API_KEY
```
API Json Body
```
    {
          "notificationService":"API",
          "idTopic":"10",
    }
```
SMS Json Body
```
    {
          "notificationService":"SMS",
          "idTopic":"10",
    }
```
Email Json Body
```
    {
          "notificationService":"EMAIL",
          "idTopic":"10",
    }

```

###### Other available endpoints

----------------
###### Get Subscription info
```
GET Request: http://localhost:8080/getSubscriptionInfo
Header param: 
	key: apiKey
	value: API_KEY 
Short description: Brings the data associated with your subscription (Notification_Balance, Topics subscribed with params, etc)
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
----------------

###### Get lumino tokens
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
----------------
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
----------------
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
----------------
###### Subscribe to all lumino open channels
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
----------------
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
thru ```notifier.services.enabled``` configuration property, the status of the 
service is shown as disabled.
```
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
