import { error } from "console";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const genrateAccessTokenAndRefreshtoken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "somthing went wrong while genrating refrash and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // user details from frontend
    // validation - not empty
    // check if user alrady exists
    // crete user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res or error res

    const { password, email, username, address, phone, fullname, role } = req.body

    if (role == "admin") {
        throw new ApiError(401, "Admin registration is not allowed")
    }

    if (
        [password, email, username, address, phone, fullname, role].some((filds) => filds?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are Required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }, { phone }]
    })
    console.log(existedUser);
    if (existedUser) {
        throw new ApiError(409, "User with username or email is alrady exist")
    }

    const user = await User.create({
        password,
        email,
        username: username.toLowerCase(),
        address,
        phone,
        fullname,
        role,
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Somthing went wrong while Register the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User register Successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {

    const { password, email, username, role } = req.body

    if (!username || !email) {
        throw ApiError(400, "Atleast one field is required username or email");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }, { role }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    if (user.username != username || user.email != email || user.role != role) {
        throw new ApiError(401, "user not enter authentic info")
    }

    if (user.status != "active") {
        throw new ApiError(422, "user not have any access")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "invalid user password")
    }

    const { accessToken, refreshToken } = await genrateAccessTokenAndRefreshtoken(user._id)

    const loggedUser = await User.findById(user._id).
        select("-password -refreshToken")

    const option = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedUser, accessToken, refreshToken
                },
                "user logged in successfully"
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }, {
        new: true
    }
    )

    const option = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(new ApiResponse(200, {}, "user logout"))
})

const getAllLandlord = asyncHandler(async (req, res) => {
    // Find all users with role = "tenant"
    const landlord = await User.find({ role: "landlord" }).select("-password -refreshToken");

    if (!landlord || landlord.length === 0) {
        throw new ApiError(404, "No landlord found");
    }

    return res.status(200).json(
        new ApiResponse(200, landlord, "Landlord fetched successfully")
    );
});

const getAllTenants = asyncHandler(async (req, res) => {
    // Find all users with role = "tenant"
    const tenants = await User.find({ role: "tenant" }).select("-password -refreshToken");

    if (!tenants || tenants.length === 0) {
        throw new ApiError(404, "No tenants found");
    }

    return res.status(200).json(
        new ApiResponse(200, tenants, "Tenants fetched successfully")
    );
});

const updateTenantStatus = asyncHandler(async (req, res) => {
    const { status } = req.body; // Expected: "Approve" or "Disapprove"

    // ✅ Verify that the user making the request is an admin
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Access denied. Only admin can update tenant status");
    }

    if (!status) {
        throw new ApiError(400, "Status is required");
    }

    const tenant = await User.findByIdAndUpdate(
        req.params.tenatnId,
        { status: status },
        { new: true }
    ).select("-password -refreshToken");

    if (!tenant || tenant.role !== "tenant") {
        throw new ApiError(404, "Tenant not found");
    }

    return res.status(200).json(
        new ApiResponse(200, tenant, `Tenant status updated to ${status}`)
    );
});

const updateLandlordStatus = asyncHandler(async (req, res) => {
    const { status } = req.body; // Expected: "Approve" or "Disapprove"

    // ✅ Verify that the user making the request is an admin
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Access denied. Only admin can update tenant status");
    }

    if (!status) {
        throw new ApiError(400, "Status is required");
    }

    const tenant = await User.findByIdAndUpdate(
        req.params.landlord,
        { status: status },
        { new: true }
    ).select("-password -refreshToken");

    if (!tenant || tenant.role !== "landlord") {
        throw new ApiError(404, "Tenant not found");
    }

    return res.status(200).json(
        new ApiResponse(200, tenant, `Tenant status updated to ${status}`)
    );
});

const getUserDetails = asyncHandler(async (req, res) => {
    
    if (!req.user) {
        throw new ApiError(401, "User not authenticated");
    }

    const user = await User.findById(req.user).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User details fetched successfully")
    );
});

const getTenantById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "ID is required");
    }

    const user = await User.findById(id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "useer not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "user details fetched successfully")
    );
});

export { registerUser, loginUser, logoutUser, getAllTenants, updateTenantStatus, getAllLandlord, updateLandlordStatus,getUserDetails, getTenantById }  