const express = require('express');
const router = express.Router();
const {
  getAllUsersController,
  getSingleUserController
} = require('../controllers/userController');
const {
  authenticateUser,
  authenticatePermissions
} = require('../middlewares/auth/authMiddleware');

router
  .route('/')
  .get(
    [authenticateUser, authenticatePermissions('Owner')],
    getAllUsersController
  );

router
  .route('/:id')
  .get(
    [authenticateUser, authenticatePermissions('Owner')],
    getSingleUserController
  );

module.exports = router;
