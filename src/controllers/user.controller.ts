import { Address } from "../models/address.model";
import { User } from "../models/user.model";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { userAddress } from "../zod/address.zod";
import { userNumber, userProfile } from "../zod/user.zod";
import {Request, Response} from 'express'

export const userRegister = asyncHandler(async (req: Request, res: Response) => {

    const {number} = req.body
    const isDataCorrect = userNumber.safeParse(number)

    if(!isDataCorrect.success) throw new ApiError(401, "Please provide valid contact number")

    const existingUser = await User.findOne({
        number
    })
    
    if(existingUser) throw new ApiError(403, "User already exist")
        
    const user = await User.create({
        number
    })

    const createdUser = await User.findById(user.id).select("-refreshToken")
    if(!createdUser) throw new ApiError(500, "Something went wrong while creating user, please try again")

    res.status(201).json(new ApiResponse(201, createdUser, "User created successfully"))
})

export const userLogin = asyncHandler(async(req, res) => {

    const {number} = req.body
    console.log(typeof number)
    const isDataCorrect = userNumber.safeParse(number)
    if(!isDataCorrect.success) throw new ApiError(401, "Please provide contact number")

    const user = await User.findOne({number})

    if(!user) throw new ApiError(404, "User does not exist")
    
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    const loggedInUser = await User.findByIdAndUpdate(user.id, {$set: {refreshToken}}).select("-refreshToken -blacklistToken")

    if(!loggedInUser) throw new ApiError(500, "Internal Server error")

    const options = {
        httpOnly: true,
        secure: true
    }

    res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", accessToken, options).json(new ApiResponse(200, loggedInUser, "User loggedIn successfull"))
})

export const updateUserProfile = asyncHandler(async (req, res) => {

    try {
        const {email, gender} = req.body
    
        const isDataCorrect = userProfile.safeParse(req.body)
        if(!isDataCorrect.success) throw new ApiError(400, "Please provide valid data")
    
        const user = await User.findByIdAndUpdate(req.id, {$set: {email, gender}}).select("-refreshToken -blacklistToken")
    
        if(!user) throw new ApiError(500, "Internal Server Error, please try again")
    
        res.status(200).json(new ApiResponse(200, user, "Profile updated Successfully"))
    } catch (error) {
        throw new ApiError(500, "Internal Server Error, please try again")
    }
})

export const createAddress = asyncHandler(async (req, res) => {

    const isDataCorrect = userAddress.safeParse(req.body)
    if(!isDataCorrect) throw new ApiError(400, "Invalid data type")
    
    const createdAddress = await Address.create({...req.body, user: req.id})

    res.status(201).json(new ApiResponse(201, createdAddress, "Address updated"))
})

export const updateAddress = asyncHandler(async (req, res) => {

    if(!req.query.id) throw new ApiError(400, "Invalid request")

    const isDataCorrect = userAddress.safeParse(req.body)
    if(!isDataCorrect.success) throw new ApiError(400, "Please provide valid data")
        
    const updatedAddress = await Address.findByIdAndUpdate(req.query.id, {$set: req.body})
    if(!updatedAddress) throw new ApiError(404, "Address does not exist")

    res.status(201).json(new ApiResponse(201, updatedAddress, "Address updated"))
})

export const getAddress = asyncHandler(async (req, res) => {

    const address = await Address.find({
        user: req.id
    })

    res.status(200).json(new ApiResponse(200, address))
})