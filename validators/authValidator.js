const Joi = require('joi');

const registerSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().trim().min(6).max(128).required().messages({
            'string.min': 'Tên cần tối thiểu 6 ký tự',
            'string.max': 'Tên cần tối đa 128 ký tự',
            'any.required': 'Tên là bắt buộc'
        }),
        email: Joi.string().trim().lowercase().email().required().messages({
            'string.email': 'Email không hợp lệ',
            'any.required': 'Email là bắt buộc'
        }),
        password: Joi.string().min(6).max(128).required().messages({
            'string.min': 'Mật khẩu cần tối thiểu 6 ký tự',
            'string.max': 'Mật khẩu cần tối đa 128 ký tự',
            'any.required': 'Mật khẩu là bắt buộc'
        }),
        repeatPassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': 'Mật khẩu không trùng nhau!',
            'any.required': 'Nhập lại mật khẩu là bắt buộc'
        }).strip(),
    })
});
const loginSchema = Joi.object({
    body: Joi.object({
        email: Joi.string().trim().lowercase().email().required().messages({
            'string.email': 'Email không hợp lệ',
            'any.required': 'Email là bắt buộc',
        }),
        password: Joi.string().required().messages({
            'any.required': 'Mật khẩu là bắt buộc',
        })
    })
})

module.exports = { registerSchema, loginSchema };