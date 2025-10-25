import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "active", "completed", "cancelled"],
        default: "pending",
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: false
    }
}, { timestamps: true })

export const Booking = mongoose.model("booking", bookingSchema)