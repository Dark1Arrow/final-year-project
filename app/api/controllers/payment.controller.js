import { Booking } from "../models/booking.model.js";
import { Payment } from "../models/payment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPayment = asyncHandler(async (req, res) => {
    const { bookingId, userId, amount, method, transactionId } = req.body

    const booking = await Booking.findById(bookingId)
    if (!booking) {
        throw new ApiError(400, "Booking is not found")
    }

    const payment = await Payment.create({
        booking: bookingId,
        user: userId,
        amount,
        method,
        transactionId,
        status: "pending"
    })

    return res.status(200).json(
        new ApiResponse(200, payment, "payment record created, awaiting conformation")
    )
})

const updatePaymentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    const payment = await Payment.findByIdAndUpdate(
        id,
        { status },
        { new: true }
    )

    if (!payment) {
        throw new ApiError(400, "payment not found")
    }

    return res.status(200).json(
        new ApiResponse(200, payment, `payment status updated sucessfully to ${status}`)
    )
})

const getPaymentById = asyncHandler(async (req, res) => {
    const { id } = req.params

    const payment = await Payment.findById(id)
    if (!payment) {
        throw new ApiError(400, "payment not found")
    }

    return res.status(200).json(
        new ApiResponse(200, payment, "Payment details fetched successfully")
    )
})

const getUserPayment = asyncHandler(async (req, res) => {
    const { userId } = req.params

    const payment = await Payment.find({ user: userId })
    if (!payment) {
        throw new ApiError(400, "payment not found")
    }

    return res.status(200).json(
        new ApiResponse(200, payment, "User payment details fetched successfully")
    )
})

const refundPayment = asyncHandler(async (req, res) => {
    const { id } = req.params

    const payment = await Payment.findByIdAndUpdate(
        id,
        {
            status: "refunded"
        },
        {new: true}
    )
    if (!payment) {
        throw new ApiError(400, "payment not found")
    }

    return res.status(200).json(
        new ApiResponse(200, payment, "Payment refunded successfully")
    )
})

export { createPayment, updatePaymentStatus, getPaymentById, getUserPayment, refundPayment }

