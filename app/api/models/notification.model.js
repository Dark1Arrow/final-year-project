import mongoose, { Schema } from "mongoose";

const notificationScheam = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title:{
        type:String,
        required: true 
    },
    message:{
        type:String,
        required: true 
    },
    type:{
        type:String,
        enum:["booking","payment","review","system"],
        default:"system"
    },
    isRead:{
        type:Boolean,
        default: false,
    },
    metadata:{
        type:Object
    },
},{timestamps:true})

export const Notification = new mongoose.model("notification",notificationScheam)