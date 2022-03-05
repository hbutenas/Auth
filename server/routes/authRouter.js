const express = require('express');
const router = express.Router();
const {
  registerMiddleware,
  loginMiddleware,
  verifyMiddleware
} = require('../middlewares/auth/authMiddleware');

const {
  registerController,
  loginController,
  logoutController,
  verifyController
} = require('../controllers/authController');

router.post('/register', [registerMiddleware], registerController);
router.post('/login', [loginMiddleware], loginController);
router.post('/logout', logoutController);
router.post('/verify-user', [verifyMiddleware], verifyController);
module.exports = router;
