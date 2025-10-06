import { Notification } from "../models/notification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createNotification = asyncHandler(async (req, res) => {
    const { user, title, message, type, metadata } = req.body
    if (!user || !title || !message) {
        throw new ApiError(400, "all fields are required")
    }

    const notification = await Notification.create({
        user,
        title,
        message,
        type,
        metadata
    })

    return res.status(200).json(
        new ApiResponse(200, notification, "notification created successfully")
    )
})

const getNotification = asyncHandler(async (req, res) => {
    const { userId } = req.params

    const notification = await Notification.find({ user: userId }).sort({
        createdAt: -1,
    })

    if (!notification) {
        throw new ApiError(200, "notification is not found")
    }

    return res.status(200).json(
        new ApiResponse(200, notification, "get notification successfully")
    )
})

const markAsRead = asyncHandler(async (req, res) => {
    const { id } = req.params

    const notification = await Notification.findByIdAndUpdate(
        id,
        { isRead: true },
        { new: true },
    )

    if (!notification) {
        throw new ApiError(200, "notification is not found")
    }

    return res.status(200).json(
        new ApiResponse(200, notification, "notification mark as read successfully")
    )
})

const markAllAsRead = asyncHandler(async (req, res) => {
    const { userId } = req.params

    await Notification.updateMany({ user: userId, isRead: false }, { isRead: true })


    return res.status(200).json(
        new ApiResponse(200, "all notification mark as read successfully")
    )
})

const deleteNotification = asyncHandler(async (req, res) => {
    const { id } = req.params

    await Notification.findByIdAndDelete(id)

    return res.status(200).json(
        new ApiResponse(200, null, "notification delete successfully")
    )
})

export { createNotification, getNotification, markAllAsRead, markAsRead, deleteNotification }