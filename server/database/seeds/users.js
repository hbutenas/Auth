const { hashPassword } = require('../../utils/bcryptUtils');
exports.seed = async function (knex) {
  await knex('users').del();
  await knex('users').insert([
    {
      username: process.env.USERNAME,
      password: await hashPassword(process.env.PASSWORD),
      email: process.env.EMAIL,
      role: process.env.ROLE
    }
  ]);
};
