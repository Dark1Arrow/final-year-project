import { Wallet } from "../models/wallet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v4 as uuidv4 } from "uuid"
import { ApiResponse } from "../utils/ApiResponse.js";

const createWallet = asyncHandler(async (req, res) => {
    const { userId, accountName, walletName } = req.body

    if (!userId || !accountName || !walletName) {
        throw new ApiError(400, "Field is required")
    }

    const existed = await Wallet.findOne({ user: userId })
    if (existed) {
        throw new ApiError(400, "wallet id is alrady exist for this user")
    }

    const wallet = await Wallet.create({
        user: userId,
        walletId: uuidv4(),
        walletName,
        walletAddress: `0x${uuidv4().replace(/-/g, "").slice(0, 40)}`,
        accountName
    })

    const createdWallet = await Wallet.findById(wallet._id)
    if (!createdWallet) {
        throw new ApiError(500, "Somthing went wrong while Register the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createWallet, "User register Successfully")
    )
})

const getWalletByUser = asyncHandler(async (req, res) => {
    const wallet = await Wallet.findOne({ user: req.params.userId })
    if (!wallet) {
        throw new ApiError(400, "Wallwt not found")
    }

    return res.status(201).json(
        new ApiResponse(200, wallet, "Wallet get successfully")
    )
})

const getWalletBalance = asyncHandler(async (req, res) => {
    const wallet = await Wallet.findById(req.params.walletId)
    if (!wallet) {
        throw new ApiError(400, "Wallwt not found")
    }

    return res.status(201).json(
        new ApiResponse(200, { balance: wallet.balance }, "Wallet get successfully")
    )
})

const getAllWallets = asyncHandler(async (req, res) => {
    // Check if user role is admin
    // Assuming you have user info in req.user (from auth middleware)
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Access denied: Admins only");
    }

    const wallets = await Wallet.find(); // fetch all wallets
    if (!wallets || wallets.length === 0) {
        throw new ApiError(404, "No wallets found");
    }

    return res.status(200).json(
        new ApiResponse(200, wallets, "All wallets fetched successfully")
    );
});

const topUpWallet = asyncHandler(async (req, res) => {
  const { walletId } = req.params;
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    throw new ApiError(400, "Invalid top-up amount");
  }

  // find wallet
  const wallet = await Wallet.findById(walletId);
  if (!wallet) {
    throw new ApiError(404, "Wallet not found");
  }

  // update balance
  wallet.balance += Number(amount);
  await wallet.save();

  return res.status(200).json(
    new ApiResponse(200, wallet, "Wallet topped up successfully")
  );
});

export { createWallet, getWalletBalance, getWalletByUser ,getAllWallets }