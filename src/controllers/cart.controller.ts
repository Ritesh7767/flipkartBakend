import { Shoe } from "../models/product.model";
import { User } from "../models/user.model";
import ApiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import ApiResponse from "../utils/apiResponse";
import cartValidate from "../zod/cart.zod";

export const addToCart = asyncHandler(async (req, res) => {

    const id = req.params.id
    
    const isIdValid = cartValidate.safeParse(req.params.id)
    if (!isIdValid.success) throw new ApiError(400, "Invalid Id")

    const product = await Shoe.findById(id)
    if (!product) throw new ApiError(400, "Invalid id provided")

    const user = await User.findById(req.id)
    if(!user) throw new ApiError(400, "Invalid Request")

    user.cart.push(product.id)
    user.save({validateBeforeSave: true})

    const cart = await User.findById(user.id).select("cart")

    if (!cart) throw new ApiError(500, "Something went wrong")
    res.status(200).json(new ApiResponse(200, cart))
})

export const getCartData = asyncHandler(async (req, res) => {

    const userCart = await User.findById(req.id)
    if (!userCart) throw new ApiError(500, "Something went wrong")

    res.status(201).json(new ApiResponse(201, userCart.cart, "Cart Data"))
})

export const deleteFromCart = asyncHandler(async (req, res) => {

    const id = req.params.id

    const user = await User.findById(req.id)
    if (!user) throw new ApiError(500, "Something went wrong")

    user.cart = user.cart.filter(ele => ele.toString() != id)
    user.save({validateBeforeSave:true})

    const userCart = await User.findById(req.id).select("cart")
    if (!userCart) throw new ApiError(500, "Something went wrong, please try again")

    res.status(200).json(new ApiResponse(200, userCart))
})


