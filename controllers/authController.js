const authService = require('../services/authService');
const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/sendResponse');
class AuthController {
    register = catchAsync(async (req, res) => {
        const { name, email, password } = req.body;
        const { user, token } = await authService.registerUser({ name, email, password });
        sendResponse(res, 201, "Đăng ký thành công.", { _id: user._id, name: user.name, email: user.email, token });
    });
    login = catchAsync(async (req, res) => {
        const { email, password } = req.body;
        const { user, token } = await authService.loginUser({ email, password });
        sendResponse(res, 200, "Đăng nhập thành công",
            {
                user,
                token
            }
        )
    });
    myInfo = catchAsync(async (req, res) => {
        sendResponse(res, 200, "Thông tin người dùng: ", req.user);
    })

}

module.exports = new AuthController();