const jwt = require('jsonwebtoken');
// TODO Cookies and token has to expire at the same time
const createJWTTokens = async payload => {
  const accessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN, {
    expiresIn: process.env.ENV === 'production' ? '1m' : '1h'
  });
  const refreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN, {
    expiresIn: process.env.ENV === 'production' ? '14d' : '30d'
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
  const oneMonth = 1000 * 60 * 60 * 24 * 30;

  Response.cookie('refresh_token', refreshToken, {
    httpOnly: true,
    maxAge: process.env.ENV === 'production' ? fourteenDays : oneMonth
  });
  return accessToken;
};

module.exports = { assignCookiesToResponse, verifyToken };
