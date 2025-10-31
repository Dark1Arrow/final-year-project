// import ConnectDB from "./db/index.js";
// import dotenv from "dotenv"
// import {app} from "./app.js";

// dotenv.config();

// ConnectDB()
// .then(() => {
//     app.listen(process.env.PORT || 3000 , ()=>{
//         console.log(`Server is running at port number : ${process.env.PORT}`)
//     })
// })
// .catch((err)=>{
//     console.log(`MongoDB connection failed !!!! : ${err}`)
// })

// api/index.js
import app from "../app.js";
import ConnectDB from "../db/index.js";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    await ConnectDB();
    isConnected = true;
    console.log("MongoDB Connected ✅");
  }

  return app(req, res);
}
