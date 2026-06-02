const express = require('express');
const router = express.Router();

const rateLimit = require('express-rate-limit');
const AuthController = require('../controllers/authController');
const { protect, admin } = require('../middlewares/authMiddleware');
const { loginSchema, registerSchema } = require('../validators/authValidator');
const validate = require('../middlewares/validate.js');

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
router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', loginLimiter, validate(loginSchema), AuthController.login);
router.get('/me', protect, AuthController.myInfo);


module.exports = router;

