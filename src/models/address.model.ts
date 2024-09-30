import * as zod from 'zod'
import { userAddress } from '../zod/address.zod'
import mongoose from 'mongoose'
import { indianStates } from '../zod/address.zod'

type userType = zod.infer<typeof userAddress> & {
    user: mongoose.Schema.Types.ObjectId
}

const addressSchema = new mongoose.Schema<userType>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        number: {
            type: Number,
            min: 10,
            max: 10,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        locality: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            enum: [...indianStates]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
)

export const Address = mongoose.model("Address", addressSchema)