import { app } from "../app/api/app.js";
import ConnectDB from "../app/api/db/index.js";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await ConnectDB();
    isConnected = true;
    console.log("✅ MongoDB Connected");
  }

  // let Express handle the request
  return app(req, res);
}
