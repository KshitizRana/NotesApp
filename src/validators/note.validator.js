import { body } from "express-validator";

const createNotes = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("content").trim().notEmpty().withMessage("Content is required")
  ];
};
