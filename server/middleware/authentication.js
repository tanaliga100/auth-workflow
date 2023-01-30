const CustomError = require("../errors");
const Token = require("../models/Token");
const { isTokenValid, attachCookiesToResponse } = require("../utils");

const authenticateUser = async (req, res, next) => {
  console.log("AUTHENTICATE_USER", req);
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    // access token
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }

    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });
    if (!existingToken || !existingToken?.isValid) {
      throw new CustomError.UnauthenticatedError("Authentication Invalid");
    }
    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: payload.refreshToken,
    });
    req.user = payload.user;
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
