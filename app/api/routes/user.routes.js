import { Router } from "express";
import { getAllLandlord, getAllTenants, getTenantById, getUserDetails, loginUser, logoutUser, registerUser, updateLandlordStatus, updateTenantStatus } from "../controllers/user.controler.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

//login / register / logout
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/userData").get(verifyJWT, getUserDetails)
router.route("/:id").get(verifyJWT, getTenantById)
router.route("/tenant").get(getAllTenants)
router.route("/landlord").get(getAllLandlord)
router.route("/tenant/:tenatnId/status").put(verifyJWT,updateTenantStatus)
router.route("/landlord/:landlord/status").put(verifyJWT,updateLandlordStatus)

export default router