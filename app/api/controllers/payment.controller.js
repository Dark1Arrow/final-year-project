import { Booking } from "../models/booking.model.js";
import { Payment } from "../models/payment.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPayment = asyncHandler(async (req, res) => {
    const { bookingId, userId, amount, method, transactionId, landlordId, propertyId } = req.body;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new ApiError(400, "Booking not found");
    }

    // Create the payment with status completed
    const payment = await Payment.create({
        booking: bookingId,
        user: userId,
        landlord: landlordId,
        property: propertyId,
        amount,
        method,
        transactionId,
        status: "completed", // ✅ set to completed
    });

    // Update the booking to reference this payment and mark as completed
    booking.payment = payment._id;
    booking.status = "completed"; // ✅ mark booking as completed
    await booking.save();

    return res.status(200).json(
        new ApiResponse(200, payment, "Payment completed and booking updated")
    );
});

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
        { new: true }
    )
    if (!payment) {
        throw new ApiError(400, "payment not found")
    }

    return res.status(200).json(
        new ApiResponse(200, payment, "Payment refunded successfully")
    )
})

const getPaymentsByLandlord = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "User not authenticated");
    }

    const landlordId = req.user._id;

    if (!landlordId) {
        throw new ApiError(400, "Landlord ID is required");
    }

    // Fetch all payments related to the given landlord
    const payments = await Payment.find({ landlord: landlordId }).sort({ createdAt: -1 }); // latest first

    if (!payments || payments.length === 0) {
        throw new ApiError(404, "No payments found for this landlord");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, payments, "Payments fetched successfully"));
});


export { createPayment, updatePaymentStatus, getPaymentById, getUserPayment, refundPayment , getPaymentsByLandlord }

