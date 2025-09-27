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

    const { password, email, username, address, phone, fullname } = req.body

    if (
        [password, email, username, address, phone, fullname].some((filds) => filds?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are Required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }, { phone }]
    })

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

    const { password, email, username } = req.body

    if (!username || !email) {
        throw ApiError(400, "Atleast one field is required username or email");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
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

const logoutUser = asyncHandler(async (req,res)=>{
     await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },{
            new:true
        }
     )

    const option = {
        httpOnly: true,
        secure: true,
    }
    
    return res
    .status(200)
    .clearCookie("accessToken",option)
    .clearCookie("refreshToken",option)
    .json(new ApiResponse(200,{},"user logout"))
})

export { registerUser, loginUser,logoutUser }  