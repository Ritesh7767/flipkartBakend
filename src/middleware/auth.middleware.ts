import jwt, {JwtPayload} from 'jsonwebtoken'
import ApiError from '../utils/apiError'
import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'

interface CustomRequest extends Request {
    cookies: {[key: string]: string}
    id: mongoose.Schema.Types.ObjectId
}

const isAuth = (req: CustomRequest, res: Response, next: NextFunction):void => {

    try {
        const token = req.cookies.accessToken
        const verifyToken = jwt.verify(token, `${process.env.ACCESS_SECRET}`) as JwtPayload
        req.id = verifyToken.id
        next()
    
    } catch (error) {
        throw new ApiError(400, "Invalid request")    
    }
}

export default isAuth