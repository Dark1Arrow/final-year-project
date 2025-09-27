import { Router } from "express";
import { createBooking, getBooking, confirmeBooking, cancelBooking, completeBooking  } from "../controllers/booking.controller.js";

const router = Router()

//creteBooking / getBooking / confirmedBooking / complleteBooking
router.route("/create").post(createBooking)
router.route("/get/:id").get(getBooking) 
router.route("/confirm/:id").get(confirmeBooking) 
router.route("/cancel/:id").get(cancelBooking) 
router.route("/complete/:id").get(completeBooking) 

export default router