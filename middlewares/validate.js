const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync")

const validate = (schema) => {
    return catchAsync((req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false, stripUnknown: true
        });
        if (error) throw new AppError(error.message, 400);
        req.body = value;
        next();
    })
}

module.exports = validate;