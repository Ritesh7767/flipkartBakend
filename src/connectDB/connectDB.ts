import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`)
        console.log("Database connection successfull at host :-", connection.connection.host)
    } catch (error) {
        console.log("Something went wrong while connecting to database")
        process.exit(1)
    }
}

export default connectDB