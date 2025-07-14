import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-Error.js";
import { ApiResponse } from "../utils/api-Response.js";
import { Notes } from "../models/notes.models.js";

const createNotes = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const note = await Notes.create({
    userId: req.userId,
    title,
    content,
  });
  if (!note) throw new ApiError(401, "Note not created in Database");

  res.status(200).json(new ApiResponse(200, note, "Note Created SuccessFully"));
});

const getNotes = asyncHandler(async (req, res) => {
  const userId = req.userId;
    
  const userNotes = await Notes.find({
    userId: req.userId,
  });
  if (!userNotes) throw new ApiError(401, "No User notes found");

  res
    .status(200)
    .json(
      new ApiResponse(200, userNotes, "Notes fetched for user SuccessFully")
    );
});

export { createNotes, getNotes };
