[starlingstorage.io](https://starlingstorage.io)

**Starling is a storage application** that makes preserving and safeguarding digital assets easy. It does this by providing users and developers with a very simplified and user-friendly interaction with the power of the [Filecoin](https://filecoin.io/) decentralized storage network.
 
**This wiki** describes Starling’s RESTful API, which provides developers a straightforward and standardized means by which to integrate the use of Starling into custom applications, scripts, and infrastructure. The Starling API can be hosted anywhere, but generally speaking the best experience will be had by hosting the API as close as possible to the data that is being stored.
 
**There are six basic actions** that can be conducted via the Starling API, which are essentially identical to what can be done via the [command line interface](https://starlingstorage.io/commands.html). These are described below, including examples of expected output.

# Store
**About:** The call for storing files in Filecoin via Starling

**Path:** /api/store

**Input:** path to file or folder

**Returns:**

| Name | Description |
| ------------- | ------------- |
| path  | The path of the digital object you have asked to store  |

## Store API Example

`POST /api/store`

**Request Body:**
```json
{
	"dataPath":"/Users/jadtermsani/Desktop/GitRepos/starling-api/lib/routers/"
}
```

**Response:**
```json
{
    "path": "/Users/jadtermsani/Desktop/GitRepos/starling-api/lib/routers/"
}
```

# Get
**About:** The call for downloading a file that you have previously stored

**Path:** /api/get/:uuid/:copyNumber(optional)

# Job Status

**About:** The call for checking on the status of a previously made request to store a file

**Path:** /api/jobStatus/:uuid

**Returns:** 

```json
{
   "uuid": "STRLNG-ioucYYX25",
   "name": "testfile",
   "status": "STORING",
   "size": "3.92 KB",
   "encryption": "enabled",
   "date": "2020-07-02T16:04:04.625Z",
   "totalCopies": 1
}
```

# Monitor
**About:** this provides you with a high level overview of your overall storage usage, and current activity as far as any jobs that are queued, are syncing to storage miners, or are being sealed and verified by miners.

**Path:** /api/monitor

**Input:** none

**Returns:**
```json
{
    "miners": 1,
    "wallet": {
        "balance": "49999999995260531623"
    },
    "jobs": [
        {
            "uuid": "STRLNG-ioucYYX25",
            "name": "testfile",
            "status": "STORING",
            "size": 4016,
            "encryption": "enabled",
            "date": "2020-07-02T16:04:04.625Z",
            "totalCopies": 1
        },
        {
            "uuid": "STRLNG-ppzzwS0yG",
            "name": "testfile",
            "status": "STORED",
            "size": 5008,
            "encryption": "enabled",
            "date": "2020-07-02T18:17:05.682Z",
            "totalCopies": 1
        }
    ]
}
```

# List
**About:** this call to the API is for retrieving a list of all of the files that you have stored in Filecoin via Starling.

**Path:** /api/list

**Returns:**

```json
{
    "data": [
        {
            "uuid": "STRLNG-ioucYYX25",
            "name": "testfile",
            "status": "STORING",
            "size": "3.92 KB",
            "encryption": "enabled",
            "date": "2020-07-02T16:04:04.625Z",
            "totalCopies": 1
        },
        {
            "uuid": "STRLNG-ppzzwS0yG",
            "name": "testfile",
            "status": "STORED",
            "size": "4.89 KB",
            "encryption": "enabled",
            "date": "2020-07-02T18:17:05.682Z",
            "totalCopies": 1
        }
    ]
}
```

# Verify
**About:** The Filecoin protocol has incredibly powerful, trustworthy, cryptographically vetted algorithms for verifying that a file is bit-for-bit still the same as the day it was stored – that it has not been modified, corrupted, or deleted – and that it has absolutely 100% been stored by the storage miner the entire time since the deal was made. This API check the fixity of the stored files.

**Path:** /api/verify

```json
[
    {
        "uuid": "STRLNG-ppzzwS0yG",
        "name": "testfile",
        "fixityCheck": "passed",
        "date": "2020-07-02T18:17:05.682Z"
    }
]
```
