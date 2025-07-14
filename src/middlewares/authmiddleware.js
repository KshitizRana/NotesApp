import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-Error.js";
import { asyncHandler } from "../utils/async-Handler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const { AccessToken } = req.cookies;

  if (!AccessToken) {
    throw new ApiError(400, "Access Token not found");
  }

  const decodeToken = jwt.verify(AccessToken, process.env.ACCESS_TOKEN_SECRET);
  if (!decodeToken) throw new ApiError(400, "Unable to decode AccessTokentoken");

  req.userId = decodeToken._id;

  next();
});

export { authMiddleware };
