import mongoose from "mongoose"

interface posterInterface {
    image: string
}

const posterSchema = new mongoose.Schema<posterInterface>(
    {
        image: {
            type: String,
            required: true,
            trim: true
        }
    }
)

export const Offer = mongoose.model<posterInterface>("Offer", posterSchema)
export const Featuredbrand = mongoose.model<posterInterface>("Featuredbrand", posterSchema)
export const Poster = mongoose.model<posterInterface>("Poster", posterSchema)
