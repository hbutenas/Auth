const database = require('../database/knex');

const createUser = async payload => {
  return database('users').insert(payload);
};

const getSingleUserByProp = (property, value) => {
  return database('users').where(property, value);
};

const getSingleUserWithPassword = (property, value) => {
  return database('users')
    .column(['user_id', 'username', 'password', 'role'])
    .where(property, value);
};

const getAllUsers = () => {
  return database
    .column(['user_id', 'username', 'role'])
    .select()
    .from('users');
};

const updateUser = () => {};

const deleteUser = () => {};

module.exports = {
  createUser,
  getSingleUserByProp,
  getAllUsers,
  updateUser,
  deleteUser,
  getSingleUserWithPassword
};
