const sendResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: statusCode < 400 ? true : false,
        message,
        data
    })
};

module.exports = sendResponse;