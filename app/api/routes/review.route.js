import { Router } from "express";
import { createReview, deleteReview, getReviewsByProperty, getUserReview, updateReview } from "../controllers/review.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/:propertyId").post(verifyJWT,createReview)
router.route("/property/:propertyId").get(getReviewsByProperty)
router.route("/user/:userId").get(getUserReview)
router.route("/:id").put(verifyJWT,updateReview)
router.route("/:id").delete(verifyJWT,deleteReview)

export default router