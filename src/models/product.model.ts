import mongoose from "mongoose"

interface shoesInterface {
    image: string[],
    brand: string,
    title: string,
    flipkartAssured: boolean,
    price: number,
    ogPrice: number,
    size: number[],
    special: string,
    qtyAlert: string,
    color: string[]
}

const shoeSchema = new mongoose.Schema<shoesInterface>(
    {
        image: [
            {
                type: String,
                required: true,
                trim: true
            }
        ],
        brand: {
            type: String,
            required: true,
            trim: true
        },
        title: {
            type: String,
            requried: true,
            trim: true
        },
        flipkartAssured: {
            type: Boolean,
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        ogPrice: {
            type: Number
        },
        size: [
            {
                type: Number,
                required: true
            }
        ],
        special: {
            type: String
        },
        qtyAlert: {
            type: String
        },
        color: [
            {
                type: String
            }
        ]
    }
)

export const Shoe = mongoose.model<shoesInterface>("Shoe", shoeSchema)

interface productSchemaInterface {
    image: string,
    title: string,
    price: string | number
}

const productSchema = new mongoose.Schema<productSchemaInterface>(
    {
        image: {
            type: String,
            required: true,
            trim: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number || String,
            required: true
        }
    }
)

export const Appliance = mongoose.model("Appliance", productSchema)
export const Beauty = mongoose.model("Beauty", productSchema)
export const Fashion = mongoose.model("Fashion", productSchema)
export const Bestfashion = mongoose.model("Bestfashion", productSchema)
export const Deal = mongoose.model("Deal", productSchema)
export const Electronic = mongoose.model("Electronic", productSchema)
export const Gadget = mongoose.model("Gadget", productSchema)
export const Home = mongoose.model("Home", productSchema)
export const Monsoon = mongoose.model("Monsoon", productSchema)
export const Smartphone = mongoose.model("Smartphone", productSchema)
export const Sport = mongoose.model("Sport", productSchema)
export const Toysport = mongoose.model("Toysport", productSchema)