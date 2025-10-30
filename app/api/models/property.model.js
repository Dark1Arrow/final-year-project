import mongoose, { Schema } from "mongoose";

const propertyScheam = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['apartment', 'house', 'flat', 'other'],
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    rentPrice: {
        type: Number,
        required: true,
    },
    securityDeposit: {
        type: Number,
        default: 0,
    },
    rules: {
        type: String,
        default: '',
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    status: {
        type: String,
        enum: ["Available", "Rented"],
        default: "Available", // default status
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    booking: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        },
    ],
    contractId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'contract',
    },
    transactionHash: {
        type: String,
        default: '',
    },
    interestedUsers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
}, { timeStamp: true })

export const Property = mongoose.model("property", propertyScheam)