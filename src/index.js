// require("dotenv").config({ path: "./env" });
import connectDB from "./db/db_connect.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./env",
}); // if using this theen use -r dotenv/config --experimental-json-modules
connectDB();
