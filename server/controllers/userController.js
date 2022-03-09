const { StatusCodes } = require('http-status-codes');
const {
  getAllUsersService,
  getSingleUserService
} = require('../services/users/userService');

const getAllUsersController = async (req, res) => {
  const response = await getAllUsersService();
  res.status(StatusCodes.OK).json({ response });
};

const getSingleUserController = async (req, res) => {
  const response = await getSingleUserService(req.params);
  res.status(StatusCodes.OK).json({ response });
};

module.exports = { getAllUsersController, getSingleUserController };
