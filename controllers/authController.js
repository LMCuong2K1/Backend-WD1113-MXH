const authService = require('../services/authService');
const catchAsync = require('catch-async-wrapper-express');
const sendResponse = require('../utils/sendResponse');
class AuthController {
    register = catchAsync(async (req, res) => {
        const { name, email, password } = req.body;
        const { user, token } = await authService.registerUser({ name, email, password });
        sendResponse(res, 201, "Đăng ký thành công.", { _id: user._id, name: user.name, email: user.email, token });
    });
    login = catchAsync();

}

module.exports = new AuthController();