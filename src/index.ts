import connectDB from "./connectDB/connectDB";
import app from "./app";
import dotenv from 'dotenv'

dotenv.config()

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server started at port", process.env.PORT || 3000)
    })
})
.catch(error => {

    console.error("Something went wrong while connecting to the database")
    process.exit(1)
})
