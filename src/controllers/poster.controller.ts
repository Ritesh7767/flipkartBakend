import { Featuredbrand, Offer, Poster } from "../models/poster.model";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";

export const getPoster = asyncHandler(async (req, res) => {
    const data = await Poster.find()
    res.status(200).json(new ApiResponse(200, data, "Poster data"))
})

export const getOffer = asyncHandler(async (req, res) => {

    const data = await Offer.aggregate([{
        $sample: {
            size: Number(req.query.size) || 7
        }
    }])

    res.status(200).json(new ApiResponse(200, data, "Offer data"))
})

export const getFeaturedBrand = asyncHandler(async (req, res) => {
    const data = await Featuredbrand.aggregate([
        {
            $sample: {
                size: 9
            }
        }
    ])
    res.status(200).json(new ApiResponse(200, data, "Featured Brand data"))
})