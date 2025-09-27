import {Router} from "express"
import { createPayment, getPaymentById, getUserPayment, refundPayment, updatePaymentStatus } from "../controllers/payment.controller.js"

const router = Router()

router.route("/create").post(createPayment)
router.route("/:id/status").put(updatePaymentStatus)
router.route("/:id").get(getPaymentById)
router.route("/:userId/user").get(getUserPayment)
router.route("/:id/user").put(refundPayment)

export default router