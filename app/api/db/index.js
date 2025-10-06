import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected !! DB Host: ${connectionInstance.connection.host} `)
    } catch (error) {
        console.error("MongoDB connectin error : ", error);
        process.exit(1);
    }
}

export default ConnectDB;