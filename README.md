# Starling API

## Install and Run

- Navigate to the project directory

```js
> yarn install
```

- Create a `.env` file in the project root directory with the following variables

```bash
LOTUS_URL=ws://<ip address of Filecoin node>/rpc/v0
LOTUS_AUTH_TOKEN=<Lotus RPC API authorization token with admin permissions>
COPY_NUMBER=3
ENCRYPTION_KEY=<encryption key>
PRICE=5000000000
COPY_NUMBER=3
PORT=XXXX
LOGS_ERROR_BASE_PATH='./logs/'
LOGS_ERROR_FILE_NAME='error.log'
LOGS_COMBINED_BASE_PATH='./logs/'
LOGS_ERROR_COMBINED_FILE_NAME='combined.log'
READINESS_FAILURE_THRESHOLD='2'
READINESS_PERIOD='5'
SHUTDOWN_TIMEOUT_SECONDS='15'
```

Note: Leave `ENCRYPTION_KEY` empty if you want to opt out for encryption.

- Execute the following to run the API and expose the routes

```js
> yarn start

---
*info: Starling api listening on port: XXXX* should be displayed
```

## Development

Navigate to the project directory

```js
> yarn install
```

To ensure a friendly development environment, `nodemon` is used to enable a hot reload feature on save

```js
> yarn start:dev
```

## API

All the following routes require this header

```bash
Accept:application/vnd.starling+json; version=1.0
```

The routes will be exposed at: `http://localhost:3000`

- `/ping`
- `/api/store`
- `/api/monitor`
- `/api/list`
- `/api/verify`
- `/api/jobStatus/uuid`
- `/api/get/uuid`

### Routes

- Check if service is up and ready, you should get a pong in the body

```bash
GET http://localhost:3000/ping
```

- Store a file or folder

This will require a JSON object to be sent with the request body - supplying it with the full file/folder path.

```bash
{
    "dataPath":"/Users/xxxxxx/Desktop/xxxxx/xxxx/xx/test-file.jpg"
}
```

```bash
POST http://localhost:3000/api/store
```

- Get the list data

```bash
GET http://localhost:3000/api/list
```

- Get the verify data

```bash
GET http://localhost:3000/api/verify
```

- Get the Job Status data of a single job

```bash
GET http://localhost:3000/api/jobStatus/<uuid>
```

- Get a single file

```bash
GET http://localhost:3000/api/get/<uuid>
```
