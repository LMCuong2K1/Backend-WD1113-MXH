const Joi = require('joi');


const CATEGORIES = ['Technology', 'Lifestyle', 'Education', 'Entertainment', 'Sports', 'Travel', 'Food', 'News', 'Other'];
const createPostSchema = Joi.object({
    title:Joi.string().trim().required().messages({
        'any.required':'Tiêu đề là bắt buộc!'
    }),
content:Joi.string().trim().required().messages({
    'any.required':'Nội dung là bắt buộc!'
}),
category:Joi.string().valid(...CATEGORIES).messages({
    'any.only':'{#label} không hợp lệ!Category cần thuộc {#values}!'
}),
});


const getPostByIdSchema = Joi.object({
    params:Joi.object({
        id:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
                  'string.pattern.base': 'Mã ID bài viết không hợp lệ hoặc sai cấu trúc.',
                  'any.required': 'Mã ID bài viết là bắt buộc.'
                })
    })
})

const getAllPostSchema = Joi.object({

})

const updatePostSchema = Joi.object({
    params:Joi.object({
        id:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.pattern.base': 'Mã ID bài viết không hợp lệ hoặc sai cấu trúc.',
        'any.required': 'Mã ID bài viết là bắt buộc.'
      })
    }),
    body:Joi.object({
         title:Joi.string().trim(),
content:Joi.string().trim(),
category:Joi.string().valid(...CATEGORIES),
image:Joi.string().allow('').messages({
      'string.base': 'Đường dẫn hình ảnh phải là một chuỗi ký tự.'
    })
    })
})

const deletePostSchema= Joi.object({
    params:Joi.object({
        id:Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.pattern.base': 'Mã ID bài viết không hợp lệ hoặc sai cấu trúc.',
        'any.required': 'Mã ID bài viết là bắt buộc.'
      })
    })
});

module.exports = {createPostSchema,updatePostSchema,getPostByIdSchema,getAllPostSchema,deletePostSchema};
