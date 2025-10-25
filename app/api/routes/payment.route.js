import {Router} from "express"
import { createPayment, getPaymentById, getPaymentsByLandlord, getUserPayment, refundPayment, updatePaymentStatus } from "../controllers/payment.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"

const router = Router()

router.route("/all").get(verifyJWT,getPaymentsByLandlord)
router.route("/create").post(createPayment)
router.route("/:id/status").put(updatePaymentStatus)
router.route("/:id").get(getPaymentById)
router.route("/:userId/user").get(getUserPayment)
router.route("/:id/user").put(refundPayment)

export default router