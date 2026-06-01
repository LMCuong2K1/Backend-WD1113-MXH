const localErrorHandler = require('./utils/localErrorHandler');
const cors = require('cors');
const express = require('express');
const { default: rateLimit } = require('express-rate-limit');
const app = express();
const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    message: {
        success: false,
        message: "Hệ thống bận. Vui lòng thử lại sau!"
    },
    standardHeaders: true,
    legacyHeaders: false
})
app.use(express.json());

app.use(cors({
    origin: clientUrl,
    credentials: true
}));

app.use("/api", require('./routes/index'));

app.use(localErrorHandler);
module.exports = app;