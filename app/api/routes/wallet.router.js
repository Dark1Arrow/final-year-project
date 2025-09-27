import {Router} from "express"
import { createWallet, getWalletBalance, getWalletByUser } from "../controllers/wallet.controller.js";

const router = Router()

//creatwallet / wallet / balance
router.route("/create").post(createWallet)
router.route("/all/:userId").get(getWalletByUser)
router.route("/get/:wallet").get(getWalletBalance)

export default router