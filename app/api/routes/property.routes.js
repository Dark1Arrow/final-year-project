import {Router} from "express"
import { createProperty, deleteProperty, getAllProperties, getPropetyById } from "../controllers/property.controller.js"

const router = Router()

//creteProperty / getAllProperty / getById / deleteProperty 
router.route("/create").post(createProperty)
router.route("/get").get(getAllProperties)
router.route("/get/:id").get(getPropetyById)
router.route("/delete/:id").delete(deleteProperty)

export default router