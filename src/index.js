// require("dotenv").config({ path: "./env" });
import { app } from "./app.js";
import connectDB from "./db/db_connect.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env",
}); // if using this then use -r dotenv/config --experimental-json-modules

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running at Port : ${port}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB connection failed !!`);
  });
