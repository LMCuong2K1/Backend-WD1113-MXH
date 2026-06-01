const express = require('express');
const router = express.Router();

const rateLimit = require('express-rate-limit');
const AuthController = require('../controllers/authController');
const { protect, admin } = require('../middlewares/authMiddleware');

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 15,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Bạn đã đăng nhập quá nhiều lần. Hãy thử lại sau 5 phút."
    }
});
router.post('/register', AuthController.register);
router.post('/login', loginLimiter, AuthController.login);


module.exports = router;

