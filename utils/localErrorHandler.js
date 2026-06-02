const NODE_ENV = process.env.NODE_ENV;

const localErrorHandler = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || 'Lỗi server!';
    if (error.name === 'CastError') { message = `ID không hợp lệ:${error.value} cho trường ${error.path}`; statusCode = 400 }
    else if (error.name === 'ValidationError') { message = Object.values(error.errors).map(e => e.message).join(','); statusCode = 400 }
    else if (error.code === 11000) { message = `${Object.keys(error.keyValue)} đã tồn tại!`; statusCode = 400 };
    return res.status(statusCode).json({
        success: false,
        error: NODE_ENV === 'development' ? error.stack : 'Error',
        message: message
    })
};

module.exports = localErrorHandler;