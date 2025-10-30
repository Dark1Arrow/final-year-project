import {Router} from "express"
import { createProperty, deleteProperty, getAllProperties, getInterestsByPropertyId, getOwnerProperties, getPropetyById, showInterest, updateProperty } from "../controllers/property.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"

const router = Router()

//creteProperty / getAllProperty / getById / deleteProperty 
router.route("/create").post(verifyJWT,createProperty)
router.route("/update/:id").put(verifyJWT,updateProperty)
router.route("/get").get(getAllProperties)
router.route("/get/:id").get(getPropetyById)
router.route("/ownerProperty").get(verifyJWT,getOwnerProperties)
router.route("/delete/:id").delete(verifyJWT,deleteProperty)
router.route("/interest/:id").post(verifyJWT,showInterest)
router.route("/interests/:propertyId").post(verifyJWT,getInterestsByPropertyId)

export default router