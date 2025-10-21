import { Property } from "../models/property.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"

const createProperty = asyncHandler(async (req, res) => {
    const { name, description, type, address, city, rentPrice, securityDeposit, rules } = req.body
    if ((!name || !description || !type || !address || !city || !rentPrice || !securityDeposit || !rules)) {
        throw new ApiError(400, "All fields are required")
    }
    if (!req.user) {
        throw new ApiError(401, "User not authenticated");
    }

    const user = await User.findById(req.user).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
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
        owner : user._id,
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

const updateProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, type, address, city, rentPrice, securityDeposit, rules } = req.body;

  // Check all required fields
  if (!name || !description || !type || !address || !city || !rentPrice || !securityDeposit || !rules) {
    throw new ApiError(400, "All fields are required");
  }

  // Ensure user is logged in
  if (!req.user._id) {
    throw new ApiError(401, "User not authenticated");
  }

  const property = await Property.findById(id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }
  
  // Check ownership — only the owner can edit
  if (property.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to edit this property");
  }

  // Update property
  property.name = name;
  property.description = description;
  property.type = type;
  property.address = address;
  property.city = city;
  property.rentPrice = rentPrice;
  property.securityDeposit = securityDeposit;
  property.rules = rules;

  const updatedProperty = await property.save();

  return res.status(200).json(
    new ApiResponse(200, updatedProperty, "Property updated successfully")
  );
});

const showInterest = asyncHandler(async (req, res) => {
    const propertyId = req.params.id;

    if (!req.user) {
        throw new ApiError(401, "User not authenticated");
    }

    const property = await Property.findById(propertyId);
    if (!property) {
        throw new ApiError(404, "Property not found");
    }

    // Prevent duplicate interest
    if (property.interestedUsers.includes(req.user._id)) {
        return res.status(200).json(new ApiResponse(200, property, "Already showed interest"));
    }

    property.interestedUsers.push(req.user._id);
    await property.save();

    res.status(200).json(new ApiResponse(200, property, "Interest added successfully"));
});

const getOwnerProperties = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(401, "User not authenticated");
    }

    const ownerId = req.user._id;

    const properties = await Property.find({ owner: ownerId })

    if (!properties || properties.length === 0) {
        return res.status(200).json(new ApiResponse(200, [], "No properties found for this owner"));
    }

    return res.status(200).json(new ApiResponse(200, properties, "Properties fetched successfully"));
});

const getInterestsByPropertyId = asyncHandler(async (req, res) => {
    const { propertyId } = req.params;

    if (!propertyId) {
        throw new ApiError(400, "Property ID is required");
    }

    // Find the property and populate interested users
    const property = await Property.findById(propertyId)
        .populate("interestedUsers", "name email phone") // select specific fields
        .lean();

    if (!property) {
        throw new ApiError(404, "Property not found");
    }

    const interestedUsers = property.interestedUsers || [];

    return res.status(200).json(
        new ApiResponse(200, interestedUsers, "Interested users fetched successfully")
    );
});

export { createProperty, getAllProperties, getPropetyById, deleteProperty, updateProperty,showInterest, getOwnerProperties,getInterestsByPropertyId }
