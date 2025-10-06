import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controler.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

//login / register / logout
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)

export default router