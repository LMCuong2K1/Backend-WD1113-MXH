const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const catchAsync = require('catch-async-wrapper-express');

dotenv.config();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3000, catchAsync(async () => {
    await db.main();
    console.log('Server Backend is bla bla bla...');
}));