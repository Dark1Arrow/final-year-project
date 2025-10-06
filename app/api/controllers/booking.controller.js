import { ApiError } from "../utils/ApiError.js"
import { Booking } from "../models/booking.model.js"
import { Property } from "../models/property.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const createBooking = asyncHandler(async (req, res) => {
    const { user, propertyId, startDate, endDate } = req.body

    const property = await Property.findById(propertyId)
    if (!property) {
        throw new ApiError(400, "Property is not Found")
    }

    if (property.status == "rented") {
        throw new ApiError(400, "Property is already Rented")
    }

    const booking = await Booking.create({
        user: user,
        property: propertyId,
        startDate,
        endDate,
        status: "pending",
    })

    const bookingData = await Booking.findById(booking.id);
    if (!bookingData) {
        throw new ApiError(400, "Somthing went wrong while creating booking")
    }

    await Property.findByIdAndUpdate(propertyId, { status: "reserved" })

    return res.status(200).json(
        new ApiResponse(200, bookingData, "Successfully Booked")
    )
})

const getBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
        throw new ApiResponse(400, "Bookiing data not found ")
    }

    res.status(200).json(
        new ApiResponse(200, booking, "get booking successfully")
    )
})

const confirmeBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: "active" }, { new: true })
    if (!booking) {
        throw new ApiResponse(400, "Bookiing data not found ")
    }

    await Property.findByIdAndUpdate(Booking.property, { status: "rented" })

    res.status(200).json(
        new ApiResponse(200, booking, "booking is confirmed")
    )
})

const cancelBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: "cancelled" }, { new: true })
    if (!booking) {
        throw new ApiResponse(400, "Bookiing data not found ")
    }

    await Property.findByIdAndUpdate(Booking.property, { status: "available" })

    res.status(200).json(
        new ApiResponse(200, booking, "booking is confirmed")
    )
})

const completeBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: "completed" }, { new: true })
    if (!booking) {
        throw new ApiResponse(400, "Bookiing data not found ")
    }

    await Property.findByIdAndUpdate(Booking.property, { status: "available" })

    res.status(200).json(
        new ApiResponse(200, booking, "booking is confirmed")
    )
})

export { createBooking, getBooking, confirmeBooking, cancelBooking, completeBooking }