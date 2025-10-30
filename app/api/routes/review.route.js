import { Router } from "express";
import { createReview, deleteReview, getAllReviews, getMyReviews, getReviewsByProperty, getUserReview, updateReview } from "../controllers/review.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/create").post(verifyJWT,createReview)
router.route("/get/:propertyId").get(getReviewsByProperty)
router.route("/user/:userId").get(getUserReview)
router.route("/:id").put(verifyJWT,updateReview)
router.route("/:id").delete(verifyJWT,deleteReview)
router.route("/get").get(verifyJWT,getMyReviews)
router.route("/getAll").get(verifyJWT,getAllReviews)

export default router