const express = require('express');
const cors = require('cors');

const db = require('./db');
const routes = require('./routes');

const app = express();

db.connect();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);