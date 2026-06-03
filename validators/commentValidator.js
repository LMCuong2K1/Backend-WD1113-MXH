const Joi = require('joi');

const createCommentSchema = Joi.object({
    params:Joi.object({
        id:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
                  'string.pattern.base': 'Mã ID bài viết không hợp lệ hoặc sai cấu trúc.',
                  'any.required': 'Mã ID bài viết là bắt buộc.'
                }),
        postId:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
                        'string.pattern.base': 'Mã ID bài viết không hợp lệ hoặc sai cấu trúc.',
                        'any.required': 'Mã ID bài viết là bắt buộc.'
                      })
    }),
    body:Joi.object({
        content:Joi.string().required().messages({
            'any.required':'Nội dung là bắt buộc!'
        })
    })
})

const getCommentByPostSchema = Joi.object({
    params:Joi.object({
        postId:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
                        'string.pattern.base': 'Mã ID bài viết không hợp lệ hoặc sai cấu trúc.',
                        'any.required': 'Mã ID bài viết là bắt buộc.'
                      }),
    })
})
const deleteCommentSchema = Joi.object({
    params:Joi.object({
        id:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
                  'string.pattern.base': 'Mã ID bài viết không hợp lệ hoặc sai cấu trúc.',
                  'any.required': 'Mã ID bài viết là bắt buộc.'
                }),
    })
})