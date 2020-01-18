const express = require('express');
const cors = require('cors');
const http = require('http');

const db = require('./db');
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

db.connect();

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);