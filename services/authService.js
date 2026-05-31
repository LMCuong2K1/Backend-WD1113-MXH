const catchAsync = require('catch-async-wrapper-express');
const User = require('../models/User');
const jwt = require('../utils/jwt');
class AuthService {
    registerUser = catchAsync(async (userInfo) => {
        const existingUser = await User.findOne({ email: userInfo.email });
        if (existingUser) throw new AppError("Người dùng đã tồn tại!", 409);

        const user = await User.create(userInfo);
        const token = jwt.generateToken(user._id);
        return { user, token };
    });
    loginUser = catchAsync(async(userInfo)=>{
        const {email,password} = userInfo;
        existingUser = await User.findOne({email:email}).select("+password");
        if(!existingUser)throw new AppError("Người dùng không tồn tại!",401);

        const matchPassword = await user.matchPassword(password);
        if(!matchPassword)throw new AppError("Email hoặc mật khẩu không đúng!",401);
        
        const token = jwt.generateToken(user._id);
        return {user,token};
    })
}

module.exports = new AuthService();