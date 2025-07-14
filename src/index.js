import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  )
  .catch((err) => {
    console.log("MongoDB connection Error", err);
    process.exit(1);
  });
