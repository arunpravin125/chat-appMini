import mongoose from "mongoose"
export const connectDB = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)

        console.log("mongoose connected",connection.connection.host)
    } catch (error) {
        console.log("error in mongoDB",error)
    }
}