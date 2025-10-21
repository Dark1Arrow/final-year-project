import { Router } from "express";
import { createBooking, getBooking, confirmeBooking, cancelBooking, completeBooking, getUserBookings  } from "../controllers/booking.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js"

const router = Router()

//creteBooking / getBooking / confirmedBooking / complleteBooking
router.route("/create").post(createBooking)
router.route("/get/:id").get(getBooking) 
router.route("/confirm/:id").put(confirmeBooking) 
router.route("/cancel/:id").get(cancelBooking) 
router.route("/complete/:id").get(completeBooking) 
router.route("/getAll").get(verifyJWT,getUserBookings) 

export default router