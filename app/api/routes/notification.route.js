import { Router } from "express";
import { createNotification, deleteNotification, getNotification, markAllAsRead, markAsRead } from "../controllers/notification.controller.js";

const router = Router()

router.route("/").post(createNotification)
router.route("/:userId").get(getNotification)
router.route("/read/:id").patch(markAsRead)
router.route("/read-all/:userId").patch(markAllAsRead)
router.route("/:id").delete(deleteNotification)

export default router