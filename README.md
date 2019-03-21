# viziot-server-2
ViZIot server version 2

A new server to serve for tcpdata monitor by IoT router

Server Address: https://viziot-server-2.herokuapp.com

## Set Up Guide
Copy `.env.example` to `.env`, and put the MongoDB connection string to here.
```
MONGO_URI=<MONGO_URI>
```
Run command `yarn install` to install dependencies.

To run the server:
```bash
./node_modules/.bin/forever -m 5 ./index.js
```
