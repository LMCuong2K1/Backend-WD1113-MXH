const User = require('../models/User');
const jwt = require('../utils/jwt');
const AppError = require('../utils/AppError');
class AuthService {
    registerUser = async (userInfo) => {
        const existingUser = await User.findOne({ email: userInfo.email });
        if (existingUser) throw new AppError("Người dùng đã tồn tại!", 409);

        const user = await User.create(userInfo);
        const token = jwt.generateToken(user._id);
        return { user, token };
    };
    loginUser = async (userInfo) => {
        const { email, password } = userInfo;
        const user = await User.findOne({ email: email }).select("+password");
        if (!user) throw new AppError("Người dùng không tồn tại!", 401);

        const matchPassword = await user.matchPassword(password);
        if (!matchPassword) throw new AppError("Email hoặc mật khẩu không đúng!", 401);

        const token = jwt.generateToken(user._id);
        return { user, token };
    }
}

module.exports = new AuthService();