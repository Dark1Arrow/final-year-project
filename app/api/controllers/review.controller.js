import { Property } from "../models/property.model.js";
import { Review } from "../models/review.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const { propertyId } = req.params
    const userId = req.user._id

    const property = await Property.findById(propertyId)
    if (!property) {
        throw new ApiError(400, "property not found")
    }

    const review = await Review.create({
        user: userId,
        property: propertyId,
        rating,
        comment
    })

    return res.status(200).json(
        new ApiResponse(200, review, "review is created successfully")
    )
})

const getReviewsByProperty = asyncHandler(async (req, res) => {
    const { propertyId } = req.params

    const review = await Review.find({ property: propertyId })
    if (!review) {
        throw new ApiError(400, "review not found")
    }

    return res.status(200).json(
        new ApiResponse(200, review, "review is successfully fatched")
    )
})

const getUserReview = asyncHandler(async (req, res) => {
    const { userId } = req.params

    const review = await Review.find({ user: userId })
    if (!review) {
        throw new ApiError(400, "review not found")
    }

    return res.status(200).json(
        new ApiResponse(200, review, "review is successfully fatched")
    )
})

const updateReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const { id } = req.params

    const review = await Review.findByIdAndUpdate(
        id,
        {
            rating,
            comment
        },
        { new: true }
    )

    if (!review) {
        throw new ApiError(400, "somthing happen while updating or review not found")
    }

    return res.status(200).json(
        new ApiResponse(200,review, "updated Successfully")
    )
})

const deleteReview = asyncHandler(async (req, res) => {
    const { id } = req.params

    const review = await Review.findById(id)
    if (!review) {
        throw new ApiError(400, "review not found")
    }

    if(review.user.toString() != req.user._id.toString()){
        throw new ApiError(400,"you are not allowed to delete this review")
    }

    await Review.findByIdAndDelete(id)

    return res.status(200).json(
        new ApiResponse(200, {}, "deleted Successfully")
    )
})

export { createReview, getReviewsByProperty, getUserReview, updateReview, deleteReview }