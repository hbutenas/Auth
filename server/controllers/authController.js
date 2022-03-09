const { StatusCodes } = require('http-status-codes');
const {
  registerService,
  loginService,
  verifyService,
  logoutService
} = require('../services/auth/authService');

const registerController = async (req, res) => {
  const response = await registerService(req.body);
  res.status(StatusCodes.CREATED).json({ response });
};

const loginController = async (req, res) => {
  const response = await loginService(req, res);
  res.status(StatusCodes.OK).json({ response });
};

const logoutController = async (req, res) => {
  const response = await logoutService(req, res);
  res.status(StatusCodes.OK).json({ response });
};

const verifyController = async (req, res) => {
  const response = await verifyService(req, res);
  res.status(StatusCodes.OK).json({ response });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  verifyController
};
