import {Router} from "express"
import { createWallet, getAllWallets, getWalletBalance, getWalletByUser } from "../controllers/wallet.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

//creatwallet / wallet / balance
router.route("/create").post(createWallet)
router.route("/user/:userId").get(getWalletByUser)
router.route("/balance/:walletId").get(getWalletBalance)
router.route("/all").get(verifyJWT,getAllWallets)

export default router