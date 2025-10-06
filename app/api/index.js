import ConnectDB from "./db/index.js";
import dotenv from "dotenv"
import {app} from "./app.js";

dotenv.config();

ConnectDB()
.then(() => {
    app.listen(process.env.PORT || 3000 , ()=>{
        console.log(`Server is running at port number : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(`MongoDB connection failed !!!! : ${err}`)
})