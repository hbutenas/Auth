const { getAllUsers, getSingleUserByProp } = require('../../daos/users');

const getAllUsersService = async () => {
  const users = await getAllUsers();

  if (users.length <= 0) {
    return { message: 'There are no users at the moment' };
  }

  return users;
};

// receiving req.params property
const getSingleUserService = async params => {
  const { id } = params;

  const user = await getSingleUserByProp('user_id', id);

  if (user.length <= 0) {
    return { message: `User with id ${id} does not exists` };
  }

  return user;
};
module.exports = { getAllUsersService, getSingleUserService };
