import { body } from "express-validator";

const createNotesValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("content").trim().notEmpty().withMessage("Content is required"),
  ];
};

export { createNotesValidator };
