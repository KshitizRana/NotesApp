import { Router } from "express";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/auth.validators.js";
import { validate } from "../middlewares/validator.middleware.js";
import {
  loginUser,
  registerUser,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/verify/:token").post(verifyEmail);
router.route("/login").post(userLoginValidator(), validate, loginUser);

export default router;
