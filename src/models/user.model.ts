import * as zod from 'zod'
import { userProfile } from '../zod/user.zod'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

type userType = zod.infer<typeof userProfile>

interface userSchemaInterface extends userType {

    number: number,
    refreshToken: string,
    blacklistToken: string[],
    cart: mongoose.Schema.Types.ObjectId[]
    generateAccessToken: ()=>string,
    generateRefreshToken: ()=>string,
}
const userSchema = new mongoose.Schema<userSchemaInterface>(
    {
        number: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            lowercase: true
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"]
        },
        cart: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Shoe"
            }
        ],
        refreshToken: {
            type: String
        },
        blacklistToken: [
            {
               type: String
            }
        ]
    }
)

userSchema.methods.generateAccessToken = function(){

    return jwt.sign(
        {
            id: this._id,
            number: this.number
        },
        `${process.env.ACCESS_SECRET}`,
        {
            expiresIn: process.env.ACCESS_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            id: this._id
        },
        `${process.env.REFRESH_SECRET}`,
        {
            expiresIn: process.env.REFRESH_EXPIRY
        }
    )
}

export const User = mongoose.model<userSchemaInterface>("User", userSchema)

