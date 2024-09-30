import { Appliance, Beauty, Bestfashion, Deal, Electronic, Fashion, Gadget, Home, Monsoon, Shoe, Smartphone, Sport, Toysport } from "../models/product.model";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";

export const appliances = asyncHandler(async (req, res) => {

    const {0: param} = req.params

    let data = {}
    switch(param){
        case "appliances": data = await Appliance.find()
                           break;
        case "beauty": data = await Beauty.find()
                           break;
        case "fashion": data = await Fashion.find()
                           break;
        case "bestfashion": data = await Bestfashion.find()
                           break;
        case "deal": data = await Deal.find()
                           break;
        case "electronic": data = await Electronic.find()
                           break;
        case "gadget": data = await Gadget.find()
                           break;
        case "home": data = await Home.find()
                           break;
        case "monsoon": data = await Monsoon.find()
                           break;
        case "smartphone": data = await Smartphone.find()
                           break;
        case "sport": data = await Sport.find()
                           break;
        case "toysport": data = await Toysport.find()
                           break;
        case "shoe": data = await Shoe.find()
                           break;
        default: throw new ApiError(404, "Invalid request")
    }

    res.json(new ApiResponse(200, data, "Product data"))
})

export const getProduct = asyncHandler(async (req, res) => {

    const id = req.query.id

    console.log(id)

    return 


})