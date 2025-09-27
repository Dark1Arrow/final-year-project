import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        enum: ["card", "upi", "netbanking", "wallet", "crypto"],
        required: true
    },
    transactionId: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ["pending", "active", "completed", "cancelled"],
        default: "pending"
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

export const Payment = mongoose.model("payment", paymentSchema)