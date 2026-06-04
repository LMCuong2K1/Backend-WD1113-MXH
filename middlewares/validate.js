const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync")

const validate = (schema) => {
    return catchAsync(async (req, res, next) => {
        const { error, value } = schema.validate({ body: req.body, params: req.params, query: req.query }, {
            abortEarly: false, stripUnknown: true
        });
        if (error) throw new AppError(error.message, 400);
        if (value.body) req.body = value.body;
        if (value.params) req.params = value.params;
        if (value.query) req.query = value.query;
        next();
    })
}

module.exports = validate;