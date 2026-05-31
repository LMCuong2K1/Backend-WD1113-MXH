const localErrorHandler = require('./utils/localErrorHandler');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.json());

const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
app.use(cors({
    origin: clientUrl,
    credentials: true
}));


app.use(localErrorHandler);
module.exports = app;