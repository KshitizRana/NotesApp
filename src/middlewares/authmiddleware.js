import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const { AccessToken } = req.cookies;

  if (!AccessToken) {
    throw new ApiError(400, "Accress Token not found");
  }

  const decodeToken = jwt.verify(AccessToken, process.env.ACCESS_TOKEN_SECRET);
  if (!decodeToken) throw new ApiError(400, "Unable to decode token");

  req.userId = decodeToken._id;

  next();
});

const refreshAccessTokenMiddleware = asyncHandler(async (req, res, next) => {
  const { RefreshToken } = req.cookies;
  console.log(RefreshToken);
  if (!RefreshToken) {
    throw new ApiError(400, "Refresh Token not found");
  }
  const decodeToken = jwt.verify(
    RefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  if (!decodeToken) throw new ApiError(400, "Unable to decode token");

  req.id = decodeToken._id;

  next();
});

export { authMiddleware, refreshAccessTokenMiddleware };
