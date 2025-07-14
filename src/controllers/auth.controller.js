import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-Error.js";
import { ApiResponse } from "../utils/api-Response.js";
import { User } from "../models/auth.model.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";
import crypto from "crypto";

const registerUser = asyncHandler(async (req, res) => {
  const { email, fullname, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(401, "User Already Exists");

  const user = await User.create({
    email,
    password,
    fullname,
  });
  if (!user) throw new ApiError(401, "User Not created in Database");

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save();
  const verificationUrl = `${process.env.BASE_URL}/api/v1/auth/verify/${unHashedToken}`;
  const mailgenContent = emailVerificationMailgenContent(
    fullname,
    verificationUrl
  );
  const options = {
    email: user.email,
    subject: "verify your email",
    mailgenContent: mailgenContent,
  };

  await sendEmail(options);

  const createdUser = await User.findOne(user._id).select(
    "-password -emailVerificationToken -emailVerificationExpiry -refreshToken -forgotPasswordToken -forgotPasswordExpiry"
  );
  if (!createdUser) throw new ApiError(500, "Internal Server Error.");

  res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log(hashedToken);
  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: { $gt: Date.now() },
  });
  console.log(user);
  if (!user) throw new ApiError(401, "Invalid Token");

  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpiry = null;

  await user.save({ validateBeforeSave: false });

  res.status(200).json(new ApiResponse(200, "User Verified Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Credentials");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  if (!accessToken || !refreshToken) {
    throw new ApiError(500, "AccessToken and RefreshToken not created");
  }

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("AccessToken", accessToken, cookieOptions);
  res.cookie("RefreshToken", refreshToken, cookieOptions);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationExpiry -emailVerificationToken"
  );
  if (!loggedInUser) {
    throw new ApiError(500, "Internal Server Error");
  }

  res
    .status(200)
    .json(new ApiResponse(200, loggedInUser, "User Logged in Successfully"));
});
export { registerUser, verifyEmail, loginUser };
