import express, { Request, Response, NextFunction } from 'express'
import ApiError from './utils/apiError'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())

app.get('/', (req, res) => {
    res.send("health server")
})

import posterRouter from './routers/poster.route'
app.use('/api/v1/banner', posterRouter)

import userRouter from './routers/user.route'
app.use('/api/v1/user', userRouter)

import productRouter from './routers/product.route'
app.use('/api/v1/product', productRouter)

import cartRouter from './routers/cart.route'
app.use('/api/v1/cart', cartRouter)

// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    
//     if(error instanceof ApiError){
//         res.status(error.status).json({
//             status: error.status,
//             message: error.message,
//             data: error.data,
//             errors: error.errors,
//             success: false
//         })
//     }
//     else{
//         res.status(500).json({
//             message: "Internal server error",
//             data: null,
//             errors: [],
//             success: false
//         })
//     }
// })



export default app