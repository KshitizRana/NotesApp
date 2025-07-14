import { Router } from "express";
import { userRegisterValidator } from "../validators/auth.validators.js";
import { validate } from "../middlewares/validator.middleware.js";
import { registerUser, verifyEmail } from "../controllers/auth.controller.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/verify/:token").post(verifyEmail);

export default router;
