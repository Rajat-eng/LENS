import app from "./server";
import { connectDB } from "./utils/db";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;
const server = app.listen(port, async () => {
  await connectDB();
  // console.log(`[server]: Server is running at http://localhost:${port}`);
});
