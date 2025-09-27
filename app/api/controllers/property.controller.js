import { Property } from "../models/property.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createProperty = asyncHandler(async (req, res) => {
    const { name, description, type, address, city, rentPrice, securityDeposit, rules, owner } = req.body
    if ((!name || !description || !type || !address || !city || !rentPrice || !securityDeposit || !rules || !owner)) {
        throw new ApiError(400, "All fields are required")
    }

    const property = await Property.create({
        name,
        description,
        type,
        address,
        city,
        rentPrice,
        securityDeposit,
        rules,
        owner
    })

    const createdProperty = await Property.findById(property._id)
    if (!createProperty) {
        throw new ApiError(500, "There is Somthing Wrong while creating Property")
    }

    return res.status(200).json(
        new ApiResponse(200, createdProperty, "Property Created Successfully")
    )
})

const getAllProperties = asyncHandler(async (req, res) => {
    const Properties = await Property.find()
    if (!Properties) {
        throw new ApiError(500, "No Data")
    }

    return res.status(200).json(
        new ApiResponse(200, Properties, "Successfully get data")
    )
})

const getPropetyById = asyncHandler(async (req, res) => {
    const Properties = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!Properties) {
        throw new ApiError(500, "Property not found")
    }

    return res.status(200).json(
        new ApiResponse(200, Properties, "Successfully data update")
    )
})

const deleteProperty = asyncHandler(async (req, res) => {
    const Properties = await Property.findByIdAndDelete(req.params.id)
    if (!Properties) {
        throw new ApiError(500, "Property not found")
    }

    return res.status(200).json(
        new ApiResponse(200, Properties, "Successfully Property Deleted")
    )
})

export { createProperty, getAllProperties, getPropetyById, deleteProperty }



