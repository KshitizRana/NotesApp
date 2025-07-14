import { Router } from "express";
import { validate } from "../middlewares/validator.middleware.js";
import { createNotesValidator } from "../validators/note.validator.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";
import { createNotes, getNotes } from "../controllers/notes.controller.js";

const router = Router();

router
  .route("/create-notes")
  .post(createNotesValidator(), authMiddleware, validate, createNotes);
router.route("/get-notes").get(authMiddleware, getNotes);

export default router;
