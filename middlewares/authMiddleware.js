const jwt = require("jsonwebtoken");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Post = require("../models/Post");
class AuthMiddleware {
  protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
      if (req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      } else {
        token = req.headers.authorization;
      }
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decode.id);
      if (!user) throw new AppError("User không tồn tại!", 401);
      req.user = user;
      next();
    } else throw new AppError("Chưa đăng nhập/Thiếu token!", 401);
  });

  admin = catchAsync((req, res, next) => {
    if (req.user && req.user.role === "Admin") next();
    else throw new AppError("Bạn không phải Admin", 403);
  });
}

module.exports = new AuthMiddleware();
