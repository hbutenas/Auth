const validator = require('validator');
const CustomError = require('../../errors');

const registerMiddleware = async (req, res, next) => {
  const { username, email, password } = req.body;

  // missing one of the values
  if (!username || !email || !password) {
    throw new CustomError.BadRequest(
      'Missing one or more values for successful user registration'
    );
  }

  // clearing empty spaces the values are empty
  if (username.trim() === '' || email.trim() === '' || password.trim() === '') {
    throw new CustomError.BadRequest(
      'Missing one or more values for successful user registration'
    );
  }

  // invalid email address provided
  if (!validator.isEmail(email.trim())) {
    throw new CustomError.BadRequest(
      'Invalid email address provided. Please provide valid email address'
    );
  }

  const illegalChars = /[~`!#$%@\^&*+=\-\[\]\\';,/{}|\\":<>\?]/;

  // illegal characters are not allowed for username
  if (illegalChars.test(username)) {
    throw new CustomError.BadRequest('Symbols are not allowed for username');
  }

  next();
};

const loginMiddleware = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomError.BadRequest('Invalid username or password');
  }
  // error throws here
  if (username.trim() === '' || password.trim() === '') {
    throw new CustomError.BadRequest('Invalid username or password');
  }

  next();
};

const verifyMiddleware = async (req, res, next) => {
  const { refresh_token, access_token } = req.cookies;
  if (!refresh_token && !access_token) {
    throw new CustomError.Unauthenticated('Authentication invalid');
  }

  next();
};
module.exports = { registerMiddleware, loginMiddleware, verifyMiddleware };
