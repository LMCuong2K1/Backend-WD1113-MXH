const express = require("express");
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const localErrorHandler = require("./utils/localErrorHandler");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(localErrorHandler);

const connectDB = () => {
    return db.main();
};

const startServer = async () => {
    await connectDB();
    app.listen(process.env.PORT || 3000, async () => {
        console.log('Server Backend is bla bla bla...');
    });
};

startServer().catch(err => {
    console.log(err);
    process.exit(1);
});