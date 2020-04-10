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
| dealID  | Identifier assigned by Filecoin to refer to the deal made between you and a Filecoin storage miner for the given file.  |
| name  | The filename of the digital object you have asked to store  |

## Store API Example

`POST /api/store`

**Request Body:**
```
{
	"dataPath":"/Users/jadtermsani/Desktop/GitRepos/starling-api/lib/routers/"
}
```

**Response:**
```
{
    "data": {
        "message": "all storage deals successfully made!",
        "dealIDs": [
            [
                {
                    "dealID": "bafy2bzacebzfjtcenqwkzmo4ytcqnkwnnc4wlvueusppvue2zrsblizcrji7s",
                    "name": "authenticated.js"
                },
                {
                    "dealID": "bafy2bzacebbydr5zx2fqoigl5c5zt4rgtkrplyhekwmlspflxclwjj5apehvq",
                    "name": "default.js"
                }
            ],
            [
                {
                    "dealID": "bafy2bzaceby6xw5pfkx26hmbt43qukjmlh4mi2ewcshsargha3ftqwefw6oa4",
                    "name": "authenticated.js"
                },
                {
                    "dealID": "bafy2bzacebovkoi73yutlvlyys3lj3zdrjr6eyxrhowbvg5va6bak7bsoj5ca",
                    "name": "default.js"
                }
            ]
        ]
    }
}
```

# Get
**About:** The call for downloading a file that you have previously stored

**Path:** /api/get

**Input:** minerID and contentID

**Returns:** tk

# Job Status

**About:** The call for checking on the status of a previously made request to store or download a file

**Path:** /api/jobStatus

**Input:** jobID

**Returns:** tk

# Monitor
**About:** this provides you with a high level overview of your overall storage usage, and current activity as far as any jobs that are queued, are syncing to storage miners, or are being sealed and verified by miners.

**Path:** /api/monitor

**Input:** none

**Returns:**

| Name | Description |
| ------------- | ------------- |
| filesStored  | Files stored in the network  |
| totalMiners  | # of miners  |
| totalStorageUsed  | Storage space used  |
| walletBalance  | Wallet balance  |
| queuedJobs  | A JSON object that contains totalQued, and queued, which are described below  |
| queuedJobs - totalQueued  | A numerical count of how many jobs are currently in the “queue”, waiting for other jobs to complete before syncing to a storage miner can occur  |
| queuedJobs - queued  | A JSON list containing the following items below  |
| queuedJobs - queued - UUID  | A universally unique identifier, assigned by Starling to digital objects, for the purpose of having a reference that is more unique and reliable than a file name  |
| queuedJobs - queued - CID  | The content identifier assigned to a digital object by Filecoin  |
| queuedJobs - queued - NAME  | The filename of the digital object  |
| queuedJobs - queued - SIZE  | The size of the digital object in bytes  |
| queuedJobs - queued - STATE  | The stage in which the file is in the storage process (possible values are upload, sync, seal)  |
| queuedJobs - queued - COPY_NUMBER  | The stage in which the file is in the storage process (possible values are upload, sync, seal)  |
| activeJobs  | A JSON object that contains totalActive, and active, which are described below  |
| activeJobs - totalActive  | A numerical count of how many jobs are currently active  |
| activeJobs - active  | A JSON list containing the following items below  |
| activeJobs - active - UUID  | A universally unique identifier, assigned by Starling to digital objects, for the purpose of having a reference that is more unique and reliable than a file name  |
| activeJobs - active - CID  | The content identifier assigned to a digital object by Filecoin  |
| activeJobs - active - NAME  | The filename of the digital object  |
| activeJobs - active - SIZE  | The size of the digital object in human readable form (i.e. Bytes, MB, GB)  |
| activeJobs - active - STATE  | The stage in which the file is in the storage process (possible values are upload, sync, seal)  |
| activeJobs - active - COPY_NUMBER  | Starling provide users with the ability to store multiple redundant copies with different storage miners  |

## Monitor API Example

`GET /api/monitor`

 
**Response:**
```
{
    "filesStored": 18,
    "totalMiners": 20,
    "totalStorageUsed": "32.63 KB",
    "walletBalance": "999.999999661290501",
    "queuedJobs": {
        "totalQueued": 0,
        "queued": []
    },
    "activeJobs": {
        "totalActive": 18,
        "active": [
            {
                "UUID": "a7d1e6dc-2221-47c5-8f10-28dfb5a5a9adf",
                "CID": "QmSkBoZW7ZgSCwCgkEzvwGFezpbCZAyrgdWJ1iFrcmFHpr",
                "NAME": ".env",
                "SIZE": "89 Bytes",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-01-28 10:55:17",
                "DEAL_ID": "bafy2bzaceax5deuvjykzorf6lkl27rn3ovejqc55gwip6lj24qzvxz4y2gtza",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 2,
                "DATETIME_STARTED": "2020-01-28 13:06:04"
            },
            {
                "UUID": "a7d1e6dc-2221-47c5-8f10-28dfb5a5a9ad",
                "CID": "QmSkBoZW7ZgSCwCgkEzvwGFezpbCZAyrgdWJ1iFrcmFHpr",
                "NAME": ".envj",
                "SIZE": "89 Bytes",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-01-28 10:54:46",
                "DEAL_ID": "bafy2bzacea55yzvy544llekd4mpnfhm6qa6tlfqmvd45gafr5xremymotffwe",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 1,
                "DATETIME_STARTED": "2020-01-28 13:06:04"
            },
            {
                "UUID": "d8a6c8ee-8123-472a-a8f0-e5dfa1c4349f",
                "CID": "QmYJKh8X1UWkhGdT5rryBQX5z2qcbpdwp1uoote7HVUSeh",
                "NAME": "functions.js",
                "SIZE": "9.13 KB",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-01-28 14:03:25",
                "DEAL_ID": "bafy2bzacecthiex2xwz7agcwmrirmj7xrgrfcn4nimwirkqnbqwf6jmz733tw",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 1,
                "DATETIME_STARTED": "2020-02-04 12:07:59"
            },
            {
                "UUID": "4482fa91-bb14-4f1c-8a92-4c82b1dad41b",
                "CID": "QmYJKh8X1UWkhGdT5rryBQX5z2qcbpdwp1uoote7HVUSeh",
                "NAME": "functions.js",
                "SIZE": "9.13 KB",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-01-28 14:03:56",
                "DEAL_ID": "bafy2bzacea6vazglk2evzyn4bner76lfwcaae7jntx5lqmjcdnfgfcscfthfa",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 2,
                "DATETIME_STARTED": "2020-02-04 12:07:59"
            },
            {
                "UUID": "9a652b83-3734-44d1-bae2-88e718609e8e",
                "CID": "QmeyQv7xZRsZfGco697Aav4isBf5n45bBXwC2N1dg21aw9",
                "NAME": "index.js",
                "SIZE": "769 Bytes",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-01-28 14:05:29",
                "DEAL_ID": "bafy2bzacedz66gkr3mvx4a7zmi3o4h2rgbylochzysgk5oet7ii3553drfvg4",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 1,
                "DATETIME_STARTED": "2020-02-04 12:07:59"
            },
            {
                "UUID": "e8f6df7c-23c4-4b85-b8cf-83839be140d6",
                "CID": "QmeyQv7xZRsZfGco697Aav4isBf5n45bBXwC2N1dg21aw9",
                "NAME": "index.js",
                "SIZE": "769 Bytes",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-01-28 14:06:00",
                "DEAL_ID": "bafy2bzacedbqxgrc7lrjp3q7e5zkx6zi5id3kxawy7bx3anb6kwtuflx2owiw",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 2,
                "DATETIME_STARTED": "2020-02-04 12:07:59"
            },
            {
                "UUID": "a172e722-cdf4-4979-8341-ee4a3d6e871a",
                "CID": "QmPaTP29vGpZ9aVQfcSqKZ31iX4jXWoEqHCTFE4DfPhcQz",
                "NAME": "index.js",
                "SIZE": "3.32 KB",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-01-28 16:51:23",
                "DEAL_ID": "bafy2bzaceaghq5lxfrca5tx4ikkwrricszlgegrmjxcjvbeusek3eukb4gafc",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 1,
                "DATETIME_STARTED": "2020-02-04 12:07:59"
            },
            {
                "UUID": "d00b0cd6-b158-4205-9c4a-e4e311209399",
                "CID": "QmPaTP29vGpZ9aVQfcSqKZ31iX4jXWoEqHCTFE4DfPhcQz",
                "NAME": "index.js",
                "SIZE": "3.32 KB",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-01-28 16:51:54",
                "DEAL_ID": "bafy2bzaceck23x3fjhnj5pplzz3wsrbxkt2mlvp7u2v2tnpveaqvv6dfnmp4e",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 2,
                "DATETIME_STARTED": "2020-02-04 12:07:59"
            },
            {
                "UUID": "5412a6a3-92a0-490d-b52c-907905f9cf07",
                "CID": "QmPhP5xcy7fZ8SdaYg1a5FRznEZ2Hc1YLSZC3a29R3hVUh",
                "NAME": "deals.js",
                "SIZE": "70 Bytes",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-02-04 17:20:25",
                "DEAL_ID": "bafy2bzaceavkifc6ee5vx764pbgs4ohygyif5z4wk6zbjx3lze6azswoc6zic",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 1,
                "DATETIME_STARTED": "2020-02-05 12:08:30"
            },
            {
                "UUID": "4596d8c7-6fc5-4af2-a0cb-d38ac7b3ca97",
                "CID": "QmTsb11JbTLnLb8WNgBZ5tzq6MMq8ncgmkEr4R9DxUiwLp",
                "NAME": "paths.js",
                "SIZE": "444 Bytes",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-02-04 17:31:47",
                "DEAL_ID": "bafy2bzacebkxot2z4fbrzh3fzkmsefd4cft3zmj7bksvagzyrnjj4cwfofde2",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 1,
                "DATETIME_STARTED": "2020-02-05 12:08:30"
            },
            {
                "UUID": "8230c16d-7b65-4a3e-b46d-0920a4158edf",
                "CID": "QmTsb11JbTLnLb8WNgBZ5tzq6MMq8ncgmkEr4R9DxUiwLp",
                "NAME": "paths.js",
                "SIZE": "444 Bytes",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-02-04 17:32:18",
                "DEAL_ID": "bafy2bzacec7xvawrblf6loclwn7aopt5bm5dp5wkdo4xj22yncflk5vi7lmag",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 2,
                "DATETIME_STARTED": "2020-02-05 12:08:32"
            },
            {
                "UUID": "19ff3af1-5f10-4af9-b9a9-b907ccc8aad3",
                "CID": "QmXHrsHXX1djZSd6uDBgcMRk7c6bvGf1FxiZUPfERS8d5G",
                "NAME": "utils.js",
                "SIZE": "1.1 KB",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-02-06 15:12:09",
                "DEAL_ID": "bafy2bzacecmawi3xl6qjx4m7n4xgl66itgxh6fgigxcmcnxx74ru4664ygpvs",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 1,
                "DATETIME_STARTED": "2020-02-06 16:06:13"
            },
            {
                "UUID": "fce3a688-0bfe-47c2-a7a2-e46606b294a4",
                "CID": "QmSgLUbxUqAPFpdKva4xVd2ExsjCRkYkPdgpqnoC2Sqovv",
                "NAME": "error-handler.js",
                "SIZE": "325 Bytes",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-02-06 15:12:09",
                "DEAL_ID": "bafy2bzacedjwaauowwbtkfgvjj74tt735egqyyxekncscst3kjf47rtpvgn5e",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 1,
                "DATETIME_STARTED": "2020-02-06 16:06:13"
            },
            {
                "UUID": "b1d3fbd3-b2a8-47b1-a650-e2f374cb0eeb",
                "CID": "QmXx4TKA1j6GwW9pnt5hES7bbFzZHM5hxXTCXyDgkqWaNj",
                "NAME": "strategies.js",
                "SIZE": "604 Bytes",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-02-06 15:12:09",
                "DEAL_ID": "bafy2bzacebe7krue77ozsakya4sqm3o52f4nwubt3ahvrh77amxhcaadaj6gg",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 1,
                "DATETIME_STARTED": "2020-02-06 15:28:29"
            },
            {
                "UUID": "1e6192c2-1cf5-450a-9ebc-1ecf1c4f28d3",
                "CID": "QmRm2hjhQNPnc176mHq8Q9jLsy55pnGqX4Cn4xH92sRDSi",
                "NAME": "default.js",
                "SIZE": "439 Bytes",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-02-06 15:25:36",
                "DEAL_ID": "bafy2bzacebbydr5zx2fqoigl5c5zt4rgtkrplyhekwmlspflxclwjj5apehvq",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 1,
                "DATETIME_STARTED": "2020-02-06 16:06:12"
            },
            {
                "UUID": "1ebb9afe-5ada-4cae-aa01-66fe9d7f5fe9",
                "CID": "QmRm2hjhQNPnc176mHq8Q9jLsy55pnGqX4Cn4xH92sRDSi",
                "NAME": "default.js",
                "SIZE": "439 Bytes",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-02-06 15:26:07",
                "DEAL_ID": "bafy2bzacebovkoi73yutlvlyys3lj3zdrjr6eyxrhowbvg5va6bak7bsoj5ca",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 2,
                "DATETIME_STARTED": "2020-02-06 16:06:13"
            },
            {
                "UUID": "d7c083e2-3cd3-465e-b034-cf96e1362436",
                "CID": "QmWLYyVyCMXtN3AHSaZvFchhcoKdV1xMPJpcind8ZSjmjM",
                "NAME": "authenticated.js",
                "SIZE": "1.12 KB",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-02-06 15:25:36",
                "DEAL_ID": "bafy2bzacebzfjtcenqwkzmo4ytcqnkwnnc4wlvueusppvue2zrsblizcrji7s",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 1,
                "DATETIME_STARTED": "2020-02-06 16:06:12"
            },
            {
                "UUID": "dec96f03-0615-4d93-83cc-2ed3f543f1b8",
                "CID": "QmWLYyVyCMXtN3AHSaZvFchhcoKdV1xMPJpcind8ZSjmjM",
                "NAME": "authenticated.js",
                "SIZE": "1.12 KB",
                "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
                "DEAL_DATE": "2020-02-06 15:26:07",
                "DEAL_ID": "bafy2bzaceby6xw5pfkx26hmbt43qukjmlh4mi2ewcshsargha3ftqwefw6oa4",
                "VERIFY_RESULT": "pass",
                "STATE": "upload",
                "STATUS": "seal",
                "COPY_NUMBER": 2,
                "DATETIME_STARTED": "2020-02-06 16:06:12"
            }
        ]
    }
}
```
# List
**About:** this call to the API is for retrieving a list of all of the files that you have stored in Filecoin via Starling.

**Path:** /api/list

**Returns:**

| Name | Description |
| ------------- | ------------- |
| data  | A JSON list that contains the below pieces of information for each file  |
| CID  | The content identifier assigned to a digital object by Filecoin  |
| SIZE  | The size of the digital object in human readable form (i.e. Bytes, MB, GB)  |
| SIZE_BYTES  | The size of the digital object, measured in bytes, returned as an integer  |
| NAME  | The filename of the digital object  |
| MINER_ID  | The storage miner with whom the given digital object is stored with  |
| DEAL_DATE  | The date and time when the original storage deal was made with the miner holding the object  |

## List API Example

`GET /api/list`

**Response:**
```
{
    "data": [
        {
            "CID": "QmSkBoZW7ZgSCwCgkEzvwGFezpbCZAyrgdWJ1iFrcmFHpr",
            "SIZE": "89 Bytes",
            "SIZE_BYTES": 89,
            "NAME": ".env",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 10:55:17"
        },
        {
            "CID": "QmSkBoZW7ZgSCwCgkEzvwGFezpbCZAyrgdWJ1iFrcmFHpr",
            "SIZE": "89 Bytes",
            "SIZE_BYTES": 89,
            "NAME": ".envj",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 10:54:46"
        },
        {
            "CID": "QmYJKh8X1UWkhGdT5rryBQX5z2qcbpdwp1uoote7HVUSeh",
            "SIZE": "9.13 KB",
            "SIZE_BYTES": 9353,
            "NAME": "functions.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 14:03:25"
        },
        {
            "CID": "QmYJKh8X1UWkhGdT5rryBQX5z2qcbpdwp1uoote7HVUSeh",
            "SIZE": "9.13 KB",
            "SIZE_BYTES": 9353,
            "NAME": "functions.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 14:03:56"
        },
        {
            "CID": "QmeyQv7xZRsZfGco697Aav4isBf5n45bBXwC2N1dg21aw9",
            "SIZE": "769 Bytes",
            "SIZE_BYTES": 769,
            "NAME": "index.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 14:05:29"
        },
        {
            "CID": "QmeyQv7xZRsZfGco697Aav4isBf5n45bBXwC2N1dg21aw9",
            "SIZE": "769 Bytes",
            "SIZE_BYTES": 769,
            "NAME": "index.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 14:06:00"
        },
        {
            "CID": "QmPaTP29vGpZ9aVQfcSqKZ31iX4jXWoEqHCTFE4DfPhcQz",
            "SIZE": "3.32 KB",
            "SIZE_BYTES": 3397,
            "NAME": "index.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 16:51:23"
        },
        {
            "CID": "QmPaTP29vGpZ9aVQfcSqKZ31iX4jXWoEqHCTFE4DfPhcQz",
            "SIZE": "3.32 KB",
            "SIZE_BYTES": 3397,
            "NAME": "index.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 16:51:54"
        },
        {
            "CID": "QmPhP5xcy7fZ8SdaYg1a5FRznEZ2Hc1YLSZC3a29R3hVUh",
            "SIZE": "70 Bytes",
            "SIZE_BYTES": 70,
            "NAME": "deals.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-04 17:20:25"
        },
        {
            "CID": "QmTsb11JbTLnLb8WNgBZ5tzq6MMq8ncgmkEr4R9DxUiwLp",
            "SIZE": "444 Bytes",
            "SIZE_BYTES": 444,
            "NAME": "paths.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-04 17:31:47"
        },
        {
            "CID": "QmTsb11JbTLnLb8WNgBZ5tzq6MMq8ncgmkEr4R9DxUiwLp",
            "SIZE": "444 Bytes",
            "SIZE_BYTES": 444,
            "NAME": "paths.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-04 17:32:18"
        },
        {
            "CID": "QmXHrsHXX1djZSd6uDBgcMRk7c6bvGf1FxiZUPfERS8d5G",
            "SIZE": "1.1 KB",
            "SIZE_BYTES": 1126,
            "NAME": "utils.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-06 15:12:09"
        },
        {
            "CID": "QmSgLUbxUqAPFpdKva4xVd2ExsjCRkYkPdgpqnoC2Sqovv",
            "SIZE": "325 Bytes",
            "SIZE_BYTES": 325,
            "NAME": "error-handler.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-06 15:12:09"
        },
        {
            "CID": "QmXx4TKA1j6GwW9pnt5hES7bbFzZHM5hxXTCXyDgkqWaNj",
            "SIZE": "604 Bytes",
            "SIZE_BYTES": 604,
            "NAME": "strategies.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-06 15:12:09"
        },
        {
            "CID": "QmRm2hjhQNPnc176mHq8Q9jLsy55pnGqX4Cn4xH92sRDSi",
            "SIZE": "439 Bytes",
            "SIZE_BYTES": 439,
            "NAME": "default.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-06 15:25:36"
        },
        {
            "CID": "QmRm2hjhQNPnc176mHq8Q9jLsy55pnGqX4Cn4xH92sRDSi",
            "SIZE": "439 Bytes",
            "SIZE_BYTES": 439,
            "NAME": "default.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-06 15:26:07"
        },
        {
            "CID": "QmWLYyVyCMXtN3AHSaZvFchhcoKdV1xMPJpcind8ZSjmjM",
            "SIZE": "1.12 KB",
            "SIZE_BYTES": 1151,
            "NAME": "authenticated.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-06 15:25:36"
        },
        {
            "CID": "QmWLYyVyCMXtN3AHSaZvFchhcoKdV1xMPJpcind8ZSjmjM",
            "SIZE": "1.12 KB",
            "SIZE_BYTES": 1151,
            "NAME": "authenticated.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-06 15:26:07"
        }
    ]
}
```

# Verify
**About:** The Filecoin protocol has incredibly powerful, trustworthy, cryptographically vetted algorithms for verifying that a file is bit-for-bit still the same as the day it was stored – that it has not been modified, corrupted, or deleted – and that it has absolutely 100% been stored by the storage miner the entire time since the deal was made. This API call returns the originally calculated proofs at the time of the original deal, as well as the most recently re-calculated proofs, and the result of Starling’s cross comparison of these.

**Path:** /api/verify

**Input:** none

**Returns:**

| Name | Description |
| ------------- | ------------- |
| CID  | The content identifier assigned to a digital object by Filecoin  |
| NAME  | The filename of the digital object  |
| MINER_ID  | The storage miner with whom the given digital object is stored with  |
| DEAL_DATE  | The date and time when the original storage deal was made with the miner holding the object  |
| COMMD_ORIGINAL  | The original sector data commitment  |
| COMMR_ORIGINAL  | The original replica commitment  |
| COMMRSTAR_ORIGINAL  | [explanation of commrstar tk]  |
| COMMD_LATEST  | The sector data commitment recalculated for verification  |
| COMMR_LATEST  | The replica data commitment recalculated for verification  |
| COMMRSTAR_LATEST  | [explanation of commrstar tk]  |
| DATE_LAST_CHECK  | The date and time that the proofs (commD, commR, and commRstar) were most recently recalculated  |
| VERIFY_RESULT  | A pass/fail result of Starling’s comparison of the original and latest proofs  |

## Verify API Example

`GET /api/verify`

**Response:**
```{
    "data": [
        {
            "CID": "QmSkBoZW7ZgSCwCgkEzvwGFezpbCZAyrgdWJ1iFrcmFHpr",
            "NAME": ".env",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 10:55:17",
            "COMMD_ORIGINAL": "9lRYeEqL4azGfoMudlkjXrQoSaq9pRZ+q7gu9rZ+2WY=",
            "COMMR_ORIGINAL": "jh+uVR5xvyGiH8DNk4LfDfy5/jBk4zZfbdEKU9oEXjY=",
            "COMMRSTAR_ORIGINAL": "ND/RhlaXEfR7zDiqBYPkBfg4AqIcHRzwj91I8om3DkI=",
            "COMMD_LATEST": "9lRYeEqL4azGfoMudlkjXrQoSaq9pRZ+q7gu9rZ+2WY=",
            "COMMR_LATEST": "jh+uVR5xvyGiH8DNk4LfDfy5/jBk4zZfbdEKU9oEXjY=",
            "COMMRSTAR_LATEST": "ND/RhlaXEfR7zDiqBYPkBfg4AqIcHRzwj91I8om3DkI=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmSkBoZW7ZgSCwCgkEzvwGFezpbCZAyrgdWJ1iFrcmFHpr",
            "NAME": ".envj",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 10:54:46",
            "COMMD_ORIGINAL": "9lRYeEqL4azGfoMudlkjXrQoSaq9pRZ+q7gu9rZ+2WY=",
            "COMMR_ORIGINAL": "jh+uVR5xvyGiH8DNk4LfDfy5/jBk4zZfbdEKU9oEXjY=",
            "COMMRSTAR_ORIGINAL": "ND/RhlaXEfR7zDiqBYPkBfg4AqIcHRzwj91I8om3DkI=",
            "COMMD_LATEST": "9lRYeEqL4azGfoMudlkjXrQoSaq9pRZ+q7gu9rZ+2WY=",
            "COMMR_LATEST": "jh+uVR5xvyGiH8DNk4LfDfy5/jBk4zZfbdEKU9oEXjY=",
            "COMMRSTAR_LATEST": "ND/RhlaXEfR7zDiqBYPkBfg4AqIcHRzwj91I8om3DkI=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:12",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmYJKh8X1UWkhGdT5rryBQX5z2qcbpdwp1uoote7HVUSeh",
            "NAME": "functions.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 14:03:25",
            "COMMD_ORIGINAL": "rf8I4ppt/3wG0FwZvHsO5DwfVtGmCzKNsZnujuqOOzc=",
            "COMMR_ORIGINAL": "tpj3JOlsYOYhFWQDis0ZaS+FfBNk4cllg5qu4RK0PAA=",
            "COMMRSTAR_ORIGINAL": "eF58/I8lYKi60fTdaVRPDQoGyQRJDkgrDgNpJOx1gkU=",
            "COMMD_LATEST": "rf8I4ppt/3wG0FwZvHsO5DwfVtGmCzKNsZnujuqOOzc=",
            "COMMR_LATEST": "tpj3JOlsYOYhFWQDis0ZaS+FfBNk4cllg5qu4RK0PAA=",
            "COMMRSTAR_LATEST": "eF58/I8lYKi60fTdaVRPDQoGyQRJDkgrDgNpJOx1gkU=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmYJKh8X1UWkhGdT5rryBQX5z2qcbpdwp1uoote7HVUSeh",
            "NAME": "functions.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 14:03:56",
            "COMMD_ORIGINAL": "6IoOWd8FhcxADcSKMwBhp69MVZz3B/fz1EHycAy24zQ=",
            "COMMR_ORIGINAL": "GcN7sAtefbg2fWMWuuMAy7YIl88GFUNgi4ziYOXtZyE=",
            "COMMRSTAR_ORIGINAL": "8jMkGqojJGLzR2rY1vcKdOXq3Law2GB/rPOmWDKJAVI=",
            "COMMD_LATEST": "6IoOWd8FhcxADcSKMwBhp69MVZz3B/fz1EHycAy24zQ=",
            "COMMR_LATEST": "GcN7sAtefbg2fWMWuuMAy7YIl88GFUNgi4ziYOXtZyE=",
            "COMMRSTAR_LATEST": "8jMkGqojJGLzR2rY1vcKdOXq3Law2GB/rPOmWDKJAVI=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmeyQv7xZRsZfGco697Aav4isBf5n45bBXwC2N1dg21aw9",
            "NAME": "index.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 14:05:29",
            "COMMD_ORIGINAL": "6IoOWd8FhcxADcSKMwBhp69MVZz3B/fz1EHycAy24zQ=",
            "COMMR_ORIGINAL": "GcN7sAtefbg2fWMWuuMAy7YIl88GFUNgi4ziYOXtZyE=",
            "COMMRSTAR_ORIGINAL": "8jMkGqojJGLzR2rY1vcKdOXq3Law2GB/rPOmWDKJAVI=",
            "COMMD_LATEST": "6IoOWd8FhcxADcSKMwBhp69MVZz3B/fz1EHycAy24zQ=",
            "COMMR_LATEST": "GcN7sAtefbg2fWMWuuMAy7YIl88GFUNgi4ziYOXtZyE=",
            "COMMRSTAR_LATEST": "8jMkGqojJGLzR2rY1vcKdOXq3Law2GB/rPOmWDKJAVI=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmeyQv7xZRsZfGco697Aav4isBf5n45bBXwC2N1dg21aw9",
            "NAME": "index.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 14:06:00",
            "COMMD_ORIGINAL": "PJ2qsuD6X9Jc73HAuZqVOYW89pdV7UcXLpasUfHPX18=",
            "COMMR_ORIGINAL": "bDQivP3siFr6hA7vQ5JkPw9fDqcn3tROivaC+bKFZCA=",
            "COMMRSTAR_ORIGINAL": "uGi3cFN4HN+7FJDXnIHYe6nf8Z2lCiy7PXsReumDHWU=",
            "COMMD_LATEST": "PJ2qsuD6X9Jc73HAuZqVOYW89pdV7UcXLpasUfHPX18=",
            "COMMR_LATEST": "bDQivP3siFr6hA7vQ5JkPw9fDqcn3tROivaC+bKFZCA=",
            "COMMRSTAR_LATEST": "uGi3cFN4HN+7FJDXnIHYe6nf8Z2lCiy7PXsReumDHWU=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmPaTP29vGpZ9aVQfcSqKZ31iX4jXWoEqHCTFE4DfPhcQz",
            "NAME": "index.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 16:51:23",
            "COMMD_ORIGINAL": "dE1BgMxK4alxjAl/UUK/hL5WWZ0zxaRvilRV2n9cwmw=",
            "COMMR_ORIGINAL": "dgz3Z+1ha+w6w101y2s1qvlUoUaKXHAP+nzmFEs5ES4=",
            "COMMRSTAR_ORIGINAL": "5DSRF/FbgEB9dWquBXM8R1Rg3qIubxFOq70fQThhyWw=",
            "COMMD_LATEST": "dE1BgMxK4alxjAl/UUK/hL5WWZ0zxaRvilRV2n9cwmw=",
            "COMMR_LATEST": "dgz3Z+1ha+w6w101y2s1qvlUoUaKXHAP+nzmFEs5ES4=",
            "COMMRSTAR_LATEST": "5DSRF/FbgEB9dWquBXM8R1Rg3qIubxFOq70fQThhyWw=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmPaTP29vGpZ9aVQfcSqKZ31iX4jXWoEqHCTFE4DfPhcQz",
            "NAME": "index.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-01-28 16:51:54",
            "COMMD_ORIGINAL": "dE1BgMxK4alxjAl/UUK/hL5WWZ0zxaRvilRV2n9cwmw=",
            "COMMR_ORIGINAL": "dgz3Z+1ha+w6w101y2s1qvlUoUaKXHAP+nzmFEs5ES4=",
            "COMMRSTAR_ORIGINAL": "5DSRF/FbgEB9dWquBXM8R1Rg3qIubxFOq70fQThhyWw=",
            "COMMD_LATEST": "dE1BgMxK4alxjAl/UUK/hL5WWZ0zxaRvilRV2n9cwmw=",
            "COMMR_LATEST": "dgz3Z+1ha+w6w101y2s1qvlUoUaKXHAP+nzmFEs5ES4=",
            "COMMRSTAR_LATEST": "5DSRF/FbgEB9dWquBXM8R1Rg3qIubxFOq70fQThhyWw=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmPhP5xcy7fZ8SdaYg1a5FRznEZ2Hc1YLSZC3a29R3hVUh",
            "NAME": "deals.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-04 17:20:25",
            "COMMD_ORIGINAL": "Pi5npRq3MeCTvmVvxJ522YuSUH2RWjPuTDxnipfOx2U=",
            "COMMR_ORIGINAL": "kMMZUkYqQqYllCqRZlIgRiJdgHyND96MQEevWmoTDFI=",
            "COMMRSTAR_ORIGINAL": "blbjOPzOPr/lZY3IWUt2AiQpgOSulJ/iQ+n6Br0t70Q=",
            "COMMD_LATEST": "Pi5npRq3MeCTvmVvxJ522YuSUH2RWjPuTDxnipfOx2U=",
            "COMMR_LATEST": "kMMZUkYqQqYllCqRZlIgRiJdgHyND96MQEevWmoTDFI=",
            "COMMRSTAR_LATEST": "blbjOPzOPr/lZY3IWUt2AiQpgOSulJ/iQ+n6Br0t70Q=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmTsb11JbTLnLb8WNgBZ5tzq6MMq8ncgmkEr4R9DxUiwLp",
            "NAME": "paths.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-04 17:31:47",
            "COMMD_ORIGINAL": "y7Z6jIq8X6KMka7wUtNp7GEIQPF9W6VpVz7mVWkf5kI=",
            "COMMR_ORIGINAL": "+IrecMu224/bAAG0sxRCCvMKx3FyB7xn6uY55z2iCDc=",
            "COMMRSTAR_ORIGINAL": "+V/PnzZu+SlkYUymNj2Po55Wm0AH0vKy36AAeacExwQ=",
            "COMMD_LATEST": "y7Z6jIq8X6KMka7wUtNp7GEIQPF9W6VpVz7mVWkf5kI=",
            "COMMR_LATEST": "+IrecMu224/bAAG0sxRCCvMKx3FyB7xn6uY55z2iCDc=",
            "COMMRSTAR_LATEST": "+V/PnzZu+SlkYUymNj2Po55Wm0AH0vKy36AAeacExwQ=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmTsb11JbTLnLb8WNgBZ5tzq6MMq8ncgmkEr4R9DxUiwLp",
            "NAME": "paths.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-04 17:32:18",
            "COMMD_ORIGINAL": "y7Z6jIq8X6KMka7wUtNp7GEIQPF9W6VpVz7mVWkf5kI=",
            "COMMR_ORIGINAL": "+IrecMu224/bAAG0sxRCCvMKx3FyB7xn6uY55z2iCDc=",
            "COMMRSTAR_ORIGINAL": "+V/PnzZu+SlkYUymNj2Po55Wm0AH0vKy36AAeacExwQ=",
            "COMMD_LATEST": "y7Z6jIq8X6KMka7wUtNp7GEIQPF9W6VpVz7mVWkf5kI=",
            "COMMR_LATEST": "+IrecMu224/bAAG0sxRCCvMKx3FyB7xn6uY55z2iCDc=",
            "COMMRSTAR_LATEST": "+V/PnzZu+SlkYUymNj2Po55Wm0AH0vKy36AAeacExwQ=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmXHrsHXX1djZSd6uDBgcMRk7c6bvGf1FxiZUPfERS8d5G",
            "NAME": "utils.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-06 15:12:09",
            "COMMD_ORIGINAL": "G0GoOABUZVwdqmBayQg6Xz7rv+FiqrHI1SSgkRlCmwA=",
            "COMMR_ORIGINAL": "25OR1jiHSZ5v2kEFtpkWiFn/MVql/Jf0z2lkmsluLgY=",
            "COMMRSTAR_ORIGINAL": "Y4qnVNB4Mlz7rwVU/UTKPTRK45aAswQ9MGqYMkYYMiI=",
            "COMMD_LATEST": "G0GoOABUZVwdqmBayQg6Xz7rv+FiqrHI1SSgkRlCmwA=",
            "COMMR_LATEST": "25OR1jiHSZ5v2kEFtpkWiFn/MVql/Jf0z2lkmsluLgY=",
            "COMMRSTAR_LATEST": "Y4qnVNB4Mlz7rwVU/UTKPTRK45aAswQ9MGqYMkYYMiI=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmSgLUbxUqAPFpdKva4xVd2ExsjCRkYkPdgpqnoC2Sqovv",
            "NAME": "error-handler.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-06 15:12:09",
            "COMMD_ORIGINAL": "G0GoOABUZVwdqmBayQg6Xz7rv+FiqrHI1SSgkRlCmwA=",
            "COMMR_ORIGINAL": "25OR1jiHSZ5v2kEFtpkWiFn/MVql/Jf0z2lkmsluLgY=",
            "COMMRSTAR_ORIGINAL": "Y4qnVNB4Mlz7rwVU/UTKPTRK45aAswQ9MGqYMkYYMiI=",
            "COMMD_LATEST": "G0GoOABUZVwdqmBayQg6Xz7rv+FiqrHI1SSgkRlCmwA=",
            "COMMR_LATEST": "25OR1jiHSZ5v2kEFtpkWiFn/MVql/Jf0z2lkmsluLgY=",
            "COMMRSTAR_LATEST": "Y4qnVNB4Mlz7rwVU/UTKPTRK45aAswQ9MGqYMkYYMiI=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmXx4TKA1j6GwW9pnt5hES7bbFzZHM5hxXTCXyDgkqWaNj",
            "NAME": "strategies.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-06 15:12:09",
            "COMMD_ORIGINAL": "G0GoOABUZVwdqmBayQg6Xz7rv+FiqrHI1SSgkRlCmwA=",
            "COMMR_ORIGINAL": "25OR1jiHSZ5v2kEFtpkWiFn/MVql/Jf0z2lkmsluLgY=",
            "COMMRSTAR_ORIGINAL": "Y4qnVNB4Mlz7rwVU/UTKPTRK45aAswQ9MGqYMkYYMiI=",
            "COMMD_LATEST": "G0GoOABUZVwdqmBayQg6Xz7rv+FiqrHI1SSgkRlCmwA=",
            "COMMR_LATEST": "25OR1jiHSZ5v2kEFtpkWiFn/MVql/Jf0z2lkmsluLgY=",
            "COMMRSTAR_LATEST": "Y4qnVNB4Mlz7rwVU/UTKPTRK45aAswQ9MGqYMkYYMiI=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmRm2hjhQNPnc176mHq8Q9jLsy55pnGqX4Cn4xH92sRDSi",
            "NAME": "default.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-06 15:25:36",
            "COMMD_ORIGINAL": "Bizms3WNM0tIx7JmmlfSJfdAUjDadzm621o06CVjvmI=",
            "COMMR_ORIGINAL": "Lwu18XiQsqq+iXjsLfoaqbnOhFB9llYHUIWzLR/w32k=",
            "COMMRSTAR_ORIGINAL": "yIkPfHWA5L3BCYxJB4pB4blivzo0ralNNabZm4Y/gVU=",
            "COMMD_LATEST": "Bizms3WNM0tIx7JmmlfSJfdAUjDadzm621o06CVjvmI=",
            "COMMR_LATEST": "Lwu18XiQsqq+iXjsLfoaqbnOhFB9llYHUIWzLR/w32k=",
            "COMMRSTAR_LATEST": "yIkPfHWA5L3BCYxJB4pB4blivzo0ralNNabZm4Y/gVU=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmRm2hjhQNPnc176mHq8Q9jLsy55pnGqX4Cn4xH92sRDSi",
            "NAME": "default.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-06 15:26:07",
            "COMMD_ORIGINAL": "Bizms3WNM0tIx7JmmlfSJfdAUjDadzm621o06CVjvmI=",
            "COMMR_ORIGINAL": "Lwu18XiQsqq+iXjsLfoaqbnOhFB9llYHUIWzLR/w32k=",
            "COMMRSTAR_ORIGINAL": "yIkPfHWA5L3BCYxJB4pB4blivzo0ralNNabZm4Y/gVU=",
            "COMMD_LATEST": "Bizms3WNM0tIx7JmmlfSJfdAUjDadzm621o06CVjvmI=",
            "COMMR_LATEST": "Lwu18XiQsqq+iXjsLfoaqbnOhFB9llYHUIWzLR/w32k=",
            "COMMRSTAR_LATEST": "yIkPfHWA5L3BCYxJB4pB4blivzo0ralNNabZm4Y/gVU=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmWLYyVyCMXtN3AHSaZvFchhcoKdV1xMPJpcind8ZSjmjM",
            "NAME": "authenticated.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-06 15:25:36",
            "COMMD_ORIGINAL": "Bizms3WNM0tIx7JmmlfSJfdAUjDadzm621o06CVjvmI=",
            "COMMR_ORIGINAL": "Lwu18XiQsqq+iXjsLfoaqbnOhFB9llYHUIWzLR/w32k=",
            "COMMRSTAR_ORIGINAL": "yIkPfHWA5L3BCYxJB4pB4blivzo0ralNNabZm4Y/gVU=",
            "COMMD_LATEST": "Bizms3WNM0tIx7JmmlfSJfdAUjDadzm621o06CVjvmI=",
            "COMMR_LATEST": "Lwu18XiQsqq+iXjsLfoaqbnOhFB9llYHUIWzLR/w32k=",
            "COMMRSTAR_LATEST": "yIkPfHWA5L3BCYxJB4pB4blivzo0ralNNabZm4Y/gVU=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        },
        {
            "CID": "QmWLYyVyCMXtN3AHSaZvFchhcoKdV1xMPJpcind8ZSjmjM",
            "NAME": "authenticated.js",
            "MINER_ID": "t2q3dh6boy444s7op7byt6rflczyxtydp5upydqka",
            "DEAL_DATE": "2020-02-06 15:26:07",
            "COMMD_ORIGINAL": "Bizms3WNM0tIx7JmmlfSJfdAUjDadzm621o06CVjvmI=",
            "COMMR_ORIGINAL": "Lwu18XiQsqq+iXjsLfoaqbnOhFB9llYHUIWzLR/w32k=",
            "COMMRSTAR_ORIGINAL": "yIkPfHWA5L3BCYxJB4pB4blivzo0ralNNabZm4Y/gVU=",
            "COMMD_LATEST": "Bizms3WNM0tIx7JmmlfSJfdAUjDadzm621o06CVjvmI=",
            "COMMR_LATEST": "Lwu18XiQsqq+iXjsLfoaqbnOhFB9llYHUIWzLR/w32k=",
            "COMMRSTAR_LATEST": "yIkPfHWA5L3BCYxJB4pB4blivzo0ralNNabZm4Y/gVU=",
            "DATE_LAST_CHECK": "2020-02-06 16:16:13",
            "VERIFY_RESULT": "pass"
        }
    ]
}
```
