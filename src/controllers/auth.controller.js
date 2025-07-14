import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-Error.js";
import { ApiResponse } from "../utils/api-Response.js";
import { User } from "../models/auth.model.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";

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

  await user.save();
  const verificationUrl = `${process.env.BASE_URL}/api/v1/users/verify/${unHashedToken}`;
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

export { registerUser };
