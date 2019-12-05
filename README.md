# viziot-server-2
ViZIot server version 2

A new server to serve for tcpdata monitor by IoT router

This project is modified based on Chenxi’s viziot-server-2(https://github.com/VizIoT/viziot-server-2)


## Set Up Guide
Copy `.env.example` to `.env`, and put the MongoDB connection string to here.
```
MONGO_URI=<MONGO_URI>
```
Run command `yarn install` to install dependencies.
put the frontend built `dist/` folder into the root directory of the project.

To run the server:
```bash
./node_modules/.bin/forever -m 5 ./index.js
```
## Structures
- The [tcpData](./src/api/tcpData) directory contains most of the network data.
- The file [tcpData.da.js](./src/api/tcpData/tcpData.da.js) defines all the mongo queries to query data.
- The server use [socket.io](https://github.com/socketio/socket.io) to communicate with the client side.
The file [socketio.js](./src/socketio.js) defines all the messageEmitters.

