const jwt = require('jsonwebtoken');
const createJWTTokens = async payload => {
  const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: '1m'
  });
  const refreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: '14d'
  });
  return { accessToken, refreshToken };
};

const verifyToken = async (token, tokenSecret) => {
  return jwt.verify(token, tokenSecret);
};

const assignCookiesToResponse = async (payload, Response) => {
  const { accessToken, refreshToken } = await createJWTTokens(payload);
  const fifteenMin = 1000 * 60 * 15;
  const oneHour = 1000 * 60 * 60;

  Response.cookie('access_token', accessToken, {
    // signed: true,
    httpOnly: true,
    // maxAge: process.env.ENV === "production" ? fifteenMin : oneHour
    maxAge: 1000 * 60
  });

  const fourteenDays = 1000 * 60 * 60 * 24 * 14;

  Response.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    maxAge: fourteenDays
  });
  return accessToken;
};

const deleteCookiesFromResponse = async Response => {
  Response.clearCookie('access_token');
  Response.clearCookie('refresh_token');

  return { message: 'User successfully logged out.' };
};

module.exports = {
  assignCookiesToResponse,
  verifyToken,
  deleteCookiesFromResponse
};
