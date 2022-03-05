const database = require('../database/knex');

const createUser = async payload => {
  return database('users').insert(payload);
};

const getSingleUser = () => {};

const getSingleUserWithPassword = (property, value) => {
  return database('users')
    .column(['user_id', 'username', 'password', 'role'])
    .where(property, value);
};

const getAllUsers = () => {};

const updateUser = () => {};

const deleteUser = () => {};

module.exports = {
  createUser,
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUserWithPassword
};
