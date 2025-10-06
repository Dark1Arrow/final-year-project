import mongoose, { Schema } from "mongoose";

const walletScheam = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }, 
    walletId: {
        type: String,
        required: true,
        unique: true
    },
    walletName: {
        type: String,
        default: "Cirrus Wallet"
    },
    walletAddress: {
        type: String,
        required: true,
        unique: true
    },
    accountName: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export const Wallet = mongoose.model("Wallet", walletScheam);