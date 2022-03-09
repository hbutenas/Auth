const { createUser, getSingleUserWithPassword } = require('../../daos/users');
const CustomError = require('../../errors');
const { hashPassword, validatePassword } = require('../../utils/bcryptUtils');
const {
  assignCookiesToResponse,
  deleteCookiesFromResponse
} = require('../../utils/jwtUtils');
const { usernameHelper } = require('./authUtils');
const { verifyToken } = require('../../utils/jwtUtils');

/* Receiving request body only */
const registerService = async requestBody => {
  const { username, email, password } = requestBody;

  const userPayload = {
    username: usernameHelper(username),
    email: email.toLowerCase(),
    password: await hashPassword(password)
  };

  const newUser = await createUser(userPayload);

  if (newUser.rowCount !== 1)
    throw new CustomError.InternalServer(
      'Something went wrong... Please try again later'
    );

  return { message: 'User successfully created' };
};

/* Receiving request and response objects */
const loginService = async (Request, Response) => {
  const { username, password } = Request.body;

  const existingUser = await getSingleUserWithPassword(
    'username',
    usernameHelper(username)
  );

  if (existingUser.length <= 0) {
    throw new CustomError.BadRequest('Invalid username or password');
  }

  const isPasswordMatching = await validatePassword(
    password,
    existingUser[0].password
  );

  if (!isPasswordMatching) {
    throw new CustomError.BadRequest('Invalid username or password');
  }

  const jwtPayload = {
    user_id: existingUser[0].user_id,
    username: existingUser[0].username,
    role: existingUser[0].role
  };

  const accessToken = await assignCookiesToResponse(jwtPayload, Response);
  return { message: `Welcome back, ${existingUser[0].username}`, accessToken };
};

/* Receiving request and response objects */
const verifyService = async (Request, Response) => {
  const { refresh_token, access_token } = Request.cookies;
  if (access_token) {
    const user = await verifyToken(access_token, process.env.ACCESS_TOKEN);

    if (!user) {
      throw new CustomError.BadRequest('Authentication invalid');
    }

    return user;
  }

  if (refresh_token && !access_token) {
    const user = await verifyToken(refresh_token, process.env.REFRESH_TOKEN);

    if (!user) {
      throw new CustomError.BadRequest('Authentication invalid');
    }

    const userPayload = {
      user_id: user.user_id,
      username: user.username,
      role: user.role
    };

    await assignCookiesToResponse(userPayload, Response);

    return user;
  }
};

/* Receiving request and response objects */
const logoutService = async (Request, Response) => {
  const deletedCookies = await deleteCookiesFromResponse(Response);
  console.log(deletedCookies);
};

module.exports = {
  registerService,
  loginService,
  verifyService,
  logoutService
};
